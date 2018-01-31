const express = require('express');

const router = express.Router();

const uploadController = require('../controllers/uploadController');

router.get('/', (request, response) => {
  response.render('upload');
});

router.post('/newListing', uploadController.processUpload);

module.exports = router;
