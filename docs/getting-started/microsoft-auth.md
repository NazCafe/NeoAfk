# Microsoft Authentication Setup

**Status: the local login script (Stage 1) is implemented. Bot-side
silent refresh and encrypted online-mode play (Stages 2-3) are not yet
wired in — see ROADMAP.md.**

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

Treat `MS_REFRESH_TOKEN` like a password. Never commit it to git — only
set it as an environment variable.

## What this does and doesn't do yet

Implemented: the full Microsoft → Xbox Live → XSTS → Minecraft Services
authentication chain, run locally, producing a long-lived refresh token
and confirming Minecraft ownership.

Not yet implemented: the bot doesn't use these credentials during an
actual connection yet. That requires the bot to silently refresh the
token on startup, send your real username/UUID in Login Start, and — if
the server requests encryption — complete the Mojang session-join call
and switch the entire connection to AES encryption. This is planned as
the next stage of work.
