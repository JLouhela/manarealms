import { GameState } from "../game/game_state";
import { DebugPlayerFactory } from "../debug/debug_player_factory";
import { CardFactory } from "../card/card_factory";
import { Renderer } from "../render/renderer";
import * as log from "loglevel";

export class BattleScene extends Phaser.Scene {
  private _gameState: GameState;
  private _cardFactory: CardFactory;
  private _renderer: Renderer;
  constructor() {
    super({
      key: "BattleScene",
    });
  }

  create(): void {
    this._cardFactory = new CardFactory(this);
    const player = DebugPlayerFactory.buildPlayer(this._cardFactory);
    this._gameState = new GameState(player);

    let { width, height } = this.sys.game.canvas;
    this._renderer = new Renderer(
      this,
      new Phaser.Geom.Rectangle(0, 0, width, height),
      this._gameState
    );
    log.debug("BattleScene created");
  }

  update(time: number, delta: number) {
    this._renderer.render(time, delta);
  }
}
