const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = {
  create,
  deleteComment,
};


async function create(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  req.body.post = req.params.id;
  try {
    const comment = await Comment.create(req.body);
    await Post.findByIdAndUpdate(req.body.post, { $push: { comments: comment._id } });
    res.redirect('/posts/home');
  } catch (err) {
    console.log(err);
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).send('Comment not found');

    if (comment.user.equals(req.user._id)) {
      await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });
      await Comment.findByIdAndDelete(req.params.commentId);
      res.redirect('back');
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (err) {
    console.error(err);
  }
}

