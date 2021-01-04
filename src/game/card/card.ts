import { Effect } from "./effect";
import { RenderCard } from "../../render/objects/render_card";

// TODO separate render stuff from content, e.g. RenderCard
export class Card {
  private _manaCost: number;
  private _effects: Effect[];
  private _renderCard: RenderCard;

  constructor() {
    this._effects = [];
    this._renderCard = new RenderCard();
  }

  get renderCard(): RenderCard {
    return this._renderCard;
  }

  get effects(): Effect[] {
    return this._effects;
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
}
