const bcrypt = require('bcryptjs');

const {User, Notebook, sequelize} = require('../models');


const usersController = {
    index: async (request, response) => {
        let users = await User.findAll();
        return response.json(users);
    },
    create: async (request, response) => {
        let{name, email, nickname, password} = request.body;
        
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
        let {id} = request.params;
        let {name, email, nickname, password} = request.body;
        
        if (password) {
            let passwordUpdated = bcrypt.hashSync(password, 10);
            password = passwordUpdated;
        }

        let userUpdate = await User.update ({
            name, 
            email, 
            nickname, 
            password
        }, {
            where: {id}})
            return response.json(userUpdate);
    },
    delete: async (request, response) => {
        let {id} = request.params;
        let userDeleted = await User.destroy ({
            where: {id}
        });
        return response.json(userDeleted);
    },
    showNotebooksUser: async (request, response) =>{
        const {user_id} = request.params;
        const user = await User.findByPk(user_id,{
            include: {association: 'books',
            through: { 
                attributes: ['grade', 'status', 'favorite']
              } 
        }
        })
        return response.json(user.books);
    }
    
}
module.exports = usersController;

