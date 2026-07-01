#!/usr/bin/env node
// NeoAFK entry point.
// Usage: node src/index.js [host:port] [username]

const Client = require("./client/client");
const logger = require("./utils/logger");

function parseArgs(argv) {
  const [, , hostPort, username] = argv;

  // Falls back to the dev's original test server if nothing is given.
  let host = "Nazmoddedserver.aternos.me";
  let port = 57884;

  if (hostPort) {
    const [h, p] = hostPort.split(":");
    host = h;
    if (p) port = parseInt(p, 10);
  }

  return { host, port, username: username || "NeoAFK" };
}

const { host, port, username } = parseArgs(process.argv);

logger.info("NeoAFK is starting...");
logger.info(`Target: ${host}:${port} as "${username}"`);

const bot = new Client({ host, port, username });

bot.on("alive", () => {
  logger.info("Bot is alive and in the world.");
});

bot.on("error", (err) => {
  logger.error("Bot error:", err.message);
});

bot.connect();

process.on("SIGINT", () => {
  logger.info("Shutting down...");
  bot.disconnect();
  process.exit(0);
});
