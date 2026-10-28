import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildToolbox } from '../src/components/toolbox/tools.js';

const es = (spanish) => spanish;
const en = (_spanish, english) => english;

const ICONS = ['cicd', 'quality', 'testing', 'containers', 'serverless', 'observability', 'messaging', 'gateway', 'repos', 'tracking'];

test('needs have unique ids and known icons', () => {
  const needs = buildToolbox(es);
  const ids = needs.map(n => n.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const n of needs) assert.ok(ICONS.includes(n.icon), n.id);
});

test('every tool says what it is for and lists its CV projects', () => {
  const spanish = buildToolbox(es);
  const english = buildToolbox(en);
  spanish.forEach((need, ni) => {
    assert.notEqual(need.summary, english[ni].summary, `${need.id} summary not translated`);
    assert.ok(need.tools.length > 0, `${need.id} has tools`);
    const names = need.tools.map(t => t.name);
    assert.equal(new Set(names).size, names.length, `${need.id} duplicate tool`);
    need.tools.forEach((tool, ti) => {
      assert.ok(tool.what?.trim(), `${need.id}/${tool.name} what`);
      assert.notEqual(tool.what, english[ni].tools[ti].what, `${need.id}/${tool.name} what not translated`);
      assert.ok(Array.isArray(tool.usedAt), `${need.id}/${tool.name} usedAt`);
      for (const p of tool.usedAt) assert.ok(p.client && p.project, `${need.id}/${tool.name} project`);
    });
  });
});

test('alternatives are never also listed as used tools', () => {
  for (const need of buildToolbox(es)) {
    const used = new Set(need.tools.map(t => t.name));
    for (const alt of need.alternatives ?? []) assert.ok(!used.has(alt.name), `${need.id}/${alt.name}`);
  }
});

test('observability covers logs, metrics, traces and alerts', () => {
  const obs = buildToolbox(en).find(n => n.id === 'observability');
  assert.deepEqual(obs.signals.map(s => s.signal), ['Logs', 'Metrics and monitoring', 'Traces (tracing)', 'Alerts']);
});

test('tools without a CV project are only the ones the user confirmed', () => {
  const withoutProject = buildToolbox(es).flatMap(n => n.tools).filter(t => t.usedAt.length === 0).map(t => t.name);
  assert.deepEqual(withoutProject.sort(), ['Argo CD', 'New Relic']);
});

test('every tool and alternative has a brand logo', () => {
  // logos.js imports react-icons, so its keys are checked as text instead of importing it
  const source = readFileSync(new URL('../src/components/toolbox/logos.js', import.meta.url), 'utf8');
  const hasKey = name => source.includes(`'${name}':`) || new RegExp(`^\\s+${name}:`, 'm').test(source);
  for (const need of buildToolbox(es)) {
    for (const name of [...need.tools.map(t => t.name), ...(need.alternatives ?? []).map(a => a.name)]) {
      assert.ok(hasKey(name), `missing logo for ${name}`);
    }
  }
});
