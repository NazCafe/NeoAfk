# 🛣️ NeoAfk Roadmap

> A lightweight, modern Minecraft AFK bot built from scratch in Node.js.
>
> **Goal:** Create a clean, reliable, production-ready AFK bot that supports modern Minecraft versions without relying on existing bot frameworks.

---

# 📍 Current Status

**Version:** Alpha (0.2.0)

**Progress:** ~95%

Current achievement:

- ✅ Successfully logs into a Minecraft server
- ✅ Completes the modern Configuration protocol
- ✅ Passes the NeoForge vanilla-client handshake check (Ping/Pong)
- ✅ Enters the Play state
- ✅ Joins the world successfully
- ✅ Handles KeepAlive packets
- ✅ Handles Teleport Confirm packets
- ✅ Automatically reconnects on disconnect
- ✅ Resolves dynamic host/port via DNS SRV records
- ✅ Deploys to Render.com with a working health endpoint
- ✅ Passes smoke tests

---

# Phase 1 — Project Setup ✅

## Goal

Build the project's foundation.

### Completed

- Project structure
- Node.js setup
- TCP socket connection
- Binary packet reader/writer
- VarInt implementation
- UUID utilities
- Packet abstraction
- Compression support

Status:

✅ Complete

---

# Phase 2 — Login Protocol ✅

## Goal

Successfully authenticate with a Minecraft server.

### Completed

- Handshake packet
- Login Start
- Login Success
- Compression handling
- Login Acknowledgement

Status:

✅ Complete

---

# Phase 3 — Configuration Protocol ✅

Modern Minecraft introduced the Configuration State.

### Completed

- Configuration packet handling
- Plugin Messages
- Registry synchronization
- Client Information
- Finish Configuration
- Configuration acknowledgement

Status:

✅ Complete

---

# Phase 4 — Play State ✅

Goal:

Reach the playable world.

### Completed

- Play transition
- KeepAlive responses
- Teleport confirmation
- Player Loaded acknowledgement
- Initial packet handling

Result:

✅ Bot successfully joins the server.

---

# Phase 5 — Stability 🚧

## Current Focus

Improve reliability.

### Completed

- Auto reconnect
- Graceful shutdown
- DNS SRV auto-resolution (fresh lookup on every reconnect)

### Planned

- Exponential reconnect delay
- Socket recovery
- Crash protection
- Better error handling

Status:

🚧 Mostly Complete

---

# Phase 6 — Anti-AFK

## Goal

Remain online naturally.

### Planned

- Random head rotation
- Random pitch movement
- Optional jumping
- Sneak toggle
- Walking patterns
- Human-like timing
- Configurable behaviour

Status:

⬜ Planned

---

# Phase 7 — Configuration

## Goal

Make the bot configurable.

### Completed

- .env support
- Environment overrides
- Username
- Host
- Port

### Planned

- config.json alternative
- Configurable protocol version
- Logging settings

Status:

🚧 Mostly Complete

---

# Phase 8 — Logging

## Goal

Professional logging.

### Completed

- INFO
- WARN
- ERROR
- DEBUG (leveled logger, `NEOAFK_LOG_LEVEL`)

### Planned

- File logging
- Colored console output
- Packet debugging

Status:

🚧 In Progress

---

# Phase 9 — Deployment

## Goal

Run 24/7.

### Completed

- Render deployment
- Health endpoint
- Environment configuration

### Planned

- Docker support
- Docker Compose
- Railway deployment

Status:

🚧 In Progress

---

# Phase 10 — Monitoring

## Planned

- Runtime statistics
- Memory usage
- Uptime
- Packet counters
- Connection state
- Health API
- Status endpoint

Status:

⬜ Planned

---

# Phase 11 — Future Features

Possible additions.

- Multiple bots
- Follow player
- Chat commands
- Discord integration
- Telegram notifications
- Inventory management
- Pathfinding
- Automatic reconnect to multiple servers
- Plugin compatibility
- Mod compatibility
- Authentication improvements

---

# Design Goals

NeoAfk aims to be:

- Lightweight
- Easy to understand
- Framework-independent
- Modular
- Stable
- Production-ready
- Beginner friendly
- Well documented

---

# Development Philosophy

Instead of relying on existing Minecraft bot libraries, NeoAfk focuses on understanding and implementing the Minecraft protocol directly.

Every protocol state is implemented step-by-step with an emphasis on clean architecture, maintainability, and educational value.

---

# Progress

| Phase | Status |
|--------|--------|
| Foundation | ✅ Complete |
| Login | ✅ Complete |
| Configuration | ✅ Complete |
| Play State | ✅ Complete |
| Stability | 🚧 Mostly Complete |
| Anti-AFK | ⬜ Planned |
| Configuration System | 🚧 Mostly Complete |
| Logging | 🚧 In Progress |
| Deployment | 🚧 In Progress |
| Monitoring | ⬜ Planned |
| Future Features | ⬜ Planned |

---

# License

License will be decided before the first public release.

---

# Contributing

Contributions are planned after the project reaches its first stable release.

---

**NeoAfk** is an educational project dedicated to learning the Minecraft protocol while building a clean, reliable AFK bot from the ground up.