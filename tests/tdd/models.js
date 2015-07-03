'use strict';
/* global require, beforeEach, after, describe, module, console, Promise, __dirname*/

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function (callback) {
  console.log('mongodb connection opened');
});

var User = require('../../models/user')(mongoose);
var Story = require('../../models/story')(mongoose);
var Vote = require('../../models/vote')(mongoose);

describe('Model tests', function () {
    beforeEach(function (done) {
      done();
    });

    after(function () {
        console.log('disconnecting from mongodb');
        mongoose.disconnect();
    });

    require('./user_model')(User);
    require('./story_model')(Story);
    require('./vote_model')(Vote);
});
