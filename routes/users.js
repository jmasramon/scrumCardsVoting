module.exports = function users_route(users) {
  'use strict';

  return function(req, res, next) {
    var users = require('../models/user')();

    console.log('users model = ' + JSON.stringify(users));

    var available_users_promise = users.getUsers();

    available_users_promise
      .onFulfill(function (available_users) {
        console.log('Stories found: ' + available_users);

        res.render('users', { title: 'Users management', users: available_users } );
      })
      .onReject(function (error) {
        console.error(err);
      });

  };
};
