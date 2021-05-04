const bcrypt = require('bcryptjs');
const { User, Notebook, Book, sequelize } = require('../models');
const { Op } = require('sequelize');
// const jwt = require('jsonwebtoken');

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
            // return response.redirect(`perfil/${user.id}`)
            // jwt.sign({id: user.id}, SECRET, {expiresIn: 1000});
            request.session.usuarioLogado = user;
            return response.redirect('/timeline')
        } else {
            console.log(password);
            console.log(user.password);
            return response.redirect('/user/login');
        }
        
    },

    cadastro: (request, response) => {
        return response.render('cadastro');
    },
    create: async (request, response) => {
        const { name, email, nickname, password }  = request.body;

        const passwordCrypt = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            name,
            email,
            nickname,
            password: passwordCrypt
        });

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
    showUserProfile: async (request, response) => {
        const {id} = request.session.usuarioLogado;
        
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

        let favoriteBooksList = await Book.findAll({ 
             include: [{
                model: Notebook,
                as: 'notebook',
                where: { [Op.and]: [
                    {status: { [Op.like]: 'Lido' }},
                    {user_id: id}
                    ]}
                }]
        })
        // favoriteBooksList = favoriteBooksList.books;
        console.log(favoriteBooksList);
        
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

        return response.render('perfil', {showUserInfo: statusCountList, userFound, favoriteCount, sumPages, favoriteBooksList})

    }
}
module.exports = usersController;

