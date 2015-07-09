module.exports = function stories_route() {
  'use strict';
  return function(req, res, next) {
    var stories = require('../models/story')();

    console.log('stories model = ' + JSON.stringify(stories));

    var available_stories_promise = stories.getStories();

    available_stories_promise
      .onFulfill(function (available_stories) {
        console.log('Stories found: ' + available_stories);

        res.render('stories', { title: 'Stories management', stories: available_stories } );
      })
      .onReject(function (err) {
        console.error(err);
      });

  };
};
