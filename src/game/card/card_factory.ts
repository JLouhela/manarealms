import { Card } from "./card";
import { GetManaEffect } from "./effect";

export class CardFactory {
  constructor() {}

  GetTestCard(cost: number) {
    const card = new Card();
    card.manacost = cost;
    card.renderCard.textureKey = "test_card";
    return card;
  }

  GetTestManaCard(mana: number) {
    const card = new Card();
    card.manacost = 0;
    card.renderCard.textureKey = "test_card";
    card.addEffect(GetManaEffect(1));
    // TODO generate desc from effect(s)
    card.description = "Grant 1 mana";
    return card;
  }
}
