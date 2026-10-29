// Third-order intermodulation check for a list of wireless frequencies (MHz). No dependencies.
// CLI: node intermod.mjs <guardMHz> <f1> <f2> <f3> ...
// This is a first screen only: real coordination needs a scan of the site, the equipment's filters and the
// frequencies actually permitted in the country.

export function products(freqs) {
  const out = [];
  for (let i = 0; i < freqs.length; i++) {
    for (let j = 0; j < freqs.length; j++) {
      if (i === j) continue;
      out.push({ type: '2A-B', from: [freqs[i], freqs[j]], pos: [freqs[i]], f: 2 * freqs[i] - freqs[j] });
    }
  }
  for (let i = 0; i < freqs.length; i++) {
    for (let j = i + 1; j < freqs.length; j++) {
      for (let k = 0; k < freqs.length; k++) {
        if (k === i || k === j) continue;
        out.push({ type: 'A+B-C', from: [freqs[i], freqs[j], freqs[k]], pos: [freqs[i], freqs[j]], f: freqs[i] + freqs[j] - freqs[k] });
      }
    }
  }
  return out;
}

// Products falling within +-guard MHz of a carrier. A carrier that adds to the product (A or B) is skipped, because
// that case is just two carriers being too close; the subtracted carrier (C) is kept: a product on top of it is a real hit.
export function conflicts(freqs, guard) {
  const hits = [];
  for (const p of products(freqs)) {
    for (const c of freqs) {
      if (p.pos.includes(c)) continue;
      if (Math.abs(p.f - c) < guard) hits.push({ ...p, victim: c, distance: Math.abs(p.f - c) });
    }
  }
  return hits;
}

export function minSpacing(freqs) {
  const s = [...freqs].sort((a, b) => a - b);
  return s.slice(1).reduce((m, f, i) => Math.min(m, f - s[i]), Infinity);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [guard, ...f] = process.argv.slice(2).map(Number);
  if (!(guard > 0) || f.length < 2 || f.some(Number.isNaN)) {
    console.log('Usage: node intermod.mjs <guardMHz> <f1> <f2> [f3 ...]   (frequencies in MHz)');
    process.exit(process.argv.length > 2 ? 1 : 0);
  }
  const hits = conflicts(f, guard);
  console.log(`minimum spacing ${minSpacing(f).toFixed(3)} MHz; ${hits.length} third-order product(s) within ${guard} MHz of another carrier`);
  for (const h of hits) console.log(`  ${h.type} of ${h.from.join(', ')} = ${h.f.toFixed(3)} MHz near ${h.victim} (${h.distance.toFixed(3)} MHz)`);
}
