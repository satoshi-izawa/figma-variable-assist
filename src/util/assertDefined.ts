export const assertDefined: <T>(
  value: T | null | undefined,
) => asserts value is T = value => {
  if (value == null) {
    throw new Error('値がnullまたはundefinedです');
  }
};
