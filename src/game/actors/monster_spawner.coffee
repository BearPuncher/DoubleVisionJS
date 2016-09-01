class MonsterSpawner extends Actor
  constructor: (x, y) ->
    super(x, y)
    @spawnSpeed = 2000
    @elapsedTime = 0

  _update: (step) =>
    @elapsedTime += step
    if @elapsedTime >= @spawnSpeed
      @elapsedTime -= @spawnSpeed
      @stage.addActor(new Monster(50, 20))
