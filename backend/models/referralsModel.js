//this model file will communicate with SQL related to referrals/fariha

var sql = require('./db.js');  //this file contains our SQL username/pass/database name

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getAllreferrals = function (result) {
    sql.query("SELECT * from Referral", function (err, res) {//sql qurey to request all referrals in the db.

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('tasks : ', res,'\n');  
                result(null, res);
            }
        });   
};
Task.createReferral = function (body, result) {
    var emailValid = 0;
    sql.query("select * from Referral where Email = ?", body.email, function(err, res) {
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

    if(emailValid == 1) {
        console.log("email already found.")
        result(null, "This email already exist, choose some other.");
    }
    else {
    // model function which will actually insert ddata in referral table
    //the below is the query to insert data, it takes from name, age, email, and school and inputs into the db.
    sql.query("INSERT INTO Referral (ReferBy, Refername, Age, Email, School) values (?,?,?,?,?)", [body.referby, body.name, body.age, body.email, body.school ], function (err, res) {
            
            if(err) {
                console.log("error: ", err); // iff error occurs, show
                result(err, null);
            }
            else{
                console.log(res);
                result(null, "success"); //if no error occurs, show res which means response
            }
        });   
    }        
};
Task.checkIfReferralExists = function(body,results){
    sql.query("SELECT referfriend WHERE name ==")
}

Task.getDistinctreferrals = function (result) {
    sql.query("SELECT DISTINCT refername AS `distinct name` FROM Referral", function (err, res) {//sql qurey to request all referrals in the db.

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('tasks : ', res,'\n');  
                result(null, res);
            }
        });   
};


module.exports= Task;











































// Task.putAllReferrals = function (result) {
//     sql.query("SELECT * from Referrals", function (err, res) { 

//             if(err) {
//                 console.log("error: ", err);
//                 result(null, err);
//             }
//             else{
//                 console.log('tasks : ', res);  
//                 result(null, res); // send result to controller
//             }
//         });   
// };

// Task.putReferral = function (req, result) {    
//     //query takes two input, one is status user wants to set and other is from parameters of URL which is id
//     //id here is id of referral and comes in like this localhost:3000/referral/:id
//     sql.query("UPDATE Referrals SET Status = ? WHERE ID = ?", [req.body.status, req.params.id], function (err, res) {
            
//             if(err) {
//                 console.log("error: ", err); // iff error occurs, show
//                 result(err, null);
//             }
//             else{
//                 console.log(res);
//                 result(null, res); //if no error occurs, show res which means response
//             }
//         });           
// };

// Task.deleteReferral = function (req, result) {  //function to delete referral  

//     //query takes only one input which is ID of referral u want to delete
//     // it comes in parameters in url with loclahost:3000/referral/:id, here :id is id of referral
//     sql.query("DELETE FROM Referrals WHERE ID = ?", [req.params.id], function (err, res) { 
            
//             if(err) {
//                 console.log("error: ", err); // iff error occurs, show
//                 result(err, null);
//             }
//             else{
//                 console.log(res);
//                 result(null, res); //if no error occurs, show res which means response
//             }
//         });           
// };
// Task.getAllReferrals = function (result) {
//     sql.query("SELECT * from Referrals", function (err, res) { //select all data from referrals table and return to controller

//             if(err) {
//                 console.log("error: ", err);
//                 result(null, err);
//             }
//             else{
//                 console.log('tasks : ', res);  
//                 result(null, res); // send result to controller
//             }
//         });   
// };
// ask.checkUs = function (body, result) {    
//     sql.query("INSERT * from Users WHERE Username = ? AND Password = ?", [body.username, body.pass], function (err, res) {
            
//             if(err) {
//                 console.log("error: ", err);
//                 result(err, null);
//             }
//             else{
//                 console.log(res);
//                 result(null, res);
//             }
//         });           
// };
module.exports= Task;