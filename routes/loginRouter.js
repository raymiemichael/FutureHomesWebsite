const express = require('express');
var router = express.Router();

const loginController = require('../controllers/loginController');

router.get('/', (request, response) => {
  response.render('login');
});

router.post('/signin', loginController.getUserDashboard);

module.exports = router;
