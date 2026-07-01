// Quick manual smoke test for the connection flow, using the real Client
// (previously this file hand-built Handshake/Login packets itself, which
// duplicated - and silently diverged from - the logic in protocol/handshake.js).
//
// Usage: node src/test/connect.js [host:port] [username]
const Client = require("../client/client");
const logger = require("../utils/logger");

const [, , hostPort, username] = process.argv;
const hp = hostPort || "Nazmoddedserver.aternos.me:57884";
const [host, portStr] = hp.split(":");
const port = parseInt(portStr, 10) || 57884;

const bot = new Client({ host, port, username: username || "NeoAFK", reconnect: false });

bot.on("alive", () => logger.info("Smoke test passed: reached the PLAY state."));
bot.on("error", (err) => logger.error("Smoke test error:", err.message));

bot.connect();
