Score =
  highScore: 0
  lastScore: 0

  setScore: (score) ->
    Score.lastScore =
    Score.highScore = score if score > Score.highScore