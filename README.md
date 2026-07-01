> ⚠️ **Pre-Alpha Notice**
>
> NeoAfk is under active development. Features, APIs, and documentation may change between releases. Feedback and contributions are welcome.

🚀 NeoAfk

«A lightweight, modular, and educational Minecraft AFK bot built from scratch using the modern Minecraft protocol.»

[![Status](https://img.shields.io/badge/Status-Pre--Alpha-orange)](#)
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
- ✅ Render.com deployment support
- 🚧 Human-like Anti-AFK (In Development)
- 🚧 Automatic Reconnect (In Development)
- 🚧 Configuration system
- 🚧 Advanced logging

---

🚀 Quick Start

Requirements

- Node.js 18 or later
- npm
- A Minecraft Java Edition server

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

v0.1.0-pre-alpha

Current focus:

- Anti-AFK
- Automatic Reconnect
- Configuration improvements
- Logging improvements
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
