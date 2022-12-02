export const linearScorer = (
  x: number,
  slope: number = 1,
  yOrigin: number = 0
) => {
  return slope * x + yOrigin;
};
