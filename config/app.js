/*
Filename: app.js
Author: Kevin Lamanna
StudentID: 301224451
Web App name: https://kevin-lamanna-comp229-midterm-fd3a782db0d9.herokuapp.com/
*/

// module imports

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');

let app = express();

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "sessionSecret"
}));

// Router imports
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let carsRouter = require('../routes/car');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

// Sets up flash and passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routers (with paths)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cars', carsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
