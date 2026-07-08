class UUID {
  // Writes a UUID as 16 raw bytes.
  //
  // hexString: a 32-character hex UUID with or without dashes, as returned
  // by the Minecraft profile API (e.g. "11111111222233334444555555555555"
  // or "11111111-2222-3333-4444-555555555555"). If omitted, writes the
  // conventional all-zero UUID used for offline-mode servers, which don't
  // validate this field.
  static write(writer, hexString) {
    if (!hexString) {
      for (let i = 0; i < 16; i++) writer.writeByte(0);
      return;
    }

    const clean = hexString.replace(/-/g, "");
    if (clean.length !== 32 || !/^[0-9a-fA-F]{32}$/.test(clean)) {
      throw new Error(`Invalid UUID: ${hexString}`);
    }

    const bytes = Buffer.from(clean, "hex");
    writer.writeBytes(bytes);
  }
}

module.exports = UUID;
