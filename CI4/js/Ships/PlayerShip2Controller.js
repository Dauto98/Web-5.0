class PlayerShip2Controller extends ShipController{
	constructor(x, y, configs){
		super(x, y, "Spaceship2-Player.png", configs);

		if(this.configs.partnerOrPlayer === "Player"){
			super.spriteName = "Spaceship2-Player.png";
			super.configs = {
				up               : Phaser.Keyboard.UP,
	      down             : Phaser.Keyboard.DOWN,
	      left             : Phaser.Keyboard.LEFT,
	      right            : Phaser.Keyboard.RIGHT,
	      fire             : Phaser.Keyboard.SPACEBAR,
	      cooldown         : 0.2,
				frameNameDefault : "Spaceship2-Player.png",
			  frameNameLeft    : "Spaceship2Left-Player.png",
			  frameNameRight   : "Spaceship2Right-Player.png"
			};
		} else {
			super.spriteName = "Spaceship2-Partner.png";
			super.configs = {
				up               : Phaser.Keyboard.W,
	      down             : Phaser.Keyboard.S,
	      left             : Phaser.Keyboard.A,
	      right            : Phaser.Keyboard.D,
	      fire             : Phaser.Keyboard.SHIFT,
	      cooldown         : 0.2,
	      frameNameDefault : "Spaceship2-Partner.png",
	      frameNameLeft    : "Spaceship2Left-Partner.png",
	      frameNameRight   : "Spaceship2Right-Partner.png"
			}
		}
	}
}
