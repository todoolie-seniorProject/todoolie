var Task = require('../models/usersModel.js');

exports.list_all_users = function(req, res) {
    Task.getAllUsers(function(err, task) {
      console.log('controller')
      if (err)
        res.send(err);
        console.log('results :', task);
      res.send(task);
    });
};

exports.check_login_creds = function(req, res) {

     if(!req.body.username|| !req.body.pass){
              res.status(400).send({ error:true, message: "enter username and password" });
  
          }
  else{
    
    Task.checkUser(req.body, function(err, task) {
      if (err)
        res.send(err);
      else if (task.length > 0) {
            res.send(true);

        }
        else {
            res.send(false);
        }
    });
}
};