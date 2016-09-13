class GameOverStage extends Stage
  constructor: (width, height, ctx) ->
    super(width, height, ctx)

  _init: () =>
    @gameOverText = "GAME OVER"
    @retryText = "Hit ENTER play again"
    @background = @getNoise()

  _update: (step) =>
    if @controller.isPressed(Keys.ENTER)
      @state = STATE.finished

  _render: () ->
    @ctx.save()

    @background = @getNoise()
    @ctx.putImageData(@background, 0, 0)

    scoreHighscore = 'High Score: ' + Score.highScore
    scoreCurret = 'Last Score: ' + Score.lastScore

    Effects.anaglyph(
      @gameOverText, '54px Georgia',@ctx, @width / 2, @height / 5, 5)
    Effects.anaglyph(
      scoreHighscore, '32px Georgia',@ctx, @width / 2, @height * 2 / 5, 5)
    Effects.anaglyph(
      scoreCurret, '32px Georgia',@ctx, @width / 2, @height * 3 / 5, 5)
    Effects.anaglyph(
      @retryText, '32px Georgia', @ctx, @width / 2, @height * 4 / 5, 3)

    @ctx.restore()

  getNoise: () ->
    return Effects.generateNoise(@ctx, @width, @height)

