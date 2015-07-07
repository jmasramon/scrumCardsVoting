module.exports = function (stories) {
  'use strict';
  return function(req, res, next) {
    models.then(function (models) {
      stories = models.Story;
      console.log('stories model = ' + stories);
    });

    res.render('stories', { title: 'Stories management', stories: stories.getStories() } );
  };
};
