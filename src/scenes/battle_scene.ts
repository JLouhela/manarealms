import { GameState } from "../game/game_state";
import { BattleRenderer } from "../render/battle_renderer";
import { UIManager } from "../ui/ui_manager";
import { TurnManager } from "../game/battle/turn_manager";
import log from "loglevel";

export class BattleScene extends Phaser.Scene {
  private _gameState: GameState;
  private _renderer: BattleRenderer;
  private _uiManager: UIManager;
  private _turnManager: TurnManager;

  constructor() {
    super({
      key: "BattleScene",
    });
  }

  create(): void {
    log.debug("create BattleScene");
    this._gameState = this.registry.get("gamestate");
    this._gameState.getBattleState().init(this._gameState.player.deck);
    this._uiManager = this.registry.get("uimanager");
    let { width, height } = this.sys.game.canvas;
    this._renderer = new BattleRenderer(
      this,
      new Phaser.Geom.Rectangle(0, 0, width, height)
    );
    this._renderer.init(this._gameState.getBattleState());
    this._turnManager = new TurnManager(this._gameState.getBattleState());
    // TODO trigger state changes on gamestate / battlestate => tie these to events
    this._turnManager.initPlayerTurn();
    this._uiManager.updateState(this._gameState);
    log.debug("BattleScene created");
  }

  update(time: number, delta: number) {
    this._renderer.render(time, delta);
  }
}
