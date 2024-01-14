const Comment = require('../models/comment');

module.exports = {
  create,
};

async function create(req, res) {
  req.body.user = req.user._id;
  req.body.post = req.params.id;
  try {
    await Comment.create(req.body);
    res.redirect('/posts/home' + req.params.id);
  } catch (err) {
  }
}



