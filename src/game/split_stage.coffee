class SplitStage extends Stage
  @wallWidth: 10

  constructor: (width, height, ctx) ->
    super(width, height, ctx)
    @wall = new Box(new Vector(width/2 - SplitStage.wallWidth/2, 0),
      SplitStage.wallWidth, height).toPolygon()
    @monsterSpawner = new MonsterSpawner(width/2, height/2)
    @addActor(@monsterSpawner)

  _render: () ->
    ctx = @getContext()
    ctx.fillStyle = '#000000'
    ctx.fillRect(@wall.pos.x, @wall.pos.y, SplitStage.wallWidth, @height)

  _update: (step) =>
    @testBulletCollisions()

    # Copy to temp array, only keep actors we don't want to destroy
    newActors = []
    for actor in @actors
      newActors.push actor unless actor.shouldDestroy()

    @actors = newActors

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
          bullet.destroy = true
          monster.destroy = true

  isInstanceOfBullet: (clazz) ->
    return clazz instanceof Bullet

  isInstanceOfMonster: (clazz) ->
    return clazz instanceof Monster