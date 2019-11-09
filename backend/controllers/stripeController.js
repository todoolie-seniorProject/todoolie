const stripe = require("stripe")('sk_test_od1fzSDcmNvtLTNfpBjfktxQ00uCAuL6pv');

exports.listCustomers = function(req, res){ 
  stripe.customers.list(
    {limit: 10},
    function(err, customers) {
      res.send(customers);
    }
  );
};

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
