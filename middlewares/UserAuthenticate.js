const { User } = require('../models')

module.exports = async (request, response, next) => {
    let { name, email, nickname, password } = request.body;
    let user = await User.findAll({ where: { email } });
  
    // if (users.length) {
    //     response.status(400).render('cadastro',{ erro: "Email já cadastrado" })
    //     return;
    // } 
    if (!name || !email || !nickname || !password) {
        
        return response.status(400).redirect('/user/cadastro?acao=cadastro-usuario-erro');
    } else {
        if (user.length) {
            return response.status(400).redirect('/user/cadastro?acao=cadastro-usuario-erro');

        } else {
            if (password.length < 6 || password.length > 25) {
                response.status(400).redirect('/user/cadastro?acao=cadastro-usuario-erro');
                return;
            }else {
                next();
            }
        }
    }
}

