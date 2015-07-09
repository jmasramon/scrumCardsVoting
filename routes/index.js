module.exports = function index_route() {
  'use strict';
  var db_connection = require('../dbConnection');
  var db = db_connection.db;
  var mongoose = db_connection.mongoose;

  return {
    index: function(req, res, next) {
      var lodash = require('lodash');
      res.render('index', { title: 'Scrum Cards Voting', lodash: lodash } );
    },
    users: require('./users')(),
    stories: require('./stories')()
  };
};
