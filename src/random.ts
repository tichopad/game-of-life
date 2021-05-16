export function getRandomInt(from: number, to: number) {
  if (from >= to) throw new Error(`"${from}" has to be less than ${to}`);

  from = Math.floor(from);
  to = Math.ceil(to);
  const randomIntInRange = from + Math.random() * (to - from);

  return Math.round(randomIntInRange);
}

export function getRandomPositions(min: number, max: number, size: number) {
  if (size <= 0) throw new Error('Cannot create positions array with zero or negative size');

  return new Array(size).fill(null).map(() => ({
    x: getRandomInt(min, max),
    y: getRandomInt(min, max),
  }));
}
