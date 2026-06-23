// Reference solution -- try the assignment before peeking.

import express from "express";
import { feesSubtotal, feesTotal } from "./fees.js";

function isValidBook(b) {
  return (
    b &&
    typeof b === "object" &&
    Number.isFinite(b.daysLate) &&
    Number.isFinite(b.dailyRate) &&
    b.dailyRate >= 0
  );
}

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/checkout", (req, res) => {
    const { items, code } = req.body ?? {};
    if (!Array.isArray(items) || !items.every(isValidBook)) {
      return res.status(400).json({ error: "invalid items" });
    }
    if (code !== undefined && typeof code !== "string") {
      return res.status(400).json({ error: "invalid code" });
    }
    const subtotal = feesSubtotal(items);
    const total = feesTotal(items, code);
    const waiver = Math.round((subtotal - total) * 100) / 100;
    res.json({ subtotal, waiver, total });
  });

  return app;
}
