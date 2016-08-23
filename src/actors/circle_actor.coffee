# A Square actor
class CircleActor extends Actor
  constructor: (x, y, direction = 0, @radius = 0) ->
    super(x, y, direction)

  setDimensions: (@radius = 0) =>

  drawDebug: () ->
    unless @stage? or @stage.getContext()?
      console.log('Stage context cannot is null, or there is no context set')
      return
    context = @stage.getContext()
    context.translate(@position.getX(), @position.getY())
    context.rotate(@direction)
    context.fillStyle = "#FF0000"
    context.beginPath()
    context.arc(0, 0, @radius, 0, 2 * Math.PI)
    context.fill()
    context.closePath()
    context.rotate(-@direction)
    context.translate(-@position.getX(), -@position.getY())