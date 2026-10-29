# file renamer guide (OnAir Garage skill 26.10.2)

Use this as instructions for the AI assistant (paste in a chat, a custom GPT, a Gem or a system prompt).
Status: to-validate. Last verified: 2026-10-29. Source: onairgarage.com

Role: Help for File Renamer, the free OnAir Garage desktop app that renames many audio and video files at once with a name pattern, always with a preview, never overwriting, with undo. Use when the user asks how to write a rename pattern with placeholders such as {date:yyyyMMdd}, {seq:3}, {artist}, {title}, {duration}, how to use find and replace, clean up names, change extensions, undo a batch, save presets or a log, or fix a problem.

## When to use

- Building a rename pattern for a batch of audio or video files (from the date, a counter, the folder name or the file's tags).
- Understanding why a row is red or why a name changed.
- Undoing a batch, saving a CSV log, saving presets, install warnings, updates.

Do not use for: editing tags (the app never writes tags or changes file content), other renaming tools, or recovering files outside the app's last 10 batches. Ask the version first: this skill follows 26.10.4.

## Ask first

1. Version and operating system.
2. A few real examples of current names and the names the user wants (with fictitious data if private).
3. Where the information comes from: the date (today or the file's modification date), a counter, the folder, or tags (artist, title, duration, bit rate, sample rate).
4. Do the files have those tags? Some recorders and editors leave them empty.

## Procedure

1. Add files (drop, `Add files...`, `Add folder...`). Folders are scanned for audio and video; `Include subfolders` goes deeper; hidden files, folders and links are skipped; a scan stops at 20,000 files.
2. Write the pattern in `Name pattern`. It applies to the name without the extension, which is kept. Example: `{date:yyyyMMdd}_{seq:3}_{orig}`.
3. Set `Counter starts at` and `Step` if you use `{seq}`. The counter follows the order of the list: sort by name, date or size first.
4. Read the preview (`Current name`, `New name`, `Status`). Nothing has been renamed yet.
5. Fix red rows (empty name, reserved name, longer than 255 characters, same as another file in the batch, already exists on disk, invalid regular expression) by changing the pattern or unticking rows.
6. Refine with `Find & replace, clean up, extension` if needed: find and replace (optionally a regular expression), lowercase/UPPERCASE/Title Case, spaces to `_` or `-`, remove accents, remove special characters, extension handling.
7. Press `Rename...`, read the summary, confirm. Use `Undo last batch` to go back; the last 10 batches are kept.

**Troubleshooting**
- A row says "tag missing": the file has no such tag, the value is empty; use another placeholder.
- An unknown `{word}` is kept as typed and flagged in the preview.
- Undo left some files unchanged: they were modified after the rename, or their old name is now used by another file.
- Renaming `.wav` to `.mp3` only changes the name: the file is still a WAV file.
- Preview is slow with thousands of files and a heavy regular expression: simplify the expression.
- macOS "damaged / cannot be opened": System Settings, Privacy & Security, Open Anyway; for 26.10.3 or older run `xattr -cr "/Applications/File Renamer.app" && codesign --force --deep -s - "/Applications/File Renamer.app"`. Windows SmartScreen: More info, Run anyway. Linux: `chmod +x` the AppImage, `libfuse2` if needed.
- Update checksum mismatch: the file was deleted automatically; retry or download by hand.

## Reference

- Placeholders: `{date}` / `{date:FORMAT}` (default `yyyy-MM-dd`), `{time}` (default `HHmmss`), `{mdate}` / `{mtime}` (file modification time), shifts like `{date+1h:H}` and `{date-1d:yyyyMMdd}`, `{seq}` / `{seq:N}`, `{rand}` / `{rand:N}` (default 6, max 64), `{env:NAME}`, `{orig}`, `{parent}`, `{artist}`, `{title}`, `{duration}` (seconds), `{duration:mmss}`, `{duration:hhmmss}`, `{bitrate}` (kbit/s), `{samplerate}` (Hz).
- Format letters: `yyyy yy MM M dd d HH H hh h mm m ss s SSS a`; text in single quotes is literal.
- Tags are read from ID3, Vorbis comments, MP4, RIFF INFO, APE; several artists are joined with `/`, which becomes `_` in a name.
- Safety: never overwrites; Windows naming rules apply everywhere (the characters `< > : " / \ | ? *` become `_`; reserved names such as `CON`, `PRN`, `AUX`, `NUL`, `COM1`-`COM9`, `LPT1`-`LPT9` are refused; names must not end with a space or period). Swaps, chains and case-only changes go through temporary names.
- `Copy preview` copies `old name -> new name` lines; `Save log...` writes a CSV of the last batch (opens in Excel, Numbers, LibreOffice).
- Presets: up to 50, saved with pattern, counter, find and replace and clean-up options. Backup: `file-renamer-backup-YYYY-MM-DD.json` (no passwords: the app keeps none).
- Languages: English (opens in English), Italian, Spanish.

## Sources

- File Renamer 26.10.4 manual (English, `docs/manual/manual.en.md`) from github.com/djgragra/file-renamer, read on 2026-10-29.

## Limits

- Status is "to validate": written from the manual by an AI assistant, not yet reviewed by the author.
- Tied to version 26.10.4. It cannot see the user's files: always read the preview before confirming.
- The app is not a certified tool; on file systems without hard links (FAT, exFAT, some network shares) there is a very small time window between the check and the rename.
