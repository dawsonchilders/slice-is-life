const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /posts  (display all posts)
router.get('/home', ensureLoggedIn, postsCtrl.index);
// GET / posts/new (for to create a new post)
router.get('/new', ensureLoggedIn, postsCtrl.new);
// POST /posts  (submit a new post) 
router.post('/', ensureLoggedIn, postsCtrl.create);
// GET /posts/:id/edit (for to edit a post)
router.get('/:id/edit', ensureLoggedIn, postsCtrl.edit);
// PUT /posts/:id (submit the updated post)
router.put('/:id', ensureLoggedIn, postsCtrl.update);
// DELETE /posts/:id (deletes a post)
router.delete('/:id', ensureLoggedIn, postsCtrl.delete);

module.exports = router;