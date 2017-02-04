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
      this.createBulletType2(new Phaser.Point(0, -1));
      // this.createBullet(new Phaser.Point(1, -10));
      // this.createBullet(new Phaser.Point(-1, -10));
      // this.createBullet(new Phaser.Point(1, -2));
      // this.createBullet(new Phaser.Point(-1, -2));
    }
  //   console.log("Group: ", Nakama.enemyGroup.children.length);
  //   console.log("Array: ", Nakama.enemies.length);
  }

  createBulletType1(direction){
    new PlayerBulletType1Controller(this.sprite.position, direction);
  }

  createBulletType2(direction){
    Nakama.missile.push(new PlayerBulletType2Controller(this.sprite.position, direction));
  }
}
