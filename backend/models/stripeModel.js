var sql = require('./db.js');  //this file contains our SQL username/pass/database name

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.checkAlreadyBank = function(body, result) { // check if already bank account exist
    sql.query("SELECT AcctNo FROM Users WHERE Username = ?", body.username, function(err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else {
            console.log(res);
            if(res.length > 0) {
                if(res[0].AcctNo != null) { //check if acct number is not null, means user has stripe Account
                    result(null, 1); //send result 1
                }
                else {
                    result(null, 2) //if not then send result 2
                }
            }
            else {
                result(null, 3); // if no refferal found with that Username then send result 3
            }
        }
    })
} 

Task.updateReferralStatus = function(body, result) { //update referral status to paid by setting 'Status' to 1
    sql.query("UPDATE Referral SET Status = ? WHERE Email = ? AND ReferBy = ?", [1, body.email, body.referby], function(err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else {
            console.log("successfully set referral to paid");
            result(null, res);
        }
    })
}

Task.getAcctNo = function(body, result) { // gives the account number of the User from database
    sql.query("SELECT * FROM Users WHERE Username = ?", body.referby, function(err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else {
            if(res.length > 0) {
                result(null, res[0].AcctNo);
            }
        }
    })
}

Task.getReferralInfo = function(body, result) { // gives the info of referral from that User and with that student email
    sql.query("SELECT * FROM Referral WHERE Email = ? AND ReferBy = ? AND Status = 0", [body.email, body.referby], function(err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else {
            if(res.length > 0) {
                result(null, 1);
            }
            else {
                result(null, 2);
            }
        }
    })
}

Task.storeBankInfo = function (acct, body, result) { // stores bank info in database
    
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
                //also update account number in Users table
                sql.query("UPDATE Users SET AcctNo = ? WHERE Username = ?", [acct.id, body.username], function(err, res) {
                    if(err)
                        console.log(err);
                    result(null, "successfully updated Acct no of User"); //if no error occurs, show res which means response

                });
            }
        });           
};


module.exports= Task;