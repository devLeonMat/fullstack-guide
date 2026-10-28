import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPatterns, CATEGORIES } from '../src/components/patterns/patterns.js';

const es = (spanish) => spanish;
const en = (_spanish, english) => english;

const TEXT_FIELDS = ['summary', 'useWhen', 'avoidWhen', 'pitch', 'gotcha'];
const STORY_FIELDS = ['project', 'client', 'years', 'context', 'problem', 'solution', 'payoff'];

function braceBalance(code) {
  const stripped = code
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
  let depth = 0;
  for (const ch of stripped) {
    if (ch === '{' || ch === '(') depth++;
    if (ch === '}' || ch === ')') depth--;
    if (depth < 0) return depth;
  }
  return depth;
}

test('pattern ids are unique and categories are known', () => {
  const patterns = buildPatterns(es);
  const ids = patterns.map(p => p.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const p of patterns) assert.ok(CATEGORIES.includes(p.category), p.id);
});

test('every pattern has Spanish and English text', () => {
  const spanish = buildPatterns(es);
  const english = buildPatterns(en);
  spanish.forEach((p, i) => {
    const q = english[i];
    for (const field of TEXT_FIELDS) {
      assert.ok(p[field]?.trim(), `${p.id}.${field} (es)`);
      assert.ok(q[field]?.trim(), `${p.id}.${field} (en)`);
      assert.notEqual(p[field], q[field], `${p.id}.${field} not translated`);
    }
    for (const field of STORY_FIELDS) {
      assert.ok(p.story[field]?.trim(), `${p.id}.story.${field} (es)`);
      assert.ok(q.story[field]?.trim(), `${p.id}.story.${field} (en)`);
    }
  });
});

test('Java examples have balanced braces and parentheses', () => {
  for (const p of buildPatterns(es)) {
    assert.equal(braceBalance(p.code), 0, p.id);
  }
});
