// Sends a Status ping to a Minecraft server and prints the response.
// Usage: node src/test/status.js [host:port]
// Or set MC_HOST and MC_PORT environment variables.

const net = require("net");
const VarInt = require("../net/varint");
const BufferReader = require("../net/reader");
const logger = require("../utils/logger");

const host = process.env.MC_HOST || process.argv[2]?.split(":")[0];
const port = parseInt(process.env.MC_PORT || process.argv[2]?.split(":")[1] || "25565", 10);

if (!host) {
  logger.error("No server host provided. Set MC_HOST or pass host:port as the first argument.");
  process.exit(1);
}

const socket = net.createConnection(port, host, () => {
  logger.info(`Connected to ${host}:${port}`);

  // Handshake — nextState 1 = Status
  const handshakeData = Buffer.concat([
    VarInt.encode(0x00),         // packet id
    VarInt.encode(767),          // protocol version
    VarInt.encode(host.length),
    Buffer.from(host, "utf8"),
    Buffer.from([(port >> 8) & 0xff, port & 0xff]),
    VarInt.encode(1),            // next state: Status
  ]);
  const handshakeFrame = Buffer.concat([VarInt.encode(handshakeData.length), handshakeData]);

  // Status request (0x00, no payload)
  const statusData = VarInt.encode(0x00);
  const statusFrame = Buffer.concat([VarInt.encode(statusData.length), statusData]);

  socket.write(Buffer.concat([handshakeFrame, statusFrame]));
});

let recvBuf = Buffer.alloc(0);

socket.on("data", (chunk) => {
  recvBuf = Buffer.concat([recvBuf, chunk]);

  const lenInfo = VarInt.tryDecode(recvBuf, 0);
  if (!lenInfo) return;

  const { value: frameLen, length: lenBytes } = lenInfo;
  if (recvBuf.length < lenBytes + frameLen) return;

  const frame = recvBuf.slice(lenBytes, lenBytes + frameLen);
  const reader = new BufferReader(frame);
  const packetId = reader.readVarInt();

  if (packetId === 0x00) {
    const json = reader.readString();
    try {
      const status = JSON.parse(json);
      logger.info("Server status:", JSON.stringify(status, null, 2));
    } catch (_) {
      logger.info("Raw status response:", json);
    }
  }

  socket.destroy();
});

socket.on("error", (err) => logger.error("Status check error:", err.message));
