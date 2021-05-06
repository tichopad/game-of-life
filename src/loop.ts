type AnimationCallback = (deltaTime: number) => void;

export function createAnimationLoop(animationCallback: AnimationCallback) {
  let lastTime = performance.now();

  const animationLoop = () => {
    const now = performance.now();
    const deltaTime = now - lastTime;
    lastTime = now;

    animationCallback(deltaTime);
    requestAnimationFrame(animationLoop);
  };

  return animationLoop;
}

type LogicCallback = (deltaTime: number) => void;

export function createLogicLoop(logicCallback: LogicCallback, cyclesPerSecond = 25) {
  let lastTime = performance.now();

  const logicLoop = () => {
    return setInterval(() => {
      const now = performance.now();
      const deltaTime = now - lastTime;
      lastTime = now;

      logicCallback(deltaTime);
    }, 1000 / cyclesPerSecond);
  };

  return logicLoop;
}
