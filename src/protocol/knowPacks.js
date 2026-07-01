const Packet = require("../net/packet");

class KnownPacks {
  constructor() {
    this.packet = new Packet(0x07);
    this.packet.writeVarInt(0); // no known packs
  }

  buildPayload() {
    return this.packet.buildPayload();
  }

  build() {
    return this.packet.build();
  }
}

module.exports = KnownPacks;
