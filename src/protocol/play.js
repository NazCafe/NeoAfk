const Packet = require("../net/packet");
const AcceptTeleportation = require("./acceptTeleportation");
const PlayerLoaded = require("./playerLoaded");
const logger = require("../utils/logger");

// Clientbound Play packet IDs for protocol 775 (Minecraft 26.1.x).
// NOTE: protocol 775 inserted ~15 new packets into the Play state versus
// older versions, shifting most IDs. These were verified against the
// deobfuscated 26.1.1 server jar - if Aternos updates Minecraft versions
// again these may need to be re-checked the same way.
const CB = {
  DISCONNECT: 0x20,
  KEEP_ALIVE: 0x2c,
  LOGIN: 0x31,
  PING: 0x3b,
  SYNCHRONIZE_PLAYER_POSITION: 0x48,
};

// Serverbound Play packet IDs for protocol 775.
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
        logger.info("[Play] Joined the world - the bot is alive!");
        socket.emit("alive");

        if (!this.loadedSent) {
          this.loadedSent = true;
          socket.sendPacket(new PlayerLoaded());
        }
        return;
      }

      case CB.KEEP_ALIVE: {
        const id = reader.readLong(); // raw 8 bytes, echoed back unmodified
        const reply = new Packet(SB.KEEP_ALIVE);
        reply.writeBuffer(id);
        socket.sendPacket(reply);
        return;
      }

      case CB.SYNCHRONIZE_PLAYER_POSITION: {
        // Teleport ID is always the first field of this packet. We don't
        // need to parse the rest (position/velocity/rotation/flags) since
        // we aren't rendering anything - just confirming the teleport so
        // the server doesn't think we're desynced.
        try {
          const teleportId = reader.readVarInt();
          socket.sendPacket(new AcceptTeleportation(teleportId));
        } catch (err) {
          logger.warn("[Play] Couldn't parse teleport confirmation:", err.message);
        }
        return;
      }

      case CB.PING: {
        // Not used by the vanilla server, but harmless and cheap to
        // support - same pattern as the Configuration-state Ping/Pong.
        const id = reader.readInt();
        const pong = new Packet(SB.PONG);
        pong.writeInt(id);
        socket.sendPacket(pong);
        return;
      }

      case CB.DISCONNECT: {
        // The Reason field is an NBT-encoded Text Component here (not the
        // simple length-prefixed JSON string used during Login), so we
        // don't attempt to decode it - just note that we got kicked.
        logger.warn("[Play] Disconnected from the server.");
        socket.close();
        return;
      }

      default:
        // Everything else (chunks, entities, inventory, scoreboard, etc.)
        // isn't needed just to stay connected and AFK, so it's ignored.
        return;
    }
  }
}

module.exports = PlayHandler;
