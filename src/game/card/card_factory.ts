import { Card } from "./card";

export class CardFactory {
  private _scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this._scene = scene;
  }

  GetTestCard(cost: number) {
    const card = new Card();
    card.manacost = cost;
    card.description = "this is a test card";
    card.sprite = this._scene.add.image(0, 0, "test_card").setInteractive();
    card.sprite.on("pointerdown", function (pointer: Phaser.Input.Pointer) {
      // TODO create some kind of handler (UI): what elements are interactive and whatnot
      this.setTint(0xff0000);
    });

    return card;
  }
}
