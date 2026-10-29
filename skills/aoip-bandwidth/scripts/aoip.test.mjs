import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stream, total } from './aoip.mjs';

test('8 ch, 48 kHz, 24 bit, 1 ms: payload 9.216 Mbps', () => {
  assert.ok(Math.abs(stream({ channels: 8 }).payloadMbps - 9.216) < 1e-9);
});
test('8 ch, 1 ms: packet is 78 + 1152 = 1230 bytes on the wire, 9.84 Mbps', () => {
  const r = stream({ channels: 8 });
  assert.equal(r.packetBytesOnWire, 1230);
  assert.ok(Math.abs(r.wireMbps - 9.84) < 1e-9);
});
test('VLAN tag adds 4 bytes per packet', () => {
  assert.equal(stream({ channels: 2, vlan: true }).packetBytesOnWire - stream({ channels: 2 }).packetBytesOnWire, 4);
});
test('a packet time that gives fractional samples is rejected (0.3 ms at 48 kHz)', () => {
  assert.throws(() => stream({ channels: 2, packetTimeMs: 0.3 }), /whole number/);
});
test('too many channels exceed the MTU', () => assert.throws(() => stream({ channels: 16 }), /MTU/));
test('total sums streams', () => {
  const s = stream({ channels: 2 });
  assert.ok(Math.abs(total([s, s]) - 2 * s.wireMbps) < 1e-12);
});
test('125 us packets at 48 kHz carry 6 samples per channel', () => {
  const r = stream({ channels: 2, packetTimeMs: 0.125 });
  assert.equal(r.packetsPerSecond, 8000);
  assert.equal(r.packetBytesOnWire, 78 + 6 * 2 * 3);
});
