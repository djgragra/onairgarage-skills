---
name: dab-fm-planner
description: Planning help for DAB/DAB+ multiplexes and FM audio chains. Use when the user asks about DAB+ capacity units, bitrate and protection levels, how many services fit in a multiplex, audio quality versus bitrate, pre-emphasis and deviation for FM, or MPX level and RDS basics.
version: 26.10.2
status: to-validate
last_verified: 2026-10-29
---

## When to use

- How many DAB+ services fit in a multiplex with a given bitrate and protection level, and how much space is left.
- Trading bitrate, protection and number of services; explaining capacity units (CU).
- Basics of FM: pre-emphasis, deviation, MPX, RDS, stereo pilot.

Do not use for: coverage prediction and licences (they need a planning tool and the regulator), transmitter power or RF safety (involve a qualified engineer), or encoder-specific settings (use the vendor manual).

## Ask first

1. DAB, DAB+ or FM? Country and regulator (some set bitrate or protection rules).
2. The list of services with bitrate and protection profile (typically EEP 3-A for DAB+).
3. What matters: more services, more robustness, or better audio?
4. For FM: pre-emphasis in use (50 us in Europe, 75 us in the Americas), processor and RDS encoder, and what the transmitter measures.

## Procedure

### DAB and DAB+

1. Take each service's bitrate (a multiple of 8 kbit/s for EEP-A, of 32 kbit/s for EEP-B) and its protection profile (1-A to 4-A, or 1-B to 4-B).
2. Compute capacity units with the script: `node scripts/dab.mjs 3-A 64 64 72 80` (for EEP-B use for example `node scripts/dab.mjs 3-B 64 96`). It sums the units used and shows the remaining units out of 864.
3. If it does not fit: lower bitrates, use fewer services, or lower protection (more robust profiles use more units). State the trade-off to the user, who chooses.
4. Note that DAB+ audio uses HE-AAC; the useful bitrate for a given quality depends on the encoder and the material (speech needs less than music). Listen tests are required: do not give a quality verdict from the number alone.
5. Check the final plan against the regulator's or the multiplex operator's rules, and the encoder's own limits (some encoders add overhead for data services and PAD).
6. Report the table of services, total units used, free units, and what was assumed.

### FM, general

1. Pre-emphasis must match the receiver standard (50 us or 75 us); the processor and transmitter must agree.
2. Deviation and MPX level are limited by regulation (commonly 75 kHz peak deviation); the exact limits and measurement method come from the regulator.
3. Stereo pilot and RDS injection have defined levels as a fraction of deviation. Use the transmitter and processor manuals and the regulator's limits; do not guess values.
4. Diagnose problems with an MPX analyser or deviation meter; this skill does not replace them.

## Reference

- Total main service channel capacity: 864 CU (transmission mode I).
- EEP set A (table 9): bitrate 8n kbit/s, CU = 12n, 8n, 6n, 4n for levels 1-A to 4-A. EEP set B (table 10): bitrate 32n kbit/s, CU = 27n, 21n, 18n, 15n for levels 1-B to 4-B. Example: 64 kbit/s at 3-A = 48 CU; 18 such services fill 864 CU.
- Examples of real multiplex listings agree with this formula (64 kbit/s at 3-A = 48 CU, 80 kbit/s = 60 CU, 72 kbit/s = 54 CU).
- Details and notes in `reference/dab.md`.

## Sources

- ETSI EN 300 401 V2.1.1 (2017-01), clause 6.2.1, tables 9 and 10 (sub-channel sizes) and the 864 CU frame: as documented, with the clause, in the README of the OnAir Garage DAB+ Calculator, which states it checked the tables (112 values) and that the draft V2.2.1 (2026-02) is unchanged; also consistent with published multiplex listings. The ETSI text was not opened for this skill. ETSI TS 102 563 covers DAB+ audio.
- FM: ITU-R BS.450 (FM sound broadcasting emission standards) and the regulator's rules in each country. Not reproduced here.

## Limits

- Status is "to validate": not yet reviewed by a DAB or FM engineer.
- Table values are for EEP sets A and B; UEP (unequal error protection) profiles are not included.
- No coverage, power, antenna or interference advice.
- Data services, PAD and encoder overhead can use capacity not shown by this calculation.
