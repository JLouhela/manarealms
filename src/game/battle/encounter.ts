import log = require("loglevel");
import { Enemy } from "../enemy/enemy";

export class Encounter {
  private _enemies: Enemy[];

  constructor(enemies: Enemy[]) {
    this._enemies = enemies;
  }

  get enemies(): Enemy[] {
    return this._enemies;
  }

  enemiesAlive() {
    this._enemies.forEach((enemy) => {
      if (enemy.isAlive()) {
        return true;
      }
    });
    return false;
  }
}
