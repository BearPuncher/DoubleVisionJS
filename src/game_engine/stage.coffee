STATE =
  finished: 0
  running: 1

# Stage, containing actors
class Stage
  constructor: (@width, @height, @ctx = undefined) ->
    @actors = []
    @bounds = new Rect(new Vector(), @width, @height)
    @state = STATE.running
    @controller = Controller.get()

  addActor: (actor) =>
    unless actor instanceof Actor
      console.log('ERROR: ' + actor + ' is not an Actor')
      return
    actor.setStage(@)
    actor.init()
    @actors.push actor

  init: () ->
    @actors = []
    @state = STATE.running
    if @_init
      @_init()

  update: (step) ->
    if @_update
      @_update step
    actor.update(step) for actor in @actors

  render: () ->
    if @_render
      @_render()
    actor.render() for actor in @actors

  setContext: (@ctx) =>

  getContext: () ->
    return @ctx

  isCircleInBounds: (circle)->
    unless circle instanceof Circle
      retrun false
    #response = new SAT.Response()
    #collided = SAT.testCirclePolygon(circle, @bounds, response)
    #if collided and response.aInB
    return MathHelpers.isCircleInRect(circle, @bounds)