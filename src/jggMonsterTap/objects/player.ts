import Phaser from 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {

  private jumpKey: Phaser.Input.Keyboard.Key;
  private isAlive: boolean;
  private isFlapping: boolean;
  
  public getIsAlive() {
    return this.isAlive;
  }

  public setIsAlive(alive:boolean):void {
    this.isAlive = alive;
  }

  constructor(scene:Phaser.Scene, x:number, y:number, key:string, frame?:string|number) {
    super(scene, x, y, key, frame);
  }

}
