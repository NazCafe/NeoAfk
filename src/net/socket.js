const net = require("net");
const zlib = require("zlib");
const EventEmitter = require("events");

const BufferReader = require("./reader");
const VarInt = require("./varint");
const Packet = require("./packet");

const ConfigurationHandler = require("../protocol/configuration");
const PlayHandler = require("../protocol/play");
const LoginAcknowledged = require("../protocol/loginAcknowledged");
const ClientInformation = require("../protocol/clientInformation");

const logger = require("../utils/logger");

// Clientbound Login packet IDs.
const LOGIN_CB = {
  DISCONNECT: 0x00,
  ENCRYPTION_REQUEST: 0x01,
  LOGIN_SUCCESS: 0x02, // BUG FIX: code used to check for 3 here, which is
  // actually Set Compression - Login Success would never be recognised on
  // any server with compression disabled, and would be misread as if it
  // were a Login Success on servers that *do* use compression.
  SET_COMPRESSION: 0x03,
  LOGIN_PLUGIN_REQUEST: 0x04,
};

const LOGIN_PLUGIN_RESPONSE_ID = 0x02;

class NeoSocket extends EventEmitter {
  constructor() {
    super();
    this.socket = null;
    this.connected = false;

    this.state = "LOGIN"; // LOGIN -> CONFIGURATION -> PLAY

    // -1 means "compression disabled". Once a Set Compression packet is
    // received this becomes the threshold (in bytes) above which packets
    // are zlib-compressed - and from that point on EVERY packet (in both
    // directions) must use the "with compression" frame format.
    this.compressionThreshold = -1;

    // Bytes received but not yet parsed into a complete packet. TCP is a
    // byte stream, not a message stream - a single 'data' event can contain
    // a partial packet, multiple packets, or both, so incoming bytes always
    // have to be buffered and re-assembled instead of assumed-complete.
    this.recvBuffer = Buffer.alloc(0);

    this.configurationHandler = new ConfigurationHandler();
    this.playHandler = new PlayHandler();
  }

  connect(host, port) {
    this.socket = net.createConnection(port, host);

    this.socket.on("connect", () => {
      this.connected = true;
      logger.info(`Connected to ${host}:${port}`);
      this.emit("connect");
    });

    this.socket.on("data", (chunk) => {
      this.recvBuffer = this.recvBuffer.length === 0 ? chunk : Buffer.concat([this.recvBuffer, chunk]);
      this._drainBuffer();
    });

    this.socket.on("close", () => {
      this.connected = false;
      logger.info("Connection closed");
      this.emit("close");
    });

    this.socket.on("error", (err) => {
      logger.error("Socket error:", err.message);
      this.emit("error", err);
    });
  }

  // Pulls as many complete frames as are currently available out of
  // recvBuffer. Anything incomplete is left in recvBuffer for the next
  // 'data' event to top up.
  _drainBuffer() {
    while (true) {
      const lengthInfo = VarInt.tryDecode(this.recvBuffer, 0);
      if (!lengthInfo) return; // don't even have the length VarInt yet

      const { value: frameLength, length: lengthBytes } = lengthInfo;
      const totalNeeded = lengthBytes + frameLength;

      if (this.recvBuffer.length < totalNeeded) return; // body not fully here yet

      const frame = this.recvBuffer.slice(lengthBytes, totalNeeded);
      this.recvBuffer = this.recvBuffer.slice(totalNeeded);

      try {
        this._handleFrame(frame);
      } catch (err) {
        logger.error("Failed to handle packet:", err.message);
      }
    }
  }

  // frame = the bytes inside one Length-prefixed packet (i.e. everything
  // after the outer Length VarInt). Resolves compression (if enabled) and
  // dispatches the resulting [Packet ID][Data] to the right state handler.
  _handleFrame(frame) {
    let payload;

    if (this.compressionThreshold >= 0) {
      const dataLenInfo = VarInt.tryDecode(frame, 0);
      if (!dataLenInfo) throw new Error("Malformed compressed packet frame");

      const { value: dataLength, length: dlBytes } = dataLenInfo;
      const rest = frame.slice(dlBytes);

      payload = dataLength === 0 ? rest : zlib.inflateSync(rest);
    } else {
      payload = frame;
    }

    const reader = new BufferReader(payload);
    const packetId = reader.readVarInt();

    this._dispatch(packetId, reader);
  }

  _dispatch(packetId, reader) {
    switch (this.state) {
      case "LOGIN":
        return this._handleLogin(packetId, reader);
      case "CONFIGURATION":
        return this.configurationHandler.handle(packetId, reader, this);
      case "PLAY":
        return this.playHandler.handle(packetId, reader, this);
      default:
        logger.warn(`Unhandled connection state "${this.state}" for packet ${packetId}`);
    }
  }

  _handleLogin(packetId, reader) {
    switch (packetId) {
      case LOGIN_CB.DISCONNECT: {
        const reason = reader.readString(); // JSON Text Component (a plain string here)
        logger.warn("Disconnected during login:", reason);
        this.close();
        return;
      }

      case LOGIN_CB.ENCRYPTION_REQUEST:
        // NeoAFK only supports offline-mode (cracked) servers. We can't
        // perform Mojang session authentication / RSA encryption, so there
        // is nothing useful we can do here except disconnect cleanly.
        logger.error(
          "Server requested encryption (online-mode auth), which NeoAFK doesn't support. " +
            "Connect to an offline-mode server instead."
        );
        this.close();
        return;

      case LOGIN_CB.LOGIN_SUCCESS: {
        logger.info("Login successful - acknowledging and entering Configuration state.");

        this.sendPacket(new LoginAcknowledged());
        this.state = "CONFIGURATION";

        // Real clients send Client Information immediately on entering
        // Configuration rather than waiting to be asked for it.
        this.sendPacket(new ClientInformation());
        return;
      }

      case LOGIN_CB.SET_COMPRESSION: {
        const threshold = reader.readVarInt();
        this.compressionThreshold = threshold;
        logger.info("Compression enabled, threshold =", threshold);
        return;
      }

      case LOGIN_CB.LOGIN_PLUGIN_REQUEST: {
        // Some modded servers (NeoForge included) may use this for extra
        // handshake data. We mimic vanilla client behaviour and say we
        // didn't understand it - a NeoForge server should treat that the
        // same way it treats any vanilla client connecting.
        const messageId = reader.readVarInt();
        const response = new Packet(LOGIN_PLUGIN_RESPONSE_ID);
        response.writeVarInt(messageId);
        response.writeBoolean(false); // "understood" = false, no data follows
        this.sendPacket(response);
        return;
      }

      default:
        logger.warn("Unknown LOGIN packet id:", packetId);
    }
  }

  // Sends a Packet-like object (anything with buildPayload()), applying
  // the connection's current compression framing.
  sendPacket(packet) {
    this.send(packet.buildPayload());
  }

  // Sends a raw payload (Packet ID + Data, no length prefix yet) applying
  // the correct wire framing for the connection's current compression state.
  send(payload) {
    if (!this.socket || this.socket.destroyed) return;

    let frame;

    if (this.compressionThreshold >= 0) {
      let inner;
      if (payload.length >= this.compressionThreshold) {
        const compressed = zlib.deflateSync(payload);
        inner = Buffer.concat([VarInt.encode(payload.length), compressed]);
      } else {
        // Below threshold: still uses the "with compression" packet shape,
        // just with Data Length = 0 to mark it as not actually compressed.
        inner = Buffer.concat([VarInt.encode(0), payload]);
      }
      frame = Buffer.concat([VarInt.encode(inner.length), inner]);
    } else {
      frame = Buffer.concat([VarInt.encode(payload.length), payload]);
    }

    this.socket.write(frame);
  }

  close() {
    if (this.socket) {
      this.socket.destroy();
    }
  }
}

module.exports = NeoSocket;
