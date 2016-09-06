# A Circle actor
class CircleActor extends Actor
  constructor: (x, y, direction = 0, @radius = 0) ->
    super(x, y, direction)
    @body = new Circle(@position, @radius)

  updateBody: () =>
    #@body = new Circle(@position, @radius)
    @body.pos = @position
    @body.r = @radius

  drawDebug: (colour = '#FF0000') ->
    unless @stage? or @stage.getContext()?
      console.log('Stage context cannot is null, or there is no context set')
      return

    context = @stage.getContext()
    context.save()
    context.translate(@body.pos.x, @body.pos.y)
    context.rotate(@direction)

    context.beginPath()
    context.arc(0, 0, @body.r, 0, 2 * Math.PI)
    context.fillStyle = colour
    context.fill()
    context.closePath()

    # Draw direction
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(@body.r, 0)
    context.lineWidth = 1
    context.strokeStyle = "#000000"
    context.stroke()
    context.closePath()

    context.restore()