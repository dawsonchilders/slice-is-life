var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Slice is Life' });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/posts/home',
    failureRedirect: '/'
  }
));

router.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/');
  });
});



module.exports = router;
