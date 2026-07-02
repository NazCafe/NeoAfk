const Packet = require("../net/packet");

// Protocol version for Minecraft 26.1.
const PROTOCOL_VERSION = 775;

class HandshakePacket {
  constructor(host, port, nextState = 2) {
    this.packet = new Packet(0x00);

    this.packet.writeVarInt(PROTOCOL_VERSION);
    this.packet.writeString(host);
    this.packet.writer.writeUShort(port);
    this.packet.writeVarInt(nextState);
  }

  buildPayload() {
    return this.packet.buildPayload();
  }

  build() {
    return this.packet.build();
  }
}

module.exports = HandshakePacket;
