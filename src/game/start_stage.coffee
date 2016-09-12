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
    @ctx.fillText('Red Guard', beginW, beginH)

    @ctx.fillStyle = 'white'
    @ctx.fillText('W', beginW, beginH + heightInc)
    @ctx.fillText('S', beginW, beginH + heightInc * 2)
    @ctx.fillText('D', beginW, beginH + heightInc * 3)

    @ctx.fillText('CONTROLS', middle, beginH - heightInc)
    @ctx.fillText('- Move Up -', middle, beginH + heightInc)
    @ctx.fillText('- Move Down - ', middle, beginH + heightInc * 2)
    @ctx.fillText('- Fire -', middle, beginH + heightInc * 3)

    @ctx.fillStyle = 'cyan'
    @ctx.fillText('Blue Guard', endWidth, beginH)

    @ctx.fillStyle = 'white'
    @ctx.fillText('UP', endWidth, beginH + heightInc)
    @ctx.fillText('DOWN', endWidth, beginH + heightInc * 2)
    @ctx.fillText('LEFT', endWidth, beginH + heightInc * 3)

    Effects.anaglyph(
      @title, '72px Georgia', @ctx, @width / 2, @height / 4, 5)
    Effects.anaglyph(
      @entryText, '36px Georgia', @ctx,  @width / 2, @height / 2 - heightInc, 3)

    @ctx.restore()


