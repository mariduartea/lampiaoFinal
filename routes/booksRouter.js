const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const loginAuthenticate = require('../middlewares/LoginAuthenticate');
// const methodPut = require('../middlewares/MethodPut');

router.get('/', booksController.index);
// router.post('/', BookAuthenticate, booksController.create);
router.post('/', booksController.create);
// router.put('/:id', booksController.update);
router.delete('/:id', booksController.delete);
router.post('/carousel', booksController.showBooksCarousel);
router.get('/:book_id/grade', booksController.showBookGrade); 
router.get('/favorites/:book_id', booksController.showFavorites);
router.get('/by_name', booksController.showBookByName);
router.get('/by_writer', booksController.showBooksByWriter);
router.get('/by_publishing/:publishing_name', booksController.showBookwByPublishingCompany);
router.get('/:id', loginAuthenticate, booksController.showBookById); 
router.put('/:id', booksController.addSynopsis);

module.exports = router;
