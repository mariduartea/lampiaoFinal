const { User } = require('../models')

module.exports = async (request, response, next) => {
    let { email, password } = request.body;
    let users = await User.findAll({ where: { email } });

    // if (users.length) {
    //     response.status(400).render('cadastro',{ erro: "Email já cadastrado" })
    //     return;
    // } 
    if (!email || !password) {
        return response.status(400).json({ erro: "Preencher todos os campos" })
    } else {
        if (user.length) {
            return response.status(400).json({ erro: "email já cadastrado" })

        } else {
            if (password.length < 6 || password.length > 25) {
                response.status(400).json({ erro: "Senha invalida" })
                return;
            }else {
                next();
            }
        }
    }
}

