var sql = require ('./db.js');

var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getAllreferrals = function(result){
    sql.query("SELECT referby, refername, age, email, school FROM Referral WHERE referby = 'test' ", function(err,res){
        
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

//api thats deletes users
Task.getUserReferral = function(body,result){
    sql.query("DELETE FROM Referral WHERE refername = ?", body.name, function(err,res){
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