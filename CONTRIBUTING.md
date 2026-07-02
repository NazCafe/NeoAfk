Contributing to NeoAfk

First of all, thank you for your interest in contributing to NeoAfk!

NeoAfk is an educational open-source project focused on implementing the modern Minecraft protocol from scratch while maintaining clean architecture, readability, and long-term maintainability.

Whether you're fixing bugs, improving documentation, optimizing performance, or adding new features, every contribution is appreciated.

---

Before You Start

Please read the following documents before contributing:

- README.md
- ROADMAP.md
- SECURITY.md
- docs/development.md
- docs/architecture.md

Understanding the project's architecture before making changes will help keep the codebase consistent.

---

Project Goals

NeoAfk aims to be:

- Lightweight
- Modular
- Beginner friendly
- Educational
- Well documented
- Production ready

When contributing, prioritize clarity and maintainability over clever or overly complex solutions.

---

Development Principles

Please follow these principles when writing code:

Keep It Modular

Each module should have a single responsibility.

Good example:

- Login handler
- Configuration handler
- Play handler
- Packet reader
- Packet writer

Avoid creating large files that mix unrelated functionality.

---

Keep It Readable

Readable code is preferred over shorter code.

Use descriptive variable names and write code that is easy for others to understand.

---

Don't Break Working Protocol Code

Minecraft's protocol is sensitive.

If a protocol implementation is already working:

- Do not rewrite it for style alone.
- Only modify it to fix bugs or add compatibility.
- Explain protocol-related changes clearly in your Pull Request.

---

Avoid Duplicate Code

Before creating new functions, check whether similar functionality already exists.

If logic is shared across multiple modules, move it into a utility function instead.

---

Coding Style

General guidelines:

- Use modern JavaScript.
- Prefer "const" over "let" whenever possible.
- Use meaningful variable names.
- Keep functions focused on one task.
- Add comments only where they improve understanding.

Use consistent formatting throughout the project.

---

Branch Naming

Use descriptive branch names.

Examples:

feature/auto-reconnect

feature/anti-afk

bugfix/configuration-state

docs/readme

refactor/logger

Avoid generic names such as:

test

update

new

fix

---

Commit Messages

Use clear commit messages.

Examples:

Add automatic reconnect system

Fix compression packet parsing

Implement KeepAlive handler

Improve packet logging

Refactor configuration state

Avoid vague messages such as:

Update

Fix

Changes

Done

---

Pull Requests

Before opening a Pull Request:

- Ensure the project still runs.
- Test your changes.
- Keep the scope focused.
- Update documentation if necessary.
- Explain why the change is needed.

Small, focused Pull Requests are preferred over large ones.

---

Reporting Bugs

When reporting a bug, please include:

- NeoAfk version
- Minecraft version
- Operating system
- Node.js version
- Server software (Vanilla, Paper, Fabric, NeoForge, etc.)
- Relevant logs
- Steps to reproduce

Screenshots are welcome when applicable.

---

Feature Requests

Feature requests are encouraged.

Please describe:

- The problem you're trying to solve.
- Why the feature would be useful.
- Possible implementation ideas (optional).

---

Documentation Contributions

Documentation improvements are always welcome.

Examples include:

- Fixing typos
- Improving explanations
- Adding diagrams
- Updating outdated information
- Writing tutorials

Good documentation is just as valuable as good code.

---

Code Reviews

Every contribution may be reviewed before being merged.

Reviews focus on:

- Correctness
- Readability
- Maintainability
- Performance
- Protocol accuracy
- Consistency with project architecture

Feedback is intended to improve the project, not criticize contributors.

---

AI-Assisted Contributions

AI tools such as ChatGPT, Claude, GitHub Copilot, or similar assistants are welcome during development.

If AI was used to generate or assist with code:

- Review the generated code carefully.
- Verify it behaves correctly.
- Ensure it matches NeoAfk's architecture.
- Test before submitting.

Contributors remain responsible for the quality and correctness of their submissions.

---

Thank You

Every contribution—whether it's code, documentation, bug reports, testing, or ideas—helps make NeoAfk a better project.

Thank you for being part of the project!