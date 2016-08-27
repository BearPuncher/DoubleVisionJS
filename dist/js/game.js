var Actor, CircleActor, Controller, Game, Keys, MathHelpers, Mimic, Player, Point, SquareActor, Stage,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Point = (function() {
  function Point(x1, y1) {
    this.x = x1 != null ? x1 : 0;
    this.y = y1 != null ? y1 : 0;
  }

  Point.prototype.getX = function() {
    return this.x;
  };

  Point.prototype.getY = function() {
    return this.y;
  };

  return Point;

})();

MathHelpers = {
  toDegrees: function(radians) {
    return radians * (180 / Math.PI);
  }
};

Controller = (function() {
  var instance;

  instance = null;

  Controller.pressed = new Map;

  Controller.get = function() {
    if (this.instance == null) {
      instance = new this;
    }
    return instance;
  };

  function Controller() {
    document.onkeyup = function(event) {
      return Controller.pressed[event.keyCode] = false;
    };
    document.onkeydown = function(event) {
      return Controller.pressed[event.keyCode] = true;
    };
  }

  Controller.prototype.isPressed = function(keyCode) {
    return Controller.pressed[keyCode];
  };

  return Controller;

})();

Keys = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  A: 65,
  D: 68,
  W: 87,
  S: 83
};

Actor = (function() {
  function Actor(x, y, direction1) {
    this.direction = direction1 != null ? direction1 : 0;
    this.lookAt = bind(this.lookAt, this);
    this.setDirection = bind(this.setDirection, this);
    this.setPosition = bind(this.setPosition, this);
    this.setStage = bind(this.setStage, this);
    this.setRender = bind(this.setRender, this);
    this.setUpdate = bind(this.setUpdate, this);
    this.setInit = bind(this.setInit, this);
    this.position = new Point(x, y);
    this.stage = null;
  }

  Actor.prototype.init = function() {
    if (this._init) {
      return this._init();
    }
  };

  Actor.prototype.update = function(step) {
    if (this._update) {
      return this._update(step);
    }
  };

  Actor.prototype.render = function() {
    if (this._render) {
      return this._render();
    }
  };

  Actor.prototype.setInit = function(init) {
    if (init == null) {
      init = void 0;
    }
    return this._init = init;
  };

  Actor.prototype.setUpdate = function(update) {
    if (update == null) {
      update = void 0;
    }
    return this._update = update;
  };

  Actor.prototype.setRender = function(render) {
    if (render == null) {
      render = void 0;
    }
    return this._render = render;
  };

  Actor.prototype.setStage = function(stage1) {
    this.stage = stage1;
  };

  Actor.prototype.setPosition = function(x, y) {
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    return this.position = new Point(x, y);
  };

  Actor.prototype.setDirection = function(degrees) {
    return this.direction = degrees * (Math.PI / 180);
  };

  Actor.prototype.lookAt = function(point) {
    if (!(point instanceof Point)) {
      console.log('ERROR: ' + point + ' is not an Point');
      return;
    }
    return this.direction = Math.atan2(point.getY() - this.position.getY(), point.getX() - this.position.getX());
  };

  return Actor;

})();

SquareActor = (function(superClass) {
  extend(SquareActor, superClass);

  function SquareActor(x, y, direction, width1, height1) {
    if (direction == null) {
      direction = 0;
    }
    this.width = width1 != null ? width1 : 0;
    this.height = height1 != null ? height1 : 0;
    this.setDimensions = bind(this.setDimensions, this);
    SquareActor.__super__.constructor.call(this, x, y, direction);
  }

  SquareActor.prototype.setDimensions = function(width1, height1) {
    this.width = width1;
    this.height = height1;
  };

  SquareActor.prototype.drawDebug = function() {
    var context;
    if (!((this.stage != null) || (this.stage.getContext() != null))) {
      console.log('Stage context cannot is null, or there is no context set');
      return;
    }
    context = this.stage.getContext();
    context.translate(this.position.getX(), this.position.getY());
    context.rotate(this.direction);
    context.translate(-this.width / 2, -this.height / 2);
    context.fillStyle = "#FF0000";
    context.fillRect(0, 0, this.width, this.height);
    context.translate(this.width / 2, this.height / 2);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.width / 2, 0);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();
    context.rotate(-this.direction);
    return context.translate(-this.position.getX(), -this.position.getY());
  };

  return SquareActor;

})(Actor);

CircleActor = (function(superClass) {
  extend(CircleActor, superClass);

  function CircleActor(x, y, direction, radius) {
    if (direction == null) {
      direction = 0;
    }
    this.radius = radius != null ? radius : 0;
    this.setDimensions = bind(this.setDimensions, this);
    CircleActor.__super__.constructor.call(this, x, y, direction);
  }

  CircleActor.prototype.setDimensions = function(radius) {
    this.radius = radius != null ? radius : 0;
  };

  CircleActor.prototype.drawDebug = function(colour) {
    var context;
    if (colour == null) {
      colour = '#FF0000';
    }
    if (!((this.stage != null) || (this.stage.getContext() != null))) {
      console.log('Stage context cannot is null, or there is no context set');
      return;
    }
    context = this.stage.getContext();
    context.translate(this.position.getX(), this.position.getY());
    context.rotate(this.direction);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.fillStyle = colour;
    context.fill();
    context.closePath();
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.radius, 0);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();
    context.rotate(-this.direction);
    return context.translate(-this.position.getX(), -this.position.getY());
  };

  return CircleActor;

})(Actor);

Player = (function(superClass) {
  extend(Player, superClass);

  function Player(x, y) {
    this._update = bind(this._update, this);
    Player.__super__.constructor.call(this, x, y, 0, 15);
    this.controller = Controller.get();
    this.velx = 0;
    this.vely = 0;
    this.maxspeed = 4;
  }

  Player.prototype._render = function() {
    return this.drawDebug();
  };

  Player.prototype._update = function(step) {
    var acceleration, friction, mouseLoc, stepFraction, x, y;
    x = this.position.getX();
    y = this.position.getY();
    stepFraction = step / 100;
    friction = 1.5;
    acceleration = 2;
    if (this.controller.isPressed(Keys.LEFT) || this.controller.isPressed(Keys.A)) {
      if (this.velx > -this.maxspeed) {
        this.velx -= acceleration * stepFraction;
        if (this.velx < -this.maxspeed) {
          this.velx = -this.maxspeed;
        }
      }
    } else if (this.velx < 0) {
      this.velx += friction * stepFraction;
      if (this.velx > 0) {
        this.velx = 0;
      }
    }
    if (this.controller.isPressed(Keys.RIGHT) || this.controller.isPressed(Keys.D)) {
      if (this.velx < this.maxspeed) {
        this.velx += acceleration * stepFraction;
        if (this.velx > this.maxspeed) {
          this.velx = this.maxspeed;
        }
      }
    } else if (this.velx > 0) {
      this.velx -= friction * stepFraction;
      if (this.velx < 0) {
        this.velx = 0;
      }
    }
    if (this.controller.isPressed(Keys.UP) || this.controller.isPressed(Keys.W)) {
      if (this.vely > -this.maxspeed) {
        this.vely -= acceleration * stepFraction;
        if (this.vely < -this.maxspeed) {
          this.vely = -this.maxspeed;
        }
      }
    } else if (this.vely < 0) {
      this.vely += friction * stepFraction;
      if (this.vely > 0) {
        this.vely = 0;
      }
    }
    if (this.controller.isPressed(Keys.DOWN) || this.controller.isPressed(Keys.S)) {
      if (this.vely < this.maxspeed) {
        this.vely += acceleration * stepFraction;
        if (this.vely > this.maxspeed) {
          this.vely = this.maxspeed;
        }
      }
    } else if (this.vely > 0) {
      this.vely -= friction * stepFraction;
      if (this.vely < 0) {
        this.vely = 0;
      }
    }
    this.setPosition(x + this.velx, y + this.vely);
    mouseLoc = Game.getMouseLocation();
    if (mouseLoc) {
      return this.lookAt(mouseLoc);
    }
  };

  return Player;

})(CircleActor);

Mimic = (function(superClass) {
  extend(Mimic, superClass);

  function Mimic(x, y, target) {
    this.target = target;
    this._update = bind(this._update, this);
    if (!(this.target instanceof CircleActor)) {
      console.log('ERROR target is not CircleActor');
    }
    Mimic.__super__.constructor.call(this, x, y, 0, 15);
  }

  Mimic.prototype._render = function() {
    return this.drawDebug('#0000FF');
  };

  Mimic.prototype._update = function(step) {
    var targetPos;
    this.direction = 2 * Math.PI - this.target.direction;
    targetPos = this.target.position;
    return this.position = new Point(targetPos.getX(), this.stage.height - targetPos.getY());
  };

  return Mimic;

})(CircleActor);

Stage = (function() {
  function Stage(width1, height1, ctx) {
    this.width = width1;
    this.height = height1;
    this.ctx = ctx != null ? ctx : void 0;
    this.setContext = bind(this.setContext, this);
    this.addActor = bind(this.addActor, this);
    this.actors = [];
  }

  Stage.prototype.addActor = function(actor) {
    if (!(actor instanceof Actor)) {
      console.log('ERROR: ' + actor + ' is not an Actor');
      return;
    }
    actor.setStage(this);
    actor.init();
    return this.actors.push(actor);
  };

  Stage.prototype.update = function(step) {
    var actor, i, len, ref, results;
    ref = this.actors;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      actor = ref[i];
      results.push(actor.update(step));
    }
    return results;
  };

  Stage.prototype.render = function() {
    var actor, i, len, ref, results;
    ref = this.actors;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      actor = ref[i];
      results.push(actor.render());
    }
    return results;
  };

  Stage.prototype.setContext = function(ctx) {
    this.ctx = ctx;
  };

  Stage.prototype.getContext = function() {
    return this.ctx;
  };

  return Stage;

})();

Game = (function() {
  Game.fps = 60;

  Game.frameDuration = 1000 / Game.fps;

  Game.mousePoint = void 0;

  function Game(width, height, setup, canvas) {
    this.canvas = canvas != null ? canvas : void 0;
    this.gameStep = bind(this.gameStep, this);
    this.render = bind(this.render, this);
    this.start = bind(this.start, this);
    this.border = bind(this.border, this);
    this.backgroundColor = bind(this.backgroundColor, this);
    this.setStage = bind(this.setStage, this);
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      document.body.appendChild(this.canvas);
    }
    this.canvas.ctx = this.canvas.getContext('2d');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.addEventListener('mousemove', function(event) {
      var rect;
      rect = this.getBoundingClientRect();
      return Game.mousePoint = new Point(event.clientX - rect.left, event.clientY - rect.top);
    });
    this.running = false;
    this.setup = setup || void 0;
    this.stage = null;
    this.startTime = 0;
    this.accumulator = 0;
    if (this.setup) {
      this.setup();
    }
  }

  Game.prototype.setStage = function(stage) {
    if (!(stage instanceof Stage)) {
      console.log('ERROR: ' + stage + ' is not an Stage');
      return;
    }
    this.stage = stage;
    return this.stage.setContext(this.canvas.ctx);
  };

  Game.prototype.backgroundColor = function(color) {
    return this.canvas.style.backgroundColor = color;
  };

  Game.prototype.border = function(border) {
    return this.canvas.style.border = border;
  };

  Game.getMouseLocation = function() {
    return Game.mousePoint;
  };

  Game.prototype.start = function() {
    this.running = true;
    this.startTime = Date.now();
    this.gameStep();
    return window.onEachFrame(this.render);
  };

  Game.prototype.update = function(step) {
    if (this.stage != null) {
      return this.stage.update(step);
    }
  };

  Game.prototype.render = function() {
    if (this.running == null) {
      return;
    }
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.stage != null) {
      return this.stage.render();
    }
  };

  Game.prototype.gameStep = function() {
    var currentTime, elapsedMs;
    if (this.running == null) {
      return;
    }
    currentTime = Date.now();
    elapsedMs = currentTime - this.startTime;
    if (elapsedMs > 1000) {
      elapsedMs = Game.frameDuration;
    }
    this.startTime = currentTime;
    this.accumulator += elapsedMs;
    while (this.accumulator >= Game.frameDuration) {
      this.update(Game.frameDuration);
      this.accumulator -= Game.frameDuration;
    }
    return setTimeout(this.gameStep, Game.frameDuration);
  };

  return Game;

})();

(function() {
  var onEachFrame;
  onEachFrame = void 0;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb;
      _cb = function() {
        cb();
        requestAnimationFrame(_cb);
      };
      _cb();
    };
  } else if (window.webkitRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb;
      _cb = function() {
        cb();
        webkitRequestAnimationFrame(_cb);
      };
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb;
      _cb = function() {
        cb();
        mozRequestAnimationFrame(_cb);
      };
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, Game.frameDuration);
    };
  }
  window.onEachFrame = onEachFrame;
})();
