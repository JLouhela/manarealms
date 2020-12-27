import { Card } from "./card";
import { Effect, EffectType, ManaEffect } from "./effect";

export class CardFactory {
  constructor() {}

  GetTestCard(cost: number) {
    const card = new Card();
    card.manacost = cost;
    card.description = "this is a test card";
    card.textureKey = "test_card";
    return card;
  }

  GetTestManaCard(mana: number) {
    const card = new Card();
    card.manacost = 0;
    card.description = "this is a test card";
    card.textureKey = "test_card";

    let manaEffect = new Effect();
    // TODO think how to enforce dict to match manaeffect
    manaEffect.addEffect(EffectType.MANA, { mana: 1 });
    return card;
  }
}
