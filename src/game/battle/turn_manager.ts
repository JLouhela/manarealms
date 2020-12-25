import log = require("loglevel");
import { Deck } from "../card/deck";
import { Card } from "../card/card";
import { BattleState } from "./battle_state";

export class TurnManager {
  private _battleState: BattleState;
  constructor(battleState: BattleState) {
    this._battleState = battleState;
  }

  initPlayerTurn() {
    while (
      this._battleState.getPlayerHand().length <
      this._battleState.config.maxPlayerCards
    ) {
      if (this._battleState.getPlayerDeck().pile.length == 0) {
        if (this._battleState.getPlayerDeck().discardPile.length > 0) {
          this._battleState.getPlayerDeck().shuffleDiscardsBack();
        } else {
          // There are no cards to draw
          log.debug("No more cards to draw in initPlayerTurn");
          break;
        }
      } else {
        let card = this._battleState.getPlayerDeck().pile.pop();
        card.sprite.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
          this.playPlayerCard(card);
        });
        this._battleState.getPlayerHand().push(card);
      }
    }
    log.debug("Player turn initializd");
  }

  playPlayerCard(card: Card) {
    // TODO
    card.sprite.setTint(0xff0000);
  }
}
