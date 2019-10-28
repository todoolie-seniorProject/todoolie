var sql = require('./db.js');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

Task.getAllUsers = function (result) {
    sql.query("SELECT * from Users", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('tasks : ', res);  
                result(null, res);
            }
        });   
};

Task.checkUser = function (body, result) {    
    sql.query("SELECT * from Users WHERE Username = ? AND Password = ?", [body.username, body.pass], function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log('hey its me');
                result(null, res);
            }
        });           
};

module.exports= Task;