class Bullet extends CircleActor
  constructor: (x, y, direction = 0) ->
    super(x, y, direction, 5)
    @bulletSpeed = 30

  _render: () ->
    @drawDebug('#00FF00')

  _update: (step) ->

    stepFraction = (step / 100)
    speed = @bulletSpeed * stepFraction

    moveVector = new Vector(speed, 0)
    moveVector.rotate(@direction)
    @position.add(moveVector)

    @destroy = true unless @stage.isCircleInBounds(@body)

    @updateBody()