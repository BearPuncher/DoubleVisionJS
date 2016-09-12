class RightPlayer extends Player
  @STAND_CYCLE: [{col: 0, row: 0}]
  @RUN_CYCLE = [{col: 1, row: 0 }, {col: 2, row: 0}]

  constructor: (x, y) ->
    super(x, y)
    @direction = MathHelpers.toRadians(180)
    @reloadTimer = new Timer(500)
    @image = Loader.getImage(Images.P2)
    @sprite = new Sprite(@image, 32)
    @sprite.setCycle(RightPlayer.STAND_CYCLE)
    @isStopped = false;

  _render: () ->
    @sprite.draw(@position.x, @position.y, @stage.getContext())

  _update: (step) =>
    @sprite.updateFrame(step)

    @reloadTimer.tick(step)

    position = @position

    stepFraction = (step / 100)

    friction = 20
    acceleration = 1.5

    if not @controller.isPressed(Keys.LEFT)
      @reloadTimer.end()

    # LEFT - FIRE, if our reload timer is over
    if @reloadTimer.hasEnded() and @controller.isPressed(Keys.LEFT)
      @reloadTimer.restart()
      @stage.addActor(new Bullet(position.x - 10, position.y, @direction, @))

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

    newPosition = new Circle(new Vector(position.x, position.y + @vely), @radius)
    if @stage.isCircleInBounds(newPosition)
      @setPosition(position.x, position.y + @vely)

    if @velx == 0 and @vely == 0 and not @isStopped
      @isStopped = true
      @sprite.setCycle(RightPlayer.STAND_CYCLE)
    else if @velx != 0 or @vely != 0 and @isStopped
      @isStopped = false
      @sprite.setCycle(RightPlayer.RUN_CYCLE, 200)

    @updateBody()