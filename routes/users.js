/*
Filename: users.js
Author: Kevin Lamanna
StudentID: 301224451
Web App name: https://kevin-lamanna-comp229-midterm-fd3a782db0d9.herokuapp.com/
*/

let express = require('express');
let router = express.Router();
let usersController = require('../controllers/user');
let passport = require('passport');

// Routes for sign-up
router.get('/signup', usersController.renderSignup);
router.post('/signup', usersController.signup);

// Routes for sign-in
router.get('/signin', usersController.renderSignin);
router.post('/signin', usersController.signin);

// Route for sign-out
router.get('/signout', usersController.signout);

module.exports = router;
