# Stage, containing actors
class Stage
  constructor: () ->
    @actors = []

  addActor: (actor) =>
    unless actor instanceof Actor
      console.log('ERROR: ' + actor + ' is not an Actor')
      return
    @actors.push actor

  update: (dt) ->
    actor.update dt for actor in @actors

  render: (offset) ->
    actor.render offset for actor in @actors



