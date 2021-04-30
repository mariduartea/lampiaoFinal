const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const BookAuthenticate = require('../middlewares/BookAuthenticate')

router.get('/', booksController.index);
router.post('/', BookAuthenticate, booksController.create);
router.put('/:id', booksController.update);
router.delete('/:id', booksController.delete);
router.post('/carousel', booksController.showBooksCarousel);
router.get('/:book_id', booksController.showBookGrade); 
router.get(':book_id', booksController.showFavorites);
router.get('/:id', booksController.showBookById); 

module.exports = router;
