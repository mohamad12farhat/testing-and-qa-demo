// Integration tests for src/api.js via Supertest (real routing + status
// codes, no live port). /health passes; /checkout is red until you build it.

import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/api.js";

const app = createApp();

describe("GET /health", () => {
  it("returns { status: 'ok' }", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("POST /checkout", () => {
  it("computes fees with no waiver", async () => {
    const res = await request(app)
      .post("/checkout")
      .send({ items: [{ daysLate: 3, dailyRate: 0.25 }] });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ subtotal: 0.75, waiver: 0, total: 0.75 });
  });

  it("applies a waiver code", async () => {
    const res = await request(app)
      .post("/checkout")
      .send({ items: [{ daysLate: 10, dailyRate: 1.0 }], code: "SENIOR" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ subtotal: 10, waiver: 2, total: 8 });
  });

  it("400s when items is missing", async () => {
    const res = await request(app).post("/checkout").send({ code: "STUDENT" });
    expect(res.status).toBe(400);
  });

  it("400s when items is not an array", async () => {
    const res = await request(app).post("/checkout").send({ items: "nope" });
    expect(res.status).toBe(400);
  });

  it("400s on a non-numeric daysLate", async () => {
    const res = await request(app)
      .post("/checkout")
      .send({ items: [{ daysLate: "soon", dailyRate: 0.25 }] });
    expect(res.status).toBe(400);
  });
});
