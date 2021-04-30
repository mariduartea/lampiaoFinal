const { request, response } = require('express');
const {Book, sequelize, Notebook} = require('../models');
const {Op} = require('sequelize');

const booksController = {
    index: async (request, response) => {
        let books = await Book.findAll();
        return response.json(books);
    },
    create: async (request, response) => {
        let{name, isbn, publishing_company, writer, genre, n_pages, year_publication, img} = request.body;
        let newBook = await Book.create({
            name,
            isbn,
            publishing_company,
            writer,
            genre,
            n_pages,
            year_publication,
            img
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
    },
    showBooksCarousel: async (request, response) => {
        const {page, limit} = request.body
        let lim = limit;
        const listBooks = await Book.findAll({
            order:[
                ['id', 'DESC']
            ],
            limit: lim,
            offset: (lim * page) - lim
        });
        return response.json(listBooks);
    },

    //função que calcula a média das notas dos livros
    showBookGrade: async (request, response) => {
        let { book_id } = request.params;
        let bookCount = await Notebook.findAll({ 
            group: 'grade',
            where: {book_id}
        });
        let bookGrade = await Notebook.sum(
            'grade',
            {where: {book_id}}
        );
        let meanGrade = bookGrade/bookCount.length;
        return response.json(meanGrade);
    },

    //função para listar os favoritos de um livro
    showFavorites: async (request, response) => {
        let { book_id } = request.params;
        let favsBook = await Notebook.sum(
            'favorite',
            {where: { book_id } }
        )
        return response.json(favsBook);
    },
    showBookByName: async (request, response) =>{
        let {book_name} = request.params;
        const book = await Book.findAll({
            where: {
                name:{
                    [Op.iLike]: `${book_name}%`
                } 
            }
        })
        return response.render('info_livro', {books: book});
    }   
}

module.exports = booksController;