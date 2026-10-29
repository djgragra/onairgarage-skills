---
name: dante-aoip-troubleshooter
description: Troubleshoot Dante and AES67 audio-over-IP networks. Use for clock/PTP problems, devices missing in Dante Controller, dropped subscriptions, clicks and dropouts, latency settings, multicast and IGMP issues, QoS and DSCP settings, redundancy mistakes, or when planning a small Dante network.
version: 26.10.1
status: to-validate
last_verified: 2026-10-29
---

## When to use

- Devices not visible in Dante Controller, subscriptions that drop, audio that clicks, crackles or stops.
- Clock status errors, sync loss, unexpected clock leader, devices that will not sync.
- Choosing latency, switch settings, QoS, or understanding AES67 versus native Dante.
- Redundant (primary/secondary) network problems.

Do not use for: analogue noise or level problems (see `gain-staging-levels`), bandwidth sizing (see `aoip-bandwidth`), or vendor-specific firmware bugs the user has not described.

## Ask first

1. Devices (make, model, firmware), Dante Controller version, computer OS, and whether Dante Virtual Soundcard is used.
2. Network: switch makes and models, managed or unmanaged, number of switches between the farthest devices, VLANs, Wi-Fi, other traffic on the same network.
3. Sample rate and clock settings, device latency setting, redundancy on or off, AES67 mode on or off.
4. Exact symptom and when it started; what changed; whether it is constant or intermittent.
5. What Dante Controller shows: Clock Status page (leader, sync, jitter), Device Info, and subscription icons.

## Procedure

1. **Check the clock first.** In Dante Controller's Clock Status: one device should be the leader and the others should be synchronised. Two leaders or no sync points to network separation, a switch problem, or a second clock source. Fix clocking before anything else, because most audio faults follow from it.
2. **Check sample rate consistency.** All devices in a flow must run the same rate; check pull-up/pull-down and the rate selected in each device.
3. **Check the switch basics.** Gigabit ports for all Dante traffic, no hubs, no Wi-Fi in the audio path, and Energy Efficient Ethernet (EEE) disabled on all Dante ports. Audinate's guidance is to avoid EEE on real-time Dante ports and to use switches where it can be disabled. Avoid daisy-chains of many devices.
4. **Check multicast handling.** Unicast flows work without special setup. Multicast flows (one-to-many) flood the network unless IGMP snooping is configured on the switches with an IGMP querier present. Symptom: audio fine with few devices, then trouble as multicast flows are added.
5. **Check latency against the network.** The device latency setting must cover the worst path. Common guidance from manufacturer manuals: 0.25 ms up to 3 switch hops, 0.5 ms up to 5, 1 ms up to 10, 2 ms up to 20. Increase latency only after clock and network checks, and set it consistently on the devices in a flow.
6. **Check QoS.** If QoS is used, Audinate's DSCP markings are CS7 (56) for time-critical PTP events, EF (46) for audio and medium-priority PTP, CS1 (8) as a low priority, and best effort (0) for the rest. Dante software endpoints (such as Dante Virtual Soundcard) do not mark packets. Prefer a strict-priority queue configured as per the switch vendor's Dante guide.
7. **Discovery problems** (devices not shown): computer on the wrong network interface or several interfaces active, VLAN or firewall blocking mDNS discovery, a device in a different subnet, a computer on Wi-Fi. Select the correct interface in Dante Controller and disable unused ones.
8. **Redundancy**: primary and secondary must be on separate networks. A cable from primary to secondary (or both ports in the same switch) creates loops and clock confusion.
9. **AES67 mode**: devices that support both use different clocking (PTPv2) in AES67 mode than native Dante (PTPv1). Mixing needs the right clock configuration; follow the manufacturers' AES67 guides.
10. Test with a minimal setup (two devices, one switch, one flow). If stable, add elements until it breaks.
11. Report: what was found at each step, the change made, and a test to confirm.

## Reference

- Dante native clocking uses PTPv1 (IEEE 1588-2002) by default; AES67 uses PTPv2. Dante does not require PTP-aware switches.
- DSCP markings and EEE guidance: Audinate FAQ and network guidelines (see Sources).
- Latency table above is from a manufacturer manual, not Audinate; use the value recommended by the devices' manufacturer for your hop count.
- Switch hop counting: switches built into devices (daisy-chain) count as hops.

## Sources

- Audinate FAQ, "How does Dante use DSCP / Diffserv priority values when configuring QoS?" (audinate.com), checked on 2026-10-29 through a web search.
- Audinate, "Adding Dante to your network" (network guidance including EEE).
- Latency vs hop count: Yamaha DME5/DME3 manual, Dante network chapter.
- IEEE 1588 (PTP) and AES67 specification for the standards named.
- The details above were checked through secondary reading, not by testing on a network.

## Limits

- Status is "to validate": not yet reviewed by a Dante-certified engineer.
- Audinate's guidance, Dante Controller menus and firmware behaviour change over time; the manufacturer's current documents win over this skill.
- It cannot see your network. Ask for screenshots or outputs, never for passwords or access.
- It does not configure switch commands for a specific vendor unless the user gives the model and the vendor's guide.
