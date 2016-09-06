class SplitStage extends Stage
  @wallWidth: 10
  @gutterHeight: 40

  constructor: (width, height, ctx) ->
    super(width, height - SplitStage.gutterHeight, ctx)

  _init: () =>
    @wall = new Box(new Vector(@width/2 - SplitStage.wallWidth/2, 0),
      SplitStage.wallWidth, @height).toPolygon()

    @leftPlayer = new LeftPlayer(30, @height/2)
    @addActor(@leftPlayer)

    @rightPlayer = new RightPlayer(610, @height/2)
    @addActor(@rightPlayer)

    @monsterSpawner = new MonsterSpawner(@width/2, @height/2)
    @addActor(@monsterSpawner)

  _render: () ->
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
    if @wall?
      ctx = @getContext()
      ctx.fillStyle = '#000000'
      ctx.fillRect(@wall.pos.x, @wall.pos.y,
        SplitStage.wallWidth, @height)

  drawGutter: () ->
    ctx = @getContext()
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, @height, @width, @height + SplitStage.gutterHeight)

    heightAdjustment = 26
    widthAdjustment = 10

    ctx.fillStyle = 'White'
    ctx.font = 'normal 12pt Arial'
    ctx.fillText('Anomalies resolved: ' + @leftPlayer.score,
      widthAdjustment, @height + heightAdjustment)

    ctx.save()
    ctx.scale(-1, 1)
    ctx.fillStyle = 'White'
    ctx.font = 'normal 12pt Arial'
    ctx.fillText('Anomalies resolved: ' + @rightPlayer.score,
     -@width + widthAdjustment, @height + heightAdjustment)
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