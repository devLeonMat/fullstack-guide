import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildArchitectures } from '../src/components/architecture/architectures.js';

const es = (spanish) => spanish;
const en = (_spanish, english) => english;

const TEXT_FIELDS = ['summary', 'useWhen', 'avoidWhen', 'pitch', 'gotcha'];
const STORY_FIELDS = ['project', 'client', 'years', 'context', 'problem', 'solution', 'payoff'];
const COLORS = ['blue', 'green', 'yellow', 'purple'];
const LANGS = ['java', 'python'];

function braceBalance(code) {
  const stripped = code
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(\/\/|#).*$/gm, '');
  let depth = 0;
  for (const ch of stripped) {
    if (ch === '{' || ch === '(') depth++;
    if (ch === '}' || ch === ')') depth--;
    if (depth < 0) return depth;
  }
  return depth;
}

test('architecture ids are unique, colors and code languages are known', () => {
  const archs = buildArchitectures(es);
  const ids = archs.map(a => a.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const a of archs) {
    assert.ok(COLORS.includes(a.color), a.id);
    assert.ok(LANGS.includes(a.lang), a.id);
  }
});

test('every architecture has Spanish and English text', () => {
  const spanish = buildArchitectures(es);
  const english = buildArchitectures(en);
  spanish.forEach((a, i) => {
    const b = english[i];
    for (const field of TEXT_FIELDS) {
      assert.ok(a[field]?.trim(), `${a.id}.${field} (es)`);
      assert.ok(b[field]?.trim(), `${a.id}.${field} (en)`);
      assert.notEqual(a[field], b[field], `${a.id}.${field} not translated`);
    }
    for (const field of STORY_FIELDS) {
      assert.ok(a.story[field]?.trim(), `${a.id}.story.${field} (es)`);
      assert.ok(b.story[field]?.trim(), `${a.id}.story.${field} (en)`);
    }
  });
});

test('code examples have balanced braces and parentheses', () => {
  for (const a of buildArchitectures(es)) {
    assert.equal(braceBalance(a.code), 0, a.id);
  }
});
