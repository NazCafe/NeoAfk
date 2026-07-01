Packet Flow

This document describes the complete packet flow of a NeoAfk connection.

It follows the bot from the moment a TCP connection is established until it successfully joins the Minecraft world.

Understanding this flow makes debugging much easier and helps contributors understand where each packet belongs.

---

Overview

A successful connection follows this sequence:

TCP Connect
      │
      ▼
Handshake
      │
      ▼
Login Start
      │
      ▼
Compression (optional)
      │
      ▼
Login Success
      │
      ▼
Login Acknowledged
      │
      ▼
Configuration
      │
      ▼
Registry Synchronization
      │
      ▼
Finish Configuration
      │
      ▼
Play State
      │
      ▼
Gameplay Packets

---

Step 1 — TCP Connection

NeoAfk creates a TCP socket to the Minecraft server.

Responsibilities:

- Resolve hostname
- Connect to server
- Wait for socket connection
- Prepare packet reader/writer

At this stage, no Minecraft packets have been exchanged.

---

Step 2 — Handshake

The client immediately sends a Handshake packet.

The packet contains:

- Protocol version
- Server address
- Server port
- Next protocol state

Purpose:

Tell the server what protocol the client intends to use.

---

Step 3 — Login Start

After the Handshake, NeoAfk sends the Login Start packet.

Information includes:

- Username
- UUID (when applicable)

The server now begins authentication.

---

Step 4 — Compression

Some servers enable packet compression.

If compression is negotiated:

1. Server sends compression threshold.
2. NeoAfk stores the threshold.
3. All future packets are encoded and decoded accordingly.

Compression remains active for the rest of the connection.

---

Step 5 — Login Success

The server accepts the client.

NeoAfk receives:

- Player UUID
- Username
- Login Success

The client then acknowledges the login and prepares to enter the Configuration state.

---

Step 6 — Configuration

The server now exchanges configuration data.

Typical packets include:

- Plugin Messages
- Registry Data
- Feature Flags
- Known Packs (depending on version)

NeoAfk processes each packet according to the active protocol version.

---

Step 7 — Registry Synchronization

Modern Minecraft sends registry information before gameplay.

NeoAfk waits until registry synchronization is complete before proceeding.

Examples include:

- Biomes
- Dimensions
- Damage Types
- Chat Types
- Other game registries

Only after all required registry packets have been processed can the client continue.

---

Step 8 — Client Information

NeoAfk sends its client settings.

Examples:

- Language
- View Distance
- Chat Settings
- Main Hand
- Skin Parts
- Text Filtering
- Server Listing Preference

These settings allow the server to configure the session.

---

Step 9 — Finish Configuration

NeoAfk sends the Finish Configuration packet.

The server validates the configuration exchange.

If successful, the protocol transitions into the Play state.

---

Step 10 — Play State

The bot has now joined the world.

NeoAfk begins handling gameplay packets.

Current responsibilities include:

- KeepAlive
- Teleport Confirm
- Player Loaded
- General packet processing

Future releases will add additional gameplay features.

---

Incoming Packet Flow

Every packet received by NeoAfk follows the same path.

TCP Socket
      │
      ▼
Receive Bytes
      │
      ▼
Packet Length
      │
      ▼
Compression Check
      │
      ▼
Packet ID
      │
      ▼
Current Protocol State
      │
      ▼
Packet Handler
      │
      ▼
Bot Logic

Each protocol state determines how packet IDs are interpreted.

---

Outgoing Packet Flow

Outgoing packets follow the reverse process.

Bot Logic
      │
      ▼
Packet Builder
      │
      ▼
Packet ID
      │
      ▼
Compression (if enabled)
      │
      ▼
Packet Length
      │
      ▼
TCP Socket

---

Packet Handler Responsibilities

NeoAfk separates packet handling by protocol state.

Examples:

Login

- Login Success
- Compression

Configuration

- Registry Data
- Plugin Messages
- Client Information
- Finish Configuration

Play

- KeepAlive
- Teleport Confirm
- Player Loaded

This separation keeps the implementation modular and easier to maintain.

---

Error Handling

If an unexpected packet is received:

1. Log the packet.
2. Identify the current protocol state.
3. Determine whether the packet can be ignored.
4. Disconnect only if protocol correctness requires it.

Unexpected packets should not crash the application.

---

Debugging Tips

If the bot disconnects:

- Verify the protocol version.
- Check whether compression was enabled.
- Confirm registry synchronization completed.
- Ensure Finish Configuration was sent at the correct time.
- Review server logs if available.

Most connection issues occur during the transition between Login, Configuration, and Play.

---

Future Packet Flow

As NeoAfk evolves, additional packet flows will be introduced for:

- Automatic reconnect
- Anti-AFK actions
- Runtime statistics
- Plugin messaging
- Future Minecraft protocol revisions

The packet flow described in this document will be updated as those features are implemented.

---

Summary

The packet flow is the backbone of NeoAfk.

Every successful connection follows a predictable sequence of protocol states, packet exchanges, and acknowledgements. By keeping each stage isolated and well documented, NeoAfk remains easier to debug, extend, and maintain as Minecraft evolves.