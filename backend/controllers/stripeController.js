const stripe = require("stripe")('sk_test_od1fzSDcmNvtLTNfpBjfktxQ00uCAuL6pv');
var Task = require('../models/stripeModel');

// exports.listCustomers = function(req, res){ 
//   stripe.customers.list(
//     {limit: 10},
//     function(err, customers) {
//       res.send(customers);
//     }
//   );
// };

exports.checkBankInfo = function(req, res) {
  if(!req.body.username) {
    res.send("missing parameters"); //missing username
  }
  else {
    Task.checkAlreadyBank(req.body, function(err, resBank) { //call model function
      if(err) console.log(err);
      console.log(resBank);
      var resp = {statusCode: 200, res: resBank} //send response from sql if bank account exist or not
      res.send(resp);
    })
  }
}

exports.create_acc = function(req, res) { //create stripe account
  if(!req.body.name || !req.body.routing_no || !req.body.account_no || !req.body.fname ||
    !req.body.lname || !req.body.username) { // if any info missing, give error
      res.send("missing parameters!");
    }
  else {
    Task.checkAlreadyBank(req.body, function(err, bankRes){ // check if already bank account exist
      if(err) console.log(err);
      else if(bankRes.res != 1) { //if bank account does not exist then make new account
        stripe.tokens.create(
          {
            bank_account: { //entered bank info to generate a tokken for creating bank account
              country: 'US',
              currency: 'usd',
              account_holder_name: req.body.name,
              account_holder_type: 'individual',
              routing_number: req.body.routing_no,
              account_number: req.body.account_no,
            },
          },
          function(err, token) {
            if(err)
              res.send(err);
    
            //var tokjs = JSON.parse(token);
            stripe.accounts.create( //creating stripe account
              {
                //some values are assumed so we dont need to add much info since this is in test mode
                type: 'custom',
                country: 'US',
                email: req.body.email,
                business_type: 'individual',
                individual: {
                  first_name: req.body.fname,
                  last_name: req.body.lname,
                  ssn_last_4: '5234',
                  address: {
                    line1: 'asfasf',
                    line2: 'asfas',
                    city: 'asf',
                    state: 'ID',
                    postal_code: '21212'
                  },
                  email: req.body.email,
                  phone: '(555) 671-2612',
                  dob: {
                    day: '10',
                    month: '10',
                    year: '2000'
                  }
                },
                business_profile: {
                  url: 'asfasf.com' 
                },
                
                tos_acceptance: {
                  date: Math.floor(Date.now() / 1000),
                  ip: req.connection.remoteAddress // Assumes you're not using a proxy
                },
                requested_capabilities: [
                  'transfers'
                ],
              },
              function(err, account) {
                //var accjs = JSON.parse(account)
                if(err) {
                  console.log(err);
                  res.send(err);
                }
                stripe.accounts.createExternalAccount( //creating external bank account using the tokken which we previously made
                  account.id,
                  {
                    external_account: token.id, //the token id obtained from the tokken of bank account
                  },
                  function(err, bank_account) {
                    if(err)
                      res.send(err);
                      //once bank account is created, save into our database
                      Task.storeBankInfo(account, req.body, function(err,Task){// calls the referral model function if name is not empty.
                        if(err) {
                          console.log(err);
                          res.send(err);
                        }
                          console.log(Task);
    
                          res.send(bank_account); //send response of  bank account created
                      });
                  }
                );
              }
            );
          }
        );
      }
      else {
        res.send("already bank account exist"); // if already bank account exist, send error
      }
    })
    
    }
}

// exports.payout = function(req, res) {
//   stripe.payouts.create({
//     amount: 1000, // amount in cents
//     currency: "usd",
//     bank_account: "btok_1FdIlYHZIy4gjXaeCovBGgjR",
//     statement_descriptor: "JULY SALES"
//   }, function(err, payout) {
//     if(err)
//       res.send(err);
//     res.send(payout);
//   });
// }

// exports.createCustomer = function(req, res) {
//   let amount = 500;

//   stripe.customers.create({
//     email: req.body.email,
//     card: req.body.id
//   })
//   .then(customer =>
//     stripe.charges.create({
//       amount,
//       description: "Sample Charge",
//       currency: "usd",
//       customer: customer.id
//     }))
//   .then(charge => res.send(charge))
//   .catch(err => {
//     console.log("Error:", err);
//     res.status(500).send({error: "Purchase Failed"});
//   });
// }

// exports.payTest = function(req, res){// funcition calling referral model function.
//       stripe.charges.create({
//         amount: req.body.amount,
//         description: req.body.description,
//         currency: "usd",
//         customer: req.body.id
//       })
//     .then(charge => res.send(charge))
//     .catch(err => {
//       console.log("Error:", err);
//       res.status(500).send({error: "Purchase Failed"});
//     });
//   };

//   exports.show = function(req, res) {
//       res.render('stripetest'); //simply render our test page
//   }

//   exports.do = function(req, res) {
//     stripe.accounts.create(
//       {
//         type: 'custom',
//         country: 'US',
//         email: 'bob@example.com',
//         requested_capabilities: [
//           'card_payments',
//           'transfers',
//         ],
//       },
//       function(err, account) {
//         res.send(account);
//       }
//     );
//   }

//   exports.ext = function(req, res) {
//       stripe.accounts.createExternalAccount(
//         "acct_1FcwfPHZIy4gjXae",
//         {
//           external_account: 'btok_1FdKOwHZIy4gjXae2MOTG7IJ',
//         },
//         function(err, bank_account) {
//           if(err)
//             res.send(err);
//           res.send(bank_account);
//         }
//       );
//   }


exports.pay_ref = function(req, res) { //pay for referral
  if(!req.body.email || !req.body.referby)  //missing values, give error
  {
    res.send("missing parameters");
  }
  else {
    Task.getReferralInfo(req.body, function(err, refRes) { //get referral info from database
      if(err) {
        console.log(err);
        res.send(err);
      }
      else {
        if(refRes == 1) { // if referral exist and status is unpaid (0) then do this
          Task.getAcctNo(req.body, function(err, acctRes) { //get account number from Users table
            if(err) {
              console.log(err);
              res.send(err);
            }
            else {
              if(acctRes != null) { // if account stored in database
                console.log(acctRes);
                stripe.charges.create({ //pay ambassador on that account
                  amount: 1000, // 10 dollars = 1000 cents
                  currency: "usd",
                  source: "tok_visa", //test credit card
                  transfer_data: {
                    destination:acctRes, //users account number
                  },
                }).then(function(charge) {
                  Task.updateReferralStatus(req.body, function(err, updateRes) { //update status of refferal to paid(1)
                    if(err) console.log(err);
                    console.log(updateRes);
                  })
                  res.send(charge);
                });
              }
              else {
                console.log(acctRes);
                res.send("no bank info added into database!")
              }
            }
          })
        }
        else {
          res.send("ambassador is already paid for this referral!");
        }
      }
    })
  }
}

//  exports.transaction = function(req, res) { //make payment

//   // stripe.accounts.update(
//   //   'acct_1FdebzCOEcMMmyAO',
//   //   {
//   //     tos_acceptance: {
//   //       date: Math.floor(Date.now() / 1000),
//   //       ip: req.connection.remoteAddress // Assumes you're not using a proxy
//   //     }
//   //   },
//   //   function(err, o) {
//   //     res.send(o);
//   //   }
//   // );
  

//     // stripe.transfers.create({
//     //   amount: 400,
//     //   currency: "usd",
//     //   destination: "acct_1FcwfPHZIy4gjXae",
//     //   transfer_group: "ORDER_95"
//     // }, function(err, transfer) {
//     //   if(err)
//     //     res.send(err);
//     //   res.send(transfer);
//     // });

//     // stripe.payouts.create(
//     //   {amount: 1100, currency: 'usd'},
//     //   function(err, payout) {
//     //     if(err)
//     //       res.send(err);
//     //     res.send(payout);
//     //   }
//     // );

//     stripe.charges.create({
//       amount: req.body.amount,
//       currency: "usd",
//       source: "tok_visa",
//       transfer_data: {
//         destination: req.body.acct,
//       },
//     }).then(function(charge) {
//       res.send(charge);
//     });
//   }