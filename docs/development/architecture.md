NeoAfk Architecture

Understanding the architecture is the first step toward understanding NeoAfk.

Unlike many Minecraft bots that rely on existing libraries, NeoAfk communicates directly with the Minecraft protocol using its own networking, packet handling, and state management.

The project is designed to be lightweight, modular, and educational.

---

High-Level Architecture

                      Minecraft Server
                              │
                              │
                     TCP Socket Connection
                              │
                              ▼
                    Packet Reader / Writer
                              │
                              ▼
                   Compression Handler
                              │
                              ▼
                     Protocol State Machine
                              │
      ┌───────────────┬───────────────┬───────────────┐
      ▼               ▼               ▼
 Handshake         Login        Configuration
                                          │
                                          ▼
                                       Play State
                                          │
                              ┌───────────┴───────────┐
                              ▼                       ▼
                        Packet Handlers         AFK Behaviour

Every component has a single responsibility. This keeps the codebase easy to understand and maintain.

---

Design Philosophy

NeoAfk follows several core design principles:

Simplicity

Every module should do one job well.

Large files that handle multiple responsibilities should be avoided whenever possible.

---

Modularity

Features should be isolated into separate modules.

For example:

- Packet encoding
- Packet decoding
- Login handling
- Configuration handling
- Play handling
- Anti-AFK logic

Each module should be independently understandable.

---

Readability

NeoAfk prioritizes readable code over overly clever implementations.

Future contributors should be able to understand the code without needing deep protocol knowledge.

---

Reliability

Long-running stability is a primary goal.

Unexpected packets, disconnects, and recoverable errors should never crash the application.

---

Project Structure

A simplified directory layout:

NeoAfk/

src/
│
├── connection/
│   └── Socket management
│
├── protocol/
│   └── Minecraft protocol implementation
│
├── handlers/
│   └── Packet handlers
│
├── play/
│   └── Play-state logic
│
├── net/
│   ├── Packet reader
│   ├── Packet writer
│   └── Compression
│
├── utils/
│   └── Shared utilities
│
└── test/
    └── Development entry points

As the project grows, additional modules such as "config", "logger", and "afk" may be introduced.

---

Connection Lifecycle

A NeoAfk session progresses through several protocol states.

TCP Connect

↓

Handshake

↓

Login

↓

Configuration

↓

Play

↓

Disconnect (optional)

↓

Reconnect (planned)

Each state is handled independently.

---

Packet Flow

Every incoming packet follows the same general path.

Socket

↓

Packet Reader

↓

Compression (if enabled)

↓

Packet Decoder

↓

Current Protocol State

↓

Specific Packet Handler

↓

Bot Logic

Outgoing packets follow the reverse path.

---

Protocol State Machine

NeoAfk separates Minecraft into distinct protocol states rather than mixing all packet handling together.

Current states include:

- Handshake
- Login
- Configuration
- Play

Future protocol changes can be implemented by extending the relevant state without affecting the others.

---

Packet System

NeoAfk uses its own packet abstraction.

Responsibilities include:

- Packet encoding
- Packet decoding
- VarInt support
- UUID handling
- String serialization
- Primitive type serialization

This abstraction keeps protocol logic separate from low-level byte operations.

---

Handler Architecture

Packet handlers are responsible for processing packets for the active protocol state.

Examples include:

- Login Success
- Compression
- Plugin Messages
- Registry Data
- KeepAlive
- Teleport Confirmation

Handlers should remain focused and avoid unrelated logic.

---

Future Modules

Planned modules include:

AFK

Responsible for:

- Camera movement
- Random timing
- Jumping
- Sneaking
- Walking patterns

---

Configuration

Responsible for:

- Loading configuration files
- Reading environment variables
- Validating settings

---

Logger

Responsible for:

- Console output
- Debug logging
- Error reporting
- Runtime statistics

---

Reconnect

Responsible for:

- Detecting disconnects
- Exponential backoff
- Automatic recovery

---

Error Handling

NeoAfk aims to fail gracefully.

Recoverable errors should:

- Be logged.
- Preserve useful debugging information.
- Trigger recovery where possible.
- Avoid terminating the application unexpectedly.

---

Why Build From Scratch?

NeoAfk intentionally avoids depending on existing Minecraft bot frameworks.

This approach provides:

- A deeper understanding of the Minecraft protocol.
- Greater control over packet handling.
- Easier experimentation with new protocol features.
- A lightweight codebase without unnecessary abstractions.

The project is educational first, while remaining practical for real-world AFK usage.

---

Long-Term Vision

NeoAfk is intended to grow into a stable, production-ready AFK bot with:

- Modern protocol support.
- Reliable long-running operation.
- Clean architecture.
- Comprehensive documentation.
- Easy extensibility.
- Beginner-friendly code.

Maintaining a clear architecture is essential to achieving these goals.