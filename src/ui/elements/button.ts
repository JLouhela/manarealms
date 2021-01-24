import log = require("loglevel");

export class Button {
  private _image: Phaser.GameObjects.Image;
  private _textureKey: string;
  private _event: string;

  constructor(event: string, textureKey: string) {
    this._event = event;
    this._textureKey = textureKey;
  }

  get name(): string {
    // Event is the name
    return this._event;
  }

  get sprite(): Phaser.GameObjects.Image {
    return this._image;
  }

  get textureKey(): string {
    return this._textureKey;
  }

  set sprite(img: Phaser.GameObjects.Image) {
    this._image = img;
  }
}
