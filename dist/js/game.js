var Bullet, EFFECTS, EMPTY, GameOverStage, Images, LeftPlayer, Mode, Monster, MonsterSpawner, Player, RANDOM_TILES, RightPlayer, SplitStage, SplitTileMap, StartStage, i, j,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

EFFECTS = {
  stereoscopic: function(string, font, ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = 0.8;
    ctx.font = font;
    ctx.fillStyle = 'red';
    ctx.fillText(string, -3, 0);
    ctx.fillStyle = 'blue';
    ctx.fillText(string, 3, 0);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = 'black';
    ctx.fillText(string, 0, 0);
    return ctx.restore();
  },
  fillTextShadow: function(string, font, ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.font = font;
    ctx.fillStyle = 'blue';
    ctx.fillText(string, 3, 2);
    ctx.fillStyle = 'red';
    ctx.fillText(string, 0, 0);
    return ctx.restore();
  }
};

Images = {
  HEART: 'heart',
  HEART_DATA: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAA Bzenr0AAAAwElEQVRYR+2WSw6AIAxEy/0PjcGkpGIr/ahlgWun8xwQpkDyU5 L94RGgAlQOsACvs77fZt8ApCEjyAjh1XUA7QAKghARbQggsn8Q/gTwfEHEHL UNomSZd4gNsBPYCaSfAxtgiQQyIC6X0RIAf0LQMuNuRN7reGxSbCf86nTkuq RYSt+GkIqsqxVb45fM2VY8Do8m8WSuAoj8HTNzNYAHQmNuAsClmS2J1pg0Y+ uWkmu81dyVAMXFNDzGoQTsmcmKA+7qQBPPVyQkAAAAAElFTkSuQmCC',
  TILES: 'tiles',
  TILES_DATA: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAA Bzenr0AAAAoklEQVRYR+2VUQqAIAyG8yKB97+Qb0IXKSYMxjBZ5ibKeqkHNz 9/7FtIKd3HxCcAQIxnF0LOV6n7U28KAMAAS9+mAJAWbo7f5gAUAmCmAOCFcw BPYI0EuDyoMtVMWDNWTbdqAFwWb65XBZBMp2EAks201hQVazWX9N1rFtBRKz n9GiJqnYT/BS1p1fp4AvslILn5fJjt5QFPwBPoTuBr4cj1DyDKSRC8Z4KSAA AAAElFTkSuQmCC',
  PORTAL: 'portal',
  PORTAL_DATA: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAEgCAYAAA DVDXFAAAABe0lEQVR4Xu3dQRLBMBgG0DqCK9i5kOPIpMdxITtXcASmpR2ihC hq5lkhzZ/PkzTdZVYVvmKMh8uuIYRZSam2U1qspFBJnya0AAQI3Agsw7pdUf uSdfWgz/zcto11f9XgMpxsgN2LIovk+rcFBJicQBoo/c8/PgcEIDCqQHPT2l SHq2e8dC9IBywN0N0gV9Xpaax/kBSAAAECBAgQIECAAAECBAgQIECAAAECBA gQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBA gQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBA gQIECAAAECBAgQIECAAAECBAgQIECAAIGfCsQY+zPPl2HdHk3+qXPPt7Hujj 6vQginw88FIPCXAv1UvvNmkXw/P38ebRUI8HWB3IC59rfnQG6AXPvTAXKFxm wf3AvGHCBXSwAC0xHIzdah9ssdtGlvfk1JnSMv4vF75/xKqwAAAABJRU5Erk Jggg==',
  P1: 'player1',
  P1_DATA: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAA DtwH1UAAAClElEQVRoQ+1aUZLCIAylJ2hvt1xCb+CXR/AS7u3aE7ADayoNCQ ktOtNSxy9NeeS9JIZgZwpezhhXYG4649/1XkfEzxJEOvx86hi1NrErFaQFfF KAheNawiVZIkEkIVrCTwSYna9FPBbmJQQnQmv4CwGqOh+XICwmI0KL+NsF4I iGz6lMqinAzvFTAUpLD0d0LgN8WbI26ZJCBjSGX08AT2oJebUF2Cn+9hIkdT /U9zVL0M7xzy4ICVi1EVAE33kOIEj65jnkPAlnStg3TuJZAfq+D7Of+/0etn m5Xosq7tD3ZpqmBMOvS32OF28BnxQAHAfyL5dLEfHe+PF4mNvtlggAa+cEaA l/IQB2PEQ9In8YhmIxqAe4zADbOesOjj8LkKQ7EfW1yAeSYxFaxV8IQEUdlJ IqYY8WwQK0iJ8IEJec2hGPRaQEaA0/CBCn/6dqfkw+rv8t44sCeOJ8JozTlM 56rDW+1RzHcRncXUfacncAOQGOjp/8CHuHF4R6MrlBFyGAN3dwFQzDOeESJs 7C1vDJQ1IczmTke4MX+dOEov81FP2xy6Wla0jAjFvhIAaVeQfCZ0/CQEQgAG eAteb3mf+DxH/QQ/qU91Ct4At/G3EOqkgc0UC+J5m7Anjfx6wXwZjj42cEcC HEMzeKc1jnRVgrQBv4WQF0xGqIWiPCO/pxAYvLG/7N0I49pKIorftupbf5Lw 7juI1yvbzWPkeA5Lx/FvA1trG9RDzuyHT+ONf3+RkZN3wUu6Dchj9BgpZQIF Vrrxl/c52YlFVb9nAKQLCrIZQaJErZRQXB7gXQlIyS6F+znkYwrgxWEUCzaW 0d1jqD1+OeKyVfKkPcepp9qzJA2oBEZC0icg6tJVUqETW+L/X/DwgFwz+ZMT uKAAAAAElFTkSuQmCC',
  P2: 'player2',
  P2_DATA: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAA DtwH1UAAACiElEQVRoQ+2aYXaDIAzH8QR6u/USPUI/9Qb1Et3t9AT0RY0FJC ThabeCfNnbjPwlPxIIrDGiZq3IbDVqGp09Z12uPuGo7YCfT85J8/PLJWanBV KPfgDgPXCpwzksPhAORH36DoB58Hs5PgTzBkFBqFN/ARAfvDt79wBDQ6hXPw nAzekugFwwWgA16K8AYjM85Wh8po2M+b0wDVlbq34SALXA5kbAe0bLANSgz6 YgbpejeZ6TgjT9c7b/Uf/cBa3U/mYXdtYBXth8vg45K+Fo3vpcJb4CaNvWju O4ATL/feDSq/f88ein32+32/Qz1m/YYa36HoCYs8Ax9/vdXK9XFQQw7vt+hc CBAJ0a9TcA1F4OXhgGP1oAghsNFAgEUJv+BGCvwaPzQggYDVRaqln/EAAIIk xdbjS468LeAL5J/1AAsYjAdeETAL5B39v1HDETY2sCtTuqUZ+sA8LDMSjjw9 1x13UGtqgx27btDLUW8NvT7eFcqfrJQgwdi2co1jQeBQoAhP76jnObDPbY0r WBfyxQsn7i8tyf7/b5G73w7do2GgUIASLBbZKibLavQ1/03wvWGMvdVTaXH8 8EZy0CkDt+WwmUrM8CmAYPjbp5AU8vzwACtililjBoDOSuvFa6PuuY5OwL/w clca2VC6F0/SSA5OxbnI+O5RyVA0CyLcXUdoS+Zvzct1IpmASg7ZCzp86AqM Qk6c/tU2KvWYe4/oZxhLyqOkuL6UcBcOLhVlJqr4Eg7RMGJbWV6kv701bzJw DF3YRky1A0AHAANxPRAZydtg6R9hfOaO69XSNAS19WAW/nHTWoI/U5R6ZSme R73VGqF+HUQpb6cM0CKAn/mM2e+lpH5n7zCzmOFk5rUnzaAAAAAElFTkSuQm CC'
};

Loader.loadImage(Images.TILES, Images.TILES_DATA);

Loader.loadImage(Images.PORTAL, Images.PORTAL_DATA);

Loader.loadImage(Images.P1, Images.P1_DATA);

Loader.loadImage(Images.P2, Images.P2_DATA);

SplitTileMap = (function(superClass) {
  extend(SplitTileMap, superClass);

  function SplitTileMap(cols, rows, tileSize, tiles, ctx) {
    SplitTileMap.__super__.constructor.call(this, cols * 2, rows * 2, tileSize / 2, tiles, ctx);
  }

  SplitTileMap.prototype._render = function() {
    var c, image, j, r, ref, results, tile, x, xOffset, y, yOffset;
    image = Loader.getImage(Images.TILES);
    results = [];
    for (c = j = 0, ref = this.cols; 0 <= ref ? j <= ref : j >= ref; c = 0 <= ref ? ++j : --j) {
      results.push((function() {
        var k, ref1, results1;
        results1 = [];
        for (r = k = 0, ref1 = this.rows; 0 <= ref1 ? k <= ref1 : k >= ref1; r = 0 <= ref1 ? ++k : --k) {
          tile = this.getTile(c, r);
          x = c * this.tileSize;
          y = r * this.tileSize;
          xOffset = 0;
          yOffset = 0;
          if (tile === 0) {
            xOffset = 0;
            yOffset = 0;
          } else if (tile = 1) {
            xOffset = 1;
            yOffset = 0;
          } else if (tile = 2) {
            xOffset = 0;
            yOffset = 1;
          } else if (tile = 3) {
            xOffset = 1;
            yOffset = 1;
          }
          this.ctx.save();
          this.ctx.drawImage(image, xOffset * this.tileSize, yOffset * this.tileSize, this.tileSize, this.tileSize, x, y, this.tileSize, this.tileSize);
          results1.push(this.ctx.restore());
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  return SplitTileMap;

})(TileMap);

EMPTY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

RANDOM_TILES = [];

for (i = j = 0; j <= 179; i = ++j) {
  RANDOM_TILES.push(Math.round(Math.random() * 3));
}

SplitStage = (function(superClass) {
  extend(SplitStage, superClass);

  SplitStage.tileWidth = 32;

  SplitStage.wallWidth = SplitStage.tileWidth;

  SplitStage.gutterHeight = SplitStage.tileWidth;

  function SplitStage(width, height, ctx) {
    this.testBulletCollisions = bind(this.testBulletCollisions, this);
    this._update = bind(this._update, this);
    this._init = bind(this._init, this);
    SplitStage.__super__.constructor.call(this, width, height - SplitStage.gutterHeight, ctx);
  }

  SplitStage.prototype._init = function() {
    var cols, rows;
    cols = this.width / SplitStage.tileWidth;
    rows = this.height / SplitStage.tileWidth;
    this.tilemap = new SplitTileMap(cols, rows, SplitStage.tileWidth, RANDOM_TILES, this.ctx);
    this.wall = new Box(new Vector(this.width / 2 - SplitStage.wallWidth / 2, 0), SplitStage.wallWidth, this.height).toPolygon();
    this.lives = 3;
    this.leftPlayer = new LeftPlayer(30, this.height / 2);
    this.addActor(this.leftPlayer);
    this.rightPlayer = new RightPlayer(610, this.height / 2);
    this.addActor(this.rightPlayer);
    this.monsterSpawner = new MonsterSpawner(this.width / 2, this.height / 2);
    return this.addActor(this.monsterSpawner);
  };

  SplitStage.prototype._render = function() {
    this.tilemap.render();
    this.drawWall();
    return this.drawGutter();
  };

  SplitStage.prototype._update = function(step) {
    var actor, k, len, newActors, ref;
    if (this.lives <= 0) {
      this.state = STATE.finished;
      return;
    }
    this.testBulletCollisions();
    newActors = [];
    ref = this.actors;
    for (k = 0, len = ref.length; k < len; k++) {
      actor = ref[k];
      if (!actor.shouldDestroy()) {
        newActors.push(actor);
      }
    }
    return this.actors = newActors;
  };

  SplitStage.prototype.drawWall = function() {
    var ctx, portal;
    portal = Loader.getImage(Images.PORTAL);
    ctx = this.getContext();
    ctx.save();
    ctx.drawImage(portal, this.wall.pos.x, this.wall.pos.y, SplitStage.wallWidth, this.height);
    return ctx.restore();
  };

  SplitStage.prototype.drawGutter = function() {
    var ctx, xPadding, yPadding;
    ctx = this.getContext();
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, this.height, this.width, this.height + SplitStage.gutterHeight);
    xPadding = 11;
    yPadding = 22;
    ctx.fillStyle = 'White';
    ctx.font = 'normal 12pt Arial';
    ctx.fillText('Anomalies resolved: ' + this.leftPlayer.score, xPadding, this.height + yPadding);
    ctx.save();
    ctx.scale(-1, 1);
    ctx.fillStyle = 'White';
    ctx.font = 'normal 12pt Arial';
    ctx.fillText('Anomalies resolved: ' + this.rightPlayer.score, -this.width + xPadding, this.height + yPadding);
    return ctx.restore();
  };

  SplitStage.prototype.testBulletCollisions = function() {
    var bullet, bullets, collide, collideLeftPlayer, collideRightPlayer, k, l, len, len1, len2, m, monster, monsters, results;
    bullets = this.actors.filter(this.isInstanceOfBullet);
    for (k = 0, len = bullets.length; k < len; k++) {
      bullet = bullets[k];
      collide = SAT.testCirclePolygon(bullet.body, this.wall);
      if (collide) {
        bullet.destroy = true;
      }
    }
    monsters = this.actors.filter(this.isInstanceOfMonster);
    results = [];
    for (l = 0, len1 = monsters.length; l < len1; l++) {
      monster = monsters[l];
      for (m = 0, len2 = bullets.length; m < len2; m++) {
        bullet = bullets[m];
        collide = SAT.testCircleCircle(bullet.body, monster.body);
        if (collide) {
          if (bullet.firedBy instanceof Player) {
            bullet.firedBy.addScore(1);
          }
          bullet.destroy = true;
          monster.destroy = true;
        }
      }
      collideLeftPlayer = SAT.testCircleCircle(this.leftPlayer.body, monster.body);
      collideRightPlayer = SAT.testCircleCircle(this.rightPlayer.body, monster.body);
      if (collideLeftPlayer || collideRightPlayer) {
        this.lives--;
        monster.destroy = true;
      }
      if (!this.isCircleInBounds(monster.body)) {
        this.lives--;
        results.push(monster.destroy = true);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  SplitStage.prototype.isInstanceOfBullet = function(clazz) {
    return clazz instanceof Bullet;
  };

  SplitStage.prototype.isInstanceOfMonster = function(clazz) {
    return clazz instanceof Monster;
  };

  return SplitStage;

})(Stage);

StartStage = (function(superClass) {
  extend(StartStage, superClass);

  function StartStage(width, height, ctx) {
    this._update = bind(this._update, this);
    this._init = bind(this._init, this);
    StartStage.__super__.constructor.call(this, width, height, ctx);
    this.controller = Controller.get();
  }

  StartStage.prototype._init = function() {
    this.title = "Double Vision";
    return this.entryText = "Hit ENTER to begin";
  };

  StartStage.prototype._update = function(step) {
    if (this.controller.isPressed(Keys.ENTER)) {
      return this.state = STATE.finished;
    }
  };

  StartStage.prototype._render = function() {
    this.ctx.save();
    EFFECTS.stereoscopic(this.title, '72px Georgia', this.ctx, 60, 140);
    EFFECTS.stereoscopic(this.entryText, '42px Georgia', this.ctx, 100, 220);
    return this.ctx.restore();
  };

  return StartStage;

})(Stage);

GameOverStage = (function(superClass) {
  extend(GameOverStage, superClass);

  function GameOverStage(width, height, ctx) {
    this._update = bind(this._update, this);
    this._init = bind(this._init, this);
    GameOverStage.__super__.constructor.call(this, width, height, ctx);
    this.controller = Controller.get();
  }

  GameOverStage.prototype._init = function() {
    this.gameOverText = "GAME OVER";
    this.retryText = "Hit ENTER restart reality.";
    return this.background = this.getNoise();
  };

  GameOverStage.prototype._update = function(step) {
    if (this.controller.isPressed(Keys.ENTER)) {
      return this.state = STATE.finished;
    }
  };

  GameOverStage.prototype._render = function() {
    this.ctx.save();
    this.background = this.getNoise();
    this.ctx.putImageData(this.background, 0, 0);
    EFFECTS.fillTextShadow(this.gameOverText, '72px Georgia', this.ctx, 80, 120);
    EFFECTS.fillTextShadow(this.retryText, '42px Georgia', this.ctx, 40, 200);
    return this.ctx.restore();
  };

  GameOverStage.prototype.getNoise = function() {
    var color, imageData;
    imageData = this.ctx.createImageData(this.width, this.height);
    i = 0;
    while (i < imageData.data.length) {
      color = (Math.random() * 120) | 0;
      imageData.data[i++] = 0;
      imageData.data[i++] = 0;
      imageData.data[i++] = 0;
      imageData.data[i++] = color;
    }
    return imageData;
  };

  return GameOverStage;

})(Stage);

Monster = (function(superClass) {
  extend(Monster, superClass);

  function Monster(x, y, direction, color1) {
    if (direction == null) {
      direction = 0;
    }
    this.color = color1 != null ? color1 : '#00FF00';
    Monster.__super__.constructor.call(this, x, y, direction, 16);
    this.speed = Math.round(Math.random() * 2) + 3;
  }

  Monster.prototype._render = function() {
    return this.drawDebug(this.color);
  };

  Monster.prototype._update = function(step) {
    var adjustedSpeed, moveVector, stepFraction;
    stepFraction = step / 100;
    adjustedSpeed = this.speed * stepFraction;
    moveVector = new Vector(adjustedSpeed, 0);
    moveVector.rotate(this.direction);
    this.position.add(moveVector);
    return this.updateBody();
  };

  return Monster;

})(CircleActor);

Mode = {
  MIRROR: 0,
  FLIPPED: 1,
  VARIANCE: 2
};

MonsterSpawner = (function(superClass) {
  extend(MonsterSpawner, superClass);

  function MonsterSpawner(x, y) {
    this.updateMode = bind(this.updateMode, this);
    this._update = bind(this._update, this);
    MonsterSpawner.__super__.constructor.call(this, x, y);
    this.mode = Mode.MIRROR;
    this.spawnTimer = new Timer(2000);
    this.modeTimer = new Timer(10000);
  }

  MonsterSpawner.prototype._update = function(step) {
    this.spawnTimer.tick(step);
    this.modeTimer.tick(step);
    if (this.spawnTimer.hasEnded()) {
      this.spawnTimer.restart();
      this.spawnMonsters();
    }
    if (this.modeTimer.hasEnded()) {
      this.modeTimer.restart();
      return this.updateMode();
    }
  };

  MonsterSpawner.prototype.spawnMonsters = function() {
    var max, min, spawnA, spawnB;
    min = 20;
    max = this.stage.height - (min * 2);
    spawnA = 0;
    spawnB = 0;
    switch (this.mode) {
      case Mode.MIRROR:
        spawnA = spawnB = Math.floor(Math.random() * max) + min;
        break;
      case Mode.FLIPPED:
        spawnA = Math.floor(Math.random() * max) + min;
        spawnB = this.stage.height - spawnA;
        break;
      case Mode.VARIANCE:
        spawnA = Math.floor(Math.random() * max) + min;
        spawnB = Math.floor(Math.random() * max) + min;
        break;
      default:
        spawnA = spawnB = Math.floor(Math.random() * max) + min;
    }
    this.stage.addActor(new Monster(this.stage.width / 2, spawnA, 0, '#FF0000'));
    return this.stage.addActor(new Monster(this.stage.width / 2, spawnB, MathHelpers.toRadians(180), '#0000FF'));
  };

  MonsterSpawner.prototype.updateMode = function() {
    var index, modes;
    modes = [Mode.MIRROR, Mode.FLIPPED, Mode.VARIANCE];
    modes.splice(this.mode, 1);
    index = Math.floor(Math.random() * modes.length);
    return this.mode = modes[index];
  };

  return MonsterSpawner;

})(Actor);

Player = (function(superClass) {
  extend(Player, superClass);

  function Player(x, y) {
    this.addScore = bind(this.addScore, this);
    Player.__super__.constructor.call(this, x, y, 0, 16);
    this.controller = Controller.get();
    this.velx = 0;
    this.vely = 0;
    this.maxSpeed = 5;
    this.score = 0;
  }

  Player.prototype.addScore = function(n) {
    return this.score += n;
  };

  Player.prototype._render = function() {
    return this.drawDebug();
  };

  return Player;

})(CircleActor);

LeftPlayer = (function(superClass) {
  extend(LeftPlayer, superClass);

  function LeftPlayer(x, y) {
    this._update = bind(this._update, this);
    LeftPlayer.__super__.constructor.call(this, x, y);
    this.reloadTimer = new Timer(500);
  }

  LeftPlayer.prototype._render = function() {
    var context;
    context = this.stage.getContext();
    context.save();
    this.drawDebug();
    return context.restore();
  };

  LeftPlayer.prototype._update = function(step) {
    var acceleration, friction, newPosition, stepFraction, x, y;
    this.reloadTimer.tick(step);
    x = this.position.x;
    y = this.position.y;
    stepFraction = step / 100;
    friction = 100;
    acceleration = 2;
    if (!this.controller.isPressed(Keys.D)) {
      this.reloadTimer.end();
    }
    if (this.reloadTimer.hasEnded() && this.controller.isPressed(Keys.D)) {
      this.reloadTimer.restart();
      this.stage.addActor(new Bullet(this.position.x + 10, this.position.y, this.direction, this));
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
    this.reloadTimer = new Timer(500);
  }

  RightPlayer.prototype._render = function() {
    return this.drawDebug('#0000FF');
  };

  RightPlayer.prototype._update = function(step) {
    var acceleration, friction, newPosition, stepFraction, x, y;
    this.reloadTimer.tick(step);
    x = this.position.x;
    y = this.position.y;
    stepFraction = step / 100;
    friction = 100;
    acceleration = 2;
    if (!this.controller.isPressed(Keys.LEFT)) {
      this.reloadTimer.end();
    }
    if (this.reloadTimer.hasEnded() && this.controller.isPressed(Keys.LEFT)) {
      this.reloadTimer.restart();
      this.stage.addActor(new Bullet(this.position.x - 10, this.position.y, this.direction, this));
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

  function Bullet(x, y, direction, firedBy) {
    if (direction == null) {
      direction = 0;
    }
    this.firedBy = firedBy;
    Bullet.__super__.constructor.call(this, x, y, direction, 5);
    this.bulletSpeed = 120;
  }

  Bullet.prototype._render = function() {
    return this.drawDebug('#00FF00');
  };

  Bullet.prototype._update = function(step) {
    var moveVector, speed, stepFraction;
    stepFraction = step / 100;
    speed = this.bulletSpeed * stepFraction;
    moveVector = new Vector(speed, 0);
    moveVector.rotate(this.direction);
    this.position.add(moveVector);
    if (!this.stage.isCircleInBounds(this.body)) {
      this.destroy = true;
    }
    return this.updateBody();
  };

  return Bullet;

})(CircleActor);
