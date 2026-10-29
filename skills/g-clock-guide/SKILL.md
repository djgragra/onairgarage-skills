---
name: g-clock-guide
description: Help for G-Clock, the free OnAir Garage studio clock for radio presenters: 60-minute dial with stopsets and fixed events, news headlines from your own feeds, optional weather, On Air / Rec switch with a recording timer and programs, and an optional MicTime timer. Use when the user asks how to set stopsets, schedules or events, add feeds, use the REC timer and programs, run clock-only mode on a wall screen, set up the MicTime timer, back up, update, or fix a problem.
version: 26.10.2
status: to-validate
last_verified: 2026-10-29
---

## When to use

- Configuring G-Clock: stopset minutes and schedules, fixed events, headlines, weather, buttons, logo.
- Using the REC timer with programs and blocks, or the MicTime timer inside G-Clock.
- Install warnings, updates, backup, and common problems.

Do not use for: the separate MicTime app (see `mictime-guide`) or for studio automation. Ask the version first: this skill follows 26.10.6.

## Ask first

1. G-Clock version (Settings, Help & About) and operating system.
2. What the screen is for (presenter desk, wall display, recording) and its aspect ratio (the app is made for 16:9).
3. For timing questions: which minutes of the hour are ad breaks, news or jingles, and whether they differ by day and hour.
4. For MicTime: which signal starts and stops the timer (MIDI message, key, audio level) and the exact behaviour seen.

## Procedure

**Stopsets and events**
1. Settings, stopsets: enter the minutes of the hour (for example `0, 30`). They become the larger markers on the dial, turn red when close, and show their name during their minute.
2. For different minutes on certain days and hours, add stopset schedules. The first schedule that fits the clock's time applies; outside them the default minutes apply. A schedule can run past midnight (it belongs to the day it starts).
3. For events at a time of day (news at 18:00, an ad block at 18:20), add fixed events with their days. The clock shows the next one under the dial with a countdown, warns once at the number of seconds you choose (60 by default) and says NOW for ten seconds. Times follow the time zone of the clock.

**Headlines and weather**: add RSS/Atom feeds (https only). Only title, source, time and link are shown. A pill in the header says how many feeds answer. Weather is off by default and uses Open-Meteo; its credit stays visible while on.

**Wall display**: `Clock only` (Settings, General, or key `C` on the On Air screen) shows the dial alone. Feeds and cities stay configured and return when you switch it off. Full screen is `F` or `F11`; `Keep the screen on` is in Settings, General.

**ON AIR / REC** (key `O`): REC replaces the dial with the recording timer: free time or a program of blocks, a 3-2-1 pre-roll, pause and resume, overrun in red, optional beeps, several takes per block, dynamic timing between blocks, and a report (copy, text or CSV, one row per block in seconds plus a TOTAL row). Space starts and pauses, `N` ends the block, `R` resets. Programs can be imported and exported as JSON.

**MicTime timer inside G-Clock** (Settings, MicTime, off by default): the first signal starts the count, the next stops it, the total stays on screen for a few seconds and the timer returns to zero. Signals: a MIDI message (choose the input; `Learn` to assign; monitor of incoming messages), a key (global or with the window in front), or the level of an audio input (threshold and hold time; needs the microphone permission; audio is never recorded or sent). Limits can come from a program of steps (up to 8 programs of 40 steps). While it is off, nothing is listened to.

**Troubleshooting**
1. No headlines: add an https feed; check the pill in the header.
2. MIDI message does not arrive: open the monitor in Settings, MicTime, and press `Learn` again; choose the right input.
3. Times look wrong: the clock follows the computer's clock and the time zone chosen in Settings, General; keep the computer synchronised.
4. macOS "damaged / cannot be opened": System Settings, Privacy & Security, Open Anyway; for an earlier version run `xattr -cr "/Applications/G-Clock.app" && codesign --force --deep -s - "/Applications/G-Clock.app"`. Windows SmartScreen: More info, Run anyway. Linux: `chmod +x` the AppImage, `libfuse2` if needed.
5. Update checksum mismatch: the file was deleted; retry or download by hand.

**Backup and update**: Settings, Backup, Export saves everything (including MicTime timer settings) as `g-clock-backup-YYYY-MM-DD.json`; import can replace everything or add only what is missing. The file holds no passwords or keys. Updates are offered with a banner, checked against `SHA256SUMS.txt`, and installed only on a click.

## Reference

- Keys: `O` On Air / Rec, `S` settings, `C` clock only, `F` or `F11` full screen, Space start/pause, `N` end block, `R` reset.
- Blink on the last seconds of a countdown: Settings, "blink when seconds left" (60 by default, 0 = never); with "reduce motion" on nothing blinks.
- Network: only the feeds you add, Open-Meteo if the weather is on, and GitHub for the update check (can be switched off). No accounts, analytics or telemetry.
- Languages: English, Italian, Spanish. Theme: dark by default, light and system available.

## Sources

- G-Clock 26.10.6 manual (English, `docs/manual/manual.en.md`) from github.com/djgragra/g-clock, read on 2026-10-29. The MicTime timer's MIDI specification is in the mictime repository (`docs/MIDI-SPEC.md`).

## Limits

- Status is "to validate": written from the manual by an AI assistant, not yet reviewed by the author.
- Tied to version 26.10.6. It cannot see the user's configuration.
- Fixed event times are wall-clock times: a change of summer time moves nothing.
