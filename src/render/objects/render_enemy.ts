import log = require("loglevel");

export class RenderEnemy {
  private _sprite: Phaser.GameObjects.Sprite;
  private _manaText: Phaser.GameObjects.Text;
  private _hpText: Phaser.GameObjects.Text;
  private _attackText: Phaser.GameObjects.Text;
  private _renderContainer: Phaser.GameObjects.Container;
  private _textureKey: string;

  set textureKey(key: string) {
    this._textureKey = key;
  }

  constructor() {}

  init(
    scene: Phaser.Scene,
    mana: number,
    maxMana: number,
    hp: number,
    maxHp: number,
    attackDamage: number
  ): void {
    if (!this._textureKey) {
      log.warn("Enemy without texture!");
    }
    this._renderContainer = scene.add.container(0, 0);
    this._sprite = scene.add.sprite(0, 0, this._textureKey);
    let imageSize = this._sprite.getBounds();
    this._renderContainer.setSize(imageSize.width, imageSize.height);
    this._manaText = scene.add.text(-30, -135, "", {
      color: "#000000",
    });
    this._hpText = scene.add.text(-30, -115, "", {
      color: "#000000",
    });
    this._attackText = scene.add.text(-30, -95, "", {
      color: "#000000",
    });
    this._renderContainer.add(this._sprite);
    this._renderContainer.add(this._manaText);
    this._renderContainer.add(this._hpText);
    this._renderContainer.add(this._attackText);

    this.updateMana(mana, maxMana);
    this.updateHp(hp, maxHp);
    this.updateAttack(attackDamage);

    this._renderContainer.setVisible(false);
  }

  updateMana(mana: number, maxMana: number): void {
    this._manaText.setText("Mana: " + mana + "/" + maxMana);
  }

  updateHp(hp: number, maxHp: number): void {
    this._hpText.setText("HP: " + hp + "/" + maxHp);
  }

  updateAttack(attackDamage: number) {
    this._attackText.setText("ATK: " + attackDamage);
  }

  get sprite(): Phaser.GameObjects.Container {
    return this._renderContainer;
  }
}
