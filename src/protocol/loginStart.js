const Packet = require("../net/packet");
const Types = require("../net/types");
const UUID = require("../net/uuid");

class LoginStart {
  constructor(username, uuid) {
    this.username = username;

    this.packet = new Packet(0x00);
    Types.writeString(this.packet.writer, username);
    UUID.write(this.packet.writer, uuid);
  }

  buildPayload() {
    return this.packet.buildPayload();
  }

  build() {
    return this.packet.build();
  }
}

module.exports = LoginStart;
