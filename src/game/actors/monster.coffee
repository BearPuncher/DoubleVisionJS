class Monster extends CircleActor
  @CREEP_LEFT_CYCLE: [{col: 0, row: 0}, {col: 1, row: 0}, {col: 2, row: 0},
    {col: 3, row: 0}, {col: 2, row: 0}, {col: 1, row: 0}]

  @CREEP_RIGHT_CYCLE: [{col: 0, row: 1}, {col: 1, row: 1}, {col: 2, row: 1},
      {col: 3, row: 1}, {col: 2, row: 1}, {col: 1, row: 1}]

  constructor: (x, y, direction = 0, @left) ->
    super(x, y, direction, 16)
    @speed = Math.round(Math.random() * 2) + 2.5
    @image = Loader.getImage(Images.MONSTER)
    @sprite = new Sprite(@image, 32)
    @opacity = 0

  _init: () ->
    if @left
      @sprite.setCycle(Monster.CREEP_LEFT_CYCLE, 400)
    else
      @sprite.setCycle(Monster.CREEP_RIGHT_CYCLE, 400)

    @opacity = 0

  _render: () ->
    ctx = @stage.getContext()
    ctx.save()
    @sprite.draw(@position.x - @radius, @position.y - @radius, ctx, @opacity)
    ctx.restore()

  _update: (step) =>
    if @opacity > 1
      @opacity = 1
    else
      @opacity += step / 1000

    @sprite.updateFrame(step)

    stepFraction = (step / 100)
    adjustedSpeed = @speed * stepFraction

    moveVector = new Vector(adjustedSpeed, 0)
    moveVector.rotate(@direction)
    @position.add(moveVector)

    @updateBody()
