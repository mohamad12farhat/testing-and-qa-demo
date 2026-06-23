## Library QA Demo

This project is a hands-on assignment for learning **testing & QA in Node.js**. You'll work on the library "front desk": a small module that tallies a member's **late fees** when they return their borrowed books and applies a fee-**waiver** code (student, senior, first book). You'll take it from failing tests all the way to a green CI pipeline.

Please note this was created on a Windows PC, while running on WSL2. Keep that in mind if you run into any issues.

### What you'll learn

- **Unit testing** pure functions in isolation.
- **TDD** — the red → green → refactor loop (write a failing test, make it pass, then clean up).
- **Integration testing** an Express API with [Supertest](https://github.com/ladjs/supertest).
- **Coverage** — measuring how much of your code the tests exercise, and gating on it.
- **CI** — running the whole thing automatically on every push with GitHub Actions.

### Prerequisites

- [NodeJS](https://nodejs.org/en/download)
  - This repo targets **NodeJS v20+**.
  - Either install NodeJS if you don't have it already or switch to any v20+ version using any version-management utility like `nvm`, `mise`, `asdf`...
- A terminal and a code editor. That's it — no database, no Docker for this one.

### Getting up and running

First, install the dependencies:

```bash
npm install
```

Now run the test suite:

```bash
npm test
```

**Expect failures — that's the point.** Some tests are green (the parts that are provided for you), and several are red (the parts marked `// TODO(student):` that you'll implement). Your mission is to turn the whole suite green.

### Part 1 — Unit testing + TDD

Open [test/fees.test.js](test/fees.test.js) and run the suite. The `feesSubtotal` specs already pass — read them as a worked example. The `applyWaiver` specs **fail**, because [src/fees.js](src/fees.js) doesn't implement it yet.

This is **Test-Driven Development**:

1. **Red** — a failing test describes the behaviour you want.
2. **Green** — write the simplest code in [src/fees.js](src/fees.js) that makes it pass.
3. **Refactor** — tidy the code now that the test protects you.

Implement `applyWaiver` (the waiver codes are documented right above the `TODO`). When it's green, `feesTotal` goes green too — it just composes the functions you wrote. Use `npm run test:watch` for an instant feedback loop.

### Part 2 — Integration testing

Open [test/api.test.js](test/api.test.js). `GET /health` passes; the `POST /checkout` specs fail. Implement that route in [src/api.js](src/api.js) so it:

- validates the request body and returns **400** on malformed input, and
- returns `{ subtotal, waiver, total }` for a valid return.

Notice how integration tests differ from unit tests: they go through **real routing, JSON body parsing, and HTTP status codes** rather than calling a function directly. [src/api.js](src/api.js) exports the app without opening a port, which is what lets Supertest test it in-memory.

### Part 3 — Coverage

Run:

```bash
npm run coverage
```

Read the summary table (an HTML report is also written to `./coverage`). The **quality gate lives in [vitest.config.js](vitest.config.js)** — thresholds are set to **80%** for lines, functions, branches and statements. If you're below threshold, find the untested branch and add a test to cover it.

### Part 4 — CI

Push your fork to GitHub and watch the **Actions** tab. The workflow in [.github/workflows/ci.yml](.github/workflows/ci.yml) installs dependencies and runs `npm run coverage` on every push and pull request. If tests fail or coverage drops below threshold, **the build goes red**. Make it green.

### Stretch — the flaky test

[test/flaky.test.js](test/flaky.test.js) contains one intentionally **flaky** test (it races a real timer, so it passes or fails at random). It's skipped so it never blocks you. Read the comments to understand *why* it's flaky, fix it (Vitest fake timers are the cleanest approach), then un-skip it.

### Definition of done

- [ ] `npm test` — all tests pass.
- [ ] `npm run coverage` — coverage is ≥ 80% on every metric.
- [ ] CI is green on your pushed branch.
- [ ] *(Stretch)* the flaky test is fixed and un-skipped.

### Commands you might find useful

```bash
npm test          # run the suite once
npm run test:watch # re-run on file changes (great for TDD)
npm run coverage  # run with coverage + the 80% quality gate
npm start         # boot the real server on http://localhost:3000
```

### How to check your work

A complete reference implementation lives in [solution/](solution/). **Try the assignment first** — the point is the struggle, not the answer. If you get stuck, you can compare against `solution/fees.js` and `solution/api.js`, or copy them over `src/` to see the entire suite go green.

### How to submit your work

1. Fork this repo to your own GitHub account.
2. Make your changes there.
3. Open a Pull Request against this repo.

### A note on using AI agents

This exercise is meant to deepen your understanding of testing, TDD, and CI. If you plan to use an AI agent, don't ask it to generate the full solution. Instead, guide it with something like:

```
Act as a mentor. Do not give me the full solution.
Help me step by step with hints, explanations, and guiding questions so I can implement:
- The applyWaiver waiver codes (and the no-negative rule)
- The POST /checkout route, including body validation and 400 responses
- Raising test coverage above the 80% threshold
- (Stretch) Fixing the flaky timing test

Focus on helping me understand, not completing the task for me.
```

The goal is to understand what you're doing, not just finish the assignment.
