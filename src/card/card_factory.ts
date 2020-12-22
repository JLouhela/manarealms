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
    card.sprite = this._scene.add.image(0, 0, "test_card");
    return card;
  }
}
