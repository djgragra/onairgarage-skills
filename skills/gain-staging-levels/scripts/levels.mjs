// Level conversions for audio gain staging. No dependencies.
// CLI: node levels.mjs <command> <numbers...>   (run without arguments for help)

export const DBU_REF_V = Math.sqrt(0.6); // 0.7745967 V rms: 1 mW into 600 ohm
export const DBU_MINUS_DBV = 20 * Math.log10(DBU_REF_V) * -1; // dBu = dBV + 2.218...

// Digital full scale expressed in dBu, for the alignments documented in reference/levels.md
export const ALIGNMENTS = { 'ebu-r68': 18, 'smpte-rp155': 24 };

export const dbuToVolts = (dbu) => DBU_REF_V * 10 ** (dbu / 20);
export const voltsToDbu = (v) => 20 * Math.log10(v / DBU_REF_V);
export const dbvToVolts = (dbv) => 10 ** (dbv / 20);
export const voltsToDbv = (v) => 20 * Math.log10(v);
export const dbuToDbv = (dbu) => dbu - DBU_MINUS_DBV;
export const dbvToDbu = (dbv) => dbv + DBU_MINUS_DBV;
export const dbuToDbfs = (dbu, fullScaleDbu) => dbu - fullScaleDbu;
export const dbfsToDbu = (dbfs, fullScaleDbu) => dbfs + fullScaleDbu;
export const headroom = (peakLevel, clipLevel) => clipLevel - peakLevel;

// Sum of levels in dB (same unit) of uncorrelated sources: power addition.
export const sumUncorrelated = (levelsDb) => 10 * Math.log10(levelsDb.reduce((a, l) => a + 10 ** (l / 10), 0));
// Sum of identical coherent (in phase) sources: amplitude addition.
export const sumCoherent = (levelsDb) => 20 * Math.log10(levelsDb.reduce((a, l) => a + 10 ** (l / 20), 0));

const round = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d;

const COMMANDS = {
  'dbu-to-v': [(a) => round(dbuToVolts(a[0]), 4), 'dBu -> volts rms'],
  'v-to-dbu': [(a) => round(voltsToDbu(a[0])), 'volts rms -> dBu'],
  'dbv-to-v': [(a) => round(dbvToVolts(a[0]), 4), 'dBV -> volts rms'],
  'v-to-dbv': [(a) => round(voltsToDbv(a[0])), 'volts rms -> dBV'],
  'dbu-to-dbv': [(a) => round(dbuToDbv(a[0])), 'dBu -> dBV'],
  'dbv-to-dbu': [(a) => round(dbvToDbu(a[0])), 'dBV -> dBu'],
  'dbu-to-dbfs': [(a) => round(dbuToDbfs(a[0], a[1])), 'dBu, full-scale-dBu -> dBFS'],
  'dbfs-to-dbu': [(a) => round(dbfsToDbu(a[0], a[1])), 'dBFS, full-scale-dBu -> dBu'],
  headroom: [(a) => round(headroom(a[0], a[1])), 'peak level, clip level -> dB of headroom'],
  'sum-uncorrelated': [(a) => round(sumUncorrelated(a)), 'levels in dB... -> combined level'],
  'sum-coherent': [(a) => round(sumCoherent(a)), 'levels in dB... -> combined level'],
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, ...rest] = process.argv.slice(2);
  const nums = rest.map(Number);
  if (!COMMANDS[cmd] || nums.some(Number.isNaN) || nums.length === 0) {
    console.log('Usage: node levels.mjs <command> <numbers...>\n');
    for (const [k, [, d]] of Object.entries(COMMANDS)) console.log(`  ${k.padEnd(18)}${d}`);
    process.exit(cmd ? 1 : 0);
  }
  console.log(COMMANDS[cmd][0](nums));
}
