const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/home', ensureLoggedIn, postsCtrl.index);
router.get('/new', ensureLoggedIn, postsCtrl.new); // Form to create a new post
router.post('/', ensureLoggedIn, postsCtrl.create); // Submit a new post
router.get('/:id/edit', ensureLoggedIn, postsCtrl.edit); // Form to edit a post
router.put('/:id', ensureLoggedIn, postsCtrl.update); // Submit the updated post
router.delete('/:id', ensureLoggedIn, postsCtrl.delete); // Delete a post

module.exports = router;