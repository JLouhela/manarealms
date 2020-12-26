import { Cards, Deck } from "../game/card/deck";
import { Constants } from "../utils/constants";

export namespace CardRenderer {
  export function renderPlayerCards(
    deck: Deck,
    hand: Cards,
    rect: Phaser.Geom.Rectangle
  ): void {
    renderPlayerHand(hand, rect);
  }

  function renderPlayerHand(cards: Cards, rect: Phaser.Geom.Rectangle) {
    let spacerX = rect.width * 0.01;
    let startX =
      rect.width / 2 -
      (cards.length / 2) * Constants.Sprite.CardWidth +
      spacerX;
    const cardY = rect.bottom * 0.8;
    const cardXAdd = Constants.Sprite.CardWidth + spacerX;
    for (let i = 0; i < cards.length; ++i) {
      cards[i].renderContainer.x = startX + cardXAdd * i;
      cards[i].renderContainer.y = cardY;
      cards[i].renderContainer.setDepth(Constants.UI.HandDepth);
    }
  }
}
