---
name: aoip-bandwidth
description: Estimate network bandwidth for audio over IP (Dante, AES67, RAVENNA, AoIP in general). Use when sizing links and switches for N channels, choosing sample rate, bit depth and packet time, comparing payload with on-the-wire bandwidth, or planning a trunk between buildings or racks.
version: 26.10.1
status: to-validate
last_verified: 2026-10-29
---

## When to use

- How many channels fit on a 1 Gbit/s or 100 Mbit/s link, and with how much margin.
- The cost in bandwidth of 96 kHz versus 48 kHz, of 32-bit versus 24-bit, or of short packet times.
- Estimating a trunk between switches, rooms or sites.

Do not use for: troubleshooting a faulty Dante network (see `dante-aoip-troubleshooter`), WAN/internet contribution links with jitter buffers and FEC, or compressed streaming (see `stream-doctor`).

## Ask first

1. Protocol and vendor (Dante native, AES67, RAVENNA, other), and whether the vendor gives its own bandwidth table.
2. Sample rate, bit depth, number of channels per flow, number of flows, multicast or unicast, redundancy (primary and secondary doubles the ports, not the load on each).
3. Packet time, if known (AES67 default is 1 ms; others use 125 us, 250 us, 333 us, 4 ms).
4. The link speed and the other traffic on it.

## Procedure

1. List the flows: channels, rate, bit depth, packet time, unicast or multicast.
2. Compute each flow with the script: `node scripts/aoip.mjs <channels> [rate] [bits] [packetTimeMs] [vlan]`. It prints payload and on-the-wire Mbps with the assumptions.
3. Sum the flows on each link. A multicast flow uses bandwidth on every link where it is forwarded.
4. Keep headroom: plan to use at most about 50-70 % of a link for real-time audio, leaving room for clock, control, and other traffic. This is a prudent rule of thumb, not a standard.
5. Check the packet fits the MTU (1500 bytes): the script reports it when it does not.
6. For native Dante, use Audinate's published figures, and treat the script as a generic estimate.
7. Report the table of flows, totals per link, and the margin.

## Reference

- Payload = sample rate x bits x channels. Example: 48 kHz, 24 bit, one channel = 1.152 Mbps.
- On the wire = payload plus headers per packet (Ethernet framing, IP, UDP, RTP) at the packet rate. Short packet times raise overhead.
- Example (computed by the script): 8 channels, 48 kHz, 24 bit, 1 ms packets, no VLAN tag = 9.216 Mbps payload, 9.84 Mbps on the wire.
- The free OnAir Garage AoIP Bandwidth Planner app (onairgarage.com) does a similar job in a graphical form.

## Sources

- Header sizes: Ethernet (preamble, header, FCS, inter-frame gap), IPv4, UDP and RTP, as in the IETF RFCs; AES67 for packet times and the L24 payload.
- Computed by `scripts/aoip.mjs`, tested in `scripts/aoip.test.mjs`.

## Limits

- Status is "to validate": not yet reviewed by a network audio engineer.
- The model is generic RTP/UDP; vendors differ (native Dante packs and schedules its flows differently), and clock and control traffic are not included.
- IPv6, jumbo frames, VLAN stacks and tunnels change the overhead; give them explicitly if used.
- It does not check switch backplane or queue behaviour.
