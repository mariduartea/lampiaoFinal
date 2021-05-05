
const {Book, sequelize, Notebook, Post} = require('../models');
const { Op } = require('sequelize');

const booksController = {
    index: async (request, response) => {
        let books = await Book.findAll();
        // return response.json(books);
        return response.render('timeline', {listaLivros: books})
    },
    create: async (request, response) => {
        let{name, isbn, publishing_company, writer, genre, n_pages, year_publication, img} = request.body;
        
        try {
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
            return response.status(201).render('timeline');    
        } catch (error) {
            return response.status(500).send(error);
        }
        
        // return response.json(newBook); 
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

    // FUNÇÃO QUE MOSTRA OS DADOS NA VIEW INFO_LIVRO
    showBookById: async (request, response) => {
        let { id } = request.params;
        
        // Mostrar informações do livro
        let books = await Book.findOne({
            where: {
                id
            }
        });
        
        request.session.livroLogado = books;
        console.log(books.id);
        let postsByBook = await Post.findAll({
            include: ['user'],
            where: {
                book_id: id
            }
        });
        // console.log(postsByBook.user);
        
        // let userNameByPost = await Post.findAll({
        //     include: ['user'],
        //     where: {
        //         book_id: id
        //     }
        // });

        // Mostrar os status do livro
        let statusList = ['Lido', 'Lendo', 'Quero ler'];
        let statusCountList = [];
        for (statusName of statusList) {
            let bookStatusCount = await Notebook.count({
                where: 
                {[Op.and]:
                    [{book_id: id},
                    {status: statusName}]
                }
            });
            statusCountList.push(bookStatusCount)
        };

        // Mostrar quantas vezes o livro foi favoritado
        let bookmark = await Notebook.count({
            where: 
                {[Op.and]:
                    [{book_id: id},
                    {favorite: true}]
                }
        });


        let bookCount = await Notebook.count({
            where: { book_id: {[Op.eq]: id}}
        });
        let bookGrade = await Notebook.sum(
            'grade',
            {where: {book_id:id}}
        );

        let meanGrade = bookGrade/bookCount;
        meanGrade = meanGrade.toFixed(1);
        



        // console.log(request.session.usuarioLogado.id);
        return response.render('info_livro', {showBookInfo: books, postsByBook, statusCountList, bookmark, meanGrade, bookCount}) 
    },

    addAtNotebook: async (request, response) => {

        let{ grade, status, favorite } = request.body;
        let newNotebook = await Notebook.create({
            user_id: request.session.usuarioLogado.id,
            grade,
            status,
            favorite,
            book_id: request.session.livroLogado.id          
        });

        return response.redirect(`books/${newNotebook.book_id}`);
    },

    addSynopsis: async (request, response) => {
        
        let { synopsis } = request.body;
        let newSynopsis = await Book.update({
            synopsis},{
                where: {id:request.session.livroLogado.id }
        });
        let idBookSynopsis = request.session.livroLogado.id;
        // console.log(r);
        return response.redirect(`${idBookSynopsis}`);   
    }

}

module.exports = booksController;