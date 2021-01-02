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
      card.renderContainer = scene.add.container(0, 0);
      card.sprite = scene.add.image(0, 0, card.textureKey);
      card.manaCostText = scene.add.text(
        -55,
        0,
        "Cost: " + card.manacost + " mana"
      );
      card.renderContainer.add(card.sprite);
      card.renderContainer.add(card.manaCostText);
      card.renderContainer.setVisible(false);
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
      cards[i].renderContainer.x = startX + cardXAdd * i;
      cards[i].renderContainer.y = cardY;
      cards[i].renderContainer.setDepth(Constants.UI.HandDepth);
      cards[i].renderContainer.setVisible(true);
    }
  }

  private _renderDiscardPile(pile: Cards) {
    if (pile.length == 0) {
      return;
    }
    const cardY = this._rect.bottom * 0.8;
    const startX = this._rect.right * 0.1;
    for (let i = 0; i < pile.length - 1; ++i) {
      pile[i].renderContainer.setVisible(false);
    }
    pile[pile.length - 1].renderContainer.setVisible(true);
  }
}
