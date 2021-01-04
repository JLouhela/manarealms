import { Cards, Deck } from "../game/card/deck";
import { Constants } from "../utils/constants";
import { ReadBattleState } from "../game/battle/battle_state";
import log = require("loglevel");

export class CardRenderer {
  private _rect: Phaser.Geom.Rectangle;
  constructor(rect: Phaser.Geom.Rectangle) {
    this._rect = rect;
  }

  init(scene: Phaser.Scene, battleState: ReadBattleState) {
    battleState.getPlayerState().deck.pile.forEach((card) => {
      card.renderCard.init(scene, card.manacost);
    });
    log.debug("CardRenderer initialized, card sprites created");
  }

  renderPlayerCards(deck: Deck, hand: Cards): void {
    this._renderPlayerHand(hand);
    this._renderDiscardPile(deck.discardPile);
  }

  private _renderPlayerHand(cards: Cards) {
    let spacerX = this._rect.width * 0.01;
    let startX =
      this._rect.width / 2 -
      (cards.length / 2) * Constants.Sprite.CardWidth +
      spacerX;
    const cardY = this._rect.bottom * 0.8;
    const cardXAdd = Constants.Sprite.CardWidth + spacerX;
    for (let i = 0; i < cards.length; ++i) {
      cards[i].renderCard.sprite.x = startX + cardXAdd * i;
      cards[i].renderCard.sprite.y = cardY;
      cards[i].renderCard.sprite.setDepth(Constants.UI.HandDepth);
      cards[i].renderCard.sprite.setVisible(true);
    }
  }

  private _renderDiscardPile(pile: Cards) {
    if (pile.length == 0) {
      return;
    }
    const cardY = this._rect.bottom * 0.8;
    const cardX = this._rect.right * 0.1;
    for (let i = 0; i < pile.length - 1; ++i) {
      pile[i].renderCard.sprite.setVisible(false);
    }
    let topCard = pile[pile.length - 1];
    topCard.renderCard.sprite.setVisible(true);
    topCard.renderCard.sprite.x = cardX;
    topCard.renderCard.sprite.y = cardY;
    topCard.renderCard.sprite.angle = 90;
  }
}
