# Loudness targets

Checked and documented by the author of the OnAir Garage Loudness Target Calculator in September 2026, with the primary
document named for each row. This skill's author read them through that app's README (26.10.2 revision, 2026-10-29), not
in the original documents. "Official" means read from the primary document; "Recommended" means no official
documentation was found: a common-practice suggestion only.

| Standard | Target | Tolerance | True-peak limit | Status | Primary document |
|---|---|---|---|---|---|
| EBU R 128 (v5, Nov 2023) | -23.0 LUFS | +-1.0 LU where the target is not practically achievable (for example live); +-0.2 LU in QC | -1 dBTP in production (meter tolerance +-0.3 dB) | Official | EBU R 128 v5, recommendations h), i), m) |
| ATSC A/85 (2026-07) | -24 LKFS (no metadata, no other agreement) | about +-2 dB | below -2 dBTP, meter tolerance about +-0.5 dB, measured before encoding | Official | ATSC A/85:2026-07, section 6 and Table M.1 |
| Spotify | -14 LUFS | - | -1 dBTP (lossy); -2 dBTP if louder than -14 LUFS | Official | Spotify Support, loudness normalisation |
| Apple Podcasts | -16 LKFS | +-1 dB | -1 dB FS (true peak) | Official | Apple Podcasts for Creators, audio requirements (BS.1770-5) |
| BBC | -23 LUFS | +-1 LU | -1 dBTP | Recommended | EBU R 128 values; BBC delivery specification not read |
| YouTube | -14 LUFS | - | -1 dBTP | Recommended | No official value found |
| Apple Music | -16 LUFS | - | -1 dBTP | Recommended | No official value found |
| Amazon Music | -14 LUFS | - | -2 dBTP | Recommended | No official document found |

Notes
- LUFS and LKFS are the same unit (ITU-R BS.1770).
- ATSC A/85 defines long-form loudness as integrated dialogue loudness (dialogue-gated); only short-form content uses
  full-programme loudness. A meter without dialogue gating can give a different value for the same programme.
- EBU R 128 v5 lists +-0.5 LU only in its revision history (v3, 2014); the current text gives +-1.0 LU where the target is
  not practically achievable and +-0.2 LU as a quality-control tolerance.
- Platform "playback normalisation" and broadcast "delivery" are different things: a delivery spec must be met, a
  platform policy decides what the platform does to your file.
- Gating of integrated loudness: absolute gate -70 LUFS, relative gate 10 LU below (ITU-R BS.1770, EBU Tech 3341);
  loudness range uses a different relative gate (EBU Tech 3342): read the document.

Re-check before use: EBU R 128, ITU-R BS.1770, EBU Tech 3341, ATSC A/85, Apple Podcasts requirements and Spotify's page.
