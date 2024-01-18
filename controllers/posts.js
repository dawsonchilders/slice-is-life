const Post = require('../models/post');

module.exports = {
  index,
  new: newPost,
  create,
  edit,
  update,
  delete: deletePost,
  like,
  unlike,
};

async function index(req, res) {
    const posts = await Post.find({}).sort('-createdAt').populate('comments').exec();
    res.render('posts/home', { title: 'Blog Posts', posts });
}

function newPost(req, res) {
  res.render('posts/new', { title: 'New Post' });
}

async function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  try {
    await Post.create(req.body);
    res.redirect('/posts/home');
  } catch (err) {
    res.render('posts/new', { title: 'New Post', error: 'Error creating post' });
  }
}

async function edit(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post.user.equals(req.user._id)) return res.redirect('/posts');
  res.render('posts/edit', { title: 'Edit Post', post });
}

async function update(req, res) {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!post.user.equals(req.user._id)) return res.redirect('/posts/home');
  res.redirect('/posts/home');
}

async function deletePost(req, res) {
  const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!post.user.equals(req.user._id)) return res.redirect('/posts/home');
  res.redirect('/posts/home');
}

async function like(req, res) {
    await Post.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } });
    res.redirect('/posts/home');
}

async function unlike(req, res) {
    await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } });
    res.redirect('/posts/home');
}
