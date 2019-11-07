var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const bodyParser = require('body-parser');

const port = 3000
var app = express();

const routes = {
  login: require('./routes/index'), 
}

let APIS = {
  mobile: express(),
}

APIS.mobile.use(bodyParser.json());
APIS.mobile.use(bodyParser.urlencoded({ extended: true }));

//  ENABLE CORS
const corsOptions = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
}

//set cors for main app
app.use((req, res, next) => {
  Object.keys(corsOptions).forEach(function (key) {
    res.setHeader(key, corsOptions[key])
  });
  next();
});

//Set cors for all sub apis
Object.keys(APIS).forEach(function (key) {
  APIS[key].use((req, res, next) => {
    Object.keys(corsOptions).forEach(function (key) {
      res.setHeader(key, corsOptions[key])
    });
    next();
  });
});

Object.keys(routes).forEach(function (key) {
  let ROUTE = routes[key];
  // route string is the routes key without 'Route'. EX: signinRoute -> /api/signin
  let routeStr = "/" + key.substr(0, key.length - 6)
  APIS.mobile.use(routeStr, ROUTE);
});

APIS.mobile.use((req, res, next) => {
  const error = new Error('Page Not Found');
  error.status = 404;
  next(error);
})

APIS.mobile.use((error, req, res, next) => { //error handling middleware
  console.log(colors.red(figures.cross, ' 500: '), error.message);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// mount all sub apis in subdirs
Object.keys(APIS).forEach(function (key) {
  app.use("/"+key, APIS[key])
});





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

<<<<<<< HEAD
=======
 var originsWhitelist = [
  'http://localhost:4200' //allowing requests from this website, which is our front-end
 
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));

>>>>>>> master
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


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

app.listen(port, () => console.log(`Listening on port... ${port}!`))
module.exports = app;
