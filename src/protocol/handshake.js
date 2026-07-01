const Packet = require("../net/packet");

class HandshakePacket {
  // intent: 1 = Status, 2 = Login, 3 = Transfer
  constructor(host, port, intent = 2) {
    this.packet = new Packet(0x00);

    // Protocol Version. 775 = Minecraft 26.1.x (matches NeoForge 26.1).
    this.packet.writeVarInt(775);

    // Server Address - BUG FIX: this used to be written as raw bytes with
    // no length prefix (packet.writer.writeBytes(Buffer.from(host, "utf8"))),
    // which corrupts the packet for the server to parse since every Minecraft
    // string must be prefixed with its length as a VarInt.
    this.packet.writer.writeString(host);

    // Server Port (Unsigned Short, big-endian).
    this.packet.writer.writeByte((port >> 8) & 0xFF);
    this.packet.writer.writeByte(port & 0xFF);

    // Intent: 2 = Login (what NeoAFK uses).
    this.packet.writeVarInt(intent);
  }

  buildPayload() {
    return this.packet.buildPayload();
  }

  build() {
    return this.packet.build();
  }
}

module.exports = HandshakePacket;
