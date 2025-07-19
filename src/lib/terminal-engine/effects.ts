// effects.ts
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function typeLines(
  lines: string[],
  speed = 20
): Promise<string[]> {
  const result: string[] = [];
  for (const line of lines) {
    await delay(speed * line.length); // simulate typing time
    result.push(line);
  }
  return result;
}

export async function loadingDots(
  text = "Processing",
  steps = 3,
  interval = 300
): Promise<string[]> {
  const dots: string[] = [];
  for (let i = 1; i <= steps; i++) {
    dots.push(text + ".".repeat(i));
    await delay(interval);
  }
  return [text + ".".repeat(steps)]; // Final form as the result
}

export async function runBootSequence(
  pushLine: (line: string) => void
): Promise<void> {
  const steps = [
    "[OK] Initializing subsystem: AUDIO",
    "[OK] Loading assets: TEXTURES",
    "[OK] Syncing clock: UTC-0",
    "[OK] Validating agent profile",
  ];

  for (const step of steps) {
    pushLine(step);
    await delay(400);
  }

  for (let i = 0; i <= 10; i++) {
    const percent = i * 10;
    const bar = `[${"=".repeat(i)}${" ".repeat(10 - i)}] ${percent}%`;
    pushLine(bar);
    await delay(150);
  }

  pushLine("System Ready.");
}
