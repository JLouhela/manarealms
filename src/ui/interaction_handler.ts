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
        card.renderCard.sprite.setInteractive();
      } else {
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
