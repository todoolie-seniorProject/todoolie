var express = require('express');
var controller = require('../controllers/userController'); // link to user controller
var referralController = require('../controllers/referralController'); // link to referral controler
var stripeController = require('../controllers/stripeController'); // link to stripe controler
var router = express.Router();

/* GET home page. */
router.route('/').get(controller.list_all_users); //list all users in database
router.route('/login').post(controller.check_login_creds); // check username/pass with database

router.route('/referral').get(referralController.ListAllreferrals); //get req to get all referrals
router.route('/referral').post(referralController.createNewReferrals); //post req to add new referal

router.route("/test").get(stripeController.show) //show sample screen
router.route("/charge").post(stripeController.payTest); //testing stripe
router.route("/customers").get(stripeController.listCustomers);
router.route("/cc").post(stripeController.createCustomer);
router.route("/register_bank").post(stripeController.create_acc);
router.route("/pp").get(stripeController.payout);
router.route("/do").get(stripeController.do);
router.route("/ext").get(stripeController.ext);
router.route("/transaction").post(stripeController.transaction);
router.route("/pay_referral").post(stripeController.pay_ref);

module.exports = router;
