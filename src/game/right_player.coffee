class RightPlayer extends Player
  constructor: (x, y) ->
    super(x, y)

  _render: () ->
    @drawDebug('#0000FF')

  _update: (step) =>
    x = @position.x
    y = @position.y

    stepFraction = (step / 100)

    friction = 1.5
    acceleration = 2

    # Up
    if @controller.isPressed(Keys.UP)
      if @vely > -@maxspeed
        @vely -= acceleration * stepFraction
        @vely = -@maxspeed if @vely < -@maxspeed
    else if @vely < 0
      @vely += friction * stepFraction
      @vely = 0 if @vely > 0

    # Down
    if @controller.isPressed(Keys.DOWN)
      if @vely < @maxspeed
        @vely += acceleration * stepFraction
        @vely = @maxspeed if @vely > @maxspeed
    else if @vely > 0
      @vely -= friction * stepFraction
      @vely = 0 if @vely < 0

    @setPosition(x, y + @vely)
    mouseLoc = Game.getMouseLocation()
    @lookAt(mouseLoc) if mouseLoc