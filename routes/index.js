var express = require('express');
var router = express.Router();
var votes = require('../models/vote');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Scrum Cards Voting', votes: votes } );
});

module.exports = router;
