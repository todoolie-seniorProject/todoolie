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

module.exports= Task;