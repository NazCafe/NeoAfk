Does NeoAfk support Bedrock?

No.

Can it run 24/7?

Yes.

Does it use Mineflayer?

No.

Does it implement the protocol itself?

Yes.

Does NeoAfk work on online-mode (premium/Microsoft-authenticated) servers?

Not yet. NeoAfk currently only supports offline-mode ("cracked") servers.
If a server has online-mode enabled, it will send an Encryption Request
during login, which NeoAfk detects and cleanly disconnects from rather
than crashing. See `docs/reference/troubleshooting.md` for how to fix
this on Aternos. Full Microsoft/Xbox account authentication (so the bot
can join online-mode servers too) is planned — see `ROADMAP.md`.