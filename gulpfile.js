var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  gutil = require('gulp-util'),
  notify = require("gulp-notify"),
  uglify = require('gulp-uglifyjs');


gulp.task('default', function() {
});

gulp.task('mocha', function() {
  return gulp.src(['tests/tdd/*.js'], {
      read: false
    })
    .pipe(mocha({
      reporter: 'list',
      bail: false
    }))
    .on("error", notify.onError({
        message: 'Some test has failed!',
        sound: true
      }));
});

gulp.task('watch', function() {
  gulp.watch(['public/**', 'routes/**', 'models/**', 'views/**', 'tests/**'], ['mocha']);
});


gulp.task('uglify', function() {
  gulp.src(['public/javascripts/jquery.min.js','public/javascripts/bootstrap.min.js','public/javascripts/socket.io.js','public/javascripts/Chart.min.js'])
    .pipe(uglify('scripts.js'))
    .pipe(gulp.dest('public/dist/js'));

  gulp.src(['views/logic.js'])
    .pipe(uglify('logic.js'))
    .pipe(gulp.dest('public/dist/js'));

});
