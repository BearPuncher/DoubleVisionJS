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

    EFFECTS.fillText3D(@gameOverText, '72px Georgia', @ctx, 80, 120)
    EFFECTS.fillText3D(@retryText, '42px Georgia', @ctx, 40, 200)

    @ctx.restore()

  getNoise: () ->
    imageData = @ctx.createImageData(@width, @height)


    i = 0
    while i < imageData.data.length
      color = (Math.random() * 100)|0
      imageData.data[i++] = 0
      imageData.data[i++] = 0
      imageData.data[i++] = 0
      imageData.data[i++] = color


      ###
      for i in [0..imageData.data.length]
      imageData.data[i] = 255 * Math.random()|0
      ###

    #imageData.data[i] = (Math.random() < 0.5) ? '#000000' | '#FFFFFF'
    return imageData

