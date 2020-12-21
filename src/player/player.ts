import { Deck } from "../card/deck";

export class Player {
  private _name: string;
  private _deck: Deck;

  get name(): string {
    return this._name;
  }
  get deck(): Deck {
    return this._deck;
  }
  set deck(d: Deck) {
    this._deck = d;
  }
}
