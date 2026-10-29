---
name: ticker-feed-builder-guide
description: Help for Ticker Feed Builder, the free OnAir Garage desktop app that downloads RSS feeds on a schedule and turns each into numbered text lines and JPG images for TV tickers and playout graphics. Use when the user asks how to create profiles and feeds, test a feed, filter or change stories, set schedules and time windows, configure the output format and file names, set alerts and the frozen-feed alert, use headless mode, back up, update, or fix a problem.
version: 26.10.2
status: to-validate
last_verified: 2026-10-29
---

## When to use

- Setting up Ticker Feed Builder: profiles, feeds, output folder, placeholder image, schedule.
- Matching the files to a ticker or graphics system (encoding, line endings, file names, image numbering and size).
- Feed problems: failed checks, missing output folder, certificate errors, frozen feeds, alerts that do not arrive.
- Headless mode, backups, updates, install warnings.

Do not use for: a specific ticker system's own configuration, or for advice on publishers' licences (it is not legal advice). Ask the version first: this skill follows 26.10.12.

## Ask first

1. Version and operating system.
2. What reads the files (ticker, playout graphics, CG): required file names, text encoding, line endings, image numbering and size.
3. The feed addresses (without credentials) and how often they update; how many screens and folders.
4. The message shown when a feed fails (feed test result, console, alerts). Never ask for passwords, tokens or credentials inside addresses.

## Procedure

1. **Create a profile** (`+ New profile`): one profile has one output folder, its feeds, a check interval, a placeholder image and an output format. Use several profiles if different screens read different folders.
2. **Add feeds** (Feeds tab, `+ Add feed`): name (it becomes the folder name) and address. The app ships without any feed.
3. **Test** each feed: the preview shows the stories exactly as they would be written, the title and description lines and which images would use the placeholder. Nothing is written. `Show the feed as it is` shows it without filters and limits.
4. Choose the output folder, the placeholder image, and the check schedule. Switch the profile to Active; `Run now` checks at once.
5. **Choose and change stories** (per feed, Options): keyword filters (case and accents ignored), remove duplicates, newest first; merged feeds (latest stories of several feeds in one folder); text changes in this order: replacements, capital letters, text before and after, length limit.
6. **Output format** (Output format tab): encoding (UTF-8, UTF-8 with BOM, Windows-1252), line ending, file name templates (`{folder}`), image number start, digits and extension, JPEG quality, optional resize (fill or fit), title and description limits. WebP and AVIF images are converted to JPEG.
7. **Schedules**: every N minutes after the previous check, every N minutes on the clock (15 = :00 :15 :30 :45), or at fixed times on chosen days. Add time windows to check only in certain hours and days. Stagger profiles so they do not all start at the same minute.
8. **Alerts**: desktop notification, Telegram and/or email when a feed fails N runs in a row, an output folder disappears, on recovery, when a feed answers but has had no new stories for N hours (frozen feed) and a daily summary. Use `Send test`.

**What the files look like**: per feed, `<Name>_Title.Txt` (one headline per line), `<Name>_Description.Txt` (one description per line in the same order), `<Name>/00001.JPG`, `00002.JPG`... and optionally `<Name>_metadata.json`. Story N is line N of both text files and image N; an empty title or description becomes `-` (configurable); a missing or unreadable image becomes the placeholder.

**Safe writes**: files are written under a temporary name and renamed; unchanged files are not touched; if a download fails the previous files stay; a missing output folder is reported and never created; after writing, the files are read back and checked. A failed check or a file locked by a player counts as a failed feed.

**Troubleshooting**
- "output folder missing": the folder or drive is not there; reconnect it. The app never creates it.
- Certificate error on a feed: the publisher's certificate is broken; if you trust the feed, switch on `Skip certificate check` for it (encrypted but not verified; off by default).
- Text files and images do not match: they always match when written by the app; check that nothing else writes in the folder.
- Images on private network addresses (localhost, 10.x, 172.16-31.x, 192.168.x) are ignored for feeds on the public internet.
- No alert arrives: `Send test` and read the error.
- macOS "damaged / cannot be opened": System Settings, Privacy & Security, Open Anyway; for versions older than 26.10.12 run `xattr -cr "/Applications/Ticker Feed Builder.app" && codesign --force --deep -s - "/Applications/Ticker Feed Builder.app"`. Windows SmartScreen: More info, Run anyway. Linux: `chmod +x`, `libfuse2` if needed.
- Update checksum mismatch: the file was deleted automatically; retry or download by hand.

**Headless mode** (server, or a machine that must update the ticker after a restart before anyone signs in): the engine runs without a window (`src/cli.js`); Settings, Headless mode shows the exact command. It reads the file written by `Export settings` (no secrets); Telegram token and SMTP password are given as environment variables. With `--once` it makes one run and exits with 0 (all fine), 1 (some problem) or 2 (settings unusable).

## Reference

- How a check works: the app asks the server whether the feed changed (`ETag` / `Last-Modified`); "not modified" downloads nothing. Otherwise the content is compared with the previous copy. Images are downloaded and files written only when something is new; a failed image is retried at the next check.
- The computer must stay on and awake; the app can ask the system not to sleep but cannot stop a forced sleep or shutdown.
- Backup: `ticker-feed-builder-backup-YYYY-MM-DD.json`; the box "Include passwords and tokens" is off by default (then SMTP password, Telegram token and feed credentials are left out).
- A feed that is free to download is not necessarily free to broadcast: publishers usually offer RSS for personal reading; showing headlines on TV, screens or websites normally needs an agreement. Read the publisher's terms. This is not legal advice.

## Sources

- Ticker Feed Builder 26.10.12 manual (English, `docs/manual/manual.en.md`) from github.com/djgragra/ticker-feed-builder, read on 2026-10-29.

## Limits

- Status is "to validate": written from the manual by an AI assistant, not yet reviewed by the author.
- Tied to version 26.10.12. It cannot see the user's feeds, network or ticker system. The default layout reproduces the author's earlier scripts; other ticker systems may need other names, encodings or sizes.
- It gives no legal advice on feed licences.
