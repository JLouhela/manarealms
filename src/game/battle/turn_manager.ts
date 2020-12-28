import log = require("loglevel");
import { Deck } from "../card/deck";
import { Card } from "../card/card";
import { BattleState } from "./battle_state";
import { RuleChecker } from "./rule_checker";

export class TurnManager {
  private _battleState: BattleState;
  private _ruleChecker: RuleChecker;
  constructor(battleState: BattleState) {
    this._battleState = battleState;
    this._ruleChecker = new RuleChecker();
  }

  initPlayerTurn() {
    while (
      this._battleState.getPlayerState().hand.length <
      this._battleState.config.maxPlayerCards
    ) {
      let playerState = this._battleState.getPlayerState();
      if (playerState.deck.pile.length == 0) {
        if (playerState.deck.discardPile.length > 0) {
          playerState.deck.shuffleDiscardsBack();
        } else {
          // There are no cards to draw
          log.debug("No more cards to draw in initPlayerTurn");
          break;
        }
      } else {
        let card = playerState.deck.pile.pop();
        card.sprite.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
          this.playPlayerCard(card);
        });
        playerState.hand.push(card);
      }
    }
    log.debug("Player turn initializd");
  }

  playPlayerCard(card: Card) {
    if (!this._ruleChecker.canPlay(card, this._battleState)) {
      log.debug("Cannot play card " + card);
      return;
    }
    card.sprite.setTint(0xff0000);
  }
}
