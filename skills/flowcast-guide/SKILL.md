---
name: flowcast-guide
description: Help for FlowCast, the free OnAir Garage desktop app that produces and delivers radio shows: it picks up exported audio files, converts and joins them with FFmpeg, and delivers by FTP, local folder and archive on a schedule, with email and Telegram alerts. Use when the user asks how to set up a FlowCast show, install FFmpeg, schedule, use the "check for updates" box on sources, set FTP bookmarks, understand alerts, back up, update, or fix a problem.
version: 26.10.2
app_version: 26.11.1
status: to-validate
last_verified: 2026-11-11
---

## When to use

- Setting up or fixing a FlowCast show: sources, format, schedule, FTP, local output, archive, IndiPlay ad breaks.
- FFmpeg problems (not found, unknown encoder, OGG or MP3 unavailable).
- Alerts (email, Telegram, recovery, summary), backups, updates, install warnings.

Do not use for: other automation tools, the FTP server's own setup, or audio editing questions. Ask the version first: this skill follows 26.11.1.

## Ask first

1. FlowCast version (Settings, Help & About) and operating system.
2. Where the audio comes from (exported files from playout or production), how many parts per show, and which output (FTP, local folder, archive).
3. Output format and bitrate; is FFmpeg installed and what does `Test` next to the FFmpeg path say?
4. The exact message in the show's Log tab or the console. Never ask for passwords or tokens.

If the user's version is newer than 26.11.1, say so before answering: this guide may not cover what changed, so mark what may be out of date and point to the latest guide at https://onairgarage.com/tools/flowcast-guide/.

## Procedure

**First show** (quick start)
1. Settings: set the FFmpeg path if FFmpeg is not on the PATH (press `Test`), and optionally the WAV sources BASE path and Archive BASE path. Save.
2. `+ Show`. General: name, slug (the start of the output file name, for example `morning-news_27-09-2026_07-10.mp3`), format and bitrate.
3. Audio Sources: add the files in the order they are joined (paths absolute or relative to the Source BASE path).
4. Schedule: time and frequency (every day, Monday-Friday, Saturday-Sunday, specific days) and an optional validity period; or choose Manual mode on the General tab.
5. Output & FTP: FTP and/or a local folder; press `Test connection`. Save, then run a `Dry Run`.

**Understanding the "Check for updates" box on a source**
A show is produced only when all the checked files are newer than the last production. Uncheck fixed files such as jingles or intros so they are always included. `Force` ignores the check once.

**IndiPlay ad breaks (midroll)**, only for stations that use IndiPlay.it. In the show, Audio Sources, tick `Enable IndiPlay ad breaks`. Then either tick `Ad break after` on each file followed by a break (one break per join; the last file has no box), or choose `Every N minutes` in `Where the ad breaks go` (one break at N, 2N, 3N... minutes, N from 1 to 240, 15 by default, with at least one minute of audio left after it; it also works with a single file). Each production writes a `.mrp` file with the same name as the audio (one position in milliseconds per line), copies it next to the audio in the archive and the output folder, and uploads it by FTP just before the audio. Positions come from the durations measured by FFmpeg and can be off by a few tens of milliseconds. Off by default; in joins mode a show with a single file has no joins and writes no file. If the `.mrp` cannot be written the audio still goes out and a `Midroll` error appears in the cards, statistics and alerts.

**Run buttons**: `Run now` (with the check), `Force` (always produces), `Dry Run` (processes but does not upload, copy or archive, and does not update the check date).

**FTP**: save servers as bookmarks in Settings, FTP. In a show load a bookmark; the remote folder belongs to each show. `Save & propagate` updates every show linked to the bookmark. Enable FTPS if the server supports it, otherwise the password travels unencrypted. Upload is tried 3 times.

**Troubleshooting**
1. A show does not start: FlowCast must be running (tray is fine); the show must be enabled, in Scheduled mode and within its validity period. If the PC was off, catch-up runs missed shows for today at the next start.
2. "No update detected" but the files are new: all checked sources must be newer; uncheck fixed files or use `Force` once.
3. FFmpeg error: press `Test`. Not found: set the full path to the executable. Unknown encoder: the build lacks it (for example `libvorbis` for OGG, missing in the Homebrew build); use a build that includes it.
4. FTP upload failed: `Test connection`; check the remote folder with the folder button; enable FTPS; raise the FTP timeout on slow links.
5. Email test certificate error: the SMTP server name must match its certificate; use the name given by the provider. Allow self-signed certificates only for trusted internal servers.
6. macOS "cannot be opened": System Settings, Privacy & Security, Open Anyway. If "damaged" on version 26.10.3 or older on Apple silicon: install the new version over it, or run `xattr -cr /Applications/FlowCast.app && codesign --force --deep -s - /Applications/FlowCast.app`. Windows SmartScreen: More info, Run anyway. Linux: `chmod +x` the AppImage; `libfuse2` may be needed; start at login is not available on Linux.
7. Two FlowCast entries in Apps: upgrade from 26.5.0 or earlier; export a backup, uninstall both, install the new one, import.

**Alerts**: email on error, on a source not updated for 3 consecutive runs, and a recovery message; Telegram with your own bot. Each alert is tried right away, after 10 seconds and after 60 seconds. Summary (off by default) lists what each show did in the last 24 hours or 7 days.

**Backup and update**: Settings, Backup, Export all (secrets left out unless the box is ticked; a red warning appears when it is). Export before every update. `Download and install` verifies the SHA-256; `Close and install` makes a safety copy first and refuses while a show is in production.

## Reference

- Output formats: MP3 (CBR, libmp3lame), AAC (native), OGG Vorbis (libvorbis), Direct copy (no conversion; with one file FFmpeg is not needed). Bitrates: 128k, 192k (default), 256k, 320k.
- Path variables for the local output folder and archive: `%ANNO%` year, `%MESE%` month, `%GIORNO%` day, `%ORA%` hour (example `D:\Archive\%ANNO%\%MESE%\`).
- Run steps: check the sources, copy to the working folder, convert each part, join into `slug_DD-MM-YYYY_HH-NN.ext`, copy to archive and local folder, upload by FTP, update the check date, remove temporary files.
- Requirements: Windows 10/11 64-bit, macOS 13 or later (Intel and Apple silicon), Linux 64-bit AppImage; FFmpeg 4.3 or later installed separately.
- Data folder: `%APPDATA%\flowcast` (Windows), `~/Library/Application Support/flowcast` (macOS), `~/.config/flowcast` (Linux). Passwords and tokens are encrypted with the system keystore and do not work on another PC or account.
- Telegram: create a bot with @BotFather, find chat ids with @userinfobot (groups and channels start with a minus sign).
- Interface languages: English, Italian, Spanish.
- IndiPlay ad-break file: `.mrp`, plain text, one position in milliseconds per line, same base name as the audio.

## Sources

- FlowCast 26.11.1 user manual and CHANGELOG (English, `scripts/manual/content.en.js`) and README from github.com/djgragra/flowcast, read on 2026-11-11.
- The manual is attached to every release as PDF in English, Italian and Spanish.

## Limits

- Status is "to validate": written from the manual by an AI assistant, not yet reviewed by the author.
- Tied to version 26.11.1; later versions can differ.
- It cannot see the user's shows, FFmpeg build, FTP server or network. Never ask for or paste passwords or tokens.
- Redistributing programmes may need rights the app does not give: ask the content owner.
