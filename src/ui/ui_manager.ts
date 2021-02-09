import { InteractionHandler } from "./interaction_handler";
import { GameMode, ReadGameState } from "../game/game_state";
import { Button } from "./elements/button";
import log from "loglevel";
import { Encounter } from "../game/battle/encounter";

export class UIManager {
  private _interactionHandler: InteractionHandler;
  private _buttons: Button[];

  constructor() {
    this._interactionHandler = new InteractionHandler();
    this._createButtons();
    log.info("UIManager alive");
  }

  setupBattle(scene: Phaser.Scene, encounter: Encounter) {
    this._interactionHandler.setupBattle(scene, encounter);
  }

  updateState(gameState: ReadGameState) {
    if (gameState.getGameMode() == GameMode.BATTLE) {
      this._interactionHandler.updateBattleInteractions(
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
