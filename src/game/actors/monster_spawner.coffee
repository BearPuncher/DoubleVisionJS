Mode = {
  MIRROR: 0
  FLIPPED: 1
  VARIANCE:2
}

# Actor that spawns monsters
class MonsterSpawner extends Actor
  constructor: (x, y) ->
    super(x, y)
    @mode = Mode.MIRROR
    @spawnTime = 3000

    @spawnTimer = new Timer(@spawnTime)
    @modeTimer = new Timer(6000)

# Update timers
  _update: (step) =>
    @spawnTimer.tick(step)
    @modeTimer.tick(step)

    if @spawnTimer.hasEnded()
      @spawnTimer.restart()
      @spawnMonsters()

    if @modeTimer.hasEnded()
      if @spawnTime <= 600
        @spawnTime = 600
      else if @spawnTime <= 2000
        @spawnTime -= 100
      else
        @spawnTime -= 200

      console.log(@spawnTime)
      @spawnTimer.timeout = @spawnTime
      @modeTimer.restart()
      @updateMode()

  # Spawn monsters according to @mode settings
  spawnMonsters: () ->
    min = 20
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

    @stage.addActor(new Monster(@stage.width/2, spawnA, 0, '#FF0000'))
    @stage.addActor(new Monster(@stage.width/2, spawnB,
      MathHelpers.toRadians(180), '#0000FF'))

  # Choose a new mode
  # From all modes, pick a new one and assign @node
  updateMode: () =>
    modes = [Mode.MIRROR, Mode.FLIPPED, Mode.VARIANCE]
    modes.splice(@mode, 1)
    index = Math.floor(Math.random() * modes.length)
    @mode = modes[index]