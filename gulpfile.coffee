'use strict'
del = require('del')
# server = require('karma').Server
gulp = require('gulp')
gutil = require('gulp-util')
coffee = require('gulp-coffee')
coffeekup = require('gulp-coffeekup')
coffeelint = require('gulp-coffeelint')
concat = require('gulp-concat')
cssmin = require('gulp-cssmin')
sass = require('gulp-sass')
sassLint = require('gulp-sass-lint')
uglify = require('gulp-uglifyjs')

# Clean ./dist dir
gulp.task 'clean', ->
  del [
    'dist/index.html'
    'dist/js/**/*'
    'dis/js/vendor'
    'dist/css/**/*'
  ]
  return

# Lint our coffeescript
gulp.task 'lint', ->
  gulp.src([
    './gulpfile.coffee'
    './src/**/*.coffee'
    './template/**/*.coffee'
  ]).pipe(coffeelint())
  .pipe coffeelint.reporter()
  return

# Compile coffeekup templates
gulp.task 'coffeekup', ->
  gulp.src('./template/**/*.coffee')
  .pipe(coffeekup())
  .pipe gulp.dest('./dist')
  return

# Compile coffescript to js
gulp.task 'coffee', ->
  gulp.src([
    './src/math_helpers.coffee',
    './src/controller.coffee',
    './src/actor.coffee',
    './src/stage.coffee',
    './src/game_engine.coffee'
  ])
  .pipe(concat('game.coffee'))
  .pipe(coffee(bare: true)
  .on('error', gutil.log))
  .pipe(uglify())
  .pipe gulp.dest('./dist/js')
  return

gulp.task 'vendorjs', ->
  gulp.src('./vendor/*.js')
  .pipe gulp.dest('./dist/js/vendor')
  return

# Compile sass to css
gulp.task 'sass', ->
  gulp.src('./sass/**/*.scss')
  .pipe(sassLint({
    rules: {
      'single-line-per-selector': 0
    }
  }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
  .pipe(sass.sync()
  .on('error', sass.logError))
# .pipe(concat('main.css'))
  .pipe(cssmin())
  .pipe gulp.dest('./dist/css')
  return

gulp.task 'watch', ->
  gulp.watch('./src/**/*.coffee', ['lint', 'coffee'])
  gulp.watch('./template/**/*.coffee', ['lint', 'coffeekup'])
  gulp.watch('./sass/**/*.scss', ['sass'])
  return

# TODO: Add compression

gulp.task 'default', [
  'clean'
  'lint'
  'coffeekup'
  'coffee'
  'vendorjs'
  'sass'
  'watch'
]