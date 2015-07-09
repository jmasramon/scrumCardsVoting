(function () {
  'use strict';
  /* global require, console, module */
  var _ = require('lodash');
  var initialized = false;
  var scrumVote;

  module.exports = function vote_model(mongoose) {
    if (!initialized) {
      console.log('initializing vote model');
      var voteSchema = mongoose.Schema({
          room: String,
          voterName: String,
          votedCardNumber: Number
      });

      var Vote = mongoose.model('Vote', voteSchema);

      scrumVote = createAPI(Vote);
      initializeAggregatedVotes(Vote);
      initialized = true;
    }
    return scrumVote;
  };

  function initializeAggregatedVotes(Vote) {
    Vote.find().exec()
      .onFulfill(function (votes) {
        var votes_by_room = _.chain(votes).groupBy('room').map(function (room, room_name) {
          return {room: room_name, votes:_.chain(room).countBy('votedCardNumber').value()};
        }).value();

        _.each(votes_by_room, function (elem, index) {
          _.each(elem.votes, function (votes, vote_card) {
            scrumVote.aggregated_votes[elem.room][vote_card] = votes;
          });
        });
      })
      .onReject(function (err){
        console.error(err);
      });
  }

  function createAPI(Vote) {
    var scrumVote;
    scrumVote = {
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
    return scrumVote;
  }

})();
