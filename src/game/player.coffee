# The player actor
class Player extends CircleActor
  constructor: (x, y)->
    super(x, y, 0, 15)
    @controller = Controller.get()
    @velx = 0
    @vely = 0
    @maxspeed = 4

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
      if @velx > -@maxspeed
        @velx -= acceleration * stepFraction
        @velx = -@maxspeed if @velx < -@maxspeed
    else if @velx < 0
      @velx += friction * stepFraction
      @velx = 0 if @velx > 0

    # Right
    if @controller.isPressed(Keys.RIGHT) or @controller.isPressed(Keys.D)
      if @velx < @maxspeed
        @velx += acceleration * stepFraction
        @velx = @maxspeed if @velx > @maxspeed
    else if @velx > 0
      @velx -= friction * stepFraction
      @velx = 0 if @velx < 0

    # Up
    if @controller.isPressed(Keys.UP) or @controller.isPressed(Keys.W)
      if @vely > -@maxspeed
        @vely -= acceleration * stepFraction
        @vely = -@maxspeed if @vely < -@maxspeed
    else if @vely < 0
      @vely += friction * stepFraction
      @vely = 0 if @vely > 0

    # Down
    if @controller.isPressed(Keys.DOWN) or @controller.isPressed(Keys.S)
      if @vely < @maxspeed
        @vely += acceleration * stepFraction
        @vely = @maxspeed if @vely > @maxspeed
    else if @vely > 0
      @vely -= friction * stepFraction
      @vely = 0 if @vely < 0

    @setPosition(x + @velx, y + @vely)
    mouseLoc = Game.getMouseLocation()
    @lookAt(mouseLoc) if mouseLoc
    @updateBody()