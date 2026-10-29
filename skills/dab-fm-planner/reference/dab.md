# DAB capacity notes

- Capacity unit (CU): 64 data bits per frame slot; the main service channel has 864 CU in mode I.
- EEP set A (ETSI EN 300 401 V2.1.1, table 9): bitrate 8n kbit/s, CU = 12n, 8n, 6n, 4n for levels 1-A to 4-A (coding rates 1/4, 3/8, 1/2, 3/4).
- EEP set B (table 10): bitrate 32n kbit/s, CU = 27n, 21n, 18n, 15n for levels 1-B to 4-B (coding rates 4/9, 4/7, 4/6, 4/5).
- A DAB frame (CIF) has 864 CU of 64 bits (55,296 bits).

| Profile | Factor | 32 kbit/s | 64 kbit/s | 96 kbit/s |
|---|---|---|---|---|
| 1-A | 12 | 48 | 96 | 144 |
| 2-A | 8 | 32 | 64 | 96 |
| 3-A | 6 | 24 | 48 | 72 |
| 4-A | 4 | 16 | 32 | 48 |

Computed with `scripts/dab.mjs`. The formulas and the 864 CU figure are the ones documented, with the ETSI clause, in the README of the OnAir Garage DAB+ Calculator (which states it checked them against ETSI EN 300 401 V2.1.1 and found the draft V2.2.1 unchanged). Check the result on the multiplexer: this is not a certified tool.

## EEP-B examples (computed)

| Profile | 32 kbit/s | 64 kbit/s | 96 kbit/s | 128 kbit/s |
|---|---|---|---|---|
| 1-B | 27 | 54 | 81 | 108 |
| 2-B | 21 | 42 | 63 | 84 |
| 3-B | 18 | 36 | 54 | 72 |
| 4-B | 15 | 30 | 45 | 60 |
