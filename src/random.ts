export function getRandomInt(from: number, to: number) {
  from = Math.floor(from);
  to = Math.ceil(to);
  const randomIntInRange = from + Math.random() * (to - from);

  return Math.round(randomIntInRange);
}

export function getRandomPositions(min: number, max: number, size: number) {
  return new Array(size).fill(null).map(() => ({
    x: getRandomInt(min, max),
    y: getRandomInt(min, max),
  }));
}
