Effects =
  anaglyph: (string, font, ctx, x, y, shiftx = 3) ->
    ctx.save()
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.translate(x, y)
    ctx.globalAlpha = 0.8
    ctx.font = font
    ctx.fillStyle = 'red'
    ctx.fillText(string, -shiftx, 0)

    ctx.fillStyle = 'cyan'
    ctx.fillText(string, shiftx, 0)

    ctx.globalAlpha = 1.0
    ctx.fillStyle = 'black'
    ctx.fillText(string, 0, 0)
    ctx.restore()


