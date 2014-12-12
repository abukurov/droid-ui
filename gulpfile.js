'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('sass', function () {
  return gulp.src('./public/sass/styles.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({ outputStyle: 'compressed' }))
    .pipe($.sourcemaps.write())
    .pipe($.rename('droid-ui.css'))
    .pipe(gulp.dest('./public/build/css'));
});

gulp.task('scripts', function() {
  return gulp.src('./public/js/app.js')
    .pipe($.browserify({
      shim: {
        angular: {
          path: './public/components/angularjs/angular.js',
          exports: 'angular'
        }
      },
      debug : true
    }))
    .pipe($.rename('droid-ui.js'))
    .pipe(gulp.dest('./public/build/js'))
});

gulp.task('build', ['sass', 'scripts']);

gulp.task('watch', ['build'], function () {
  $.developServer.listen({ path: './bin/www' });

  gulp.watch(['./public/sass/**/*.scss'], ['sass']);
  gulp.watch(['./public/js/**/*.js'], ['scripts']);
});

gulp.task('default', ['watch']);
