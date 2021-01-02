export enum EffectType {
  MANA = 0,
  DAMAGE_SINGLE = 1,
}

export interface Effect {
  type: EffectType;
}

// EffectType.MANA
export interface ManaEffect extends Effect {
  mana: number;
}

export function GetManaEffect(mana: number): ManaEffect {
  return { mana, type: EffectType.MANA };
}
