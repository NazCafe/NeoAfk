const crypto = require("crypto");

// Minecraft's server-hash algorithm. This is deliberately NOT a standard
// hex digest: it treats the SHA1 output as a signed (two's-complement)
// big integer and prints that in base 16 - meaning it can be shorter than
// 40 hex characters (no zero-padding) and can have a leading "-". Getting
// this wrong silently breaks every online-mode join, since the server
// verifies this exact string with Mojang.
//
// Verified against Mojang's own published test vectors:
//   sha1("Notch") = 4ed1f46bbe04bc756bcb17c0c7ce3e4632f06a48
//   sha1("jeb_")  = -7c9d5b0044c130109a5d7b5fb5c317c02b4e28c1
//   sha1("simon") = 88e16a1019277b15d58faf0541e11910eb756f6
function minecraftServerHash(serverId, sharedSecret, serverPublicKeyDer) {
  const hash = crypto.createHash("sha1");
  hash.update(Buffer.from(serverId, "utf8"));
  hash.update(sharedSecret);
  hash.update(serverPublicKeyDer);
  const digest = hash.digest();

  const asBigInt = BigInt.asIntN(160, digest.reduce((acc, byte) => (acc << 8n) | BigInt(byte), 0n));
  return asBigInt.toString(16);
}

// A fresh random 16-byte (128-bit) shared secret, used as both the AES key
// and (per the Minecraft protocol's specific quirk) the AES IV.
function generateSharedSecret() {
  return crypto.randomBytes(16);
}

// Encrypts the shared secret / verify token with the server's DER-encoded
// public key, using PKCS#1 v1.5 padding (not OAEP - the protocol requires
// the older padding scheme). Output is always 128 bytes for the standard
// 1024-bit server key.
function rsaEncrypt(publicKeyDer, data) {
  const keyObject = crypto.createPublicKey({
    key: publicKeyDer,
    format: "der",
    type: "spki",
  });

  return crypto.publicEncrypt(
    { key: keyObject, padding: crypto.constants.RSA_PKCS1_PADDING },
    data
  );
}

// Sets up the pair of continuously-running AES-128/CFB8 stream ciphers
// used for the rest of the connection once encryption is enabled. Per the
// protocol, both the key AND the IV are the shared secret - there is no
// separate IV. The feedback/segment size must be exactly 8 bits (1 byte);
// Node's "aes-128-cfb8" cipher name selects that directly.
function createCiphers(sharedSecret) {
  const cipher = crypto.createCipheriv("aes-128-cfb8", sharedSecret, sharedSecret);
  const decipher = crypto.createDecipheriv("aes-128-cfb8", sharedSecret, sharedSecret);
  return { cipher, decipher };
}

module.exports = {
  minecraftServerHash,
  generateSharedSecret,
  rsaEncrypt,
  createCiphers,
};
