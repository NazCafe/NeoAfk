const Packet = require("../net/packet");
const FinishConfiguration = require("./finishConfiguration");
const KnownPacks = require("./knowPacks");
const logger = require("../utils/logger");

// Clientbound Configuration packet IDs (stable since ~1.20.5, unaffected
// by the protocol 775 Play-state ID shifts - the dev's original code
// already had ClientInformation=0x00, FinishConfiguration(serverbound)=0x03
// and KnownPacks(serverbound)=0x07 correct, which matches this table).
const CB = {
  COOKIE_REQUEST: 0x00,
  PLUGIN_MESSAGE: 0x01,
  DISCONNECT: 0x02,
  FINISH_CONFIGURATION: 0x03,
  KEEP_ALIVE: 0x04,
  PING: 0x05,
  RESET_CHAT: 0x06,
  REGISTRY_DATA: 0x07,
  REMOVE_RESOURCE_PACK: 0x08,
  ADD_RESOURCE_PACK: 0x09,
  STORE_COOKIE: 0x0a,
  TRANSFER: 0x0b,
  FEATURE_FLAGS: 0x0c,
  UPDATE_TAGS: 0x0d,
  KNOWN_PACKS: 0x0e,
  CUSTOM_REPORT_DETAILS: 0x0f,
  SERVER_LINKS: 0x10,
  CLEAR_DIALOG: 0x11,
  SHOW_DIALOG: 0x12,
  CODE_OF_CONDUCT: 0x13,
};

const SB = {
  KEEP_ALIVE: 0x04,
  PONG: 0x05,
};

class ConfigurationHandler {
  handle(packetId, reader, socket) {
    switch (packetId) {
      case CB.DISCONNECT: {
        // Reason is an NBT Text Component here, not a plain JSON string -
        // we don't attempt to decode it, just note that we got kicked.
        logger.warn("[Configuration] Disconnected by server.");
        socket.close();
        return;
      }

      case CB.FINISH_CONFIGURATION: {
        logger.info("[Configuration] Finished - acknowledging and entering Play state.");
        socket.sendPacket(new FinishConfiguration());
        socket.state = "PLAY";
        return;
      }

      case CB.KEEP_ALIVE: {
        const id = reader.readLong(); // raw 8 bytes, echoed back unmodified
        const reply = new Packet(SB.KEEP_ALIVE);
        reply.writeBuffer(id);
        socket.sendPacket(reply);
        return;
      }

      case CB.KNOWN_PACKS: {
        // We don't ship any data packs of our own - ask the server to
        // send everything by replying with an empty Known Packs list.
        socket.sendPacket(new KnownPacks());
        return;
      }

      case CB.REGISTRY_DATA: {
        logger.info(`[Configuration] Registry Data received (${reader.remaining()} bytes) - still syncing...`);
        return;
      }

      case CB.PING: {
        // CRITICAL: this is how NeoForge (and Forge before it) detects
        // that a connecting client has no mod-loader support and should
        // be treated as vanilla, skipping its custom handshake entirely.
        // A real client always answers Ping with Pong even though it
        // otherwise never understands "neoforge:register" etc. Silently
        // ignoring this (as this code used to) leaves the server waiting
        // for a handshake reply that will never come, until it times out
        // and disconnects - which is exactly the hang we were seeing.
        const id = reader.readInt();
        const pong = new Packet(SB.PONG);
        pong.writeInt(id);
        socket.sendPacket(pong);
        return;
      }

      case CB.COOKIE_REQUEST:
      case CB.RESET_CHAT:
      case CB.REMOVE_RESOURCE_PACK:
      case CB.ADD_RESOURCE_PACK:
      case CB.STORE_COOKIE:
      case CB.FEATURE_FLAGS:
      case CB.UPDATE_TAGS:
      case CB.CUSTOM_REPORT_DETAILS:
      case CB.SERVER_LINKS:
      case CB.CLEAR_DIALOG:
      case CB.SHOW_DIALOG:
      case CB.CODE_OF_CONDUCT:
      case CB.TRANSFER:
        // Not needed just to stay connected and AFK - safe to ignore.
        // (We already consumed exactly this packet's bytes via the outer
        // frame length, so skipping the body here is safe.)
        return;

      case CB.PLUGIN_MESSAGE: {
        // DIAGNOSTIC: modded (Forge/NeoForge) servers run an additional
        // handshake over a custom plugin channel during Configuration,
        // and will time out a client that doesn't respond to it correctly.
        // We can't safely fake that handshake without knowing exactly what
        // the server is sending, so for now we just surface the channel
        // name at "info" level (no NEOAFK_LOG_LEVEL needed) so we can see
        // what's actually being requested.
        let channel = "<unreadable>";
        try {
          channel = reader.readString();
        } catch (err) {
          // ignore - just means we couldn't decode it as a plain string
        }
        logger.info(`[Configuration] Plugin Message on channel "${channel}"`);
        return;
      }

      default:
        logger.debug("[Configuration] Unhandled packet id:", packetId);
    }
  }
}

module.exports = ConfigurationHandler;
