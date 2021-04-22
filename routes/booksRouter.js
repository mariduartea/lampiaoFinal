const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const BookAuthenticate = require('../middlewares/BookAuthenticate')

router.get('/', booksController.index);
router.post('/', BookAuthenticate, booksController.create);
router.put('/:id', booksController.update);
router.delete('/:id', booksController.delete);

module.exports = router;
