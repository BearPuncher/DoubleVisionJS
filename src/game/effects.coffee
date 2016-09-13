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

  generateNoise: (ctx, w, h) ->
    imageData = ctx.createImageData(w, h)

    i = 0
    while i < imageData.data.length
    # shade = 255 / Math.ceil(Math.random() * 4)
      color = (Math.random() * 120)|0
      imageData.data[i++] = 0
      imageData.data[i++] = 0
      imageData.data[i++] = 0
      imageData.data[i++] = color

    return imageData

