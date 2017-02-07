class EnemyController {
	constructor(x, y, spriteName, configs){
		this.sprite = Nakama.enemyGroup.create(x, y, "assets", spriteName);
		this.configs = configs;

		this.sprite.anchor = new Phaser.Point(0.5, 0.5);
		this.sprite.health = this.configs.health;

		this.timeSinceSpawn = 0;

		this.configs.centerX = (this.configs.minX + this.configs.maxX)/2;
		this.configs.movementDistance = (this.configs.minX - this.configs.maxX)/2

		this.timeSinceLastFire = 0;
	}

	update(){
		this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
		this.timeSinceSpawn += Nakama.game.time.physicsElapsed;
		// moving
		this.sprite.position.x = (this.configs.centerX + this.configs.movementDistance * Math.sin(Math.PI*2*this.timeSinceSpawn/this.configs.tweenTime));
		// fire
		if(this.timeSinceLastFire > this.configs.cooldown){
			new BulletController(this.sprite.position, "EnemyBulletType1.png", new Phaser.Point(0, 1), Nakama.enemyBulletGroup);
			this.timeSinceLastFire = 0;
		}
	}
}
