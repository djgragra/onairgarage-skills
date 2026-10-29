import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mbps, tbPerMonth } from './streamcalc.mjs';

test('128 kbps x 100 listeners is 12.8 Mbps', () => assert.equal(mbps(128, 100), 12.8));
test('128 kbps x 100 listeners, 24 h x 30 days is 4.1472 TB', () => {
  assert.ok(Math.abs(tbPerMonth(128, 100) - 4.1472) < 1e-9);
});
test('one listener, one hour at 128 kbps is 57.6 MB', () => {
  assert.ok(Math.abs(tbPerMonth(128, 1, 1, 1) * 1e6 - 57.6) < 1e-9);
});
