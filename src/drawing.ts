import { getCanvasToFieldRatio } from './canvas';
import { FieldAttributes } from './cells';
import { Position } from './position';

export const clearCanvas = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void => {
  return context.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * Draws cells given canvas, cells field and their positions
 */
export function drawCells(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  field: FieldAttributes,
  positions: ReadonlyArray<Position>
): void {
  const canvasToFieldRatio = getCanvasToFieldRatio(canvas, field);

  positions.forEach(([x, y]) =>
    context.fillRect(
      x * canvasToFieldRatio.horizontal,
      y * canvasToFieldRatio.vertical,
      canvasToFieldRatio.horizontal,
      canvasToFieldRatio.vertical
    )
  );
}

/**
 * Draws grid given canvas and cells field
 */
export function drawGrid(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, field: FieldAttributes): void {
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

/**
 * Creates a function that draws the entire world content given cells' positions
 */
export const createWorldDrawer =
  (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, field: FieldAttributes) =>
  (cellsPositions: ReadonlyArray<Position>): void => {
    clearCanvas(canvas, context);
    drawCells(canvas, context, field, cellsPositions);
    drawGrid(canvas, context, field);
  };
