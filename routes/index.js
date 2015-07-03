module.exports = function () {
  'use strict';
  return {
    index: function(req, res, next) {
      res.render('index', { title: 'Scrum Cards Voting' } );
    }
  };
};
