class PlayerShip3Controller extends ShipController{
	constructor(x, y, configs){
		configs.health          = 1;
		configs.cooldown         = 0.2;
		configs.frameNameDefault = "Spaceship3-Player.png";
		configs.frameNameLeft    = "Spaceship3Left-Player.png";
		configs.frameNameRight   = "Spaceship3Right-Player.png";

		super(x, y, "Spaceship3-Player.png", configs);
	}
}
