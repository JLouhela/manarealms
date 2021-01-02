import { Effect } from "./effect";

// TODO separate render stuff from content, e.g. RenderCard
export class Card {
  private _manaCost: number;
  private _effects: Effect[];
  private _textureKey: string;
  private _image: Phaser.GameObjects.Image;
  private _description: string;
  private _manaCostText: Phaser.GameObjects.Text;
  private _renderContainer: Phaser.GameObjects.Container;

  constructor() {
    this._effects = [];
  }

  get textureKey(): string {
    return this._textureKey;
  }

  set textureKey(key: string) {
    this._textureKey = key;
  }

  get effects(): Effect[] {
    return this._effects;
  }

  addEffect(e: Effect) {
    this._effects.push(e);
  }

  get manaCostText(): Phaser.GameObjects.Text {
    return this._manaCostText;
  }

  set manaCostText(txt: Phaser.GameObjects.Text) {
    this._manaCostText = txt;
  }

  get renderContainer(): Phaser.GameObjects.Container {
    return this._renderContainer;
  }

  set renderContainer(container: Phaser.GameObjects.Container) {
    this._renderContainer = container;
  }

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
