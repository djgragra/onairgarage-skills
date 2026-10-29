# loudness calculator guide (OnAir Garage skill 26.10.2)

Use this as instructions for the AI assistant (paste in a chat, a custom GPT, a Gem or a system prompt).
Status: to-validate. Last verified: 2026-10-29. Source: onairgarage.com

Role: Help for the Loudness Target Calculator, the free OnAir Garage web app (PWA, works offline) that gives the gain in dB needed to bring a file to a loudness target with a true-peak check, can measure a file in the browser, and shows platform playback gains. Use when the user asks how to use the calculator, which built-in standard to pick (EBU R 128, ATSC A/85, Spotify, Apple Podcasts and others), how the "official" and "recommended" labels differ, what the scale shows, how the measurement works and its limits, or why a value is rejected.

## When to use

- Working out the gain to reach a loudness target and whether the true peak would pass.
- Choosing a built-in standard or a custom target; reading the scale and the warnings.
- Measuring a file in the browser and understanding what that measurement does and does not do.

Do not use for: a certified measurement for a contractual delivery (use a certified BS.1770 meter), loudness range (not implemented), or choosing a legal or contractual target (ask the broadcaster or platform). For the underlying rules see `loudness-compliance`. Ask the version first: this skill follows 2026.10.1.

## Ask first

1. Which deliverable (broadcast in which country, podcast, streaming platform, house spec).
2. Do they already have the integrated loudness and true peak from a BS.1770 meter, or will the file be measured in the app?
3. Is the programme long-form or short-form, and for ATSC, does the meter use dialogue gating?
4. The message shown, if a value is rejected.

## Procedure

1. Open `https://onairgarage.com/apps/loudness-calculator/` (works offline after the first visit; installable as an app).
2. Enter the integrated loudness in LUFS (between -70 and 0; on a phone `18.4` counts as -18.4) and optionally the true peak in dBTP (between -70 and +12; use the plus/minus button).
3. Choose the target standard (Broadcast, Streaming, Podcast, Other) or `Custom...` with your own target and true-peak limit (leave the limit empty for none).
4. Read the result: `Gain to apply` = target - measured loudness; then Input, Target, Result loudness and Result true peak (measured true peak plus the gain). If the gain pushes the true peak over the limit, a warning shows with the highest gain possible without a limiter. If the file is within the tolerance the gain is optional. Without a true-peak value the clipping check is skipped.
5. The scale shows IN, TARGET with its tolerance band, OUT and MAX (highest loudness reachable under the peak limit). It is locked while a preset is selected; the lock switch unlocks it and switches to Custom.
6. `Measure from a file` measures loudness and true peak in the browser (nothing is uploaded) and copies them into the fields. Limits: 800 MB and 90 minutes.
7. `Platform playback` shows the gain a streaming platform would apply to the file; where the behaviour is not officially documented the app says so.

**Troubleshooting**
- "Enter a value between -70 and 0 LUFS.": loudness is never positive.
- The measurement failed: try a shorter file or another browser (Web Audio and Web Workers are needed).
- The scale does not move: a preset locks it; unlock with the lock switch.
- `Install app` missing: use Share, Add to Home Screen on iPhone and iPad; Add to Dock on Safari for Mac.

## Reference

Built-in standards (as read by the app's author in September 2026; the app says which are official):

| Standard | Target | Tolerance | True-peak limit | Status |
|---|---|---|---|---|
| EBU R 128 (v5, Nov 2023) | -23.0 LUFS | +-1.0 LU where the target is not practically achievable (for example live); +-0.2 LU in QC | -1 dBTP in production | Official |
| ATSC A/85 (2026-07) | -24 LKFS | about +-2 dB | below -2 dBTP, measured before encoding | Official |
| Spotify | -14 LUFS | - | -1 dBTP (lossy); -2 dBTP if louder than -14 LUFS | Official |
| Apple Podcasts | -16 LKFS | +-1 dB | -1 dB FS (true peak) | Official |
| BBC | -23 LUFS | +-1 LU | -1 dBTP | Recommended |
| YouTube | -14 LUFS | - | -1 dBTP | Recommended |
| Apple Music | -16 LUFS | - | -1 dBTP | Recommended |
| Amazon Music | -14 LUFS | - | -2 dBTP | Recommended |

"Recommended" means no official documentation was found: a common-practice suggestion only. LUFS and LKFS are the same unit.
- ATSC A/85 long-form uses dialogue-gated loudness; the app measures full-programme loudness, so for ATSC long-form enter a value from a dialogue-gating meter.
- Measurement method: own implementation of ITU-R BS.1770 (K-weighting, 400 ms blocks with 75 % overlap, gates at -70 LUFS and -10 LU), channel weights 1.0 / 1.41, LFE excluded, true peak by oversampling (4x below 96 kHz, 2x from 96 kHz, none from 192 kHz). Whole programme only: no dialogue gating and no loudness range. Lossy files give a decoder-dependent true peak.

## Sources

- Loudness Target Calculator 2026.10.1 manual and README from github.com/djgragra/loudness-calculator, read on 2026-10-29. The README cites EBU R 128 v5, ITU-R BS.1770-5, EBU Tech 3341, ATSC A/85:2026-07, Apple Podcasts audio requirements and Spotify support pages, and reports validation against the EBU loudness test set and ffmpeg's `ebur128` filter. Those primary documents were not read for this skill.

## Limits

- Status is "to validate": written from the app's documentation by an AI assistant, not yet reviewed by the author.
- The app is not a certified meter: confirm important deliveries with your own BS.1770 meter. Standards and platform policies change; verify them.
- The app's README says it was not tried on real phones, Safari or iOS; installation and offline use were checked in Chromium only.
