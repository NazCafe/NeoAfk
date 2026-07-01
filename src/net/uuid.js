class UUID {
  static write(writer) {
    // Offline/cracked UUID = all zeros for now
    for (let i = 0; i < 16; i++) {
      writer.writeByte(0);
    }
  }
}

module.exports = UUID;