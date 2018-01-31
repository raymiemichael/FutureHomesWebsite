const express = require('express');
var router = express.Router();

const dashboardController = require('../controllers/dashboardController');

router.get('/', (request, response) => {
  response.render('dashboard');
});

router.get('/:userId', dashboardController.getUserDashboard);

module.exports = router;
