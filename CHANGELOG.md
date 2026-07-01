Changelog

All notable changes to NeoAfk will be documented in this file.

The format is based on Keep a Changelog and follows Semantic Versioning (SemVer) whenever possible.

---

[Unreleased]

Added

- Planning for automatic reconnect system.
- Planning for configurable Anti-AFK module.
- Planning for deployment documentation.
- Initial project documentation.
- Repository structure improvements.

Changed

- Ongoing code cleanup and modularization.
- Internal architecture improvements.

Fixed

- General protocol stability improvements.

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

0.2.0

Planned:

- Automatic reconnect.
- Anti-AFK module.
- Runtime statistics.
- Better logging.

---

0.3.0

Planned:

- Configuration system.
- Environment variables.
- Docker support.
- Render deployment.
- Health endpoint.

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