class PlayerShip3Controller extends ShipController{
	constructor(x, y, configs){
		super(x, y, "Spaceship3-Player.png", configs);

		if(this.configs.partnerOrPlayer === "Player"){
			super.spriteName = "Spaceship3-Player.png";
			super.configs = {
				up               : Phaser.Keyboard.UP,
	      down             : Phaser.Keyboard.DOWN,
	      left             : Phaser.Keyboard.LEFT,
	      right            : Phaser.Keyboard.RIGHT,
	      fire             : Phaser.Keyboard.SPACEBAR,
	      cooldown         : 0.2,
				frameNameDefault : "Spaceship3-Player.png",
			  frameNameLeft    : "Spaceship3Left-Player.png",
			  frameNameRight   : "Spaceship3Right-Player.png"
			};
		} else {
			super.spriteName = "Spaceship3-Partner.png";
			super.configs = {
				up               : Phaser.Keyboard.W,
	      down             : Phaser.Keyboard.S,
	      left             : Phaser.Keyboard.A,
	      right            : Phaser.Keyboard.D,
	      fire             : Phaser.Keyboard.SHIFT,
	      cooldown         : 0.2,
	      frameNameDefault : "Spaceship3-Partner.png",
	      frameNameLeft    : "Spaceship3Left-Partner.png",
	      frameNameRight   : "Spaceship3Right-Partner.png"
			}
		}
	}
}
