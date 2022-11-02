export type Brand<K, T> = K & { __brand: T };

export type TypeMapper<T> = {
  [K in keyof T]: T[K];
};
