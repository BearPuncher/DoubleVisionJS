var Actor, Circle, CircleActor, Controller, Game, Keys, Loader, MathHelpers, PreloaderStage, Rect, STATE, Shape, Sprite, Stage, TileMap, Timer, Vector,
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

Vector = (function() {
  function Vector(x3, y3) {
    this.x = x3 != null ? x3 : 0;
    this.y = y3 != null ? y3 : 0;
    this.subtract = bind(this.subtract, this);
    this.add = bind(this.add, this);
    this.rotate = bind(this.rotate, this);
  }

  Vector.prototype.rotate = function(radians) {
    var oldX, oldY;
    oldX = this.x;
    oldY = this.y;
    this.x = oldX * Math.cos(radians) - oldY * Math.sin(radians);
    return this.y = oldX * Math.sin(radians) + oldY * Math.cos(radians);
  };

  Vector.prototype.add = function(vector) {
    if (!(vector instanceof Vector)) {
      return;
    }
    this.x += vector.x;
    return this.y += vector.y;
  };

  Vector.prototype.subtract = function(vector) {
    if (!(vector instanceof Vector)) {
      return;
    }
    this.x -= vector.x;
    return this.y -= vector.y;
  };

  return Vector;

})();

Shape = (function() {
  function Shape(position) {
    this.position = position;
  }

  return Shape;

})();

Circle = (function(superClass) {
  extend(Circle, superClass);

  function Circle(vector, radius) {
    this.radius = radius != null ? radius : 0;
    Circle.__super__.constructor.call(this, vector);
  }

  return Circle;

})(Shape);

Rect = (function(superClass) {
  extend(Rect, superClass);

  function Rect(vector, w, h) {
    this.w = w != null ? w : 0;
    this.h = h != null ? h : 0;
    Rect.__super__.constructor.call(this, vector);
  }

  return Rect;

})(Shape);

MathHelpers = {
  isCircleInRect: function(circle, rect) {
    var circleMaxX, circleMaxY, circleMinX, circleMinY, rectMaxX, rectMaxY, rectMinX, rectMinY;
    if (!(circle instanceof Circle && rect instanceof Rect)) {
      return;
    }
    rectMinX = rect.position.x;
    rectMaxX = rectMinX + rect.w;
    rectMinY = rect.position.y;
    rectMaxY = rectMinY + rect.h;
    circleMinX = circle.position.x - circle.radius;
    circleMaxX = circle.position.x + circle.radius;
    circleMinY = circle.position.y - circle.radius;
    circleMaxY = circle.position.y + circle.radius;
    if (rectMinX > circleMinX || rectMaxX < circleMaxX || rectMinY > circleMinY || rectMaxY < circleMaxY) {
      return false;
    } else {
      return true;
    }
  },
  doesCircleRectIntersect: function(circle, rect) {
    var circlePos, deltaX, deltaY, rectPos;
    if (!(circle instanceof Circle && rect instanceof Rect)) {
      return;
    }
    circlePos = circle.position;
    rectPos = rect.position;
    deltaX = circlePos.x - Math.max(rectPos.x, Math.min(circlePos.x, rectPos.x + rect.w));
    deltaY = circlePos.y - Math.max(rectPos.y, Math.min(circlePos.y, rectPos.y + rect.h));
    return (deltaX * deltaX + deltaY * deltaY) < (circle.radius * circle.radius);
  },
  doesCircleCircleIntersect: function(circleA, circleB) {
    var circlePosA, circlePosB, distance;
    if (!(circleA instanceof Circle && circleB instanceof Circle)) {
      return;
    }
    circlePosA = circleA.position;
    circlePosB = circleB.position;
    distance = MathHelpers.getDistance(circlePosA.x, circlePosA.y, circlePosB.x, circlePosB.y);
    if ((circleA.radius + circleB.radius) < distance) {
      return false;
    } else {
      return true;
    }
  },
  toDegrees: function(radians) {
    return radians * (180 / Math.PI);
  },
  toRadians: function(degrees) {
    return degrees * (Math.PI / 180);
  },
  getDistance: function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
};

Sprite = (function() {
  function Sprite(image, spriteSize) {
    this.image = image;
    this.spriteSize = spriteSize;
    this.updateFrame = bind(this.updateFrame, this);
    this.setCycle = bind(this.setCycle, this);
    this.flipped = false;
    this.frame = 0;
    this.timer = void 0;
  }

  Sprite.prototype.draw = function(x, y, ctx, opacity) {
    var cycle, dx, dy;
    cycle = this.cycle[this.frame];
    dx = cycle.col * this.spriteSize;
    dy = cycle.row * this.spriteSize;
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.drawImage(this.image, dx, dy, this.spriteSize, this.spriteSize, 0, 0, this.spriteSize, this.spriteSize);
    return ctx.restore();
  };

  Sprite.prototype.setCycle = function(cycle1, interval) {
    this.cycle = cycle1;
    this.interval = interval != null ? interval : 0;
    this.cycleLength = this.cycle.length;
    this.frame = 0;
    return this.timer = new Timer(this.interval);
  };

  Sprite.prototype.updateFrame = function(step) {
    this.timer.tick(step);
    if (this.timer.hasEnded()) {
      this.frame = (this.frame + 1) % this.cycleLength;
      return this.timer.restart();
    }
  };

  return Sprite;

})();

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
    this.position = new Vector(x, y);
    this.stage = null;
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
    return this.body = new Circle(this.position, this.radius);
  };


  /*
  drawDebug: (colour = '#FF0000') ->
    unless @stage? or @stage.getContext()?
      console.log('Stage context cannot is null, or there is no context set')
      return
  
    context = @stage.getContext()
    context.save()
    context.translate(@body.position.x, @body.position.y)
    context.rotate(@direction)
  
    context.beginPath()
    context.arc(0, 0, @body.radius, 0, 2 * Math.PI)
    context.fillStyle = colour
    context.fill()
    context.closePath()
  
     * Draw direction
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(@body.radius, 0)
    context.lineWidth = 1
    context.strokeStyle = "#000000"
    context.stroke()
    context.closePath()
  
    context.restore()
   */

  return CircleActor;

})(Actor);

TileMap = (function() {
  function TileMap(cols, rows, tileSize, tiles, ctx1) {
    this.cols = cols != null ? cols : 0;
    this.rows = rows != null ? rows : 0;
    this.tileSize = tileSize != null ? tileSize : 0;
    this.tiles = tiles != null ? tiles : [];
    this.ctx = ctx1 != null ? ctx1 : void 0;
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
  function Stage(width1, height1, ctx1) {
    this.width = width1;
    this.height = height1;
    this.ctx = ctx1 != null ? ctx1 : void 0;
    this.setContext = bind(this.setContext, this);
    this.addActor = bind(this.addActor, this);
    this.actors = [];
    this.bounds = new Rect(new Vector(), this.width, this.height);
    this.state = STATE.running;
    this.controller = Controller.get();
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

  Stage.prototype.setContext = function(ctx1) {
    this.ctx = ctx1;
  };

  Stage.prototype.getContext = function() {
    return this.ctx;
  };

  Stage.prototype.isCircleInBounds = function(circle) {
    if (!(circle instanceof Circle)) {
      retrun(false);
    }
    return MathHelpers.isCircleInRect(circle, this.bounds);
  };

  return Stage;

})();

PreloaderStage = (function(superClass) {
  extend(PreloaderStage, superClass);

  function PreloaderStage(width, height, ctx) {
    this._update = bind(this._update, this);
    PreloaderStage.__super__.constructor.call(this, width, height, ctx);
    this.progress = Loader.getProgress();
  }

  PreloaderStage.prototype.drawLoaderProgress = function() {
    var barHeight, fill, maxX, minX;
    minX = 20;
    maxX = this.width - (minX * 2);
    barHeight = 50;
    fill = maxX * this.progress;
    this.ctx.strokeRect(minX, this.height / 2 - barHeight / 2, maxX, barHeight);
    return this.ctx.fillRect(minX, this.height / 2 - barHeight / 2, fill, barHeight);
  };

  PreloaderStage.prototype._init = function() {};

  PreloaderStage.prototype._update = function(step) {
    this.progress = Loader.getProgress();
    if (Loader.doneLoading()) {
      this.state = STATE.finished;
    }
  };

  PreloaderStage.prototype._render = function() {
    this.ctx.save();
    this.drawLoaderProgress();
    return this.ctx.restore();
  };

  return PreloaderStage;

})(Stage);

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

  Game.prototype.setStage = function(stage) {
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
    if (this._transition != null) {
      this._transition();
    }
    if (this.stage != null) {
      return this.stage.update(step);
    }
  };

  Game.prototype.render = function() {
    if (this.running == null) {
      return;
    }
    this.canvas.ctx.save();
    this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.ctx.restore();
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
