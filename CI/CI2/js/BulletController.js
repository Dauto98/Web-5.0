class BulletController{
  constructor(position, spriteName, direction, rotation, enemy){
    if(enemy === true){
      this.sprite = Nakama.enemyBulletGroup.create(position.x, position.y, "assets", spriteName);
    } else {
      this.sprite = Nakama.bulletGroup.create(position.x, position.y, "assets", spriteName);
    }
    this.sprite.rotateAngle = rotation;

    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;

    this.sprite.body.velocity = direction.setMagnitude(Nakama.configs.bulletSpeed);
    this.sprite.rotation = this.sprite.rotateAngle;
  }
}
