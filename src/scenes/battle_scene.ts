export class BattleScene extends Phaser.Scene {
  constructor() {
    super({
      key: "BattleScene",
    });
  }

  create(): void {
    this.add.image(1024 / 2, 600 / 2, "test");
  }
}
