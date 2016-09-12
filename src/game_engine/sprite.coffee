class Sprite
  constructor: (@image, @spriteSize) ->
    @frame = 0
    @timer = undefined

  draw: (x, y, ctx, opacity) ->
    cycle = @cycle[@frame]

    dx = cycle.col * @spriteSize
    dy = cycle.row * @spriteSize

    ctx.save()
    ctx.translate(x, y)
    ctx.globalAlpha = opacity
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
