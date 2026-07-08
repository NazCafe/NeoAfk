# Troubleshooting

## `Server requested encryption (online-mode), but no Microsoft account is configured.`

Your target server has online-mode (Microsoft/Mojang account
authentication) enabled, and NeoAfk isn't configured with a Microsoft
account. Two options:

**Option A — join with a real account:** follow
`docs/getting-started/microsoft-auth.md` (one-time Azure app
registration + local login script, ~5 minutes). Once `MS_CLIENT_ID` and
`MS_REFRESH_TOKEN` are set, NeoAfk authenticates automatically on every
connect/reconnect.

**Option B — switch the server to offline-mode instead**, on Aternos:

1. Go to `https://aternos.org/options`
2. Enable the **"Cracked"** toggle (settings save automatically)
3. Restart the server

**Fix, on other hosts:** set `online-mode=false` in `server.properties`
and restart.

Note: disabling online-mode also disables Mojang's player authentication
for *everyone*, not just the bot — anyone can then join under any
username. Fine for a private test server; if you open the server to
other real players, pair this with an auth plugin (e.g. AuthMe Reloaded,
OpeNLogin) so they still need a password.

## Bot connects, then disconnects immediately with an empty reason or `ECONNRESET`

Usually means the Minecraft server itself isn't actually running yet.
On Aternos specifically:

- Check the server shows **Online** (not Offline/Starting) on the panel.
- The very first connection attempt right after a (re)start sometimes
  fails even once the server shows Online — NeoAfk's automatic reconnect
  will retry within a few seconds regardless.
- Aternos's server port changes on every restart. NeoAfk resolves this
  automatically via DNS SRV lookup, so you shouldn't need to update
  `MC_PORT` manually — just make sure `MC_HOST` is set to your
  `*.aternos.me` domain, not a hardcoded IP or a stale port.

## Bot hangs in "Configuration" state and eventually disconnects on a modded server

If you're running a fork or modified copy of NeoAfk and see this, check
that the Configuration-state Ping (packet ID `0x05`) is being answered
with a Pong. Modded servers (NeoForge/Forge) use this specific exchange
to detect a vanilla-compatible client and skip their mod handshake — if
it's never answered, the server waits for a handshake reply that never
comes and eventually times the connection out.
