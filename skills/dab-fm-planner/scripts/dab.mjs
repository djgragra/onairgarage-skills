// DAB/DAB+ multiplex capacity helper (EEP protection, sub-channel size in capacity units). No dependencies.
// CLI: node dab.mjs <protection 1-A|2-A|3-A|4-A> <kbps> [<kbps> ...]
// Checks the table in reference/dab.md against ETSI EN 300 401 before relying on it for a real multiplex.

export const TOTAL_CU = 864; // capacity units available for the main service channel (mode I)
// EEP set A: CU = n * (bitrate / 8), bitrate a multiple of 8 kbit/s
export const EEP_A_FACTOR = { '1-A': 12, '2-A': 8, '3-A': 6, '4-A': 4 };

export function subchannelCu(protection, kbps) {
  const n = EEP_A_FACTOR[protection];
  if (!n) throw new Error(`unknown protection profile ${protection}`);
  if (kbps % 8 !== 0 || kbps <= 0) throw new Error('bitrate must be a positive multiple of 8 kbit/s');
  return n * (kbps / 8);
}

export function plan(services) {
  const used = services.reduce((a, s) => a + subchannelCu(s.protection, s.kbps), 0);
  return { used, free: TOTAL_CU - used, fits: used <= TOTAL_CU };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [prot, ...rates] = process.argv.slice(2);
  const nums = rates.map(Number);
  if (!EEP_A_FACTOR[prot] || nums.length === 0 || nums.some(Number.isNaN)) {
    console.log('Usage: node dab.mjs <1-A|2-A|3-A|4-A> <kbps> [<kbps> ...]');
    process.exit(process.argv.length > 2 ? 1 : 0);
  }
  try {
    const r = plan(nums.map((kbps) => ({ protection: prot, kbps })));
    console.log(`${r.used} of ${TOTAL_CU} CU used, ${r.free} free${r.fits ? '' : ' (DOES NOT FIT)'}`);
  } catch (e) { console.error(e.message); process.exit(1); }
}
