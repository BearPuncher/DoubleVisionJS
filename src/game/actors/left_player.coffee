class LeftPlayer extends Player
  constructor: (x, y) ->
    super(x, y)
    @reloadTimer = new Timer(500)

  _render: () ->
    context = @stage.getContext()
    context.save()

    @drawDebug()
    context.restore()

  _update: (step) =>
    @reloadTimer.tick(step)

    x = @position.x
    y = @position.y

    stepFraction = (step / 100)

    friction = 100
    acceleration = 2

    # If not firing, instantly reload
    if not @controller.isPressed(Keys.D)
      @reloadTimer.end()

    # D - FIRE, if our reload timer is over
    if @reloadTimer.hasEnded() and @controller.isPressed(Keys.D)
      @reloadTimer.restart()
      @stage.addActor(new Bullet(@position.x + 10, @position.y, @direction, @))

    # W - UP
    if @controller.isPressed(Keys.W)
      if @vely > -@maxSpeed
        @vely -= acceleration * stepFraction
        @vely = -@maxSpeed if @vely < -@maxSpeed
    else if @vely < 0
      @vely += friction * stepFraction
      @vely = 0 if @vely > 0

    # S - DOWN
    if @controller.isPressed(Keys.S)
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