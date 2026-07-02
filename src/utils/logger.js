const LEVELS = ["debug", "info", "warn", "error"];

let currentLevel = process.env.NEOAFK_LOG_LEVEL || "info";

function shouldLog(level) {
  return LEVELS.indexOf(level) >= LEVELS.indexOf(currentLevel);
}

function timestamp() {
  return new Date().toISOString().split("T")[1].replace("Z", "");
}

// Redact common sensitive values before logging
function sanitize(value) {
  if (typeof value !== "string") return value;

  return value
    .replace(/token=[^\s]+/gi, "token=[REDACTED]")
    .replace(/password=[^\s]+/gi, "password=[REDACTED]")
    .replace(/authorization:[^\n]+/gi, "Authorization: [REDACTED]");
}

function log(level, args) {
  if (!shouldLog(level)) return;

  const prefix = `[${timestamp()}] [${level.toUpperCase()}]`;

  const fn =
    level === "error"
      ? console.error
      : level === "warn"
      ? console.warn
      : console.log;

  fn(prefix, ...args.map(sanitize));
}

module.exports = {
  setLevel(level) {
    if (LEVELS.includes(level)) currentLevel = level;
  },
  debug: (...args) => log("debug", args),
  info: (...args) => log("info", args),
  warn: (...args) => log("warn", args),
  error: (...args) => log("error", args),
};
