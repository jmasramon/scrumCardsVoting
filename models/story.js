'use strict';
/* global require, console, module */

module.exports = function (mongoose) {
  console.log('story model imported with mongoose: ' + mongoose);

  var storySchema = mongoose.Schema({
      name: String,
      description: String
  });

  var Story = mongoose.model('Story', storySchema);

  Story.remove({}, function (err, story) {
    if (err) return console.error(err);
  });

  var aStory = new Story({name:'Story 1', description: 'As a user I want to see cards so I can vote'});
  var anotherStory = new Story({name:'Story 2', description: 'As a user I want to see results in real time'});
  var moreStory = new Story({name:'Story 3', description: 'As a user I want to be abñe to login'});

  aStory.save(function (err, story) {
    if (err) return console.error(err);
  });
  anotherStory.save(function (err, story) {
    if (err) return console.error(err);
  });
  moreStory.save(function (err, story) {
    if (err) return console.error(err);
  });

  var story = {
    storyId:33,
    getStories: function () {
      // found_users = [];
      return Story.find().exec();
      // return found_users;
    }
  };

  return story;
};
