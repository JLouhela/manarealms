export enum EffectType {
  MANA = 0,
  DAMAGE_SINGLE = 1,
}

export interface ManaEffect {
  mana: number;
}

export class Effect {
  private _description: string;
  private _effects: { [id: number]: {} } = {};

  get description(): string {
    return this._description;
  }
  set description(d: string) {
    this._description = d;
  }

  addEffect(type: EffectType, effect: any) {
    this._effects[type] = effect;
  }

  get effects(): { [id: number]: {} } {
    return this._effects;
  }
}
