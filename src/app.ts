import "phaser";
import { BattleScene } from "./scenes/battle_scene";
import { PreloadScene } from "./scenes/preload_scene";

const config: Phaser.Types.Core.GameConfig = {
  title: "Manarealms",
  width: 1024,
  height: 600,
  parent: "game",
  scene: [PreloadScene, BattleScene],
  backgroundColor: "#b0ceff",
};
export class ManaRealmsGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new ManaRealmsGame(config);
};
