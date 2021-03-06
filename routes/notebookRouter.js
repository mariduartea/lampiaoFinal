const express = require('express');
const router = express.Router();
const notebookController = require('../controllers/notebookController');
const booksController = require('../controllers/booksController');

router.get('/', notebookController.index);
// router.post('/', notebookController.create);
router.post('/', booksController.addAtNotebook);
router.put('/:id', booksController.addAtFavorites);
router.delete('/', booksController.deleteNotebook);




module.exports = router;