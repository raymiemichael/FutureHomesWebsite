const express = require('express');
var router = express.Router();

router.get('/', (request, response) => {
  response.render('home');
});

module.exports = router;
