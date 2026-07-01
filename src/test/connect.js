// Usage: node src/test/connect.js [host:port] [username]
// Or set MC_HOST, MC_PORT, MC_USERNAME environment variables.

const Client = require("../client/client");
const logger = require("../utils/logger");

const host = process.env.MC_HOST || process.argv[2]?.split(":")[0];
const port = parseInt(process.env.MC_PORT || process.argv[2]?.split(":")[1] || "25565", 10);
const username = process.env.MC_USERNAME || process.argv[3] || "NeoAFK";

if (!host) {
  logger.error("No server host provided. Set MC_HOST or pass host:port as the first argument.");
  process.exit(1);
}

const bot = new Client({ host, port, username, reconnect: false });

bot.on("alive", () => logger.info("Smoke test passed: reached the PLAY state."));
bot.on("error", (err) => logger.error("Smoke test error:", err.message));

bot.connect();
