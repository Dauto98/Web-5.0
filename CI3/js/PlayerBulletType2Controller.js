class PlayerBulletType2Controller extends BulletController{
	constructor(position, direction){
		super(position, "BulletType2.png", direction, Nakama.missileGroup);
		this.sprite.TURN_RATE = 5;
		this.sprite.SPEED = 250;
	}

	update(){
		if(this.sprite.alive){
			this.sprite.targetAngle = Nakama.game.math.angleBetween(
				this.sprite.position.x, this.sprite.position.y,
				Nakama.game.input.activePointer.x, Nakama.game.input.activePointer.y
			)

			this.sprite.targetAngle += Math.PI/2;

			if(this.sprite.rotation !== this.sprite.targetAngle){
				this.sprite.delta = this.sprite.targetAngle - this.sprite.rotation;

	      // Keep it in range from -180 to 180 to make the most efficient turns.
	      if (this.sprite.delta > Math.PI) {
					this.sprite.delta -= Math.PI * 2;
				}
	      if (this.sprite.delta < -Math.PI) {
					this.sprite.delta += Math.PI * 2;
				}

	      if (this.sprite.delta > 0) {
	          // Turn clockwise
	          this.sprite.angle += this.sprite.TURN_RATE;
	      } else {
	          // Turn counter-clockwise
	          this.sprite.angle -= this.sprite.TURN_RATE;
	      }

	      // Just set angle to target angle if they are close
	      if (Math.abs(this.sprite.delta) < Nakama.game.math.degToRad(this.sprite.TURN_RATE)) {
	          this.sprite.rotation = this.sprite.targetAngle;
	      }
			}

			// Calculate velocity vector based on this.rotation and this.SPEED
	    this.sprite.body.velocity.x = Math.cos(this.sprite.rotation - Math.PI/2) * this.sprite.SPEED;
	    this.sprite.body.velocity.y = Math.sin(this.sprite.rotation - Math.PI/2) * this.sprite.SPEED;
		}
	}
}
