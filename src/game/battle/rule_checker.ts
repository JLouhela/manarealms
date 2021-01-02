import log = require("loglevel");
import { ReadBattleState } from "./battle_state";
import { Card } from "../card/card";

export class RuleChecker {
  constructor() {}

  canPlay(card: Card, battleState: ReadBattleState) {
    // No other factors for now
    if (card.manacost <= battleState.getPlayerState().mana) {
      return true;
    }
  }
}
