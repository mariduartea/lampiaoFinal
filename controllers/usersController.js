const bcrypt = require('bcryptjs');
const {User, sequelize} = require('../models');

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
       
        const passwordCrypt = bcrypt.hashSync(password, 10);

        let userUpdate = await User.update ({
            name, 
            email, 
            nickname, 
            password: passwordCrypt
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
    }
    
}
module.exports = usersController;

