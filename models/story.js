(function () {
  'use strict';
  /* global require, console, module */
  var initialized = false;
  var scrumStory;
  var Story;

  module.exports = function story_model(mongoose) {
    if (!initialized) {
      console.log('initializing story model');
      var storySchema = mongoose.Schema({
          name: String,
          description: String
      });

      Story = mongoose.model('Story', storySchema);

      deleteAllStories(Story);
      createInitialStories(Story);
      scrumStory = createAPI(Story);

      initialized = true;
    } else {
      console.log('already initialized, returning memoized one');
    }

    return scrumStory;
  };
})();

function deleteAllStories(Story) {
  Story.remove({}, function (err, story) {
    if (err) return console.error(err);
  });
}

function createInitialStories(Story) {
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
}

function createAPI(Story) {
  var scrumStory;
  scrumStory = {
    getStories: function () {
      return Story.find().exec();
    },
    deleteStory: function(story){
      Story.find({name: story}).remove(function (err) {
        console.log(story + ' deleted.');
      });
    },
    newStory: function (story) {
      new Story({name:story.name, description: story.description}).save(function (err, story) {
        if (err) return console.error(err);
      });
      console.log(story.name + ' created.');
    }
  };
  return scrumStory;
}
