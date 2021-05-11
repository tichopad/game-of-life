import { seq } from 'ramda-adjunct';
import { clear, drawCells, drawGrid, getCanvasWithContext2D } from './canvas';
import { createRandomCellsInField, getAliveCellsPositionsFromMap } from './cells';
import { createRenderLoop } from './loop';

function main() {
  const { canvas, context } = getCanvasWithContext2D('#canvas');

  // Setup playing field
  const field = {
    height: 50,
    width: 50,
  };

  // Create cells
  const cellsMap = createRandomCellsInField(field);
  const aliveCellsPositions = getAliveCellsPositionsFromMap(cellsMap);

  // Setup drawing functions
  const clearCanvas = clear(canvas);
  const drawCellsToCanvas = drawCells(canvas, field, aliveCellsPositions);
  const drawGridToCanvas = drawGrid(canvas, field);

  // Setup whatever happens on render
  const runContextOperations = seq([clearCanvas, drawCellsToCanvas, drawGridToCanvas]);
  const runRendering = createRenderLoop(() => runContextOperations(context));

  // Start animating!
  runRendering();
}

document.addEventListener('DOMContentLoaded', main);
