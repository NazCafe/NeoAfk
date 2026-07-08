Does NeoAfk support Bedrock?

No.

Can it run 24/7?

Yes.

Does it use Mineflayer?

No.

Does it implement the protocol itself?

Yes.

Does NeoAfk work on online-mode (premium/Microsoft-authenticated) servers?

Yes, if you set up Microsoft authentication — see
`docs/getting-started/microsoft-auth.md` (takes about 5 minutes, mostly a
one-time free Azure app registration). Without that set up, NeoAfk still
detects an online-mode server's Encryption Request and disconnects
cleanly rather than crashing, same as before.