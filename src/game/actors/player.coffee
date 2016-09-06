# The player actor
class Player extends CircleActor
  constructor: (x, y)->
    super(x, y, 0, 16)
    @controller = Controller.get()
    @velx = 0
    @vely = 0
    @maxSpeed = 4
    @score = 0

  addScore: (n) =>
    @score += n

  _render: () ->
    @drawDebug()
