---
name: event-audio-rf-planning
description: Planning audio for live events, outside broadcasts and festivals: input lists, patch plans, stage plans, signal flow, comms, redundancy, and wireless microphone / in-ear frequency planning. Use when the user prepares a live show, OB, conference or sports event, needs an input list or checklist, or wants a first screen for intermodulation between wireless frequencies.
version: 26.10.1
status: to-validate
last_verified: 2026-10-29
---

## When to use

- Preparing audio for a live event, an outside broadcast or a multi-room installation: what to ask, what to list, what to test.
- Building an input list, patch list, stage plan and signal-flow diagram.
- A first check of wireless microphone / in-ear frequency lists for intermodulation.

Do not use for: legal frequency allocation (it depends on country, site and licence), rigging or electrical safety, or venue acoustic design.

## Ask first

1. Type of event, date, venue, indoor or outdoor, audience size, broadcast or recording requirements, and the deliverables (PA, monitors, broadcast feed, stream, recording).
2. Number of sources and destinations; who supplies what; local crew and their contacts.
3. Wireless: how many microphones, in-ears, intercoms, and from which bands; what the venue and the country allow; whether a frequency coordinator is involved.
4. Power, network (Dante/AES67/MADI), clocking, and what must be redundant.
5. Load-in and sound-check times, and the hard stop times.

## Procedure

1. **Define the signal flow** end to end: sources -> stage boxes -> console(s) -> processing -> PA / monitors / broadcast feed / recording / stream. Mark every clock master (digital) and every point where a failure stops the show.
2. **Write the input list**: channel, source, mic or DI, stand, phantom, notes, group. Add the output list: PA, monitors, broadcast, recording, comms.
3. **Write the patch plan**: physical connectors, stage-box inputs, snake or network routes, and labelling convention. Label both ends.
4. **Network audio**: one named clock master, unique device names, a documented IP plan, switch settings per `dante-aoip-troubleshooter`, and a saved backup of the network configuration.
5. **Redundancy**: decide what has a backup (second console recall, redundant network, spare mic, spare in-ear packs, UPS for critical points) and test the switch-over before the show.
6. **Wireless**: list every transmitter with its frequency, run `node scripts/intermod.mjs <guardMHz> <f1> <f2> ...` as a first screen, then scan the site with the real equipment, group by compatible bands, and use the manufacturer's coordination software and the local rules. Log any change.
7. **Gain structure and levels** per `gain-staging-levels`; broadcast feed levels agreed with the broadcaster.
8. **Test plan**: line check of every channel, comms check, wireless walk test, emergency path (what happens when the console or the network fails), recording check.
9. **Day plan and checklist**: load-in, power-up order, clock check, sound check, show, strike. Keep a printed copy.
10. After the event, a short report per `post-mortem-report` if anything went wrong.

## Reference

- `scripts/intermod.mjs`: third-order products (2A-B and A+B-C) of a frequency list, with a guard distance. Example: `node scripts/intermod.mjs 0.05 600 600.3 600.6` finds three hits; unequal spacing helps.
- Equal spacing between carriers is the common cause of third-order trouble. Fifth-order and higher products, receiver front-end overload, antenna placement and body absorption are real effects the script does not model.

## Sources

- General live-sound and OB practice; manufacturers' wireless coordination guides; the national spectrum regulator for permitted frequencies and licences.
- Third-order intermodulation: the relations 2f1 - f2 and f1 + f2 - f3 are standard; the script is tested in `scripts/intermod.test.mjs`.

## Limits

- Status is "to validate": not yet reviewed by an event or RF engineer.
- The script is a first screen, not a coordination. Always scan the site and use the permitted frequencies.
- It does not replace the venue's safety rules, riggers, electricians or the regulator.
