// Boots the real HTTP server. Run with: npm start
import { createApp } from "./api.js";

const PORT = process.env.PORT || 3000;
createApp().listen(PORT, () => {
  console.log(`Library front desk on http://localhost:${PORT}`);
});
