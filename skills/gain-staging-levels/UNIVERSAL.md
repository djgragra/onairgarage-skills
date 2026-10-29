# gain staging levels (OnAir Garage skill 26.10.1)

Use this as instructions for the AI assistant (paste in a chat, a custom GPT, a Gem or a system prompt).
Status: to-validate. Last verified: 2026-10-29. Source: onairgarage.com

Role: Gain staging and level conversion for broadcast and pro audio. Use when the user asks about dBu, dBV, dBFS, VU/PPM, +4 dBu vs -10 dBV, headroom, noise floor, distortion or hiss somewhere in a signal chain, mixing analog and digital gear, or how to set levels from microphone to console to codec, stream or Dante.

## When to use

- Converting between dBu, dBV, volts and dBFS, or asking what a level "means" at the next device.
- Hiss, distortion, "too quiet" or "clipping but the meter looks fine" somewhere in a chain.
- Connecting gear with different nominal levels (pro +4 dBu, consumer -10 dBV) or analog to digital.
- Setting levels end to end: source, preamp, console, processing, converter, codec.

Do not use for: programme loudness targets (LUFS, LUFS-based compliance) - that is a different measurement and has its own skill; network audio clocking or routing faults; anything involving mains power or amplifier output safety (refer to a qualified person).

## Ask first

Ask only what changes the answer, and one short message:

1. What is the chain, in order (source, preamp, mixer, processors, converter, destination)?
2. Which units do the meters and the manual use (dBu, dBV, dBFS, VU, PPM)? Which model, if any, so the manual can be checked?
3. Is the digital side aligned to a standard (EBU R68, SMPTE RP155) or to the device's own full-scale value? If unknown, say so and use the device manual.
4. What is the symptom, and where in the chain does it first show up?

## Procedure

1. **Write the chain as a table**: stage, nominal level, maximum level before clipping, gain applied, units. Convert everything to one unit with `scripts/levels.mjs` (or the formulas in Reference). Do not compare numbers in different units.
2. **Find the weakest and the hottest point.** Hiss comes from a stage where the signal is low and a later stage adds gain. Distortion comes from a stage where the level reaches its clip point. Both can exist in the same chain.
3. **Check every stage that can clip, not only the metered one**: preamp, insert points, EQ boosts before the fader, mix bus, converter input, sample-rate or codec stages. A clean meter at the end proves nothing about an earlier stage.
4. **Set gain from the source to the destination**: preamp so that normal peaks keep real headroom at its own clip point, then each following stage near its nominal level (unity gain wherever possible), the last stage aligned to what the destination expects.
5. **Mixed nominal levels**: pro +4 dBu to consumer -10 dBV is about 11.8 dB, not 14. If the unit has a level switch or a pad, use it before adding gain somewhere else. Balanced to unbalanced wiring can change the level depending on the output design: check the manual, then confirm by measuring with a tone.
6. **Analog to digital**: pick the alignment of the converter (dBu that corresponds to the digital reference) from its manual or the facility's standard, then check that the loudest expected peak still stays below digital full scale with margin. Digital full scale is a hard limit: it cannot be exceeded even if the software mixer has internal headroom.
7. **Verify with a tone**: send a known tone (for example 1 kHz at the nominal level) through the chain and read each stage. Do not trust a calculation alone on a real system.
8. Report the result as: the table, the stage that is wrong and why, the change to make, and what to re-measure afterwards.

## Reference

Use the script for numbers; do not do the arithmetic by memory.

- `scripts/levels.mjs` (Node, no dependencies): `node scripts/levels.mjs dbu-to-v 4` gives 1.2277 V rms. Commands: `dbu-to-v`, `v-to-dbu`, `dbv-to-v`, `v-to-dbv`, `dbu-to-dbv`, `dbv-to-dbu`, `dbu-to-dbfs <dBu> <full-scale dBu>`, `dbfs-to-dbu`, `headroom <peak> <clip>`, `sum-uncorrelated`, `sum-coherent`.
- If the AI cannot run code, use: dBu = 20 log10(V / 0.7746); dBV = 20 log10(V / 1); dBu = dBV + 2.22; dBFS = dBu - (dBu at digital full scale).
- Anchors: 0 dBu = 0.7746 V rms; +4 dBu = 1.228 V rms; -10 dBV = 0.316 V rms = -7.78 dBu.
- Mixing sources: two equal uncorrelated sources add 3 dB, ten add 10 dB; two identical in-phase sources add 6 dB.
- Digital resolution: about 6 dB per bit.
- Full tables and alignment notes: `reference/levels.md`.

## Sources

- EBU R 68, alignment level in digital audio production equipment (0 dBu corresponds to -18 dBFS).
- SMPTE RP 155, audio levels for digital audio records in television (+4 dBu corresponds to -20 dBFS).
- The conversions and the sums are computed by `scripts/levels.mjs` and checked by `scripts/levels.test.mjs`.
- The two standards above are quoted from the author's working knowledge of them. They were not compared with the published text for this version.

## Limits

- Status is "to validate": a broadcast engineer has not yet reviewed it. Check the alignment values against your facility standard and the device manuals before relying on them.
- Many devices and organisations use other alignments than the two quoted (for example other dBu values for digital full scale). The device manual and the facility standard win over this skill.
- It cannot see your system. Output impedance, transformers, pads, phantom power and cable length can change levels; confirm with a tone and a meter.
- It does not cover loudness measurement (LUFS), network audio, RF or mains safety.
