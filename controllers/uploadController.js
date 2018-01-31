const multer = require('multer');
const path = require('path');

const listings = require('../models/listing');
const listingImages = require('../models/listingImages');

// set storage engine
const storage = multer.diskStorage({
  destination: './public/listingImages/',
  filename: function(request, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadImage = multer({
  storage: storage
}).single('listingImage');

const processUpload = (request, response) => {

  uploadImage(request, response, (error) => {
    if(error) {
      response.send(error);
    } else {

      let listingObject = {
        sellerId: '1',
        street: request.body.address,
        city: request.body.city,
        state: request.body.state,
        zipCode: request.body.zipCode,
        price: request.body.price,
        bedrooms: request.body.bedrooms,
        bathrooms: request.body.bathrooms,
        squareFootage:request.body.squareFootage
      };

      listings.addNewListing(listingObject)
        .then( (listingId) => {
          let imagePath = '/listingImages/' + request.file.filename;
          return listingImages.addNewListingImage(listingId, imagePath);
        })
        .then( (listingId) => {
          response.redirect('/fa17g10/details/' + listingId);
        })
        .catch( (error) => {
          console.log(error);
          response.send(error);
        });
    }
  });
};

module.exports = {
  processUpload
};
