
Modal = require 'voxel-modal'
ConsoleWidget = require 'console-widget'

module.exports = (game, opts) -> new Console(game, opts)

class Console extends Modal
  constructor: (@game, @opts) ->
    @widget = ConsoleWidget(@opts)
    @widget.on 'input', (text) =>
      @widget.log "You said: #{text}"

    @bindKeys()

    super game, {element: @widget.containerNode}

  bindKeys: () ->
    #@game.buttons.bindings.console ?= 'T'
    #@game.buttons.bindings.console2 ?= '/'
    #@game.buttons.bindings.console3 ?= '.'

    @game.buttons.down.on 'console', () =>
      @open()
    
    @game.buttons.down.on 'console2', () =>
      @open('/')

    @game.buttons.down.on 'console3', () =>
      @open('.')

  open: (initialText=undefined) ->
    super()

    @widget.open(initialText)

  close: () ->
    super()

    @widget.close()

  log: (text) ->
    @widget.log(text)

