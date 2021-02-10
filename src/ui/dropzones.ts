import { Encounter } from "../game/battle/encounter";

export class DropZones {
  public static PLAY_AREA_ID: string = "play_area";
  public static COMMIT_AREA_ID: string = "commit_area";

  private _playArea: Phaser.GameObjects.Rectangle;
  private _commitArea: Phaser.GameObjects.Rectangle;

  constructor() {}

  init(scene: Phaser.Scene, encounter: Encounter) {
    this._initPlayArea(scene);
    this._initCommitArea(scene);
    this._initEnemies(encounter);
  }

  _initPlayArea(scene: Phaser.Scene) {
    let { width, height } = scene.sys.game.canvas;
    this._playArea = scene.add.rectangle(
      width / 2,
      height / 2,
      width / 2,
      height / 3,
      0xff00ff,
      0.1
    );
    this._playArea.setDepth(50000);
    this._playArea.setInteractive({ dropZone: true });
    this._playArea.setName(DropZones.PLAY_AREA_ID);
  }

  _initCommitArea(scene: Phaser.Scene) {
    let { width, height } = scene.sys.game.canvas;
    this._commitArea = scene.add.rectangle(
      width / 8,
      height / 2,
      width / 6,
      height / 3,
      0x3300aa,
      0.1
    );
    this._commitArea.setDepth(50000);
    this._commitArea.setInteractive({ dropZone: true });
    this._commitArea.setName(DropZones.COMMIT_AREA_ID);
  }

  _initEnemies(encounter: Encounter) {
    encounter.enemies.forEach((enemy) => {
      // TODO define larger rect for easier interaction
      // .. however targeting should be handled as a seprate step instead of
      // drag card over enemy, dragging blocks view and feels inconvenient.
      // Fine for now (testing purposes)
      enemy.renderEnemy.sprite.setInteractive({ dropZone: true });
      enemy.renderEnemy.sprite.setName(enemy.id);
    });
  }

  enable(encounter: Encounter) {
    this._commitArea.setInteractive({ dropZone: true });
    this._playArea.setInteractive({ dropZone: true });
    this._initEnemies(encounter);
  }

  disable(encounter: Encounter) {
    this._commitArea.disableInteractive();
    this._playArea.disableInteractive();
    encounter.enemies.forEach((enemy) => {
      enemy.renderEnemy.sprite.disableInteractive();
    });
  }
}
