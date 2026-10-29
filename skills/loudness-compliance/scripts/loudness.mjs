// Loudness compliance helpers. No dependencies.
// CLI: node loudness.mjs check <preset> <integratedLUFS> <truePeakdBTP>
//      node loudness.mjs gain <targetLUFS> <integratedLUFS> <truePeakdBTP>
// Presets are delivery specifications, see reference/targets.md for sources and status.

export const PRESETS = {
  'ebu-r128': { target: -23, tolerance: 0.5, truePeakMax: -1 },
  'atsc-a85': { target: -24, tolerance: 2, truePeakMax: -2 },
};

// Result of applying a linear gain to a measured programme.
export function afterGain(targetLufs, integratedLufs, truePeakDbtp) {
  const gain = targetLufs - integratedLufs;
  return { gain, integrated: integratedLufs + gain, truePeak: truePeakDbtp + gain };
}

export function check(presetName, integratedLufs, truePeakDbtp) {
  const p = PRESETS[presetName];
  if (!p) throw new Error(`unknown preset ${presetName}`);
  const offset = integratedLufs - p.target;
  const loudnessOk = Math.abs(offset) <= p.tolerance;
  const peakOk = truePeakDbtp <= p.truePeakMax;
  // Gain needed to hit the target exactly, and whether the true peak would then exceed the maximum.
  const g = afterGain(p.target, integratedLufs, truePeakDbtp);
  return {
    offsetLu: offset,
    loudnessOk,
    peakOk,
    gainToTarget: g.gain,
    truePeakAfterGain: g.truePeak,
    needsLimiterAfterGain: g.truePeak > p.truePeakMax,
  };
}

const round = (x) => Math.round(x * 100) / 100;

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, a, b, c] = process.argv.slice(2);
  try {
    if (cmd === 'check' && PRESETS[a] && !Number.isNaN(+b) && !Number.isNaN(+c)) {
      const r = check(a, +b, +c);
      console.log(JSON.stringify(Object.fromEntries(Object.entries(r).map(([k, v]) => [k, typeof v === 'number' ? round(v) : v])), null, 2));
    } else if (cmd === 'gain' && !Number.isNaN(+a) && !Number.isNaN(+b) && !Number.isNaN(+c)) {
      const r = afterGain(+a, +b, +c);
      console.log(JSON.stringify({ gain: round(r.gain), integrated: round(r.integrated), truePeak: round(r.truePeak) }, null, 2));
    } else {
      console.log('Usage:\n  node loudness.mjs check <ebu-r128|atsc-a85> <integratedLUFS> <truePeakdBTP>\n  node loudness.mjs gain <targetLUFS> <integratedLUFS> <truePeakdBTP>');
      process.exit(cmd ? 1 : 0);
    }
  } catch (e) { console.error(e.message); process.exit(1); }
}
