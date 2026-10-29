import { test } from 'node:test';
import assert from 'node:assert/strict';
import { products, conflicts, minSpacing } from './intermod.mjs';

test('2A-B of 600.000 and 600.300 is 599.700 and 600.600', () => {
  const f = products([600, 600.3]).map((p) => +p.f.toFixed(3)).sort();
  assert.deepEqual(f, [599.7, 600.6]);
});
test('evenly spaced triple: the A+B-C product lands on the middle carrier', () => {
  const hits = conflicts([600, 600.3, 600.6], 0.05);
  assert.ok(hits.some((h) => h.type === 'A+B-C' && h.victim === 600.3));
});
test('well-chosen unequal spacing has no product within 50 kHz', () => {
  assert.equal(conflicts([600, 600.35, 600.85], 0.05).length, 0);
});
test('minimum spacing', () => assert.ok(Math.abs(minSpacing([600.85, 600, 600.35]) - 0.35) < 1e-9));
