# Class for instantiating and rendering a tile map
class TileMap
  constructor: (@cols = 0, @rows = 0, @tileSize = 0, @tiles = []) ->

  setCols: (@cols) =>

  setRows: (@rows) =>

  setTileSize: (@tileSize) =>

  getTile: (col, row) ->
    return @tiles[row * @cols + col]