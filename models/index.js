'use strict';
/* global require, console, module, Promise */

module.exports = function model_index() {
  var db_connection = require('../dbConnection');
  var db = db_connection.db;
  var mongoose = db_connection.mongoose;

  return new Promise(function (fulfill, reject){
    db.once('open', function (callback) {
      console.log('mongodb connection opened in models.index');
      fulfill({
        Vote: require('./vote')(mongoose),
        User: require('./user')(mongoose),
        Story: require('./story')(mongoose)
      });
    });
  });
};
