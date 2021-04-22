const { User } = require('../models')
module.exports = async (request, response, next) => {
    let { name, nickname, email, password } = request.body;
    let users = await User.findAll({ where: { email } });
    if (users.length) {
        response.status(400).json({ erro: "Email já cadastrado" })
        return;
    } else {
        if(password.length < 6 || password.length > 25){
            response.status(400).json({ erro: "Senha invalida" })
            return;
        }
        else{
            if(!name || !nickname || !email){
                response.status(400).json({ erro: "Preencha todos os campos!" })
                return;
            }
            next();
        }
        
    }
}