import log = require("loglevel");
import { RenderEnemy } from "../../render/objects/render_enemy";

export class Enemy {
  _id: string;
  private _hp: number;
  private _maxHp: number;
  private _mana: number;
  private _maxMana: number;
  private _manaPerturn: number;
  private _attackDmg: number;
  private _renderEnemy: RenderEnemy;

  constructor(
    id: string,
    maxHp?: number,
    maxMana?: number,
    manaPerTurn?: number,
    attackDmg?: number
  ) {
    this._id = id;
    this._maxHp = maxHp || 10;
    this._maxMana = maxMana || 5;
    this._manaPerturn = manaPerTurn || 1;
    this._attackDmg = attackDmg || 1;
    this._mana = 0;
    this._hp = this._maxHp;
    this._renderEnemy = new RenderEnemy();
  }

  get id(): string {
    return this._id;
  }

  get hp(): number {
    return this._hp;
  }

  get maxHp(): number {
    return this._maxHp;
  }

  get renderEnemy(): RenderEnemy {
    return this._renderEnemy;
  }

  isDead(): boolean {
    return this._hp <= 0;
  }

  isAlive(): boolean {
    return !this.isDead();
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
  get maxMana(): number {
    return this._maxMana;
  }

  gainMana() {
    this._mana = Math.min(this._maxMana, this._mana + this._manaPerturn);
  }

  get attackDamage(): number {
    return this._attackDmg;
  }
}
