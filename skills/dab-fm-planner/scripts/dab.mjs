// DAB/DAB+ multiplex capacity helper (EEP protection, sub-channel size in capacity units). No dependencies.
// CLI: node dab.mjs <protection 1-A..4-A or 1-B..4-B> <kbps> [<kbps> ...]
// Always check the result on the multiplexer: this is not a certified tool.

export const TOTAL_CU = 864; // capacity units available for the main service channel (mode I)
// ETSI EN 300 401 V2.1.1, clause 6.2.1:
// EEP set A (table 9): bitrate 8n kbit/s, CU = 12n, 8n, 6n, 4n for protection levels 1-A to 4-A.
// EEP set B (table 10): bitrate 32n kbit/s, CU = 27n, 21n, 18n, 15n for protection levels 1-B to 4-B.
export const EEP_A_FACTOR = { '1-A': 12, '2-A': 8, '3-A': 6, '4-A': 4 };
export const EEP_B_FACTOR = { '1-B': 27, '2-B': 21, '3-B': 18, '4-B': 15 };

export function subchannelCu(protection, kbps) {
  const a = EEP_A_FACTOR[protection];
  const b = EEP_B_FACTOR[protection];
  if (!a && !b) throw new Error(`unknown protection profile ${protection}`);
  const step = a ? 8 : 32;
  if (!Number.isInteger(kbps) || kbps <= 0 || kbps % step !== 0) {
    throw new Error(`bitrate must be a positive multiple of ${step} kbit/s for ${protection}`);
  }
  return (a || b) * (kbps / step);
}

export function plan(services) {
  const used = services.reduce((a, s) => a + subchannelCu(s.protection, s.kbps), 0);
  return { used, free: TOTAL_CU - used, fits: used <= TOTAL_CU };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [prot, ...rates] = process.argv.slice(2);
  const nums = rates.map(Number);
  if (!(EEP_A_FACTOR[prot] || EEP_B_FACTOR[prot]) || nums.length === 0 || nums.some(Number.isNaN)) {
    console.log('Usage: node dab.mjs <1-A|2-A|3-A|4-A|1-B|2-B|3-B|4-B> <kbps> [<kbps> ...]');
    process.exit(process.argv.length > 2 ? 1 : 0);
  }
  try {
    const r = plan(nums.map((kbps) => ({ protection: prot, kbps })));
    console.log(`${r.used} of ${TOTAL_CU} CU used, ${r.free} free${r.fits ? '' : ' (DOES NOT FIT)'}`);
  } catch (e) { console.error(e.message); process.exit(1); }
}
