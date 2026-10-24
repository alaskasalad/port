// Builds the closed path for a wavy starburst: a circle whose radius
// rises and falls `points` times around its edge.
export function wavyPath(points: number, amplitude: number): string {
  const steps = 360;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = 100 * (1 + amplitude * Math.cos(points * t));
    const x = (r * Math.cos(t)).toFixed(2);
    const y = (r * Math.sin(t)).toFixed(2);
    d += `${i === 0 ? "M" : "L"}${x} ${y}`;
  }
  return `${d}Z`;
}
