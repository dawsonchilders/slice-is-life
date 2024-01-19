const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST (/posts/:id/comments) 
router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create);
// DELETE (/:commentID) 
router.delete('/:commentId', ensureLoggedIn, commentsCtrl.deleteComment);
// POST (/:commentId/like) 
router.post('/:commentId/like', ensureLoggedIn, commentsCtrl.like);
// POST (/:commentId/unlike) 
router.post('/:commentId/unlike', ensureLoggedIn, commentsCtrl.unlike);

module.exports = router;