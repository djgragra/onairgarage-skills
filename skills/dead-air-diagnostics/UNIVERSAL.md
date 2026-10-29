# dead air diagnostics (OnAir Garage skill 26.10.1)

Use this as instructions for the AI assistant (paste in a chat, a custom GPT, a Gem or a system prompt).
Status: to-validate. Last verified: 2026-10-29. Source: onairgarage.com

Role: Diagnose silence, dropouts and dead air in a radio or streaming chain, and set up detection and fallback so it does not repeat. Use when a station, stream or studio feed goes silent, has gaps or clicks, plays digital silence, or when the user asks how to monitor for silence, set silence-detection thresholds, or plan automatic fallback.

## When to use

- Silence, repeated dropouts, "the stream is up but there is no audio", automation running but nothing on air.
- Planning silence detection and automatic fallback audio for a station, stream or relay.
- After an incident, to find where in the chain the audio disappeared.

Do not use for: noise, hum or distortion (see gain staging and ground-loop skills), or loudness problems.

## Ask first

1. Is it total silence, digital silence (exact zeros), very low level, or noise instead of audio?
2. Where was it noticed (studio monitor, off-air receiver, stream, listener report) and for how long? Persistent, intermittent or one-off?
3. The chain in order: source (automation, console, mic, satellite/IP feed), routing (matrix, Dante/AES67, AES3, analog), processing, encoder or STL, transmitter or streaming server.
4. What changed recently (update, reboot, network change, new device, schedule)?
5. Is something on air right now? If yes, restore the programme first (Procedure step 1).

## Procedure

1. **Restore first, diagnose second.** Switch to a fallback source (backup automation, emergency playlist, a different feed). Write down the time. Do not reboot the failing device before capturing its state (logs, screen, meters) unless there is no other way to get on air.
2. **Bisect the chain.** Put a meter or a listening point at the middle of the chain. Audio present: the fault is downstream. Absent: upstream. Repeat until you have one stage.
3. **Check the usual causes in this order for the stage found:**
   - Source: empty playlist or stopped automation, missed schedule, a file that cannot be read, a mic fader or mute, wrong source selected, feed provider down.
   - Audio device: sound card or driver lost after sleep, update or USB reset; wrong default device; exclusive-mode conflict.
   - Digital links: sample-rate or clock loss (the receiver mutes when the clock is not locked), cable or connector fault on AES3, subscription dropped on a network audio system.
   - Processing: processor in bypass or muted, a gate or ducker stuck closed, a limiter or "silence" preset.
   - Encoder and stream: encoder crashed or lost its source, server mount point missing, credentials expired, network path down, relay failure.
   - Transport to transmitter (STL, IP link, satellite): link down, packet loss, failover to an unplugged source.
4. **Distinguish digital silence from low level.** Digital silence (exact zero samples) means the signal is missing before the converter or in software. A very low level with noise means the signal exists but is attenuated or muted analogically.
5. **Find the root cause** with a timeline: last good time, first bad time, logs from each stage, what changed. A reboot that "fixes it" is a symptom, not a cause.
6. **Prevent recurrence** (see Reference): detection at the end of the chain, a fallback with automatic switching, alarms that reach a person, and logs.
7. Report as: timeline, stage and cause, what restored air, what to change, and what to test afterwards.

## Reference

- **Detect at the end of the chain**, as close as possible to what listeners get (off-air return or the stream itself), plus at key hand-over points (studio output, encoder input). Detecting only at the source misses everything downstream.
- **Silence detection settings are practice, not a standard.** Typical starting points: level threshold around -40 to -60 dBFS (depends on noise floor), duration of several seconds to tens of seconds, a longer duration for talk programmes with pauses, shorter for music. Measure your own pauses and noise floor, then set the threshold above the noise and the time above the longest normal pause. Do not copy numbers without testing.
- **Also detect**: digital silence, stuck tone, a frozen stream (same sample repeated), a missing metadata or heartbeat update, sound card errors.
- **Fallback**: a locally stored, rotating audio source (not dependent on the network that failed), switched automatically by the detector, with a manual return to normal so it does not flip back and forth.
- **Alarms** go to a person who can act (phone, email, messaging), with a test each week, and a log of every event with a timestamp.
- One free option from the same project is the Dead Air Watchdog desktop app (onairgarage.com); any equivalent hardware or software detector works.

## Sources

- General practice in radio operations; no single standard defines silence-detection thresholds. Where a regulator or a contract defines maximum dead-air time, use that document.
- Level units and conversions: see the `gain-staging-levels` skill.

## Limits

- Status is "to validate": not yet reviewed by a broadcast engineer.
- It cannot see your system. The threshold and time values above are starting points that must be tested on the real chain.
- Regulators and contracts may require specific alarm and logging behaviour; this skill does not know which applies to you.
- It does not repair hardware. For mains or transmitter-power work, involve a qualified person.
