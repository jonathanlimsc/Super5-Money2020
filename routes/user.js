var express = require('express');
var router = express.Router();
var passport = require("passport");

router.get('/auth/facebook',
  passport.authenticate('facebook')
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// /* Handle Login POST */
// router.post('/login', passport.authenticate('login', {
//   successRedirect: '/home',
//   failureRedirect: '/',
//   failureFlash : true
// }));
//
// /* GET Registration Page */
// router.get('/signup', function(req, res){
//   res.render('register',{message: req.flash('message')});
// });
//
// /* Handle Registration POST */
// router.post('/signup', passport.authenticate('signup', {
//   successRedirect: '/home',
//   failureRedirect: '/signup',
//   failureFlash : true
// }));
//
// /* GET Home Page */
// router.get('/home', isAuthenticated, function(req, res){
// 	res.render('home', { user: req.user });
// });
//
// /* Handle Logout */
// router.get('/signout', function(req, res) {
// 	req.logout();
// 	res.redirect('/');
// });

module.exports = router;
