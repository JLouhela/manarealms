import { Player } from "../player/player";

export class GameState {
  private _player: Player;

  constructor(player: Player) {
    this._player = player;
  }

  get player(): Player {
    return this._player;
  }
}
