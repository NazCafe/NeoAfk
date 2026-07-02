const dns = require("dns");

const LOOKUP_TIMEOUT_MS = 5000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("SRV lookup timed out")), ms)),
  ]);
}

// Resolves the real target host/port for a Minecraft Java Edition server by
// querying _minecraft._tcp.<host>, the same lookup the vanilla client does
// before connecting. This is how hosts like Aternos expose a stable domain
// name (e.g. example.aternos.me) even though the underlying IP and port
// change every time the server restarts.
//
// Per the documented Notchian client behavior, an SRV record is a complete
// redirect: both the TCP connection and the Handshake packet's Server
// Address/Server Port fields use the resolved target, not the original host.
//
// Falls back to { host, port: fallbackPort, viaSrv: false } if no SRV
// record exists, the lookup fails, or it times out.
async function resolveMinecraftSrv(host, fallbackPort) {
  try {
    const records = await withTimeout(dns.promises.resolveSrv(`_minecraft._tcp.${host}`), LOOKUP_TIMEOUT_MS);

    if (!records || records.length === 0) {
      return { host, port: fallbackPort, viaSrv: false };
    }

    // RFC 2782: lowest priority value wins; ties broken by highest weight.
    records.sort((a, b) => a.priority - b.priority || b.weight - a.weight);

    return { host: records[0].name, port: records[0].port, viaSrv: true };
  } catch (err) {
    return { host, port: fallbackPort, viaSrv: false };
  }
}

module.exports = { resolveMinecraftSrv };
