const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');



router.get('/home', ensureLoggedIn, postsCtrl.index);
// GET (/new) 
router.get('/new', ensureLoggedIn, postsCtrl.new);
// POST (/)
router.post('/', ensureLoggedIn, postsCtrl.create);
// GET (/:id/edit)
router.get('/:id/edit', ensureLoggedIn, postsCtrl.edit);
// PUT (/:id) for a user to edit their post
router.put('/:id', ensureLoggedIn, postsCtrl.update);
// DELETE (/:id) for a user to delete a post
router.delete('/:id', ensureLoggedIn, postsCtrl.delete);
// POST (/:id/like) for a user to like a post
router.post('/:id/like', ensureLoggedIn, postsCtrl.like);
// POST (/:id/unlike) for a user to unlike a post they have liked
router.post('/:id/unlike', ensureLoggedIn, postsCtrl.unlike);

module.exports = router;