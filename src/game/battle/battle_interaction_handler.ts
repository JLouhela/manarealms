import log from "loglevel";
import { Phase, ReadBattleState } from "./battle_state";
import { Cards } from "../card/deck";
import { UIManager } from "../../ui/ui_manager";
import { DropZones } from "../../ui/dropzones";
import { Encounter } from "./encounter";
import { TurnManager } from "./turn_manager";

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

  updateBattleInteractions(
    battleState: ReadBattleState,
    turnManager: TurnManager
  ) {
    this._enablePlayerHand(
      battleState.getPlayerState().hand,
      battleState.getPhase() == Phase.PLAYER,
      battleState.getPlayerState().mana +
        battleState.getPlayerState().committedMana,
      turnManager
    );
    this._enableUI(battleState.getPhase(), this._uiManager);
    this._enableDropZones(
      battleState.getEncounter(),
      battleState.getPhase() == Phase.PLAYER
    );
  }

  _enablePlayerHand(
    hand: Cards,
    enabled: boolean,
    mana: number,
    turnManager: TurnManager
  ) {
    hand.forEach((card) => {
      if (enabled && mana >= card.data.manacost) {
        console.log("mana: " + mana + ", cost: " + card.data.manacost);
        // TODO measure & think, seems inefficient
        card.renderCard.sprite.removeAllListeners("dragstart");
        card.renderCard.sprite.removeAllListeners("dragend");
        card.renderCard.sprite.removeAllListeners("drag");
        card.renderCard.sprite.removeAllListeners("drop");

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
              turnManager.playPlayerCard(card);
            } else if (dropArea.name == DropZones.COMMIT_AREA_ID) {
              turnManager.commitPlayerCard(card);
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
