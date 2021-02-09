import { Encounter } from "../game/battle/encounter";

export class DropZones {
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
      height / 4,
      0xff00ff,
      0.1
    );
    this._playArea.setDepth(50000);
  }

  _initCommitArea(scene: Phaser.Scene) {
    let { width, height } = scene.sys.game.canvas;
    this._commitArea = scene.add.rectangle(
      width / 8,
      height / 2,
      width / 6,
      height / 4,
      0x3300aa,
      0.1
    );
    this._commitArea.setDepth(50000);
  }

  _initEnemies(encounter: Encounter) {}
}
