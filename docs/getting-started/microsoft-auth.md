# Microsoft Authentication Setup

**Status: fully implemented and tested.** NeoAfk can now join both
offline-mode and online-mode servers with the same bot. If Microsoft
credentials are configured, it authenticates before every connect/
reconnect attempt; if that fails or isn't configured, it falls back to
the offline-mode identity automatically rather than crashing.

To let NeoAfk log in with your real Microsoft/Xbox account, you first
need your own free Azure app registration. This isn't optional — the
client IDs used by other Minecraft launcher projects are each their own
registered app and aren't safe or reliable for other software to reuse.

## 1. Register an Azure app (~2 minutes, free)

1. Go to <https://portal.azure.com> and sign in with any Microsoft account
   (it doesn't need to be the same account you play Minecraft on).
2. Search for **App registrations** → **New registration**.
3. Name: anything, e.g. `NeoAfk`.
4. Supported account types: **Personal Microsoft accounts only**.
5. Redirect URI: leave blank, or use
   `https://login.microsoftonline.com/common/oauth2/nativeclient` if the
   form requires one — it isn't actually used by the device code flow.
6. Click **Register**.
7. Open **Authentication** in the left sidebar → under **Advanced
   settings**, set **Allow public client flows** to **Yes** → **Save**.
   This step is required; device code login won't work without it.
8. Copy the **Application (client) ID** from the app's Overview page.

## 2. Run the local login script

```
MS_CLIENT_ID=<your client id> node scripts/microsoft-login.js
```

It prints a URL and a short code. Open the URL in any browser (any
device, doesn't need to be the same machine), enter the code, and log in
with the Microsoft account that owns Minecraft.

On success, it prints your Minecraft username/UUID as confirmation, plus
an `MS_REFRESH_TOKEN` value.

## 3. Store the credentials

Add both as environment variables on Render (or wherever the bot runs):

- `MS_CLIENT_ID` — the same value from step 1
- `MS_REFRESH_TOKEN` — printed by the script in step 2

The bot reads these automatically on every connect and reconnect attempt
— no code changes or additional flags needed. If they're not set, NeoAfk
behaves exactly as before: offline-mode identity only.

## What this does

On every connect/reconnect attempt, if `MS_CLIENT_ID` and
`MS_REFRESH_TOKEN` are both set, NeoAfk:

1. Silently refreshes the Microsoft token (no interaction required, and
   no browser needed on the server).
2. Re-runs the Xbox Live / XSTS / Minecraft Services chain to get a fresh
   Minecraft access token and profile.
3. Uses that real username/UUID in Login Start instead of the offline
   placeholder.
4. If the server responds with an Encryption Request (online-mode), joins
   the Mojang session server, completes the RSA handshake, and switches
   the entire connection to AES/CFB8 encryption for everything from that
   point on — Configuration, Play, all of it.

If Microsoft authentication fails for any reason (expired/revoked token,
network issue, account problem), NeoAfk logs the failure and falls back
to connecting with the offline-mode identity instead of crashing. This
means the exact same bot and configuration work against both an
offline-mode test server and an online-mode server — nothing else needs
to change.

## Credential safety

- `MS_REFRESH_TOKEN` is a long-lived credential for your Microsoft
  account. NeoAfk never logs its value (or the Minecraft access token
  derived from it) at any point — only high-level status like
  "Authenticated as `<username>`".
- Never commit `MS_REFRESH_TOKEN` to git. It's excluded via `.gitignore`
  if you put it in a local `.env` file; on Render, only set it as an
  environment variable.
- The refresh token can be revoked at any time from
  <https://account.live.com/consent/Manage> (find the app you registered
  and remove its access), which immediately invalidates it everywhere.
- Microsoft may rotate the refresh token on use. NeoAfk uses whatever
  token Microsoft returns most recently for the lifetime of the running
  process, but doesn't persist a rotated value back to Render's
  environment variables automatically. In practice these refresh tokens
  stay valid for a long time without rotation being forced; if login
  ever starts failing unexpectedly, re-run `scripts/microsoft-login.js`
  and update the environment variable.
