---
name: show-notes-ai-guide
description: Help for the Show Notes Generator (Show Notes AI), the free OnAir Garage web app (PWA) that turns a radio show transcript or running order into podcast descriptions, website show notes or social posts with the AI provider of the user's choice (bring your own key, or a local model). Use when the user asks how to set up a provider and key, choose options, use "Copy prompt instead", understand privacy and the key storage, or fix errors such as 401, 403, 413, 429, no credit or a local server that does not answer.
version: 26.10.2
status: to-validate
last_verified: 2026-10-29
---

## When to use

- Setting up the Show Notes Generator: provider, model, API key or local server.
- Choosing the output (podcast description, website show notes, social posts), tone, length and language.
- Understanding how keys and text are handled, and fixing provider errors.

Do not use for: choosing the best AI model, writing the show notes yourself (that is what the app helps with), or legal advice on provider terms. Ask the version first: this skill follows 2026.10.3.

## Ask first

1. Which provider the user has (Anthropic, OpenAI, Google Gemini, Groq, OpenRouter, or a local server such as Ollama or LM Studio) and whether it is a free or paid plan.
2. The exact message shown by the app. Never ask for the API key or paste it anywhere.
3. How long the text is, and the browser and device.

## Procedure

1. Open `https://onairgarage.com/apps/show-notes-ai/` (nothing to install; it can be installed as an app). Language is in the header; theme is light, dark or system.
2. In Setup choose the provider, the model (suggestions can be edited: model names change often) and enter the API key (`Get a key` opens the provider's page), or for a local server the server address (this computer only) and the model name on that server.
3. Key handling: kept in the browser's session storage by default (gone when the tab closes); on the device only if `Remember on this device` is ticked (unencrypted, readable by anyone using that browser profile). `Forget this key` removes it. It is sent only to the chosen provider, never logged or put in a URL.
4. Paste the transcript or outline in `Your text` (counter shows characters, words and an estimate of tokens). The text is never saved.
5. In Options choose what to write (podcast description, website show notes, social posts), tone (informative or promotional), length (short, medium, long) and output language (same as the text, or another).
6. Press `Write the show notes`. The reply arrives in one piece; `Stop` interrupts it; the request stops by itself after 5 minutes. Edit the text and press `Copy`.
7. No key: `Copy prompt instead` builds the full prompt to paste into Claude, ChatGPT or any other assistant.
8. Always read the result before publishing: the model is told to use only what is in the source and to leave `[placeholders]` for missing facts, but it can still be wrong.

**Troubleshooting**
- "Paste some text first.": the text box is empty.
- "Enter your API key in Setup.": choose the provider and enter the key (not needed for a local server).
- "The provider rejected the key (error 401/403).": check the key in Setup or get a new one.
- "The provider says the account has no credit.": add credit with the provider or choose a free provider.
- "No answer after 5 minutes.": shorten the text or choose another model.
- HTTP 429 or 413: the text exceeds a per-minute limit (common on free plans): shorten it or wait a minute. Very long texts are not split; the app only warns.
- A local server does not answer: check that it is running, that it allows the page's origin (CORS) and that the model name is right. Calling `http://localhost` from an https page may be blocked by some browsers; this was not tested in Safari or on iPhone.

## Reference

- Providers: Anthropic and OpenAI are paid (billed to the user's account); Google Gemini, Groq and OpenRouter have a documented free plan or free models (limits and plans change); a local server needs no key.
- On Gemini's free plan the content may be used by Google to improve its products (the app shows a warning). Check the provider's terms before pasting confidential material.
- Errors show the HTTP status only, never the provider's error body (it may echo part of a key).
- The app itself works offline; writing show notes needs a connection to the provider.

## Sources

- Show Notes Generator 2026.10.3 manual (`dev/manual/manual.en.md`) from github.com/djgragra/show-notes-ai, read on 2026-10-29.

## Limits

- Status is "to validate": written from the manual by an AI assistant, not yet reviewed by the author.
- Tied to version 2026.10.3. Model names, free plans and prices change: check the provider. The token count is an estimate.
- A key remembered on the device can be read by any script running on that origin; the strict policy of the page limits that risk but does not remove it.
- The app is not a certified tool and does not validate the accuracy of any model's text.
