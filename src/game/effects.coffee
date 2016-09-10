EFFECTS =
  fillText3D: (string, font, ctx, x, y) ->
    ctx.save()
    ctx.translate(x, y)
    ctx.font = font
    ctx.fillStyle = 'red'
    ctx.fillText(string, -3, 2)

    ctx.fillStyle = 'blue'
    ctx.fillText(string, 3, 2)

    ctx.fillStyle = '#000000'
    ctx.fillText(string, 0, 0)
    ctx.restore()