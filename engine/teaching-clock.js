// Shared by the isolated editor and downloadable standalone projects.
(function () {
  const frameDuration = 1000 / 60;
  let clockStart = performance.now(), deliveredTick = 0, nextFrameId = 0, timer = null, ticking = false;
  const callbacks = new Map();
  let pausedAt = null;
  self.__pauseTurtleFrames = pause => {
    if (pause && pausedAt === null) {
      pausedAt = performance.now();
      if (timer !== null) clearTimeout(timer);
      timer = null;
    } else if (!pause && pausedAt !== null) {
      clockStart += performance.now() - pausedAt;
      pausedAt = null;
      schedule();
    }
  };
  function schedule() {
    if (pausedAt !== null || ticking || timer !== null || !callbacks.size) return;
    timer = setTimeout(tick, Math.max(1, clockStart + (deliveredTick + 1) * frameDuration - performance.now()));
  }
  function tick() {
    timer = null;
    ticking = true;
    const due = Math.floor((performance.now() - clockStart) / frameDuration);
    // Discard long suspended-tab backlogs, preserving small 60Hz catch-ups.
    if (due - deliveredTick > 5) deliveredTick = due - 1;
    while (deliveredTick < due && callbacks.size) {
      deliveredTick++;
      const ready = [...callbacks];
      for (const [id, callback] of ready)
        if (callbacks.delete(id)) callback(deliveredTick * frameDuration);
    }
    ticking = false;
    schedule();
  }
  self.requestAnimationFrame = callback => {
    const id = ++nextFrameId;
    if (!ticking && !callbacks.size && timer === null) deliveredTick = Math.floor((performance.now() - clockStart) / frameDuration);
    callbacks.set(id, callback);
    schedule();
    return id;
  };
  self.cancelAnimationFrame = id => {
    callbacks.delete(id);
    if (!callbacks.size && timer !== null) { clearTimeout(timer); timer = null; }
  };
})();
