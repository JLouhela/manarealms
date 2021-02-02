import { Encounter } from "../encounter";
import { DummyEnemyAI } from "./dummy_enemy_ai";
import { BattleConfig } from "../battle_config";
import { BattleState } from "../battle_state";

export class EncounterAI {
  private _encounter: Encounter;
  // Not sure where to put AI in the end
  private _dummyAI: DummyEnemyAI;
  private _battleState: BattleState;
  private _endTurnCallBack: () => void;

  constructor(battleState: BattleState, endTurnCB: () => void) {
    this._encounter = null;
    this._battleState = battleState;
    this._dummyAI = new DummyEnemyAI();
    this._endTurnCallBack = endTurnCB;
  }

  init(encounter: Encounter): void {
    this._encounter = encounter;
    this._dummyAI.init(this._battleState);
  }

  reset(): void {
    this._encounter = null;
  }

  execute(): void {
    this._encounter.enemies.forEach((enemy) => {
      if (enemy.isAlive()) {
        this._dummyAI.execute(enemy);
      }
    });
    this._endTurnCallBack();
  }
}
