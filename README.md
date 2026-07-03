> ⚠️ **Alpha Notice**
>
> NeoAfk is under active development. Features, APIs, and documentation may change between releases. Feedback and contributions are welcome.

>⚠️ Important Notes
>
>Before using NeoAfk, please read the following:
>
>- NeoAfk is currently in Alpha (v0.2.0). Features and protocol support are still under active development.
>- Supported target: Modern Minecraft Java Edition servers using the current implemented protocol.
>- NeoForge support: Experimental. Some NeoForge servers may require additional protocol or mod-handshake implementation before the bot can fully join.
>- Online-mode servers: Currently not supported. NeoAfk only works with offline-mode (cracked) servers at this time. Servers requiring Mojang/Microsoft authentication will disconnect during login.
>- No mod loading: NeoAfk is not a Minecraft client and does not load Forge, NeoForge, Fabric, or other gameplay mods. It only implements the Minecraft network protocol.
>- Packet changes: Mojang frequently changes packet IDs and login/configuration behavior between Minecraft versions. Protocol updates may be required after major releases.
>- Experimental project: Expect occasional bugs, protocol incompatibilities, and incomplete features while development continues.
>
>Before Reporting an Issue
>
>Please include:
>
>- NeoAfk version
>- Minecraft version
>- Server software (Vanilla, Paper, NeoForge, etc.)
>- Whether the server is online-mode or offline-mode
>- Complete console/log output
>- Any installed server mods or plugins that may affect login
>
>Providing this information greatly speeds up debugging and issue resolution.


🚀 NeoAfk

«A lightweight, modular, and educational Minecraft AFK bot built from scratch using the modern Minecraft protocol.»

[![Status](https://img.shields.io/badge/Status-Alpha-yellow)](#)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](#)
[![Platform](https://img.shields.io/badge/Platform-Render%20Supported-success)](#)
[![Protocol](https://img.shields.io/badge/Minecraft-Modern%20Protocol-blue)](#)
[![License](https://img.shields.io/badge/License-GPLv3-blue)](#)

---

📖 About

NeoAfk is an open-source Minecraft AFK bot focused on education, reliability, and simplicity.

Instead of relying on existing Minecraft bot frameworks, NeoAfk implements the Minecraft protocol directly, making it a valuable learning resource for developers interested in networking, packet serialization, and protocol design.

---

✨ Features

- ✅ Custom Minecraft networking implementation
- ✅ Handshake → Login → Configuration → Play
- ✅ Packet serialization and deserialization
- ✅ Compression support
- ✅ Registry synchronization
- ✅ Automatic reconnect
- ✅ Environment-variable configuration
- ✅ DNS SRV auto-discovery (handles hosts with dynamic ports, e.g. Aternos)
- ✅ Render.com deployment support (HTTP health endpoint + blueprint)
- 🚧 Human-like Anti-AFK (Planned)
- 🚧 Docker support (Planned)
- 🚧 Advanced logging (file output, colors) (Planned)

---

🚀 Quick Start

Requirements

- Node.js 18 or later
- npm
- A Minecraft Java Edition server running in **offline-mode** ("cracked").
  Online-mode (Microsoft-authenticated) servers aren't supported yet — see
  `docs/getting-started/faq.md` and `docs/reference/troubleshooting.md`.

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
