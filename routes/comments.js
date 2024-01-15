const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.post('/posts/:id/comments', ensureLoggedIn, commentsCtrl.create);
router.delete('/:commentId', ensureLoggedIn, commentsCtrl.deleteComment);


module.exports = router;