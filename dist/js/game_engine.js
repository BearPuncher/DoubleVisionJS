var Actor, Box, Circle, CircleActor, Controller, Game, Keys, Loader, MathHelpers, Polygon, STATE, SquareActor, Stage, TileMap, Timer, Vector,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Loader = {
  numberOfImages: 0,
  numberComplete: 0,
  images: {},
  loadImage: function(key, src) {
    var downloadingImage;
    Loader.numberOfImages++;
    downloadingImage = new Image();
    downloadingImage.onload = function() {
      Loader.images[key] = downloadingImage;
      return Loader.numberComplete++;
    };
    return downloadingImage.src = src;
  },
  getImage: function(key) {
    return Loader.images[key];
  },
  getProgress: function() {
    return Loader.numberComplete / Loader.numberOfImages;
  },
  doneLoading: function() {
    return this.getProgress() === 1;
  }
};

Vector = SAT.Vector;

Circle = SAT.Circle;

Polygon = SAT.Polygon;

Box = SAT.Box;

MathHelpers = {
  toDegrees: function(radians) {
    return radians * (180 / Math.PI);
  },
  toRadians: function(degrees) {
    return degrees * (Math.PI / 180);
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
  ENTER: 13,
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
    this.position = new Vector(x, y);
    this.stage = null;
    this.body = null;
    this.destroy = false;
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
    return this.position = new Vector(x, y);
  };

  Actor.prototype.setDirection = function(degrees) {
    return this.direction = degrees * (Math.PI / 180);
  };

  Actor.prototype.shouldDestroy = function() {
    return this.destroy;
  };

  Actor.prototype.lookAt = function(point) {
    if (!(point instanceof Vector)) {
      console.log('ERROR: ' + point + ' is not an Point');
      return;
    }
    return this.direction = Math.atan2(point.x - this.position.y, point.x - this.position.x);
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
    this.updateBody = bind(this.updateBody, this);
    SquareActor.__super__.constructor.call(this, x, y, direction);
    this.body = new Box(this.position, this.width, this.height).toPolygon();
    this.body.rotate(direction);
  }

  SquareActor.prototype.updateBody = function() {
    this.body = new Box(this.position, this.width, this.height).toPolygon();
    return this.body.rotate(direction);
  };

  SquareActor.prototype.drawDebug = function() {
    var context;
    if (!((this.stage != null) || (this.stage.getContext() != null))) {
      console.log('Stage context cannot is null, or there is no context set');
      return;
    }
    context = this.stage.getContext();
    context.save();
    context.translate(this.position.x, this.position.y);
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
    return context.restore();
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
    this.updateBody = bind(this.updateBody, this);
    CircleActor.__super__.constructor.call(this, x, y, direction);
    this.body = new Circle(this.position, this.radius);
  }

  CircleActor.prototype.updateBody = function() {
    this.body.pos = this.position;
    return this.body.r = this.radius;
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
    context.save();
    context.translate(this.body.pos.x, this.body.pos.y);
    context.rotate(this.direction);
    context.beginPath();
    context.arc(0, 0, this.body.r, 0, 2 * Math.PI);
    context.fillStyle = colour;
    context.fill();
    context.closePath();
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.body.r, 0);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.stroke();
    context.closePath();
    return context.restore();
  };

  return CircleActor;

})(Actor);

TileMap = (function() {
  function TileMap(cols, rows, tileSize, tiles, ctx) {
    this.cols = cols != null ? cols : 0;
    this.rows = rows != null ? rows : 0;
    this.tileSize = tileSize != null ? tileSize : 0;
    this.tiles = tiles != null ? tiles : [];
    this.ctx = ctx != null ? ctx : void 0;
  }

  TileMap.prototype.getTile = function(col, row) {
    return this.tiles[row * this.cols + col];
  };

  TileMap.prototype.render = function() {
    if (this._render) {
      return this._render();
    }
  };

  return TileMap;

})();

Timer = (function() {
  function Timer(timeout) {
    this.timeout = timeout;
    this.restart = bind(this.restart, this);
    this.end = bind(this.end, this);
    this.tick = bind(this.tick, this);
    this.elapsed = 0;
  }

  Timer.prototype.tick = function(step) {
    return this.elapsed += step;
  };

  Timer.prototype.end = function(step) {
    return this.elapsed = this.timeout;
  };

  Timer.prototype.hasEnded = function() {
    return this.elapsed >= this.timeout;
  };

  Timer.prototype.restart = function() {
    return this.elapsed = 0;
  };

  return Timer;

})();

STATE = {
  finished: 0,
  running: 1
};

Stage = (function() {
  function Stage(width1, height1, ctx) {
    this.width = width1;
    this.height = height1;
    this.ctx = ctx != null ? ctx : void 0;
    this.setContext = bind(this.setContext, this);
    this.addActor = bind(this.addActor, this);
    this.actors = [];
    this.bounds = new Box(new Vector(), this.width, this.height).toPolygon();
    this.state = STATE.running;
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

  Stage.prototype.init = function() {
    this.actors = [];
    this.state = STATE.running;
    if (this._init) {
      return this._init();
    }
  };

  Stage.prototype.update = function(step) {
    var actor, i, len, ref, results;
    if (this._update) {
      this._update(step);
    }
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
    if (this._render) {
      this._render();
    }
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

  Stage.prototype.isCircleInBounds = function(circle) {
    var collided, response;
    if (!(circle instanceof Circle)) {
      retrun(false);
    }
    response = new SAT.Response();
    collided = SAT.testCirclePolygon(circle, this.bounds, response);
    if (collided && response.aInB) {
      return true;
    }
    return false;
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
      return Game.mousePoint = new Vector(event.clientX - rect.left, event.clientY - rect.top);
    });
    this.running = false;
    this.setup = setup || void 0;
    this.stage = null;
    this.startTime = 0;
    this.accumulator = 0;
    this.actualFps = 0;
    if (this.setup) {
      this.setup();
    }
  }

  Game.prototype.setStage = function(stage, onFinish) {
    if (onFinish == null) {
      onFinish = void 0;
    }
    if (!(stage instanceof Stage)) {
      console.log('ERROR: ' + stage + ' is not an Stage');
      return;
    }
    this.stage = stage;
    this.stage.setContext(this.canvas.ctx);
    return this.stage.init();
  };

  Game.prototype.setStageTransition = function(transition) {
    return this._transition = transition;
  };

  Game.prototype.backgroundColor = function(color) {
    return this.canvas.style.backgroundColor = color;
  };

  Game.prototype.border = function(border) {
    return this.canvas.style.border = border;
  };

  Game.prototype.getMouseLocation = function() {
    return Game.mousePoint;
  };

  Game.prototype.start = function() {
    this.running = true;
    this.startTime = Date.now();
    this.gameStep();
    return window.onEachFrame(this.render);
  };

  Game.prototype.update = function(step) {
    if (!Loader.doneLoading()) {
      return;
    }
    if (this._transition != null) {
      this._transition();
    }
    if (this.stage != null) {
      return this.stage.update(step);
    }
  };

  Game.prototype.render = function() {
    if (!Loader.doneLoading()) {
      return;
    }
    if (this.running == null) {
      return;
    }
    this.canvas.ctx.save();
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.ctx.restore();

    /*
    
    @canvas.ctx.clearRect(0, 0, @canvas.width, @canvas.height)
    @canvas.ctx.fillStyle = "Black"
    @canvas.ctx.font = "normal 16pt Arial"
    @canvas.ctx.fillText(Math.round(@actualFps), @canvas.width - 30, 20)
     */
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
    this.actualFps = 1000 / elapsedMs;
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
