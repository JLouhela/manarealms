import { InteractionHandler } from "./interaction_handler";
import { GameMode, ReadGameState } from "../game/game_state";
import log from "loglevel";

export class UIManager {
  private _interactionHandler: InteractionHandler;

  constructor() {
    this._interactionHandler = new InteractionHandler();
    log.info("UIManager alive");
  }

  updateState(gameState: ReadGameState) {
    if (gameState.getGameMode() == GameMode.BATTLE) {
      this._interactionHandler.setupBattleInteractions(
        gameState.getBattleState()
      );
    }
  }
}
