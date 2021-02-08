import { Effect } from "./effect";

export class CardData {
  private _manaCost: number;
  private _effects: Effect[];
  // TODO generate from effects?
  private _description: string;

  constructor() {
    this._effects = [];
  }

  get effects(): Effect[] {
    return this._effects;
  }

  get description(): string {
    return this._description;
  }

  addEffect(e: Effect) {
    this._effects.push(e);
  }

  get manacost(): number {
    return this._manaCost;
  }

  set manacost(cost: number) {
    this._manaCost = cost;
  }

  set description(desc: string) {
    this._description = desc;
  }
}
