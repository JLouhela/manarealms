import log = require("loglevel");
import { ReadBattleState } from "../game/battle/battle_state";
import { CardRenderer } from "./card_renderer";

export class BattleRenderer {
  private _rect: Phaser.Geom.Rectangle;
  private _battleState: ReadBattleState;
  private _scene: Phaser.Scene;
  constructor(scene: Phaser.Scene, rect: Phaser.Geom.Rectangle) {
    this._rect = rect;
    this._scene = scene;
    this._battleState = null;
    let bg = scene.add.image(rect.width / 2, rect.height / 2, "test_bg");
    bg.setDepth(0);
  }

  init(battleState: ReadBattleState) {
    this._battleState = battleState;
    battleState.getPlayerState().deck.pile.forEach((card) => {
      card.renderContainer = this._scene.add.container(0, 0);
      card.sprite = this._scene.add.image(0, 0, card.textureKey);
      card.manaCostText = this._scene.add.text(
        -55,
        0,
        "Cost: " + card.manacost + " mana"
      );
      card.renderContainer.add(card.sprite);
      card.renderContainer.add(card.manaCostText);
    });
    log.debug("BattleRenderer initialized, card sprites created");
  }

  render(time: number, delta: number): void {
    CardRenderer.renderPlayerCards(
      this._battleState.getPlayerState().deck,
      this._battleState.getPlayerState().hand,
      this._rect
    );
  }
}
