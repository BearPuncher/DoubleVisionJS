class StoryStage extends Stage
  constructor: (width, height, ctx) ->
    super(width, height, ctx)
    @showFooterTimer = new Timer(1000)
    @opacity = 0

  _init: () =>
    @title = "Double Vision"
    @entryText = "Hit ENTER to begin"

  _update: (step) =>
    @showFooterTimer.tick(step)
    if @showFooterTimer.hasEnded()
      if @opacity >= 1
        @opacity = 1
      else
        @opacity += 0.1

  _render: () ->
    @ctx.save()

    @ctx.fillStyle = 'black'
    @ctx.fillRect(0, 0, @width, @height)

    @ctx.textBaseline = 'middle'
    @ctx.textAlign = 'center'
    @ctx.fillStyle = 'white'
    @ctx.font = '18px Georgia'
    @text = "They successfully opened a portal to a parallel dimension."
    @text1 = "What they didn't anticipate were the anomalies..."
    @text2 = "Once it was opened we couldn't close it. We're both doomed."
    @footer = "Destroy as many intruders as you can before we're overwhelmed"
    @footerFinal = "Press Enter to Fight"

    @ctx.fillText(@text, @width/2, 60)
    @ctx.fillText(@text1, @width/2, 120)
    @ctx.fillText(@text2, @width/2, 180)

    if @showFooterTimer.hasEnded()
      @ctx.globalAlpha = @opacity
      @ctx.fillText(@footer, @width/2, 250)
      @ctx.fillStyle = 'red'
      @ctx.fillText(@footerFinal, @width/2, 300)

      if @controller.isPressed(Keys.ENTER)
        @state = STATE.finished

    @ctx.restore()

  drawText: (string, x, y) ->
    @ctx.fillText(string, x, y)




