import { test } from 'node:test';
import assert from 'node:assert/strict';
import { subchannelCu, plan, TOTAL_CU } from './dab.mjs';

test('64 kbit/s at EEP 3-A uses 48 CU', () => assert.equal(subchannelCu('3-A', 64), 48));
test('80 kbit/s at EEP 3-A uses 60 CU', () => assert.equal(subchannelCu('3-A', 80), 60));
test('72 kbit/s at EEP 3-A uses 54 CU', () => assert.equal(subchannelCu('3-A', 72), 54));
test('EEP 1-A, 2-A, 4-A factors', () => {
  assert.equal(subchannelCu('1-A', 32), 48);
  assert.equal(subchannelCu('2-A', 32), 32);
  assert.equal(subchannelCu('4-A', 32), 16);
});
test('eighteen 64 kbit/s services at 3-A fill the multiplex', () => {
  const r = plan(Array(18).fill({ protection: '3-A', kbps: 64 }));
  assert.equal(r.used, 864);
  assert.equal(r.free, 0);
  assert.equal(r.fits, true);
});
test('nineteen do not fit', () => assert.equal(plan(Array(19).fill({ protection: '3-A', kbps: 64 })).fits, false));
test('bitrate must be a multiple of 8 for EEP-A', () => assert.throws(() => subchannelCu('3-A', 70)));
test('EEP-B: 1-B to 4-B use 27n, 21n, 18n, 15n CU for 32n kbit/s', () => {
  assert.equal(subchannelCu('1-B', 32), 27);
  assert.equal(subchannelCu('2-B', 64), 42);
  assert.equal(subchannelCu('3-B', 96), 54);
  assert.equal(subchannelCu('4-B', 128), 60);
});
test('EEP-B bitrate must be a multiple of 32', () => assert.throws(() => subchannelCu('3-B', 40), /multiple of 32/));
test('every EEP-A and EEP-B size up to 192 kbit/s fits in one frame of 864 CU at 3-A and 4-B', () => {
  for (let k = 8; k <= 192; k += 8) assert.ok(subchannelCu('3-A', k) <= 864);
  for (let k = 32; k <= 192; k += 32) assert.ok(subchannelCu('4-B', k) <= 864);
});
test('total capacity constant', () => assert.equal(TOTAL_CU, 864));
