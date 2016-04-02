'use strict';

const Modal = require('voxel-modal');
const ConsoleWidget = require('console-widget');

module.exports = (game, opts) => new Console(game, opts);
module.exports.pluginInfo = {
  loadAfter: ['voxel-keys']
};

class Console extends Modal {
  constructor(game, opts) {
    if (!game.isClient) return;

    // options for ConsoleWidget
    const widgetOpts = opts;  // pass through voxel-console opts (no need to copy)

    // nothing closes the widget, hide/show is handled by voxel-modal
    widgetOpts.closeKeys = [];

    const widget = ConsoleWidget(widgetOpts);

    super(game, {element: widget.containerNode});

    this.game = game;
    this.opts = opts;

    if (!opts.includeTextBindings) {
      opts.includeTextBindings = {
        'console': undefined,
        console2: '/',
        console3: '.'};
    }

    this.widget = widget;
    //this.widget.on 'input', (text) =>  # TODO: handle events, pass up?
    //  this.widget.log "You said: #{text}"

    this.keys = game.plugins.get('voxel-keys');
    if (!this.keys) throw new Error('voxel-console requires voxel-keys plugin');
    this.bindKeys();
  }
   
  bindKeys() {
    //this.game.buttons.bindings.console ?= 'T' # TODO: bind these keys ourselves?
    //this.game.buttons.bindings.console2 ?= '/'  # maybe with game-shell, game.shell.bind()
    //this.game.buttons.bindings.console3 ?= '.'

    ['console', 'console2', 'console3'].forEach((binding) => {
      this.keys.down.on(binding, () => {
        const initialText = this.opts.includeTextBindings[binding];
        this.open(initialText);
      });
    });
  }

  open(initialText) {
    super.open();

    this.widget.open(initialText);
  }

  close() {
    super.close();
    //this.widget.close();  // modal hides everything
  }

  log(text) {
    this.widget.log(text);
  }

  logNode(node) {
    this.widget.logNode(node);
  }
}
