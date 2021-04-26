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
router.get('/:user_id/notebooks/favorites', usersController.showFavoritebooksUser);
router.post('/:user_id/notebooks/status', usersController.showBooksByStatus);
router.post('/:user_id/notebooks/status/quantity', usersController.showQuantityByStatus);
router.get('/:user_id', usersController.showTotalPages) //DEU MERDA!

module.exports = router;