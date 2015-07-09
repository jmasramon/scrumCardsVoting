'use strict';
/* global require, console, module */

var io = require('socket.io')();
var models = require('../models')();

var votes;
var users;
var stories;

models
  .then(function (models) {
    console.log('Models promise fulfilled; models available !');
    votes = models.Vote;
    console.log('votes:' + JSON.stringify(votes));
    users = models.User;
    console.log('users:' + JSON.stringify(users));
    stories = models.Story;
    console.log('stories:' + JSON.stringify(stories));
  })
  .catch(function (err) {
    console.log('Models initializing failed');
    throw new Error('No models access');
  });

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('new user', function (user) {
    console.log('new user message for user: ' + user);
    users.newUser(user);
    socket.emit('user created', user);
  });

  socket.on('new story', function (story) {
    console.log('new story message for story: ' + story.name);
    stories.newStory(story);
    socket.emit('story created', story.name);
  });

  socket.on('delete user', function (user) {
    console.log('delete user message for user: ' + user);
    users.deleteUser(user);
    socket.emit('user deleted', user);
  });

  socket.on('delete story', function (story) {
    console.log('delete story message for story: ' + story);
    stories.deleteStory(story);
    socket.emit('story deleted', story);
  });

  socket.on('login message', function (msg) {
    console.log('login message received from ' + JSON.stringify(msg));
    var existing_users = [];
    var existing_users_promise = users.getUsers();
    existing_users_promise
      .onFulfill(function (users) {
        existing_users = users;
        existing_users.forEach(function (user) {
          console.log('user.name = ' + user.name + ' and msg.name = ' +msg.name);
          if (user.name == msg.name){
            socket.emit('authorized message');
          }
        });
      })
      .onReject(function (err) {
        console.error(err);
      });
  });

  socket.on('give me available stories', function (msg) {
    var available_stories_promise = stories.getStories();
    available_stories_promise
      .onFulfill(function (available_stories) {
        console.log('Stories found: ' + available_stories);
        socket.emit('available stories', available_stories);
      })
      .onReject(function(err) {
        console.error(err);
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
