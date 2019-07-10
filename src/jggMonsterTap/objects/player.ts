import Phaser from 'phaser';
import { IPlayer } from '../interfaces';

export default class Player extends Phaser.GameObjects.Sprite {
  private jumpKey: Phaser.Input.Keyboard.Key;
  private isAlive: boolean;
  private isFlapping: boolean;

  public isStillAlive() {
    return this.isAlive;
  }

  public setIsAlive(alive: boolean): void {
    this.isAlive = alive; // using this public property setter avoids the situation where state is updated in multiple locations.
  }

  constructor(config: IPlayer) {
    const { scene, x, y, key, frame } = config;
    super(scene, x, y, key, frame);

    // sprite
    // this.setScale(3);
    this.setOrigin(0, 0);

    // variables
    this.isAlive = true;
    this.isFlapping = false;

    // physics
    this.scene.physics.world.enable(this);
    this.body.setGravityY(1000);
    this.body.setSize(80, 60);
    // this.body.setSize(17, 12);

    // input
    this.jumpKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.scene.add.existing(this);
  }

  update(): void {
    // handle angle change
    if (this.angle < 30) {
      this.angle += 2;
    }

    // handle input
    if (this.jumpKey.isDown && !this.isFlapping) {
      // flap
      this.isFlapping = true;
      this.body.setVelocityY(-350);
      this.scene.tweens.add({
        targets: this,
        props: { angle: -20 },
        duration: 150,
        ease: "Power0"
      });
    } else if (this.jumpKey.isUp && this.isFlapping) {
      this.isFlapping = false;
    }

    // check if off the screen
    if (this.y + this.height > this.scene.sys.canvas.height) {
      this.setIsAlive(false);
    }
  }
}
