const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/home', ensureLoggedIn, postsCtrl.index);
router.get('/new', ensureLoggedIn, postsCtrl.new);
router.post('/', ensureLoggedIn, postsCtrl.create);
router.get('/:id/edit', ensureLoggedIn, postsCtrl.edit);
router.put('/:id', ensureLoggedIn, postsCtrl.update);
router.delete('/:id', ensureLoggedIn, postsCtrl.delete);
// POST (/:id/like) for a user to like a post
router.post('/:id/like', ensureLoggedIn, postsCtrl.like);
// POST (/:id/unlike) for a user to unlike a post they have liked
router.post('/:id/unlike', ensureLoggedIn, postsCtrl.unlike);


module.exports = router;