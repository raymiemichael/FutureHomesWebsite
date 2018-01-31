const getAllListingsByCityOrZipCode = (cityOrZipCode) => {

  return new Promise( (resolve, reject) => {
    let city = '%' + cityOrZipCode + '%';
    let zipCode = '%' + cityOrZipCode + '%';
    let sql = 'SELECT DISTINCT A.id, '
                            + 'A.belong_to_user_id, '
                            + 'A.street, '
                            + 'A.city, '
                            + 'A.state, '
                            + 'A.zip_code, '
                            + 'A.price, '
                            + 'A.bedrooms, '
                            + 'A.bathrooms, '
                            + 'A.square_footage, '
                            + 'I.image_path '
                            + 'FROM all_listings A, image_table I '
                            + 'WHERE (A.city LIKE ? OR A.zip_code LIKE ?) AND A.id = I.belong_to_listing_id';

    connection.query({
      sql: sql,
      values: [city, zipCode]
    }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getListingDetailsById = (listingId) => {

  return new Promise( (resolve, reject) => {
    let sql = 'SELECT A.id, '
            + 'A.belong_to_user_id, '
            + 'A.street, '
            + 'A.city, '
            + 'A.state, '
            + 'A.zip_code, '
            + 'A.price, '
            + 'A.bedrooms, '
            + 'A.bathrooms, '
            + 'A.square_footage, '
            + 'I.image_path '
            + 'FROM all_listings A, image_table I '
            + 'WHERE A.id = I.belong_to_listing_id AND A.id = ?';

    connection.query({
      sql: sql,
      values: [listingId]
    }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        let listing = results[0];
        resolve(listing);
      }
    });
  });
};

const addNewListing = (listing) => {

  return new Promise( (resolve, reject) => {
    let sql = 'INSERT INTO all_listings(belong_to_user_id, '
                                     + 'street, '
                                     + 'city, '
                                     + 'state, '
                                     + 'zip_code, '
                                     + 'price, '
                                     + 'bedrooms, '
                                     + 'bathrooms, '
                                     + 'square_footage) '
                                     + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)'

    connection.query({
      sql: sql,
      values: [listing.sellerId,
               listing.street,
               listing.city,
               listing.state,
               listing.zipCode,
               listing.price,
               listing.bedrooms,
               listing.bathrooms,
               listing.squareFootage]
    }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
};

const getAllListingsBySellerId = (sellerId) => {

  return new Promise( (resolve, reject) => {
    let sql = 'SELECT A.id, '
                   + 'A.street, '
                   + 'A.city, '
                   + 'A.state, '
                   + 'A.zip_code, '
                   + 'A.price '
                   + 'FROM all_listings A, image_table I '
                   + 'WHERE A.id = I.belong_to_listing_id AND A.belong_to_user_id = ?';

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
  getAllListingsByCityOrZipCode,
  getListingDetailsById,
  addNewListing,
  getAllListingsBySellerId
}
