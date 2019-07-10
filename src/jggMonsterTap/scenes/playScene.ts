import Phaser from "phaser";
import { Player, Pipe } from "../objects";
import { IPipe } from '../interfaces';

export default class PlayScene extends Phaser.Scene {
  private player: Player;
  // private pipe: Pipe;
  private pipes: Phaser.GameObjects.Group;
  private background: Phaser.GameObjects.TileSprite;
  private scoreText: Phaser.GameObjects.BitmapText;

  constructor() {
    super({key:"PlayScene"});
  }

  init(): void {
    this.registry.set("score", -1);
  }

  preload(): void {
    this.load.pack(
      "MonsterTapPack",
      "./src/jggMonsterTap/assets/pack.json",
      "MonsterTapPack"
    );
  }

  create(): void {
    this.background = this.add
      .tileSprite(0, 0, 390, 600, "background")
      .setOrigin(0, 0);

    this.scoreText = this.add
      .bitmapText(
        this.sys.canvas.width / 2 - 14,
        30,
        "font",
        this.registry.values.score
      )
      .setDepth(2);

    this.pipes = this.add.group({
      classType: Pipe
    });

    this.player = 
      new Player({
        scene:this, x:50, y:100, key:"player"
      });

    // setup game timer
    this.addNewRowOfPipes();

    this.time.addEvent({
      delay: 1500,
      callback: this.addNewRowOfPipes,
      callbackScope: this,
      loop: true
    });
  }

  update():void {
    if (this.player.isStillAlive()) {
      this.background.tilePositionX += 4;
      this.player.update();
      this.physics.overlap(
        this.player,
        this.pipes,
        function() {
          this.player.setIsAlive(false);
        },
        null,
        this,
      )
    }
    else {
      Phaser.Actions.Call(
        this.pipes.getChildren(),
        function(pipe) {
          pipe.body.setVelocityX(0);
        },
        this
      );

      if (this.player.y > this.sys.canvas.height) {
        this.scene.restart();
      }
    }
  }

  private addNewRowOfPipes(): void {
    // update the score
    this.registry.values.score += 1;
    this.scoreText.setText(this.registry.values.score);

    // randomly pick a nunber between 1 and 5
    const hole: number = Phaser.Math.Between(1, 5);

    // add 6 pipes with one big hole at position 'hole' and 'hole+1'
    for (let i = 0; i < 10; i++) {
      const isHole: boolean = ((i !== hole) && (i !== hole + 1) && (i !== hole + 2));

      if (!isHole) return;

      if (i === hole - 1)
        this.addPipe(400, i * 60, "pipe", 0);
      else if (i === hole + 3)
        this.addPipe(400, i * 60, "pipe", 1);
      else
        this.addPipe(400, i * 60, "pipe", 2);
        
    }
  }

  private addPipe(x:number, y:number, key:string, frame?:number): void {
    //create a new pipe at the position x and y and add it to the group
    const config:IPipe = {
      scene: this,
      key: "pipe",
      x,
      y,
      frame,
    }
    this.pipes.add(new Pipe(config)); 
  }
}
