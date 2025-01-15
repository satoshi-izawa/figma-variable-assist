export const isVariable: (target: Target) => target is Variable = target =>
  'valuesByMode' in target;
