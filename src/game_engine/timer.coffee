class Timer
  constructor: (@timeout) ->
    @elapsed = 0

  tick: (step) =>
    @elapsed += step

  end: (step) =>
    @elapsed = @timeout

  hasEnded: () ->
    return @elapsed >= @timeout

  restart: () =>
    @elapsed = 0