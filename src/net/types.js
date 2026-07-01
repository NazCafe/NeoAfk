const VarInt = require("./varint");

class Types {
  static writeString(writer, value) {
    const buf = Buffer.from(value, "utf8");
    writer.writeBytes(VarInt.encode(buf.length));
    writer.writeBytes(buf);
  }
}

module.exports = Types;