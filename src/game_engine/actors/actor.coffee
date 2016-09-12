# Actor, has a stage
class Actor
  constructor: (x, y, @direction = 0) ->
    @position = new Vector(x, y)
    @stage = null
    @destroy = false

  init: () ->
    if @_init
      @_init()

  update: (step) ->
    if @_update
      @_update step

  render: () ->
    if @_render
      @_render()

  setInit: (init = undefined) =>
    @_init = init

  setUpdate: (update = undefined) =>
    @_update = update

  setRender: (render = undefined) =>
    @_render = render

  setStage: (@stage) =>

  setPosition: (x = 0, y = 0) =>
    @position = new Vector(x, y)

  setDirection: (degrees) =>
    @direction = degrees * (Math.PI / 180)

  shouldDestroy: () ->
    return @destroy

  lookAt: (point) =>
    unless point instanceof Vector
      console.log('ERROR: ' + point + ' is not an Point')
      return
    @direction = Math.atan2(point.x - @position.y,
      point.x - @position.x)
