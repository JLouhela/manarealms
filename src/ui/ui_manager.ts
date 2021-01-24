import { InteractionHandler } from "./interaction_handler";
import { GameMode, ReadGameState } from "../game/game_state";
import { Button } from "./elements/button";
import log from "loglevel";

export class UIManager {
  private _interactionHandler: InteractionHandler;
  private _buttons: Button[];

  constructor() {
    this._interactionHandler = new InteractionHandler();
    this._createButtons();
    log.info("UIManager alive");
  }

  updateState(gameState: ReadGameState) {
    if (gameState.getGameMode() == GameMode.BATTLE) {
      this._interactionHandler.setupBattleInteractions(
        gameState.getBattleState(),
        this // TODO cyclic dependency, decouple
      );
    }
  }

  _createButtons() {
    this._buttons = [];
    this._buttons.push(new Button("end_turn", "btn_end_turn"));
  }

  getButton(name: string) {
    return this._buttons.find((button) => button.name == name);
  }
}
