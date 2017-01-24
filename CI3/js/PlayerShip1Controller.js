class PlayerShip1Controller extends ShipController{
	constructor(x, y, configs){
		super(x, y, "Spaceship1-Player.png", configs);

		if(this.configs.partnerOrPlayer === "Player"){
			super.spriteName = "Spaceship1-Player.png";
			super.configs = {
				up               : Phaser.Keyboard.UP,
	      down             : Phaser.Keyboard.DOWN,
	      left             : Phaser.Keyboard.LEFT,
	      right            : Phaser.Keyboard.RIGHT,
	      fire             : Phaser.Keyboard.SPACEBAR,
	      cooldown         : 0.2,
				frameNameDefault : "Spaceship1-Player.png",
			  frameNameLeft    : "Spaceship1Left-Player.png",
			  frameNameRight   : "Spaceship1Right-Player.png"
			};
		} else {
			super.spriteName = "Spaceship1-Partner.png";
			super.configs = {
				up               : Phaser.Keyboard.W,
	      down             : Phaser.Keyboard.S,
	      left             : Phaser.Keyboard.A,
	      right            : Phaser.Keyboard.D,
	      fire             : Phaser.Keyboard.SHIFT,
	      cooldown         : 0.2,
	      frameNameDefault : "Spaceship1-Partner.png",
	      frameNameLeft    : "Spaceship1Left-Partner.png",
	      frameNameRight   : "Spaceship1Right-Partner.png"
			}
		}
	}
}
