import { Card } from "./card";

export class Deck {
  private _discardPile: Card[];
  private _pile: Card[];

  constructor() {
    this._discardPile = [];
    this._pile = [];
  }

  public addCard(c: Card): void {
    this._pile.push(c);
  }
}
