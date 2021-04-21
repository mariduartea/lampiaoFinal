const {Book, sequelize} = require('../models');

const booksController = {
    index: async (request, response) => {
        let books = await Book.findAll();
        return response.json(books);
    },
    create: async (request, response) => {
        let{name, isbn, publishing_company, writer, genre, n_pages, year_publication} = request.body;
        let newBook = await Book.create({
            name,
            isbn,
            publishing_company,
            writer,
            genre,
            n_pages,
            year_publication 
        });
        return response.json(newBook); 
    },
    update: async (request, response) => {
        let {id} = request.params;
        let{name, isbn, publishing_company, writer, genre, n_pages, year_publication} = request.body;

        let bookUpdate = await Book.update({
            name,
            isbn,
            publishing_company,
            writer,
            genre,
            n_pages,
            year_publication
        },{
            where: {id}})
            return response.json(bookUpdate);
    },
    delete: async (request, response) => {
        let {id} = request.params;
        let bookDeleted = await Book.destroy({
            where: {id}
        });
        return response.json(bookDeleted);
    }
}

module.exports = booksController;