import { Phase, ReadBattleState } from "../game/battle/battle_state";

export class ButtonRenderer {
  private _endTurnButton: Phaser.GameObjects.Image;
  private _rect: Phaser.Geom.Rectangle;

  constructor(rect: Phaser.Geom.Rectangle) {
    this._rect = rect;
  }

  init(scene: Phaser.Scene, battleState: ReadBattleState) {
    this._endTurnButton = scene.add.image(
      this._rect.width * 0.9,
      this._rect.height * 0.5,
      "btn_end_turn"
    );
    this.render(battleState);
  }
  render(battleState: ReadBattleState): void {
    if (battleState.getPhase() == Phase.PLAYER) {
      this._endTurnButton.visible = true;
    } else {
      this._endTurnButton.visible = false;
    }
  }
}
