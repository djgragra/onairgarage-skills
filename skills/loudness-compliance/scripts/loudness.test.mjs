import { test } from 'node:test';
import assert from 'node:assert/strict';
import { check, afterGain } from './loudness.mjs';

test('R128: -23.4 LUFS with -2 dBTP is compliant', () => {
  const r = check('ebu-r128', -23.4, -2);
  assert.equal(r.loudnessOk, true);
  assert.equal(r.peakOk, true);
});
test('R128: -22 LUFS is out of tolerance by 1 LU', () => {
  const r = check('ebu-r128', -22, -3);
  assert.equal(r.loudnessOk, false);
  assert.ok(Math.abs(r.offsetLu - 1) < 1e-9);
  assert.ok(Math.abs(r.gainToTarget + 1) < 1e-9);
});
test('R128: quiet programme brought to target may exceed the true peak', () => {
  const r = check('ebu-r128', -30, -4); // +7 dB gain -> +3 dBTP
  assert.equal(r.needsLimiterAfterGain, true);
  assert.ok(Math.abs(r.truePeakAfterGain - 3) < 1e-9);
});
test('ATSC A/85: -26 LKFS is within +-2 of -24', () => assert.equal(check('atsc-a85', -26, -3).loudnessOk, true));
test('ATSC A/85: true peak -1 dBTP exceeds -2', () => assert.equal(check('atsc-a85', -24, -1).peakOk, false));
test('afterGain moves loudness and peak by the same dB', () => {
  const r = afterGain(-23, -18, -1);
  assert.deepEqual([r.gain, r.integrated, r.truePeak], [-5, -23, -6]);
});
test('unknown preset throws', () => assert.throws(() => check('x', 0, 0)));
