var express = require('express');
const booksController = require('../controllers/booksController');
// const usersController = require('../controllers/usersController');
const router = express.Router();

/* GET home page. */
router.get('/timeline', booksController.index);

// router.get('/:book_id/', booksController.showBookGrade); 
// router.get('/:id', booksController.showBookById);
// router.get('/:id', usersController.showUserProfile);
// router.get(`/:user_id/notebooks/${status}/quantity`, usersController.showQuantityByStatus);
// router.get('/login', usersController.login);
// router.get('/cadastro', usersController.cadastro);


module.exports = router;
