import log from "loglevel";
import { Phase, ReadBattleState } from "../game/battle/battle_state";
import { Cards } from "../game/card/deck";

function enablePlayerHand(hand: Cards, enabled: boolean) {
  log.debug("Enable player interactions " + enabled);
  hand.forEach((card) => {
    if (enabled) {
      card.sprite.setInteractive();
    } else {
      card.sprite.disableInteractive();
    }
  });
}

export class InteractionHandler {
  constructor() {}
  setupBattleInteractions(battleState: ReadBattleState) {
    enablePlayerHand(
      battleState.getPlayerHand(),
      battleState.getPhase() == Phase.PLAYER
    );
  }
}
