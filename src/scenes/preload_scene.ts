export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PreloadScene",
    });
  }

  //TODO define every asset to be preloaded in assets.ts
  preload(): void {
    this.load.on("progress", (percentage: number) => {
      console.log("Load percentage: " + percentage * 100) + "%";
    });
    this.load.on("complete", () => {
      console.log("Preload complete");
      this.scene.start("BattleScene");
    });
    this.load.image("test", "assets/test_asset.png");
  }
}
