export const isDefined = <T>(values: (T | null | undefined)[]) =>
  values.filter(v => v != null);
