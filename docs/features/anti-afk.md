# Anti-AFK

**Status: Planned, not yet implemented.**

NeoAfk currently stays connected and responds to all protocol-level
keep-alive requirements (Keep Alive packets, teleport confirmation, the
NeoForge vanilla-client Ping/Pong check), but it does not yet send any
in-game movement. This means a server-side or plugin-based AFK-kick system
that specifically checks for player movement — separate from the
connection itself — could still remove the bot.

## Planned behaviour

- Small periodic head/pitch rotation
- Occasional arm swing
- Optional random jumping or sneaking
- Randomized timing intervals (not on a fixed clock) so behaviour doesn't
  look mechanically regular
- Fully configurable / disableable

## Why this isn't in 0.2.0

This release focused on getting connection reliability right first —
fixing the login/handshake defects and adding automatic reconnect and SRV
resolution — since none of the anti-idle behaviour matters if the bot
can't reliably stay connected in the first place. Anti-AFK is the next
planned feature; see `ROADMAP.md`.
