import { constants } from "buffer";

export namespace Constants {
  export namespace UI {
    export const BaseDepth = 900;
    export const HandDepth = 950;
    export const OverlayDepth = 1100;
  }
  export namespace Sprite {
    export const CardWidth = 128;
  }

  export namespace Events {
    export const BATTLE_STATE_CHANGED = "a";
    export const PLAYER_STATE_CHANGED = "b";
  }
}
