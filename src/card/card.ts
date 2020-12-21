import { Effect } from "./effect";

export class Card {
  private _manaCost: number;
  private _effects: Effect[];

  get manacost(): number {
    return this._manaCost;
  }

  set manacost(cost: number) {
    this._manaCost = cost;
  }
}
