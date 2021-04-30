var express = require('express');
const booksController = require('../controllers/booksController');
var router = express.Router();

/* GET home page. */
// router.get('/', booksController.index);

// router.get('/:book_id/', booksController.showBookGrade); 
router.get('/:id', booksController.showBookById);

module.exports = router;
