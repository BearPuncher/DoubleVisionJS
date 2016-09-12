# A Circle actor
class CircleActor extends Actor
  constructor: (x, y, direction = 0, @radius = 0) ->
    super(x, y, direction)
    @body = new Circle(@position, @radius)

  updateBody: () =>
    @body = new Circle(@position, @radius)
