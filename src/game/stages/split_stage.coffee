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
  @gutterHeight: SplitStage.tileWidth

  constructor: (width, height, ctx) ->
    super(width, height - SplitStage.gutterHeight, ctx)

  _init: () =>
    cols = @width / SplitStage.tileWidth
    rows = @height / SplitStage.tileWidth

    @cross = Loader.getImage(Images.CROSS)
    console.log(@cross)
    @sprite = new Sprite(@cross, 32)
    @sprite.setCycle([col: 0, row: 0])

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
    @drawWall()
    @drawGutter()
    @drawCrosses()

  _update: (step) =>
    # If out of lives, finish game
    if @lives <= 0
      @state = STATE.finished
      return

    @testBulletCollisions()

    # Copy to temp array, only keep actors we don't want to destroy
    newActors = []
    for actor in @actors
      newActors.push actor unless actor.shouldDestroy()

    @actors = newActors

  drawWall: () ->
    ctx = @getContext()
    ctx.save()

    width = @width / 2 - SplitStage.tileWidth / 2
    rows = @height / SplitStage.tileWidth - 1

    # TOP
    ctx.drawImage(@portal,
      0,
      0,
      SplitStage.tileWidth,
      SplitStage.tileWidth,
      width,
      0,
      SplitStage.tileWidth,
      SplitStage.tileWidth,
    )

    # Bottom
    ctx.drawImage(@portal,
      0,
      SplitStage.tileWidth * 2,
      SplitStage.tileWidth,
      SplitStage.tileWidth,
      width,
      rows * SplitStage.tileWidth,
      SplitStage.tileWidth,
      SplitStage.tileWidth,
    )

    row = rows - 1
    console.log(row)

    for i in [1..row]
      ctx.drawImage(@portal,
        0,
        SplitStage.tileWidth,
        SplitStage.tileWidth,
        SplitStage.tileWidth,
        width,
        SplitStage.tileWidth * i,
        SplitStage.tileWidth,
        SplitStage.tileWidth,
      )


    ctx.restore()

  drawCrosses: () ->
    x = @width / 2
    y = @height
    tileSize = SplitStage.tileWidth

    if @lives >= 4
      @sprite.draw(x - tileSize * 2, y, @getContext())
    if @lives >= 3
      @sprite.draw(x + tileSize, y, @getContext())
    if @lives >= 2
      @sprite.draw(x, y, @getContext())
    if @lives >= 1
      @sprite.draw(x - tileSize, y, @getContext())

  drawGutter: () ->
    ctx = @getContext()
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, @height, @width, @height + SplitStage.gutterHeight)

    xPadding = 11
    yPadding = 22

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