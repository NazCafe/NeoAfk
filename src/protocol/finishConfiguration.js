const Packet = require("../net/packet");

// Serverbound Acknowledge Finish Configuration (Configuration, id 0x03).
// Switches the connection to the Play state.
class FinishConfiguration {
  constructor() {
    this.packet = new Packet(0x03);
  }

  buildPayload() {
    return this.packet.buildPayload();
  }

  build() {
    return this.packet.build();
  }
}

module.exports = FinishConfiguration;
