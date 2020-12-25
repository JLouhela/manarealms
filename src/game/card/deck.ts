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

  get pile(): Cards {
    return this._pile;
  }

  get discardPile(): Cards {
    return this._discardPile;
  }
}
