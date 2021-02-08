import log from "loglevel";
import { Phase, ReadBattleState } from "../game/battle/battle_state";
import { Cards } from "../game/card/deck";
import { UIManager } from "./ui_manager";

export class InteractionHandler {
  constructor() {}
  setupBattleInteractions(battleState: ReadBattleState, uiManager: UIManager) {
    this._enablePlayerHand(
      battleState.getPlayerState().hand,
      battleState.getPhase() == Phase.PLAYER
    );
    this._enableUI(battleState.getPhase(), uiManager);
  }

  _enablePlayerHand(hand: Cards, enabled: boolean) {
    hand.forEach((card) => {
      if (enabled) {
        card.renderCard.sprite.setInteractive({ draggable: true });
        card.renderCard.sprite.on("dragstart", () => {
          card.renderCard.enableInfo(false);
        });
        card.renderCard.sprite.on("dragend", () => {
          card.renderCard.enableInfo(true);
        });

        card.renderCard.sprite.on(
          "drag",
          (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            card.renderCard.sprite.x = dragX;
            card.renderCard.sprite.y = dragY;
          }
        );
      } else {
        // TODO: this also disables mouseover on enemy turn
        // filter out inputs
        card.renderCard.sprite.disableInteractive();
      }
    });
  }

  _enableUI(phase: Phase, uiManager: UIManager) {
    let endTurnButton = uiManager.getButton("end_turn");

    if (phase == Phase.PLAYER) {
      endTurnButton.sprite.setInteractive();
    } else {
      endTurnButton.sprite.disableInteractive();
    }
  }
}
