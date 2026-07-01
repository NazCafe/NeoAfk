const Packet = require("../net/packet");

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
