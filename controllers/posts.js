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
  try {
    const posts = await Post.find({}).sort('-createdAt').populate('comments').exec();
    res.render('home', { title: 'Blog Posts', posts });
  } catch (err) {
    console.log(err);
  }
}

function newPost(req, res) {
  res.render('posts/new', { title: 'New Post' });
}

async function create(req, res) {
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
  res.redirect('/posts/home');
}

async function deletePost(req, res) {
  await Post.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.redirect('/posts/home');
}

async function like(req, res) {
  try {
    await Post.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } });
    res.redirect('back');
  } catch (err) {
    console.log(err);
  }
}

async function unlike(req, res) {
  try {
    await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } });
    res.redirect('back');
  } catch (err) {
    console.log(err);
  }
}
