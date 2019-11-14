var sql = require ('./db.js');

var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

// Task.getAllreferrals = function(result){
//     sql.query("SELECT * from Referral ", function(err,res){
        
//         if(err){
//             console.log("errror: ", err);
//             result(null,err);
//         }
//         else{
//             console.log('tasks : ', res);
//             result(null,res);
//         }
//     });
// };
Task.getAllreferrals = function(result){
    sql.query("SELECT refername, age, email, school FROM Referral WHERE userid = 12 ", function(err,res){
        
        if(err){
            console.log("errror: ", err);
            result(null,err);
        }
        else{
            console.log('tasks : ', res);
            result(null,res);
        }
    });
};

Task.getUserReferral = function(body,result){
    sql.query("Select ?,?,?,? from Referral where userid = ?", body.name,body.age,body.email,body.school,body.userid, function(err,res){
        if(err){
            console.log("error: ", err);
            result(err,null);
        }
        else{
            console.log(res);
            result(null,res);
        }
    });
}
module.exports = Task;