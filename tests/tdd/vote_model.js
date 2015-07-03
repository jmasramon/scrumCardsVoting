module.exports = function (Vote){
    'use strict';

    beforeEach(function (done) {
      done();
    });

    describe('Vote Model', function () {
      it('should start with empty aggregated votes',function () {
        Vote.aggregated_votes.should.be.an.object;
        Object.keys(Vote.aggregated_votes).length.should.equal(3);
      });

      it('should aggregate votes to the appropriate Story', function () {
        Vote.addVote({
            room: 'Story 1',
            voterName: 'Marc',
            votedCardNumber: 1
        });
        Vote.aggregated_votes['Story 1'][1].should.equal(1);
      });

      it('should change votes to the appropriate Story', function () {
        Vote.changeVote({
            room: 'Story 1',
            voterName: 'Marc',
            votedCardNumber: 2,
            oldVote: 1
        });
        Vote.aggregated_votes['Story 1'][1].should.equal(0);
        Vote.aggregated_votes['Story 1'][2].should.equal(1);
      });



    });
};
