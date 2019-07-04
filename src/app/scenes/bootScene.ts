import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {

  background:any;
  
  init(): void {
    this.registry.set("score", -1);
  }

  preload():void {
    this.load.pack(
      "jggFlappyPack",
      "./src/app/assets/pack.json",
      "jggFlappyPack",
    )
  }

  create() {
    this.background = this.add
      .tileSprite(0, 0, 390, 600, "background")
      .setOrigin(0,0);
  }

}
