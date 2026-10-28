import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildJavaVersions, buildJavaFundamentals, buildJavaInterview } from '../src/components/languages/java.js';
import { buildJsTsInterview } from '../src/components/languages/jsts.js';
import { buildPythonInterview } from '../src/components/languages/python.js';
import { buildKotlinInterview } from '../src/components/languages/kotlin.js';

const es = (spanish) => spanish;
const en = (_spanish, english) => english;

const INTERVIEWS = {
  java: buildJavaInterview,
  jsts: buildJsTsInterview,
  python: buildPythonInterview,
  kotlin: buildKotlinInterview,
};
const LEVELS = ['Junior', 'Mid', 'Senior'];

function braceBalance(code) {
  const stripped = code
    .replace(/"""[\s\S]*?"""/g, '""')
    .replace(/"(?:\\.|[^"\\])*"/g, '""')
    .replace(/'(?:\\.|[^'\\])'/g, "''")
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

for (const [name, build] of Object.entries(INTERVIEWS)) {
  test(`${name}: interview groups use known levels and translated answers`, () => {
    const spanish = build(es);
    const english = build(en);
    assert.deepEqual(spanish.map(g => g.level), LEVELS);
    spanish.forEach((group, gi) => {
      group.items.forEach((item, i) => {
        const other = english[gi].items[i];
        assert.ok(item.q?.trim() && other.q?.trim(), `${name} ${group.level} #${i} question`);
        assert.ok(item.a?.trim() && other.a?.trim(), `${name} ${group.level} #${i} answer`);
        assert.notEqual(item.a, other.a, `${name} ${group.level} #${i} answer not translated`);
        if (item.inPractice) assert.notEqual(item.inPractice, other.inPractice, `${name} ${group.level} #${i} inPractice`);
        if (item.table) {
          const width = item.table.headers.length;
          item.table.rows.forEach(row => assert.equal(row.length, width, `${name} ${group.level} #${i} table row`));
        }
      });
    });
  });
}

test('java: every version has where-used note and balanced code', () => {
  const spanish = buildJavaVersions(es);
  const english = buildJavaVersions(en);
  const ids = spanish.map(v => v.id);
  assert.equal(new Set(ids).size, ids.length);
  spanish.forEach((version, vi) => {
    assert.notEqual(version.usedAt, english[vi].usedAt, `${version.id} usedAt`);
    version.features.forEach((feature, fi) => {
      assert.notEqual(feature.desc, english[vi].features[fi].desc, `${version.id} ${feature.name} desc`);
      assert.equal(braceBalance(feature.code), 0, `${version.id} ${feature.name}`);
    });
  });
});

test('java: fundamentals are translated and code is balanced', () => {
  const spanish = buildJavaFundamentals(es);
  const english = buildJavaFundamentals(en);
  spanish.forEach((topic, ti) => {
    assert.notEqual(topic.description, english[ti].description, topic.id);
    topic.points.forEach((point, pi) => assert.notEqual(point, english[ti].points[pi], `${topic.id} point ${pi}`));
    assert.equal(braceBalance(topic.code), 0, topic.id);
  });
});
