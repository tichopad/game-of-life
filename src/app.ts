import { drawGrid, getCanvasWithContext2D } from './canvas';
import { createAnimationLoop } from './loop';

function main() {
  const canvasWithContext = getCanvasWithContext2D('#canvas');

  if (canvasWithContext instanceof Error) {
    throw canvasWithContext;
  }

  const { canvas, context } = canvasWithContext;
  const drawGridToCanvas = drawGrid(canvas, { width: 10, height: 10 });

  const runAnimation = createAnimationLoop(() => {
    drawGridToCanvas(context);
  });

  runAnimation();
}

document.addEventListener('DOMContentLoaded', main);
