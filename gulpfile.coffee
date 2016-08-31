'use strict'
del = require('del')
# server = require('karma').Server
gulp = require('gulp')
gutil = require('gulp-util')
codo = require('gulp-codo')
coffee = require('gulp-coffee')
coffeekup = require('gulp-coffeekup')
coffeelint = require('gulp-coffeelint')
concat = require('gulp-concat')
cssmin = require('gulp-cssmin')
gzip = require('gulp-gzip')
tar = require('gulp-tar')
sass = require('gulp-sass')
sassLint = require('gulp-sass-lint')
uglify = require('gulp-uglifyjs')

# Clean ./dist dir
gulp.task 'clean', ->
  del [
    'dist/index.html'
    'dist/js/vendor/**/*'
    'dist/js/**/*'
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

  ###gulp.task 'doc', ->
  gulp.src('./src/game_engine/**\/\*.coffee')
  .pipe(codo({
    name: 'Game Engine',
    title: 'Game Engine written in Coffeescript',
    readme: 'greeter.md',
    extra: 'LICENSE.md'
  }))###

# Compile coffeekup templates
gulp.task 'coffeekup', ->
  gulp.src('./template/**/*.coffee')
  .pipe(coffeekup())
  .pipe gulp.dest('./dist')
  return

# Game Engine specific
gulp.task 'game-engine-coffee', ->
  gulp.src([
    './src/game_engine/math_helpers.coffee',
    './src/game_engine/controller.coffee',
    './src/game_engine/actors/actor.coffee',
    './src/game_engine/actors/square_actor.coffee',
    './src/game_engine/actors/circle_actor.coffee',
    './src/game_engine/stage.coffee',
    './src/game_engine/game_engine.coffee'
  ])
  .pipe(concat('game_engine.coffee'))
  .pipe(coffee(bare: true)
  .on('error', gutil.log))
  #.pipe(uglify())
  .pipe gulp.dest('./dist/js')
  return

# Game specific
gulp.task 'game-coffee', ->
  gulp.src([
    './src/game/player.coffee',
    './src/game/left_player.coffee',
    './src/game/right_player.coffee',
    './src/game/bullet.coffee'
  ])
  .pipe(concat('game.coffee'))
  .pipe(coffee(bare: true)
  .on('error', gutil.log))
  #.pipe(uglify())
  .pipe gulp.dest('./dist/js')
  return

# Compile coffescript to js
gulp.task 'coffee', ['game-engine-coffee', 'game-coffee']

gulp.task 'vendorjs', ->
  gulp.src('./vendor/*.js')
  .pipe gulp.dest('./dist/js/vendor')
  return

# Compile sass to css
gulp.task 'sass', ->
  gulp.src('./sass/**/*.scss')
  .pipe(sassLint({
    rules: {
      'single-line-per-selector': 0,
      'no-ids': 0,
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

gulp.task 'compress', ->
  gulp.src('./dist/**/*')
  .pipe(tar('release.tar'))
  .pipe(gzip())
  .pipe(gulp.dest('.'))

gulp.task 'default', [
  'clean'
  'lint'
  'coffeekup'
  'coffee'
  'sass'
  'vendorjs'
  'watch'
]