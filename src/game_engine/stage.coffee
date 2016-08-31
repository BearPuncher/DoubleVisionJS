# Stage, containing actors
class Stage
  constructor: (@width, @height, @ctx = undefined) ->
    @actors = []
    @bounds = new Box(new Vector(), @width, @height).toPolygon()

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

  isCircleInBounds: (circle)->
    unless circle instanceof Circle
      retrun false
    response = new SAT.Response()
    collided = SAT.testCirclePolygon(circle, @bounds, response)
    if collided and response.aInB
      return true
    return false

  setContext: (@ctx) =>

  getContext: () ->
    return @ctx