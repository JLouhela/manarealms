import log = require("loglevel");
import { BattleState } from "./battle_state";
import { Card } from "../card/card";
import { Effect, EffectType, ManaEffect } from "../card/effect";

export class CardEffectResolver {
  constructor() {}

  resolveCardEffects(card: Card, battleState: BattleState) {
    card.effects.forEach((effect) => {
      if (effect.type == EffectType.MANA) {
        this.resolveManaEffect(<ManaEffect>effect, battleState);
      } else {
        log.debug("Unhandled card effect " + effect.type);
      }
    });
    return true;
  }

  private resolveManaEffect(effect: ManaEffect, battleState: BattleState) {
    let playerState = battleState.getPlayerState();
    playerState._mana += effect.mana;
    log.debug("Added " + effect.mana + " mana to player");
  }
}
