const Packet = require("../net/packet");
const VarInt = require("../net/varint");

// Serverbound Encryption Response (Login, id 0x01). Both byte arrays are
// always 128 bytes for a standard 1024-bit server key, due to PKCS#1 v1.5
// padding.
class EncryptionResponse {
  constructor(encryptedSharedSecret, encryptedVerifyToken) {
    this.packet = new Packet(0x01);
    const w = this.packet.writer;

    w.writeBytes(VarInt.encode(encryptedSharedSecret.length));
    w.writeBytes(encryptedSharedSecret);
    w.writeBytes(VarInt.encode(encryptedVerifyToken.length));
    w.writeBytes(encryptedVerifyToken);
  }

  buildPayload() {
    return this.packet.buildPayload();
  }

  build() {
    return this.packet.build();
  }
}

module.exports = EncryptionResponse;
