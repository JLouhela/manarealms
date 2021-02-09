import { GameState } from "../game/game_state";
import { BattleRenderer } from "../render/battle_renderer";
import { UIManager } from "../ui/ui_manager";
import { TurnManager } from "../game/battle/turn_manager";
import { EncounterManager } from "../game/world/encounter_manager";
import { Constants } from "../utils/constants";
import log from "loglevel";

export class BattleScene extends Phaser.Scene {
  private _gameState: GameState;
  private _renderer: BattleRenderer;
  private _uiManager: UIManager;
  private _turnManager: TurnManager;

  // TODO belongs to world or something
  private _encounterManager: EncounterManager;

  constructor() {
    super({
      key: "BattleScene",
    });
  }

  create(): void {
    log.debug("create BattleScene");
    this._gameState = this.registry.get("gamestate");
    this._encounterManager = new EncounterManager();
    this._gameState
      .getBattleState()
      .init(
        this._gameState.player.deck,
        this._encounterManager.getTestEncounter(),
        this.events
      );
    this._uiManager = this.registry.get("uimanager");
    this._uiManager.setupBattle(
      this,
      this._gameState.getBattleState().getEncounter()
    );
    let { width, height } = this.sys.game.canvas;
    this._renderer = new BattleRenderer(
      this,
      new Phaser.Geom.Rectangle(0, 0, width, height),
      this._uiManager
    );
    this._renderer.init(this._gameState.getBattleState());
    this._turnManager = new TurnManager(this._gameState.getBattleState());
    this._turnManager.initEncounter();
    this._connectEvents();
    this._updateState();

    log.debug("BattleScene created");
  }

  _connectEvents(): void {
    this._uiManager
      .getButton("end_turn")
      .sprite.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
        this._turnManager.endTurn();
      });

    this.events.on(Constants.Events.BATTLE_STATE_CHANGED, () => {
      this._updateState();
    });
    this.events.on(Constants.Events.PLAYER_STATE_CHANGED, () => {
      this._updateState();
    });
  }

  update(time: number, delta: number) {}

  _updateState() {
    this._uiManager.updateState(this._gameState);
    this._renderer.render();
  }
}
