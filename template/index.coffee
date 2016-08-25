doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    title "js13kentry"
    meta(name: 'description', content: '')

    link rel: 'stylesheet', href: 'css/reset.css'
    link rel: 'stylesheet', href: 'css/main.css'

    script src: 'js/game.js'
  body ->
    div '.container', ->
      div '.centered', ->
        h1 'js13kgame'
        canvas '#game-canvas', ->

        coffeescript ->

          canvas = document.getElementById('game-canvas')

          GAME = new Game(512, 512, () ->
            this.backgroundColor 'white'
            this.border '1px solid black'
          , canvas)

          STAGE = new Stage()

          PLAYER = new Player(30,30)
          STAGE.addActor(PLAYER)

          GAME.setStage(STAGE)
          GAME.start()


