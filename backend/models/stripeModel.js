var sql = require('./db.js');  //this file contains our SQL username/pass/database name

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.storeBankInfo = function (body, result) {
    
    // model function which will actually insert ddata in referral table
    //the below is the query to insert data, it takes from name, age, email, and school and inputs into the db.

    sql.query("INSERT INTO Bank_info values (?,?,?,?,?,?,?)", 
    [body.username, body.fname, body.lname, body.name, body.routing_no, body.account_no, body.email ], function (err, res) {
            
            if(err) {
                console.log("error: ", err); // iff error occurs, show
                result(err, null);
            }
            else{
                console.log(res);
                result(null, "success"); //if no error occurs, show res which means response
            }
        });           
};

module.exports= Task;