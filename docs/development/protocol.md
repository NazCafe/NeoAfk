Minecraft Protocol

This document describes how NeoAfk implements the Minecraft client protocol.

Unlike many Minecraft bots that rely on third-party libraries, NeoAfk communicates directly with the server using raw packets over a TCP socket.

The protocol is implemented as a series of independent states, each responsible for a specific stage of the connection lifecycle.

---

Protocol Overview

A typical connection follows this sequence:

Client
   │
   ▼
TCP Connection
   │
   ▼
Handshake
   │
   ▼
Login
   │
   ▼
Configuration
   │
   ▼
Play
   │
   ▼
Disconnect

Each state has its own packet IDs, rules, and responsibilities.

NeoAfk transitions through these states automatically.

---

State Machine

The protocol is implemented as a finite state machine.

Disconnected
      │
      ▼
Handshake
      │
      ▼
Login
      │
      ▼
Configuration
      │
      ▼
Play
      │
      ▼
Disconnected

Packets are interpreted differently depending on the current state.

For example, packet ID "0x00" may represent different packets in different protocol states.

---

Handshake State

The Handshake is the first packet sent after opening a TCP connection.

Its purpose is to tell the server:

- Which protocol version the client is using.
- Which server the client wants to join.
- Which port is being used.
- Which protocol state should begin next.

NeoAfk sends a Handshake immediately after connecting.

---

Login State

After the Handshake, the client enters the Login state.

Responsibilities include:

- Sending the Login Start packet.
- Receiving Login Success.
- Negotiating packet compression.
- Acknowledging successful login.
- Transitioning into Configuration.

This state verifies that the client is accepted before entering gameplay.

---

Compression

Many modern Minecraft servers enable packet compression after login.

Once compression is enabled:

- Small packets remain uncompressed.
- Large packets are compressed using zlib.
- Both incoming and outgoing packets must follow the negotiated compression threshold.

NeoAfk automatically switches packet processing once compression is enabled.

---

Configuration State

The Configuration state was introduced in modern Minecraft versions to exchange game data before entering the world.

NeoAfk processes Configuration packets such as:

- Plugin Messages
- Registry Data
- Client Information
- Finish Configuration

This stage ensures that the client has the information required to enter the Play state.

---

Registry Synchronization

During Configuration, the server sends registry information describing game content.

Examples include:

- Biomes
- Dimensions
- Damage types
- Chat types
- Other game registries

NeoAfk receives and processes these packets before completing Configuration.

---

Plugin Messages

Servers may send Plugin Messages during Configuration.

These packets are commonly used by:

- Vanilla servers
- NeoForge
- Fabric
- Paper
- Other server software

NeoAfk handles known channels while safely ignoring unsupported ones.

---

Client Information

The client sends its preferences during Configuration.

Examples include:

- Locale
- View distance
- Chat settings
- Main hand
- Skin customization
- Text filtering preferences

These values help the server configure the client session.

---

Finish Configuration

After all required Configuration packets have been exchanged:

NeoAfk sends the Finish Configuration packet.

The server then transitions the connection into the Play state.

---

Play State

The Play state is where gameplay occurs.

Current responsibilities include:

- KeepAlive responses
- Teleport confirmations
- Player Loaded acknowledgement
- General packet handling

Future versions will add:

- Anti-AFK behaviour
- Statistics
- Automatic reconnect
- Event handling

---

Packet Processing

Incoming packets follow this workflow:

TCP Socket

↓

Packet Reader

↓

Compression Handler

↓

Packet Decoder

↓

Current Protocol State

↓

Packet Handler

↓

Bot Logic

Outgoing packets follow the reverse path.

---

Error Handling

NeoAfk validates packet flow before processing.

Unexpected packets should:

- Be logged.
- Avoid crashing the application.
- Preserve the current connection whenever possible.

Unknown packets may be ignored if they are not required for protocol correctness.

---

Future Protocol Support

As NeoAfk evolves, protocol support may expand to include:

- Additional Minecraft versions
- New protocol revisions
- Authentication improvements
- Extended Play-state packets
- Plugin compatibility
- Mod compatibility

The architecture is designed so that new protocol versions can be added with minimal changes to existing code.

---

Design Philosophy

NeoAfk implements the Minecraft protocol for two primary reasons:

1. To provide a lightweight and maintainable AFK bot.
2. To serve as an educational reference for developers interested in understanding how modern Minecraft networking works.

Protocol correctness, readability, and modularity are prioritized throughout the implementation.