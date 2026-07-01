Development Guide

Welcome to the NeoAfk development guide.

This document explains how NeoAfk is organized, how to work on the project, and the conventions contributors should follow when making changes.

If you're planning to contribute code, start here after reading the README and Architecture documentation.

---

Development Philosophy

NeoAfk is built around four core principles:

- Simplicity
- Modularity
- Reliability
- Readability

Every change should improve at least one of these without making another significantly worse.

The project values understandable code over clever shortcuts.

---

Project Structure

NeoAfk/
│
├── src/
│   ├── connection/
│   ├── protocol/
│   ├── handlers/
│   ├── play/
│   ├── net/
│   ├── utils/
│   └── test/
│
├── docs/
│
├── README.md
├── ROADMAP.md
├── CHANGELOG.md
└── package.json

Each directory has a single responsibility.

---

Folder Responsibilities

connection/

Responsible for:

- Opening TCP connections
- Closing sockets
- Reconnect logic (future)
- Connection lifecycle

No Minecraft packet logic should exist here.

---

protocol/

Contains protocol-specific code.

Examples:

- Packet definitions
- State transitions
- Protocol constants
- Version-specific behavior

Protocol logic should remain independent of gameplay logic.

---

handlers/

Processes packets received from the server.

Examples:

- Login Success
- Compression
- Registry Data
- KeepAlive
- Teleport Confirm

Each handler should focus on one packet or one protocol state.

---

play/

Contains gameplay-related features.

Examples:

- Anti-AFK
- Movement
- Future chat handling
- Future commands

The Play module should never contain Login or Configuration code.

---

net/

Responsible for low-level networking.

Includes:

- Packet Reader
- Packet Writer
- VarInt implementation
- Compression
- Serialization helpers

This is the lowest layer of NeoAfk.

---

utils/

Shared helper functions.

Examples:

- UUID utilities
- Validation
- Formatting
- Shared constants

Avoid placing protocol logic here.

---

docs/

Contains project documentation.

Documentation should be updated whenever behavior changes.

---

Layered Architecture

NeoAfk follows a layered architecture.

Application

↓

Play Logic

↓

Packet Handlers

↓

Protocol

↓

Packet System

↓

TCP Socket

Each layer should depend only on the layer below it.

---

Coding Standards

General guidelines:

- Prefer "const" whenever possible.
- Keep functions small and focused.
- Use descriptive variable names.
- Avoid unnecessary abstractions.
- Write code that explains itself.

Comments should explain why, not what.

---

Naming Conventions

Examples:

Classes:

PacketReader
PacketWriter
ConfigurationHandler
KeepAliveHandler

Functions:

handlePacket()

sendKeepAlive()

writeVarInt()

readString()

Variables:

packetId

compressionThreshold

serverAddress

currentState

Avoid abbreviations unless they are widely understood.

---

Error Handling

NeoAfk should recover from recoverable errors whenever possible.

Preferred approach:

1. Log the issue.
2. Preserve debugging information.
3. Recover if safe.
4. Disconnect only when required by the protocol.

Unexpected packets should not immediately terminate the application.

---

Logging

Use the appropriate log level.

INFO

Normal events.

Examples:

- Connected
- Login Success
- Entered Play State

WARN

Recoverable problems.

Examples:

- Unknown packet
- Unsupported feature

ERROR

Unexpected failures.

Examples:

- Socket errors
- Packet decoding failures

DEBUG

Detailed packet information used during development.

---

Adding a New Packet

When implementing support for a new packet:

1. Identify the protocol state.
2. Determine packet direction.
3. Create or update the appropriate handler.
4. Implement serialization or deserialization.
5. Test against a real server.
6. Update the documentation if behavior changes.

Avoid mixing unrelated packet logic into existing handlers.

---

Testing

Before committing changes:

- Connect to a supported Minecraft server.
- Verify the login sequence.
- Verify Configuration completes.
- Verify Play state is reached.
- Check logs for unexpected warnings or errors.

Regression testing is especially important for protocol changes.

---

Documentation

Documentation is considered part of the codebase.

Whenever functionality changes:

- Update README if needed.
- Update protocol documentation.
- Update packet flow diagrams.
- Update the changelog.

Keeping documentation current is part of completing a feature.

---

AI-Assisted Development

NeoAfk supports AI-assisted development.

AI can be useful for:

- Architecture discussions
- Documentation
- Code reviews
- Debugging
- Protocol research

However, contributors are responsible for:

- Understanding the generated code.
- Testing changes.
- Ensuring compatibility with NeoAfk's architecture.
- Maintaining code quality.

AI should assist development—not replace engineering judgment.

---

Pull Request Checklist

Before opening a Pull Request, verify that:

- The project builds successfully.
- Existing functionality still works.
- New functionality has been tested.
- Documentation has been updated.
- Commit messages are descriptive.
- No unrelated changes are included.

Small, focused Pull Requests are preferred.

---

Long-Term Vision

NeoAfk is intended to become a production-ready, educational Minecraft AFK bot.

Development should prioritize:

- Clean architecture
- Stability
- Protocol correctness
- Maintainability
- High-quality documentation

Every contribution should move the project closer to these goals.

Thank you for helping build NeoAfk.