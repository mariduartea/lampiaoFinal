
const { Book, sequelize, Notebook, Post } = require('../models');
const { Op, where } = require('sequelize');
const { request, response } = require('express');

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

        //Mostrar os mais bem avaliados
        let listBestGrades = {};
        for (livro of books) {
            let bookCount = await Notebook.count({
                where: { [Op.and] :
                    [{book_id: livro.id},
                    {status: 'Lido'},
                    {grade: {[Op.gte]: 1}}]}
            });
            let bookGrade = await Notebook.sum(
                'grade',
                { where: { [Op.and] :
                    [{book_id: livro.id},
                    {status: 'Lido'}] } }
            );
            let meanGrade = 0
            if (bookCount > 0) {
                meanGrade = bookGrade / bookCount;
            }

            meanGrade = meanGrade.toFixed(1);
            let newKey = livro.id;
            let newValue = meanGrade;
            listBestGrades[newKey] = newValue
        }
        let k = [];
        let v = [];
        k.push(Object.keys(listBestGrades));
        v.push(Object.values(listBestGrades));

        let bestGradesArray = [];
        for (i = 0; i < v[0].length; i++) {
            if (v[0][i] >= 4.0) {
                bestGradesArray.push(parseInt(k[0][i], 10));
            }
        };
        let bestGrades = await Book.findAll({
            where: {
                id: { [Op.in]: bestGradesArray }
            }
        });

        //Mostrar os mais favoritados
        let listMostFavorites = {};
        for (livro of books) {
            
            let bookFav = await Notebook.sum(
                'favorite',
                { where: { book_id: livro.id } }
            );
            let bestKey = livro.id;
            let bestValue = parseInt(bookFav,10)+ (livro.id/100000);
            listMostFavorites[bestKey] = bestValue
        }

        let sortMostFavs = Object.entries(listMostFavorites).sort((a,b) => b[1]-a[1])
        
        let mostFavoritesArray = [];
        let f = 0;
        for (i = 0; i < sortMostFavs.length; i++) {
            f++;
            if (f > 10){
                break;
            };
            mostFavoritesArray.push(parseInt(sortMostFavs[i][0], 10));
        };
        
        let mostFavs = await Book.findAll({order: sequelize.literal('id DESC'), 
            where: {
                id: { [Op.in]: mostFavoritesArray }
            }
        });

        return response.render('timeline', { listaLivros: books, bookListName, listAllBooks, listNumBooks, 
            booksLastAdded, bestGrades, mostFavs })

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
        let postsByBook = await Post.findAll({
            include: ['user'],
            where: {
                book_id: id
            }
        });

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
            where: {
                [Op.and] :
                [{book_id: id},
                {status: 'Lido'},
            {grade: {[Op.gte]: 1}}]
        }});
        let bookGrade = await Notebook.sum(
            'grade',
            { where: { [Op.and] :
                [{book_id: id},
                {status: 'Lido'}] } }
        );
        // console.log(bookGrade);
        let meanGrade = 0
        if (bookCount > 0) {
            meanGrade = bookGrade / bookCount;
        }

        meanGrade = meanGrade.toFixed(1);

        let user_id = request.session.usuarioLogado.id
        let searchNotebook = await Notebook.findOne({
            where: {
                [Op.and]: [{user_id: user_id},
                {book_id: id}]
            }
        })


        return response.render('info_livro', { showBookInfo: books, postsByBook, statusCountList, bookmark, meanGrade, bookCount,searchNotebook })
    },

    addAtNotebook: async (request, response) => {

        let { grade, status, favorite } = request.body;
        let user_id = request.session.usuarioLogado.id
        let book_id = request.session.livroLogado.id
        let lastNotebook = await Notebook.findOne({
            where: {
                [Op.and]: [{
                    user_id: user_id
                },
                {
                    book_id: book_id
                }]
            }
        })
        if (!lastNotebook) {
            let newNotebook = await Notebook.create({
                user_id,
                grade,
                status,
                favorite,
                book_id
            });
            return response.redirect(`books/${newNotebook.book_id}`);
        }
        return response.redirect(`books/${book_id}`);
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
    },

    addAtFavorites: async (request, response) => {

        let { favorite, grade, status } = request.body;
        let user_id = request.session.usuarioLogado.id
        let book_id = request.session.livroLogado.id

            let favorites = await Notebook.update({
                favorite, grade, status
            }, {
                where: { [Op.and]: [{
                    user_id: user_id
                },
                {
                    book_id: book_id
                }]}
            })
        // }

        return response.redirect(`http://localhost:3000/books/${book_id}`);
    },
    deleteNotebook: async (request, response) => {
        let book_id = request.session.livroLogado.id;
        let user_id = request.session.usuarioLogado.id;

        let notebookDeleted = await Notebook.destroy(
            {where:{
                [Op.and]:
                    [{book_id:book_id},
                    {user_id:user_id}]
                
            }}
        )
        return response.redirect(`http://localhost:3000/books/${book_id}`);
    }



}

module.exports = booksController;