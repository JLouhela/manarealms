import { Effect } from "./effect";
import { RenderCard } from "../../render/objects/render_card";
import { CardData } from "./card_data";

export class Card {
  private _renderCard: RenderCard;
  private _data: CardData;

  constructor() {
    this._data = new CardData();
    this._renderCard = new RenderCard();
  }

  get renderCard(): RenderCard {
    return this._renderCard;
  }

  get data(): CardData {
    return this._data;
  }
}
