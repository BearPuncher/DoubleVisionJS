Mode = {
  MIRROR: 0
  FLIPPED: 1
  VARIANCE:2
}

# Actor that spawns monsters
class MonsterSpawner extends Actor
  constructor: (x, y) ->
    super(x, y)
    @spawnTimeout = 2000
    @spawnTime = 0
    @modeTimeout = 10000
    @modeTime = 0
    @mode = Mode.MIRROR

  # Update timers
  _update: (step) =>
    @spawnTime += step
    @modeTime += step
    if @spawnTime >= @spawnTimeout
      @spawnTime -= @spawnTimeout
      @spawnMonsters()
    if @modeTime >= @modeTimeout
      @modeTime -= @modeTimeout
      @updateMode()

  # Spawn monsters according to @mode settings
  spawnMonsters: () ->
    min = 15
    max = @stage.height - (min * 2)

    spawnA = 0
    spawnB = 0

    switch @mode
      when Mode.MIRROR
        spawnA = spawnB = Math.floor(Math.random() * max) + min
      when Mode.FLIPPED
        spawnA = Math.floor(Math.random() * max) + min
        spawnB = @stage.height - spawnA
      when Mode.VARIANCE
        spawnA = Math.floor(Math.random() * max) + min
        spawnB = Math.floor(Math.random() * max) + min
      else
        spawnA = spawnB = Math.floor(Math.random() * max) + min

    @stage.addActor(new Monster(@stage.width/2 + 15, spawnA, 0, '#FF0000'))
    @stage.addActor(new Monster(@stage.width/2 - 15,
      spawnB, MathHelpers.toRadians(180), '#0000FF'))

  # Choose a new mode
  # From all modes, pick a new one and assign @node
  updateMode: () =>
    modes = [Mode.MIRROR, Mode.FLIPPED, Mode.VARIANCE]
    modes.splice(@mode, 1)
    index = Math.floor(Math.random() * modes.length)
    @mode = modes[index]