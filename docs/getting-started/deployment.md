# Deploying to Render.com

NeoAfk is designed to run unattended on Render's free tier as a **Web
Service** (not a Background Worker — Render's free plan doesn't support
that service type at all).

## Why a Web Service, not a Worker

A Minecraft bot has no HTTP surface of its own, but Render's free Web
Services require binding to a port, and they go to sleep after 15 minutes
without incoming HTTP traffic. NeoAfk's `src/index.js` runs a minimal HTTP
server alongside the bot to satisfy both requirements — see
[Keeping the service awake](#keeping-the-service-awake) below.

## Steps

1. Fork this repository.
2. On Render, create a **New Web Service** and connect your fork.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables (see below).
6. Deploy.

If you use the included `render.yaml`, Render's Blueprint deploy picks up
the build/start commands and variable names automatically — you'll just
need to fill in `MC_HOST` yourself (marked `sync: false` so it isn't stored
in the blueprint file).

## Environment variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `MC_HOST` | Yes | — | Your server address, e.g. `example.aternos.me` |
| `MC_PORT` | No | `25565` | Overridden automatically if a DNS SRV record is found |
| `MC_USERNAME` | No | `NeoAFK` | |
| `RECONNECT_DELAY_MS` | No | `5000` | Delay between reconnect attempts |
| `NEOAFK_LOG_LEVEL` | No | `info` | `debug`, `info`, `warn`, or `error` |
| `PORT` | Set by Render | — | Don't set this yourself — Render injects it |

## Keeping the service awake

Render's free Web Services sleep after 15 minutes with no incoming HTTP
request — this happens regardless of what the bot itself is doing. To
prevent that, point an external uptime pinger (e.g. UptimeRobot,
cron-job.org) at your Render service's public URL, hitting it every 5–10
minutes.

This is separate from Minecraft server idling on the host side (Aternos,
etc.) — the Render service and the Minecraft server each have their own
independent "keep it awake" requirement.

## Aternos-specific notes

- Aternos servers only run once manually started from the Aternos panel.
  NeoAfk can keep an already-running server alive, but it cannot start one
  — connecting to an offline server will just fail or disconnect early.
- Aternos's server port changes every time the server restarts. NeoAfk
  resolves this automatically via DNS SRV lookup (see
  [`docs/development/protocol.md`](../development/protocol.md)), so you
  normally don't need to update `MC_PORT` after a restart — just leave
  `MC_HOST` set to your `*.aternos.me` domain.
- Using bots to keep a free Aternos server online 24/7 is against
  Aternos's Terms of Service and may result in account restrictions. See
  Aternos's own terms before relying on this for long-running uptime.
