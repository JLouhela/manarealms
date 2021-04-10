import log = require("loglevel");
import { Card } from "../card/card";
import { BattleState, Phase } from "./battle_state";
import { RuleChecker } from "./rule_checker";
import { CardEffectResolver } from "./card_effect_resolver";
import { EncounterAI } from "./ai/encounter_ai";

export class TurnManager {
  private _battleState: BattleState;
  private _ruleChecker: RuleChecker;
  private _cardEffectResolver: CardEffectResolver;
  private _encounterAI: EncounterAI;

  constructor(battleState: BattleState) {
    this._battleState = battleState;
    this._ruleChecker = new RuleChecker();
    this._cardEffectResolver = new CardEffectResolver();
    this._encounterAI = new EncounterAI(battleState, () => {
      log.debug("AI ended turn");
      // TODO display something and wait for a while
      this.endTurn();
    });
  }

  initEncounter() {
    this._encounterAI.init(this._battleState.getEncounter());
    this._initTurn();
  }

  _initTurn() {
    if (this._battleState.getPhase() == Phase.ENEMY) {
      this._initEnemyTurn();
    } else {
      this._initPlayerTurn();
    }
  }

  _initPlayerTurn() {
    let playerState = this._battleState.getPlayerState();
    playerState.resetMana();
    while (
      this._battleState.getPlayerState().hand.length <
      this._battleState.config.maxPlayerCards
    ) {
      if (playerState.deck.pile.length == 0) {
        if (playerState.deck.discardPile.length > 0) {
          playerState.shuffleDiscardsBack();
        } else {
          // There are no cards to draw
          log.debug("No more cards to draw in initPlayerTurn");
          break;
        }
      } else {
        playerState.moveCardFromDeckToHand();
        // TODO trigger animation event
      }
    }

    log.debug("Player turn initialized");
  }

  _initEnemyTurn() {
    this._battleState.getEncounter().enemies.forEach((enemy) => {
      enemy.gainMana();
    });
    this._encounterAI.execute();
  }

  endTurn() {
    this._battleState.nextPhase();
    this._initTurn();
  }

  playPlayerCard(card: Card) {
    if (!this._ruleChecker.canPlay(card.data, this._battleState)) {
      log.debug("Cannot play card " + card);
      return;
    }
    this._cardEffectResolver.resolveCardEffects(card.data, this._battleState);
    // TODO trigger animation event
    let playerState = this._battleState.getPlayerState();
    playerState.decreasePlayMana(card.data.manacost);
    card.renderCard.sprite.off("pointerdown");
    card.renderCard.sprite.disableInteractive();
    playerState.discardCardFromHand(card);
  }

  commitPlayerCard(card: Card) {
    if (!this._ruleChecker.canCommit(card.data, this._battleState)) {
      log.debug("Cannot commit card " + card);
      return;
    }
    this._cardEffectResolver.resolveCommitEffects(card.data, this._battleState);
    card.renderCard.sprite.off("pointerdown");
    this._battleState.getPlayerState().discardCardFromHand(card);
    card.renderCard.sprite.disableInteractive();
  }
}
