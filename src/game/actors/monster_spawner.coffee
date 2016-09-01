Mode = {
  MIRROR: 0
  FLIPPED_MIRROR: 1
  VARIANCE:2
}


class MonsterSpawner extends Actor
  constructor: (x, y) ->
    super(x, y)
    @spawnSpeed = 2000
    @elapsedTime = 0
    @mode = Mode.MIRROR

  _update: (step) =>
    @elapsedTime += step
    if @elapsedTime >= @spawnSpeed
      @elapsedTime -= @spawnSpeed
      @spawnMonsters()

  spawnMonsters: () ->
    min = 15
    max = @stage.height - min * 2

    spawnA = 0
    spawnB = 0

    switch @mode
      when Mode.MIRROR
        spawnA = spawnB = Math.floor(Math.random() * max) + min
      when Mode.FLIPPED_MIRROR
        spawnA = Math.floor(Math.random() * max) + min
        spawnB = @stage.height - spawnA
      when Mode.VARIANCE
        spawnA = Math.floor(Math.random() * max) + min
        spawnB = Math.floor(Math.random() * max) + min
      else
        spawnA = spawnB = Math.floor(Math.random() * max) + min

    @stage.addActor(new Monster(@stage.width/2, spawnA, 0, '#FF0000'))
    @stage.addActor(new Monster(@stage.width/2,
      spawnB, MathHelpers.toRadians(180), '#0000FF'))