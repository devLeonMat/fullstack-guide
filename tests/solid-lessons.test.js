import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildIntro, buildLessons, buildReview, STEP_KEYS } from '../src/components/solid/lessons/index.js';
import { mark } from '../src/components/solid/lessons/mark.js';

const es = (spanish) => spanish;
const en = (_spanish, english) => english;

// Walks every block (including nested details/steps) and yields it.
function* walk(blocks) {
  for (const block of blocks) {
    yield block;
    if (block.blocks) yield* walk(block.blocks);
    if (block.type === 'steps') {
      for (const item of block.items) yield* walk(item.blocks);
    }
    if (block.type === 'compare') {
      yield { type: 'code', lang: 'java', ...block.before };
      yield { type: 'code', lang: 'java', ...block.after };
    }
  }
}

function allBlocks(lesson) {
  return STEP_KEYS.flatMap(key => [...walk(lesson.steps[key])]);
}

function braceBalance(code) {
  const stripped = code
    .replace(/"""[\s\S]*?"""/g, '""')
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

for (const [lang, tx] of [['es', es], ['en', en]]) {
  const lessons = buildLessons(tx);

  test(`[${lang}] the five principles come in SOLID order`, () => {
    assert.deepEqual(lessons.map(l => l.letter).join(''), 'SOLID');
    assert.equal(new Set(lessons.map(l => l.id)).size, 5);
  });

  for (const lesson of lessons) {
    test(`[${lang}] ${lesson.letter}: card fields are filled`, () => {
      for (const field of ['nameEn', 'nameEs', 'tagline', 'definition', 'solves', 'focus']) {
        assert.ok(lesson[field]?.trim(), `${field} is empty`);
      }
      for (const field of ['question', 'signal', 'solution', 'example']) {
        assert.ok(lesson.summary[field]?.trim(), `summary.${field} is empty`);
      }
    });

    test(`[${lang}] ${lesson.letter}: has a before/after picture`, () => {
      assert.ok(lesson.visual?.takeaway?.trim(), 'visual.takeaway is empty');
      for (const side of ['before', 'after']) {
        const data = lesson.visual[side];
        assert.ok(data.caption.trim() && data.description.trim(), `${side} needs caption and description`);
        assert.ok(data.rows.length > 0 && data.rows.every(r => r.length > 0), `${side} needs diagram rows`);
      }
    });

    test(`[${lang}] ${lesson.letter}: every pedagogical step has content`, () => {
      for (const key of STEP_KEYS) {
        assert.ok(Array.isArray(lesson.steps[key]) && lesson.steps[key].length > 0, `step "${key}" is empty`);
      }
      const types = allBlocks(lesson).map(b => b.type);
      assert.ok(lesson.steps.bad.some(b => b.type === 'code' && b.tone === 'bad' && b.highlight.length > 0), 'step 3 needs highlighted bad code');
      assert.ok(lesson.steps.compare.some(b => b.type === 'compare'), 'step 6 needs a before/after comparison');
      assert.ok(lesson.steps.rule.some(b => b.type === 'rule'), 'step 8 needs a rule');
      assert.ok(lesson.steps.rule.some(b => b.type === 'five'), 'step 8 needs the five-questions card');
      assert.ok(types.includes('steps'), 'step 5 must explain the fix progressively');
      assert.ok(!types.includes('flow'), 'diagrams belong to the separate Diagram tab (lesson.visual)');
    });

    test(`[${lang}] ${lesson.letter}: exercises have exactly one correct answer`, () => {
      assert.ok(lesson.exercises.length >= 1);
      for (const q of lesson.exercises) {
        assert.ok(q.prompt.trim());
        assert.ok(q.options.length >= 3, `${q.id} needs at least 3 options`);
        assert.equal(q.options.filter(o => o.correct).length, 1, `${q.id} must have one correct option`);
        assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length, `${q.id} has duplicated option ids`);
        for (const o of q.options) {
          assert.ok(o.text.trim() && o.explanation.trim(), `${q.id}/${o.id} needs text and explanation`);
        }
      }
    });

    test(`[${lang}] ${lesson.letter}: code blocks are well formed`, () => {
      for (const block of allBlocks(lesson).filter(b => b.type === 'code')) {
        const lines = block.code.split('\n');
        for (const n of block.highlight) {
          assert.ok(n >= 1 && n <= lines.length, `highlight line ${n} out of range`);
        }
        assert.ok(!lines.some(l => l.startsWith('!')), 'leftover highlight marker');
        assert.ok(!block.code.includes('\t'), 'tabs in code');
        if (block.lang === 'java') {
          assert.equal(braceBalance(block.code), 0, `unbalanced braces in:\n${block.code.slice(0, 120)}`);
        }
      }
    });
  }

  test(`[${lang}] intro and review are complete`, () => {
    const intro = buildIntro(tx);
    for (const group of ['what', 'analogy', 'notSolid']) {
      assert.ok(intro[group]?.length > 0, `intro.${group} is empty`);
    }
    assert.ok(intro.what.some(b => b.type === 'callout'), 'intro needs the interview answer');
    assert.equal(intro.path.length, 6);
    const review = buildReview(tx);
    assert.deepEqual(review.lens.map(l => l.letter), ['L', 'I', 'D']);
    assert.deepEqual(review.quiz.map(q => q.answer).sort(), ['D', 'I', 'L', 'O', 'S']);
    for (const q of review.quiz) assert.ok(q.prompt.trim() && q.explanation.trim());
  });
}

test('Spanish and English lessons share the same structure', () => {
  const shape = (lessons) => JSON.stringify(lessons.map(l => ({
    steps: STEP_KEYS.map(k => [...walk(l.steps[k])].map(b => b.type)),
    exercises: l.exercises.map(q => q.options.map(o => Boolean(o.correct))),
  })));
  assert.equal(shape(buildLessons(es)), shape(buildLessons(en)));
});

test('mark() strips markers and reports 1-based highlighted lines', () => {
  const { code, highlight } = mark('\nint a = 1;\n!int b = 2;\nint c = 3;\n');
  assert.equal(code, 'int a = 1;\nint b = 2;\nint c = 3;');
  assert.deepEqual(highlight, [2]);
});
