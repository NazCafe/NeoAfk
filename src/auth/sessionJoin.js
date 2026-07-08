const https = require("https");

const JOIN_URL = "https://sessionserver.mojang.com/session/minecraft/join";

// Tells Mojang this account is joining a specific server, identified by
// the server-hash computed from the encryption handshake. The game server
// independently verifies this against Mojang's hasJoined endpoint, so
// skipping this call (or getting the hash wrong) means the server will
// reject the login even though the encryption handshake itself succeeded.
//
// uuid must be the 32-character hex profile id with no dashes, matching
// what the Minecraft profile API returns.
function joinServerSession(accessToken, uuid, serverId) {
  return new Promise((resolve, reject) => {
    const data = Buffer.from(
      JSON.stringify({ accessToken, selectedProfile: uuid, serverId })
    );

    const req = https.request(
      JOIN_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": data.length,
        },
      },
      (res) => {
        let chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          if (res.statusCode === 204) {
            resolve();
            return;
          }
          const text = Buffer.concat(chunks).toString("utf8");
          reject(new Error(`Mojang session join failed (${res.statusCode}): ${text.slice(0, 200)}`));
        });
      }
    );

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

module.exports = { joinServerSession };
