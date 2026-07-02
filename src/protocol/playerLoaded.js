const Packet = require("../net/packet");

class PlayerLoaded {
  constructor() {
    this.packet = new Packet(0x2c);
  }

  buildPayload() {
    return this.packet.buildPayload();
  }

  build() {
    return this.packet.build();
  }
}

module.exports = PlayerLoaded;
