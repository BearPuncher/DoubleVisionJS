# importing SAT classes https://github.com/jriecken/sat-js
Vector = SAT.Vector
Circle = SAT.Circle
Polygon = SAT.Polygon
Box = SAT.Box

MathHelpers = {
  toDegrees: (radians) ->
    return radians * (180 / Math.PI)

  toRadians: (degrees) ->
    return degrees * (Math.PI / 180)
}