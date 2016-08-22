# Actor, has a stage
class Actor
  constructor: (x, y, @direction = 0, @width = 0, @height = 0) ->
    @position = new Point(x, y)
    @stage = null

  update: (timer, dt) ->
    @_update timer, dt

  render: (offset) ->
    @_render(offset)

  setUpdate: (update = undefined) =>
    @_update = update

  setRender: (render = undefined ) =>
    @_render = render

  setStage: (@stage) =>

  setPosition: (x = 0, y = 0) =>
    @position = new Point(x, y)

  setDirection: (degress) =>
    @direction = degress * (Math.PI / 180)

  setDimensions: (w, h) =>
    @width = w
    @height = h

  drawDebugRectangle: () ->
    unless @stage? or @stage.getContext()?
      console.log('Stage context cannot is null, or there is no context set')
      return
    context = @stage.getContext()
    context.translate(@position.getX(), @position.getY())
    context.rotate(@direction)
    context.fillStyle = "#FF0000"
    context.fillRect(0, 0 , @width, @height)
    context.rotate(-@direction)
    context.translate(-@position.getX(), -@position.getY())