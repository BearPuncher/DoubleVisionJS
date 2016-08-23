doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    title "js13kentry"
    meta(name: 'description', content: '')

    link rel: 'stylesheet', href: 'css/reset.css'
    link rel: 'stylesheet', href: 'css/main.css'

    script src: 'js/vendor/stats.min.js'
    script src: 'js/game.js'
  body ->
    div '.container', ->
      div '.centered', ->
        h1 'js13kgame'
        canvas '#game-canvas', ->

        coffeescript ->

          canvas = document.getElementById('game-canvas')
          controller = Controller.get()

          GAME = new Game(512, 512, () ->
            this.backgroundColor 'white'
            this.border '1px solid black'
          , canvas)

          STAGE = new Stage()

          CIRCLE = new CircleActor(100, 100)
          CIRCLE.setDimensions(20)
          CIRCLE.setRender(()->
            @drawDebug()
          )
          STAGE.addActor(CIRCLE)

          maxspeed = 6
          velx = 0
          vely = 0

          SQUARE = new SquareActor(30,30)
          SQUARE.setDimensions(30, 30)
          SQUARE.setDirection(40)
          SQUARE.setUpdate((step) ->
            x = @position.getX()
            y = @position.getY()

            if controller.isPressed(Keys.LEFT) or controller.isPressed(Keys.A)
              if velx > -maxspeed
                velx -= 0.5
            if controller.isPressed(Keys.RIGHT) or controller.isPressed(Keys.D)
              if velx < maxspeed
                velx += 0.5
            if controller.isPressed(Keys.UP) or controller.isPressed(Keys.W)
              if vely > -maxspeed
                vely -= 0.5
            if controller.isPressed(Keys.DOWN) or controller.isPressed(Keys.S)
              if vely < maxspeed
                vely += 0.5

            @setPosition(x + velx, y + vely)
          )

          SQUARE.setRender(()->
            @drawDebug()
          )

          STAGE.addActor(SQUARE)

          GAME.setStage(STAGE)
          GAME.start()


