'use strict';
/* global require, console, module */

module.exports = function (mongoose) {
  console.log('vote model imported with mongoose: ' + mongoose);

  var voteSchema = mongoose.Schema({
      room: String,
      voterName: String,
      votedCardNumber: Number
  });

  var Vote = mongoose.model('Vote', voteSchema);

  Vote.remove({}, function (err, aVote) {
    if (err) return console.error(err);
  });

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
    console.log('votes = ' +votes);
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
      console.log('adding vote:' + JSON.stringify(vote));
      var newVote = new Vote(vote);
      newVote.save(function (err, aVote) {
        if (err) return console.error(err);
      });
      console.log('updating aggregated_votes with: ' + vote.votedCardNumber);
      this.aggregated_votes[vote.room][vote.votedCardNumber]++;
    },
    // TODO: Use this. Prevent voting more than once
    changeVote: function (vote) {
      Vote.update({room: vote.room, voterName: vote.voterName}, { $set: { votedCardNumber: vote.votedCardNumber }}, function (err, aVote) {
        if (err) return console.error(err);
      });
      console.log('updating aggregated_votes with: ' + vote.votedCardNumber);
      this.aggregated_votes[vote.room][vote.oldVote]--;
      this.aggregated_votes[vote.room][vote.votedCardNumber]++;
    }
  };

  return vote;
};
