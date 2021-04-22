const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const postAuthenticate = require('../middlewares/PostAuthenticate')

router.get('/', postsController.index);
router.get('/:id', postsController.show);
router.get('/book/:id', postsController.showBook);
router.post('/', postAuthenticate, postsController.create);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.delete);

module.exports = router;