import Phaser, {Types} from 'phaser';
import {
  PlayScene,
} from './scenes';

class MonsterTap extends Phaser.Game {
  constructor(gameConfig: Types.Core.GameConfig) {
    super(gameConfig);
  }
}

const GameConfig: Types.Core.GameConfig = {
  width: 390,
  height: 600,
  parent: "game",
  scene: [PlayScene],
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
  () => new MonsterTap(GameConfig)
);
