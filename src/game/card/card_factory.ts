import { Card } from "./card";
import { EffectType, GetManaEffect } from "./effect";

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
    card.addEffect(GetManaEffect(1));
    return card;
  }
}
