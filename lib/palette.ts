export const PALETTE = ["#262f71", "#256743", "#e62770", "#fcea0c", "#0765a7", "#e31f24"];

// The palette rotated so it begins at `start`, letting a shape cycle
// through every color starting from its own color.
export function sequenceFrom(start: string): string[] {
  const index = PALETTE.indexOf(start);
  if (index < 0) return [start, ...PALETTE];
  return [...PALETTE.slice(index), ...PALETTE.slice(0, index)];
}
