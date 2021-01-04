import log = require("loglevel");

export class Enemy {
  private _hp: number;
  private _maxHp: number;
  private _mana: number;
  private _maxMana: number;
  private _manaPerturn: number;

  // TODO extract somewhere
  private _hpText: Phaser.GameObjects.Text;
  private _image: Phaser.GameObjects.Image;
  private _renderContainer: Phaser.GameObjects.Container;

  constructor(maxHp?: number, maxMana?: number, manaPerTurn?: number) {
    this._maxHp = maxHp || 10;
    this._maxMana = maxMana || 5;
    this._manaPerturn = manaPerTurn || 1;
    this._mana = 0;
    this._hp = this._maxHp;
  }

  get hp(): number {
    return this._hp;
  }

  isDead() {
    return this._hp <= 0;
  }

  addHp(hp: number) {
    this._hp = Math.min(this._maxHp, this._hp + hp);
  }

  decreaseHp(hp: number) {
    this._hp -= hp;
    if (this._hp <= 0) {
      log.debug("enemy DEAD");
    }
  }

  addMana(mana: number) {
    this._mana = Math.min(this._maxMana, this._mana + mana);
  }

  decreaseMana(mana: number) {
    this._mana = Math.max(0, this._mana - mana);
  }

  addTurnMana() {
    this.addMana(this._manaPerturn);
  }

  get mana(): number {
    return this._mana;
  }
}
