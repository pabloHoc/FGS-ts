export const normalize = (x: number, xMin = 0, xMax = 1) =>
  (x - xMin) / xMax - xMin;
