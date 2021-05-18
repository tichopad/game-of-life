import { pipe, range, xprod, map, filter, length } from 'ramda';
import { compact } from 'ramda-adjunct';
import { getMooreNeighborhood, parsePosition, Position, SerializedPosition, serializePosition } from './position';

export type CellState = 'alive' | 'dead';
export type Cell = { state: CellState };
export type FieldAttributes = {
  height: number;
  width: number;
};

// Cells creation

export const createCell = (state: CellState): Cell => ({ state });
const createRandomCell = (): Cell => createCell(Math.random() > 0.8 ? 'alive' : 'dead');

// Cells attributes

export const isAlive = (state: CellState) => state === 'alive';
export const isCellAlive = (cell: Cell) => cell.state === 'alive';

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

type AliveNeighborsCounter = (position: SerializedPosition) => number;

export const getNumberOfAliveNeighbors = (cells: Map<SerializedPosition, Cell>): AliveNeighborsCounter => {
  return pipe(
    parsePosition,
    getMooreNeighborhood,
    map(serializePosition),
    map(key => cells.get(key)),
    compact,
    filter(isCellAlive),
    length
  );
};
