type RenderCallback = (deltaTime: number) => void;

export function createRenderLoop(renderCallback: RenderCallback) {
  let lastTime = performance.now();

  const renderLoop = () => {
    const now = performance.now();
    const deltaTime = now - lastTime;
    lastTime = now;

    renderCallback(deltaTime);
    requestAnimationFrame(renderLoop);
  };

  return renderLoop;
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
