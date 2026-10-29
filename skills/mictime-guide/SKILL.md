---
name: mictime-guide
description: Help for MicTime, the free OnAir Garage talk timer: a signal (MIDI message, key or audio level) starts the count, the next signal stops it, the total stays on screen and the timer returns to zero. Use when the user asks how to connect a console or controller by MIDI, assign Learn, use a key or audio level as the signal, build programs with steps and time limits, set colours and alerts at the limit, use compact view or full screen, export the speech list, back up, update, or fix signals that do not arrive.
version: 26.10.2
status: to-validate
last_verified: 2026-10-29
---

## When to use

- Setting up MicTime: signals (MIDI, key, audio level), time limits, programs with steps, colours and alerts.
- Signals that do not arrive, double signals, steps that skip, or a beep that goes on air.
- Compact view, full screen, the speeches list and CSV, backups, updates, install warnings.

Do not use for: the MicTime timer inside G-Clock (see `g-clock-guide`, same options), or MIDI device configuration of a console itself (use its manual). Ask the version first: this skill follows 26.10.4. Details of the MIDI messages are in the app's `MIDI-SPEC.md`.

## Ask first

1. Version and operating system.
2. The signal source: a console button or fader (which message: note, controller, program change), a key, or an audio level; is the sender on the same computer (virtual port) or a hardware device?
3. How the signals work: one signal (first starts, next stops) or two signals (one starts, one stops).
4. What the monitor ("Incoming messages") shows when the user presses the button.

## Procedure

1. **MIDI**: connect the device (or the virtual port of the sending software); `Refresh` if it is not listed. Choose the MIDI input or "All inputs". Press `Learn` next to Start / stop (or Start, Stop, Reset), then send the message from the console. Set the channel to any if the source changes it. A value above 0 is on, 0 is off; only on acts, except when Start and Stop are the same message (on starts, off stops).
2. **Keyboard**: `Set key`, press the key or combination (`Esc` cancels). With Global shortcut on, a modifier (Ctrl, Alt, Shift), an F key, a numpad key or a media key is needed, so normal typing is not taken over. On Linux a global shortcut may not work on every desktop (for example Wayland): use the key with the window in front, or MIDI.
3. **Audio level**: off by default; choose the input, set the threshold (the orange line on the meter) and the hold time. The count starts when the level reaches the threshold and stops when it stays below it for the hold time. Needs the microphone permission; only the level is measured, nothing is recorded or sent.
4. **Time limit or program**: a single time limit (00:00 = none), or a program of up to 40 steps with a name and a limit each (up to 8 programs). After each speech the next step is armed by itself; `Reset` cancels the count and does not move to the next step. At the end of the program: start again, or go on without a limit. Previous step, Next step and Restart can be assigned to signals.
5. **Colours and alerts**: figures are grey at zero, in the counting colour while counting, in the warning colour from N seconds before the limit (10 by default), red once the limit is passed, and blink slowly if passed by M seconds (10 by default). With "reduce motion" on a steady red frame appears instead. Optional one short beep and/or flash at the limit (off by default).
6. **Display**: full screen (`F11`, button, or double-click the figures; `Esc` leaves), compact view (small always-on-top window, not remembered at the next start). `Speeches` shows the last 20 speeches of the session; `Copy`, `Save CSV...`, `Clear`. They are kept in memory only.

**If nothing arrives**
1. Does the monitor show anything? If the sender is on the same computer, a virtual port connects the two.
2. Is the port in "Ports seen by the system"? If not, `Refresh`.
3. The sender shows activity but nothing arrives (for example loopMIDI's Total data stays at 0): in a test on Windows, a virtual port that had been created once passed nothing until it was removed and created again. Recreate the port, restart the sender, `Refresh`.
4. Two programs on the same input may not both receive: close the other one to see if it changes anything.

**Double signals**: some consoles send two messages for one press: set "Ignore a repeated signal within" (300 ms by default; reset is never ignored).

**Beep goes on air**: the beep comes out of the computer's default output; if that feeds the mixer or stream, use the flash, or send the computer's sound to a monitor only.

**Install warnings and updates**: macOS Open Anyway (System Settings, Privacy & Security); for 26.10.2 or older run `xattr -cr /Applications/MicTime.app && codesign --force --deep -s - /Applications/MicTime.app`. Windows SmartScreen: More info, Run anyway. Linux: `chmod +x`. Updates are checked once a day, verified against SHA-256 and installed only on a click.

## Reference

- Screen words: READY, COUNTING, TOTAL. Format `mm:ss`, `h:mm:ss` from one hour. The total stays 1-600 seconds (5 by default) or until the next start with "Never reset by itself".
- Backup: `mictime-backup-YYYY-MM-DD.json` (MIDI messages, keys, audio and timer settings, programs, colours, language, theme; no passwords). Import: replace everything, or add only what is missing.
- The program position is remembered when the app closes but is not part of the backup.
- Keep the PC on and MicTime open; while open the system is kept from suspending.

## Sources

- MicTime 26.10.4 manual (`docs/MANUAL.md`) from github.com/djgragra/mictime, read on 2026-10-29.

## Limits

- Status is "to validate": written from the manual by an AI assistant, not yet reviewed by the author.
- Tied to version 26.10.4. Not a certified instrument: the count follows the computer's clock and the arrival of the signals; a signal that never arrives gives the wrong total.
- It cannot see the user's MIDI devices or console configuration.
