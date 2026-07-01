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

// Clientbound packet IDs for the Login state.
const LOGIN_CB = {
  DISCONNECT: 0x00,
  ENCRYPTION_REQUEST: 0x01,
  LOGIN_SUCCESS: 0x02,
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

  _drainBuffer() {
    while (true) {
      const lengthInfo = VarInt.tryDecode(this.recvBuffer, 0);
      if (!lengthInfo) return;

      const { value: frameLength, length: lengthBytes } = lengthInfo;
      const totalNeeded = lengthBytes + frameLength;

      if (this.recvBuffer.length < totalNeeded) return;

      const frame = this.recvBuffer.slice(lengthBytes, totalNeeded);
      this.recvBuffer = this.recvBuffer.slice(totalNeeded);

      try {
        this._handleFrame(frame);
      } catch (err) {
        logger.error("Failed to handle packet:", err.message);
      }
    }
  }

  _handleFrame(frame) {
    let payload;

    if (this.compressionThreshold >= 0) {
      const dataLenInfo = VarInt.tryDecode(frame, 0);
      if (!dataLenInfo) throw new Error("Malformed compressed packet frame");

      const { value: dataLength, length: dlBytes } = dataLenInfo;
      const rest = frame.slice(dlBytes);

      // dataLength === 0 means the packet is below the threshold and not compressed.
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
        const reason = reader.readString();
        logger.warn("Disconnected during login:", reason);
        this.close();
        return;
      }

      case LOGIN_CB.ENCRYPTION_REQUEST:
        logger.error(
          "Server requested encryption (online-mode). NeoAFK only supports offline-mode servers."
        );
        this.close();
        return;

      case LOGIN_CB.LOGIN_SUCCESS: {
        logger.info("Login successful — entering Configuration state.");
        this.sendPacket(new LoginAcknowledged());
        this.state = "CONFIGURATION";
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
        const messageId = reader.readVarInt();
        const response = new Packet(LOGIN_PLUGIN_RESPONSE_ID);
        response.writeVarInt(messageId);
        response.writeBoolean(false);
        this.sendPacket(response);
        return;
      }

      default:
        logger.warn("Unknown LOGIN packet id:", packetId);
    }
  }

  sendPacket(packet) {
    this.send(packet.buildPayload());
  }

  // Frames a raw payload (Packet ID + Data) with the correct wire framing
  // for the current compression state and writes it to the socket.
  send(payload) {
    if (!this.socket || this.socket.destroyed) return;

    let frame;

    if (this.compressionThreshold >= 0) {
      let inner;
      if (payload.length >= this.compressionThreshold) {
        const compressed = zlib.deflateSync(payload);
        inner = Buffer.concat([VarInt.encode(payload.length), compressed]);
      } else {
        // Below threshold: Data Length is set to 0 to indicate uncompressed.
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
