var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
// const details = require("./details.json");
const nodemailer =require("nodemailer");
const bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

//middleware parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//tells console to listen on port 
app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});


//endpoint for the email sent from frontend
app.post("/sendmail", (req, res) => {
  console.log("request came");
  console.log(req.body);
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has been sent 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'test.todoolie@gmail.com ',
      pass: 'WayneState@'
    }
  });

  
  let mailOptions = {
    from: '"ToDoolie"<example.gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Wellcome to ToDoolie!!", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h3>We appreciate your interest in joining our team and look forward to meeting with you!
       To join our platform, visit us at <a href="https://todoolie.com/studentsignup/">Be A ToDoolie Helper</a> 
       if you have not registered yet. 
       Please contact us at (313) 777-8052 for more information. </h3>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}



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


module.exports = app;
