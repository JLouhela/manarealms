import log = require("loglevel");
import { ReadBattleState } from "../game/battle/battle_state";
import { CardRenderer } from "./card_renderer";
import { InfoRenderer } from "./info_renderer";
import { EnemyRenderer } from "./enemy_renderer";
import { ButtonRenderer } from "./button_renderer";

export class BattleRenderer {
  private _rect: Phaser.Geom.Rectangle;
  private _battleState: ReadBattleState;
  private _cardRenderer: CardRenderer;
  private _infoRenderer: InfoRenderer;
  private _enemyRenderer: EnemyRenderer;
  private _buttonRenderer: ButtonRenderer;
  private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, rect: Phaser.Geom.Rectangle) {
    this._rect = rect;
    this._scene = scene;
    this._battleState = null;
    this._infoRenderer = new InfoRenderer(rect);
    this._cardRenderer = new CardRenderer(rect);
    this._enemyRenderer = new EnemyRenderer(rect);
    this._buttonRenderer = new ButtonRenderer(rect);
    let bg = scene.add.image(rect.width / 2, rect.height / 2, "test_bg");
    bg.setDepth(0);
  }

  init(battleState: ReadBattleState) {
    this._battleState = battleState;
    this._cardRenderer.init(this._scene, battleState);
    this._infoRenderer.init(this._scene, battleState);
    this._enemyRenderer.init(this._scene, battleState);
    this._buttonRenderer.init(this._scene, battleState);
  }

  render(time: number, delta: number): void {
    this._cardRenderer.renderPlayerCards(
      this._battleState.getPlayerState().deck,
      this._battleState.getPlayerState().hand
    );
    this._infoRenderer.render(this._battleState);
    this._enemyRenderer.render(this._battleState);
    this._buttonRenderer.render(this._battleState);
  }
}
