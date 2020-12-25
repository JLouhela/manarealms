import { Player } from "./player/player";
import { BattleState, ReadBattleState } from "./battle/battle_state";

export enum GameMode {
  BATTLE,
}

export interface ReadGameState {
  getGameMode(): GameMode;
  getBattleState(): ReadBattleState;
}

export class GameState implements ReadGameState {
  private _player: Player;
  private _currentMode: GameMode;
  private _battleState: BattleState;

  constructor(player: Player) {
    this._player = player;
    this._currentMode = GameMode.BATTLE;
    this._battleState = new BattleState();
  }

  get player(): Player {
    return this._player;
  }

  getGameMode(): GameMode {
    return this._currentMode;
  }

  getBattleState(): BattleState {
    return this._battleState;
  }
}
