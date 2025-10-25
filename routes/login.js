var express = require('express');
var router = express.Router();
var loginController = require('../controllers/LoginController');

router.get('/', loginController.loginForm);
router.post('/login', loginController.login);
router.get('/logout', loginController.logout);

module.exports = router;
