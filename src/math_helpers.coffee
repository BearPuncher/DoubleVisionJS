class Point
  constructor: (@x = 0, @y = 0) ->

  getX: () ->
    return @x

  getY: () ->
    return @y

MathHelpers = {
  toDegrees: (radians) ->
    return radians * (180 / Math.PI)
}