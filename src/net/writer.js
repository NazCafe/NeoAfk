const VarInt = require("./varint");

class BufferWriter {
  constructor() {
    this.bytes = [];
  }

  writeByte(value) {
    this.bytes.push(value & 0xFF);
  }

  writeBoolean(value) {
    this.writeByte(value ? 1 : 0);
  }

  // Signed 32-bit big-endian Int, used by e.g. Ping/Pong.
  writeInt(value) {
    const buf = Buffer.alloc(4);
    buf.writeInt32BE(value, 0);
    this.writeBytes(buf);
  }

  writeVarInt(value) {
    this.writeBytes(VarInt.encode(value));
  }

  writeString(text) {
    const buffer = Buffer.from(text, "utf8");
    this.writeVarInt(buffer.length);
    this.writeBytes(buffer);
  }

  writeBytes(buffer) {
    for (const byte of buffer) {
      this.bytes.push(byte);
    }
  }

  toBuffer() {
    return Buffer.from(this.bytes);
  }
}

module.exports = BufferWriter;