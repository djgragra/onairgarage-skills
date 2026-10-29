# Level reference

All values are computed by `../scripts/levels.mjs`. Rounded to two decimals.

## Anchors

| Level | Volts rms | dBu | dBV |
|---|---|---|---|
| 0 dBu | 0.7746 | 0.00 | -2.22 |
| 0 dBV | 1.0000 | +2.22 | 0.00 |
| +4 dBu (pro nominal) | 1.2277 | +4.00 | +1.78 |
| -10 dBV (consumer nominal) | 0.3162 | -7.78 | -10.00 |
| +24 dBu | 12.28 | +24.00 | +21.78 |

Pro +4 dBu versus consumer -10 dBV: 11.78 dB.

## Digital alignment (dBu at 0 dBFS)

| Alignment | Reference | 0 dBFS | Note |
|---|---|---|---|
| EBU R 68 | 0 dBu = -18 dBFS | +18 dBu | Common in European broadcast |
| SMPTE RP 155 | +4 dBu = -20 dBFS | +24 dBu | Common in North American broadcast |

Others exist. Always read the converter's manual for its maximum input and output level, then compute the offset with `dbu-to-dbfs`.

## Summing

| Case | Rule |
|---|---|
| N equal uncorrelated sources | +10 log10 N dB |
| N equal identical in-phase sources | +20 log10 N dB |
