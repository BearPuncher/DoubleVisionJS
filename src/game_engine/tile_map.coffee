# Class for instantiating and rendering a tile map
class TileMap
  constructor: (@cols = 0, @rows = 0, @tileSize = 0,
    @tiles = [], @ctx = undefined) ->

  getTile: (col, row) ->
    return @tiles[row * @cols + col]

  render: () ->
    if @_render
      @_render()
