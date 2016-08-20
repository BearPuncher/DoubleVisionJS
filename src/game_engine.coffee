# Modeled after
# https://github.com/kittykatattack/ga/blob/master/ga.js

# Game engine
class Game
  @fps: 60
  @skipTicks: 1000 / @fps
  @step: 1 / @fps

  # Constructor for Game
  # @canvas is optional
  constructor: (width, height, setup, @canvas = undefined) ->
    # Create new canvas if we don't receive one
    unless @canvas
      @canvas = document.createElement 'canvas'
      document.body.appendChild @canvas

    @canvas.ctx = @canvas.getContext("2d")
    @canvas.style.width = width + 'px'
    @canvas.style.height = height + 'px'

    @running = false
    @setup = setup || undefined
    @stage = null

    # Invoke setup callback
    if @setup
      @setup()

  setStage: (stage) =>
    unless stage instanceof Stage
      console.log('ERROR: ' + stage + ' is not an Stage')
      return

    @stage = stage

  # Change background color of @canvas
  backgroundColor: (color) =>
    @canvas.style.backgroundColor = color

  # Change border style
  border: (border) =>
    @canvas.style.border = border

  start: () =>
    @running = true
    @startTime = Date.now()
    @dt = 0
    window.onEachFrame(@gameLoop)

  update: () ->
    if @stage?
      @stage.update(@dt)

  render: (offset) ->
    @canvas.ctx.clearRect(0, 0, @canvas.width, @canvas.height)
    if @stage?
      @stage.render(offset)

  gameLoop: () =>
    unless @running?
      return

    # Set last timestamp, if there was none
    current = Date.now()
    elapsedTime = current - @startTime

    if (elapsedTime > 1000)
      elapsedTime = Game.skipTicks

    @startTime = current
    @dt += elapsedTime

    while @dt >= Game.skipTicks
      @update()
      @dt -= Game.skipTicks

    offset = @dt / Game.skipTicks
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
      setInterval cb, Game.skipTicks
      return
  window.onEachFrame = onEachFrame
  return
