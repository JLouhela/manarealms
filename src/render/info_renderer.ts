import { Phase, ReadBattleState } from "../game/battle/battle_state";

export class InfoRenderer {
  private _manaText: Phaser.GameObjects.Text;
  private _turnText: Phaser.GameObjects.Text;
  private _rect: Phaser.Geom.Rectangle;

  constructor(rect: Phaser.Geom.Rectangle) {
    this._rect = rect;
  }

  init(scene: Phaser.Scene, battleState: ReadBattleState) {
    this._manaText = scene.add.text(
      this._rect.width * 0.1,
      this._rect.height * 0.95,
      "",
      { color: "#000000" }
    );
    this._turnText = scene.add.text(
      this._rect.width * 0.85,
      this._rect.height * 0.95,
      "",
      { color: "#000000" }
    );
    this.render(battleState);
  }
  render(battleState: ReadBattleState): void {
    this._manaText.text = "Player mana: " + battleState.getPlayerState().mana;
    this._turnText.text =
      "Turn: " + (battleState.getPhase() === Phase.PLAYER ? "PLAYER" : "ENEMY");
  }
}
