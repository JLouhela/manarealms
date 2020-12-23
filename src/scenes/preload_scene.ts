import { Assets } from "../asset/assets";
import * as log from "loglevel";

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: "PreloadScene",
    });
  }

  preload(): void {
    this.load.on("progress", (percentage: number) => {
      log.debug("Load percentage: " + percentage * 100) + "%";
    });
    this.load.on("complete", () => {
      console.info("Asset loading complete");
      this.scene.start("BattleScene");
    });

    Assets.testAssets.forEach((asset) => {
      this.load.image(asset.name, "assets/" + asset.uri);
    });
  }
}
