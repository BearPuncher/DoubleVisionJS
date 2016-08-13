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
      header ->
        h1 'js13kentry'
        nav ->
          ul ->
            li -> a href: '#', -> 'Home'
      section ->
        p
      footer ->
        p