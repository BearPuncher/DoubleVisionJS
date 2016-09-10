EFFECTS =
  stereoscopic: (string, font, ctx, x, y) ->
    ctx.save()
    ctx.translate(x, y)
    ctx.globalAlpha = 0.8
    ctx.font = font
    ctx.fillStyle = 'red'
    ctx.fillText(string, -3, 0)

    ctx.fillStyle = 'blue'
    ctx.fillText(string, 3, 0)

    ctx.globalAlpha = 1.0
    ctx.fillStyle = 'black'
    ctx.fillText(string, 0, 0)
    ctx.restore()


  fillTextShadow: (string, font, ctx, x, y) ->
    ctx.save()
    ctx.translate(x, y)
    ctx.font = font
    ctx.fillStyle = 'blue'
    ctx.fillText(string, 3, 2)

    ctx.fillStyle = 'red'
    ctx.fillText(string, 0, 0)
    ctx.restore()

