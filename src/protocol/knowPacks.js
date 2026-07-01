const Packet = require("../net/packet");

// Serverbound Known Packs (Configuration, id 0x07). We don't ship any data
// packs of our own, so we reply with an empty list - this is explicitly a
// valid, documented strategy ("a custom client may respond with an empty
// Serverbound Known Packs packet, and require the server to send all
// registry NBT").
class KnownPacks {
  constructor() {
    this.packet = new Packet(0x07);
    this.packet.writeVarInt(0); // number of known packs
  }

  buildPayload() {
    return this.packet.buildPayload();
  }

  build() {
    return this.packet.build();
  }
}

module.exports = KnownPacks;
