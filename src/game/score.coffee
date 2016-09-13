Score =
  highScore: 0
  lastScore: 0

  setScore: (score) ->
    if score > Score.highScore
      Score.highScore = score
    Score.lastScore = score