const express = require('express');
const bodyParser = require('body-parser');
const signupController = require('../controllers/signupController');

var router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', (request, response) => {
  response.render('signup');
});

router.post('/createNewAccount', urlencodedParser, signupController.createNewUserAccount);

module.exports = router;
