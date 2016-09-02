# The player actor
class Player extends CircleActor
  constructor: (x, y)->
    super(x, y, 0, 15)
    @controller = Controller.get()
    @velx = 0
    @vely = 0
    @maxSpeed = 4
    @shootSpeed = 100
    @spawnTime = 0

  shoot: (step) ->
    @spawnTime += step
    if @spawnTime >= @shootSpeed
      @spawnTime -= @shootSpeed
      @stage.addActor(new Bullet(@position.x, @position.y, @direction))

  _render: () ->
    @drawDebug()

  _update: (step) =>
    x = @position.x
    y = @position.y

    stepFraction = (step / 100)

    friction = 1.5
    acceleration = 2

    # Left
    if @controller.isPressed(Keys.LEFT) or @controller.isPressed(Keys.A)
      if @velx > -@maxSpeed
        @velx -= acceleration * stepFraction
        @velx = -@maxSpeed if @velx < -@maxSpeed
    else if @velx < 0
      @velx += friction * stepFraction
      @velx = 0 if @velx > 0

    # Right
    if @controller.isPressed(Keys.RIGHT) or @controller.isPressed(Keys.D)
      if @velx < @maxSpeed
        @velx += acceleration * stepFraction
        @velx = @maxSpeed if @velx > @maxSpeed
    else if @velx > 0
      @velx -= friction * stepFraction
      @velx = 0 if @velx < 0

    # Up
    if @controller.isPressed(Keys.UP) or @controller.isPressed(Keys.W)
      if @vely > -@maxSpeed
        @vely -= acceleration * stepFraction
        @vely = -@maxSpeed if @vely < -@maxSpeed
    else if @vely < 0
      @vely += friction * stepFraction
      @vely = 0 if @vely > 0

    # Down
    if @controller.isPressed(Keys.DOWN) or @controller.isPressed(Keys.S)
      if @vely < @maxSpeed
        @vely += acceleration * stepFraction
        @vely = @maxSpeed if @vely > @maxSpeed
    else if @vely > 0
      @vely -= friction * stepFraction
      @vely = 0 if @vely < 0

    @setPosition(x + @velx, y + @vely)
    mouseLoc = Game.getMouseLocation()
    @lookAt(mouseLoc) if mouseLoc
    @updateBody()