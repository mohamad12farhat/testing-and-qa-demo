// Optional stretch. This test is intentionally FLAKY: it races a real
// timer, so it passes/fails at random. Skipped so it never blocks CI.
//
// TODO(student): make it reliable (Vitest fake timers are cleanest), then
// change describe.skip -> describe.

import { describe, it, expect, vi, beforeEach, afterEach} from "vitest";

describe("flaky timing example (fix me)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
   it("waits at least 50ms", async () => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 50);
    });

    const start = Date.now();

    vi.advanceTimersByTime(50);
    await promise;

    const elapsed = Date.now() - start;

    expect(elapsed).toBeGreaterThanOrEqual(50);
    });
});
