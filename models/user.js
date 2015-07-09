(function () {
  'use strict';
  /* global module, console */
  var initialized = false;
  var scrumUser;

  module.exports = function user_model(mongoose) {
    if (!initialized) {
      console.log('initializing user model');
      var scrumUserSchema = mongoose.Schema({
          name: String,
      });

      var ScrumUser = mongoose.model('ScrumUser', scrumUserSchema);

      deleteAllUsers(ScrumUser);
      createInitialUsers(ScrumUser);
      scrumUser = createAPI(ScrumUser);

      initialized = true;
    }

    return scrumUser;
  };
})();

function deleteAllUsers(ScrumUser) {
  ScrumUser.remove({}, function (err, story) {
    if (err) return console.error(err);
  });
}

function createInitialUsers(ScrumUser) {
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
}

function createAPI(ScrumUser) {
  var scrumUser;

  scrumUser = {
    getUsers: function () {
      // found_users = [];
      return ScrumUser.find().exec();
      // return found_users;
    },
    deleteUser: function(user){
      ScrumUser.find({name: user}).remove(function (err) {
        console.log(user + ' deleted.');
      });
    },
    newUser: function (user) {
      new ScrumUser({name:user}).save(function (err, story) {
        if (err) return console.error(err);
      });
      console.log(user + ' created.');
    }
  };
  return scrumUser;
}
