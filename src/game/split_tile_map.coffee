

class SplitTileMap extends TileMap
  @tile: 'tile'
  @tiledata:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAB
2klEQVR4Xu1bWa6DMAykJ0Dc/4sTAifgKVUtWZS8JLaLsww/VaWaxhPPeIG81nU9p4GvVw
BgWRYRBNu2ve1atgcAiIDGKSClX6BuoHDzFBgaAJFyM6PmI2B4ACzSsEoDLHYgVkcE51L8
7hqAHHC7ByAVBdUAkFpobDfJAWk5XR0ApUBYOCAFz6QQop2VOsIjgO6VEj4eTdL/5et+Z4
EcwYn9hhZ858zV5upcjk3qHrSTUh8AQGk3qBWuWAiTfpToiBkFnuTdHQBSIXMBQMq1OzsL
B6TgmWSBGhwAAMqZpKoZQgRgKoyxOJ4LaFXY2x4iWFoKW3djTUeAtir0SqO871BRoCUAuN
N83ep2WAuCtz0AeFoEeb/vpQFfI7GSeYBVFrAYrFgAqBJB6QKus0CPDXCfBwwdAUSjfd+n
8zyTzwBjmUIagVVoAB9nD0kBAPB5RyenF4iNyoeiwB0IQwHwq7G6Sx3AVTiHAsgCEQS6os
BxHNM8z1P4pCt8/+/qCgBJW2wGgOTPW7AJBVbqHYRu5wE5zodNRBZ4eiBiNU+wKqURAYiA
xg9MaCtJFQW0qdAijwMAvCGiO7anokANIZxLAeo1rml4GABi8wQAgDoAdQAOT6vOC2iLIW
/7Pz5XfO69YfJbAAAAAElFTkSuQmCC"

  constructor: (cols, rows, tileSize, tiles, ctx) ->
    super(cols, rows, tileSize, tiles, ctx)
    Loader.loadImage(SplitTileMap.tile, SplitTileMap.tiledata)

  _render: () ->
    tile = Loader.getImage(SplitTileMap.tile)

    unless tile?
      return

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
        @ctx.drawImage(Loader.getImage(SplitTileMap.tile),
          xOffset * @tileSize,
          yOffset * @tileSize,
          @tileSize,
          @tileSize,
          x,
          y,
          @tileSize,
          @tileSize)
        @ctx.restore()
