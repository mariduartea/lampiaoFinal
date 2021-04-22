const { Post } = require('../models')
module.exports = async (request, response, next) => {
    let { title, text, is_it_public} = request.body;
    
    if (!title || !text) {
        response.status(400).json({ erro: "Preencha todos os campos!" })
        return;
    } else {
        next();
        }
      
}
