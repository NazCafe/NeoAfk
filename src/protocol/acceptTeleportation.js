const Packet = require("../net/packet");

// Serverbound Confirm Teleportation (Play, id 0x00 in protocol 775).
// Must be sent in response to a clientbound Synchronize Player Position
// packet, echoing back its Teleport ID.
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
