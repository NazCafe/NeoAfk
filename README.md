🚀 NeoAfk

«A lightweight, modular, and educational Minecraft AFK bot built from scratch using the modern Minecraft protocol.»

"Status" (https://img.shields.io/badge/Status-Pre--Alpha-orange)
"Node.js" (https://img.shields.io/badge/Node.js-18+-green)
"Platform" (https://img.shields.io/badge/Platform-Render%20Supported-success)
"Protocol" (https://img.shields.io/badge/Minecraft-Modern%20Protocol-blue)
"License" (https://img.shields.io/badge/License-GPLv3-blue)

---

👋 Welcome to NeoAfk

NeoAfk is an open-source Minecraft AFK bot designed with two goals in mind:

- Build a reliable AFK bot without relying on existing Minecraft bot frameworks.
- Help developers understand how the modern Minecraft protocol works.

Unlike many projects that wrap existing libraries, NeoAfk communicates directly with Minecraft servers through its own packet handling, protocol states, and networking implementation.

Whether you're here to automate gameplay, contribute to the project, or explore Minecraft networking, NeoAfk aims to provide a clean and educational codebase.

---

✨ Why NeoAfk?

NeoAfk was created to answer a simple question:

«Can a modern Minecraft AFK bot be built entirely from scratch while remaining lightweight, understandable, and open for learning?»

The answer is yes.

NeoAfk focuses on:

- 🧩 Clean architecture
- 📡 Native Minecraft protocol implementation
- ⚡ Lightweight design
- 📚 Educational value
- 🔧 Modular packet handlers
- ☁️ Cloud deployment support
- 🌱 Long-term maintainability

Every feature is implemented with readability and extensibility in mind.

---

🌟 Features

Networking

- ✅ Custom TCP client
- ✅ Packet Reader
- ✅ Packet Writer
- ✅ VarInt encoding and decoding
- ✅ UUID handling
- ✅ Compression support

---

Protocol

- ✅ Handshake
- ✅ Login State
- ✅ Configuration State
- ✅ Play State
- ✅ Registry synchronization
- ✅ Plugin Message handling
- ✅ Modern Minecraft protocol support

---

Gameplay

- ✅ KeepAlive responses
- ✅ Teleport confirmations
- ✅ Player Loaded acknowledgement

🚧 Planned

- Human-like Anti-AFK
- Automatic reconnect
- Runtime statistics
- Chat handling
- Command system

---

Deployment

- ✅ Local execution
- ✅ Render.com deployment
- 🚧 Docker support (Planned)
- 🚧 Additional cloud providers (Roadmap)

---

⚡ Quick Start

Clone the repository

git clone https://github.com/NazCafe/NeoAfk.git

cd NeoAfk

Install dependencies

npm install

Run NeoAfk

node src/test/connect.js

If everything is configured correctly, NeoAfk will connect to the Minecraft server, complete the Login and Configuration states, and enter the Play State.

---

🎉 Current Milestone

NeoAfk has successfully achieved:

- ✅ TCP networking
- ✅ Packet serialization
- ✅ Login implementation
- ✅ Compression negotiation
- ✅ Configuration implementation
- ✅ Registry synchronization
- ✅ Play State implementation
- ✅ Render.com compatibility

This marks the project's first complete end-to-end connection using NeoAfk's own protocol implementation.

---

📸 Preview

Screenshots and demonstrations will be added as the project evolves.

Planned additions include:

- Connection logs
- Render deployment dashboard
- Protocol debugging output
- Anti-AFK demonstration
- Architecture diagrams

---

⚠️ Project Status

NeoAfk is currently in Pre-Alpha.

Core networking has been successfully implemented, including Login, Configuration, and Play State support. Active development is now focused on Anti-AFK behavior, automatic reconnect, cloud deployment improvements, and long-term stability.

Feedback, bug reports, and contributions are always welcome.

---

📊 Project Progress

NeoAfk is under active development. Progress is tracked below to provide transparency on completed features and upcoming milestones.

Overall Progress          ████████░░ 80%

Networking                ██████████ 100%
Packet System             ██████████ 100%
Handshake                 ██████████ 100%
Login State               ██████████ 100%
Compression               ██████████ 100%
Configuration State       ██████████ 100%
Registry Synchronization  ██████████ 100%
Play State                ██████████ 100%

Render Deployment         ██████████ 100%
Documentation             █████████░ 90%

Anti-AFK                  ██░░░░░░░░ 20%
Reconnect                 ██░░░░░░░░ 20%
Logging System            ░░░░░░░░░░ 0%
Configuration System      ░░░░░░░░░░ 0%
Docker Support            ░░░░░░░░░░ 0%

---

🗺️ Development Roadmap

✅ Completed

- Custom TCP networking
- Packet Reader & Writer
- Minecraft Handshake
- Login State
- Compression negotiation
- Configuration State
- Registry synchronization
- Plugin Message support
- Play State implementation
- Render.com deployment support
- Initial documentation

---

🚧 In Progress

Current development focuses on:

- Human-like Anti-AFK
- Automatic reconnect
- Runtime statistics
- Better logging
- Configuration system

---

🔮 Future Goals

Planned improvements include:

- Docker deployment
- Multi-server configuration
- Runtime dashboard
- Plugin system
- Event system
- Metrics collection
- Web interface
- Additional cloud deployment providers
- Support for future Minecraft protocol versions

---

🛣️ Documentation Hub

Choose the path that best matches your interests.

---

🟢 New Users

If you simply want to run NeoAfk:

1. README.md
2. Deployment Guide
3. Configuration
4. FAQ
5. Troubleshooting

Estimated reading time:

10–15 minutes

---

🟡 Contributors

Interested in improving NeoAfk?

Read in this order:

1. README.md
2. CONTRIBUTING.md
3. Development Guide
4. Architecture
5. SECURITY.md

Estimated reading time:

20–30 minutes

---

🔴 Developers

Want to understand the Minecraft protocol implementation?

Recommended order:

1. Architecture
2. Minecraft Protocol
3. Packet Flow
4. Development Guide

Estimated reading time:

30–45 minutes

---

📚 Documentation Index

Repository

- README.md
- ROADMAP.md
- CHANGELOG.md
- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- SECURITY.md
- ACKNOWLEDGEMENTS.md
- LICENSE

---

Technical Documentation

- Architecture
- Minecraft Protocol
- Packet Flow
- Development Guide

---

User Documentation

- Configuration (Roadmap)
- Deployment Guide
- Logging (Roadmap)

---

Runtime Features

- Anti-AFK (In Development)
- Automatic Reconnect (In Development)

---

Help & Support

- FAQ (Growing)
- Troubleshooting (Growing)

---

🏗️ Repository Structure

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
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── ACKNOWLEDGEMENTS.md
└── LICENSE

The project is organized around a modular architecture where each component has a single responsibility, making NeoAfk easier to understand, maintain, and extend.

---

🎯 Current Development Priorities

The next major milestones for NeoAfk are:

1. Complete the Anti-AFK system.
2. Implement automatic reconnect.
3. Finalize the configuration system.
4. Improve logging and diagnostics.
5. Expand deployment options.
6. Continue improving documentation.

These priorities may evolve as the project grows and community feedback is incorporated.

---

🤝 Contributing

Contributions of all sizes are welcome!

Whether you're fixing a typo, reporting a bug, improving documentation, or implementing a new feature, your help is greatly appreciated.

Ways you can contribute:

- 🐛 Report bugs
- 💡 Suggest new features
- 📖 Improve documentation
- 🛠️ Fix issues
- ⚡ Optimize performance
- 🧪 Test new functionality
- 💻 Submit Pull Requests

Before contributing, please read:

- CONTRIBUTING.md
- CODE_OF_CONDUCT.md
- SECURITY.md

Every contribution helps NeoAfk become a better project.

---

🌍 Community

NeoAfk is more than just an AFK bot.

It is an educational open-source project that encourages learning, experimentation, and collaboration around Minecraft networking and protocol development.

Whether you're an experienced developer or just beginning your programming journey, you're welcome here.

Questions, ideas, constructive feedback, and discussions are always appreciated.

---

❤️ Acknowledgements

NeoAfk is created and maintained by NazCafe.

This project has benefited from the support of the open-source community and modern AI-assisted development tools, helping accelerate research, debugging, documentation, and software design while keeping final implementation decisions under the maintainer's control.

Special thanks to:

- OpenAI (ChatGPT)
- Anthropic (Claude)
- The Minecraft community
- Open-source contributors

Additional details can be found in ACKNOWLEDGEMENTS.md.

---

📜 License

NeoAfk is licensed under the GNU General Public License v3.0 (GPL-3.0).

You are welcome to:

- Use NeoAfk
- Study the source code
- Modify the project
- Share improvements
- Contribute back to the community

Please refer to the LICENSE file for the complete license terms.

---

📦 First Public Release

v0.1.0-pre-alpha

Codename

The First Successful Connection

Release Highlights

- ✅ Built a custom Minecraft networking stack.
- ✅ Implemented the modern Handshake, Login, Configuration, and Play protocol states.
- ✅ Added packet serialization and compression support.
- ✅ Successfully joined a modern Minecraft server.
- ✅ Added Render.com deployment support.
- ✅ Established comprehensive project documentation.

Current Limitations

- 🚧 Anti-AFK is still under development.
- 🚧 Automatic reconnect is in progress.
- 🚧 Configuration system is planned.
- 🚧 Logging improvements are planned.

This release represents the first major milestone in NeoAfk's development and provides a solid foundation for future features.

---

🌱 Vision

NeoAfk aims to become a lightweight, educational, and reliable Minecraft AFK bot while serving as a reference implementation for the modern Minecraft protocol.

The long-term vision includes:

- Stable long-running deployments
- Human-like Anti-AFK behavior
- Multi-version protocol support
- Modular architecture
- High-quality documentation
- An active open-source community

Every release moves the project one step closer to that goal.

---

⭐ Support NeoAfk

If NeoAfk helped you, taught you something new, or you simply enjoy following its development, consider supporting the project.

You can help by:

- ⭐ Starring the repository
- 🍴 Forking the project
- 🐛 Reporting bugs
- 💡 Suggesting features
- 📖 Improving documentation
- 💻 Contributing code
- 📢 Sharing NeoAfk with others

Every contribution, no matter how small, helps the project grow.

---

💬 Final Note

Thank you for taking the time to visit NeoAfk.

What began as a personal challenge to understand the Minecraft protocol has grown into an open-source project focused on learning, experimentation, and continuous improvement.

Whether you choose to use NeoAfk, contribute to it, or simply learn from it, your interest and support are sincerely appreciated.

Happy coding, and see you in-game!

— NazCafe