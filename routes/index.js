module.exports = function () {
  'use strict';
  return {
    index: function(req, res, next) {
      var lodash = require('lodash');
      res.render('index', { title: 'Scrum Cards Voting', lodash: lodash } );
    },
    users: require('./users')(),
    stories: require('./stories')()
  };
};
