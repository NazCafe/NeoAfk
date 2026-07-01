const BufferWriter = require("./writer");
const VarInt = require("./varint");

class Packet {
  constructor(id) {
    this.id = id;
    this.writer = new BufferWriter();
  }

  writeVarInt(value) {
    this.writer.writeBytes(VarInt.encode(value));
  }

  writeByte(value) {
    this.writer.writeByte(value);
  }

  writeInt(value) {
    this.writer.writeInt(value);
  }

  writeBoolean(value) {
    this.writer.writeBoolean(value);
  }

  writeString(text) {
    this.writer.writeString(text);
  }

  writeBuffer(buffer) {
    this.writer.writeBytes(buffer);
  }

  buildPayload() {
    const payload = new BufferWriter();

    payload.writeBytes(VarInt.encode(this.id));
    payload.writeBytes(this.writer.toBuffer());

    return payload.toBuffer();
  }

  build() {
    const payloadBuffer = this.buildPayload();

    const final = new BufferWriter();
    final.writeBytes(VarInt.encode(payloadBuffer.length));
    final.writeBytes(payloadBuffer);

    return final.toBuffer();
  }
}

module.exports = Packet;
