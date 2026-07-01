# NeoAfk
A lightweight, open-source Node.js AFK client for modern Minecraft, designed to support current versions with reconnect and anti-AFK features.

AI-Assisted Development

NeoAfk is a personal project developed and maintained by NazCafe.

This project is built using an AI-assisted workflow. I use multiple AI assistants—including ChatGPT and Claude—as engineering partners to help with research, protocol analysis, debugging, code reviews, documentation, architecture discussions, and feature planning.

Every implementation is reviewed, tested, integrated, and ultimately decided by me. AI suggestions are treated as recommendations rather than authoritative solutions, and working code is validated against real server behavior before becoming part of the project.

In short:

- Project vision: NazCafe
- Architecture & final decisions: NazCafe
- Implementation & testing: NazCafe, with AI assistance
- Technical discussions and code suggestions: ChatGPT and Claude

NeoAfk reflects a collaborative workflow between a human developer and modern AI tools, with the final responsibility for the code and project direction remaining with the project maintainer.

# NeoAfk

> A lightweight, modern Minecraft AFK bot built from scratch in Node.js.

[![Status](https://img.shields.io/badge/status-pre--alpha-orange)]()
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)]()
[![License](https://img.shields.io/badge/license-TBD-blue)]()

---

## Overview

NeoAfk is an educational and experimental Minecraft AFK bot that communicates directly with the Minecraft protocol instead of relying on existing bot frameworks.

The project was created to better understand the internals of modern Minecraft networking while building a lightweight, modular, and production-ready AFK bot.

Rather than wrapping an existing library, NeoAfk implements protocol handling from the ground up—including the modern Login, Configuration, and Play states introduced in recent Minecraft versions.

---

## Features

Current features include:

- Modern protocol implementation
- TCP socket communication
- Binary packet reader and writer
- VarInt encoding/decoding
- UUID handling
- Packet abstraction
- Compression support
- Login protocol
- Configuration protocol
- Registry synchronization
- Play state transition
- KeepAlive responses
- Teleport confirmation
- Modular packet handlers

---

## Planned Features

- Automatic reconnect
- Human-like Anti-AFK
- Configuration files
- Environment variables
- Cloud deployment
- Docker support
- Runtime statistics
- Health API
- Better logging
- Multi-server support
- Plugin system (future)
- Discord integration (future)

---

## Project Goals

NeoAfk focuses on four principles:

### Learn

Understand how the Minecraft protocol works instead of treating it as a black box.

### Lightweight

Minimal dependencies.

Simple architecture.

Easy to read.

### Modular

Each protocol state should remain isolated and easy to maintain.

### Reliable

Suitable for long-running deployments with automatic recovery.

---

## Project Status

Current development stage:

Pre-Alpha

Current progress:

- Foundation
- Login
- Configuration
- Play State

The bot is capable of successfully joining supported Minecraft servers.

---

## Documentation

See the documentation inside the `docs/` folder.

- Architecture
- Protocol
- Packet Flow
- Configuration
- Deployment
- Anti-AFK
- Reconnect
- Logging
- Troubleshooting

---

## Repository Structure

```
NeoAfk/

src/
    protocol/
    handlers/
    play/
    connection/
    net/
    utils/

docs/

README.md
ROADMAP.md
CHANGELOG.md
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/NazCafe/NeoAfk.git
```

Install dependencies.

```bash
npm install
```

Run the bot.

```bash
node src/test/connect.js
```

---

## Development Philosophy

NeoAfk intentionally avoids relying on existing Minecraft bot frameworks.

Instead, every protocol state is implemented and understood individually.

The objective is not only to create an AFK bot, but also to serve as a practical reference for learning modern Minecraft networking.

---

## AI-Assisted Development

NeoAfk is developed and maintained by **NazCafe**.

This project follows an AI-assisted development workflow. Tools such as ChatGPT and Claude are used for architecture discussions, protocol research, debugging, documentation, and implementation guidance.

All final design decisions, testing, integration, and maintenance are performed by the project maintainer.

---

## Roadmap

See:

- ROADMAP.md

---

## Contributing

Contributions are welcome after the first stable release.

See:

CONTRIBUTING.md

---

## Security

Please report security issues responsibly.

See:

SECURITY.md

---

## License

The project license will be finalized before the first stable public release.

---

## Acknowledgements

Thanks to the Minecraft community and protocol documentation projects whose research has helped improve understanding of the protocol over the years.

NeoAfk is an independent educational project and is not affiliated with Mojang Studios or Microsoft.