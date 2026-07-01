class PacketRegistry {
  constructor() {
    this.handlers = new Map();
  }

  register(id, handler) {
    this.handlers.set(id, handler);
  }

  handle(id, reader, client) {
    const handler = this.handlers.get(id);

    if (!handler) {
      console.log(`Unknown packet: ${id}`);
      return;
    }

    handler(reader, client);
  }
}

module.exports = PacketRegistry;