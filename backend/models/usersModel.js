var sql = require('./db.js');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};

// this gets all students from data base and sends response back to front end
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

// check username and password from the database and sends the response back to front end
Task.checkUser = function (body, result) {    
    sql.query("SELECT * from Users WHERE Username = ? AND Password = ?", [body.username, body.pass], function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                
                console.log(res);
                result(null, res);
            }
        });           
};

module.exports= Task;