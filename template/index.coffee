doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    title "Double Vision"
    meta(name: 'description', content: '')

    link rel: 'stylesheet', href: 'css/reset.css'
    link rel: 'stylesheet', href: 'css/main.css'

   # script src: 'js/vendor/SAT.min.js'
    script src: 'js/game_engine.js'
    script src: 'js/game.js'

  body ->
    div '.container', ->
      div '.centered', ->

        canvas '#game-canvas', ->

        coffeescript ->

          canvas = document.getElementById('game-canvas')

          width = 640
          height = 360

          GAME = new Game(width, height, () ->
            this.backgroundColor 'white'
            this.border '1px solid black'
          , canvas)

          GAME_BEGIN = new StartStage(width, height)
          STAGE = new SplitStage(width, height)
          GAME_OVER = new GameOverStage(width, height)

          GAME.setStage(GAME_BEGIN)
          GAME.setStageTransition(() ->
            if GAME.stage instanceof StartStage
              if GAME.stage.state == STATE.finished then GAME.setStage(STAGE)
            else if GAME.stage instanceof SplitStage
              if GAME.stage.state == STATE.finished then GAME.setStage(GAME_OVER)
            else if GAME.stage instanceof GameOverStage
              if GAME.stage.state == STATE.finished then GAME.setStage(STAGE)
          )
          GAME.start()

