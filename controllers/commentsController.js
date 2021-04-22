const {request} = require('express');
const {Comment} = require('../models');

const commentsController = {
    index: async (request,response) => {
        const comments = await Comment.findAll();
        return response.json(comments)
    },
    create: async (request,response) => {
        let {title, text, user_id, post_id} = request.body;
        let newComment = await Comment.create({
            title, 
            text,
            user_id,
            post_id
        });
        return response.json(newComment);
    },
    update: async (request,response) => {
        let {title, text, user_id, post_id} = request.body;
        let {id} = request.params;
        let newCommentUpdate = await Comment.update({
            title, 
            text,
            user_id,
            post_id
        },{
            where:{id}
        });
        return response.json(newCommentUpdate);
    },
    delete: async (request,response) => {
        let {id} = request.params;
        let commentDeleted = await Comment.destroy({
            where:{id}    
        });
        return response.json(commentDeleted);
    }

}
module.exports = commentsController;
