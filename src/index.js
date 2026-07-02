#!/usr/bin/env node

const Client = require("./client/client");
const logger = require("./utils/logger");
const http = require("http");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("NeoAfk is running.");
}).listen(PORT, () => {
  console.log(`Health server listening on ${PORT}`);
});

const host = process.env.MC_HOST || process.argv[2]?.split(":")[0];
const port = parseInt(process.env.MC_PORT || process.argv[2]?.split(":")[1] || "25565", 10);
const username = process.env.MC_USERNAME || process.argv[3] || "NeoAFK";
const reconnectDelayMs = parseInt(process.env.RECONNECT_DELAY_MS || "5000", 10);

if (!host) {
  logger.error("No server host provided. Set MC_HOST or pass host:port as the first argument.");
  process.exit(1);
}

logger.info("NeoAFK is starting...");
logger.info(`Target: ${host}:${port}`);
logger.debug(`Bot username configured.`);

const bot = new Client({ host, port, username, reconnectDelayMs });

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
