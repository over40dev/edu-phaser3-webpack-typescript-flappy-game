import Phaser, {Types} from 'phaser';
import {
  BootScene,
  PlayScene,
} from './scenes';

class GameFlappy extends Phaser.Game {
  constructor(gameConfig: Types.Core.GameConfig) {
    super(gameConfig);
  }
}

const GameConfig: Types.Core.GameConfig = {
  width: 390,
  height: 600,
  parent: "game",
  scene: [BootScene, PlayScene],
  input: {
    keyboard: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y:300
      }
    }
  },
  render: {
    pixelArt: true
  }
};

window.addEventListener("load", 
  () => new GameFlappy(GameConfig)
);
