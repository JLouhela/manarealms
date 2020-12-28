import log = require("loglevel");
import { ReadBattleState } from "./battle_state";
import { Card } from "../card/card";

export class RuleChecker {
  constructor() {}

  canPlay(card: Card, battleState: ReadBattleState) {
    return true;
  }
}
