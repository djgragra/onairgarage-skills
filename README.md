# OnAir Garage skills

Skills for AI assistants (Claude, ChatGPT, Gemini and others) on broadcast, radio and professional audio:
troubleshooting, standards, calculations and operations. Free, MIT licensed, no account.
By [OnAir Garage](https://onairgarage.com).

> Work in progress. The first skills are being written and checked; none is marked "validated" yet.

## How a skill is built

Each folder in `skills/` has a `SKILL.md` with the same sections: When to use, Ask first, Procedure,
Reference, Sources, Limits. Calculations are scripts with tests, not numbers written from memory. Every skill
declares its status: `draft`, `to-validate` or `validated`, and the date it was last verified.

<a href="https://ko-fi.com/F8V328ADFH"><img height="36" src="https://storage.ko-fi.com/cdn/kofi6.png?v=6" alt="Buy Me a Coffee at ko-fi.com"></a>

## Using a skill

- **Claude**: add the skill folder (or its zip from the Releases page) as a Claude Skill.
- **ChatGPT, Gemini, others**: paste `skills/<name>/UNIVERSAL.md` as instructions (custom GPT, Gem, system prompt, or the start of a chat).

## Checking the repository

```bash
node scripts/build.mjs --check
npm test
```

`node scripts/build.mjs` regenerates `UNIVERSAL.md` for every skill and `manifest.json`.

## Honesty

These skills are written by a human with the help of AI and are not a substitute for the manuals of your
equipment, the published standards or a qualified engineer. Each skill lists its sources and what it does not
know.

## Support

These skills are free and will stay free, with source code. If they saved your day, you can leave a tip on Ko-fi: a thank-you, nothing more.

<a href="https://ko-fi.com/F8V328ADFH"><img height="36" src="https://storage.ko-fi.com/cdn/kofi6.png?v=6" alt="Buy Me a Coffee at ko-fi.com"></a>
