export const normalize = (x: number, min = 0.0, max = 1.0) =>
  (x - min) / max - min;

export const clamp = (x: number, min = 0.0, max = 1.0) => {
  if (Number.isNaN(x)) return min;
  return Math.min(Math.max(x, min), max);
};
