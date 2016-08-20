doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    title "js13kentry"
    meta(name: 'description', content: '')

    link rel: 'stylesheet', href: 'css/reset.css'
    link rel: 'stylesheet', href: 'css/main.css'

    script src: 'js/engine.js'
  body ->
    div '.container', ->
      div '.centered', ->
        h1 'js13kgame'
        canvas '#game-canvas', ->

        coffeescript ->

          canvas = document.getElementById('game-canvas')
          controller = Controller.get()
          console.log controller

          GAME = new Game(512, 512, () ->
            console.log 'setup'
            this.backgroundColor 'white'
            this.border '1px solid black'
          , canvas)

          STAGE = new Stage()
          ACTOR = new Actor(30, 40)
          ACTOR.setUpdate((dt) ->
            if controller.isPressed(Keys.LEFT) or
            controller.isPressed(Keys.A)
              @posX -= 10 * (dt / 1000)
            else if controller.isPressed(Keys.RIGHT) or
            controller.isPressed(Keys.D)
              @posX += 10 * (dt / 1000)
          )

          ACTOR.setRender((offset)->
            GAME.canvas.ctx.fillStyle = "#FF0000"
            GAME.canvas.ctx.fillRect @posX,@posY,150,75
          )

          STAGE.addActor(ACTOR)

          GAME.setStage(STAGE)
          GAME.start()


