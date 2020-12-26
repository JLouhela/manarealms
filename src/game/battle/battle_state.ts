import log = require("loglevel");
import { Deck } from "../card/deck";
import { BattleConfig } from "./battle_config";
import { PlayerState } from "./player_state";

export enum Phase {
  PLAYER,
  ENEMY,
}

export interface ReadBattleState {
  getPlayerState(): PlayerState;
  getPhase(): Phase;
}

export class BattleState implements ReadBattleState {
  _playerState: PlayerState;
  _phase: Phase;
  _config: BattleConfig;

  constructor() {
    this._playerState = new PlayerState();
    this._phase = Phase.PLAYER;
    this._config = new BattleConfig();
  }

  init(playerDeck: Deck): void {
    log.debug("Init new battle state");
    this._playerState.init(playerDeck);
  }

  getPlayerState(): PlayerState {
    return this._playerState;
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
