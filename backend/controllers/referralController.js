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