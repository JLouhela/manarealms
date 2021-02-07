import { Card } from "./card";
import { GetManaEffect } from "./effect";
import { Assets } from "../../asset/assets";

export class CardFactory {
  constructor() {}

  GetTestCard(cost: number) {
    const card = new Card();
    card.manacost = cost;
    card.renderCard.textureId = Assets.CardTexture.PLACEHOLDER;
    return card;
  }

  GetTestManaCard(mana: number) {
    const card = new Card();
    card.manacost = 0;
    card.renderCard.textureId = Assets.CardTexture.MANA;
    card.addEffect(GetManaEffect(1));
    // TODO generate desc from effect(s)
    card.description = "Grant 1 mana";
    return card;
  }
}
