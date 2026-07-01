class VarInt {
  static encode(value) {
    if (value < 0) {
      throw new Error("Negative VarInts are not supported yet.");
    }

    const bytes = [];

    do {
      let temp = value & 0x7F;
      value >>>= 7;

      if (value !== 0) {
        temp |= 0x80;
      }

      bytes.push(temp);
    } while (value !== 0);

    return Buffer.from(bytes);
  }

  // Decodes a VarInt from a BufferReader. Throws if the buffer runs out,
  // since the caller is expected to already hold a complete packet.
  static decode(reader) {
    let numRead = 0;
    let result = 0;
    let read;

    do {
      read = reader.readByte();

      const value = read & 0x7F;
      result |= value << (7 * numRead);

      numRead++;

      if (numRead > 5) {
        throw new Error("VarInt is too big");
      }
    } while ((read & 0x80) !== 0);

    return result;
  }

  // Attempts to decode a VarInt from a raw Buffer at `offset` without throwing
  // if there is not enough data yet. Returns null when the buffer does not
  // (yet) contain a complete VarInt — safe to use against a TCP stream where
  // reads can be split at any byte boundary.
  static tryDecode(buffer, offset) {
    let numRead = 0;
    let result = 0;
    let pos = offset;

    while (true) {
      if (pos >= buffer.length) {
        return null;
      }

      const read = buffer[pos];
      pos++;

      const value = read & 0x7F;
      result |= value << (7 * numRead);

      numRead++;

      if (numRead > 5) {
        throw new Error("VarInt is too big");
      }

      if ((read & 0x80) === 0) break;
    }

    return { value: result, length: pos - offset };
  }
}

module.exports = VarInt;
