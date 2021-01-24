import log = require("loglevel");
import { ReadBattleState } from "../game/battle/battle_state";
import { CardRenderer } from "./card_renderer";
import { EnemyRenderer } from "./enemy_renderer";
import { BattleUIRenderer } from "./battle_ui_renderer";
import { UIManager } from "../ui/ui_manager";

export class BattleRenderer {
  private _rect: Phaser.Geom.Rectangle;
  private _battleState: ReadBattleState;
  private _cardRenderer: CardRenderer;
  private _enemyRenderer: EnemyRenderer;
  private _battleUIRenderer: BattleUIRenderer;
  private _scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    rect: Phaser.Geom.Rectangle,
    uiManager: UIManager
  ) {
    this._rect = rect;
    this._scene = scene;
    this._battleState = null;
    this._cardRenderer = new CardRenderer(rect);
    this._enemyRenderer = new EnemyRenderer(rect);
    this._battleUIRenderer = new BattleUIRenderer(rect, uiManager);
    let bg = scene.add.image(rect.width / 2, rect.height / 2, "test_bg");
    bg.setDepth(0);
  }

  init(battleState: ReadBattleState) {
    this._battleState = battleState;
    this._cardRenderer.init(this._scene, battleState);
    this._enemyRenderer.init(this._scene, battleState);
    this._battleUIRenderer.init(this._scene, battleState);
  }

  render(time: number, delta: number): void {
    this._cardRenderer.renderPlayerCards(
      this._battleState.getPlayerState().deck,
      this._battleState.getPlayerState().hand
    );
    this._enemyRenderer.render(this._battleState);
    this._battleUIRenderer.render(this._battleState);
  }
}
