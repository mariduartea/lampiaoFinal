const { request, response } = require('express');
const {Book, sequelize, Notebook} = require('../models');
const { Op } = require('sequelize');

const booksController = {
    index: async (request, response) => {
        let books = await Book.findAll();
        // return response.json(books);
        return response.render('info_livro', {listaLivros: books})
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
        const {page, limit} = request.params;
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
        // let book_id = 2;

        let bookCount = await Notebook.count({
            where: { book_id: {[Op.eq]: book_id}}
        });
        let bookGrade = await Notebook.sum(
            'grade',
            {where: {book_id}}
        );

        let meanGrade = bookGrade/bookCount;

        return response.render('info_livro', {nota: meanGrade})
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
        let {book_name} = request.body;
        const book = await Book.findAll({
            where: {
                name:{
                    [Op.like]: `${book_name}%`
                } 
            }
        })
        return response.json(book);
    },
    showBooksByWriter: async (request, response) =>{
        let {writer_name} = request.body;
        const books_list = await Book.findAll({
            where:{
                writer:{
                    [Op.like]: `${writer_name}%`
                }
            }
        })
        return response.json(books_list);
    },
    showBookwByPublishingCompany: async (request, response) =>{
        let {publishing_name} = request.params;
        const books_list = await Book.findAll({
            where:{
                publishing_company:{
                    [Op.like] : publishing_name
                }
            }
        })
        return response.json(books_list);
    },
    showBookById: async (request, response) => {
        let { id } = request.params;
        let books = await Book.findOne({
            where: {
                id
            }
        });
        // console.log(books.name)
        return response.render('info_livro', {showBookInfo: books})
        
    }
    
}

module.exports = booksController;