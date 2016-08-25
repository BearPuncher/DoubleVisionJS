# The player actor
class Player extends CircleActor
  constructor: (x, y)->
    super(x, y, 0, 20)
    @velx = 0
    @vely = 0
    @maxspeed = 3
    @controller = Controller.get()

  _render: () ->
    @drawDebug()

  _update: (step) =>
    x = @position.getX()
    y = @position.getY()

    stepdt = (step / 100)

    slowSpeed = 0.5
    stepSpeed = 2

    # Left
    if @controller.isPressed(Keys.LEFT) or @controller.isPressed(Keys.A)
      if @velx > -@maxspeed
        @velx -= stepSpeed * stepdt
        @velx = -@maxspeed if @velx < -@maxspeed
    else if @velx < 0
      @velx += slowSpeed * stepdt
      @velx = 0 if @velx > 0

    # Right
    if @controller.isPressed(Keys.RIGHT) or @controller.isPressed(Keys.D)
      if @velx < @maxspeed
        @velx += stepSpeed * stepdt
        @velx = @maxspeed if @velx > @maxspeed
    else if @velx > 0
      @velx -= slowSpeed * stepdt
      @velx = 0 if @velx < 0

    # Up
    if @controller.isPressed(Keys.UP) or @controller.isPressed(Keys.W)
      if @vely > -@maxspeed
        @vely -= stepSpeed * stepdt
        @vely = -@maxspeed if @vely < -@maxspeed
    else if @vely < 0
      @vely += slowSpeed * stepdt
      @vely = 0 if @vely > 0

    # Down
    if @controller.isPressed(Keys.DOWN) or @controller.isPressed(Keys.S)
      if @vely < @maxspeed
        @vely += stepSpeed * stepdt
        @vely = @maxspeed if @vely > @maxspeed
    else if @vely > 0
      @vely -= slowSpeed * stepdt
      @vely = 0 if @vely < 0

    @setPosition(x + @velx, y + @vely)