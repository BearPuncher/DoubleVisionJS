class Vector
  constructor: (@x = 0, @y = 0) ->

  rotate: (radians) =>
    oldX = @x
    oldY = @y
    @x = oldX * Math.cos(radians) - oldY * Math.sin(radians)
    @y = oldX * Math.sin(radians) + oldY * Math.cos(radians)

  add: (vector) =>
    unless vector instanceof Vector
      return
    @x += vector.x
    @y += vector.y

  subtract: (vector)  =>
    unless vector instanceof Vector
      return
    @x -= vector.x
    @y -= vector.y

class Shape
  constructor: (@position) ->

class Circle extends Shape
  constructor: (vector, @radius = 0) ->
    super(vector)

class Rect extends Shape
  constructor: (vector, @w = 0, @h = 0) ->
    super(vector)

MathHelpers =
  isCircleInRect: (circle, rect) ->
    unless circle instanceof Circle and rect instanceof Rect
      return
    rectMinX = rect.position.x
    rectMaxX = rectMinX + rect.w
    rectMinY = rect.position.y
    rectMaxY = rectMinY + rect.h

    circleMinX = circle.position.x - circle.radius
    circleMaxX = circle.position.x + circle.radius
    circleMinY = circle.position.y - circle.radius
    circleMaxY = circle.position.y + circle.radius

    if rectMinX > circleMinX or rectMaxX < circleMaxX or rectMinY > circleMinY or rectMaxY < circleMaxY
      return false
    else
      return true

  doesCircleRectIntersect: (circle, rect) ->
    unless circle instanceof Circle and rect instanceof Rect
      return
    circlePos = circle.position
    rectPos = rect.position

    deltaX = circlePos.x - Math.max(rectPos.x, Math.min(circlePos.x, rectPos.x + rect.w))
    deltaY = circlePos.y - Math.max(rectPos.y, Math.min(circlePos.y, rectPos.y + rect.h))

    return (deltaX * deltaX + deltaY * deltaY) < (circle.radius * circle.radius)

  doesCircleCircleIntersect: (circleA, circleB) ->
    unless circleA instanceof Circle and circleB instanceof Circle
      return

    circlePosA = circleA.position
    circlePosB = circleB.position

    distance = MathHelpers.getDistance(circlePosA.x, circlePosA.y, circlePosB.x, circlePosB.y)

    if (circleA.radius + circleB.radius) < distance
      return false
    else
      return true

  toDegrees: (radians) ->
    return radians * (180 / Math.PI)

  toRadians: (degrees) ->
    return degrees * (Math.PI / 180)

  getDistance: (x1, y1, x2, y2) ->
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))

