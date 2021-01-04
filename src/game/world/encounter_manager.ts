import { Encounter } from "../battle/encounter";
import { Enemy } from "../enemy/enemy";
import { EnemyFactory } from "../enemy/enemy_factory";

export class EncounterManager {
  private _enemyFactory: EnemyFactory;

  constructor() {
    this._enemyFactory = new EnemyFactory();
  }

  getTestEncounter(): Encounter {
    const enemy1 = this._enemyFactory.createTestEnemy();
    const enemy2 = this._enemyFactory.createTestEnemy();
    let encounter = new Encounter([enemy1, enemy2]);
    return encounter;
  }
}
