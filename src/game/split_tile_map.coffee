class SplitTileMap extends TileMap
  constructor: (cols, rows, tileSize, tiles, ctx) ->
    super(cols, rows, tileSize, tiles, ctx)

  _render: () ->
    image = Loader.getImage(Images.TILES)

    for c in [0..@cols]
      for r in [0..@rows]
        tile = @getTile(c, r)
        x = c * @tileSize
        y = r * @tileSize

        xOffset = 0
        yOffset = 0

        if tile == 0
          xOffset = 0
          yOffset = 0
        else if tile = 1
          xOffset = 1
          yOffset = 0
        else if tile = 2
          xOffset = 0
          yOffset = 1
        else if tile = 3
          xOffset = 1
          yOffset = 1

        @ctx.save()
        @ctx.drawImage(image,
          xOffset * @tileSize,
          yOffset * @tileSize,
          @tileSize,
          @tileSize,
          x,
          y,
          @tileSize,
          @tileSize)
        @ctx.restore()
