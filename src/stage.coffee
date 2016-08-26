# Stage, containing actors
class Stage
  constructor: (@ctx = undefined) ->
    @actors = []

  addActor: (actor) =>
    unless actor instanceof Actor
      console.log('ERROR: ' + actor + ' is not an Actor')
      return
    actor.setStage(@)
    actor.init()
    @actors.push actor

  update: (step) ->
    actor.update(step) for actor in @actors

  render: () ->
    actor.render() for actor in @actors

  setContext: (@ctx) =>

  getContext: () ->
    return @ctx