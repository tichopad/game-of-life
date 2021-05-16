import type { FieldAttributes } from './cells';

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

/**
 * Returns dimensional ratios of cells' field to canvas
 */
export function getCanvasToFieldRatio(canvas: HTMLCanvasElement, field: FieldAttributes): CanvasToFieldRatio {
  if (field.height <= 0) throw new Error('Field height cannot be zero or negative');
  if (field.width <= 0) throw new Error('Field width cannot be zero or negative');

  return {
    horizontal: canvas.width / field.width,
    vertical: canvas.height / field.height,
  };
}
