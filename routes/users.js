module.exports = function () {
  'use strict';
  return function (req, res, next) {
    res.render('users', { title: 'Users management' } );
  };
};
