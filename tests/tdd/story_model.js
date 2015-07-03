module.exports = function (Story){
    'use strict';
    var retrieved_stories;

    before(function (done) {
      Story.getStories().addBack(function (err, stories) {
        if (err) fail();
        retrieved_stories = stories;
        console.log('retrieved_stories: ' + retrieved_stories);
        done();
      });
    });

    describe('Story Model', function () {
      it('should return the users from the db', function () {
        retrieved_stories.length.should.equal(3);
        retrieved_stories.forEach(function (story) {
          (story.name.slice(0,5)).should.equal('Story');
        });
      });
    });
};
