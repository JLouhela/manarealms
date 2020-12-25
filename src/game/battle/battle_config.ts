export class BattleConfig {
  private _maxPlayerCards: number;
  constructor() {
    this._maxPlayerCards = 4;
  }

  get maxPlayerCards(): number {
    return this._maxPlayerCards;
  }
}
