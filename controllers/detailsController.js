const listing = require('../models/listing');
const listingImages = require('../models/listingImages');
const messages = require('../models/messages');

const getListingDetails = (request, response) => {
  let listingId = request.params.listingId;

  listing.getListingDetailsById(listingId)
    .then( (listing) => {
      response.render('details', { listing: listing } );
    })
    .catch( (error) => {
      console.log(error);
      response.send(error);
    });
};

const sendMessageToSeller = (request, response) => {
  let listingId = request.params.listingId;

  listing.getListingDetailsById(listingId)
    .then( (listing) => {

      let messageObject = {
        listingId: request.params.listingId,
        sellerId: listing.belong_to_user_id,
        senderName: request.body.sender_name,
        senderEmail: request.body.sender_email,
        message: request.body.message
      }

      return messageObject;
    })
    .then( (messageObject) => {
      return messages.addNewMessage(messageObject)
    })
    .then( (results) => {
      response.redirect('/fa17g10/details/' + listingId);
    })
    .catch( (error) => {
      console.log(error);
      response.send(error);
    });
};

module.exports = {
  getListingDetails,
  sendMessageToSeller
};
