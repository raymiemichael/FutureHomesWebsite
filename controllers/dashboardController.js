const listings = require('../models/listing');
const messages = require('../models/messages');

const getUserDashboard = (request, response) => {
  let sellerId = request.params.userId;
  let dashboardMessages;
  let dashboardListings;

  messages.getAllMessagesBySellerId(sellerId)
    .then( (messages) => {
      dashboardMessages = messages;
      return listings.getAllListingsBySellerId(sellerId)
    })
    .then( (listings) => {
      dashboardListings = listings;
      response.render('dashboard', {
        messages: dashboardMessages,
        listings: dashboardListings
      });
    })
    .catch( (error) => {
      console.log(error);
      response.send(error);
    });
};

module.exports = {
  getUserDashboard
};
