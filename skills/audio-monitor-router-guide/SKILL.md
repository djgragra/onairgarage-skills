---
name: audio-monitor-router-guide
description: Help for Audio Monitor Router, the free OnAir Garage Windows app that works as a routing matrix for the audio devices of the computer: choose which input you hear on which output, with volume, channel buttons and level meters, including the receive pairs of Dante Virtual Soundcard. Use when the user asks how to route an input to headphones or monitors, use the matrix, LISTEN, mono and L/R buttons, signal speakers, latency settings, hiding devices, custom names, or fix no sound, clicks or missing devices.
version: 26.10.2
status: to-validate
last_verified: 2026-10-29
---

## When to use

- Hearing a computer audio input (a sound card input, or the receive pairs of Dante Virtual Soundcard) on headphones, monitors, HDMI or another card.
- Understanding the matrix, the LISTEN buttons, DEFAULT badges, loop warnings and signal speakers.
- No sound, clicks, devices missing or hidden, engine errors.

Do not use for: changing Dante subscriptions (the app never does; that stays in Dante Controller), recording or live playout (the app is for monitoring), macOS or Linux (macOS is planned, Linux is not). Ask the version first: this skill follows 26.10.2. For Dante network problems see `dante-aoip-troubleshooter`.

## Ask first

1. Version and Windows version (the app needs Windows 10 or later, 64-bit).
2. Which input and which output (card names as Windows shows them); is a Dante Virtual Soundcard involved?
3. What is heard: nothing, clicks, wrong side, delay too long?
4. Is any other program using the device exclusively?

## Procedure

1. Install `Audio-Monitor-Router-Setup-<V>.exe` from the releases page and check it against `SHA256SUMS.txt`. If SmartScreen appears, More info, Run anyway. No Python is needed.
2. In the matrix, rows are sources (inputs) and columns are outputs, grouped by sound card. Press `LISTEN` where a source meets an output to hear it there; press again to stop. One source per output; several outputs can play at the same time.
3. Under each output: volume slider; `L`, `R` and `MONO` (L and R are lit while that channel is heard; MONO sums left and right and plays the result on both sides); level meter (peak of what the app plays, only while a source is listening).
4. Stereo endpoints are one row or column; a mono endpoint is heard on both sides; a device with more than two channels is split in pairs (1-2, 3-4...).
5. Rename ports by double click (names are kept on this computer). Hide or show cards and ports in Settings, Devices. Network transmit outputs (such as the Transmit pairs of Dante Virtual Soundcard) are hidden by default; `Show network transmit outputs` brings them back.
6. Loop warning: if a route could send audio back into the card it comes from, the app asks for a second click. It compares cards, not the real signal path, so it can warn when there is no loop: confirm if you know it is fine.
7. Latency (Settings): Minimum (30 ms buffer), Normal (60 ms, the default), Safe (120 ms). Smaller means less delay but a higher risk of clicks; Windows adds its own delay.

**Troubleshooting**
- No sound on an output: check it is the right output, the volume is not zero, L and R are lit, and no other program uses the device exclusively.
- Clicks: choose a larger latency.
- "The audio engine could not be started": read the message; antivirus programs sometimes block a new program, allow it and start again.
- A device is missing: press `Refresh devices` (it restarts the running routes for a moment), or check Settings, Devices for hidden ones. A device plugged in while something plays appears after Refresh, or by itself when nothing is playing.
- A device unplugged: it disappears and its route stops; when it returns its names and route come back.
- Signal speakers cause trouble: they open one extra input for each visible source; switch them off in Settings, General.
- Reporting a problem: Settings, Help & About, `Copy support info` (version and system, never settings) and `Open logs folder`.

## Reference

- Signal speaker on a source: lights above -60 dBFS held for about a second (like Dante Controller). On an output: lights when any program plays on it (the level Windows measures for that device).
- Closing the window keeps the app running in the notification area (menu: Open, Quit). Start at sign-in is off by default.
- The app only reads and plays the audio of this computer. It never changes network subscriptions or sound card settings and contacts no address by itself.
- Only shared-mode (WASAPI) endpoints are used, so the app never takes a card away from other programs.

## Sources

- Audio Monitor Router 26.10.2 manual (English, `docs/manual/manual.en.md`) from github.com/djgragra/audio-monitor-router, read on 2026-10-29.

## Limits

- Status is "to validate": written from the manual by an AI assistant, not yet reviewed by the author.
- Tied to version 26.10.2. The delay is not zero (60 ms by default, not measured on real hardware) and Windows adds its own.
- The app has been tried on one Windows 11 computer only: other sound cards and drivers, long unattended runs, devices unplugged during playback and many network pairs at once are not tried.
- Windows does not tell whether an endpoint is speakers, headphones or HDMI, so the app cannot show it. Two cards with exactly the same name can swap places if the system reorders them.
