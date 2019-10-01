var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mysql = require('mysql'); //defining mysql library, here we defined mysql library

var app = express();

const db= mysql.createConnection({ // create this database on ur localhost
  host: 'localhost', // we typed this syntax to connect to our mysql database
  user:'root', // this is the username of connection
  password: '12345', //password for connection
  databse: 'todoolie_db' //the name of database with which we will be communicating
});

//Attempting to connect with database given our current credentials for database
db.connect((err) => { // here we attempt to connect with db, "db" variable has stored the connection above
  if(err){
    throw err; // if error occurs during trying to connect, it will be shown on console
  }
  //if doesnt throw error, means connected to the databse
  console.log("Fariha db connected"); // so this means no error, so we print a message to show we are connected
  db.query("use todoolie_db"); // we type this to use the database todoolie_db
  db.query('SELECT * from Users', function(err, rows, fields) { // so we simply call "SELECT * FROM Users" which
  //selects all users from the database and puts it in rows variable
    if(err) {
      throw err;
    }
    console.log('Data: ', rows) // then we print the rows here.
  })
});

// making global variable so database is accisbile in all the modules and middleware
global.db = db

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
