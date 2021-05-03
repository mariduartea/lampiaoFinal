const bcrypt = require('bcryptjs');
const { User, Notebook, Book, sequelize } = require('../models');
const { Op } = require('sequelize');

const usersController = {
    index: async (request, response) => {
        let users = await User.findAll();
        return response.json(users);
    },

    login: async (request,response) => {
        return response.render('login');
    },

    auth: async (request, response) => {
        const { email, password} = request.body;

        const user = await User.findOne({
            where: {email }
        });
        if (user && bcrypt.compareSync(password, user.password)) {
            return response.redirect(`perfil/${user.id}`)
        } else {
            return response.redirect('/user/login');
        }
    },

    cadastro: (request, response) => {
        return response.render('cadastro');
    },
    create: async (request, response) => {
        const cadastro = { 
            name: request.body.name, 
            email: request.body.email, 
            nickname: request.body.nickname, 
            password: request.body.password } ;
        // console.log(name);
        // console.log(email);
        // console.log(nickname);
        // console.log(password);
        //const passwordCrypt = bcrypt.hashSync(password, 10);

        const newUser = await User.create(cadastro);
        // const newUser = await User.create({
        //     name,
        //     email,
        //     nickname,
        //     password//: passwordCrypt
        // });
        
        // return response.json(newUser);
        return response.redirect('/user/login')
    },
    update: async (request, response) => {
        let { id } = request.params;
        let { name, email, nickname, password } = request.body;

        if (password) {
            let passwordUpdated = bcrypt.hashSync(password, 10);
            password = passwordUpdated;
        }

        let userUpdate = await User.update({
            name,
            email,
            nickname,
            password
        }, {
            where: { id }
        })
        return response.json(userUpdate);
    },
    delete: async (request, response) => {
        let { id } = request.params;
        let userDeleted = await User.destroy({
            where: { id }
        });
        return response.json(userDeleted);
    },
    showNotebooksUser: async (request, response) => {
        const { user_id } = request.params;
        const user = await User.findByPk(user_id, {
            include: [
                {
                    association: 'books',
                    through: {
                        attributes: ['grade', 'status', 'favorite']
                    },

                },
            ]
        })
        return response.json(user.books);
    },
    showFavoritebooksUser: async (request, response) => {
        const { user_id } = request.params;
        const user = await User.findByPk(user_id, {
            include: [
                {
                    association: 'books',
                    through: {
                        attributes: ['grade', 'status', 'favorite'],
                        where: {
                            favorite: 1
                        }
                    },

                },
            ]
        })
        return response.json(user.books);
    },
    showBooksByStatus: async (request, response) => {
        const { user_id } = request.params;
        const { status } = request.body;

        const user = await User.findByPk(user_id, {
            include: [{
                association: 'books',
                through: {
                    attributes: ['grade', 'status', 'favorite'],
                    where: {
                        status: {
                            [Op.like]: status
                        }
                    }
                }
            }]
        })
        return response.json(user.books);
    },

    // mostrar a quantidade de livros por status
    showQuantityByStatus: async (request, response) => {
        const { user_id } = request.params;
        const { status } = request.params;

        const user = await User.findByPk(user_id, {
            include: [{
                association: 'books',
                through: {
                    attributes: ['grade', 'status', 'favorite'],
                    where: {
                        status: {
                            [Op.like]: status
                        }
                    }
                }
            }]
        })
        return response.json(user.books.length);
    },

    // PAGINÔMETRO
    showTotalPages: async (request, response) => {
        const { user_id } = request.params;
        const sumPages = await Book.sum(
            'n_pages', 
            { include: [{
                model: Notebook,
                as: 'notebook',
                where: { [Op.and]: [
                    {status: { [Op.like]: 'Lido' }},
                    {user_id}
                    ]}
                }]
            }
        );

        return response.json(sumPages);     
    },
    showUserById: async (request, response) =>{
        const {user_id} = request.params;
        const user = await User.findByPk(user_id);
        return response.json(user);
    },
    showUserProfile: async (request, response) => {
        const {id} = request.params;
        
        const userFound = await User.findByPk(id);
        if (!userFound) {
            return response.status(400).send({
                message: "usuario não existe"
            })
        }

        let statusList = ['Lido', 'Lendo', 'Quero ler'];
        let statusCountList = [];
        for (statusName of statusList) {
            let userStatusCounter = await Notebook.count({
                where: 
                {[Op.and]:
                    [{user_id: id},
                    {status: statusName}]
                }
            });
            statusCountList.push(userStatusCounter)
            // console.log(statusCountList)
        };

        let favoriteBooksList = await User.findByPk(id, {
            include: [
                {
                    association: 'books',
                    through: {
                        attributes: ['grade', 'status', 'favorite'],
                        where: {
                            favorite: 1
                        }
                    },
                },
            ]
        })
        
        //armazena a quantidade de livros favoritos do usuario
        let favoriteCount = await Notebook.count({
            where: 
                {[Op.and]:
                    [{user_id: id},
                    {favorite: 1}]
                }
        })

        const sumPages = await Book.sum(
            'n_pages', 
            { include: [{
                model: Notebook,
                as: 'notebook',
                where: { [Op.and]: [
                    {status: { [Op.like]: 'Lido' }},
                    {user_id: id}
                    ]}
                }]
            }
        );

        return response.render('perfil', {showUserInfo: statusCountList, userFound, favoriteCount, sumPages})

    }
}
module.exports = usersController;

