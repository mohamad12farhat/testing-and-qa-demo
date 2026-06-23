// Reference solution -- try the assignment before peeking.

function round2(n) {
  return Math.round(n * 100) / 100;
}

export function feesSubtotal(items) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  const total = items.reduce(
    (sum, b) => sum + Math.max(0, b.daysLate) * b.dailyRate,
    0
  );
  return round2(total);
}

export function applyWaiver(subtotal, code) {
  let owed;
  switch (code) {
    case "STUDENT":
      owed = subtotal * 0.9;
      break;
    case "SENIOR":
      owed = subtotal * 0.8;
      break;
    case "FIRSTBOOK":
      owed = subtotal - 5;
      break;
    default:
      owed = subtotal;
  }
  return round2(Math.max(0, owed));
}

export function feesTotal(items, code) {
  return applyWaiver(feesSubtotal(items), code);
}
