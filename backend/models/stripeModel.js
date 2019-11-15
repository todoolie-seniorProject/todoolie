var sql = require('./db.js');  //this file contains our SQL username/pass/database name

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getAcctNo = function(body, result) {
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

Task.getReferralInfo = function(body, result) {
    sql.query("SELECT * FROM Referral WHERE Email = ? AND ReferBy = ?", [body.email, body.referby], function(err, res) {
        if(err) {
            console.log(err);
            result(err, null);
        }
        else {
            if(res.length > 0) {
                result(null, 1);
            }
        }
    })
}

Task.storeBankInfo = function (acct, body, result) {
    
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
                sql.query("UPDATE Users SET AcctNo = ? WHERE Username = ?", [acct.id, body.username], function(err, res) {
                    if(err)
                        console.log(err);
                    result(null, "successfully updated Acct no of User"); //if no error occurs, show res which means response

                });
            }
        });           
};


module.exports= Task;