// Bandwidth and monthly transfer for a stream. No dependencies.
// CLI: node streamcalc.mjs <kbps> <listeners> [hoursPerListenerPerDay=24]

export const mbps = (kbps, listeners) => (kbps * listeners) / 1000;
// Decimal terabytes in 30 days.
export const tbPerMonth = (kbps, listeners, hoursPerDay = 24, days = 30) =>
  (kbps * 1000 * listeners * hoursPerDay * 3600 * days) / 8 / 1e12;

if (import.meta.url === `file://${process.argv[1]}`) {
  const [k, l, h] = process.argv.slice(2).map(Number);
  if (!(k > 0) || !(l > 0) || (h !== undefined && !(h > 0))) {
    console.log('Usage: node streamcalc.mjs <kbps> <listeners> [hoursPerListenerPerDay=24]');
    process.exit(process.argv.length > 2 ? 1 : 0);
  }
  const hours = h ?? 24;
  console.log(`${mbps(k, l).toFixed(2)} Mbps, ${tbPerMonth(k, l, hours).toFixed(2)} TB/month (${hours} h/day, 30 days, protocol overhead not included)`);
}
