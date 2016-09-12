var Bullet,Effects,GameOverStage,Images,LeftPlayer,Mode,Monster,MonsterSpawner,Player,RANDOM_TILES,RightPlayer,SplitStage,SplitTileMap,StartStage,i,j,extend=function(t,e){function i(){this.constructor=t}for(var s in e)hasProp.call(e,s)&&(t[s]=e[s]);return i.prototype=e.prototype,t.prototype=new i,t.__super__=e.prototype,t},hasProp={}.hasOwnProperty,bind=function(t,e){return function(){return t.apply(e,arguments)}};for(Effects={anaglyph:function(t,e,i,s,r,n){return null==n&&(n=3),i.save(),i.textBaseline="middle",i.textAlign="center",i.translate(s,r),i.globalAlpha=.8,i.font=e,i.fillStyle="red",i.fillText(t,-n,0),i.fillStyle="cyan",i.fillText(t,n,0),i.globalAlpha=1,i.fillStyle="black",i.fillText(t,0,0),i.restore()}},Images={TILES:"tiles",TILES_DATA:"../images/tiles_small.png",MONSTER:"monster",MONSTER_DATA:"../images/monster.png",PORTAL:"portal",PORTAL_DATA:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAEgCAYAAADVDXFAAAABe0lEQVR4Xu3dQRLBMBgG0DqCK9i5kOPIpMdxITtXcASmpR2ihChq5lkhzZ/PkzTdZVYVvmKMh8uuIYRZSam2U1qspFBJnya0AAQI3Agsw7pdUfuSdfWgz/zcto11f9XgMpxsgN2LIovk+rcFBJicQBoo/c8/PgcEIDCqQHPT2lSHq2e8dC9IBywN0N0gV9Xpaax/kBSAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIGfCsQY+zPPl2HdHk3+qXPPt7Hujj6vQginw88FIPCXAv1UvvNmkXw/P38ebRUI8HWB3IC59rfnQG6AXPvTAXKFxmwf3AvGHCBXSwAC0xHIzdah9ssdtGlvfk1JnSMv4vF75/xKqwAAAABJRU5ErkJggg==",P1:"player1",P1_DATA:"../images/player1.png",P2:"player2",P2_DATA:"../images/player2.png"},Loader.loadImage(Images.TILES,Images.TILES_DATA),Loader.loadImage(Images.MONSTER,Images.MONSTER_DATA),Loader.loadImage(Images.PORTAL,Images.PORTAL_DATA),Loader.loadImage(Images.P1,Images.P1_DATA),Loader.loadImage(Images.P2,Images.P2_DATA),SplitTileMap=function(t){function e(t,i,s,r,n){e.__super__.constructor.call(this,2*t,2*i,s/2,r,n)}return extend(e,t),e.prototype._render=function(){var t,e,i,s,r,n,o,h,a,l,c;for(e=Loader.getImage(Images.TILES),n=[],t=i=0,r=this.cols;0<=r?i<=r:i>=r;t=0<=r?++i:--i)n.push(function(){var i,r,n;for(n=[],s=i=0,r=this.rows;0<=r?i<=r:i>=r;s=0<=r?++i:--i)o=this.getTile(t,s),h=t*this.tileSize,l=s*this.tileSize,a=0,c=0,0===o?(a=0,c=0):(o=1)?(a=1,c=0):(o=2)?(a=0,c=1):(o=3)&&(a=1,c=1),this.ctx.save(),this.ctx.drawImage(e,a*this.tileSize,c*this.tileSize,this.tileSize,this.tileSize,h,l,this.tileSize,this.tileSize),n.push(this.ctx.restore());return n}.call(this));return n},e}(TileMap),RANDOM_TILES=[],i=j=0;j<=179;i=++j)RANDOM_TILES.push(Math.round(3*Math.random()));SplitStage=function(t){function e(t,i,s){this.testBulletCollisions=bind(this.testBulletCollisions,this),this._update=bind(this._update,this),this._init=bind(this._init,this),e.__super__.constructor.call(this,t,i-e.gutterHeight,s)}return extend(e,t),e.tileWidth=32,e.wallWidth=e.tileWidth,e.gutterHeight=e.tileWidth,e.prototype._init=function(){var t,i;return t=this.width/e.tileWidth,i=this.height/e.tileWidth,this.tilemap=new SplitTileMap(t,i,e.tileWidth,RANDOM_TILES,this.ctx),this.wall=new Rect(new Vector(this.width/2-e.wallWidth/2,0),e.wallWidth,this.height),this.lives=4,this.leftPlayer=new LeftPlayer(30,this.height/2),this.addActor(this.leftPlayer),this.rightPlayer=new RightPlayer(610,this.height/2),this.addActor(this.rightPlayer),this.monsterSpawner=new MonsterSpawner(this.width/2,this.height/2),this.addActor(this.monsterSpawner)},e.prototype._render=function(){return this.tilemap.render(),this.drawWall(),this.drawGutter()},e.prototype._update=function(t){var e,i,s,r,n;if(this.lives<=0)return void(this.state=STATE.finished);for(this.testBulletCollisions(),r=[],n=this.actors,i=0,s=n.length;i<s;i++)e=n[i],e.shouldDestroy()||r.push(e);return this.actors=r},e.prototype.drawWall=function(){var t,i;return i=Loader.getImage(Images.PORTAL),t=this.getContext(),t.save(),t.drawImage(i,this.wall.position.x,this.wall.position.y,e.wallWidth,this.height),t.restore()},e.prototype.drawGutter=function(){var t,i,s;return t=this.getContext(),t.fillStyle="#000000",t.fillRect(0,this.height,this.width,this.height+e.gutterHeight),i=11,s=22,t.fillStyle="White",t.font="normal 12pt Arial",t.fillText("Anomalies resolved: "+this.leftPlayer.score,i,this.height+s),t.save(),t.scale(-1,1),t.fillStyle="White",t.font="normal 12pt Arial",t.fillText("Anomalies resolved: "+this.rightPlayer.score,-this.width+i,this.height+s),t.restore()},e.prototype.testBulletCollisions=function(){var t,e,i,s,r,n,o,h,a,l,c,u,d,p;for(e=this.actors.filter(this.isInstanceOfBullet),n=0,h=e.length;n<h;n++)t=e[n],i=MathHelpers.doesCircleRectIntersect(t.body,this.wall),i&&(t.destroy=!0);for(d=this.actors.filter(this.isInstanceOfMonster),p=[],o=0,a=d.length;o<a;o++){for(u=d[o],c=0,l=e.length;c<l;c++)t=e[c],MathHelpers.doesCircleCircleIntersect(t.body,u.body)&&(t.firedBy instanceof Player&&t.firedBy.addScore(1),t.destroy=!0,u.destroy=!0);s=MathHelpers.doesCircleCircleIntersect(this.leftPlayer.body,u.body),r=MathHelpers.doesCircleCircleIntersect(this.rightPlayer.body,u.body),(s||r)&&(this.lives--,u.destroy=!0),this.isCircleInBounds(u.body)?p.push(void 0):(this.lives--,p.push(u.destroy=!0))}return p},e.prototype.isInstanceOfBullet=function(t){return t instanceof Bullet},e.prototype.isInstanceOfMonster=function(t){return t instanceof Monster},e}(Stage),StartStage=function(t){function e(t,i,s){this._update=bind(this._update,this),this._init=bind(this._init,this),e.__super__.constructor.call(this,t,i,s),this.controller=Controller.get()}return extend(e,t),e.prototype._init=function(){return this.title="Double Vision",this.entryText="Hit ENTER to begin"},e.prototype._update=function(t){if(this.controller.isPressed(Keys.ENTER))return this.state=STATE.finished},e.prototype._render=function(){var t,e,i,s,r;return this.ctx.save(),s=32,t=2*this.height/3,e=this.width/4,r=this.width/2,i=3*this.width/4,this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font="24px Georgia",this.ctx.fillStyle="black",this.ctx.fillRect(0,this.height/2,this.width,this.height/2),this.ctx.fillStyle="red",this.ctx.fillText("Red Guard",e,t),this.ctx.fillStyle="white",this.ctx.fillText("W",e,t+s),this.ctx.fillText("S",e,t+2*s),this.ctx.fillText("D",e,t+3*s),this.ctx.fillText("CONTROLS",r,t-s),this.ctx.fillText("- Move Up -",r,t+s),this.ctx.fillText("- Move Down - ",r,t+2*s),this.ctx.fillText("- Fire -",r,t+3*s),this.ctx.fillStyle="cyan",this.ctx.fillText("Blue Guard",i,t),this.ctx.fillStyle="white",this.ctx.fillText("UP",i,t+s),this.ctx.fillText("DOWN",i,t+2*s),this.ctx.fillText("LEFT",i,t+3*s),Effects.anaglyph(this.title,"72px Georgia",this.ctx,this.width/2,this.height/4,5),Effects.anaglyph(this.entryText,"36px Georgia",this.ctx,this.width/2,this.height/2-s,3),this.ctx.restore()},e}(Stage),GameOverStage=function(t){function e(t,i,s){this._update=bind(this._update,this),this._init=bind(this._init,this),e.__super__.constructor.call(this,t,i,s),this.controller=Controller.get()}return extend(e,t),e.prototype._init=function(){return this.gameOverText="GAME OVER",this.retryText="Hit ENTER play again",this.background=this.getNoise()},e.prototype._update=function(t){if(this.controller.isPressed(Keys.ENTER))return this.state=STATE.finished},e.prototype._render=function(){return this.ctx.save(),this.background=this.getNoise(),this.ctx.putImageData(this.background,0,0),Effects.anaglyph(this.gameOverText,"72px Georgia",this.ctx,this.width/2,this.height/4,5),Effects.anaglyph(this.retryText,"42px Georgia",this.ctx,this.width/2,this.height/2,3),this.ctx.restore()},e.prototype.getNoise=function(){var t,e;for(e=this.ctx.createImageData(this.width,this.height),i=0;i<e.data.length;)t=120*Math.random()|0,e.data[i++]=0,e.data[i++]=0,e.data[i++]=0,e.data[i++]=t;return e},e}(Stage),Monster=function(t){function e(t,i,s,r){null==s&&(s=0),this.left=r,this._update=bind(this._update,this),e.__super__.constructor.call(this,t,i,s,16),this.speed=Math.round(2*Math.random())+2.5,this.image=Loader.getImage(Images.MONSTER),this.sprite=new Sprite(this.image,32),this.opacity=0}return extend(e,t),e.CREEP_LEFT_CYCLE=[{col:0,row:0},{col:1,row:0},{col:2,row:0},{col:3,row:0},{col:2,row:0},{col:1,row:0}],e.CREEP_RIGHT_CYCLE=[{col:0,row:1},{col:1,row:1},{col:2,row:1},{col:3,row:1},{col:2,row:1},{col:1,row:1}],e.prototype._init=function(){return this.left?this.sprite.setCycle(e.CREEP_LEFT_CYCLE,400):this.sprite.setCycle(e.CREEP_RIGHT_CYCLE,400),this.opacity=0},e.prototype._render=function(){var t;return t=this.stage.getContext(),t.save(),this.sprite.draw(this.position.x-this.radius,this.position.y-this.radius,t,this.opacity),t.restore()},e.prototype._update=function(t){var e,i,s;return this.opacity>1?this.opacity=1:this.opacity+=t/1e3,this.sprite.updateFrame(t),s=t/100,e=this.speed*s,i=new Vector(e,0),i.rotate(this.direction),this.position.add(i),this.updateBody()},e}(CircleActor),Mode={MIRROR:0,FLIPPED:1,VARIANCE:2},MonsterSpawner=function(t){function e(t,i){this.updateMode=bind(this.updateMode,this),this._update=bind(this._update,this),this._init=bind(this._init,this),e.__super__.constructor.call(this,t,i),this.mode=Mode.MIRROR,this.spawnTime=3e3,this.spawnTimer=new Timer(this.spawnTime),this.modeTimer=new Timer(6e3)}return extend(e,t),e.prototype._init=function(){return this.mode=Mode.MIRROR,this.spawnTime=3e3,this.spawnTimer=new Timer(this.spawnTime),this.modeTimer=new Timer(6e3)},e.prototype._update=function(t){if(this.spawnTimer.tick(t),this.modeTimer.tick(t),this.spawnTimer.hasEnded()&&(this.spawnTimer.restart(),this.spawnMonsters()),this.modeTimer.hasEnded())return this.spawnTime<=500?this.spawnTime=500:this.spawnTime<=2e3?this.spawnTime-=100:this.spawnTime-=200,this.spawnTimer.timeout=this.spawnTime,this.modeTimer.restart(),this.updateMode()},e.prototype.spawnMonsters=function(){var t,e,i,s;switch(e=20,t=this.stage.height-2*e,i=0,s=0,this.mode){case Mode.MIRROR:i=s=Math.floor(Math.random()*t)+e;break;case Mode.FLIPPED:i=Math.floor(Math.random()*t)+e,s=this.stage.height-i;break;case Mode.VARIANCE:i=Math.floor(Math.random()*t)+e,s=Math.floor(Math.random()*t)+e;break;default:i=s=Math.floor(Math.random()*t)+e}return this.stage.addActor(new Monster(this.stage.width/2,i,0,(!1))),this.stage.addActor(new Monster(this.stage.width/2,s,MathHelpers.toRadians(180),(!0)))},e.prototype.updateMode=function(){var t,e;return e=[Mode.MIRROR,Mode.FLIPPED,Mode.VARIANCE],e.splice(this.mode,1),t=Math.floor(Math.random()*e.length),this.mode=e[t]},e}(Actor),Player=function(t){function e(t,i){this.addScore=bind(this.addScore,this),e.__super__.constructor.call(this,t,i,0,16),this.controller=Controller.get(),this.velx=0,this.vely=0,this.maxSpeed=5,this.score=0}return extend(e,t),e.prototype.addScore=function(t){return this.score+=t},e.prototype._render=function(){return this.drawDebug()},e}(CircleActor),LeftPlayer=function(t){function e(t,i){this._update=bind(this._update,this),e.__super__.constructor.call(this,t,i),this.reloadTimer=new Timer(500),this.image=Loader.getImage(Images.P1),this.sprite=new Sprite(this.image,32),this.sprite.setCycle(RightPlayer.STAND_CYCLE),this.isStopped=!1}return extend(e,t),e.STAND_CYCLE=[{col:0,row:0}],e.RUN_CYCLE=[{col:1,row:0},{col:2,row:0}],e.prototype._render=function(){return this.sprite.draw(this.position.x-this.radius,this.position.y-this.radius,this.stage.getContext())},e.prototype._update=function(t){var e,i,s,r,n;return this.sprite.updateFrame(t),this.reloadTimer.tick(t),r=this.position,n=t/100,i=100,e=1.5,this.controller.isPressed(Keys.D)||this.reloadTimer.end(),this.reloadTimer.hasEnded()&&this.controller.isPressed(Keys.D)&&(this.reloadTimer.restart(),this.stage.addActor(new Bullet(r.x+10,r.y,this.direction,this))),this.controller.isPressed(Keys.W)?this.vely>-this.maxSpeed&&(this.vely-=e*n,this.vely<-this.maxSpeed&&(this.vely=-this.maxSpeed)):this.vely<0&&(this.vely+=i*n,this.vely>0&&(this.vely=0)),this.controller.isPressed(Keys.S)?this.vely<this.maxSpeed&&(this.vely+=e*n,this.vely>this.maxSpeed&&(this.vely=this.maxSpeed)):this.vely>0&&(this.vely-=i*n,this.vely<0&&(this.vely=0)),s=new Circle(new Vector(r.x,r.y+this.vely),this.radius),this.stage.isCircleInBounds(s)&&this.setPosition(r.x,r.y+this.vely),0!==this.velx||0!==this.vely||this.isStopped?(0!==this.velx||0!==this.vely&&this.isStopped)&&(this.isStopped=!1,this.sprite.setCycle(RightPlayer.RUN_CYCLE,200)):(this.isStopped=!0,this.sprite.setCycle(RightPlayer.STAND_CYCLE)),this.updateBody()},e}(Player),RightPlayer=function(t){function e(t,i){this._update=bind(this._update,this),e.__super__.constructor.call(this,t,i),this.direction=MathHelpers.toRadians(180),this.reloadTimer=new Timer(500),this.image=Loader.getImage(Images.P2),this.sprite=new Sprite(this.image,32),this.sprite.setCycle(e.STAND_CYCLE),this.isStopped=!1}return extend(e,t),e.STAND_CYCLE=[{col:0,row:0}],e.RUN_CYCLE=[{col:1,row:0},{col:2,row:0}],e.prototype._render=function(){return this.sprite.draw(this.position.x-this.radius,this.position.y-this.radius,this.stage.getContext())},e.prototype._update=function(t){var i,s,r,n,o;return this.sprite.updateFrame(t),this.reloadTimer.tick(t),n=this.position,o=t/100,s=20,i=1.5,this.controller.isPressed(Keys.LEFT)||this.reloadTimer.end(),this.reloadTimer.hasEnded()&&this.controller.isPressed(Keys.LEFT)&&(this.reloadTimer.restart(),this.stage.addActor(new Bullet(n.x-10,n.y,this.direction,this))),this.controller.isPressed(Keys.UP)?this.vely>-this.maxSpeed&&(this.vely-=i*o,this.vely<-this.maxSpeed&&(this.vely=-this.maxSpeed)):this.vely<0&&(this.vely+=s*o,this.vely>0&&(this.vely=0)),this.controller.isPressed(Keys.DOWN)?this.vely<this.maxSpeed&&(this.vely+=i*o,this.vely>this.maxSpeed&&(this.vely=this.maxSpeed)):this.vely>0&&(this.vely-=s*o,this.vely<0&&(this.vely=0)),r=new Circle(new Vector(n.x,n.y+this.vely),this.radius),this.stage.isCircleInBounds(r)&&this.setPosition(n.x,n.y+this.vely),0!==this.velx||0!==this.vely||this.isStopped?(0!==this.velx||0!==this.vely&&this.isStopped)&&(this.isStopped=!1,this.sprite.setCycle(e.RUN_CYCLE,200)):(this.isStopped=!0,this.sprite.setCycle(e.STAND_CYCLE)),this.updateBody()},e}(Player),Bullet=function(t){function e(t,i,s,r){null==s&&(s=0),this.firedBy=r,e.__super__.constructor.call(this,t,i,s,5),this.bulletSpeed=120}return extend(e,t),e.prototype._render=function(){return this.drawDebug("#00FF00")},e.prototype._update=function(t){var e,i,s;return s=t/100,i=this.bulletSpeed*s,e=new Vector(i,0),e.rotate(this.direction),this.position.add(e),this.stage.isCircleInBounds(this.body)||(this.destroy=!0),this.updateBody()},e}(CircleActor);