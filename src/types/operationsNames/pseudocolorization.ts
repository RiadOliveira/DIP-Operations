export const PSEUDOCOLORIZATION_OPERATIONS = {
  DENSITY_SLICING: 'Fatiamento por Densidade',
  COLOR_REDISTRIBUTION: 'Redistribuição de Cores',
} as const;

export type PseudocolorizationKey = keyof typeof PSEUDOCOLORIZATION_OPERATIONS;
