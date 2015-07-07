'use strict';
/* global require, console, module */
var _ = require('lodash');

module.exports = function (mongoose) {
  var voteSchema = mongoose.Schema({
      room: String,
      voterName: String,
      votedCardNumber: Number
  });

  var Vote = mongoose.model('Vote', voteSchema);

  // Vote.remove({}, function (err, aVote) {
  //   if (err) return console.error(err);
  // });

  // var aVote = new Vote({voterName:'Jordi', votedCardNumber: 1});
  // var anotherVote = new Vote({voterName:'Marc', votedCardNumber: 3});
  // var moreVote = new Vote({voterName:'Marta', votedCardNumber: 2});
  //
  // aVote.save(function (err, aVote) {
  //   if (err) return console.error(err);
  // });
  // anotherVote.save(function (err, aVote) {
  //   if (err) return console.error(err);
  // });
  // moreVote.save(function (err, aVote) {
  //   if (err) return console.error(err);
  // });
  //

  Vote.find(function (err, votes) {
    if (err) return console.error(err);

    var votes_by_room = _.chain(votes).groupBy('room').map(function (room, room_name) {
      return {room: room_name, votes:_.chain(room).countBy('votedCardNumber').value()};
    }).value();

    _.each(votes_by_room, function (elem, index) {
      _.each(elem.votes, function (votes, vote_card) {
        vote.aggregated_votes[elem.room][vote_card] = votes;
      });
    });

  });

  var vote = {
    aggregated_votes:{
      'Story 1': {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
      },
      'Story 2': {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
      },
      'Story 3': {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
      }
    },
    addVote: function (vote) {
      var newVote = new Vote(vote);
      newVote.save(function (err, aVote) {
        if (err) return console.error(err);
      });
      this.aggregated_votes[vote.room][vote.votedCardNumber]++;
    },
    // TODO: Use this. Prevent voting more than once
    changeVote: function (vote) {
      Vote.update({room: vote.room, voterName: vote.voterName}, { $set: { votedCardNumber: vote.votedCardNumber }}, function (err, aVote) {
        if (err) return console.error(err);
      });
      this.aggregated_votes[vote.room][vote.oldVote]--;
      this.aggregated_votes[vote.room][vote.votedCardNumber]++;
    },
  };

  return vote;
};
