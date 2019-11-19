var Task = require('../models/referralsModel.js'); // path to referrals model file

exports.ListAllreferrals = function(req, res){// funcition calling referral model function.
  Task.getDistinctreferrals(function(err,task){
  console.log('Controller')
  if(err)
  res.send(err);
  console.log('res',task);
  res.send(task);// sending all referrals located in the db to server.
});
};
exports.createNewReferrals = function(req, res) {

  if(!req.body.name){ //checks if user name is empty, doesnt allow the post request.
    console.log("referral is empty");//this part is diff 
           res.status(400).send({ error:false, message: "message me" });

       }
  else{
    Task.createReferral(req.body, function(err, Task){// calls the referral model function if name is not empty.
      if(err)
      res.send(err);
        res.send(Task);
    });
  }
};

exports.getUserReferrals = function(req, res ){
  if(!req.params.username) { //if username missing in parameter of api call
    res.send('No username given in parameters');
  }
  else {
    Task.getUserReferrals(req.params.username, function(err, refs) {
      if(err) {
        console.log(err);
        res.send(err);
      }
      else {
        res.send(refs);
      }
    })
  }
}
