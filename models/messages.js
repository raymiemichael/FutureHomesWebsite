const addNewMessage = (message) => {

  return new Promise( (resolve, reject) => {
    let sql = 'INSERT INTO messages(belong_to_user_id, '
                                  + 'belong_to_listing_id, '
                                  + 'sender_name, '
                                  + 'sender_email, '
                                  + 'message) '
                                  + 'VALUES(?, ?, ?, ?, ?)'

    connection.query({
      sql: sql,
      values: [message.listingId,
               message.sellerId,
               message.senderName,
               message.senderEmail,
               message.message]
    }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getAllMessagesBySellerId = (sellerId) => {

  return new Promise( (resolve, reject) => {
    let sql = 'SELECT * FROM messages WHERE belong_to_user_id = ?';

    connection.query({
      sql: sql,
      values: [sellerId]
    }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  addNewMessage,
  getAllMessagesBySellerId
};
