class PreloaderStage extends Stage
  constructor: (width, height, ctx) ->
    super(width, height, ctx)
    @progress = Loader.getProgress()

  drawLoaderProgress: () ->
    minX = 20
    maxX = @width - (minX * 2)
    barHeight = 50

    fill = maxX * @progress
    @ctx.strokeRect(minX, @height/2 - barHeight / 2, maxX, barHeight)
    @ctx.fillRect(minX, @height/2  - barHeight / 2, fill, barHeight)

  _init: () ->

  _update: (step) =>
    @progress = Loader.getProgress()
    if Loader.doneLoading()
      @state = STATE.finished
      return

  _render: () ->
    @ctx.save()
    @drawLoaderProgress()
    @ctx.restore()
