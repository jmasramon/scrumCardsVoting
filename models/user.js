var mongoose = require('mongoose');

// TODO: extract connection to common ground
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
  console.log('mongodb connection opened');
});

var scrumUserSchema = mongoose.Schema({
    name: String,
});

var ScrumUser = mongoose.model('ScrumUser', scrumUserSchema);

ScrumUser.remove({}, function (err, story) {
  if (err) return console.error(err);
});

var aUser = new ScrumUser({name:'Jordi'});
var anotherUser = new ScrumUser({name:'Marc'});
var moreUser = new ScrumUser({name:'Marta'});

aUser.save(function (err, aUser) {
  if (err) return console.error(err);
});
anotherUser.save(function (err, aUser) {
  if (err) return console.error(err);
});
moreUser.save(function (err, aUser) {
  if (err) return console.error(err);
});

var scrumUser = {
  getUsers: function () {
    // found_users = [];
    return ScrumUser.find().exec();
    // return found_users;
  }
};

module.exports = scrumUser;
