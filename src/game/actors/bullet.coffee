class Bullet extends CircleActor
  @LEFT_CYCLE: [{col: 1, row: 0}]
  @RIGHT_CYCLE: [{col: 0, row: 0}]

  constructor: (x, y, direction = 0, @firedBy, @left = false) ->
    super(x, y, direction, 4)
    @bulletSpeed = 120
    @opacity = 0
    @image = Loader.getImage(Images.BULLET)

  _init: () ->
    @opacity = 0
    @image = Loader.getImage(Images.BULLET)
    @sprite = new Sprite(@image, 8)
    if @left
      @sprite.setCycle(Bullet.LEFT_CYCLE)
    else
      @sprite.setCycle(Bullet.RIGHT_CYCLE)

  _render: () ->
    @sprite.draw(@position.x - @radius, @position.y - @radius, @stage.getContext())

  _update: (step) ->

    stepFraction = (step / 100)
    speed = @bulletSpeed * stepFraction

    moveVector = new Vector(speed, 0)
    moveVector.rotate(@direction)
    @position.add(moveVector)

    @destroy = true unless @stage.isCircleInBounds(@body)

    @updateBody()