import { ReadBattleState } from "../game/battle/battle_state";

export class EnemyRenderer {
  private _rect: Phaser.Geom.Rectangle;

  constructor(rect: Phaser.Geom.Rectangle) {
    this._rect = rect;
  }

  init(scene: Phaser.Scene, battleState: ReadBattleState) {
    const firstX = this._rect.width * 0.4;
    const y = this._rect.height * 0.2;
    let xAdd = 0;
    battleState.getEncounter().enemies.forEach((enemy) => {
      enemy.renderEnemy.init(
        scene,
        enemy.mana,
        enemy.maxMana,
        enemy.hp,
        enemy.maxHp
      );
      enemy.renderEnemy.sprite.x = firstX + xAdd;
      enemy.renderEnemy.sprite.y = y;
      enemy.renderEnemy.sprite.visible = true;
      xAdd += 180;
    });
  }

  render(battleState: ReadBattleState): void {
    battleState.getEncounter().enemies.forEach((enemy) => {
      enemy.renderEnemy.updateHp(enemy.hp, enemy.maxHp);
      enemy.renderEnemy.updateMana(enemy.mana, enemy.maxMana);
    });
  }
}
