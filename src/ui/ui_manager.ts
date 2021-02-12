import { GameMode, ReadGameState } from "../game/game_state";
import { Button } from "./elements/button";
import log from "loglevel";
import { Encounter } from "../game/battle/encounter";

export class UIManager {
  private _buttons: Button[];

  constructor() {
    this._createButtons();
    log.info("UIManager alive");
  }

  _createButtons() {
    this._buttons = [];
    this._buttons.push(new Button("end_turn", "btn_end_turn"));
  }

  getButton(name: string) {
    return this._buttons.find((button) => button.name == name);
  }
}
