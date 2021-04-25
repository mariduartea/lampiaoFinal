const { Notebook, sequelize} = require('../models');

const notebookController = {
    index: async (request, response) => {
        let notebooks = await Notebook.findAll();
        return response.json(notebooks);
    },
    create: async (request, response) => {
        let{user_id, grade, status, favorite, book_id} = request.body;
        let newNotebook = await Notebook.create({
            user_id,
            grade,
            status,
            favorite,
            book_id            
        });
        return response.json(newNotebook); 
    },
    update: async (request, response) => {
        let { id } = request.params;
        let { user_id, grade, status, favorite, book_id } = request.body;

        let notebookUpdate = await Notebook.update({
            user_id,
            grade,
            status,
            favorite,
            book_id   
        }, {
            where: {id}
        });
        return response.json(notebookUpdate);        
    },

    delete: async (request, response) => {
        let {id} = request.params;
        let notebookDeleted = await Notebook.destroy({
            where: {id}
        });
        return response.json(notebookDeleted);
    },

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

}

module.exports = notebookController;