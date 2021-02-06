export enum ActionType {
  DAMAGE_PLAYER,
}

export class AIAction {
  _actionType: ActionType;
  constructor(type: ActionType) {
    this._actionType = type;
  }

  get type() {
    return this._actionType;
  }
}

export class AIActionDamagePlayer extends AIAction {
  private _damage: number;
  constructor(damage: number) {
    super(ActionType.DAMAGE_PLAYER);
    this._damage = damage;
  }

  get damage() {
    return this._damage;
  }
}
