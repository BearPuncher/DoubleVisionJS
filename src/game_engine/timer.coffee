class Timer
  constructor: (@timeout) ->
    @elapsed = 0

  tick: (step) =>
    @elapsed += step

  hasEnded: () ->
    return @elapsed >= @timeout

  restart: () =>
    @elapsed = 0