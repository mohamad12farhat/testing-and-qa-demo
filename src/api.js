// Express app for the front desk. Exports the app (no listen) so tests
// can hit it in-memory with Supertest; src/server.js opens the port.

import express from "express";
import { feesSubtotal, feesTotal } from "./fees.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  // provided
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // POST /checkout { items, code? } -> 200 { subtotal, waiver, total } | 400
  // TODO(student): validate the body, else respond with feesSubtotal/feesTotal
  // and waiver = subtotal - total.
  app.post("/checkout", (req, res) => {
    const items = req.body.items
    const code = req.body.code

    if(items === undefined || !Array.isArray(items))
    {
      return res.status(400).json({
        success : false,
        message: "Items not found"
      })
    }

    if(items.some(item => typeof(item.daysLate) != "number" || typeof(item.dailyRate) != "number"))
    {
      return res.status(400).json({
        success : false,
        message: "Values must be a number"
      })
    }
    
    const subtotal = feesSubtotal(items)

    const total = feesTotal(items,code)

    const waiver = subtotal - total
    // res.status(501).json({ error: "TODO(student): implement POST /checkout" });
    res.json({
      subtotal : subtotal,
      waiver : waiver,
      total : total
    })
  });

  return app;
}
