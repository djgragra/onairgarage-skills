---
name: post-mortem-report
description: Turn messy notes about an on-air failure, outage or technical incident into a clear post-mortem or incident report with timeline, root cause, impact, fixes and follow-up actions. Use after dead air, a stream outage, a failed event feed, a network audio problem, or any technical incident that needs a written report for a manager, client or the team.
version: 26.10.1
status: to-validate
last_verified: 2026-10-29
---

## When to use

- After an incident, to write an incident report or a blameless post-mortem from notes, logs, chat messages and memory.
- To get the facts in order before talking to a manager, a client or a regulator.

Do not use for: legal advice on liability, or for deciding who is to blame. The aim is to understand and prevent, not to accuse.

## Ask first

1. What happened, in the user's words, and what was the impact (how long off air, how many listeners or viewers, which programme)?
2. The timeline: times with time zone of first symptom, detection, mitigation, recovery. If a time is an estimate, say so.
3. What was changed before the incident, what logs and alarms exist, who was involved?
4. The audience of the report: team, management, client, regulator. This changes length and tone.
5. Any contractual or regulatory deadline for the report.

## Procedure

1. **Collect facts, not conclusions.** Build the timeline from logs and messages first, memory second. Mark each entry "confirmed" or "estimated".
2. **Separate**: impact (what the audience experienced), detection (how and when it was noticed), mitigation (what restored service), root cause (why it happened), contributing factors (why it was not prevented or caught).
3. **Find the root cause with "why" questions** until you reach something you can change: a missing alarm, a single point of failure, an undocumented procedure. "Human error" is not a root cause; ask why the system allowed it.
4. **Write actions**: each with an owner, a due date and a way to check it is done. Prefer changes that remove the failure (redundancy, automatic fallback, alarms) over reminders.
5. **Write the report** with the template in `reference/template.md`, in plain language, no blame, no speculation presented as fact. State unknowns explicitly.
6. **Check the draft**: dates and times consistent, units correct, no secrets (passwords, keys, private data), names only where needed.
7. Provide a short summary of three to five lines for those who will not read the whole report.

## Reference

- Template: `reference/template.md`.
- Use the vocabulary from the user's own system; do not invent equipment or logs that were not mentioned.

## Sources

- Practice from site reliability and broadcast operations (blameless post-mortems). Not tied to a single standard. If a regulator or contract requires a specific format, use that format.

## Limits

- Status is "to validate": not yet reviewed by a broadcast operations manager.
- The AI can only organise what the user supplies; it must not fill gaps with guesses. Unknown facts are listed as questions.
- It does not provide legal or regulatory advice.
