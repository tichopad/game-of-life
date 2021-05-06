import { invoker, curry, pipe, of, ap } from 'ramda';
import { Position } from './types';

type CanvasWithContext2D = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

export function getCanvasWithContext2D(canvasElementSelector: string): CanvasWithContext2D | Error {
  const canvas = document.querySelector<HTMLCanvasElement>(canvasElementSelector);

  if (canvas === null) {
    return new Error('Could not find element with ID "canvas"');
  }

  const context = canvas.getContext('2d');

  if (context === null) {
    return new Error('Could not get canvas 2D context');
  }

  return {
    canvas,
    context,
  };
}

const clearRect = invoker(4, 'clearRect');
const fillRect = invoker(4, 'fillRect');
const clearCanvas = (canvas: HTMLCanvasElement) => clearRect(0, 0, canvas.width, canvas.height);

const drawRectangles = curry((positions: ReadonlyArray<Position>, context: CanvasRenderingContext2D) =>
  positions.forEach(({ x, y }) => fillRect(x, y, 5, 5, context))
);

export const draw = curry((canvas: HTMLCanvasElement, rectanglesPositions: ReadonlyArray<Position>) => {
  // prettier-ignore
  const contextOperations = [
    clearCanvas(canvas),
    drawRectangles(rectanglesPositions)
  ];

  return pipe<CanvasRenderingContext2D, Array<CanvasRenderingContext2D>, void>(
    of,
    ap<CanvasRenderingContext2D, void>(contextOperations)
  );
});

type Dimensions2D = {
  width: number;
  height: number;
};

export const drawGrid = curry(
  (canvas: HTMLCanvasElement, cellSize: Dimensions2D, context: CanvasRenderingContext2D) => {
    context.lineWidth = 1;
    context.strokeStyle = 'lightgray';

    context.beginPath();
    let x = cellSize.width;
    while (x < canvas.width) {
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      x += cellSize.width;
    }
    context.stroke();
    context.closePath();

    context.beginPath();
    let y = cellSize.height;
    while (y < canvas.height) {
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      y += cellSize.height;
    }
    context.stroke();
    context.closePath();
  }
);
