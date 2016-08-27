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

          GAME = new Game(640, 640, () ->
            this.backgroundColor 'white'
            this.border '1px solid black'
          , canvas)

          STAGE = new Stage(640, 640)
          PLAYER = new Player(320,30)
          MIMIC = new Mimic(320, 610, PLAYER)
          STAGE.addActor(PLAYER)
          STAGE.addActor(MIMIC)
          GAME.setStage(STAGE)
          GAME.start()


