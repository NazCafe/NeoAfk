const Packet = require("../net/packet");

class AcceptTeleportation {
  constructor(teleportId) {
    this.packet = new Packet(0x00);
    this.packet.writeVarInt(teleportId);
  }

  buildPayload() {
    return this.packet.buildPayload();
  }

  build() {
    return this.packet.build();
  }
}

module.exports = AcceptTeleportation;
