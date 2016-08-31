var Bullet, LeftPlayer, Player, RightPlayer,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Player = (function(superClass) {
  extend(Player, superClass);

  function Player(x, y) {
    this._update = bind(this._update, this);
    Player.__super__.constructor.call(this, x, y, 0, 15);
    this.controller = Controller.get();
    this.velx = 0;
    this.vely = 0;
    this.maxSpeed = 4;
    this.shootSpeed = 100;
    this.elapsedTime = 0;
  }

  Player.prototype.shoot = function(step) {
    this.elapsedTime += step;
    if (this.elapsedTime >= this.shootSpeed) {
      this.elapsedTime -= this.shootSpeed;
      return this.stage.addActor(new Bullet(this.position.x, this.position.y, this.direction));
    }
  };

  Player.prototype._render = function() {
    return this.drawDebug();
  };

  Player.prototype._update = function(step) {
    var acceleration, friction, mouseLoc, stepFraction, x, y;
    x = this.position.x;
    y = this.position.y;
    stepFraction = step / 100;
    friction = 1.5;
    acceleration = 2;
    if (this.controller.isPressed(Keys.LEFT) || this.controller.isPressed(Keys.A)) {
      if (this.velx > -this.maxSpeed) {
        this.velx -= acceleration * stepFraction;
        if (this.velx < -this.maxSpeed) {
          this.velx = -this.maxSpeed;
        }
      }
    } else if (this.velx < 0) {
      this.velx += friction * stepFraction;
      if (this.velx > 0) {
        this.velx = 0;
      }
    }
    if (this.controller.isPressed(Keys.RIGHT) || this.controller.isPressed(Keys.D)) {
      if (this.velx < this.maxSpeed) {
        this.velx += acceleration * stepFraction;
        if (this.velx > this.maxSpeed) {
          this.velx = this.maxSpeed;
        }
      }
    } else if (this.velx > 0) {
      this.velx -= friction * stepFraction;
      if (this.velx < 0) {
        this.velx = 0;
      }
    }
    if (this.controller.isPressed(Keys.UP) || this.controller.isPressed(Keys.W)) {
      if (this.vely > -this.maxSpeed) {
        this.vely -= acceleration * stepFraction;
        if (this.vely < -this.maxSpeed) {
          this.vely = -this.maxSpeed;
        }
      }
    } else if (this.vely < 0) {
      this.vely += friction * stepFraction;
      if (this.vely > 0) {
        this.vely = 0;
      }
    }
    if (this.controller.isPressed(Keys.DOWN) || this.controller.isPressed(Keys.S)) {
      if (this.vely < this.maxSpeed) {
        this.vely += acceleration * stepFraction;
        if (this.vely > this.maxSpeed) {
          this.vely = this.maxSpeed;
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
      this.lookAt(mouseLoc);
    }
    return this.updateBody();
  };

  return Player;

})(CircleActor);

LeftPlayer = (function(superClass) {
  extend(LeftPlayer, superClass);

  function LeftPlayer(x, y) {
    this._update = bind(this._update, this);
    LeftPlayer.__super__.constructor.call(this, x, y);
  }

  LeftPlayer.prototype._render = function() {
    return this.drawDebug();
  };

  LeftPlayer.prototype._update = function(step) {
    var acceleration, friction, newPosition, stepFraction, x, y;
    x = this.position.x;
    y = this.position.y;
    stepFraction = step / 100;
    friction = 1.5;
    acceleration = 2;
    if (this.controller.isPressed(Keys.D)) {
      this.shoot(step);
    }
    if (this.controller.isPressed(Keys.W)) {
      if (this.vely > -this.maxSpeed) {
        this.vely -= acceleration * stepFraction;
        if (this.vely < -this.maxSpeed) {
          this.vely = -this.maxSpeed;
        }
      }
    } else if (this.vely < 0) {
      this.vely += friction * stepFraction;
      if (this.vely > 0) {
        this.vely = 0;
      }
    }
    if (this.controller.isPressed(Keys.S)) {
      if (this.vely < this.maxSpeed) {
        this.vely += acceleration * stepFraction;
        if (this.vely > this.maxSpeed) {
          this.vely = this.maxSpeed;
        }
      }
    } else if (this.vely > 0) {
      this.vely -= friction * stepFraction;
      if (this.vely < 0) {
        this.vely = 0;
      }
    }
    newPosition = new Circle(new Vector(x, y + this.vely), this.radius);
    if (this.stage.isCircleInBounds(newPosition)) {
      this.setPosition(x, y + this.vely);
    }
    return this.updateBody();
  };

  return LeftPlayer;

})(Player);

RightPlayer = (function(superClass) {
  extend(RightPlayer, superClass);

  function RightPlayer(x, y) {
    this._update = bind(this._update, this);
    RightPlayer.__super__.constructor.call(this, x, y);
    this.direction = MathHelpers.toRadians(180);
  }

  RightPlayer.prototype._render = function() {
    return this.drawDebug('#0000FF');
  };

  RightPlayer.prototype._update = function(step) {
    var acceleration, friction, newPosition, stepFraction, x, y;
    x = this.position.x;
    y = this.position.y;
    stepFraction = step / 100;
    friction = 1.5;
    acceleration = 2;
    if (this.controller.isPressed(Keys.LEFT)) {
      console.log(this.direction);
      this.shoot(step);
    }
    if (this.controller.isPressed(Keys.UP)) {
      if (this.vely > -this.maxSpeed) {
        this.vely -= acceleration * stepFraction;
        if (this.vely < -this.maxSpeed) {
          this.vely = -this.maxSpeed;
        }
      }
    } else if (this.vely < 0) {
      this.vely += friction * stepFraction;
      if (this.vely > 0) {
        this.vely = 0;
      }
    }
    if (this.controller.isPressed(Keys.DOWN)) {
      if (this.vely < this.maxSpeed) {
        this.vely += acceleration * stepFraction;
        if (this.vely > this.maxSpeed) {
          this.vely = this.maxSpeed;
        }
      }
    } else if (this.vely > 0) {
      this.vely -= friction * stepFraction;
      if (this.vely < 0) {
        this.vely = 0;
      }
    }
    newPosition = new Circle(new Vector(x, y + this.vely), this.radius);
    if (this.stage.isCircleInBounds(newPosition)) {
      this.setPosition(x, y + this.vely);
    }
    return this.updateBody();
  };

  return RightPlayer;

})(Player);

Bullet = (function(superClass) {
  extend(Bullet, superClass);

  function Bullet(x, y, direction) {
    if (direction == null) {
      direction = 0;
    }
    Bullet.__super__.constructor.call(this, x, y, direction, 5);
  }

  Bullet.prototype._render = function() {
    return this.drawDebug();
  };

  Bullet.prototype._update = function(step) {
    var moveVector, speed, stepFraction;
    stepFraction = step / 100;
    speed = 30 * stepFraction;
    moveVector = new Vector(speed, 0);
    moveVector.rotate(this.direction);
    this.position.add(moveVector);
    return this.updateBody();
  };

  return Bullet;

})(CircleActor);
