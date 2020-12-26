const router = require('express').Router();
const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', { 
    title: 'Account',
    firstName: req.user.firstName,
    lastName: req.user.lastName
  });
});

module.exports = router;