const Packet = require("../net/packet");
const FinishConfiguration = require("./finishConfiguration");
const KnownPacks = require("./knowPacks");
const logger = require("../utils/logger");

// Clientbound packet IDs for the Configuration state.
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
        logger.warn("[Configuration] Disconnected by server.");
        socket.close();
        return;
      }

      case CB.FINISH_CONFIGURATION: {
        logger.info("[Configuration] Finished — acknowledging and entering Play state.");
        socket.sendPacket(new FinishConfiguration());
        socket.state = "PLAY";
        return;
      }

      case CB.KEEP_ALIVE: {
        const id = reader.readLong();
        const reply = new Packet(SB.KEEP_ALIVE);
        reply.writeBuffer(id);
        socket.sendPacket(reply);
        return;
      }

      case CB.KNOWN_PACKS: {
        socket.sendPacket(new KnownPacks());
        return;
      }

      case CB.REGISTRY_DATA: {
        logger.info(`[Configuration] Registry Data received (${reader.remaining()} bytes) — syncing...`);
        return;
      }

      case CB.PING: {
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
      case CB.PLUGIN_MESSAGE: {
        let channel = "<unreadable>";
        try {
          channel = reader.readString();
        } catch (_) {}
        logger.info(`[Configuration] Plugin Message on channel "${channel}"`);
        return;
      }

      default:
        logger.debug("[Configuration] Unhandled packet id:", packetId);
    }
  }
}

module.exports = ConfigurationHandler;
