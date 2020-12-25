import { Card } from "./card";

export type Cards = Card[];

export class Deck {
  private _discardPile: Cards;
  private _pile: Cards;

  constructor() {
    this._discardPile = [];
    this._pile = [];
  }

  public addCard(c: Card): void {
    this._pile.push(c);
  }

  private shuffle(cards: Cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  public shuffleDiscardsBack(): void {
    this.shuffle(this._discardPile);
    this._pile = this._pile.concat(this._discardPile);
    this._discardPile = [];
  }

  // TODO remove card
  // TODO addToDiscard

  get pile(): Cards {
    return this._pile;
  }

  get discardPile(): Cards {
    return this._discardPile;
  }
}
