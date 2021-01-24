import log = require("loglevel");
import { Deck } from "../card/deck";
import { BattleConfig } from "./battle_config";
import { Encounter } from "./encounter";
import { PlayerState } from "./player_state";

export enum Phase {
  PLAYER,
  ENEMY,
}

export interface ReadBattleState {
  getPlayerState(): PlayerState;
  getPhase(): Phase;
  getEncounter(): Encounter;
}

export class BattleState implements ReadBattleState {
  _playerState: PlayerState;
  _phase: Phase;
  _config: BattleConfig;
  _encounter: Encounter;

  constructor() {
    this._playerState = new PlayerState();
    this._phase = Phase.PLAYER;
    this._config = new BattleConfig();
    this._encounter = null;
  }

  init(playerDeck: Deck, encounter: Encounter): void {
    log.debug("Init new battle state");
    this._playerState.init(playerDeck);
    this._encounter = encounter;
  }

  // Separate getters for typescript interface limitation reasons
  getPlayerState(): PlayerState {
    return this._playerState;
  }

  getPhase(): Phase {
    return this._phase;
  }

  nextPhase(): void {
    if (this._phase == Phase.PLAYER) {
      this._phase = Phase.ENEMY;
    } else if (this._phase == Phase.ENEMY) {
      this._phase = Phase.PLAYER;
    }
  }

  get config(): BattleConfig {
    return this._config;
  }

  set config(cfg: BattleConfig) {
    this._config = cfg;
  }

  getEncounter(): Encounter {
    return this._encounter;
  }
}
