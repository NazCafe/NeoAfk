const EventEmitter = require("events");

const NeoSocket = require("../net/socket");
const HandshakePacket = require("../protocol/handshake");
const LoginStart = require("../protocol/loginStart");
const logger = require("../utils/logger");

class Client extends EventEmitter {
  constructor(options = {}) {
    super();

    if (!options.host || !options.port) {
      throw new Error("Client requires { host, port }");
    }

    this.host = options.host;
    this.port = options.port;
    this.username = options.username || "NeoAFK";

    this.autoReconnect = options.reconnect !== false;
    this.reconnectDelayMs = options.reconnectDelayMs || 5000;

    this.socket = null;
    this._manualClose = false;
    this._reconnectTimer = null;
  }

  connect() {
    this._manualClose = false;
    clearTimeout(this._reconnectTimer);

    const socket = new NeoSocket();
    this.socket = socket;

    socket.on("connect", () => {
      logger.info(`TCP connected to ${this.host}:${this.port} — sending handshake...`);

      const handshake = new HandshakePacket(this.host, this.port, 2);
      socket.send(handshake.buildPayload());

      const loginStart = new LoginStart(this.username);
      socket.send(loginStart.buildPayload());

      logger.info(`Login Start sent as "${this.username}"`);
    });

    socket.on("alive", () => {
      this.emit("alive");
    });

    socket.on("error", (err) => {
      this.emit("error", err);
    });

    socket.on("close", () => {
      this.emit("close");
      this._scheduleReconnect();
    });

    socket.connect(this.host, this.port);
  }

  _scheduleReconnect() {
    if (!this.autoReconnect || this._manualClose) return;

    logger.info(`Reconnecting in ${Math.round(this.reconnectDelayMs / 1000)}s...`);
    clearTimeout(this._reconnectTimer);
    this._reconnectTimer = setTimeout(() => this.connect(), this.reconnectDelayMs);
  }

  disconnect() {
    this._manualClose = true;
    clearTimeout(this._reconnectTimer);
    if (this.socket) this.socket.close();
  }
}

module.exports = Client;
