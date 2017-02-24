class PlayerBulletType3Controller {
	constructor(shipPosition){
		this.leftSprite = Nakama.game.add.sprite(shipPosition.x, shipPosition.y - 920, "assets", "BulletType3.png");
		this.rightSprite = Nakama.game.add.sprite(shipPosition.x + 40, shipPosition.y - 920, "assets", "BulletType3.png");

		this.leftSprite.anchor = new Phaser.Point(1, 0);
		this.rightSprite.anchor = new Phaser.Point(1, 0);

	}

	// update(updateShipPosition){
	// 	this.leftSprite.position.x = updateShipPosition.x;
	// 	this.leftSprite.position.y = updateShipPosition.y - 920;
	//
	// 	this.rightSprite.position.x = updateShipPosition.x + 40;
	// 	this.rightSprite.position.y = updateShipPosition.y - 920;
	// }
}
