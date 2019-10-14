var express = require('express');
var controller = require('../controllers/userController'); // link to user controller
var referralController = require('../controllers/referralController'); // link to referral controler
var router = express.Router();

/* GET home page. */
router.route('/').get(controller.list_all_users); //list all users in database
router.route('/login').post(controller.check_login_creds); // check username/pass with database

router.route('/referrals').get(referralController.list_all_referrals); //get req to get all referrals
router.route('/referral').post(referralController.create_new_referral); //post req to add new referal
module.exports = router;
