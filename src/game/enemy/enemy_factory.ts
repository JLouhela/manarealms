import log = require("loglevel");
import { Enemy } from "./enemy";

export class EnemyFactory {
  createTestEnemy(): Enemy {
    const maxHp = Math.floor(Math.random() * 15) + 5;
    const maxMana = Math.floor(Math.random() * 5) + 1;

    let enemy = new Enemy(maxHp, maxMana, 1);
    enemy.renderEnemy.textureKey = "test_enemy";
    return enemy;
  }
}
