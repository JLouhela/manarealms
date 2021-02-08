import log = require("loglevel");
import { MouseOverInfo } from "../mouseover_info";
import { Card } from "../../game/card/card";

export class RenderCard {
  private _image: Phaser.GameObjects.Image;
  private _manaCostText: Phaser.GameObjects.Text;
  private _renderContainer: Phaser.GameObjects.Container;
  private _textureId: string = "";
  private _mouseoverInfo: MouseOverInfo;

  set textureId(id: string) {
    this._textureId = id;
  }

  // TODO break cyclic dependency: card owns rendercard
  // => separate card data into own container
  init(scene: Phaser.Scene, card: Card): void {
    if (this.textureId === "") {
      log.warn("Card without texture!");
    }
    this._renderContainer = scene.add.container(0, 0);
    this._image = scene.add.image(0, 0, "cards", this._textureId);
    let imageSize = this._image.getBounds();
    this._renderContainer.setSize(imageSize.width, imageSize.height);
    this._manaCostText = scene.add.text(
      -55,
      0,
      "Cost: " + card.manacost + " mana"
    );
    this._renderContainer.add(this._image);
    this._renderContainer.add(this._manaCostText);
    this._renderContainer.setVisible(false);

    this._mouseoverInfo = new MouseOverInfo(
      scene,
      this._renderContainer,
      card.description
    );
  }

  get sprite(): Phaser.GameObjects.Container {
    return this._renderContainer;
  }

  enableInfo(val: boolean): void {
    if (val) {
      this._mouseoverInfo.enable();
    } else {
      this._mouseoverInfo.disable();
    }
  }
}
