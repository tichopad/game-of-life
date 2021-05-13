import { pipe } from 'ramda';
import { createWorldDrawer, getCanvasWithContext2D } from './canvas';
import {
  Cell,
  createCell,
  createRandomCellsInField,
  getAliveCellsPositionsFromMap,
  getNextCellState,
  getNumberOfAliveNeighbors,
} from './cells';
import { Position, SerializedPosition } from './position';

type Renderer = (cellsPositions: ReadonlyArray<Position>) => void;

function transitionAndDrawWorldState(cells: Map<SerializedPosition, Cell>, render: Renderer) {
  const aliveCellsPositions = getAliveCellsPositionsFromMap(cells);

  render(aliveCellsPositions);

  const nextCells = new Map(
    [...cells].map(([serializedPosition, cell]) => [
      serializedPosition,
      pipe(getNumberOfAliveNeighbors(cells), getNextCellState(cell.state), createCell)(serializedPosition),
    ])
  );

  setTimeout(() => transitionAndDrawWorldState(nextCells, render), 1000 / 3);
}

function main() {
  const { canvas, context } = getCanvasWithContext2D('#canvas');

  // Declare playing field
  const field = {
    height: 30,
    width: 30,
  };

  // Setup world renderer
  const drawWorld = createWorldDrawer(canvas, context, field);

  // Create cells
  const cells = createRandomCellsInField(field);

  // Music!
  transitionAndDrawWorldState(cells, drawWorld);
}

document.addEventListener('DOMContentLoaded', main);
