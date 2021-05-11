import { pipe, range, xprod, map, filter, isNil } from 'ramda';
import { isNotNumber } from 'ramda-adjunct';

export type CellState = 'alive' | 'dead';
export type Cell = { state: CellState };
export type Position = [x: number, y: number];
export type SerializedPosition = string;
export type FieldAttributes = {
  height: number;
  width: number;
};

// Serialize / de-serialize positions

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

// Cells and cell creation

const createCell = (state: CellState) => ({ state });
const createRandomCell = (): Cell => createCell(Math.random() > 0.98 ? 'alive' : 'dead');
const isCellAlive = (cell: Cell) => cell.state === 'alive';

// Cells and positions

/**
 * Create a cell with random properties and assign it to a serialized position
 */
const createRandomCellAtSerializedPosition = (position: Position): [SerializedPosition, Cell] => [
  serializePosition(position),
  createRandomCell(),
];

/**
 * Given positions, creates a map where the keys are serialized positions
 * and the values are cells with random properties
 */
const createMapOfRandomCellsAtPositions = pipe(
  map(createRandomCellAtSerializedPosition),
  positionedCells => new Map(positionedCells)
);

/**
 * Given field, fills it with cells with random properties
 */
export function createRandomCellsInField(field: FieldAttributes) {
  const horizontalPoints = range(0, field.width + 1);
  const verticalPoints = range(0, field.height + 1);
  const possiblePositions = xprod(horizontalPoints, verticalPoints);

  return createMapOfRandomCellsAtPositions(possiblePositions);
}

/**
 * Given map of serialized positions and cells, returns positions
 * of only those cells that are alive
 */
export const getAliveCellsPositionsFromMap = pipe<
  Map<SerializedPosition, Cell>,
  ReadonlyArray<[SerializedPosition, Cell]>,
  ReadonlyArray<[SerializedPosition, Cell]>,
  ReadonlyArray<Position>
>(
  Array.from,
  filter<[SerializedPosition, Cell], 'array'>(([_, cell]) => isCellAlive(cell)),
  map(([serializedPosition]) => parsePosition(serializedPosition))
);
