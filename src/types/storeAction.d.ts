type StoreAction<T extends Record<string, Record<string, unknown>>> = {
  [P in keyof T]: T[P] extends Record<string, never>
    ? { type: P }
    : T[P] & { type: P };
}[keyof T];
