const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const BookAuthenticate = require('../middlewares/BookAuthenticate')

router.get('/', booksController.index);
router.post('/', BookAuthenticate, booksController.create);
router.put('/:id', booksController.update);
router.delete('/:id', booksController.delete);
router.post('/carousel', booksController.showBooksCarousel);
router.get('/:book_id/grade', booksController.showBookGrade); 
router.get('/favorites/:book_id', booksController.showFavorites);
router.get('/by_name', booksController.showBookByName);
router.get('/by_writer', booksController.showBooksByWriter);
router.get('/by_publishing/:publishing_name', booksController.showBookwByPublishingCompany);
router.get('/:id', booksController.showBookById); 

module.exports = router;
