const Packet = require("../net/packet");

// Serverbound Player Loaded (Play, id 0x2c in protocol 775 - this packet
// was inserted earlier in the registration order than in older protocol
// versions, which is why it's 0x2c here and not 0x2b). Has no fields.
// Tells the server we've finished "Loading terrain...", letting it finish
// the spawn sequence immediately instead of waiting up to 60 ticks.
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
