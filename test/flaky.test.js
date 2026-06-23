// Optional stretch. This test is intentionally FLAKY: it races a real
// timer, so it passes/fails at random. Skipped so it never blocks CI.
//
// TODO(student): make it reliable (Vitest fake timers are cleanest), then
// change describe.skip -> describe.

import { describe, it, expect } from "vitest";

describe.skip("flaky timing example (fix me)", () => {
  it("waits at least 50ms", async () => {
    const start = Date.now();
    await new Promise((r) => setTimeout(r, 50));
    expect(Date.now() - start).toBeGreaterThanOrEqual(50); // can fire early
  });
});
