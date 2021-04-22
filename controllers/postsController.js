const { request } = require('express');
const { Post } = require('../models/');

const postsController = {
    index: async (request, response) => {
        const post = await Post.findAll();
        return response.json(post);
    },

    create: async (request, response) => {
        let {title, text, user_id, book_id, created_at, updated_at, is_it_public} = request.body;

        let newPost = await Post.create({
            title, 
            text, 
            user_id, 
            book_id, 
            created_at, 
            updated_at, 
            is_it_public
        });

        return response.json(newPost);
    },

    show: async (request, response) => {
        let { id } = request.params;
        let posts = await Post.findAll({
            where: {
                user_id: id
            }}
        );
        return response.json(posts);
    },

    showBook: async (request, response) => {
        let { id } = request.params;
        let postsByBook = await Post.findAll({
            where: {
                book_id: id
            }
        });
        return response.json(postsByBook);
    },

    update: async (request, response) => {
        let {id} = request.params;
        let { title, text, user_id, book_id, created_at, updated_at, is_it_public } = request.body;

        let postUpdate = await Post.update({
            title, 
            text, 
            user_id, 
            book_id, 
            created_at, 
            updated_at, 
            is_it_public
        }, {
            where: { id } });
        return response.json(postUpdate);
    },

    delete: async (request, response) => {
        let {id} = request.params;

        let postDeleted = await Post.destroy({
            where: { id }
        });

        return response.json(postDeleted);
    }


}

module.exports = postsController;