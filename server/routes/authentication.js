// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const {
//   ensureLoggedIn,
//   ensureLoggedOut
// } = require('connect-ensure-login');
//
//
//
// router.get('/', (req, res) => {
//   res.render('index', {
//     req
//   });
// });
//
// router.get('/login', (req, res) => {
//   res.render('authentication/login', {
//     req
//   });
// });
//
// router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));
//
// router.get('/signup', ensureLoggedOut(), (req, res) => {
//   res.render('authentication/signup', {
//     req
//   });
// });
//
// router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
//   successRedirect: '/',
//   failureRedirect: '/signup'
// }));
//
// router.post('/logout', ensureLoggedIn('/login'), (req, res) => {
//   req.logout();
//   res.redirect('/');
// });
//
//
//
// module.exports = router;
