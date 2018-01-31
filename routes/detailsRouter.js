const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const detailsController = require('../controllers/detailsController');

router.get('/', (request, response) => {
  response.redirect('/');
});

router.get('/:listingId', detailsController.getListingDetails);

router.post('/:listingId/contact', urlencodedParser, detailsController.sendMessageToSeller);

module.exports = router;
