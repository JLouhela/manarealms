import log = require("loglevel");
import { ReadBattleState } from "./battle_state";
import { CardData } from "../card/card_data";

export class RuleChecker {
  constructor() {}

  canPlay(card: CardData, battleState: ReadBattleState) {
    // No other factors for now
    if (card.manacost <= battleState.getPlayerState().mana) {
      return true;
    }
  }
}
