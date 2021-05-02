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
            return response.redirect('/');
        }
    },

    cadastro: (request, response) => {
        return response.render('cadastro');
    },
    create: async (request, response) => {
        let { name, email, nickname, password } = request.body;

        const passwordCrypt = bcrypt.hashSync(password, 10);

        let newUser = await User.create({
            name,
            email,
            nickname,
            password: passwordCrypt
        });

        return response.json(newUser);
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
    showUserProfile: async (request, response) => {
        
        const {user_id} = request.params;

        //Buscar livro baseado no ID
        const userFound = await User.findByPk(user_id);
        if (!userFound) {
            return response.status(400).send({
                message: "usuario não existe"
            })
        }
        
        //Retorna a quantidade de livros correspondente a cada status na estante de usuario
        let statusList = ['Lido', 'Lendo', 'Quero ler'];
        let statusCountList = [];
        for (statusName of statusList) {
            let userStatusCounter = await Notebook.count({
                where: 
                {[Op.and]:
                    [{user_id: user_id},
                    {status: statusName}]
                }
            });
            statusCountList.push(userStatusCounter)
            console.log(statusCountList)
        };

    
        //Retorna a lista dos livros favoritos do usuario
        let favoriteBooksList = await User.findByPk(user_id, {
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
        let favoriteCount = favoriteBooksList.length;

        //soma o total de paginas de todos os livros LIDOS pelo usuario
        let totalPagesReadByUser =  await Book.sum(
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

        //retorna uma lista de listas baseadas nos status de livros presentes na estante do usuario
        let booksListsByStatus = [];
        for(let status in statusList){
            let returnedBooksList = await User.findByPk(user_id, {
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
            });
            booksListsByStatus.push(returnedBooksList);
        }   

        

        return response.render('perfil', {
            showUserInfo: 
            statusCountList,
            favoriteBooksList,
            favoriteCount,
            totalPagesReadByUser,
            booksListsByStatus})

        
    }
}
module.exports = usersController;

