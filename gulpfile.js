var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var filter = require('gulp-filter');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');
var replace = require('gulp-replace');
var revReplace = require('gulp-rev-replace');
var saveLicense = require('uglify-save-license');
var rev = require('gulp-rev');
var csso = require('gulp-csso');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('views:build', function() {
  return gulp.src('src/**/*.html')
    .pipe(templateCache('templates.js', {
      module: 'diary'
    }))
    .pipe(gulp.dest('tmp/partials/'));
});

gulp.task('styles:build', function() {
  return gulp.src('src/styles/**/*.css')
    .pipe(gulp.dest('tmp/styles'));
});

gulp.task('build', ['views:build', 'styles:build'], function() {
  var jsFilter = filter('scripts/app.js', {
    restore: true
  });

  var cssFilter = filter('styles/app.css', {
    restore: true
  });

  var opts = {
    addRootSlash: false,
    relative: true
  };

  return gulp.src('./**/*.html')
    .pipe(filter('src/index.html'))
    .pipe(rename('index.html'))
    .pipe(wiredep({
      directory: 'bower_components'
    }))
    .pipe(inject(gulp.src('tmp/styles/index.css'), opts))
    .pipe(inject(gulp.src(['src/**/*.js', 'tmp/partials/templates.js']), opts))
    .pipe(useref())
    .pipe(jsFilter)
    .pipe(ngAnnotate())
    .pipe(uglify({
      preserveComments: saveLicense
    }))
    .pipe(rev())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(rev())
    .pipe(cssFilter.restore)
    .pipe(revReplace())
    .pipe(gulp.dest('tmp'));
});

gulp.task('clean', function() {
  del.sync(['tmp']);
});

gulp.task('watch', ['clean'], function() {
  gulp.watch('src/**/*.js', ['build']);
  gulp.watch('src/**/*.html', ['build']);
  gulp.watch('src/**/*.css', ['build']);
});

gulp.task('deploy', ['clean', 'build']);

gulp.task('dev', ['clean', 'build', 'watch'], function() {
  return gulp.src('./tmp').pipe(webserver({
    host: '0.0.0.0',
    port: 8888,
    fallback: '/index.html'
  }));
});