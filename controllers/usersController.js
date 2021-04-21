
const {User, sequelize} = require('../models');

const usersController = {
    index: async (request, response) => {
        let users = await User.findAll();
        return response.json(users);
    },
    create: async (request, response) => {
        let{name, email, nickname, password} = request.body;
        let newUser = await User.create({
            name, 
            email, 
            nickname, 
            password
        });
        return response.json(newUser);
    },
    update: async (request, response) => {
        let {id} = request.params;
        let {name, email, nickname, password} = request.body;

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
        let userDeleted = await usersController.destroy({
            where: {id}
        });
        return response.json(userDeleted);
    }
    
}
module.exports = usersController;
