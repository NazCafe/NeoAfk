> ⚠️ **Alpha Notice**
>
> NeoAfk is under active development. Features, APIs, and documentation may change between releases. Feedback and contributions are welcome.

🚀 NeoAfk

«A lightweight, dependency-free Minecraft Java Edition protocol client, implemented entirely from scratch — with an AFK bot built on top of it as the flagship use case.»

[![Status](https://img.shields.io/badge/Status-Alpha-yellow)](#)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](#)
[![Platform](https://img.shields.io/badge/Platform-Render%20Supported-success)](#)
[![Protocol](https://img.shields.io/badge/Minecraft-Modern%20Protocol-blue)](#)
[![License](https://img.shields.io/badge/License-GPLv3-blue)](#)

---

📖 About

NeoAfk started as an AFK bot, but it's grown into something broader: a
full Minecraft Java Edition network client, implemented directly against
the protocol with zero external dependencies — no Mineflayer, no
node-minecraft-protocol, nothing. It speaks Handshake, Login,
Configuration, and Play; handles compression; passes the NeoForge/Forge
modded-server handshake; resolves dynamic-port hosts (like Aternos) via
DNS SRV; and authenticates real Microsoft/Xbox accounts for online-mode
servers, with full RSA/AES encryption handshake support.

Staying connected AFK is the first thing built on top of that
foundation, and the reason the project exists — but the protocol layer
underneath it is general-purpose, and a valuable learning resource on its
own for anyone interested in networking, packet serialization, or
protocol design.

---

✨ Features

Protocol / networking core

- ✅ Custom Minecraft networking implementation (zero dependencies)
- ✅ Handshake → Login → Configuration → Play
- ✅ Packet serialization and deserialization
- ✅ Compression support
- ✅ Registry synchronization
- ✅ NeoForge / Forge modded-server handshake compatibility
- ✅ DNS SRV auto-discovery (handles hosts with dynamic ports, e.g. Aternos)
- ✅ Microsoft/Xbox account authentication for online-mode servers, with automatic fallback to offline-mode (see `docs/getting-started/microsoft-auth.md`)

AFK bot / operations

- ✅ Automatic reconnect
- ✅ Environment-variable configuration
- ✅ Render.com deployment support (HTTP health endpoint + blueprint)
- 🚧 Human-like Anti-AFK (Planned)
- 🚧 Docker support (Planned)
- 🚧 Advanced logging (file output, colors) (Planned)

---

🚀 Quick Start

Requirements

- Node.js 18 or later
- npm
- A Minecraft Java Edition server, offline-mode or online-mode. For
  online-mode, you'll also need a free Azure app registration — see
  `docs/getting-started/microsoft-auth.md`.

Clone the repository

git clone https://github.com/NazCafe/NeoAfk.git
cd NeoAfk

Install dependencies

npm install

Configure

Copy the example configuration:

cp .env.example .env

Edit ".env" with your server details.

Run

npm start

---

☁️ Deploy on Render

NeoAfk supports deployment on Render.

1. Fork this repository.
2. Create a new Render Web Service.
3. Connect your GitHub repository.
4. Configure the required environment variables.
5. Deploy.

See "docs/getting-started/deployment.md" for detailed instructions.

---

📚 Documentation

Documentation is available in the "docs/" directory.

- Documentation Home
- Glossary
- Architecture
- Minecraft Protocol
- Packet Flow
- Development Guide
- Deployment Guide
- Configuration
- Anti-AFK
- Automatic Reconnect
- Logging
- FAQ
- Troubleshooting

---

🛣️ Roadmap

See "ROADMAP.md" for planned features and upcoming milestones.

---

🤝 Contributing

Contributions are welcome.

You can help by:

- Reporting bugs
- Suggesting features
- Improving documentation
- Optimizing code
- Submitting pull requests

Please read:

- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- SECURITY.md

before contributing.

---

📦 Project Status

Current release:

v0.2.0-alpha

Current focus:

- Human-like Anti-AFK
- Docker support
- Advanced logging
- Documentation expansion

---

❤️ Acknowledgements

NeoAfk is created and maintained by NazCafe.

This project also benefited from AI-assisted development tools that helped accelerate research, debugging, documentation, and software design. Final implementation decisions and project direction remain under the maintainer's control.

Special thanks to:

- OpenAI (ChatGPT)
- Anthropic (Claude)
- The Minecraft community
- Open-source contributors

See "ACKNOWLEDGEMENTS.md" for more information.

---

📜 License

Copyright © 2026 NazCafe

NeoAfk is licensed under the GNU General Public License v3.0 (GPL-3.0).

See the "LICENSE" file for the complete license text.

---

⭐ Support NeoAfk

If NeoAfk helped you or you enjoyed the project:

- ⭐ Star the repository
- 🍴 Fork the project
- 🐛 Report bugs
- 💡 Suggest new ideas
- 📖 Improve the documentation
- 💻 Contribute code
- 📢 Share NeoAfk with others

Every contribution helps the project grow.

---

💬 Final Note

NeoAfk began as a personal challenge to understand the modern Minecraft protocol from the ground up.

Today, it is growing into an open-source educational project focused on networking, protocol implementation, and collaborative learning.

Whether you use NeoAfk, contribute to it, or simply learn from it, thank you for being part of the journey.

Happy coding, and see you in-game!

— NazCafe
