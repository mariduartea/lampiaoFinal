const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const userAuthenticate = require('../middlewares/UserAuthenticate');
const loginAuthenticate = require('../middlewares/LoginAuthenticate');

/* GET users listing. */
router.get('/', usersController.index);

// router.get('/login', usersController.login);
router.get('/login', usersController.login);
router.get('/cadastro', usersController.cadastro);

// router.get('/info_livro', usersController.perfil); //teste para o perfil

router.post('/login', usersController.auth);

router.post('/', userAuthenticate, usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);
router.get('/perfil', loginAuthenticate, usersController.showUserProfile);

module.exports = router;