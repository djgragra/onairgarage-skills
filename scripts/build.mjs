// Validates every skill, generates UNIVERSAL.md for each and manifest.json.
// No dependencies. Usage: node scripts/build.mjs [--check]
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'skills');
const check = process.argv.includes('--check');

const SECTIONS = ['When to use', 'Ask first', 'Procedure', 'Reference', 'Sources', 'Limits'];
const STATUSES = ['draft', 'to-validate', 'validated'];

function parse(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: m[2] };
}

const errors = [];
const manifest = [];
const slugs = existsSync(skillsDir)
  ? readdirSync(skillsDir).filter((d) => statSync(join(skillsDir, d)).isDirectory()).sort()
  : [];

for (const slug of slugs) {
  const file = join(skillsDir, slug, 'SKILL.md');
  const fail = (msg) => errors.push(`${slug}: ${msg}`);
  if (!existsSync(file)) { fail('SKILL.md missing'); continue; }
  const parsed = parse(readFileSync(file, 'utf8'));
  if (!parsed) { fail('frontmatter missing'); continue; }
  const { meta, body } = parsed;
  if (meta.name !== slug) fail(`name "${meta.name}" must equal folder name`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail('folder name must be kebab-case');
  if (!meta.description || meta.description.length < 40) fail('description missing or too short');
  if (!/^\d{2}\.\d{1,2}\.\d+$/.test(meta.version || '')) fail('version must be YY.M.N');
  if (!STATUSES.includes(meta.status)) fail(`status must be one of ${STATUSES.join(', ')}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.last_verified || '')) fail('last_verified must be YYYY-MM-DD');
  const headings = [...body.matchAll(/^## (.+)$/gm)].map((h) => h[1].trim());
  const order = SECTIONS.map((s) => headings.indexOf(s));
  SECTIONS.forEach((s, i) => { if (order[i] < 0) fail(`section "## ${s}" missing`); });
  if (order.every((i) => i >= 0) && order.some((v, i) => i && v < order[i - 1])) fail('sections out of order');
  for (const s of ['Sources', 'Limits']) {
    const re = new RegExp(`## ${s}\\n([\\s\\S]*?)(?=\\n## |$)`);
    const sec = body.match(re);
    if (sec && sec[1].trim().length < 20) fail(`section "${s}" is empty`);
  }
  if (meta.status === 'validated' && !/validated_by:/.test(readFileSync(file, 'utf8'))) {
    fail('validated skills need validated_by: and validated_on:');
  }

  const universal =
    `# ${slug.replace(/-/g, ' ')} (OnAir Garage skill ${meta.version})\n\n` +
    `Use this as instructions for the AI assistant (paste in a chat, a custom GPT, a Gem or a system prompt).\n` +
    `Status: ${meta.status}. Last verified: ${meta.last_verified}. Source: onairgarage.com\n\n` +
    `Role: ${meta.description}\n` + body.replace(/\n{3,}/g, '\n\n');
  const uPath = join(skillsDir, slug, 'UNIVERSAL.md');
  if (check) {
    if (!existsSync(uPath) || readFileSync(uPath, 'utf8') !== universal) fail('UNIVERSAL.md is out of date (run npm run build)');
  } else {
    writeFileSync(uPath, universal);
  }
  manifest.push({ slug, version: meta.version, status: meta.status, last_verified: meta.last_verified, description: meta.description });
}

if (errors.length) {
  console.error(errors.map((e) => `ERROR ${e}`).join('\n'));
  process.exit(1);
}
const out = JSON.stringify({ skills: manifest }, null, 2) + '\n';
const mPath = join(root, 'manifest.json');
if (check) {
  if (!existsSync(mPath) || readFileSync(mPath, 'utf8') !== out) { console.error('ERROR manifest.json out of date'); process.exit(1); }
} else writeFileSync(mPath, out);
console.log(`${manifest.length} skill(s) ok`);
