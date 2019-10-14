//this model file will communicate with SQL related to referrals/fariha

var sql = require('./db.js');  //this file contains our SQL username/pass/database name

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getAllReferrals = function (result) {
    sql.query("SELECT * from Referrals", function (err, res) { //select all data from referrals table and return to controller

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('tasks : ', res);  
                result(null, res); // send result to controller
            }
        });   
};

Task.createReferral = function (body, result) {    // model function which will actually insert ddata in referral table
    //the below is the query to insert data, it takes from user the username and rollnum and set status 0 as in start
    //the status of the referral will be 0, it will later be changed on verification
    sql.query("INSERT INTO Referrals (Username, Rollnum, Status) values (?,?,0)", [body.username, body.rollnum], function (err, res) {
            
            if(err) {
                console.log("error: ", err); // iff error occurs, show
                result(err, null);
            }
            else{
                console.log(res);
                result(null, res); //if no error occurs, show res which means response
            }
        });           
};

module.exports= Task;