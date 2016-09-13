###
EMPTY = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]
###

RANDOM_TILES = []

for i in [0..179]
  RANDOM_TILES.push(Math.round(Math.random() * 3))

class SplitStage extends Stage
  @tileWidth: 32
  @wallWidth: SplitStage.tileWidth + 8
  @gutterHeight: SplitStage.tileWidth + 8

  constructor: (width, height, ctx) ->
    super(width, height - SplitStage.gutterHeight, ctx)

  _init: () =>
    cols = @width / SplitStage.tileWidth
    rows = @height / SplitStage.tileWidth

    @tilemap = new SplitTileMap(
      cols, rows, SplitStage.tileWidth, RANDOM_TILES, @ctx)

    @wall = new Box(new Vector(@width/2 - SplitStage.wallWidth/2, 0),
      SplitStage.wallWidth, @height)

    @portal = Loader.getImage(Images.PORTAL)

    @lives = 4

    @leftPlayer = new LeftPlayer(30, @height/2)
    @addActor(@leftPlayer)

    @rightPlayer = new RightPlayer(610, @height/2)
    @addActor(@rightPlayer)

    @monsterSpawner = new MonsterSpawner(@width/2, @height/2)
    @addActor(@monsterSpawner)

  _render: () ->
    @tilemap.render()
    @drawColorOverlay()
    @drawWall()
    @drawGutter()
    @drawCrosses()

  _update: (step) =>
    # If out of lives, finish game
    if @lives <= 0
      @state = STATE.finished
      Score.setScore(@leftPlayer.score + @rightPlayer.score)
      return

    @testBulletCollisions()

    # Copy to temp array, only keep actors we don't want to destroy
    newActors = []
    for actor in @actors
      newActors.push actor unless actor.shouldDestroy()

    @actors = newActors

  drawColorOverlay: () ->
    ctx = @getContext()
    ctx.save()
    ctx.globalAlpha = 0.1
    ctx.fillStyle = 'cyan'
    ctx.fillRect(0, 0, @width / 2, @height)

    ctx.fillStyle = 'red'
    ctx.fillRect(@width / 2, 0, @width / 2, @height)

    ctx.restore()

  drawWall: () ->
    ctx = @getContext()
    ctx.save()

    size = SplitStage.tileWidth

    width = @width / 2 - size / 2
    rows = @height / size - 1

    # TOP
    ctx.drawImage(@portal,
      0,
      0,
      size,
      size,
      width,
      0,
      size,
      size,
    )

    # Bottom
    ctx.drawImage(@portal,
      0,
      size * 2,
      size,
      size,
      width,
      rows * size,
      size,
      size,
    )

    # Draw rows inbetween
    row = rows - 1
    for i in [1..row]
      ctx.drawImage(@portal,
        0,
        size,
        size,
        size,
        width,
        size * i,
        size,
        size,
      )
    ctx.restore()

  drawCrosses: () ->
    x = @width / 2
    y = @height + 8
    tileSize = SplitStage.tileWidth

    if @lives >= 4
      @drawCross(x - tileSize * 2, y)
    if @lives >= 3
      @drawCross(x + tileSize, y)
    if @lives >= 2
      @drawCross(x, y)
    if @lives >= 1
      @drawCross(x - tileSize, y)

  drawCross: (x, y) ->
    ctx = @getContext()
    size = SplitStage.tileWidth - 6
    cross = 8
    dx = x + size / 2
    dy = y + size / 2
    ctx.fillStyle = 'red'
    ctx.fillRect(dx - cross / 2, y, cross, size)
    ctx.fillRect(x, dy - cross / 2, size, cross)

  drawGutter: () ->
    ctx = @getContext()
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, @height, @width, @height + SplitStage.gutterHeight)

    xPadding = 11
    yPadding = 27

    ctx.fillStyle = 'White'
    ctx.font = 'normal 12pt Arial'
    ctx.fillText('Anomalies resolved: ' + @leftPlayer.score,
      xPadding, @height + yPadding)

    ctx.save()
    ctx.scale(-1, 1)
    ctx.fillStyle = 'White'
    ctx.font = 'normal 12pt Arial'
    ctx.fillText('Anomalies resolved: ' + @rightPlayer.score,
     -@width + xPadding, @height + yPadding)
    ctx.restore()

  testBulletCollisions: () =>
    bullets = @actors.filter(@isInstanceOfBullet)
    for bullet in bullets
      collide = MathHelpers.doesCircleRectIntersect(bullet.body, @wall)
      if collide then bullet.destroy = true

    monsters = @actors.filter(@isInstanceOfMonster)
    for monster in monsters
      for bullet in bullets
        if MathHelpers.doesCircleCircleIntersect(bullet.body, monster.body)
          if bullet.firedBy instanceof Player
            bullet.firedBy.addScore(1)
          bullet.destroy = true
          monster.destroy = true

      # If collide with player, take life and kill monster
      collideLeftPlayer = MathHelpers.doesCircleCircleIntersect(@leftPlayer.body, monster.body)
      collideRightPlayer = MathHelpers.doesCircleCircleIntersect(@rightPlayer.body, monster.body)

      if collideLeftPlayer or collideRightPlayer
        @lives--
        monster.destroy = true

      if not @isCircleInBounds(monster.body)
        @lives--
        monster.destroy = true

  isInstanceOfBullet: (clazz) ->
    return clazz instanceof Bullet

  isInstanceOfMonster: (clazz) ->
    return clazz instanceof Monster