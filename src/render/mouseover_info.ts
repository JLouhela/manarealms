import { Constants } from "../utils/constants";

export class MouseOverInfo {
  // TODO consider using single container and refer to it from all mouseoverinfos
  private _container: Phaser.GameObjects.Container;
  private _w: number;
  private _h: number;
  private _xOffset: number;
  private _yOffset: number;
  private _textOffset: number;

  constructor(
    scene: Phaser.Scene,
    target: Phaser.GameObjects.GameObject,
    text: string
  ) {
    // TODO scale with text length somehow
    this._w = 140;
    this._h = 200;
    this._textOffset = 10;
    this._xOffset = 100;
    this._yOffset = 10;
    this._initInfoBox(scene, text);

    target.on("pointerover", () => {
      this.show();
    });
    target.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      this._reposition(pointer.x, pointer.y);
    });
    target.on("pointerout", () => {
      this.hide();
    });
  }

  private _initInfoBox(scene: Phaser.Scene, text: string) {
    this._container = scene.add.container(0, 0);
    let rect = scene.add.rectangle(0, 0, this._w, this._h, 0x99aa99);
    rect.setStrokeStyle(2, 0x000000);
    let infoText = scene.add.text(
      -this._w / 2 + this._textOffset,
      -this._h / 2 + this._textOffset,
      text
    );
    infoText.setWordWrapWidth(this._w - this._textOffset * 2);
    this._container.add(rect);
    this._container.add(infoText);
    this._container.setDepth(Constants.UI.OverlayDepth);
    this._container.setSize(this._w, this._h);
    this.hide();
  }

  private _reposition(x: number, y: number) {
    this._container.x = x + this._xOffset;
    this._container.y = y + this._yOffset;
  }

  show() {
    this._container.setVisible(true);
  }

  hide() {
    this._container.setVisible(false);
  }
}
