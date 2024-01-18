const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST (/posts/:id/comments) for a user to create a comment
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create);
// DELETE (/:commentID) for a user to delete their comment
router.delete('/:commentId', ensureLoggedIn, commentsCtrl.deleteComment);
// POST (/:commentId/like) for a user to like a comment
router.post('/:commentId/like', ensureLoggedIn, commentsCtrl.like);
// POST (/:commentId/unlike) for a user to unlike a comment they have liked
router.post('/:commentId/unlike', ensureLoggedIn, commentsCtrl.unlike);

module.exports = router;