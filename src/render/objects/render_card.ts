import log = require("loglevel");

export class RenderCard {
  private _image: Phaser.GameObjects.Image;
  private _manaCostText: Phaser.GameObjects.Text;
  private _renderContainer: Phaser.GameObjects.Container;
  private _textureKey: string;

  get textureKey(): string {
    return this._textureKey;
  }

  set textureKey(key: string) {
    this._textureKey = key;
  }

  constructor() {}

  init(scene: Phaser.Scene, manaCost: number): void {
    if (!this._textureKey) {
      log.warn("Card without texture!");
    }
    this._renderContainer = scene.add.container(0, 0);
    this._image = scene.add.image(0, 0, this._textureKey);
    let imageSize = this._image.getBounds();
    this._renderContainer.setSize(imageSize.width, imageSize.height);
    this._manaCostText = scene.add.text(-55, 0, "Cost: " + manaCost + " mana");
    this._renderContainer.add(this._image);
    this._renderContainer.add(this._manaCostText);
    this._renderContainer.setVisible(false);
  }

  get sprite(): Phaser.GameObjects.Container {
    return this._renderContainer;
  }
}
