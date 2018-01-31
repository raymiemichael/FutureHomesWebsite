const listings = require('../models/listing');
const listingImages = require('../models/listingImages');

const searchListings = (request, response) => {
  let searchValue = request.query.searchValue;

  listings.getAllListingsByCityOrZipCode(searchValue)
    .then( (listings) => {
      response.render('listings', { listings: listings });
    })
    .catch( (error) => {
      console.log(error);
      response.send(error);
    });
};

module.exports = {
  searchListings
};
