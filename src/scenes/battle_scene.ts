import { GameState } from "../game/game_state";
import { CardFactory } from "../game/card/card_factory";
import { BattleRenderer } from "../render/battle_renderer";
import { UIManager } from "../ui/ui_manager";
import log from "loglevel";

export class BattleScene extends Phaser.Scene {
  private _gameState: GameState;
  private _cardFactory: CardFactory;
  private _renderer: BattleRenderer;
  private _uiManager: UIManager;

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
    // TODO trigger state changes on gamestate => tie this to event
    this._uiManager.updateState(this._gameState);
    log.debug("BattleScene created");
  }

  update(time: number, delta: number) {
    this._renderer.render(time, delta);
  }
}
