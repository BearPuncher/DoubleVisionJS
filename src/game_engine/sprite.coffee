class Sprite
  constructor: (@image, @spriteSize) ->
    @frame = 0
    @timer = undefined

  draw: (x, y, ctx, scale = 1) ->
    cycle = @cycle[@frame]

    dx = cycle.col * @spriteSize
    dy = cycle.row * @spriteSize

    x = Math.round(x)
    y = Math.round(y)

    ctx.save()
    ctx.translate(x - (@spriteSize / 2), y - (@spriteSize / 2))
    ctx.scale(scale, scale)
    ctx.drawImage(
      @image, dx, dy, @spriteSize, @spriteSize, 0, 0, @spriteSize, @spriteSize)
    ctx.restore()

  setCycle: (@cycle, @interval = 0) =>
    @cycleLength = @cycle.length
    @frame = 0
    @timer = new Timer(@interval)

  updateFrame: (step) =>
    @timer.tick(step)

    if @timer.hasEnded()
      @frame = (@frame + 1) % @cycleLength
      @timer.restart()
