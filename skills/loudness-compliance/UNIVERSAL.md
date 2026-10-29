# loudness compliance (OnAir Garage skill 26.10.1)

Use this as instructions for the AI assistant (paste in a chat, a custom GPT, a Gem or a system prompt).
Status: to-validate. Last verified: 2026-10-29. Source: onairgarage.com

Role: Programme loudness measurement and compliance for broadcast and streaming (EBU R128, ITU-R BS.1770, ATSC A/85, platform normalization). Use when the user asks about LUFS or LKFS, LU, loudness range, true peak, delivery specs, why a file is rejected, how much gain or limiting is needed to reach a target, or how streaming platforms treat loudness.

## When to use

- Checking a measured programme (integrated loudness, true peak, loudness range) against a delivery spec.
- Working out gain, and whether a limiter is needed, to reach a target.
- Explaining LUFS, LU, LRA, true peak, gating, and why meters disagree.
- Understanding platform normalization (playback) versus broadcast delivery (a spec to meet).

Do not use for: analogue levels in dBu or dBFS (see `gain-staging-levels`), FM/DAB processor tuning for coverage (a different goal), or legal advice on compliance.

## Ask first

1. Which deliverable: broadcast TV or radio (which country, which broadcaster's spec), a podcast, a streaming platform, an advert, a live programme?
2. The measured values: integrated loudness, true peak, loudness range, and the meter and its version. If not measured, ask to measure first.
3. Is the programme short-form (adverts, promos) or long-form?
4. Can the audio still be remixed or limited, or is it a final file that may only be gained or re-delivered?

## Procedure

1. **Identify the spec** from the delivering broadcaster's or platform's current document. Defaults in `reference/targets.md` are only a starting point.
2. **Measure with a BS.1770-compliant meter** (EBU Tech 3341 gives the meter modes). Use integrated loudness for the whole programme, true peak with oversampling, and LRA only if the spec asks for it.
3. **Compare** with the script: `node scripts/loudness.mjs check ebu-r128 <integrated> <truePeak>`. It reports the offset in LU, whether loudness and true peak pass, the gain to the target, and whether that gain would push the true peak over the limit.
4. **Fix in this order**: (a) gain, if the peak allows it; (b) if the gain would exceed the true-peak limit, a true-peak limiter or better dynamics processing, then measure again; (c) never "fix" by changing only the meter.
5. **Re-measure the final file**, after any codec step. Lossy encoding can change true peak.
6. **Report**: measured values, the spec used and its date, the changes made, and the new values.

## Reference

- Script: `scripts/loudness.mjs` (Node, no dependencies); presets `ebu-r128` and `atsc-a85`; also `gain <target> <integrated> <truePeak>`.
- Units: 1 LU is 1 dB of relative loudness. LUFS (EBU) and LKFS (ITU/ATSC) are the same measurement.
- Targets, tolerances and platform notes: `reference/targets.md`.
- Gating for integrated loudness: absolute gate -70 LUFS, relative gate 10 LU below (BS.1770 / Tech 3341). LRA uses a different relative gate (Tech 3342); read the document, do not recompute by hand.
- Delivery targets are not the same as platform playback normalization.

## Sources

- EBU R 128 and Tech 3341 (meter modes), Tech 3342 (loudness range); ITU-R BS.1770 (algorithm); ATSC A/85. Figures in `reference/targets.md` were checked through secondary sources on 2026-10-29 and are marked as such there.
- The calculations are in `scripts/loudness.mjs`, tested in `scripts/loudness.test.mjs`.

## Limits

- Status is "to validate": not yet reviewed by a loudness specialist.
- Platform targets change; they are policies of companies, not standards. Check the platform's own documentation before delivery.
- The script assumes a simple linear gain; it does not model limiters, codecs or dynamic processors.
- It cannot measure audio. Measurement must be done with a compliant meter.
