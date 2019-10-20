var Task = require('../models/usersModel.js');

exports.list_all_users = function(req, res) {
    Task.getAllUsers(function(err, task) {
      console.log('controller')
      if (err)
        res.send(err);
        console.log('res', task);
      res.send(task);
    });
};

exports.check_login_creds = function(req, res) {

     if(!req.body.username|| !req.body.pass){
  
              res.status(400).send({success: false, error:true, message: "enter username and pass" });
  
          }
  else{
    
    Task.checkUser(req.body, function(err, task) {
      if (err)
        res.send(err);
      else
        if(task.length > 0) {
          console.log("login successful");
        res.send({success: true, error :false, message : 'logged in successful',user: req.body.username});
        }
        else {
          res.status(210).send({success: false, error: true, message: "wrong username or password"});
        }
    });
}
};