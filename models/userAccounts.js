const findUserAccountByUsername = (userName) =>{

  return new Promise( (resolve, reject) => {
    let sql = 'SELECT * FROM user_accounts WHERE account_name = ?';

    connection.query({
      sql: sql,
      values: [userName]
    }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }

      }
    });
  });
};

const addNewUserAccount = (user) => {

  return new Promise( (resolve, reject) => {
    let sql = 'INSERT INTO user_accounts(account_name, '
                                      + 'pass, '
                                      + 'first_name) '
                                      + 'VALUES(?, ?, ?)'

    console.log(sql);
    connection.query({
      sql: sql,
      values: [user.userName,
               user.password,
               user.firstName]
    }, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.insertId);
      }
    });
  });
};



module.exports = {
  findUserAccountByUsername,
  addNewUserAccount
};
