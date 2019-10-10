const mysql = require('mysql'); //defining mysql library, here we defined mysql library

const db= mysql.createConnection({ // create this database on ur localhost
    host: 'localhost', // we typed this syntax to connect to our mysql database
    user:'root', // this is the username of connection
    password: 'password', //password for connection
    database: 'todoolie_db' //the name of database with which we will be communicating
  });

//Attempting to connect with database given our current credentials for database
db.connect((err) => { // here we attempt to connect with db, "db" variable has stored the connection above
  if(err){
    throw err; // if error occurs during trying to connect, it will be shown on console
;
  }
  //if doesnt throw error, means connected to the databse
  console.log("Randy's database connected"); // so this means no error, so we print a message to show we are connected
  db.query("use todoolie_db"); // we type this to use the database todoolie_db
});

// making global variable so database is accisbile in all the modules and middleware
global.db = db

module.exports = db;