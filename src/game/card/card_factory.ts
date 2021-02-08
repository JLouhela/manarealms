import { Card } from "./card";
import { GetManaEffect } from "./effect";
import { Assets } from "../../asset/assets";

export class CardFactory {
  constructor() {}

  GetTestCard(cost: number) {
    const card = new Card();
    card.data.manacost = cost;
    card.renderCard.textureId = Assets.CardTexture.PLACEHOLDER;
    return card;
  }

  GetTestManaCard(mana: number) {
    const card = new Card();
    card.data.manacost = 0;
    card.renderCard.textureId = Assets.CardTexture.MANA;
    card.data.addEffect(GetManaEffect(1));
    // TODO generate desc from effect(s)
    card.data.description = "Grant 1 mana";
    return card;
  }
}
