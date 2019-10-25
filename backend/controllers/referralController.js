var Task = require('../models/referralsModel.js'); // path to referrals model file

exports.ListAllreferrals = function(req, res){
  Task.getAllreferrals(function(err,task){
  console.log('Controller')
  if(err)
  res.send(err);
  console.log('res',task);
  res.send(task);
});
};
exports.createNewReferrals = function(req, res) {

  if(req.body.referfriend){
    console.log("referral is empty");
           res.status(400).send({ error:true, message: "message me" });

       }
  else{
    Task.createReferral(req.body, function(err,Task){
      if(err)
      res.send(err);
      else if (task.refername){
        res.send('successful referral');
      }
      else {
        res.send("bad referRral ");
      }
    });
  }
};