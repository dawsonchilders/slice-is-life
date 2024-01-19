const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// All paths start with "/"

router.get('/home', ensureLoggedIn, postsCtrl.index);
// GET (/new) 
router.get('/new', ensureLoggedIn, postsCtrl.new);
// POST (/)
router.post('/', ensureLoggedIn, postsCtrl.create);
// GET (/:id/edit)
router.get('/:id/edit', ensureLoggedIn, postsCtrl.edit);
// PUT (/:id)
router.put('/:id', ensureLoggedIn, postsCtrl.update);
// DELETE (/:id)
router.delete('/:id', ensureLoggedIn, postsCtrl.delete);
// POST (/:id/like)
router.post('/:id/like', ensureLoggedIn, postsCtrl.like);
// POST (/:id/unlike)
router.post('/:id/unlike', ensureLoggedIn, postsCtrl.unlike);

module.exports = router;