# DAB capacity notes

- Capacity unit (CU): 64 data bits per frame slot; the main service channel has 864 CU in mode I.
- EEP set A sub-channel size: factor x (bitrate / 8) CU, bitrate multiple of 8 kbit/s.

| Profile | Factor | 32 kbit/s | 64 kbit/s | 96 kbit/s |
|---|---|---|---|---|
| 1-A | 12 | 48 | 96 | 144 |
| 2-A | 8 | 32 | 64 | 96 |
| 3-A | 6 | 24 | 48 | 72 |
| 4-A | 4 | 16 | 32 | 48 |

Computed with `scripts/dab.mjs`. Verify against ETSI EN 300 401 before a real multiplex plan.
