# onEachFrame Fix

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

# Game engine BEGIN

GAME =
  canvas: null
  setup: undefined
  run: undefined
  backgroundColor: (color) ->
    unless GAME.canvas?
      console.log('Run GAME.create() before GAME.backgroundColor()')
    GAME.canvas.style.backgroundColor = color

GAME.create = (width, height, setup) ->
  # Create new canvas
  canvas = document.createElement 'canvas'
  canvas.style.width = width
  canvas.style.height = height
  GAME.canvas = canvas
  document.body.appendChild GAME.canvas

  GAME.setup = setup || undefined

  # Invoke setup callback
  if GAME.setup
    GAME.setup()
