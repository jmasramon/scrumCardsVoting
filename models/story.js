var mongoose = require('mongoose');

// TODO: extract connection to common ground
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log('mongodb connection opened');
});

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
  getStories: function () {
    // found_users = [];
    return Story.find().exec();
    // return found_users;
  }
};

module.exports = story;
