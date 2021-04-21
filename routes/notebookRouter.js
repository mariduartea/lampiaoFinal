const express = require('express');
const router = express.Router();
const notebookController = require('../controllers/notebookController');

router.get('/', notebookController.index);
router.post('/', notebookController.create);
router.put('/:id', notebookController.update);
router.delete('/:id', notebookController.delete);

module.exports = router;