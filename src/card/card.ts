import { Effect } from "./effect";

export class Card {
  private _manaCost: number;
  private _effects: Effect[];
  private _image: Phaser.GameObjects.Image;
  private _description: string;

  get sprite(): Phaser.GameObjects.Image {
    return this._image;
  }

  set sprite(img: Phaser.GameObjects.Image) {
    this._image = img;
  }

  get manacost(): number {
    return this._manaCost;
  }

  set manacost(cost: number) {
    this._manaCost = cost;
  }

  get description(): string {
    return this._description;
  }

  set description(desc: string) {
    this._description = desc;
  }
}
