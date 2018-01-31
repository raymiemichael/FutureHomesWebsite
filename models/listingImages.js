const addNewListingImage = (listingId, imagePath) => {

  return new Promise( (resolve, reject) => {
    let sql = 'INSERT INTO image_table(belong_to_listing_id, '
                                  + 'image_path) '
                                  + 'VALUES(?, ?)'

    connection.query({
      sql: sql,
      values: [listingId, imagePath]
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(listingId);
      }
    });
  });
};

const getListingImageByListingId = (listingId) => {

  return new Promise( (resolve, reject) => {
    let sql = 'SELECT image_path FROM image_table WHERE belong_to_listing_id = ?';

    connection.query({
      sql: sql,
      values: [listingId]
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result[0].image_path);
      }
    });
  });
};

module.exports = {
  addNewListingImage,
  getListingImageByListingId
};
