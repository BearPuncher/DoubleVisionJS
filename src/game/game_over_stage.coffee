class GameOverStage extends Stage
  constructor: (width, height, ctx) ->
    super(width, height, ctx)
    @controller = Controller.get()

  _init: () =>
    @gameOverText = "GAME OVER"
    @retryText = "Hit ENTER restart reality."
    @background = @getNoise()

  _update: (step) =>
    if @controller.isPressed(Keys.ENTER)
      @state = STATE.finished

  _render: () ->
    @ctx.save()

    @background = @getNoise()
    @ctx.putImageData(@background, 0, 0)

    EFFECTS.fillTextShadow(@gameOverText, '72px Georgia', @ctx, 80, 120)
    EFFECTS.fillTextShadow(@retryText, '42px Georgia', @ctx, 40, 200)

    @ctx.restore()

  getNoise: () ->
    imageData = @ctx.createImageData(@width, @height)

    i = 0
    while i < imageData.data.length
      # shade = 255 / Math.ceil(Math.random() * 4)
      color = (Math.random() * 120)|0
      imageData.data[i++] = 0
      imageData.data[i++] = 0
      imageData.data[i++] = 0
      imageData.data[i++] = color

    return imageData

