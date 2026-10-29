---
name: aoip-bandwidth-planner-guide
description: Help for the AoIP Bandwidth Planner, the free OnAir Garage web app (PWA, works offline) for planning a Dante / AES67 audio network: draw devices, switches and links, describe unicast or multicast audio flows, and see how much of each link they use. Use when the user asks how to draw a network, add flows with the AES67 or Dante model, set packet time, redundancy, safety threshold, IGMP snooping and VLAN options, read the link bars, export or import a plan, or fix a problem.
version: 26.10.2
status: to-validate
last_verified: 2026-10-29
---

## When to use

- Sizing a Dante or AES67 network with the planner: nodes, links, flows, redundancy.
- Reading link bars (colour, threshold), "Link details" and "Total on the busiest link".
- Saving, exporting and importing a plan; install and small problems.

Do not use for: a quick generic payload calculation without a drawing (see `aoip-bandwidth`), diagnosing a faulty live Dante network (see `dante-aoip-troubleshooter`), or exact figures for a real network (the app sizes a design; it does not replace a capture). Ask the version first: this skill follows 2026.10.1.

## Ask first

1. The devices, switches and link speeds (100 Mbps, 1 Gbps, 10 Gbps) and which links are primary or secondary.
2. For each flow: source, receivers, unicast or multicast, channels, sample rate (44.1, 48 or 96 kHz), bit depth, Dante or AES67, packet time for AES67, redundancy.
3. Is IGMP snooping configured on the switches, and is a VLAN tag used?
4. What the user wants to know: will it fit, where is the bottleneck, what happens on a link failure?

## Procedure

1. Open `https://onairgarage.com/apps/aoip-bandwidth-planner/`. Language is in the header; theme is light, dark or system.
2. In `Devices and switches` press `Add` for each node (name and type; the number of nodes is limited). Use `Connect to` and `Link speed` to join nodes. Each link belongs to the primary or the secondary network (this is how Dante redundancy is drawn). Drag nodes on the diagram, or use `Auto layout`.
3. In `Flows` press `Add flow` (you need at least one device): name, source and receivers (a flow with no receiver carries nothing), unicast or multicast, channels, sample rate, bit depth, model, copies, and for Dante `Redundant` (also sent on the secondary network and counted separately). For AES67 choose the packet time (125 us, 250 us, 333 us, 1 ms by default, 4 ms, or a custom number of samples) and channels per stream. Dante figures are an estimate scaled from Audinate's published figures, for 24 bit only. `Calculation details` shows how a figure was obtained.
4. Read the results: each link has two bars (one per direction), coloured by flow, with a tick at the safety threshold. Above the threshold a link turns amber, above its capacity red. Select a link for `Link details` (capacity and, per direction, the flows with Mbps and packets per second). `Total on the busiest link` gives the highest load.
5. Settings: safety threshold (70 % by default, following Audinate's recommendation to keep audio traffic under 70 % of any link), count preamble and inter-frame gap (line-rate load), 802.1Q VLAN tag (adds 4 bytes to every AES67 packet), IGMP snooping.
6. Routing: unicast is sent once per receiver along the shortest path; multicast is sent once per link, only towards receivers with IGMP snooping on, or flooded to every reachable link with it off.
7. Plan: saved automatically on this device only. `Export JSON` / `Import JSON`; `Load an example` (a small studio, a radio station, a redundant Dante network).

**Troubleshooting**
- "Limit reached" when adding a node: remove one first.
- A flow carries nothing: select its source and at least one receiver.
- A link is red: flows exceed capacity; use a faster link, fewer channels, multicast or another path.
- "This file is not a valid plan": import a JSON exported by this planner.
- `Install app` missing: Chromium browsers show the button; on iPhone and iPad use Share, Add to Home Screen; on Safari for Mac use File, Add to Dock.

## Reference

- Audio traffic only: clock (PTP), discovery, control and other traffic are not counted, nor QoS, latency or switch capacity.
- IPv4, untagged Ethernet unless the VLAN option is on, nominal line rates, one link between two nodes. Where two paths exist the shortest is used (a loop is reported).
- AES67 streams are counted on the primary network only; AES67 redundancy schemes (such as SMPTE ST 2022-7) are not modelled. Devices that carry fewer channels per flow at high sample rates are not modelled.
- Everything runs in the browser; nothing is sent anywhere; fonts are served locally.

## Sources

- AoIP Bandwidth Planner 2026.10.1 manual (`dev/manual/manual.en.md`) from github.com/djgragra/aoip-bandwidth-planner, read on 2026-10-29. The 70 % recommendation is attributed to Audinate by the manual; the Audinate document was not consulted for this skill.

## Limits

- Status is "to validate": written from the manual by an AI assistant, not yet reviewed by the author.
- Tied to version 2026.10.1. The Dante figures are estimates. It cannot see the user's real network: verify a real design with the vendor's tools and, if possible, a capture.
