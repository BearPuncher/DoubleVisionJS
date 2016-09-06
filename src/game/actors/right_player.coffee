class RightPlayer extends Player
  constructor: (x, y) ->
    super(x, y)
    @direction = MathHelpers.toRadians(180)
    @reloadTimer = new Timer(500)

  _render: () ->
    @drawDebug('#0000FF')


  _update: (step) =>
    @reloadTimer.tick(step)

    x = @position.x
    y = @position.y

    stepFraction = (step / 100)

    friction = 1.5
    acceleration = 2

    # LEFT - FIRE, if our reload timer is over
    if @reloadTimer.hasEnded() and @controller.isPressed(Keys.LEFT)
      @reloadTimer.restart()
      @stage.addActor(new Bullet(@position.x - 10, @position.y, @direction, @))

    # Up - UP
    if @controller.isPressed(Keys.UP)
      if @vely > -@maxSpeed
        @vely -= acceleration * stepFraction
        @vely = -@maxSpeed if @vely < -@maxSpeed
    else if @vely < 0
      @vely += friction * stepFraction
      @vely = 0 if @vely > 0

    # Down - DOWN
    if @controller.isPressed(Keys.DOWN)
      if @vely < @maxSpeed
        @vely += acceleration * stepFraction
        @vely = @maxSpeed if @vely > @maxSpeed
    else if @vely > 0
      @vely -= friction * stepFraction
      @vely = 0 if @vely < 0

    newPosition = new Circle(new Vector(x, y + @vely), @radius)
    if @stage.isCircleInBounds(newPosition)
      @setPosition(x, y + @vely)

    @updateBody()