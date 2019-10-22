var Task = require('../models/referralsModel.js'); // path to referrals model file

exports.list_all_referrals = function(req, res) { // controller function which will call model function
    Task.getAllReferrals(function(err, task) { //err means error, task will have whatever data is returned from model file
      console.log('controller')
      if (err)
        res.send(err);
        console.log('res', task);
      res.send(task); //simply send all the referrals on user's screen
    });
};

exports.create_new_referral = function(req, res) { // controller function which will call model function to create new referral

    if(!req.body.username || !req.body.rollnum){ // check if username and rollnum are provided, otherwise give error
 
             res.status(400).send({ error:true, message: "enter username and rollnum" }); //err msg in case username/rollnum missing
 
         }
 else{
   
   Task.createReferral(req.body, function(err, task) { //this is calling function createRefferal in model file
     if (err)
       res.send(err); // if error occurs, send error
     else
        res.send(task); // if successful, send response to user
   });
}
};