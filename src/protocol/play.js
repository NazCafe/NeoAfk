const Packet = require("../net/packet");
const AcceptTeleportation = require("./acceptTeleportation");
const PlayerLoaded = require("./playerLoaded");
const logger = require("../utils/logger");

// Clientbound packet IDs for the Play state.
const CB = {
  DISCONNECT: 0x20,
  KEEP_ALIVE: 0x2c,
  LOGIN: 0x31,
  PING: 0x3b,
  SYNCHRONIZE_PLAYER_POSITION: 0x48,
};

const SB = {
  KEEP_ALIVE: 0x1c,
  PONG: 0x2c,
};

class PlayHandler {
  constructor() {
    this.loadedSent = false;
  }

  handle(packetId, reader, socket) {
    switch (packetId) {
      case CB.LOGIN: {
        logger.info("[Play] Joined the world — bot is alive!");
        socket.emit("alive");

        if (!this.loadedSent) {
          this.loadedSent = true;
          socket.sendPacket(new PlayerLoaded());
        }
        return;
      }

      case CB.KEEP_ALIVE: {
        const id = reader.readLong();
        const reply = new Packet(SB.KEEP_ALIVE);
        reply.writeBuffer(id);
        socket.sendPacket(reply);
        return;
      }

      case CB.SYNCHRONIZE_PLAYER_POSITION: {
        try {
          const teleportId = reader.readVarInt();
          socket.sendPacket(new AcceptTeleportation(teleportId));
        } catch (err) {
          logger.warn("[Play] Couldn't parse teleport confirmation:", err.message);
        }
        return;
      }

      case CB.PING: {
        const id = reader.readInt();
        const pong = new Packet(SB.PONG);
        pong.writeInt(id);
        socket.sendPacket(pong);
        return;
      }

      case CB.DISCONNECT: {
        logger.warn("[Play] Disconnected from the server.");
        socket.close();
        return;
      }

      default:
        return;
    }
  }
}

module.exports = PlayHandler;
