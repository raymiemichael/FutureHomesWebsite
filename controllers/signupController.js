const express = require('express');

const userAccounts = require('../models/userAccounts');

const createNewUserAccount = (request, response) => {

  userAccounts.findUserAccountByUsername(request.body.username)
    .then( (foundUser) => {
      if (foundUser) {
        response.redirect('/fa17g10/signup');
      } else {
        let userObject = {
          userName: request.body.username,
          password: request.body.pass,
          firstName: request.body.first_name
        }
        return userAccounts.addNewUserAccount(userObject)
      }
    })
    .then( (userId) => {
      response.redirect('/fa17g10/dashboard/' + userId);
    })
    .catch( (error) => {
      console.log(error);
      response.send(error);
    });

}

module.exports = {
  createNewUserAccount
};
