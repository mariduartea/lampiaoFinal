
const { Book, sequelize, Notebook, Post } = require('../models');
const { Op } = require('sequelize');

const booksController = {
    index: async (request, response) => {
        let { name } = request.body;
        let books = await Book.findAll();
        // return response.json(books);

        const bookListName = await Book.findAll({
            where: {
                name: {
                    [Op.like]: `${name}%`
                }
            }
        })

        /*PARA A BARRA DE PESQUISA */
        let listAllBooks = [];
        for (livro of books) {
            listAllBooks.push(livro.name);
        }
        let listNumBooks = [];
        for (livro of books) {
            listNumBooks.push(livro.id);
        }

        //Mostrar os últimos adicionados
        let booksLastAdded = await Book.findAll({ order: sequelize.literal('id DESC') });
        // console.log(booksLastAdded);

        let listMostFavorites = {};
        for (livro of books) {
            let bookCount = await Notebook.count({
                where: { book_id: { [Op.eq]: livro.id } }
            });
            let bookGrade = await Notebook.sum(
                'grade',
                { where: { book_id: livro.id } }
            );
            console.log(bookGrade);
            let meanGrade = 0
            if (bookCount > 0) {
                meanGrade = bookGrade / bookCount;
            }

            meanGrade = meanGrade.toFixed(1);
            // listMostFavorites.push(meanGrade);
            let newKey = livro.id;
            let newValue = meanGrade;
            listMostFavorites[newKey] = newValue
        }
        let k = [];
        let v = [];
        k.push(Object.keys(listMostFavorites));
        v.push(Object.values(listMostFavorites));

        let favoriteArray = [];
        for (i=0; i<v[0].length;i++){
            console.log(typeof v[0][i]);
            if (v[0][i] >= 4.0){
                favoriteArray.push(parseInt(k[0][i],10));
            }
        };
        console.log(favoriteArray)
        // let favs;
        // for (n of favoriteArray){
            // console.log(n);
            let favs = await Book.findAll({
                where: {
                id: { [Op.in]: favoriteArray }}
            // })
        });
        console.log(favs)
        // console.log(`Keys: ${k}`);
        // console.log(`Values: ${v}`);
        // console.log(`Mais bem avaliados: ${favoriteArray}`);
        
        return response.render('timeline', { listaLivros: books, bookListName, listAllBooks, listNumBooks, booksLastAdded, f:favs })

    },
    create: async (request, response) => {
        let { name, isbn, publishing_company, writer, genre, n_pages, year_publication, img } = request.body;

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
        let { id } = request.params;
        let { name, isbn, publishing_company, writer, genre, n_pages, year_publication } = request.body;

        let bookUpdate = await Book.update({
            name,
            isbn,
            publishing_company,
            writer,
            genre,
            n_pages,
            year_publication
        }, {
            where: { id }
        })
        return response.json(bookUpdate);
    },
    delete: async (request, response) => {
        let { id } = request.params;
        let bookDeleted = await Book.destroy({
            where: { id }
        });
        return response.json(bookDeleted);
    },
    showBookByName: async (request, response) => {
        let { book_name } = request.body;
        const book = await Book.findAll({
            where: {
                name: {
                    [Op.like]: `${book_name}%`
                }
            }
        })
        return response.json(book);
    },
    showBooksByWriter: async (request, response) => {
        let { writer_name } = request.body;
        const books_list = await Book.findAll({
            where: {
                writer: {
                    [Op.like]: `${writer_name}%`
                }
            }
        })
        return response.json(books_list);
    },
    showBookwByPublishingCompany: async (request, response) => {
        let { publishing_name } = request.params;
        const books_list = await Book.findAll({
            where: {
                publishing_company: {
                    [Op.like]: publishing_name
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
        console.log(books);
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
                {
                    [Op.and]:
                    [{ book_id: id },
                    { status: statusName }]
                }
            });
            statusCountList.push(bookStatusCount)
        };

        // Mostrar quantas vezes o livro foi favoritado
        let bookmark = await Notebook.count({
            where:
            {
                [Op.and]:
                [{ book_id: id },
                { favorite: true }]
            }
        });


        let bookCount = await Notebook.count({
            where: { book_id: { [Op.eq]: id } }
        });
        let bookGrade = await Notebook.sum(
            'grade',
            { where: { book_id: id } }
        );
        console.log(bookGrade);
        let meanGrade = 0
        if (bookCount > 0) {
            meanGrade = bookGrade / bookCount;
        }

        meanGrade = meanGrade.toFixed(1);





        // console.log(request.session.usuarioLogado.id);
        return response.render('info_livro', { showBookInfo: books, postsByBook, statusCountList, bookmark, meanGrade, bookCount })
    },

    addAtNotebook: async (request, response) => {

        let { grade, status, favorite } = request.body;
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
            synopsis
        }, {
            where: { id: request.session.livroLogado.id }
        });
        let idBookSynopsis = request.session.livroLogado.id;
        // console.log(r);
        return response.redirect(`${idBookSynopsis}`);
    }

}

module.exports = booksController;