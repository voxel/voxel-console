// Generated by CoffeeScript 1.6.3
(function() {
  var Console, ConsoleWidget, Modal,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Modal = require('voxel-modal');

  ConsoleWidget = require('console-widget');

  module.exports = function(game, opts) {
    return new Console(game, opts);
  };

  Console = (function(_super) {
    __extends(Console, _super);

    function Console(game, opts) {
      var _this = this;
      this.game = game;
      this.opts = opts;
      this.widget = ConsoleWidget(this.opts);
      this.widget.on('input', function(text) {
        return _this.widget.log("You said: " + text);
      });
      this.bindKeys();
      Console.__super__.constructor.call(this, game, {
        element: this.widget.containerNode
      });
    }

    Console.prototype.bindKeys = function() {
      var _this = this;
      this.game.buttons.down.on('console', function() {
        return _this.open();
      });
      this.game.buttons.down.on('console2', function() {
        return _this.open('/');
      });
      return this.game.buttons.down.on('console3', function() {
        return _this.open('.');
      });
    };

    Console.prototype.open = function(initialText) {
      if (initialText == null) {
        initialText = void 0;
      }
      Console.__super__.open.call(this);
      return this.widget.open(initialText);
    };

    Console.prototype.close = function() {
      Console.__super__.close.call(this);
      return this.widget.close();
    };

    Console.prototype.log = function(text) {
      return this.widget.log(text);
    };

    return Console;

  })(Modal);

}).call(this);
