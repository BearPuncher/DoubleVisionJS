# Actor, has a stage
class Actor
  constructor: (x, y, @direction = 0) ->
    @position = new Point(x, y)
    @stage = null

  init: () ->
    if @_init
      @_init()

  update: (step) ->
    if @_update
      @_update step

  render: () ->
    if @_render
      @_render()

  setInit: (init = undefined ) =>
    @_init = init

  setUpdate: (update = undefined) =>
    @_update = update

  setRender: (render = undefined ) =>
    @_render = render

  setStage: (@stage) =>

  setPosition: (x = 0, y = 0) =>
    @position = new Point(x, y)

  setDirection: (degrees) =>
    @direction = degrees * (Math.PI / 180)

  lookAt: (point) =>
    unless point instanceof Point
      console.log('ERROR: ' + point + ' is not an Point')
      return
    @direction = Math.atan2(point.getY() - @position.getY(),
      point.getX() - @position.getX())
