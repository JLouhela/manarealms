import { GameState } from "../game/game_state";
import { CardRenderer } from "./card_renderer";

export class Renderer {
  private _gameState: GameState;
  private _rect: Phaser.Geom.Rectangle;
  constructor(
    scene: Phaser.Scene,
    rect: Phaser.Geom.Rectangle,
    gameState: GameState
  ) {
    this._gameState = gameState;
    this._rect = rect;
    let bg = scene.add.image(rect.width / 2, rect.height / 2, "test_bg");
    bg.setDepth(0);
  }

  render(time: number, delta: number): void {
    CardRenderer.renderPlayerCards(this._gameState.player.deck, this._rect);
  }
}
