var express = require('express');
var router = express.Router();
var votes = require('../models/vote');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  votes[req.params.id] = votes[req.params.id] + 1;
  // res.send('Voted for ' + req.params.id + ' Total votes: ' + JSON.stringify(votes) );
  res.redirect('/');
});

module.exports = router;
