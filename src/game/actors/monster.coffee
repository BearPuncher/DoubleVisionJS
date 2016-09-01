class Monster extends CircleActor
  constructor: (x, y, direction = 0) ->
    super(x, y, direction, 15)
    @speed = 5

  _render: () ->
    @drawDebug('#00FFFF')

  _update: (step) ->

    stepFraction = (step / 100)
    adjustedSpeed = @speed * stepFraction

    moveVector = new Vector(adjustedSpeed, 0)
    moveVector.rotate(@direction)
    @position.add(moveVector)

    @destroy = true unless @stage.isCircleInBounds(@body)

    @updateBody()