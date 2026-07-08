const EventEmitter = require("events");

const NeoSocket = require("../net/socket");
const HandshakePacket = require("../protocol/handshake");
const LoginStart = require("../protocol/loginStart");
const { resolveMinecraftSrv } = require("../net/srv");
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

    // Optional Microsoft account authentication. If both are provided,
    // the bot re-authenticates fresh on every connect/reconnect attempt
    // and uses the real account's username/UUID instead of this.username.
    // On any auth failure, it falls back to the offline-mode identity
    // rather than crashing - this is what lets the same bot join either
    // online-mode or offline-mode servers depending on what's available.
    this.msClientId = options.msClientId || null;
    this.msRefreshToken = options.msRefreshToken || null;

    this.autoReconnect = options.reconnect !== false;
    this.reconnectDelayMs = options.reconnectDelayMs || 5000;

    this.socket = null;
    this._manualClose = false;
    this._reconnectTimer = null;
  }

  async connect() {
    this._manualClose = false;
    clearTimeout(this._reconnectTimer);

    // Resolved fresh on every connect/reconnect attempt, so a changed
    // Aternos port after a restart is picked up automatically without
    // needing to update MC_PORT manually.
    const resolved = await resolveMinecraftSrv(this.host, this.port);

    if (resolved.viaSrv) {
      logger.info(`SRV record found for ${this.host} -> ${resolved.host}:${resolved.port}`);
    }

    if (this._manualClose) return; // disconnect() was called while resolving

    const auth = await this._authenticate();

    if (this._manualClose) return; // disconnect() was called while authenticating

    const socket = new NeoSocket();
    socket.auth = auth;
    this.socket = socket;

    socket.on("connect", () => {
      const loginUsername = auth ? auth.username : this.username;
      const loginUuid = auth ? auth.uuid : undefined;

      logger.info(`TCP connected to ${resolved.host}:${resolved.port} - sending handshake...`);

      const handshake = new HandshakePacket(resolved.host, resolved.port, 2);
      socket.send(handshake.buildPayload());

      const loginStart = new LoginStart(loginUsername, loginUuid);
      socket.send(loginStart.buildPayload());

      logger.info(`Login Start sent as "${loginUsername}"${auth ? " (Microsoft-authenticated)" : ""}`);
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

    socket.connect(resolved.host, resolved.port);
  }

  // Attempts Microsoft authentication if MS_CLIENT_ID/MS_REFRESH_TOKEN are
  // configured. Returns { accessToken, uuid, username } on success, or
  // null if not configured or if it fails for any reason - null means
  // "proceed as offline-mode", never a thrown error, so a misconfigured
  // or temporarily-unreachable auth setup can't crash the bot.
  async _authenticate() {
    if (!this.msClientId || !this.msRefreshToken) return null;

    try {
      const { refreshMicrosoftToken, completeChain } = require("../auth/microsoftAuth");

      const { accessToken: msAccessToken, refreshToken: newRefreshToken } = await refreshMicrosoftToken(
        this.msClientId,
        this.msRefreshToken
      );
      this.msRefreshToken = newRefreshToken; // Microsoft may issue a rotated token

      const { minecraftAccessToken, profile } = await completeChain(msAccessToken);

      logger.info(`Authenticated as ${profile.name} (Microsoft account)`);
      return { accessToken: minecraftAccessToken, uuid: profile.id, username: profile.name };
    } catch (err) {
      logger.error("Microsoft authentication failed, falling back to offline-mode identity:", err.message);
      return null;
    }
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
