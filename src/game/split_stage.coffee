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

RANDOM_TILES = []

for i in [0..179]
  RANDOM_TILES.push(Math.round(Math.random() * 3))

class SplitStage extends Stage
  @tileWidth: 32
  @wallWidth: SplitStage.tileWidth
  @gutterHeight: SplitStage.tileWidth
  @portal: 'portal'
  @portaldata:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAEgCAYAAADVDXFAAAAB
  e0lEQVR4Xu3dQRLBMBgG0DqCK9i5kOPIpMdxITtXcASmpR2ihChq5lkhzZ/PkzTdZVYVvm
  KMh8uuIYRZSam2U1qspFBJnya0AAQI3Agsw7pdUfuSdfWgz/zcto11f9XgMpxsgN2LIovk
  +rcFBJicQBoo/c8/PgcEIDCqQHPT2lSHq2e8dC9IBywN0N0gV9Xpaax/kBSAAAECBAgQIE
  CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ
  IECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBA
  gQIECAAAECBAgQIECAAAECBAgQIECAAIGfCsQY+zPPl2HdHk3+qXPPt7Hujj6vQginw88F
  IPCXAv1UvvNmkXw/P38ebRUI8HWB3IC59rfnQG6AXPvTAXKFxmwf3AvGHCBXSwAC0xHIzd
  ah9ssdtGlvfk1JnSMv4vF75/xKqwAAAABJRU5ErkJggg=="

  constructor: (width, height, ctx) ->
    super(width, height - SplitStage.gutterHeight, ctx)
    Loader.loadImage(SplitStage.portal, SplitStage.portaldata)

  _init: () =>
    cols = @width / SplitStage.tileWidth
    rows = @height / SplitStage.tileWidth
    @tilemap = new SplitTileMap(
      cols, rows, SplitStage.tileWidth, RANDOM_TILES, @ctx)

    @wall = new Box(new Vector(@width/2 - SplitStage.wallWidth/2, 0),
      SplitStage.wallWidth, @height).toPolygon()

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

  _update: (step) =>
    @testBulletCollisions()

    # Copy to temp array, only keep actors we don't want to destroy
    newActors = []
    for actor in @actors
      newActors.push actor unless actor.shouldDestroy()

    @actors = newActors

  drawWall: () ->
    portal = Loader.getImage(SplitStage.portal)

    unless portal
      return

    ctx = @getContext()
    ctx.save()
    ctx.drawImage(Loader.getImage(SplitStage.portal),
      @wall.pos.x,
      @wall.pos.y,
      SplitStage.wallWidth,
      @height)
    ctx.restore()

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

  testBulletCollisions: () ->
    bullets = @actors.filter(@isInstanceOfBullet)
    for bullet in bullets
      collide = SAT.testCirclePolygon(bullet.body, @wall)
      if collide then bullet.destroy = true

    monsters = @actors.filter(@isInstanceOfMonster)
    for monster in monsters
      for bullet in bullets
        collide = SAT.testCircleCircle(bullet.body, monster.body)
        if collide
          if bullet.firedBy instanceof Player
            bullet.firedBy.addScore(1)
          bullet.destroy = true
          monster.destroy = true

  isInstanceOfBullet: (clazz) ->
    return clazz instanceof Bullet

  isInstanceOfMonster: (clazz) ->
    return clazz instanceof Monster