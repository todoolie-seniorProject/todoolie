const stripe = require("stripe")('sk_test_od1fzSDcmNvtLTNfpBjfktxQ00uCAuL6pv');
var Task = require('../models/stripeModel');

exports.listCustomers = function(req, res){ 
  stripe.customers.list(
    {limit: 10},
    function(err, customers) {
      res.send(customers);
    }
  );
};

exports.create_acc = function(req, res) {
  if(!req.body.name || !req.body.routing_no || !req.body.account_no || !req.body.fname ||
    !req.body.lname || !req.body.username) {
      res.send("missing parameters!");
    }
  else {
    stripe.tokens.create(
      {
        bank_account: {
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
        stripe.accounts.create(
          {
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
            stripe.accounts.createExternalAccount(
              account.id,
              {
                external_account: token.id,
              },
              function(err, bank_account) {
                if(err)
                  res.send(err);
                  console.log(bank_account);
                  Task.storeBankInfo(req.body, function(err,Task){// calls the referral model function if name is not empty.
                    if(err)
                    res.send(err);
                      res.send(Task);
                  });
              }
            );
          }
        );


        


      }
    );
    }
}

exports.payout = function(req, res) {
  stripe.payouts.create({
    amount: 1000, // amount in cents
    currency: "usd",
    bank_account: "btok_1FdIlYHZIy4gjXaeCovBGgjR",
    statement_descriptor: "JULY SALES"
  }, function(err, payout) {
    if(err)
      res.send(err);
    res.send(payout);
  });
}

exports.createCustomer = function(req, res) {
  let amount = 500;

  stripe.customers.create({
    email: req.body.email,
    card: req.body.id
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    }))
  .then(charge => res.send(charge))
  .catch(err => {
    console.log("Error:", err);
    res.status(500).send({error: "Purchase Failed"});
  });
}

exports.payTest = function(req, res){// funcition calling referral model function.
      stripe.charges.create({
        amount: req.body.amount,
        description: req.body.description,
        currency: "usd",
        customer: req.body.id
      })
    .then(charge => res.send(charge))
    .catch(err => {
      console.log("Error:", err);
      res.status(500).send({error: "Purchase Failed"});
    });
  };

  exports.show = function(req, res) {
      res.render('stripetest'); //simply render our test page
  }

  exports.do = function(req, res) {
    stripe.accounts.create(
      {
        type: 'custom',
        country: 'US',
        email: 'bob@example.com',
        requested_capabilities: [
          'card_payments',
          'transfers',
        ],
      },
      function(err, account) {
        res.send(account);
      }
    );
  }

  exports.ext = function(req, res) {
      stripe.accounts.createExternalAccount(
        "acct_1FcwfPHZIy4gjXae",
        {
          external_account: 'btok_1FdKOwHZIy4gjXae2MOTG7IJ',
        },
        function(err, bank_account) {
          if(err)
            res.send(err);
          res.send(bank_account);
        }
      );
  }


 exports.tra = function(req, res) {

  // stripe.accounts.update(
  //   'acct_1FdebzCOEcMMmyAO',
  //   {
  //     tos_acceptance: {
  //       date: Math.floor(Date.now() / 1000),
  //       ip: req.connection.remoteAddress // Assumes you're not using a proxy
  //     }
  //   },
  //   function(err, o) {
  //     res.send(o);
  //   }
  // );
  

    // stripe.transfers.create({
    //   amount: 400,
    //   currency: "usd",
    //   destination: "acct_1FcwfPHZIy4gjXae",
    //   transfer_group: "ORDER_95"
    // }, function(err, transfer) {
    //   if(err)
    //     res.send(err);
    //   res.send(transfer);
    // });

    // stripe.payouts.create(
    //   {amount: 1100, currency: 'usd'},
    //   function(err, payout) {
    //     if(err)
    //       res.send(err);
    //     res.send(payout);
    //   }
    // );

    stripe.charges.create({
      amount: 1000,
      currency: "usd",
      source: "tok_visa",
      transfer_data: {
        destination: "acct_1FdfWKErBhEC7rSG",
      },
    }).then(function(charge) {
      res.send(charge);
    });
  }