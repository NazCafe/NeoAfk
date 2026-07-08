class BufferReader {
  constructor(buffer) {
    this.buffer = buffer;
    this.offset = 0;
  }

  remaining() {
    return this.buffer.length - this.offset;
  }

  readByte() {
    if (this.offset >= this.buffer.length) return 0;
    return this.buffer[this.offset++];
  }

  readBytes(length) {
    const bytes = this.buffer.slice(this.offset, this.offset + length);
    this.offset += length;
    return bytes;
  }

  readBoolean() {
    return this.readByte() !== 0;
  }

  readVarInt() {
    const VarInt = require("./varint");
    return VarInt.decode(this);
  }

  readString() {
    const length = this.readVarInt();

    if (length < 0 || length > 32767) {
      throw new Error("Invalid string length: " + length);
    }

    const bytes = this.readBytes(length);
    return bytes.toString("utf8");
  }

  readUUID() {
    const bytes = this.readBytes(16);
    return bytes.toString("hex");
  }

  readLong() {
    return this.readBytes(8);
  }

  readInt() {
    const bytes = this.readBytes(4);
    return bytes.readInt32BE(0);
  }

  // A VarInt length prefix followed by that many raw bytes - used for the
  // Public Key and Verify Token fields in Encryption Request.
  readByteArray() {
    const length = this.readVarInt();
    return this.readBytes(length);
  }
}

module.exports = BufferReader;
