# A Circle actor
class CircleActor extends Actor
  constructor: (x, y, direction = 0, @radius = 0) ->
    super(x, y, direction)

  setDimensions: (@radius = 0) =>

  drawDebug: (colour = '#FF0000') ->
    unless @stage? or @stage.getContext()?
      console.log('Stage context cannot is null, or there is no context set')
      return

    context = @stage.getContext()
    context.translate(@position.getX(), @position.getY())
    context.rotate(@direction)

    context.beginPath()
    context.arc(0, 0, @radius, 0, 2 * Math.PI)
    context.fillStyle = colour
    context.fill()
    context.closePath()

    # Draw direction
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(@radius, 0)
    context.lineWidth = 1
    context.strokeStyle = "#000000"
    context.stroke()
    context.closePath()

    context.rotate(-@direction)
    context.translate(-@position.getX(), -@position.getY())