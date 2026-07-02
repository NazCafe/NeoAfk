const Packet = require("../net/packet");

class ClientInformation {
  constructor(packetId = 0x00) {
    this.packet = new Packet(packetId);
    const w = this.packet.writer;

    w.writeString("en_us");  // locale
    w.writeByte(10);         // view distance
    w.writeVarInt(0);        // chat mode (0 = enabled)
    w.writeBoolean(true);    // chat colors
    w.writeByte(0x7f);       // displayed skin parts (all)
    w.writeVarInt(1);        // main hand (1 = right)
    w.writeBoolean(false);   // text filtering
    w.writeBoolean(true);    // allow server listings
    w.writeVarInt(0);        // particle status
  }

  buildPayload() {
    return this.packet.buildPayload();
  }

  build() {
    return this.packet.build();
  }
}

module.exports = ClientInformation;
