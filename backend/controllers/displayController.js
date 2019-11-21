var Task = require('../models/displayModel.js');

exports.Displayreferrals = function(req,res){
    Task.getAllreferrals(function(err,task){
        console.log('Controller')
        if(err)
        res.send(err);
        console.log('results:' ,task);
        res.send(task);
    });
};
// exports.Displayreferrals = function(req,res){
//     Task.getUserReferral(body,function(err,task){
//         console.log('Controller')
//         if(err)
//         res.send(err);
//         console.log('results:' ,task);
//         res.send(task);
//     });
// };

exports.getAllreferrals = function(req,res){
    if(err){
        res.status(400).send({error : true,message:"USer does not exist!"});

    }
    else{
        Task.getUserReferral(req.body,function(err,task){
            if(err)
            res.send(err);
            else if(task.age){
                console.log("success");
                res.send(true);
            }
            else {
                console.log('error homie')
                res.send(req.body==true);
            }
        });
    }
};