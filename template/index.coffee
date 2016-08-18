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
          DIRECTION = undefined

          getArrowKeyDirection = (keyCode) ->
            return {
              37: 'left',
              39: 'right',
              38: 'up',
              40: 'down'
            }[keyCode]

          isArrowKey = (keyCode) ->
            return !!getArrowKeyDirection keyCode

          document.onkeydown = (event) ->
            if isArrowKey event.keyCode
              DIRECTION = getArrowKeyDirection event.keyCode
            else
              DIRECTION = undefined

          GAME = new Game(512, 512, () ->
            console.log 'setup'
            this.backgroundColor 'white'
            this.border '1px solid black'
          , canvas)

          STAGE = new Stage()
          ACTOR = new Actor(30, 40)
          ACTOR.setUpdate((dt) ->
            console.log(DIRECTION)
            if DIRECTION == 'left'
              @posX -= 5 * (dt / 1000)
            else if DIRECTION == 'right'
              @posX += 5 * (dt / 1000)
          )

          ACTOR.setRender((offset)->
            GAME.canvas.ctx.fillStyle = "#FF0000"
            GAME.canvas.ctx.fillRect @posX,@posY,150,75
          )

          STAGE.addActor(ACTOR)

          GAME.setStage(STAGE)
          GAME.start()


