import log = require("loglevel");
import { ReadBattleState } from "./battle_state";
import { CardData } from "../card/card_data";
import { EffectType } from "../card/effect";

export class RuleChecker {
  constructor() {}

  canPlay(card: CardData, battleState: ReadBattleState) {
    const playerState = battleState.getPlayerState();
    // No other factors for now
    if (card.manacost <= playerState.mana + playerState.committedMana) {
      return true;
    }
    return false;
  }

  canCommit(card: CardData, battleState: ReadBattleState) {
    // No other factors for now
    let ret = false;
    card.effects.forEach((effect) => {
      if (effect.type == EffectType.MANA) {
        ret = true;
        return;
      }
    });
    return ret;
  }
}
