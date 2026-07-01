const Packet = require("../net/packet");

// Serverbound Login Acknowledged (Login, id 0x03). Switches the connection
// to the Configuration state.
class LoginAcknowledged {
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

module.exports = LoginAcknowledged;
