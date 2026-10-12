// Stable teaching ranges, independent of the currently edited value.
// These are UI exploration limits, not restrictions on learner JavaScript.
const ranges = {
  size: [1, 350], radius: [1, 200], widthValue: [1, 400], height: [1, 400],
  distance: [-350, 350], degrees: [-360, 360], rotation: [-180, 180],
  direction: [-180, 180], wingAngle: [-90, 90], tailAngle: [-90, 90],
  legAngle: [-45, 45], mouth: [10, 160], points: [3, 20], petals: [3, 24],
  rays: [3, 64], steps: [1, 200], turn: [-180, 180], thickness: [1, 30],
  value: [1, 30], x: [-350, 350], y: [-350, 350], x1: [-350, 350],
  y1: [-350, 350], x2: [-350, 350], y2: [-350, 350], horizonY: [-350, 350],
  min: [-350, 350], max: [-350, 350], tick: [0, 200], duration: [1, 200],
  delayMilliseconds: [0, 5000], radians: [-6.28, 6.28, 0.01], id: [0, 1000],
};
const overrides = {
  setTextSize: { size: [8, 100] }, writeText: { size: [8, 100] },
  jumpHeight: { height: [0, 300] },
  drawDino: { size: [10, 160] },
  drawButterfly: { size: [10, 140], wingAngle: [0, 90] },
  drawPacman: { radius: [5, 180] },
  drawCircle: { radius: [5, 120] }, drawHalfCircle: { radius: [5, 120] },
  drawArc: { radius: [5, 120], degrees: [0, 360] },
  drawOvalArc: { degrees: [0, 360] },
  drawTriangle: { size: [10, 170] },
  drawStar: { size: [10, 100] }, drawFlower: { size: [5, 60] },
  drawRect: { widthValue: [5, 280], height: [5, 280] },
  drawCloud: { size: [5, 110] },
  drawSpiral: { steps: [1, 90] },
  drawLine: { x1: [-320, 320], y1: [-320, 320], x2: [-320, 320], y2: [-320, 320] },
};
export function parameterRange(entry, name) {
  const range = overrides[entry.name]?.[name] || ranges[name];
  return range ? { min: range[0], max: range[1], step: range[2] || 1 } : null;
}
