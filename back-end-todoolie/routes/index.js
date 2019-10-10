var express = require('express');
var controller = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.route('/').get(controller.list_all_users);
router.route('/login').post(controller.check_login_creds);


module.exports = router;
