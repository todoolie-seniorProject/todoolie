var express = require('express');
var controller = require('../controllers/userController'); // link to user controller
var referralController = require('../controllers/referralController'); // link to referral controler
var router = express.Router();

/* GET home page. */
router.route('/').get(controller.list_all_users);
router.route('/login').post(controller.check_login_creds);

router.route('/referrals').get(referralController.list_all_referrals);

module.exports = router;
