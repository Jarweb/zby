
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');
// 样式
gulp.task('styles', function() {
  return gulp.src('../font-end/managem/css/**.css')
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('../font-end/managem/dist/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('../font-end/managem/dist/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});
// 脚本
gulp.task('scripts', function() {
  return gulp.src('../font-end/managem/js/**.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('../font-end/managem/dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('../font-end/managem/dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
// 图片
gulp.task('images', function() {
  return gulp.src('../font-end/managem/img/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('../font-end/managem/dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});
// 清理
gulp.task('clean', function() {
  return gulp.src(['../font-end/managem/dist/css', '../font-end/managem/dist/js', '../font-end/managem/dist/img'], {read: false})
    .pipe(clean());
});
// 预设任务
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
//监听任务
gulp.task('watch', function() {
  gulp.watch('../font-end/managem/css/*.css', ['styles']);
  gulp.watch('../font-end/managem/js/*.js', ['scripts']);
  gulp.watch('../font-end/managem/img/*', ['images']);

  var server = livereload();

  gulp.watch(['../font-end/managem/dist/**']).on('change', function(file) {
    server.changed(file.path);
  });

});



