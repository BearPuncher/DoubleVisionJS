class SplitStage extends Stage
  @wallWidth: 10

  constructor: (width, height, ctx) ->
    super(width, height, ctx)
    @wall = new Box(new Vector(width/2 - SplitStage.wallWidth/2, 0),
      SplitStage.wallWidth, height).toPolygon()

  _render: () ->
    ctx = @getContext()
    ctx.fillStyle = '#000000'
    ctx.fillRect(@wall.pos.x, @wall.pos.y, SplitStage.wallWidth, @height)

  _update: (step) =>
    # Copy to temp array, only keep actors we don't want to destroy
    newActors = []
    for actor in @actors
      if actor instanceof Bullet
        collide = SAT.testCirclePolygon(actor.body, @wall)
        if collide then actor.destroy = true
        # actor.destroy = collide
      newActors.push actor unless actor.shouldDestroy()

    @actors = newActors

