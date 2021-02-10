import log = require("loglevel");
import { Enemy } from "./enemy";

export class EnemyFactory {
  private _seqNo: number = 0;

  createTestEnemy(): Enemy {
    const maxHp = Math.floor(Math.random() * 15) + 5;
    const maxMana = Math.floor(Math.random() * 5) + 1;
    const attackDmg = Math.floor(Math.random() * 5 + 1);

    let enemy = new Enemy(
      (this._seqNo++).toString(),
      maxHp,
      maxMana,
      1,
      attackDmg
    );
    enemy.renderEnemy.textureKey = "test_enemy";
    return enemy;
  }
}
