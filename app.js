var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db/db')();


var indexRouter = require('./routes/index');
var moveesRouter = require('./routes/mooves');
var directorsRouter = require('./routes/directors');

var app = express();


/* Middlewere  */
const tokenVerify = require('./middleware/token-verify')



/* SECRETKEY */
const config = require('./config/config');
app.set('api_secret_key', config.api_secret_key)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', indexRouter);
app.use('/', tokenVerify, moveesRouter);
app.use('/api/directors', directorsRouter);

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
  res.json({error: {message: err.message, code: err.code}})
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
