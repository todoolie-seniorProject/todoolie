const stripe = require("stripe")('SECRETKEYAHRAUEHAUHE');

exports.payTest = function(req, res){// funcition calling referral model function.
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
  };

  exports.show = function(req, res) {
      res.render('stripetest'); //simply render our test page
  }
