'use strict';
/* global module, console */

module.exports = function (mongoose) {
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
    usersId: 29,
    getUsers: function () {
      // found_users = [];
      return ScrumUser.find().exec();
      // return found_users;
    }
  };

  return scrumUser;
};
