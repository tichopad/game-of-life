import { curry, filter, length, map, pipe } from 'ramda';
import { compact } from 'ramda-adjunct';
import { clear, drawCells, drawGrid, getCanvasWithContext2D } from './canvas';
import {
  Cell,
  CellState,
  createCell,
  createRandomCellsInField,
  getAliveCellsPositionsFromMap,
  isCellAlive,
  parsePosition,
  Position,
  SerializedPosition,
  serializePosition,
} from './cells';
import { createLogicLoop } from './loop';

function getMooreNeighborhood([x, y]: Position): Array<Position> {
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

const getNextCellState = curry((cell: Cell, numberOfAliveNeighbors: number): CellState => {
  if (isCellAlive(cell)) {
    if (numberOfAliveNeighbors < 2) return 'dead';
    if (numberOfAliveNeighbors > 3) return 'dead';
    if (numberOfAliveNeighbors === 2 || numberOfAliveNeighbors === 3) return 'alive';
  }

  if (numberOfAliveNeighbors === 3) {
    return 'alive';
  }

  return cell.state;
});

const getNumberOfAliveNeighbors = (cells: Map<SerializedPosition, Cell>) => {
  return pipe(
    parsePosition,
    getMooreNeighborhood,
    map(pipe(serializePosition, key => cells.get(key))),
    compact,
    filter(isCellAlive),
    length
  );
};

function main() {
  const { canvas, context } = getCanvasWithContext2D('#canvas');

  // Setup playing field
  const field = {
    height: 30,
    width: 30,
  };

  // Drawing methods
  const clearCanvas = clear(canvas);
  const drawCellsToCanvas = drawCells(canvas, field);
  const drawGridToCanvas = drawGrid(canvas, field);

  // Create cells
  let cells = createRandomCellsInField(field);
  let aliveCellsPositions = getAliveCellsPositionsFromMap(cells);

  const runLogic = createLogicLoop(() => {
    clearCanvas(context);
    drawCellsToCanvas(aliveCellsPositions, context);
    drawGridToCanvas(context);

    cells = new Map(
      [...cells].map(([serializedPosition, cell]) => [
        serializedPosition,
        pipe(getNumberOfAliveNeighbors(cells), getNextCellState(cell), createCell)(serializedPosition),
      ])
    );

    aliveCellsPositions = getAliveCellsPositionsFromMap(cells);
  }, 2);

  runLogic();
}

document.addEventListener('DOMContentLoaded', main);
