import { inRange } from 'ramda-adjunct';
import { CellState, isAlive } from './cells';

export type RulesStateEvaluator = (currentState: CellState) => (numberOfAliveNeighbors: number) => CellState;

/**
 * Original rules
 * S23/B3
 */
export const gameOfLife: RulesStateEvaluator =
  (currentState: CellState) =>
  (numberOfAliveNeighbors: number): CellState => {
    if (isAlive(currentState)) {
      if (numberOfAliveNeighbors === 2 || numberOfAliveNeighbors === 3) return 'alive';
      else return 'dead';
    }

    if (numberOfAliveNeighbors === 3) return 'alive';

    return currentState;
  };

/**
 * Coral shapes
 * S45678/B3
 */
export const coral: RulesStateEvaluator =
  (currentState: CellState) =>
  (numberOfAliveNeighbors: number): CellState => {
    if (isAlive(currentState)) {
      if (inRange(4, 9, numberOfAliveNeighbors)) return 'alive';
      else return 'dead';
    }

    if (numberOfAliveNeighbors === 3) return 'alive';

    return currentState;
  };

/**
 * Amoeba shapes
 * S1358/B357
 */
export const amoeba: RulesStateEvaluator =
  (currentState: CellState) =>
  (numberOfAliveNeighbors: number): CellState => {
    if (isAlive(currentState)) {
      if ([1, 3, 5, 8].includes(numberOfAliveNeighbors)) return 'alive';
      else return 'dead';
    }

    if ([3, 5, 7].includes(numberOfAliveNeighbors)) return 'alive';

    return currentState;
  };
