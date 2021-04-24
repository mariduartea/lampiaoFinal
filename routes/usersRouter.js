const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const userAuthenticate = require('../middlewares/UserAuthenticate');

/* GET users listing. */
router.get('/', usersController.index);
router.post('/', userAuthenticate, usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);
router.get('/:user_id/notebooks', usersController.showNotebooksUser);


module.exports = router;