doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    title "Double Vision"
    meta(name: 'description', content: '')

    link rel: 'stylesheet', href: 'css/main.css'

    script src: 'js/game_engine.js'
    script src: 'js/game.js'

  body ->
    div '.container', ->
      div '.centered', ->

        canvas '#game-canvas', ->

        coffeescript ->
          canvas = document.getElementById('game-canvas')

          w = 640
          h = 360

          GAME = new Game(w, h, () ->
            this.backgroundColor 'white'
            this.border '1px solid black'
          , canvas)

          PRELOAD = new PreloaderStage(w, h)
          GAME_BEGIN = new StartStage(w, h)
          STORY = new StoryStage(w, h)
          STAGE = new SplitStage(w, h)
          GAME_OVER = new GameOverStage(w, h)

          GAME.setStage(PRELOAD)
          GAME.setStageTransition(() ->
            if GAME.stage instanceof PreloaderStage
              if GAME.stage.state == STATE.finished then GAME.setStage(GAME_BEGIN)
            if GAME.stage instanceof StartStage
              if GAME.stage.state == STATE.finished then GAME.setStage(STORY)
            if GAME.stage instanceof StoryStage
              if GAME.stage.state == STATE.finished then GAME.setStage(STAGE)
            else if GAME.stage instanceof SplitStage
              if GAME.stage.state == STATE.finished then GAME.setStage(GAME_OVER)
            else if GAME.stage instanceof GameOverStage
              if GAME.stage.state == STATE.finished then GAME.setStage(STAGE)
          )
          GAME.start()

