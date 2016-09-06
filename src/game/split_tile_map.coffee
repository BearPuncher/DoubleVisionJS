

class SplitTileMap extends TileMap
  @tile: 'tile'
  @tiledata:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA
      wElEQVRYR+2XwQ3AIAhF6wbuv5EjuIUbtNHExloUUBI50Gv98IwgXxdjvFNK18rnvS+yHb
      0LIdw5EDdIq9nRF4C8C04QaO2q/gWgQswSUSD6NR8ADGIlQVtbkP4HMIKgJK/JOEcEAvQQ
      nOQQxEw/BKgQu22G6fUCSPU5Vtj6ilC6z1ltSKl2aUAdVzFl5/20lCpSd3wcHwcwP1ANCX
      ZjzSYd5d9ojfkB8wPmB8wP6HmYcEYyx/dDj95Wf/5xenocP9OrvDDCnV6DAAAAAElFTkSu
      QmCC"

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

        if (tile == 0)
          @ctx.drawImage(Loader.getImage(SplitTileMap.tile), x, y)
        else
          @ctx.fillStyle = "#000000"
          @ctx.fillRect(x, y, @tileSize, @tileSize)

