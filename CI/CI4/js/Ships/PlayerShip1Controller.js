class PlayerShip1Controller extends ShipController{
	constructor(x, y, configs){
		configs.health          = 1;
		configs.cooldown         = 0.2;
		configs.frameNameDefault = "Spaceship1-Player.png";
		configs.frameNameLeft    = "Spaceship1Left-Player.png";
		configs.frameNameRight   = "Spaceship1Right-Player.png";

		super(x, y, "Spaceship1-Player.png", configs);
	}
}
