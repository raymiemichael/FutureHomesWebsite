const express = require('express')
var router = express.Router();

const listingsController = require('../controllers/listingsController');

router.get('/', (request, response) => {
  response.redirect('/');
});

router.get('/searchResults', listingsController.searchListings);

module.exports = router;
