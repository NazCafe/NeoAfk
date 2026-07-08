Changelog

All notable changes to NeoAfk will be documented in this file.

The format is based on Keep a Changelog and follows Semantic Versioning (SemVer) whenever possible.

---

[Unreleased]

Added

- Full online-mode (Microsoft/Xbox account) support. The same bot now
  joins both offline-mode and online-mode servers:
  - Microsoft device-code login, Xbox Live / XSTS / Minecraft Services
    auth chain, and a one-time local login script for obtaining a
    reusable refresh token (`src/auth/microsoftAuth.js`,
    `scripts/microsoft-login.js`).
  - Silent token refresh on every connect/reconnect attempt, with
    automatic fallback to the offline-mode identity if authentication
    isn't configured or fails, rather than crashing.
  - Full Encryption Request/Response handshake: RSA (PKCS#1 v1.5)
    encryption of the shared secret and verify token, Minecraft's
    non-standard signed-BigInteger server-hash algorithm (verified
    against Mojang's published test vectors), the Mojang session-join
    call, and AES-128/CFB8 encryption of the entire connection from that
    point on (`src/net/crypto.js`, `src/net/socket.js`,
    `src/auth/sessionJoin.js`).
  - Verified end-to-end against a fake online-mode server performing a
    real RSA handshake and real AES/CFB8 encryption through Configuration
    and Play, including compression interacting correctly with
    encryption.
  - Credentials are never logged; see
    `docs/getting-started/microsoft-auth.md` for setup and safety notes.

Planned

- Human-like Anti-AFK module (head rotation, movement, configurable behaviour).
- Docker / Docker Compose support.
- Exponential reconnect backoff.
- File and colored console logging.

---

[0.2.0] - Reliability & Deployment

This release fixes every remaining login/connection defect found during a full
protocol audit, adds automatic server address resolution, and makes Render.com
deployment actually work end-to-end.

Added

- DNS SRV record resolution (`_minecraft._tcp.<host>`), so a changed Aternos
  IP/port after a server restart is picked up automatically on the next
  reconnect attempt, with no manual reconfiguration required.
- Render.com Web Service deployment: built-in HTTP health endpoint bound to
  `process.env.PORT`, environment-variable configuration (`MC_HOST`,
  `MC_PORT`, `MC_USERNAME`, `RECONNECT_DELAY_MS`, `NEOAFK_LOG_LEVEL`), and a
  `render.yaml` blueprint.
- Diagnostic logging for Configuration-state Plugin Messages and Registry
  Data, to make future protocol issues easier to trace.

Fixed

- Configuration-state Ping was never answered with Pong. This is how
  NeoForge (and Forge before it) detects a vanilla-compatible client and
  skips its mod handshake — without a reply, the server would wait for a
  handshake response that never came and eventually disconnect the bot
  before it ever reached Play. This was the root cause of the bot failing
  to join modded servers.
- Handshake packet wrote the server address as raw bytes with no length
  prefix, corrupting every packet sent after it.
- Login Success was matched against the wrong packet ID (was checking the
  ID used by Set Compression instead).
- Incoming TCP data was assumed to arrive as complete packets; it's now
  correctly buffered and reassembled, since a single read can contain a
  partial packet, multiple packets, or both.
- Zlib compression/decompression was not implemented at all; any server
  with compression enabled (the default) would be unreadable past Login.
- `compressionThreshold` was never initialized in the socket constructor.
- `render.yaml` specified an unsupported `worker` service type; Render's
  free tier only supports `web` services.

---

[0.1.0] - Pre-Alpha

First successful playable connection.

This release marks the first time NeoAfk successfully completed the entire modern Minecraft login sequence and entered the Play state.

Added

Networking

- TCP socket communication.
- Packet reader.
- Packet writer.
- VarInt encoder/decoder.
- UUID utilities.
- Compression support.

Login Protocol

- Handshake packet.
- Login Start packet.
- Login Success handling.
- Login Acknowledgement.
- Compression negotiation.

Configuration State

- Configuration state handler.
- Client Information packet.
- Registry synchronization.
- Plugin Message handling.
- Finish Configuration acknowledgement.

Play State

- Play state transition.
- KeepAlive response handling.
- Teleport Confirm handling.
- Player Loaded acknowledgement.
- Initial packet processing.

Architecture

- Modular packet system.
- Protocol state separation.
- Packet abstraction layer.
- Reader/Writer utilities.

Documentation

- README.md
- ROADMAP.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- CHANGELOG.md

Changed

- Refactored packet handling into modular components.
- Improved logging during connection sequence.
- Improved Configuration state processing.

Fixed

- Login sequence synchronization.
- Compression handling issues.
- Configuration transition problems.
- Registry synchronization reliability.
- Successful transition into Play state.

---

Future Releases

0.3.0

Planned:

- Human-like Anti-AFK module.
- Runtime statistics.
- File and colored logging.
- Docker support.

---

0.4.0

Planned:

- Discord integration.
- Plugin architecture.
- Extended packet handling.
- Performance improvements.

---

1.0.0

First stable public release.

Goals:

- Stable long-running operation.
- Complete documentation.
- Cloud deployment support.
- Configurable AFK behavior.
- Comprehensive testing.
- Production-ready architecture.

---

Versioning Policy

NeoAfk follows Semantic Versioning:

- MAJOR version for incompatible changes.
- MINOR version for new backward-compatible features.
- PATCH version for backward-compatible bug fixes.

Example:

1.2.3

1 = Major

2 = Minor

3 = Patch

---

Thank you to everyone who contributes to NeoAfk and helps improve the project.