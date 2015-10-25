process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('./config/mongoose');

var query = require('./routes/query');
var user = require('./routes/user');

var app = express();
var db = mongoose();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'merchain love blockchain' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
// Initialize Passport-Facebook
var initPassportFacebook = require('./passport/facebook/init');
initPassportFacebook(passport);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// locate files in /public directory
app.use(express.static(path.join(__dirname, 'public')));

// mount query route file middleware with /q path
app.use('/q', query);

app.use('/user', user);

app.get("/", function(req, res) {
  res.render('index')
});

//
// // redirects invalid path to home page
// app.get('*', function(req, res) {
//     console.log("catch");
//     res.redirect('/');
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('[%s] App listening at http://%s:%s', process.env.NODE_ENV, host, port);
});

module.exports = app;
