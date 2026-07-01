class UUID {
  static write(writer) {
    // Offline-mode UUID: all zeros (cracked/offline servers only).
    for (let i = 0; i < 16; i++) {
      writer.writeByte(0);
    }
  }
}

module.exports = UUID;
