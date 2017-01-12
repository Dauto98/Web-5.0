class EnemyController {
	constructor(x, y, spriteName, configs){
		this.sprite = Nakama.enemyGroup.create(x, y, "assets", spriteName);
		this.configs = configs;

		this.sprite.anchor = new Phaser.Point(0.5, 0.5);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.velocity.x = Nakama.configs.enemySpeed;
		this.sprite.body.bounce.setTo(1, 1);

		this.timeSinceLastFire = 0;
	}

	update(){
		this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
		if(this.timeSinceLastFire > this.configs.cooldown){
			new BulletController(this.sprite.position, "EnemyBulletType1.png", new Phaser.Point(0, 1), Math.atan(0), true);
			this.timeSinceLastFire = 0;
		}
	}
}
