var Task = require('../models/referralsModel.js'); // path to referrals model file

<<<<<<< HEAD
exports.ListAllreferrals = function(req, res){
  Task.getAllreferrals(function(err,task){
=======
exports.ListAllreferrals = function(req, res){// funcition calling referral model function.
  Task.getDistinctreferrals(function(err,task){
>>>>>>> master
  console.log('Controller')
  if(err)
  res.send(err);
  console.log('res',task);
<<<<<<< HEAD
  res.send(task);
});
};
exports.createNewReferrals = function(req, res) {

  if(req.body.Referfriend){
    console.log("referral is empty");
           res.status(400).send({ error:true, message: "message me" });

       }
  else{
    Task.createReferral(req.body, function(err,task){
      if(err)
      res.send(err);
      
      else if (task.Referfriend){
        res.send('successful referral');
      }
      else {
        res.send("bad referRral ");
      }
    });
  }
=======
  res.send(task);// sending all referrals located in the db to server.
});
>>>>>>> master
};
exports.createNewReferrals = function(req, res) {

<<<<<<< HEAD






















































// exports.list_all_referrals = function(req, res) { // controller function which will call model function
//     Task.getAllReferrals(function(err, task) { //err means error, task will have whatever data is returned from model file
//       console.log('controller')
//       if (err)
//         res.send(err);
//         console.log('res', task);
//       res.send(task); //simply send all the referrals on user's screen
//     });
// };

// exports.create_new_referral = function(req, res) { // controller function which will call model function to create new referral

//     if(!req.body.username || !req.body.rollnum){ // check if username and rollnum are provided, otherwise give error
 
//              res.status(400).send({ error:true, message: "enter username and rollnum" }); //err msg in case username/rollnum missing
 
//          }
//  else{
   
//    Task.createReferral(req.body, function(err, task) { //this is calling function createRefferal in model file
//      if (err)
//        res.send(err); // if error occurs, send error
//      else
//         res.send(task); // if successful, send response to user
//    });
// }
// };



// //edit referral function
// exports.edit_referral = function(req, res) { 
//   //checks if user has passed id in params and status in body, if not then give error since we need it to update
//   if(!req.params.id || !req.body.status){ 

//            res.status(400).send({ error:true, message: "please enter valid referral id and status to update" });

//        }
// else{
//  //call function in model, passing it req which has both status and id which is need to update the referral
//  Task.putReferral(req, function(err, task) { 
//    if (err)
//      res.send(err); 
//    else
//       res.send(task); 
//  });
// }
// };

// exports.delete_referral = function(req, res) { 
//   //checks if there is id present of the referral, if not then give error
//   if(!req.params.id){ 

//            res.status(400).send({ error:true, message: "please enter valid referral id to delete" });

//        }
// else{
//  //call the function of deleting referral in model, passing it req object so it gets all parameters (id)
//  Task.deleteReferral(req, function(err, task) { 
//    if (err)
//      res.send(err); 
//    else
//       res.send(task); 
//  });
// }
// };
=======
  if(req.body.refername){ //checks if user name is empty, doesnt allow the post request.
    console.log("referral is empty",res.body,res.refername,res.age,res.email,res.school);//this part is diff 
           res.status(400).send({ error:false, message: "message me" });

       }
  else{
    Task.createReferral(req.body, function(err,Task){// calls the referral model function if name is not empty.
      if(err)
      res.send(err);
      else if (Task.refername){
        res.send('Successfull Referral!');
      }
      else {
        console.log('baaadh')
        res.send(req.body == true);
      }
    });
  }
};
>>>>>>> master
