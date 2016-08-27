class Mimic extends CircleActor
  constructor: (x, y, @target)->
    unless @target instanceof CircleActor
      console.log('ERROR target is not CircleActor' )
    super(x, y, 0, 15)

  _render: () ->
    @drawDebug('#0000FF')

  _update: (step) =>
    @direction = 2 * Math.PI - @target.direction
    targetPos = @target.position
    @position = new Point(targetPos.getX(), @stage.height - targetPos.getY())