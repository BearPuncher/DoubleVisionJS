class StartStage extends Stage
  constructor: (width, height, ctx) ->
    super(width, height, ctx)
    @controller = Controller.get()

  _init: () =>
    @title = "Double Vision"
    @entryText = "Hit ENTER to begin"

  _update: (step) =>
    if @controller.isPressed(Keys.ENTER)
      @state = STATE.finished

  _render: () ->
    @ctx.save()

    heightInc = 32
    beginH = (@height * 2) / 3

    beginW = @width / 4
    middle = @width / 2
    endWidth = (@width * 3) / 4

    @ctx.textBaseline = 'middle'
    @ctx.textAlign = 'center'
    @ctx.font = '24px Georgia'

    @ctx.fillStyle = 'black'
    @ctx.fillRect(0, @height / 2, @width, @height / 2)

    @ctx.fillStyle = 'red'
    @drawText('Red Guard', beginW, beginH)

    @ctx.fillStyle = 'white'
    @drawText('W', beginW, beginH + heightInc)
    @drawText('S', beginW, beginH + heightInc * 2)
    @drawText('D', beginW, beginH + heightInc * 3)

    @drawText('CONTROLS', middle, beginH - heightInc)
    @drawText('- Move Up -', middle, beginH + heightInc)
    @drawText('- Move Down - ', middle, beginH + heightInc * 2)
    @drawText('- Fire -', middle, beginH + heightInc * 3)

    @ctx.fillStyle = 'cyan'
    @drawText('Blue Guard', endWidth, beginH)

    @ctx.fillStyle = 'white'
    @drawText('UP', endWidth, beginH + heightInc)
    @drawText('DOWN', endWidth, beginH + heightInc * 2)
    @drawText('LEFT', endWidth, beginH + heightInc * 3)

    Effects.anaglyph(
      @title, '72px Georgia', @ctx, @width / 2, @height / 5, 5)
    Effects.anaglyph(
      @entryText, '36px Georgia', @ctx,  @width / 2, @height * 2 / 5, 3)

    @ctx.restore()

  drawText: (string, x, y) ->
    @ctx.fillText(string, x, y)




