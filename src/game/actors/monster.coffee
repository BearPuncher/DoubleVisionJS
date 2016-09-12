class Monster extends CircleActor
  constructor: (x, y, direction = 0, @color = '#00FF00') ->
    super(x, y, direction, 16)
    @speed = Math.round(Math.random() * 2) + 2.5

  _render: () ->
    @drawDebug(@color)

  _update: (step) ->
    stepFraction = (step / 100)
    adjustedSpeed = @speed * stepFraction

    moveVector = new Vector(adjustedSpeed, 0)
    moveVector.rotate(@direction)
    @position.add(moveVector)

    @updateBody()
