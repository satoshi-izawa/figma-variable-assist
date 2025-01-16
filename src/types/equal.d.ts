/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
type IsTrue<T extends true> = T;
type IsFalse<T extends false> = T;
