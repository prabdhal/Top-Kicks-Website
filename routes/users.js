const router = require('express').Router();
const bcrypt = require('bcryptjs'); // helps hash passwords
const passport = require('passport');
const User = require('../models/user'); // user schema for db documentation
const Subscribe = require('../models/subscribe');
const {
  regValidateSchema,
  subValidateSchema,
} = require('../config/validation');

router.get('/account-login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/account-register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Registration
router.post('/account-register', async (req, res) => {
  let errors = [];

  // validate data before we send
  try {
    const result = await regValidateSchema.validateAsync(req.body);
    console.log(result);
  } catch (err) {
    errors.push({ msg: err.details[0].message });
  }

  // checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    errors.push({ msg: 'Email already exists, use a different email' });
  }

  // hash the passwords
  const hashedPass = await bcrypt.hash(req.body.password, 10);

  if (errors.length > 0) {
    res.render('register', {
      errors,
      title: 'Register',
    });
  } else {
    //create a new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPass,
    });
    try {
      const savedUser = await user.save();
      req.flash('success_msg', 'You are now registered and can log in');
      res.redirect('/account-login');
    } catch (err) {
      console.log(err);
      return res.status(400).redirect('/account-register');
    }
  }
});

// Login In
router.post('/account-login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/account',
    failureRedirect: '/account-login',
    failureFlash: true,
  });
});

// Log Out
router.get('/account-logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You have logged out');
  res.redirect('/home');
});

// Subscription
router.post('/home', async (req, res) => {
  let errors = [];

  // Validate data before we send
  try {
    const result = await subValidateSchema.validateAsync(req.body);
    console.log(result);
  } catch (err) {
    errors.push({ msg: err.details[0].message });
  }

  // checking if the user is already in the database
  const emailExist = await Subscribe.findOne({ email: req.body.email });
  if (emailExist) {
    errors.push({ msg: 'Email already exists' });
  }

  if (errors.length > 0) {
    res.render('index', {
      errors,
      title: 'Home',
    });
  } else {
    const subscribe = new Subscribe(req.body);
    subscribe
      .save()
      .then((result) => {
        req.flash('success_msg', 'You have successfully subscribed');
        res.redirect('/home');
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).redirect('/');
      });
  }
});

module.exports = router;
