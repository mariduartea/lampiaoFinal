var express = require('express');
// const booksController = require('../controllers/booksController');
const usersController = require('../controllers/usersController');
var router = express.Router();

/* GET home page. */
// router.get('/', booksController.index);

// router.get('/:book_id/', booksController.showBookGrade); 
// router.get('/:id', booksController.showBookById);
// router.get('/:id', usersController.showUserProfile);
// router.get(`/:user_id/notebooks/${status}/quantity`, usersController.showQuantityByStatus);
router.get('/login', usersController.login);
// router.get('/cadastro', usersController.cadastro);


module.exports = router;
