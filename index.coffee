
Modal = require 'voxel-modal'
ConsoleWidget = require 'console-widget'

module.exports = (game, opts) -> new Console(game, opts)

class Console extends Modal
  constructor: (@game, @opts) ->

    @opts.includeTextBindings ?= {
      'console': undefined,
      console2: '/',
      console3: '.'}

    # options for ConsoleWidget
    widgetOpts = @opts  # pass through voxel-console opts (no need to copy)
  
    # nothing closes the widget, hide/show is handled by voxel-modal
    widgetOpts.closeKeys = []
    @widget = ConsoleWidget(widgetOpts)
    #@widget.on 'input', (text) =>  # TODO: handle events, pass up?
    #  @widget.log "You said: #{text}"

    @bindKeys()

    super game, {element: @widget.containerNode}

  bindKeys: () ->
    #@game.buttons.bindings.console ?= 'T' # TODO: bind these keys ourselves?
    #@game.buttons.bindings.console2 ?= '/'
    #@game.buttons.bindings.console3 ?= '.'

    ['console', 'console2', 'console3'].forEach (binding) =>
      @game.buttons.down.on binding, () =>
        initialText = @opts.includeTextBindings[binding]
        @open(initialText)

  open: (initialText=undefined) ->
    super()

    @widget.open(initialText)

  close: () ->
    super()
    #@widget.close()  # modal hides everything

  log: (text) ->
    @widget.log(text)

  logNode: (node) ->
    @widget.logNode(node)

