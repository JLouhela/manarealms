import log = require("loglevel");
import { Deck } from "../card/deck";
import { BattleConfig } from "./battle_config";
import { Encounter } from "./encounter";
import { PlayerState } from "./player_state";
import { Constants } from "../../utils/constants";

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
  _events: Phaser.Events.EventEmitter;

  constructor() {
    this._playerState = new PlayerState();
    this._phase = Phase.PLAYER;
    this._config = new BattleConfig();
    this._encounter = null;
  }

  init(
    playerDeck: Deck,
    encounter: Encounter,
    eventEmitter: Phaser.Events.EventEmitter
  ): void {
    log.debug("Init new battle state");
    this._playerState.init(playerDeck, eventEmitter);
    this._encounter = encounter;
    this._events = eventEmitter;
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
    this._events.emit(Constants.Events.BATTLE_STATE_CHANGED);
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
