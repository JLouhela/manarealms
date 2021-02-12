import log from "loglevel";
import { Phase, ReadBattleState } from "./battle_state";
import { Cards } from "../card/deck";
import { UIManager } from "../../ui/ui_manager";
import { DropZones } from "../../ui/dropzones";
import { Encounter } from "./encounter";

// TODO move ownership to battlescene
// give ui manager in ctor
export class BattleInteractionHandler {
  private _dropZones: DropZones;
  private _uiManager: UIManager;
  constructor(uiManager: UIManager) {
    this._dropZones = new DropZones();
    this._uiManager = uiManager;
  }

  setupBattle(scene: Phaser.Scene, encounter: Encounter) {
    this._dropZones.init(scene, encounter);
  }

  updateBattleInteractions(battleState: ReadBattleState) {
    this._enablePlayerHand(
      battleState.getPlayerState().hand,
      battleState.getPhase() == Phase.PLAYER
    );
    this._enableUI(battleState.getPhase(), this._uiManager);
    this._enableDropZones(
      battleState.getEncounter(),
      battleState.getPhase() == Phase.PLAYER
    );
  }

  _enablePlayerHand(hand: Cards, enabled: boolean) {
    hand.forEach((card) => {
      if (enabled) {
        card.renderCard.sprite.setInteractive({ draggable: true });
        card.renderCard.sprite.on("dragstart", () => {
          card.renderCard.enableInfo(false);
        });
        card.renderCard.sprite.on("dragend", () => {
          card.renderCard.enableInfo(true);
        });

        card.renderCard.sprite.on(
          "drag",
          (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
            card.renderCard.sprite.x = dragX;
            card.renderCard.sprite.y = dragY;
          }
        );
        card.renderCard.sprite.on(
          "drop",
          (
            pointer: Phaser.Input.Pointer,
            dropArea: Phaser.GameObjects.GameObject
          ) => {
            if (dropArea.name == DropZones.PLAY_AREA_ID) {
              console.log("Card played");
            } else if (dropArea.name == DropZones.COMMIT_AREA_ID) {
              console.log("Card committed");
            } else {
              console.log("Card played on enemy id " + dropArea.name);
            }
          }
        );
      } else {
        // TODO: this also disables mouseover on enemy turn
        // filter out inputs
        card.renderCard.sprite.disableInteractive();
      }
    });
  }

  _enableUI(phase: Phase, uiManager: UIManager) {
    let endTurnButton = uiManager.getButton("end_turn");

    if (phase == Phase.PLAYER) {
      endTurnButton.sprite.setInteractive();
    } else {
      endTurnButton.sprite.disableInteractive();
    }
  }

  _enableDropZones(encounter: Encounter, enabled: boolean) {
    if (enabled) {
      this._dropZones.enable(encounter);
    } else {
      this._dropZones.disable(encounter);
    }
  }
}
