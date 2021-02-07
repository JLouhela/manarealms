export namespace Assets {
  export const testAssets = [
    { name: "test_bg", uri: "test_asset.png" },
    { name: "test_enemy", uri: "test_enemy.png" },
    { name: "btn_end_turn", uri: "ui/end_turn.png" },
  ];

  export const atlases = [
    {
      name: "cards",
      uri: "assets/atlas/cards.png",
      json: "assets/atlas/cards.json",
    },
  ];

  export enum CardTexture {
    PLACEHOLDER = "placeholder_card",
    FIREBOLT = "fire_card",
    MANA = "mana_card",
  }
}
