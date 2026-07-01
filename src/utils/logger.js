// Small leveled logger used in place of scattered console.log calls, so log
// noise (especially raw packet hex dumps) can be turned down without
// hunting through every file.
const LEVELS = ["debug", "info", "warn", "error"];

let currentLevel = process.env.NEOAFK_LOG_LEVEL || "info";

function shouldLog(level) {
  return LEVELS.indexOf(level) >= LEVELS.indexOf(currentLevel);
}

function timestamp() {
  return new Date().toISOString().split("T")[1].replace("Z", "");
}

function log(level, args) {
  if (!shouldLog(level)) return;
  const prefix = `[${timestamp()}] [${level.toUpperCase()}]`;
  const fn = level === "error" ? console.error : level === "warn" ? console.warn : console.log;
  fn(prefix, ...args);
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
