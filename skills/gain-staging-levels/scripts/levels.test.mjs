import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as L from './levels.mjs';

const near = (a, b, tol = 0.005) => assert.ok(Math.abs(a - b) <= tol, `${a} != ${b}`);

test('0 dBu is 0.7746 V rms', () => near(L.dbuToVolts(0), 0.7746, 0.0001));
test('+4 dBu is 1.228 V rms', () => near(L.dbuToVolts(4), 1.2277, 0.0001));
test('-10 dBV is 0.3162 V and -7.78 dBu', () => {
  near(L.dbvToVolts(-10), 0.3162, 0.0001);
  near(L.dbvToDbu(-10), -7.78);
});
test('1 V rms is 0 dBV and +2.22 dBu', () => {
  near(L.voltsToDbv(1), 0);
  near(L.voltsToDbu(1), 2.22);
});
test('dBu <-> dBV round trip', () => near(L.dbvToDbu(L.dbuToDbv(13.7)), 13.7, 1e-9));
test('EBU R68: 0 dBu is -18 dBFS, +18 dBu is 0 dBFS', () => {
  near(L.dbuToDbfs(0, L.ALIGNMENTS['ebu-r68']), -18);
  near(L.dbuToDbfs(18, L.ALIGNMENTS['ebu-r68']), 0);
});
test('SMPTE RP155: +4 dBu is -20 dBFS', () => near(L.dbuToDbfs(4, L.ALIGNMENTS['smpte-rp155']), -20));
test('headroom of +8 dBu peak into a +24 dBu clip is 16 dB', () => near(L.headroom(8, 24), 16));
test('two equal uncorrelated sources add 3.01 dB; coherent 6.02 dB', () => {
  near(L.sumUncorrelated([-60, -60]), -56.99);
  near(L.sumCoherent([-60, -60]), -53.98);
});
test('ten equal uncorrelated sources add 10 dB', () => near(L.sumUncorrelated(Array(10).fill(0)), 10, 1e-9));
