import { BattleState } from "../battle_state";

import { Enemy } from "../../enemy/enemy";

export interface IEnemyAI {
  // Switch to read if no need to modify state
  init(battleState: BattleState): void;
  execute(enemy: Enemy): void;
}
