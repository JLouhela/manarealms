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
    const startX = 500;
    const cardY = rect.bottom * 0.8;
    const spacerX = 180;
    for (let i = 0; i < cards.length; ++i) {
      cards[i].sprite.x = startX + spacerX * i;
      cards[i].sprite.y = cardY;
      cards[i].sprite.setDepth(Constants.UI.HandDepth);
    }
  }
}
