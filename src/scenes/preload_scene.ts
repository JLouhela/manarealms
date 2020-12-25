import { Assets } from "../asset/assets";
import { GameState } from "../game/game_state";
import { Player } from "../game/player/player";
import { UIManager } from "../ui/ui_manager";
import { DebugPlayerFactory } from "../debug/debug_player_factory";
import log from "loglevel";

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
      this.startGlobals();
      this.scene.start("BattleScene");
    });

    Assets.testAssets.forEach((asset) => {
      this.load.image(asset.name, "assets/" + asset.uri);
    });
  }

  startGlobals(): void {
    const player = DebugPlayerFactory.buildPlayer();
    this.registry.set("gamestate", new GameState(player));
    this.registry.set("uimanager", new UIManager());
  }
}
