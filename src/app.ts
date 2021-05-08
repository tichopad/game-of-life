import { draw, getCanvasWithContext2D } from './canvas';
import { createRandomCellsInField, getAliveCellsPositionsFromMap } from './cells';
import { createAnimationLoop } from './loop';

function main() {
  const { canvas, context } = getCanvasWithContext2D('#canvas');

  // playground

  const cells = createRandomCellsInField({ height: 10, width: 20 });
  console.table(cells);

  const aliveCellsPositions = getAliveCellsPositionsFromMap(cells);
  const drawRectangles = draw(canvas, aliveCellsPositions);

  // /playground

  const runAnimation = createAnimationLoop(() => {
    drawRectangles(context);
  });

  runAnimation();
}

document.addEventListener('DOMContentLoaded', main);
