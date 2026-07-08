#!/usr/bin/env node
// Run this on your own PC, once, to authenticate NeoAfk with your Microsoft
// account. It prints a refresh token at the end — store that as
// MS_REFRESH_TOKEN on Render (or wherever the bot runs). The bot itself
// uses that token to re-authenticate silently on every startup, with no
// further interaction from you.
//
// Requires MS_CLIENT_ID — the Application (client) ID from your own Azure
// app registration. See docs/getting-started/microsoft-auth.md for how to
// create one; it's free and takes about two minutes.
//
// Usage: MS_CLIENT_ID=your-client-id node scripts/microsoft-login.js

const { requestDeviceCode, pollForToken, completeChain } = require("../src/auth/microsoftAuth");

async function main() {
  const clientId = process.env.MS_CLIENT_ID;

  if (!clientId) {
    console.error("Missing MS_CLIENT_ID.");
    console.error("See docs/getting-started/microsoft-auth.md to create one (free, ~2 minutes).");
    console.error("Then run: MS_CLIENT_ID=your-client-id node scripts/microsoft-login.js");
    process.exit(1);
  }

  console.log("Requesting a device login code...\n");
  const device = await requestDeviceCode(clientId);

  console.log(device.message || `Go to ${device.verificationUri} and enter code: ${device.userCode}`);
  console.log("\nWaiting for you to finish logging in...");

  const { accessToken, refreshToken } = await pollForToken(
    clientId,
    device.deviceCode,
    device.interval,
    device.expiresIn
  );

  console.log("\nMicrosoft login successful. Verifying Minecraft ownership...\n");

  const { profile } = await completeChain(accessToken);

  console.log(`Signed in as: ${profile.name} (${profile.id})\n`);
  console.log("Set these on Render (or wherever the bot runs):\n");
  console.log(`  MS_CLIENT_ID=${clientId}`);
  console.log(`  MS_REFRESH_TOKEN=${refreshToken}`);
  console.log("\nMS_REFRESH_TOKEN is a credential for this Microsoft account.");
  console.log("Treat it like a password: never commit it to git, only set it as an environment variable.");
}

main().catch((err) => {
  console.error("\nLogin failed:", err.message);
  process.exit(1);
});
