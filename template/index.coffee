doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    title "js13kentry"
    meta(name: 'description', content: '')

    link rel: 'stylesheet', href: 'css/reset.css'
    link rel: 'stylesheet', href: 'css/main.css'

    script src: 'js/vendor/SAT.min.js'
    script src: 'js/game_engine.js'
    script src: 'js/game.js'

  body ->
    div '.container', ->
      div '.centered', ->
        h1 'DoubleVision'
        #div '#overlay', ->
          #
          # button '#start-button', type: 'button', disabled: true, ->
          #  'Start Game'

        canvas '#game-canvas', ->

        coffeescript ->

          canvas = document.getElementById('game-canvas')

          GAME = new Game(640, 320, () ->
            this.backgroundColor 'white'
            this.border '1px solid black'
          , canvas)

          STAGE = new SplitStage(640, 320)
          LEFT_PLAYER = new LeftPlayer(30,160)
          RIGHT_PLAYER = new RightPlayer(610, 160)
          STAGE.addActor(LEFT_PLAYER)
          STAGE.addActor(RIGHT_PLAYER)
          GAME.setStage(STAGE)
          GAME.start()

        ###  button = document.getElementById('start-button')
          button.disabled = false
          button.addEventListener('click', (e) ->
            document.getElementById('overlay').className = 'hidden'
            GAME.start()
          )
        ###
