const https = require("https");

const DEVICE_CODE_URL = "https://login.microsoftonline.com/consumers/oauth2/v2.0/devicecode";
const TOKEN_URL = "https://login.microsoftonline.com/consumers/oauth2/v2.0/token";
const XBL_AUTH_URL = "https://user.auth.xboxlive.com/user/authenticate";
const XSTS_AUTH_URL = "https://xsts.auth.xboxlive.com/xsts/authorize";
const MC_AUTH_URL = "https://api.minecraftservices.com/authentication/login_with_xbox";
const MC_PROFILE_URL = "https://api.minecraftservices.com/minecraft/profile";

const SCOPE = "XboxLive.signin offline_access";

// Known Xbox Secure Token Service error codes for common account issues.
// See: https://minecraft.wiki/w/Microsoft_authentication
const XSTS_ERRORS = {
  2148916233: "This Microsoft account has no Xbox account. Log in at minecraft.net once with it first, then retry.",
  2148916235: "Xbox Live is not available in this account's country/region.",
  2148916236: "This account needs adult verification (South Korea).",
  2148916237: "This account needs adult verification (South Korea).",
  2148916238: "This is a child account and must be added to a Family group before it can be used.",
};

function postJson(url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const data = Buffer.from(JSON.stringify(body));
    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Content-Length": data.length,
          ...headers,
        },
      },
      (res) => {
        let chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");
          let parsed;
          try {
            parsed = text ? JSON.parse(text) : {};
          } catch (err) {
            return reject(new Error(`Non-JSON response from ${url}: ${text.slice(0, 200)}`));
          }
          resolve({ status: res.statusCode, body: parsed });
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function postForm(url, params) {
  return new Promise((resolve, reject) => {
    const data = Buffer.from(new URLSearchParams(params).toString());
    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": data.length,
        },
      },
      (res) => {
        let chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");
          let parsed;
          try {
            parsed = text ? JSON.parse(text) : {};
          } catch (err) {
            return reject(new Error(`Non-JSON response from ${url}: ${text.slice(0, 200)}`));
          }
          resolve({ status: res.statusCode, body: parsed });
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function getJson(url, bearerToken) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { method: "GET", headers: { Authorization: `Bearer ${bearerToken}`, Accept: "application/json" } },
      (res) => {
        let chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");
          let parsed;
          try {
            parsed = text ? JSON.parse(text) : {};
          } catch (err) {
            return reject(new Error(`Non-JSON response from ${url}: ${text.slice(0, 200)}`));
          }
          resolve({ status: res.statusCode, body: parsed });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

// Step 1: request a device code. The caller shows verificationUri +
// userCode to the user, who enters it at that URL in any browser.
async function requestDeviceCode(clientId) {
  const { status, body } = await postForm(DEVICE_CODE_URL, { client_id: clientId, scope: SCOPE });

  if (status !== 200) {
    throw new Error(`Device code request failed (${status}): ${JSON.stringify(body)}`);
  }

  return {
    deviceCode: body.device_code,
    userCode: body.user_code,
    verificationUri: body.verification_uri,
    expiresIn: body.expires_in,
    interval: body.interval || 5,
    message: body.message,
  };
}

// Step 2: poll the token endpoint until the user finishes logging in (or
// the device code expires). Returns { accessToken, refreshToken }.
async function pollForToken(clientId, deviceCode, intervalSeconds, expiresInSeconds) {
  const deadline = Date.now() + expiresInSeconds * 1000;
  let interval = intervalSeconds;

  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, interval * 1000));

    const { status, body } = await postForm(TOKEN_URL, {
      grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      client_id: clientId,
      device_code: deviceCode,
    });

    if (status === 200 && body.access_token) {
      return { accessToken: body.access_token, refreshToken: body.refresh_token };
    }

    switch (body.error) {
      case "authorization_pending":
        continue; // user hasn't finished logging in yet, keep polling
      case "slow_down":
        interval += 5;
        continue;
      case "expired_token":
        throw new Error("Device code expired before login was completed. Run this again.");
      case "authorization_declined":
        throw new Error("Login was declined.");
      default:
        throw new Error(`Token request failed: ${body.error || status} ${body.error_description || ""}`);
    }
  }

  throw new Error("Device code expired before login was completed. Run this again.");
}

// Uses a previously obtained refresh token to get a new Microsoft access
// token silently, with no user interaction. This is what the bot itself
// uses on every startup/reconnect once you're set up.
async function refreshMicrosoftToken(clientId, refreshToken) {
  const { status, body } = await postForm(TOKEN_URL, {
    grant_type: "refresh_token",
    client_id: clientId,
    refresh_token: refreshToken,
    scope: SCOPE,
  });

  if (status !== 200 || !body.access_token) {
    throw new Error(`Microsoft token refresh failed (${status}): ${JSON.stringify(body)}`);
  }

  return { accessToken: body.access_token, refreshToken: body.refresh_token || refreshToken };
}

async function exchangeXbl(msAccessToken) {
  const { status, body } = await postJson(XBL_AUTH_URL, {
    Properties: {
      AuthMethod: "RPS",
      SiteName: "user.auth.xboxlive.com",
      // "d=" prefix is required when using a self-registered Azure app's
      // access token, as opposed to a first-party title's ticket format.
      RpsTicket: `d=${msAccessToken}`,
    },
    RelyingParty: "http://auth.xboxlive.com",
    TokenType: "JWT",
  });

  if (status !== 200) {
    throw new Error(`Xbox Live authentication failed (${status}): ${JSON.stringify(body)}`);
  }

  return { token: body.Token, userHash: body.DisplayClaims.xui[0].uhs };
}

async function exchangeXsts(xblToken) {
  const { status, body } = await postJson(XSTS_AUTH_URL, {
    Properties: { SandboxId: "RETAIL", UserTokens: [xblToken] },
    RelyingParty: "rp://api.minecraftservices.com/",
    TokenType: "JWT",
  });

  if (status === 401) {
    const reason = XSTS_ERRORS[body.XErr] || `Unknown XSTS error code ${body.XErr}`;
    throw new Error(`Xbox Live rejected this account: ${reason}`);
  }
  if (status !== 200) {
    throw new Error(`XSTS authentication failed (${status}): ${JSON.stringify(body)}`);
  }

  return { token: body.Token, userHash: body.DisplayClaims.xui[0].uhs };
}

async function authenticateMinecraft(xstsToken, userHash) {
  const { status, body } = await postJson(MC_AUTH_URL, {
    identityToken: `XBL3.0 x=${userHash};${xstsToken}`,
  });

  if (status !== 200) {
    throw new Error(`Minecraft authentication failed (${status}): ${JSON.stringify(body)}`);
  }

  return { accessToken: body.access_token };
}

async function fetchProfile(mcAccessToken) {
  const { status, body } = await getJson(MC_PROFILE_URL, mcAccessToken);

  if (status === 404) {
    throw new Error("This Microsoft account does not own Minecraft: Java Edition.");
  }
  if (status !== 200) {
    throw new Error(`Profile fetch failed (${status}): ${JSON.stringify(body)}`);
  }

  return { id: body.id, name: body.name };
}

// Full chain from a Microsoft access token through to a Minecraft access
// token + profile. Shared by both the interactive device-code login and
// the bot's silent refresh-token login.
async function completeChain(msAccessToken) {
  const xbl = await exchangeXbl(msAccessToken);
  const xsts = await exchangeXsts(xbl.token);
  const mc = await authenticateMinecraft(xsts.token, xsts.userHash);
  const profile = await fetchProfile(mc.accessToken);

  return { minecraftAccessToken: mc.accessToken, profile };
}

module.exports = {
  requestDeviceCode,
  pollForToken,
  refreshMicrosoftToken,
  completeChain,
};
