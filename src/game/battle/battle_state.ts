import log = require("loglevel");
import { Deck, Cards } from "../card/deck";

export enum Phase {
  PLAYER,
  ENEMY,
}

export interface ReadBattleState {
  getPlayerDeck(): Deck;
  getPlayerHand(): Cards;
  getPhase(): Phase;
}

export class BattleState implements ReadBattleState {
  _playerDeck: Deck;
  _playerHand: Cards;
  _phase: Phase;

  constructor() {
    this._playerDeck = null;
    this._playerHand = null;
    this._phase = Phase.PLAYER;
  }

  init(playerDeck: Deck): void {
    log.debug("Init new battle state");
    this._playerDeck = playerDeck;
    // TODO this is for testing
    this._playerHand = playerDeck.pile;
  }

  getPlayerDeck(): Deck {
    return this._playerDeck;
  }

  getPlayerHand(): Cards {
    return this._playerHand;
  }

  getPhase(): Phase {
    return this._phase;
  }
}
