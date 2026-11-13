---
name: dead-air-watchdog-guide
description: Help for Dead Air Watchdog, the free OnAir Garage desktop app that listens to sound cards and Icecast/Shoutcast streams (up to 32 inputs) and alerts by email, Telegram and HTTP when the level stays below a threshold. Use when the user asks how to add inputs, set the silence threshold and time, use monitoring hours, frozen-audio alarms, micro-silences, compact view, wall display, heartbeat, alerts and their wording, backups and updates, or fix false alarms and other problems.
version: 26.10.2
app_version: 26.11.3
status: to-validate
last_verified: 2026-11-13
---

## When to use

- Setting up Dead Air Watchdog: inputs (sound card channels or streams), threshold, time before alert, alerts, wall display.
- False alarms, no alerts, an input "offline" or "not found", frozen-audio alarms, micro-silence logs.
- Backups, updates, install warnings, permissions.

Do not use for: choosing a hardware silence sensor, loudness measurements (the app measures plain level), or HLS streams (not supported). Ask the version first: this skill follows 26.11.3. For general dead-air procedure see `dead-air-diagnostics`.

## Ask first

1. Version and operating system.
2. What is monitored: a sound card (which interface, which channel pairs) or streams (Icecast/Shoutcast, MP3, AAC, Ogg Vorbis, Opus).
3. Typical programme: music with crossfades, speech with pauses, long silences by design?
4. Which alert channels are set up, and what `Send test` says. Never ask for passwords, tokens or webhook addresses.

If the user's version is newer than 26.11.3, say so before answering: this guide may not cover what changed, so mark what may be out of date and point to the latest guide at https://onairgarage.com/tools/dead-air-watchdog-guide/.

## Procedure

1. **Add inputs** (Settings, Inputs): `Add sound card` (choose the device and the channels: a pair from 1-2 up to 15-16, or a single channel, `Channel 1 only (mono)` to `Channel 16 only (mono)`; one input per choice. The list shows only the channels the card really has; a saved choice stays even if the card lacks it. A single channel shows one level meter. Above 8 channels it is not tried on real hardware: if the card delivers fewer channels than asked, the input reports a problem) or `Add stream` (an `http://` or `https://` address; credentials inside the address are masked). Name each input; the name appears on the tile, in alerts and in the log.
2. **Set threshold and time**: default -50 dBFS and 30 seconds. The loudest channel is compared with the threshold; silence means all channels are below it. Below the threshold the input is counting (yellow); when it lasts the configured time it becomes an alarm (red) and alerts go out. Audio is back only after 2 seconds at or above the threshold in a row (or 2 seconds in total within 5), so speech with pauses is not treated as silence.
3. **More options per input**: `Yellow after...` (2 seconds by default), monitoring hours (days and hours, also past midnight, with their own threshold and time), for a stream, `Show the song title (now playing) on the tile` (off by default: the title the Icecast or Shoutcast server announces appears under the input state in the Dashboard, the compact view while the input is OK, and the Wall display; the app asks the server with one short extra request every 20 seconds, only while monitoring and while the window is on screen; a server that sends no titles shows nothing), and the frozen-audio alarm (off by default; level within a small range, 1 dB by default, for at least 10 seconds although above the threshold: a steady tone, stuck loop or constant noise).
4. **Alerts** (Settings, Alerts): email (SMTP; an encrypted connection is required with a user name, usually port 465 TLS or 587 STARTTLS; recipients in Bcc), Telegram (bot token and chat ids), HTTP webhook (POST JSON or GET, optional Authorization header), desktop notification and optional alarm sound, repeat every N minutes, grouping of several inputs (60 seconds by default). Use `Send test` on each channel.
5. **Heartbeat** (optional): a GET request every 1 to 60 minutes to a service that alerts when it stops (for example Healthchecks.io). It is how you learn that the computer itself is down or asleep.
6. **Display**: Compact view (small window, one row per input), Always on top, and Wall display (full screen, large tiles, glow when something is wrong). The compact view has no menu bar if `Settings, General, Display, Hide the menu bar in the compact view` is on (right-click the window or press Alt to bring it back); the compact view also opens from the Window menu, and the wall display names go up to `Very large`. Pause alerts per input for 1 hour or until 06:00 tomorrow for maintenance; the input is still measured.

**Troubleshooting**
- False alarms during speech: lower the threshold or raise `Alert after`.
- An input says "offline": device removed, stream down or engine stalled; the app reconnects by itself and counts it as dead air with cause offline.
- An input stays red after you changed the device or channel: fixed in 26.11.2; update. Before, the old problem stayed on screen although the audio was there.
- A sound card says "not found": the saved device is gone; reconnect, `Refresh list`, choose it again. It is never swapped for another card.
- A card in exclusive use by another program on Windows cannot be opened.
- No alert arrives: use `Send test` and read the error message; check the cause of failure (SMTP encryption, token, chat id).
- The event log fills with micro-silences: switch them off for all inputs in Settings, General, or per input in More options.
- A stream plays a filler when the source drops: the monitor hears that audio, not silence.
- macOS microphone prompt: the OS treats every audio input as a "microphone"; the app only measures the level ten times per second and records, stores and sends nothing. Monitoring a stream needs no permission.
- macOS "damaged / cannot be opened": System Settings, Privacy & Security, Open Anyway; for an earlier version run `xattr -cr "/Applications/Dead Air Watchdog.app" && codesign --force --deep -s - "/Applications/Dead Air Watchdog.app"`. Windows SmartScreen: More info, Run anyway. Linux: `chmod +x`, `libfuse2` if needed.
- Update checksum mismatch: the file was deleted; retry or download by hand.

## Reference

- Level measured every 100 ms in dBFS; plain level, not loudness; not a certified instrument. If the program does not run for more than 10 seconds the countdown is dropped and the period is logged as a monitoring gap.
- Event log: start, end, duration, cause (silence, input offline, frozen audio), pauses and micro-silences (kept 30 days by default); filter and export CSV or JSON. Summary: availability per input for this month, last month, 7 or 30 days. Events from several inputs within 10 seconds are marked "Common problem" (probably network or computer).
- Backup: `dead-air-watchdog-backup-YYYY-MM-DD.json`; passwords and tokens left out unless the box is ticked (then written in plain text with a warning); encrypted values cannot be read on another computer or account.
- Alert messages start with `[Dead Air Watchdog · name of the installation]`; the wording of each kind can be customised.
- Limit: 32 inputs. While the computer is asleep or the app is closed nothing is monitored.

## Sources

- Dead Air Watchdog 26.11.3 manual (English, `docs/manual/manual.en.md`) and CHANGELOG from github.com/djgragra/dead-air-watchdog, read on 2026-11-13.

## Limits

- Status is "to validate": written from the manual by an AI assistant, not yet reviewed by the author.
- Tied to version 26.11.3. It cannot see the user's inputs or network. Threshold and time are starting points to test on the real programme.
- Not a replacement for a redundant, hardware-based silence detection where regulations or contracts require it.
