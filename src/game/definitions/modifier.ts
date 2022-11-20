// ? Where should this be? It's not a definition, types maybe?

export type Modifier = {
  name: string;
  type: ModifierType;
  value: number;
  remainingTurns?: number;
};

export const modifierTypes = ['add', 'mult', 'reduction'] as const;
export type ModifierType = typeof modifierTypes[number]; // flat | percent
