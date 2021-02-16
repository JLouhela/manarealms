import log = require("loglevel");
import { BattleState } from "./battle_state";
import { Card } from "../card/card";
import { Effect, EffectType, ManaEffect } from "../card/effect";
import { CardData } from "../card/card_data";

export class CardEffectResolver {
  constructor() {}

  resolveCardEffects(card: CardData, battleState: BattleState) {
    card.effects.forEach((effect) => {
      if (effect.type == EffectType.MANA) {
        this.resolveManaEffect(<ManaEffect>effect, battleState);
      } else {
        log.debug("Unhandled card effect " + effect.type);
      }
    });
    return true;
  }

  resolveCommitEffects(card: CardData, battleState: BattleState) {
    // Currently only mana supported
    let manaInc: number = 0;
    card.effects.forEach((effect) => {
      if (effect.type == EffectType.MANA) {
        manaInc += (<ManaEffect>effect).mana;
      }
    });
    let playerState = battleState.getPlayerState();
    playerState.addCommittedMana(manaInc);
    log.debug("Committed " + manaInc + " mana");
  }

  private resolveManaEffect(effect: ManaEffect, battleState: BattleState) {
    let playerState = battleState.getPlayerState();
    playerState._mana += effect.mana;
    log.debug("Added " + effect.mana + " mana to player");
  }
}
