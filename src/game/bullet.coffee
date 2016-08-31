class Bullet extends CircleActor
  constructor: (x, y, direction = 0) ->
    super(x, y, direction, 5)

  _render: () ->
    @drawDebug()

  _update: (step) ->

    stepFraction = (step / 100)
    speed = 30 * stepFraction

    moveVector = new Vector(speed, 0)
    moveVector.rotate(@direction)
    @position.add(moveVector)

    @updateBody()