//create Nakama object, no need for class
var Nakama = {};
//create configs variable inside Nakama object
Nakama.configs = {
  bulletSpeed : 400,
  shipSpeed   : 500,
  enemySpeed  : 500,
  enemySpawnCooldown : 3.5
};

window.onload = function(){
  Nakama.game = new Phaser.Game(640,960,Phaser.AUTO,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  Nakama.game.scale.minWidth = 320;
  Nakama.game.scale.minHeight = 480;
  Nakama.game.scale.maxWidth = 640;
  Nakama.game.scale.maxHeight = 960;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.time.advancedTiming = true;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.keyboard = Nakama.game.input.keyboard;

  Nakama.background = Nakama.game.add.tileSprite(0, 0, 700, 1000, "background");

  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.missileGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();

  Nakama.players = [];
  Nakama.players.push(new PlayerShip1Controller(200, 500,
    {
      partnerOrPlayer : "Player",
      health          : 1
    })
  );
  Nakama.players.push(new PlayerShip1Controller(400, 500,
    {
      partnerOrPlayer : "Partner",
      health          : 1
    })
  );

  // array which hold the enemy
  Nakama.enemies = [];
  Nakama.timeSinceLastSpawn = 2.25;

  Nakama.missile = [];
}


// update game state each frame
var update = function(){
  Nakama.background.tilePosition.y += 0.5;

  for(var i=0; i<Nakama.players.length; i++){
    Nakama.players[i].update();
  }

  for(var i=0; i<Nakama.missile.length; i++){
    Nakama.missile[i].update();
  }

  // spawn an enemy if there are less than 3 enemy ship and time from the last spawn is over 3 second
  Nakama.timeSinceLastSpawn += Nakama.game.time.physicsElapsed;
  if(Nakama.enemies.length < 3 && Nakama.timeSinceLastSpawn > Nakama.configs.enemySpawnCooldown){
    Nakama.enemies.push(new EnemyController(100, 100, "EnemyType1.png",
      {
        cooldown  : 0.5,
        minX      : 100,
        maxX      : 540,
        tweenTime : 3,
        health    : 1
      }));
    Nakama.timeSinceLastSpawn = 0;
  }

  for(var j=0; j<Nakama.enemies.length; j++){
    Nakama.enemies[j].update();
  }

  // checking collision between bullet and ship
  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.enemyGroup, hitEnemy);
  Nakama.game.physics.arcade.overlap(Nakama.missileGroup, Nakama.enemyGroup, hitEnemy);
  // Nakama.game.physics.arcade.overlap(Nakama.enemyBulletGroup, Nakama.playerGroup, hitPlayer);
}

// call this function if player's bullet hit enemy ship
var hitEnemy = function(bullet, enemy){
  enemy.damage(1);
  bullet.kill();
  Nakama.enemies.splice(Nakama.enemies.indexOf(enemy), 1);
}

//call this function if enemy's bullet hit player ship
var hitPlayer = function(enemyBullet, player){
  player.damage(1);
  enemyBullet.kill();
}


// before camera render (mostly for debug)
var render = function(){
}
