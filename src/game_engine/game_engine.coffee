# Asset Loader
Loader =
  images: {}
  loadImage: (key, src) ->
    downloadingImage = new Image()
    downloadingImage.onload = () ->
      images[key] = downloadingImage
    downloadingImage.src = src
  getImage: (key) ->
    return images[key]

# Modeled after
# https://github.com/kittykatattack/ga/blob/master/ga.js

# Game engine
class Game
  @fps: 60
  @frameDuration: 1000 / @fps
  @mousePoint: undefined

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
    @canvas.addEventListener 'mousemove', (event) ->
      rect = this.getBoundingClientRect()
      Game.mousePoint = new Vector(
        event.clientX - rect.left,
        event.clientY - rect.top)

    @running = false
    @setup = setup || undefined
    @stage = null
    @startTime = 0
    @accumulator = 0
    @actualFps = 0

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

  @getMouseLocation: () ->
    return Game.mousePoint

  start: () =>
    @running = true
    @startTime = Date.now()
    @gameStep()
    window.onEachFrame(@render)

  update: (step) ->
    if @stage?
      @stage.update(step)

  render: () =>
    unless @running?
      return

    @canvas.ctx.clearRect(0, 0, @canvas.width, @canvas.height)
    @canvas.ctx.fillStyle = "Black"
    @canvas.ctx.font = "normal 16pt Arial"
    @canvas.ctx.fillText(Math.round(@actualFps), @canvas.width - 30, 20)

    if @stage?
      @stage.render()

  gameStep: () =>
    unless @running?
      return

    currentTime = Date.now()
    elapsedMs = currentTime - @startTime

    if elapsedMs > 1000
      elapsedMs = Game.frameDuration

    @actualFps = 1000 / elapsedMs

    @startTime = currentTime
    @accumulator += elapsedMs

    while @accumulator >= Game.frameDuration
      @update(Game.frameDuration)
      @accumulator -= Game.frameDuration

    setTimeout(@gameStep, Game.frameDuration)

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
