class PlayerShip2Controller extends ShipController{
	constructor(x, y, configs){
		configs.health          = 1;
		configs.cooldown         = 0.2;
		configs.frameNameDefault = "Spaceship2-Player.png";
		configs.frameNameLeft    = "Spaceship2Left-Player.png";
		configs.frameNameRight   = "Spaceship2Right-Player.png";

		super(x, y, "Spaceship2-Player.png", configs);
	}
}
