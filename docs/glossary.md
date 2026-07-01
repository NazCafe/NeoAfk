📖 NeoAfk Glossary

Welcome to the NeoAfk Glossary.

This document explains common networking and Minecraft protocol terms used throughout the project.

If you're new to protocol development, this is a great place to start.

---

A

AFK

AFK stands for Away From Keyboard.

An AFK bot keeps a Minecraft player connected to a server while simulating minimal activity to avoid being kicked for inactivity.

---

C

Client

The software that connects to a Minecraft server.

In this project, NeoAfk acts as the Minecraft client.

---

Compression

A technique used to reduce packet size before transmission.

Modern Minecraft servers negotiate compression during the Login State.

NeoAfk automatically compresses and decompresses packets once compression is enabled.

---

Configuration State

A protocol state introduced in modern Minecraft versions.

During this stage, the server sends registry data, plugin messages, and other information required before gameplay begins.

NeoAfk completes this phase before entering the Play State.

---

H

Handshake

The first Minecraft packet sent after opening a TCP connection.

The Handshake tells the server:

- Protocol version
- Server address
- Server port
- Desired next protocol state

---

K

KeepAlive

A packet exchanged between the server and client to verify that the connection is still active.

NeoAfk automatically responds to KeepAlive packets while connected.

---

L

Login State

The protocol stage responsible for authenticating the client and preparing it to join the server.

Compression is typically negotiated during this stage.

---

P

Packet

A structured block of data exchanged between the client and server.

Every Minecraft action is represented by one or more packets.

Examples include:

- Handshake
- Login Start
- KeepAlive
- Chat Message
- Player Position

---

Packet Handler

A component responsible for processing a specific packet or protocol state.

NeoAfk organizes packet handlers to keep the code modular and maintainable.

---

Packet Reader

Reads raw bytes from the TCP connection and converts them into usable packet data.

---

Packet Writer

Builds packets before sending them to the server.

---

Play State

The final protocol state where normal gameplay occurs.

Once NeoAfk reaches the Play State, the bot has successfully joined the world.

---

Plugin Message

A packet used to exchange custom data between the client and server.

Servers and mod loaders such as NeoForge may use Plugin Messages to communicate additional information.

---

Protocol

A defined set of rules that determine how the Minecraft client and server communicate.

NeoAfk implements the protocol directly without relying on external Minecraft bot frameworks.

---

R

Registry

A collection of game data sent by the server during the Configuration State.

Examples include:

- Biomes
- Dimensions
- Damage Types
- Chat Types

NeoAfk synchronizes this information before entering the Play State.

---

Render

A cloud hosting platform capable of running NeoAfk continuously.

Render allows NeoAfk to operate without requiring a personal computer or mobile device to remain online.

---

T

TCP

Transmission Control Protocol

The reliable networking protocol used by Minecraft for communication between the client and server.

NeoAfk establishes a TCP connection before any Minecraft packets are exchanged.

---

Teleport Confirm

A packet sent by the client to acknowledge a teleport performed by the server.

This keeps the client's position synchronized with the server.

---

U

UUID

Universally Unique Identifier

A unique identifier assigned to every Minecraft player.

Unlike usernames, UUIDs remain constant even if a player's name changes.

---

V

VarInt

A variable-length integer format used extensively throughout the Minecraft protocol.

VarInts reduce packet size by using fewer bytes for smaller numbers.

Almost every Minecraft packet begins with a VarInt length and packet ID.

---

📚 Learn More

For additional information, see:

- Architecture
- Minecraft Protocol
- Packet Flow
- Development Guide

These documents build upon the terminology introduced in this glossary.

---

🤝 Contributions

If you encounter a technical term that is not defined here, feel free to open an issue or submit a pull request.

Helping improve the glossary makes NeoAfk more accessible for everyone.