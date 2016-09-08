var Bullet, EMPTY, Images, LeftPlayer, Mode, Monster, MonsterSpawner, Player, RANDOM_TILES, RightPlayer, SplitStage, SplitTileMap, i, j,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Images = {
  TILES: 'tiles',
  TILES_DATA: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAA CqaXHeAAACEElEQVR4Xu1bQW6EMAzcfRXHqh/qseoTqh575i9Vj7xqq6C6Qj QwSewQB4YrOMQTz9gx4T6O4+N24eseAHh+Goog+PqeZrue7QkAI6BzCpTSL1 A3ULgqBd4/Pm9vry+b+mKhIV0AsAWEFoAi5V4YVY8ANEEC4CCNqjQArTC6vx cBSD9ExLR1iFsAEHiXAABFgVZD1CIoq4QmurWa4sA0TbvpEtmXpkJzAHKBsF hBFxoQHA/XXtETW8VlBCztU4G0AHAWwRTB2XpGwk8mszfWOlRTbNbjxcK9ZB wZlwDk7gYlPFPDdC8iYhTIGdeMAjkqmjNBRK3TZAHkaM001jQLWISg1gGtva oUJgAOdnOMAGVXmhTIrQOWik4NoAbwy9DMiJxK0guFQkU7DIPuu0BpBSh2LT RkWcqbNURKgWgFgPQe/gAodeAMdup+QO8gHF4IrTnYWkQPByA4LCC00IB1Fm oCQMss4AYAycOXpAAj4BcBaoCDzVQXIljrhIm6FD4yhGMgWLy/iwio2VYnAG yJdX5QUltIkQLa8wGet8OhVYfODpy2H5DifFg8UoBZgFmAv8zAf4Zqbka0eV xrrxJBbQq02MyYA2B5CAoBVBOAlNNs/7bDuc7XdACBF+6j9yMQov2AHBDQBJ ATHuxVGuDBAXMNQKvm5fN2CgWQL121xGLOWEQgKcC9gPJ/AcQz7/d/AFxCoC 6C3spXAAAAAElFTkSuQmCC',
  PORTAL: 'portal',
  PORTAL_DATA: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAEgCAYAAA DVDXFAAAABe0lEQVR4Xu3dQRLBMBgG0DqCK9i5kOPIpMdxITtXcASmpR2ihC hq5lkhzZ/PkzTdZVYVvmKMh8uuIYRZSam2U1qspFBJnya0AAQI3Agsw7pdUf uSdfWgz/zcto11f9XgMpxsgN2LIovk+rcFBJicQBoo/c8/PgcEIDCqQHPT2l SHq2e8dC9IBywN0N0gV9Xpaax/kBSAAAECBAgQIECAAAECBAgQIECAAAECBA gQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBA gQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBA gQIECAAAECBAgQIECAAAECBAgQIECAAIGfCsQY+zPPl2HdHk3+qXPPt7Hujj 6vQginw88FIPCXAv1UvvNmkXw/P38ebRUI8HWB3IC59rfnQG6AXPvTAXKFxm wf3AvGHCBXSwAC0xHIzdah9ssdtGlvfk1JnSMv4vF75/xKqwAAAABJRU5Erk Jggg==',
  P1: 'player1',
  P1_DATA: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAA DtwH1UAAACeklEQVRoQ+1abZKDIAylJ9DbLUdsb6cnYCdaLB/5tNgZRWd/Wc gj7yURwj6c4QnOBcNw93Dw1+65Ij5LEOrw86lj1PtqnFWQHvBRATLHtYRLsi SCSEL0hF8JsDnfivhSmLcQlAi94WcCNHU+LUGlmIQIPeJ/LwBFdHyPZVJLAU 6OXwtgLT0U0VwGQFnyvtolLRnQGX47AYBUC3mtBTgp/vclSNr9YL+3LEEnx7 93QYWATTcCiuC7zwEISb88h9wnYaaE/eIkzgowDMPS+5mmaV3mw9baGYfBzf NcTQK72PuSix7wUUaj4xn5Oz524zhWAkTbnAA94WcCaBwHUls8VGZE21vWFW BXw98EqNIdYbmV89F0KkKv+JkAR0ddqWkpQI/4rACtI94qQA/4iwBc+h9BQl n/e8YXBQCBQIRpnutej/cOtppV6YDtKtKCpu4ApPp/ZfzqI1xtPePen2grlw LA8BCvguMc4RImzcLe8NFDUlqr0ch/t5PXg9b7kJZMAt7/fG5auoaM09Ot8C IGlnkXwiePtltZAALgSTPAe/d68v8gsQa98eiciNgLvtBbCCHynkZ0JB9Ipq 4APvcx+0Vw7vr4jABhCXHmRnGLV16EvQL0gc8KoCNWQ9QeET7RX54f0vJWfj OwNomm8Uc1Aqm2y8fmd/6LzTh5AesIiQgLCZItwIv2NGPT8ZQ/6XuNzdyfEI aB75FR/ou7IG7BR5CgcT6uCfC1448KAE3wpest+bwFQCJMIyrWSJSyCwuC0w ugiUBL9O+xpxGMKoNNBNAsWluHtc6U9qh5VvJjFFvtadatygBpARKR1oVTac s5tJdUqUS0+N3q/z9kqbE/560lDAAAAABJRU5ErkJgggAA',
  P2: 'player2',
  P2_DATA: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAA DtwH1UAAACXUlEQVRoQ+2abZaDIAxFdQW4u+kSO7vTFTAHNQqYT47aKejPmv IgN4QA9p3q8V5lthn1vc1esq5Xn3DUccDvt+Sk5f3rhdlZgbSjnwHYB651uI QlBSKBaE8/ArAM/izH52B2EBSENvVXAPjg4+g9AwwNoV19FkCc02MApWCsAF rQ3wBgEc45Gt5ZZ8byvzwNed+qPguAWmBLZ8Ae0ToALeiLKUiqcizvS1KQpX 3J9j/qP1XQRu0zVdizD0imzf37kGcnjOat+3biGwDnnJ+m6QBk+X2U0isaR8 MwzL9j7eYNtqqfAMCcFRwzjjYAsXMBggQi6LSofwBgCnXEmIIlgQAArenPAM 4aPDiPmzFYWmpZ/xIAEogAIV4XzgbwTfqXAqAccReAb9BPqp4rIhFLR1R11K I+uQ/ID8fCNj6vjpdIHg93CMHWuaGTFmS6PD0eztWqz27EAAKcofiuTyhQAO Jj5BiaVAntFVB6LFCzPnN5nsa7f/+iF76Dc+gsAAhhJsSPZlO22Lehr/p6wX edl+4q+9dPYgJRCwD0jj/uBGrWFwHMgw8PdfMSPL2+CxDgmWfMOg36LuSusq d2fdExbPTl36Aw11qlEGrXZwGw0bc6HxwrOaoEgKYshdR2hb5l/FJfqRRMAr A2KNlLh3F5gtK0F7epsbesQ1J74zSFvGo6S8P0UQCSODgLGtTaWyBo2wx90N pq9bXtWY9THgCGuwlNyVA1AM0p7VUzsGQGWPobwy1OQVb6edrSRBg3qCv1NQ Co9YT672mLMLeQcR23LIBaOJaF26pvdWRpn/8A7JDUP/ydXlgAAAAASUVORK 5CYIIA'
};

Loader.loadImage(Images.TILES, Images.TILES_DATA);

Loader.loadImage(Images.PORTAL, Images.PORTAL_DATA);

Loader.loadImage(Images.P1, Images.P1_DATA);

Loader.loadImage(Images.P2, Images.P2_DATA);

SplitTileMap = (function(superClass) {
  extend(SplitTileMap, superClass);

  function SplitTileMap(cols, rows, tileSize, tiles, ctx) {
    SplitTileMap.__super__.constructor.call(this, cols, rows, tileSize, tiles, ctx);
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
    var bullet, bullets, collide, k, l, len, len1, monster, monsters, results;
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
      results.push((function() {
        var len2, m, results1;
        results1 = [];
        for (m = 0, len2 = bullets.length; m < len2; m++) {
          bullet = bullets[m];
          collide = SAT.testCircleCircle(bullet.body, monster.body);
          if (collide) {
            if (bullet.firedBy instanceof Player) {
              bullet.firedBy.addScore(1);
            }
            bullet.destroy = true;
            results1.push(monster.destroy = true);
          } else {
            results1.push(void 0);
          }
        }
        return results1;
      })());
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

Monster = (function(superClass) {
  extend(Monster, superClass);

  function Monster(x, y, direction, color) {
    if (direction == null) {
      direction = 0;
    }
    this.color = color != null ? color : '#00FF00';
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
    if (!this.stage.isCircleInBounds(this.body)) {
      this.destroy = true;
    }
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
    this.maxSpeed = 4;
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
