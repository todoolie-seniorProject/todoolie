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

    var userValid = 0, emailValid = 0;
    sql.query("select * from Users where Username = ?", body.username, function(err, res) {
        if(err) {
            console.log("error: ", err); // iff error occurs, show
            result(err, null); 
        }
        else {
            if(res.length > 0) {
                userValid = 1;
            }
        }
    });

    sql.query("select * from Students where Email = ?", body.email, function(err, res) {
        if(err) {
            console.log("error: ", err); // iff error occurs, show
            result(err, null); 
        }
        else {
            if(res.length > 0) {
                emailValid = 1;
            }
        }
    });

    sql.query("select * from Referrals where Email = ?", body.email, function(err, res) {
        if(userValid == 1 && emailValid == 1) {
            if(err) {
                console.log("error: ", err); // iff error occurs, show
                result(err, null);
            }
            else{
                if(res.length == 0) {
                    sql.query("INSERT INTO Referrals (Username, Email, Status) values (?,?,0)", [body.username, body.email], function (err, res) {
                
                        if(err) {
                            console.log("error: ", err); // iff error occurs, show
                            result(err, null);
                        }
                        else{
                            console.log(res);
                            result(null, res); //if no error occurs, show res which means response
                        }
                    });     
                }
                else {
                    console.log("referral already exist for this student");
                    result(null, "referral already exist for this student");
                }
            }
        }
        else {
            result(null, "User or Student with that Username or Email does not exist!");
        }
    })

          
};



Task.putAllReferrals = function (result) {
    sql.query("SELECT * from Referrals", function (err, res) { 

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

Task.putReferral = function (req, result) {    
    //query takes two input, one is status user wants to set and other is from parameters of URL which is id
    //id here is id of referral and comes in like this localhost:3000/referral/:id
    sql.query("UPDATE Referrals SET Status = ? WHERE ID = ?", [req.body.status, req.params.id], function (err, res) {
            
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

Task.deleteReferral = function (req, result) {  //function to delete referral  

    //query takes only one input which is ID of referral u want to delete
    // it comes in parameters in url with loclahost:3000/referral/:id, here :id is id of referral
    sql.query("DELETE FROM Referrals WHERE ID = ?", [req.params.id], function (err, res) { 
            
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