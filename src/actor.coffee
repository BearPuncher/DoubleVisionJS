# Actor, has a stage
class Actor
  constructor: (@posX = 0, @posY = 0) ->

  update: (dt) ->
    @_update dt

  render: (offset) ->
    @_render offset

  setUpdate: (update = undefined) =>
    @_update = update

  setRender: (render = undefined ) =>
    @_render = render

