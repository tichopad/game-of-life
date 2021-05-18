import { isNil } from 'ramda';
import { isNotNumber } from 'ramda-adjunct';

export type Position = [x: number, y: number];
export type SerializedPosition = string;

/**
 * Serialize position into string in a shape of "x-y"
 */
export const serializePosition = ([x, y]: Position): SerializedPosition => `${x}-${y}`;

/**
 * Parse serialized position into a tuple
 */
export const parsePosition = (serializedPosition: SerializedPosition): Position => {
  const splitPosition = serializedPosition.split('-');

  if (splitPosition.length !== 2) {
    throw new Error(`Unable to parse position "${serializedPosition}"`);
  }

  if (isNil(splitPosition?.[0]) || isNil(splitPosition?.[1])) {
    throw new Error(`Invalid parsed position "x: ${splitPosition?.[0]}, y: ${splitPosition?.[1]}"`);
  }

  const x = parseInt(splitPosition[0], 10);
  const y = parseInt(splitPosition[1], 10);

  if (isNotNumber(x) || isNotNumber(y)) {
    throw new Error(`Parsed position "x: ${x}, y: ${y}" is not made of numbers`);
  }

  return [x, y];
};

/**
 * Get Moore neighborhood around given position - eight positions surrounding it
 */
export function getMooreNeighborhood([x, y]: Position): Array<Position> {
  return [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y],
    [x + 1, y + 1],
    [x + 1, y - 1],
    [x - 1, y + 1],
    [x - 1, y - 1],
  ];
}
