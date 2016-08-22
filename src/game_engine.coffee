# Modeled after
# https://github.com/kittykatattack/ga/blob/master/ga.js

# Game engine
class Game
  @fps: 60
  @dt: 1 / @fps
  @frameDuration: 1000 / @fps

  # Constructor for Game
  # @canvas is optional
  constructor: (width, height, setup, @canvas = undefined) ->
    # Create new canvas if we don't receive one
    unless @canvas
      @canvas = document.createElement 'canvas'
      document.body.appendChild @canvas

    @canvas.ctx = @canvas.getContext('2d')
    @canvas.width = width
    @canvas.height = height

    @running = false
    @setup = setup || undefined
    @stage = null
    @startTime = 0
    @accumulator = 0

    # Invoke setup callback
    if @setup
      @setup()

  setStage: (stage) =>
    unless stage instanceof Stage
      console.log('ERROR: ' + stage + ' is not an Stage')
      return
    # Pass in reference to context to share between actors
    @stage = stage
    @stage.setContext(@canvas.ctx)

  # Change background color of @canvas
  backgroundColor: (color) =>
    @canvas.style.backgroundColor = color

  # Change border style
  border: (border) =>
    @canvas.style.border = border

  start: () =>
    @running = true
    @startTime = Date.now()
    window.onEachFrame(@gameLoop)

  update: () ->
    if @stage?
      @stage.update(@timer, Game.dt)

  render: (offset) ->
    @canvas.ctx.clearRect(0, 0, @canvas.width, @canvas.height)
    if @stage?
      @stage.render(offset)

  gameLoop: () =>
    unless @running?
      return

    currentTime = Date.now()
    elapsedMs = currentTime - @startTime

    if elapsedMs > 1000
      elapsedMs = Game.frameDuration

    @startTime = currentTime
    @accumulator += elapsedMs

    while @accumulator >= Game.frameDuration
      @update()
      @accumulator -= Game.frameDuration

    offset = @accumulator / Game.frameDuration
    @render(offset)

# onEachFrame from;
# http://stackoverflow.com/questions/1955687/best-way-for-simple-game-loop-in-javascript
do ->
  onEachFrame = undefined
  if window.requestAnimationFrame
    onEachFrame = (cb) ->
      _cb = ->
        cb()
        requestAnimationFrame _cb
        return
      _cb()
      return
  else if window.webkitRequestAnimationFrame
    onEachFrame = (cb) ->
      _cb = ->
        cb()
        webkitRequestAnimationFrame _cb
        return
      _cb()
      return
  else if window.mozRequestAnimationFrame
    onEachFrame = (cb) ->
      _cb = ->
        cb()
        mozRequestAnimationFrame _cb
        return
      _cb()
      return
  else
    onEachFrame = (cb) ->
      setInterval cb, Game.frameDuration
      return
  window.onEachFrame = onEachFrame
  return
