// Shared by the isolated editor and downloadable standalone projects.
(function () {
  // Child examples advance in fixed 60Hz teaching ticks, independent of display refresh rate.
  // Catch up small timer delays; discard long suspended-tab backlogs.
  const frameDuration = 1000 / 60;
  let clockStart = performance.now(),
    deliveredTick = 0,
    nextFrameId = 0;
  const callbacks = new Map();
  self.requestAnimationFrame = (callback) => {
    const id = ++nextFrameId;
    callbacks.set(id, callback);
    return id;
  };
  self.cancelAnimationFrame = (id) => callbacks.delete(id);
  setInterval(() => {
    const due = Math.floor((performance.now() - clockStart) / frameDuration);
    if (due - deliveredTick > 5) {
      deliveredTick = due - 1;
    }
    while (deliveredTick < due) {
      deliveredTick++;
      const ready = [...callbacks];
      for (const [id, callback] of ready)
        if (callbacks.delete(id)) callback(deliveredTick * frameDuration);
    }
  }, 4);
})();
