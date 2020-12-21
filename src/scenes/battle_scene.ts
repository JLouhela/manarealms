import { GameState } from "../game/game_state";
import { DebugPlayerFactory } from "../debug/debug_player_factory";

export class BattleScene extends Phaser.Scene {
  private _gameState: GameState;
  constructor() {
    super({
      key: "BattleScene",
    });
  }

  create(): void {
    const player = DebugPlayerFactory.buildPlayer();
    this._gameState = new GameState(player);
    this.add.image(1024 / 2, 600 / 2, "test");
  }
}
