import { Card } from "./card";

export class CardFactory {
  constructor() {}

  GetTestCard(cost: number) {
    const card = new Card();
    card.manacost = cost;
    card.description = "this is a test card";
    card.textureKey = "test_card";
    return card;
  }
}
