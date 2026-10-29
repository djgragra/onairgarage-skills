// Payload and wire bandwidth for uncompressed audio over IP (RTP/UDP, AES67-style). No dependencies.
// CLI: node aoip.mjs <channels> [sampleRate=48000] [bits=24] [packetTimeMs=1] [vlan=0|1]
// Assumptions are printed. Native Dante and vendor stacks differ: use the vendor figures to plan real networks.

export const OVERHEAD = {
  preambleSfdIfg: 20, // 8 preamble + 12 inter-frame gap
  ethernetHeaderFcs: 18, // 14 header + 4 FCS
  vlanTag: 4,
  ip: 20,
  udp: 8,
  rtp: 12,
};

export function stream({ channels, sampleRate = 48000, bits = 24, packetTimeMs = 1, vlan = false }) {
  const samples = (sampleRate * packetTimeMs) / 1000;
  if (!Number.isInteger(samples)) throw new Error('packet time does not give a whole number of samples');
  const payload = samples * channels * (bits / 8);
  const o = OVERHEAD;
  const frame = o.preambleSfdIfg + o.ethernetHeaderFcs + (vlan ? o.vlanTag : 0) + o.ip + o.udp + o.rtp + payload;
  if (payload + o.ip + o.udp + o.rtp > 1500) throw new Error('packet exceeds the 1500-byte MTU: use fewer channels or a shorter packet time');
  const packetsPerSecond = 1000 / packetTimeMs;
  return {
    payloadMbps: (sampleRate * bits * channels) / 1e6,
    wireMbps: (frame * 8 * packetsPerSecond) / 1e6,
    packetBytesOnWire: frame,
    packetsPerSecond,
  };
}

export const total = (streams) => streams.reduce((a, s) => a + s.wireMbps, 0);

if (import.meta.url === `file://${process.argv[1]}`) {
  const [ch, sr, bits, pt, vlan] = process.argv.slice(2).map(Number);
  if (!(ch > 0)) {
    console.log('Usage: node aoip.mjs <channels> [sampleRate=48000] [bits=24] [packetTimeMs=1] [vlan=0|1]');
    process.exit(process.argv.length > 2 ? 1 : 0);
  }
  try {
    const r = stream({ channels: ch, sampleRate: sr || 48000, bits: bits || 24, packetTimeMs: pt || 1, vlan: !!vlan });
    console.log(`payload ${r.payloadMbps.toFixed(3)} Mbps, on the wire ${r.wireMbps.toFixed(3)} Mbps (${r.packetBytesOnWire} bytes per packet, ${r.packetsPerSecond} packets/s)`);
    console.log('Assumes RTP/UDP/IPv4 with Ethernet framing, no clock or control traffic.');
  } catch (e) { console.error(e.message); process.exit(1); }
}
