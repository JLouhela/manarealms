import { BattleState } from "../battle_state";
import { Enemy } from "../../enemy/enemy";
import { AIAction } from "./enemy_actions";

export interface IEnemyAI {
  // Switch to read if no need to modify state
  init(battleState: BattleState): void;
  execute(enemy: Enemy): AIAction[];
}
