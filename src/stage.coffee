# Stage, containing actors
class Stage
  constructor: (@ctx = undefined ) ->
    @actors = []

  addActor: (actor) =>
    unless actor instanceof Actor
      console.log('ERROR: ' + actor + ' is not an Actor')
      return
    actor.setStage(@)
    @actors.push actor

  update: (timer, dt) ->
    actor.update(timer, dt) for actor in @actors

  render: (offset) ->
    actor.render(offset) for actor in @actors

  setContext: (@ctx) =>

  getContext: () ->
    return @ctx
