import { invoker, curry } from 'ramda';
import type { FieldAttributes, Position } from './cells';

// Canvas methods invokers
const clearRect = invoker(4, 'clearRect');
const fillRect = invoker(4, 'fillRect');

type CanvasWithContext2D = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

/**
 * Returns canvas element and its context
 */
export function getCanvasWithContext2D(canvasElementSelector: string): CanvasWithContext2D {
  const canvas = document.querySelector<HTMLCanvasElement>(canvasElementSelector);

  if (canvas === null) {
    throw new Error('Could not find element with ID "canvas"');
  }

  const context = canvas.getContext('2d');

  if (context === null) {
    throw new Error('Could not get canvas 2D context');
  }

  return {
    canvas,
    context,
  };
}

type CanvasToFieldRatio = {
  horizontal: number;
  vertical: number;
};

const getCanvasToFieldRatio = (canvas: HTMLCanvasElement, field: FieldAttributes): CanvasToFieldRatio => ({
  horizontal: canvas.width / field.width,
  vertical: canvas.height / field.height,
});

export const clear = curry((canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) =>
  clearRect(0, 0, canvas.width, canvas.height, context)
);

/**
 * Draws cells given canvas, cells field and their positions
 */
export const drawCells = curry(
  (
    canvas: HTMLCanvasElement,
    field: FieldAttributes,
    positions: ReadonlyArray<Position>,
    context: CanvasRenderingContext2D
  ) => {
    const canvasToFieldRatio = getCanvasToFieldRatio(canvas, field);

    positions.forEach(([x, y]) =>
      fillRect(
        x * canvasToFieldRatio.horizontal,
        y * canvasToFieldRatio.vertical,
        canvasToFieldRatio.horizontal,
        canvasToFieldRatio.vertical,
        context
      )
    );
  }
);

/**
 * Draws grid given canvas and cells field
 */
export const drawGrid = curry(
  (canvas: HTMLCanvasElement, field: FieldAttributes, context: CanvasRenderingContext2D) => {
    context.lineWidth = 1;
    context.strokeStyle = 'lightgray';

    const canvasToFieldRatio = getCanvasToFieldRatio(canvas, field);
    const cellWidth = canvasToFieldRatio.horizontal;
    const cellHeight = canvasToFieldRatio.vertical;

    context.beginPath();
    let x = cellWidth;
    while (x < canvas.width) {
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      x += cellWidth;
    }
    context.stroke();
    context.closePath();

    context.beginPath();
    let y = cellHeight;
    while (y < canvas.height) {
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      y += cellHeight;
    }
    context.stroke();
    context.closePath();
  }
);
