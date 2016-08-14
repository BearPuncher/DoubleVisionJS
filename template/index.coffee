doctype 5
html ->
  head ->
    meta charset: 'utf-8'
    title "js13kentry"
    meta(name: 'description', content: '')

    link rel: 'stylesheet', href: 'css/reset.css'
    link rel: 'stylesheet', href: 'css/main.css'

    script src: 'js/vendor/ga.js'
    script src: 'js/vendor/plugins.js'
    script src: 'js/game_engine.js'
    script src: 'js/game.js'
  body ->
    coffeescript ->
      GAME.create('512px', '512px', () ->
        console.log('start')
        GAME.backgroundColor('green')
      )

      GAME.run = ()->
        console.log('run')

      # window.onEachFrame(GAME.run)



