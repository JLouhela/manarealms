import { Phase, ReadBattleState } from "../game/battle/battle_state";
import { UIManager } from "../ui/ui_manager";
import { Button } from "../ui/elements/button";

export class BattleUIRenderer {
  private _endTurnButton: Button;
  private _manaText: Phaser.GameObjects.Text;
  private _hpText: Phaser.GameObjects.Text;
  private _turnText: Phaser.GameObjects.Text;
  private _rect: Phaser.Geom.Rectangle;
  private _uiManager: UIManager;

  constructor(rect: Phaser.Geom.Rectangle, uiManager: UIManager) {
    this._rect = rect;
    this._uiManager = uiManager;
  }

  _initTexts(scene: Phaser.Scene): void {
    this._manaText = scene.add.text(
      this._rect.width * 0.1,
      this._rect.height * 0.95,
      "",
      { color: "#000000" }
    );
    this._hpText = scene.add.text(this._manaText.x, this._manaText.y + 15, "", {
      color: "#000000",
    });
    this._turnText = scene.add.text(
      this._rect.width * 0.85,
      this._rect.height * 0.95,
      "",
      { color: "#000000" }
    );
  }

  _initButtons(scene: Phaser.Scene) {
    this._endTurnButton.sprite = scene.add.image(
      this._rect.width / 2,
      this._rect.height * 0.96,
      this._endTurnButton.textureKey
    );
  }

  init(scene: Phaser.Scene, battleState: ReadBattleState) {
    this._endTurnButton = this._uiManager.getButton("end_turn");
    this._initButtons(scene);
    this._initTexts(scene);
    this.render(battleState);
  }

  render(battleState: ReadBattleState): void {
    this._renderInfoTexts(battleState);
    this._renderButtons(battleState);
  }

  _renderButtons(battleState: ReadBattleState) {
    if (battleState.getPhase() == Phase.PLAYER) {
      // TODO rather display greyed out version -> include state toggle to button
      this._endTurnButton.sprite.visible = true;
    } else {
      this._endTurnButton.sprite.visible = false;
    }
  }

  _renderInfoTexts(battleState: ReadBattleState) {
    this._manaText.text = "Player mana: " + battleState.getPlayerState().mana;
    this._hpText.text = "Player hp: " + battleState.getPlayerState().hp;
    this._turnText.text =
      "Turn: " + (battleState.getPhase() === Phase.PLAYER ? "PLAYER" : "ENEMY");
  }
}
