import log = require("loglevel");
import { Deck, Cards } from "../card/deck";
import { BattleConfig } from "./battle_config";

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
  _config: BattleConfig;

  constructor() {
    this._playerDeck = null;
    this._playerHand = null;
    this._phase = Phase.PLAYER;
    this._config = new BattleConfig();
  }

  init(playerDeck: Deck): void {
    log.debug("Init new battle state");
    this._playerDeck = playerDeck;
    this._playerHand = [];
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

  get config(): BattleConfig {
    return this._config;
  }

  set config(cfg: BattleConfig) {
    this._config = cfg;
  }
}
