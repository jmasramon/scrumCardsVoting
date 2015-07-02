var io = require('socket.io')();
var votes = require('../models/vote');
var users = require('../models/user');
var stories = require('../models/story');

io.on('connection', function(socket){
  console.log('a user connected');
  // socket.emit('vote message', votes);

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('login message', function (msg) {
    console.log('login message received from ' + JSON.stringify(msg));
    var existing_users = [];
    var existing_users_promise = users.getUsers();
    existing_users_promise.addBack(function (err, users) {
      if (err) return console.error(err);
      // console.log('Users found: ' + users);
      existing_users = users;
      // console.log('Users found pasted to existing_users: ' + existing_users);
      existing_users.forEach(function (user) {
        // console.log('cheching user: ' + JSON.stringify(user));
        console.log('user.name = ' + user.name + ' and msg.name = ' +msg.name);
        if (user.name == msg.name){
          // console.log('User found');
          socket.emit('authorized message');
        }
      });
    });
    // console.log('Existing users: ' + existing_users);
  });

  socket.on('give me available stories', function (msg) {
    var available_stories_promise = stories.getStories();
    available_stories_promise.addBack(function (err, available_stories) {
      if (err) return console.error(err);
      console.log('Stories found: ' + available_stories);
      socket.emit('available stories', available_stories);
    });
  });

  socket.on('join room', function (room) {
    console.log('reveived room joining solicitude to room: ' + room);
    socket.join(room);
    socket.room = room;
    io.sockets.in(room).emit('welcome to room', room);
    io.sockets.in(socket.room).emit('vote message', votes.aggregated_votes[socket.room]);
  });

  socket.on('vote message', function(msg){
    console.log('reveived vote message: ' + JSON.stringify(msg) + 'from room: ' + socket.room);
    votes.addVote(msg);
    io.sockets.in(socket.room).emit('vote message', votes.aggregated_votes[socket.room]);
  });

  socket.on('update message', function(msg){
    console.log('reveived update message: ' + JSON.stringify(msg) + 'from room: ' + socket.room);
    votes.changeVote(msg);
    io.sockets.in(socket.room).emit('vote message', votes.aggregated_votes[socket.room]);
  });
});

module.exports = io;
