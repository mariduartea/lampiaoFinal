const {Book} = require('../models')

module.exports = async (request, response, next) => {
    let {name, isbn, publishing_company, writer, genre, n_pages, year_publication} = request.body;
    let book = await Book.findAll({where: {isbn}});

    if(book.length){
        return response.status(400).json({error: "Livro já existe!"})
    }
    else{
        if(!name || !isbn || !publishing_company || !writer || !genre || !n_pages || !year_publication){
            return response.status(400).json({error: "Preencha todos os campos!"})
        }
        
        next();
    }
}