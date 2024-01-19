const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = {
  create,
  deleteComment,
  like,
  unlike,
};

async function create(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  req.body.post = req.params.id;
  try {
    const comment = await Comment.create(req.body);
    await Post.findByIdAndUpdate(req.body.post, { $push: { comments: comment._id } });
  } catch (err) {
    console.log(err);
  }
  res.redirect('/posts/home');
}

async function deleteComment(req, res) {
  const comment = await Comment.findOneAndDelete({ _id: req.params.commentId, user: req.user._id });
  if (comment) {
    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });
  }
  res.redirect('/posts/home');
}

async function like(req, res) {
  await Comment.findByIdAndUpdate(req.params.commentId, { $addToSet: { likes: req.user._id } });
  res.redirect('/posts/home');
}

async function unlike(req, res) {
  await Comment.findByIdAndUpdate(req.params.commentId, { $pull: { likes: req.user._id } });
  res.redirect('/posts/home');
}
