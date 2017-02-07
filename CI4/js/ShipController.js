class ShipController {
  constructor(x,y, spriteName, configs){
    this.sprite = Nakama.playerGroup.create(
      x,
      y,
      "assets",
      spriteName
    );
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.collideWorldBounds = true;

    this.configs = configs;
    this.sprite.health = this.configs.health;
    this.timeSinceLastFire = 0;

    this.bullet = 2;
  }

  update(){
    if (Nakama.keyboard.isDown(this.configs.up)) {
      this.sprite.body.velocity.y = -Nakama.configs.shipSpeed;
    }
    else if (Nakama.keyboard.isDown(this.configs.down)) {
        this.sprite.body.velocity.y = Nakama.configs.shipSpeed;
      }
      else {
        this.sprite.body.velocity.y = 0;
      }

    if (Nakama.keyboard.isDown(this.configs.left)) {
        this.sprite.body.velocity.x = -Nakama.configs.shipSpeed;
        this.sprite.frameName = this.configs.frameNameLeft;
      }
    else if (Nakama.keyboard.isDown(this.configs.right)) {
        this.sprite.body.velocity.x = Nakama.configs.shipSpeed;
        this.sprite.frameName = this.configs.frameNameRight;
      }
      else {
        this.sprite.body.velocity.x = 0;
        this.sprite.frameName = this.configs.frameNameDefault;
      }

    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
    if (
      Nakama.keyboard.isDown(this.configs.fire) && this.timeSinceLastFire > this.configs.cooldown
    ) {
      this.fire();
      this.timeSinceLastFire = 0
    }
  }

  fire(){
    if (this.sprite.alive) {
      if(this.bullet === 1){
        this.createBulletType1(new Phaser.Point(0, -1));
        this.createBulletType1(new Phaser.Point(1, -10));
        this.createBulletType1(new Phaser.Point(-1, -10));
        this.createBulletType1(new Phaser.Point(1, -2));
        this.createBulletType1(new Phaser.Point(-1, -2));
      } else if (this.bullet === 2) {
        this.createBulletType2(new Phaser.Point(0, -1), new Phaser.Point(1, 1));
        this.createBulletType2(new Phaser.Point(0, -1), new Phaser.Point(1, -1));
      }
    }
  }


  createBulletType1(direction){
    new PlayerBulletType1Controller(this.sprite.position, direction);
  }

  createBulletType2(direction, launchDirection){
    Nakama.missile.push(new PlayerBulletType2Controller(this.sprite.position, direction, launchDirection));

    //TODO: if I use these 2 line of code in createBulletType2 function to creat 2 missile, they stick to each other ??? (last parameter is launchDirection)
    // Nakama.missile.push(new PlayerBulletType2Controller(this.sprite.position, new Phaser.Point(0, -1), new Phaser.Point(1, -1)));
    // Nakama.missile.push(new PlayerBulletType2Controller(this.sprite.position, new Phaser.Point(0, -1), new Phaser.Point(1, 1)));
  }
}
