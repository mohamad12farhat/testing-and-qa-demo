// Pure fee math for the library front desk.
// items: [{ title, daysLate, dailyRate }]  (daysLate <= 0 means no fee)

function round2(n) {
  return Math.round(n * 100) / 100;
}

// Sum of daysLate * dailyRate across returned books. (provided)
export function feesSubtotal(items) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  const total = items.reduce(
    (sum, b) => sum + Math.max(0, b.daysLate) * b.dailyRate,
    0
  );
  return round2(total);
}

// Apply a waiver code, never returning a negative amount.
// STUDENT -> 10% off, SENIOR -> 20% off, FIRSTBOOK -> $5 off, else no change.
export function applyWaiver(subtotal, code) {
  // TODO(student): switch on code, then clamp with Math.max(0, ...) and round2.
  throw new Error("TODO(student): implement applyWaiver");
}

// Subtotal with the waiver applied. (provided; green once applyWaiver works)
export function feesTotal(items, code) {
  return applyWaiver(feesSubtotal(items), code);
}
