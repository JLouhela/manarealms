import log = require("loglevel");
import { Enemy } from "../../enemy/enemy";
import { BattleState } from "../battle_state";
import { IEnemyAI } from "./enemy_ai_interface";
import { AIAction, AIActionDamagePlayer } from "./enemy_actions";

export class DummyEnemyAI implements IEnemyAI {
  private _battleState: BattleState;

  init(battleState: BattleState): void {
    this._battleState = battleState;
  }

  execute(enemy: Enemy): AIAction[] {
    let battleCfg = this._battleState.config;
    log.debug("Enemy had opportunity to act via DummyAI");
    // TODO browse through cards => mana to play anything?
    let res = [];
    res.push(new AIActionDamagePlayer(enemy.attackDamage));
    return res;
  }
}
