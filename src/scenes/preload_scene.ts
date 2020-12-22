import { Assets } from "../asset/assets";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PreloadScene",
    });
  }

  preload(): void {
    this.load.on("progress", (percentage: number) => {
      console.log("Load percentage: " + percentage * 100) + "%";
    });
    this.load.on("complete", () => {
      console.log("Preload complete");
      this.scene.start("BattleScene");
    });

    Assets.testAssets.forEach((asset) => {
      this.load.image(asset.name, "assets/" + asset.uri);
    });
  }
}
