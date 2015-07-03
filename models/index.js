'use strict';
/* global require, console, module, Promise */

module.exports = function () {
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/qumram');

  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));


  return new Promise(function (fulfill, reject){
    db.once('open', function (callback) {
      console.log('mongodb connection opened');
      fulfill({
        Vote: require('./vote')(mongoose),
        User: require('./user')(mongoose),
        Story: require('./story')(mongoose)
      });
    });
  });


};
