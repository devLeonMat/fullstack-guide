import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiJavascript, SiTypescript } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Scope Diagram ───────────────────────────────────────────────────────────────

const ScopeDiagram = ({ tx }) => {
  const [activeScope, setActiveScope] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveScope(s => (s + 1) % 3), 1800);
    return () => clearInterval(id);
  }, []);

  const scopes = [
    {
      label: tx('Global Scope', 'Global Scope'),
      desc: tx('window, globalThis', 'window, globalThis'),
      vars: ['var x = 1', 'function foo() {}'],
      color: 'border-yellow-500/60 bg-yellow-500/5',
      glow: '0 0 22px rgba(234,179,8,0.35)',
      textColor: 'text-yellow-300',
    },
    {
      label: tx('Function Scope', 'Function Scope'),
      desc: tx('var, arguments, this', 'var, arguments, this'),
      vars: ['var local = 2', 'const inner = 3'],
      color: 'border-yellow-400/50 bg-yellow-400/8',
      glow: '0 0 22px rgba(250,204,21,0.35)',
      textColor: 'text-yellow-200',
    },
    {
      label: tx('Block Scope', 'Block Scope'),
      desc: tx('let, const (ES6+)', 'let, const (ES6+)'),
      vars: ['let block = 4', 'const CONST = 5'],
      color: 'border-amber-400/50 bg-amber-400/8',
      glow: '0 0 22px rgba(251,191,36,0.35)',
      textColor: 'text-amber-300',
    },
  ];

  return (
    <div className="bg-slate-950/40 border border-yellow-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-yellow-400 uppercase tracking-wider">
        {tx('Cadena de scope — resolviendo hacia afuera', 'Scope chain — resolves outward')}
      </p>
      <div className="relative flex flex-col items-center gap-2">
        {scopes.map((scope, i) => (
          <motion.div
            key={i}
            animate={{
              boxShadow: activeScope === i ? scope.glow : '0 0 0px transparent',
              scale: activeScope === i ? 1.03 : 1,
            }}
            transition={{ duration: 0.4 }}
            className={`w-full border rounded-xl p-3 transition-all ${scope.color} ${activeScope === i ? 'opacity-100' : 'opacity-40'}`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`font-bold text-sm ${scope.textColor}`}>{scope.label}</span>
              <span className="text-xs text-slate-500 font-mono">{scope.desc}</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {scope.vars.map((v, vi) => (
                <motion.code
                  key={vi}
                  animate={{ opacity: activeScope === i ? 1 : 0.4 }}
                  className="text-xs bg-slate-900/60 border border-slate-700/50 rounded px-2 py-0.5 text-slate-300 font-mono"
                >
                  {v}
                </motion.code>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-slate-500">
        {tx('El motor busca la variable desde adentro hacia afuera', 'Engine looks up variables from inner to outer')}
      </p>
    </div>
  );
};

// ─── Event Loop Diagram ──────────────────────────────────────────────────────────

const EventLoopDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0);
  const phases = ['stack', 'webapi', 'queue', 'loop'];

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % phases.length), 1500);
    return () => clearInterval(id);
  }, []);

  const boxes = [
    {
      id: 'stack',
      label: tx('Call Stack', 'Call Stack'),
      sublabel: tx('LIFO', 'LIFO'),
      items: ['main()', 'fetch()', 'JSON.parse()'],
      color: 'border-yellow-500/50 bg-yellow-500/10',
      activeColor: 'border-yellow-400/80 bg-yellow-500/20',
      textColor: 'text-yellow-300',
    },
    {
      id: 'webapi',
      label: tx('Web APIs', 'Web APIs'),
      sublabel: 'Browser/Node',
      items: ['setTimeout', 'fetch()', 'DOM events'],
      color: 'border-amber-500/50 bg-amber-500/10',
      activeColor: 'border-amber-400/80 bg-amber-500/20',
      textColor: 'text-amber-300',
    },
    {
      id: 'queue',
      label: tx('Task Queue', 'Task Queue'),
      sublabel: 'FIFO',
      items: ['cb1()', 'cb2()', '...'],
      color: 'border-yellow-600/50 bg-yellow-600/10',
      activeColor: 'border-yellow-500/80 bg-yellow-600/20',
      textColor: 'text-yellow-200',
    },
  ];

  return (
    <div className="bg-slate-950/40 border border-yellow-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-yellow-400 uppercase tracking-wider">
        {tx('Ciclo del Event Loop', 'Event Loop Cycle')}
      </p>
      <div className="grid grid-cols-3 gap-2 items-start">
        {boxes.map((box) => {
          const isActive = phase === phases.indexOf(box.id);
          return (
            <motion.div
              key={box.id}
              animate={{
                boxShadow: isActive ? '0 0 18px rgba(234,179,8,0.4)' : '0 0 0px transparent',
                scale: isActive ? 1.04 : 1,
              }}
              transition={{ duration: 0.35 }}
              className={`border rounded-xl p-2.5 transition-all ${isActive ? box.activeColor : box.color} ${isActive ? 'opacity-100' : 'opacity-50'}`}
            >
              <div className={`font-bold text-xs mb-0.5 ${box.textColor}`}>{box.label}</div>
              <div className="text-xs text-slate-500 mb-2">{box.sublabel}</div>
              <div className="space-y-1">
                {box.items.map((item, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: isActive ? 1 : 0.5 }}
                    className="text-xs font-mono bg-slate-900/50 border border-slate-700/40 rounded px-1.5 py-0.5 text-slate-300"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-2">
        <motion.div
          animate={{ opacity: phase === 3 ? 1 : 0.3, scale: phase === 3 ? 1.08 : 1 }}
          transition={{ duration: 0.35 }}
          className="border border-yellow-500/50 bg-yellow-500/10 rounded-full px-4 py-1.5 text-xs font-bold text-yellow-300"
        >
          ↻ Event Loop
        </motion.div>
        <span className="text-xs text-slate-500">
          {tx('microtasks → macrotasks', 'microtasks → macrotasks')}
        </span>
      </div>
    </div>
  );
};

// ─── Async Evolution Diagram ─────────────────────────────────────────────────────

const AsyncEvolutionDiagram = ({ tx }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 3), 2000);
    return () => clearInterval(id);
  }, []);

  const steps = [
    {
      label: tx('Callbacks', 'Callbacks'),
      icon: '🔥',
      tag: tx('Infierno', 'Hell'),
      desc: tx('Anidación profunda, difícil de leer', 'Deep nesting, hard to read'),
      color: 'border-red-500/50 bg-red-500/10 text-red-300',
      glow: '0 0 18px rgba(239,68,68,0.35)',
    },
    {
      label: 'Promises',
      icon: '⛓',
      tag: '.then() chain',
      desc: tx('Mejor, pero aún verbose', 'Better, but still verbose'),
      color: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300',
      glow: '0 0 18px rgba(234,179,8,0.4)',
    },
    {
      label: 'async/await',
      icon: '✨',
      tag: tx('Limpio', 'Clean'),
      desc: tx('Código síncrono legible', 'Readable synchronous-looking code'),
      color: 'border-green-500/50 bg-green-500/10 text-green-300',
      glow: '0 0 18px rgba(34,197,94,0.35)',
    },
  ];

  return (
    <div className="bg-slate-950/40 border border-yellow-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-yellow-400 uppercase tracking-wider">
        {tx('Evolución del código asíncrono', 'Evolution of async code')}
      </p>
      <div className="flex gap-2 items-stretch">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <motion.div
              animate={{
                boxShadow: step === i ? s.glow : '0 0 0px transparent',
                scale: step === i ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
              className={`flex-1 border rounded-xl p-3 text-center transition-all ${s.color} ${step === i ? 'opacity-100' : 'opacity-35'}`}
            >
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-bold text-sm mb-0.5">{s.label}</div>
              <div className="text-xs opacity-70 mb-1">{s.tag}</div>
              <div className="text-xs text-slate-400 leading-tight">{s.desc}</div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                animate={{ opacity: step >= i ? 0.8 : 0.2 }}
                className="text-yellow-500/60 text-lg flex-shrink-0"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Type System Diagram ─────────────────────────────────────────────────────────

const TypeSystemDiagram = ({ tx }) => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse(p => (p + 1) % 4), 1200);
    return () => clearInterval(id);
  }, []);

  const rows = [
    {
      label: 'unknown / any',
      types: ['unknown', 'any'],
      color: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300',
      desc: tx('Raíz del sistema', 'Root of the system'),
    },
    {
      label: tx('Primitivos', 'Primitives'),
      types: ['string', 'number', 'boolean', 'symbol', 'bigint'],
      color: 'border-amber-400/50 bg-amber-400/8 text-amber-300',
      desc: tx('Tipos básicos', 'Basic types'),
    },
    {
      label: tx('Objetos', 'Objects'),
      types: ['object', 'array', 'function', 'null'],
      color: 'border-yellow-600/50 bg-yellow-600/8 text-yellow-200',
      desc: tx('Tipos compuestos', 'Compound types'),
    },
    {
      label: 'never',
      types: ['never'],
      color: 'border-slate-500/50 bg-slate-500/10 text-slate-400',
      desc: tx('Subtipo de todo, no asignable', 'Subtype of all, unassignable'),
    },
  ];

  return (
    <div className="bg-slate-950/40 border border-yellow-500/20 rounded-xl p-4 space-y-2">
      <p className="text-center text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-3">
        {tx('Jerarquía de tipos TypeScript', 'TypeScript Type Hierarchy')}
      </p>
      {rows.map((row, i) => (
        <motion.div
          key={i}
          animate={{
            boxShadow: pulse === i ? '0 0 16px rgba(234,179,8,0.35)' : '0 0 0px transparent',
            scale: pulse === i ? 1.02 : 1,
          }}
          transition={{ duration: 0.4 }}
          className={`border rounded-xl p-2.5 ${row.color} ${pulse === i ? 'opacity-100' : 'opacity-60'}`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-xs">{row.label}</span>
            <span className="text-xs text-slate-500">{row.desc}</span>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {row.types.map((t, ti) => (
              <code key={ti} className="text-xs bg-slate-900/60 border border-slate-700/40 rounded px-1.5 py-0.5 text-slate-300 font-mono">
                {t}
              </code>
            ))}
          </div>
          {i < rows.length - 1 && (
            <motion.div
              animate={{ opacity: pulse === i ? 1 : 0.3 }}
              className="flex justify-center mt-1.5"
            >
              <span className="text-yellow-500/60 text-xs">↓ {tx('narrows to', 'narrows to')}</span>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ─── Section: Closures & Scope ───────────────────────────────────────────────────

const renderClosures = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Alcance y Closures', 'Closures & Scope')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Hoisting, cadena de scope y closures: los conceptos más preguntados en entrevistas.',
          'Hoisting, scope chain and closures: the most asked interview topics.'
        )}
      </p>
    </div>

    <ScopeDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {[
        {
          title: 'var',
          color: 'border-red-500/30 text-red-300',
          points: [
            tx('Function-scoped', 'Function-scoped'),
            tx('Hoisting: declaración al tope (undefined)', 'Hoisted: declaration to top (undefined)'),
            tx('Re-declarable y re-asignable', 'Re-declarable & re-assignable'),
            tx('Evitar en código moderno', 'Avoid in modern code'),
          ],
        },
        {
          title: 'let',
          color: 'border-yellow-500/30 text-yellow-300',
          points: [
            tx('Block-scoped', 'Block-scoped'),
            tx('Hoisting: TDZ (Temporal Dead Zone)', 'Hoisted: TDZ (Temporal Dead Zone)'),
            tx('No re-declarable, sí re-asignable', 'Not re-declarable, re-assignable'),
            tx('Para variables mutables', 'For mutable variables'),
          ],
        },
        {
          title: 'const',
          color: 'border-green-500/30 text-green-300',
          points: [
            tx('Block-scoped', 'Block-scoped'),
            tx('Hoisting: TDZ igual que let', 'Hoisted: TDZ same as let'),
            tx('No re-asignable (binding)', 'Not re-assignable (binding)'),
            tx('Objetos/arrays son mutables por dentro', 'Objects/arrays still mutable inside'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-3`}>
          <code className={`font-bold text-base ${color.split(' ')[1]} block mb-2`}>{title}</code>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="javascript" code={`// ── Hoisting ────────────────────────────────────
console.log(a); // undefined (var hoisted)
// console.log(b); // ReferenceError: TDZ
var a = 1;
let b = 2;

// ── Scope chain ─────────────────────────────────
const global = 'global';

function outer() {
  const outerVar = 'outer';

  function inner() {
    const innerVar = 'inner';
    // Can access all outer scopes:
    console.log(global, outerVar, innerVar);
  }

  inner();
  // console.log(innerVar); // ReferenceError
}

// ── Block scope ─────────────────────────────────
for (let i = 0; i < 3; i++) {
  // i is scoped to each iteration
  setTimeout(() => console.log(i), 0); // 0, 1, 2 ✓
}

for (var j = 0; j < 3; j++) {
  // j is shared — classic gotcha
  setTimeout(() => console.log(j), 0); // 3, 3, 3 ✗
}`} />
    </div>

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="javascript" code={`// ── Basic closure ───────────────────────────────
function makeCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
    reset: () => { count = start; },
  };
}

const counter = makeCounter(10);
counter.increment(); // 11
counter.increment(); // 12
counter.decrement(); // 11
counter.value();     // 11

// ── Memoize with closure ─────────────────────────
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return expensiveFib(n - 1) + expensiveFib(n - 2);
});

// ── IIFE pattern (Module) ────────────────────────
const myModule = (() => {
  let privateState = 0;

  return {
    get: () => privateState,
    increment: () => ++privateState,
  };
})();`} />
    </div>
  </div>
);

// ─── Section: Event Loop ─────────────────────────────────────────────────────────

const renderEventLoop = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        Event Loop
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Call Stack, Web APIs, microtask queue y macrotask queue: cómo JavaScript es single-threaded y no-bloqueante.',
          'Call Stack, Web APIs, microtask queue and macrotask queue: how JavaScript is single-threaded yet non-blocking.'
        )}
      </p>
    </div>

    <EventLoopDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        {
          title: tx('Microtask Queue', 'Microtask Queue'),
          color: 'border-yellow-500/30 text-yellow-300',
          badge: tx('Alta prioridad', 'High priority'),
          points: [
            'Promise.then / .catch / .finally',
            'queueMicrotask()',
            'MutationObserver callbacks',
            tx('Se vacía ANTES de la siguiente macrotask', 'Drained BEFORE next macrotask'),
          ],
        },
        {
          title: tx('Macrotask Queue', 'Macrotask Queue'),
          color: 'border-amber-500/30 text-amber-300',
          badge: tx('Baja prioridad', 'Lower priority'),
          points: [
            'setTimeout / setInterval',
            'setImmediate (Node.js)',
            'I/O callbacks, UI rendering',
            tx('Una tarea por ciclo del event loop', 'One task per event loop cycle'),
          ],
        },
      ].map(({ title, color, badge, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`font-bold text-sm ${color.split(' ')[1]}`}>{title}</span>
            <span className="text-xs bg-slate-800 border border-slate-700 rounded-full px-2 py-0.5 text-slate-400">{badge}</span>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="javascript" code={`// ── Execution order prediction ──────────────────
console.log('1 - sync');                     // 1st

setTimeout(() => console.log('2 - macro'), 0); // last (macrotask)

Promise.resolve()
  .then(() => console.log('3 - micro 1'))    // 3rd
  .then(() => console.log('4 - micro 2'));   // 4th

queueMicrotask(() => console.log('5 - microtask')); // 5th? No!

console.log('6 - sync end');                 // 2nd

// Output: 1 → 6 → 3 → 5 → 4 → 2
// Rule: sync → all microtasks → one macrotask → repeat

// ── Starvation example ──────────────────────────
// If you keep queuing microtasks, macrotasks never run:
function infiniteMicrotasks() {
  Promise.resolve().then(infiniteMicrotasks); // ⚠ blocks macrotasks
}`} />
    </div>

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="javascript" code={`// ── Promise vs setTimeout priority ─────────────
function demo() {
  console.log('start');

  setTimeout(() => {
    console.log('timeout 1');
    Promise.resolve().then(() => console.log('promise inside timeout'));
  }, 0);

  new Promise((resolve) => {
    console.log('promise executor'); // sync!
    resolve();
  }).then(() => {
    console.log('promise 1');
    setTimeout(() => console.log('timeout inside promise'), 0);
  });

  console.log('end');
}

demo();
// start → promise executor → end
// → promise 1
// → timeout 1 → promise inside timeout
// → timeout inside promise`} />
    </div>
  </div>
);

// ─── Section: Async Patterns ─────────────────────────────────────────────────────

const renderAsync = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Patrones Async', 'Async Patterns')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'De callbacks a Promises a async/await — patrones de manejo de errores y ejecución paralela.',
          'From callbacks to Promises to async/await — error handling and parallel execution patterns.'
        )}
      </p>
    </div>

    <AsyncEvolutionDiagram tx={tx} />

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="javascript" code={`// ── Callback hell (avoid) ───────────────────────
getUser(id, (err, user) => {
  if (err) return handleError(err);
  getPosts(user.id, (err, posts) => {
    if (err) return handleError(err);
    getComments(posts[0].id, (err, comments) => {
      if (err) return handleError(err);
      // Pyramid of doom: hard to read, error-prone
      render(user, posts, comments);
    });
  });
});

// ── Promise chain (better) ───────────────────────
getUser(id)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => render(comments))
  .catch(err => handleError(err))
  .finally(() => setLoading(false));`} />
    </div>

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="javascript" code={`// ── async/await (best) ──────────────────────────
async function loadDashboard(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    const comments = await getComments(posts[0].id);
    return render(user, posts, comments);
  } catch (err) {
    handleError(err);
  } finally {
    setLoading(false);
  }
}

// ── Parallel execution ───────────────────────────
async function loadUserData(userId) {
  // Sequential (slow — waits for each):
  // const profile = await fetchProfile(userId);
  // const posts   = await fetchPosts(userId);

  // Parallel (fast — runs concurrently):
  const [profile, posts, followers] = await Promise.all([
    fetchProfile(userId),
    fetchPosts(userId),
    fetchFollowers(userId),
  ]);

  return { profile, posts, followers };
}

// ── Promise combinators ──────────────────────────
// allSettled: never rejects, gets all results
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r => {
  if (r.status === 'fulfilled') use(r.value);
  else log(r.reason);
});

// race: first to settle wins (timeout pattern)
const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    ),
  ]);

// any: first to FULFILL (ignores rejections)
const fastest = await Promise.any([mirror1, mirror2, mirror3]);`} />
    </div>

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="javascript" code={`// ── Async error handling patterns ───────────────
// Wrap to avoid try/catch everywhere:
const to = (promise) =>
  promise.then(data => [null, data]).catch(err => [err, null]);

async function safeRequest() {
  const [err, data] = await to(fetchData());
  if (err) { log(err); return; }
  process(data);
}

// ── Async generators ─────────────────────────────
async function* paginate(url) {
  let page = 1;
  while (true) {
    const { data, hasNext } = await fetch(\`\${url}?page=\${page}\`).then(r => r.json());
    yield data;
    if (!hasNext) break;
    page++;
  }
}

for await (const page of paginate('/api/items')) {
  processBatch(page);
}`} />
    </div>
  </div>
);

// ─── Section: TypeScript Core ────────────────────────────────────────────────────

const renderTypeScript = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        TypeScript Core
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Tipos, interfaces, genéricos y type guards. Cómo TS mejora la mantenibilidad del código.',
          'Types, interfaces, generics and type guards. How TS improves code maintainability.'
        )}
      </p>
    </div>

    <TypeSystemDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        {
          title: tx('type vs interface', 'type vs interface'),
          color: 'border-yellow-500/30 text-yellow-300',
          points: [
            tx('interface: preferida para objetos/clases (extensible con declaration merging)', 'interface: preferred for objects/classes (extensible via declaration merging)'),
            tx('type: para unions, intersections, mapped types y primitivos', 'type: for unions, intersections, mapped types and primitives'),
            tx('interface puede extends múltiple; type usa &', 'interface can extends multiple; type uses &'),
            tx('Ambas pueden ser usadas por implements en clases', 'Both can be used by implements in classes'),
          ],
        },
        {
          title: tx('Utility Types clave', 'Key Utility Types'),
          color: 'border-amber-500/30 text-amber-300',
          points: [
            'Partial<T> — todos los campos opcionales',
            'Required<T> — todos los campos obligatorios',
            'Pick<T, K> — selecciona subconjunto de keys',
            'Omit<T, K> — excluye keys específicas',
            'Record<K, V> — mapa tipado clave → valor',
            'Readonly<T> — inmutable en tiempo de compilación',
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-2 ${color.split(' ')[1]}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="typescript" code={`// ── Primitive types & annotations ──────────────
const name: string = 'Alice';
const age: number = 30;
const active: boolean = true;
const id: string | number = 42; // union type

// ── Interface vs type ────────────────────────────
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

type AdminUser = User & {
  role: 'admin' | 'superadmin';
  permissions: string[];
};

// Declaration merging (only interface):
interface Window { analytics: AnalyticsLib; }

// ── Generics with constraints ────────────────────
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface Repository<T extends { id: number }> {
  findById(id: number): Promise<T | null>;
  save(entity: Omit<T, 'id'>): Promise<T>;
  delete(id: number): Promise<void>;
}

// ── Type guards ──────────────────────────────────
function isString(val: unknown): val is string {
  return typeof val === 'string';
}

function processInput(input: string | number | null) {
  if (input === null) return 'null';
  if (typeof input === 'string') return input.toUpperCase();
  return input.toFixed(2);
}

class Cat { meow() {} }
class Dog { bark() {} }

function makeSound(animal: Cat | Dog) {
  if (animal instanceof Cat) animal.meow();
  else animal.bark();
}

// Discriminated union (best pattern):
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number };

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2;
    case 'rect':   return s.width * s.height;
  }
}`} />
    </div>

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="typescript" code={`// ── Utility types in practice ───────────────────
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

type CreateProductDTO = Omit<Product, 'id'>;
type UpdateProductDTO = Partial<Omit<Product, 'id'>>;
type ProductPreview = Pick<Product, 'id' | 'name' | 'price'>;
type ProductMap = Record<number, Product>;
const catalog: Readonly<Product[]> = [];

// ── Generic utility function ─────────────────────
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const merged = merge({ name: 'Alice' }, { age: 30 });
// Type: { name: string } & { age: number }`} />
    </div>
  </div>
);

// ─── Section: Advanced TypeScript ────────────────────────────────────────────────

const renderAdvanced = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('TS Avanzado', 'Advanced TS')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Tipos condicionales, mapped types, template literals, infer y decoradores.',
          'Conditional types, mapped types, template literal types, infer and decorators.'
        )}
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        {
          title: tx('Tipos Condicionales', 'Conditional Types'),
          color: 'border-yellow-500/30 text-yellow-300',
          points: [
            'T extends U ? X : Y',
            tx('Se evalúan en tiempo de compilación', 'Evaluated at compile time'),
            'infer: extrae tipos dentro de extends',
            'ReturnType<T>, Parameters<T>, Awaited<T>',
          ],
        },
        {
          title: tx('Mapped Types', 'Mapped Types'),
          color: 'border-amber-500/30 text-amber-300',
          points: [
            '{ [K in keyof T]: ... } — itera sobre keys',
            '+/- para añadir o quitar readonly/?',
            tx('Base de Partial, Required, Readonly', 'Base for Partial, Required, Readonly'),
            'as cláusula para renombrar keys',
          ],
        },
        {
          title: tx('Template Literal Types', 'Template Literal Types'),
          color: 'border-yellow-600/30 text-yellow-200',
          points: [
            '`${string}Handler` — tipos de string tipados',
            tx('Compone unions de strings automáticamente', 'Composes string unions automatically'),
            'Capitalize, Uppercase, Lowercase, Uncapitalize',
            tx('Útil para event names, CSS classes, API paths', 'Useful for event names, CSS, API paths'),
          ],
        },
        {
          title: tx('Decoradores', 'Decorators'),
          color: 'border-yellow-400/30 text-yellow-100',
          points: [
            tx('Stage 3 proposal, ya estable en TS 5.0+', 'Stage 3 proposal, stable in TS 5.0+'),
            '@Injectable, @Component, @Entity (NestJS/Angular)',
            tx('Class, method, property, parameter decorators', 'Class, method, property, parameter decorators'),
            tx('Metadata reflection con reflect-metadata', 'Metadata reflection with reflect-metadata'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-2 ${color.split(' ')[1]}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="typescript" code={`// ── Conditional types ───────────────────────────
type IsArray<T> = T extends any[] ? true : false;
type IsString<T> = T extends string ? 'yes' : 'no';

// infer: extract the inner type
type Unwrap<T> = T extends Promise<infer U> ? U : T;
type UnwrapArray<T> = T extends (infer Item)[] ? Item : T;

type A = Unwrap<Promise<number>>;       // number
type B = UnwrapArray<string[]>;         // string

// Built-in conditional utility types:
type R = ReturnType<() => { id: number }>;  // { id: number }
type P = Parameters<(a: string, b: number) => void>; // [string, number]
type AW = Awaited<Promise<Promise<string>>>;           // string

// ── Mapped types ─────────────────────────────────
type Mutable<T> = { -readonly [K in keyof T]: T[K] };
type Optional<T> = { [K in keyof T]?: T[K] };
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Remap keys with 'as':
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
};

interface Person { name: string; age: number; }
type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }

// ── Template literal types ────────────────────────
type Direction = 'top' | 'right' | 'bottom' | 'left';
type CSSProp = \`margin-\${Direction}\` | \`padding-\${Direction}\`;
// 'margin-top' | 'margin-right' | ... | 'padding-left'

type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<'click'>; // 'onClick'`} />
    </div>

    <div className="min-w-0 overflow-hidden">
      <CodeBlock language="typescript" code={`// ── Class decorators (NestJS / Angular style) ────
function Injectable(target: new (...args: any[]) => any) {
  Reflect.defineMetadata('injectable', true, target);
  return target;
}

function Log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    const result = original.apply(this, args);
    console.log(\`\${key} returned\`, result);
    return result;
  };
  return descriptor;
}

@Injectable
class UserService {
  @Log
  findUser(id: number) {
    return { id, name: 'Alice' };
  }
}

// ── Discriminated union exhaustiveness ───────────
type Action =
  | { type: 'increment'; by: number }
  | { type: 'decrement'; by: number }
  | { type: 'reset' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'increment': return state + action.by;
    case 'decrement': return state - action.by;
    case 'reset':     return 0;
    default:
      // Exhaustiveness check: never is assignable only if all cases covered
      const _exhaustive: never = action;
      return _exhaustive;
  }
}`} />
    </div>
  </div>
);

// ─── Section: Interview Q&A ──────────────────────────────────────────────────────

const InterviewSection = ({ tx }) => {
  const [openItem, setOpenItem] = useState(null);

  const groups = [
    {
      level: 'Junior',
      color: 'border-green-500/30 text-green-300',
      badgeColor: 'bg-green-500/20 border-green-500/40 text-green-300',
      items: [
        {
          q: tx('¿Qué es un closure?', 'What is a closure?'),
          a: tx(
            'Una función que "recuerda" las variables de su scope léxico exterior aunque se ejecute fuera de él — el scope no se destruye mientras algo lo referencie. Se forma cada vez que una función anida a otra, no solo cuando se retorna explícitamente. Casos típicos: contadores privados, memoización, curry y manejo de estado en callbacks (ej. handlers de event listeners que "recuerdan" el elemento del loop).',
            'A function that "remembers" variables from its enclosing lexical scope even when executed outside it — the scope isn\'t destroyed while something still references it. It forms every time a function nests another, not only when explicitly returned. Typical uses: private counters, memoization, currying and state in callbacks (e.g. event listeners that "remember" a loop element).'
          ),
        },
        {
          q: tx('var vs let vs const — ¿cuál es la diferencia?', 'var vs let vs const — what is the difference?'),
          a: tx(
            'var: function-scoped (ignora bloques {}), se hoistea e inicializa en undefined, se puede re-declarar en el mismo scope sin error. let: block-scoped, se hoistea pero queda en la Temporal Dead Zone (TDZ) hasta la línea de declaración — acceder antes lanza ReferenceError — no re-declarable, sí re-asignable. const: igual que let pero el binding no se puede re-asignar; el objeto o array que apunta SÍ es mutable por dentro (const arr = [] seguido de arr.push(1) es válido). Trampa clásica de entrevista: var en un for-loop comparte una sola variable entre callbacks async (setTimeout loggea 3,3,3), let crea un binding nuevo por iteración (loggea 0,1,2).',
            'var: function-scoped (ignores {} blocks), hoisted and initialized to undefined, can be re-declared in the same scope without error. let: block-scoped, hoisted but sits in the Temporal Dead Zone (TDZ) until its declaration line — accessing it earlier throws a ReferenceError — not re-declarable, but re-assignable. const: same as let but the binding can\'t be re-assigned; the object/array it points to IS still mutable internally (const arr = [] then arr.push(1) is valid). Classic interview trap: var in a for-loop shares one variable across async callbacks (setTimeout logs 3,3,3), let creates a fresh binding per iteration (logs 0,1,2).'
          ),
        },
        {
          q: tx('¿Qué es hoisting?', 'What is hoisting?'),
          a: tx(
            'Durante la fase de compilación, el motor JS registra las declaraciones (var, let, const, function, class) en el scope antes de ejecutar ninguna línea. Las function declarations se hoistean completas (se pueden llamar antes de su definición). var se hoistea inicializada en undefined. let/const/class se hoistean pero quedan en la TDZ — existen pero son inaccesibles hasta su línea. Las function expressions y arrow functions asignadas a var/let NO se hoistean con su valor, solo el nombre de la variable.',
            'During the compilation phase, the JS engine registers declarations (var, let, const, function, class) in scope before executing any line. Function declarations hoist fully (callable before their definition). var hoists initialized to undefined. let/const/class hoist but sit in the TDZ — they exist but are inaccessible until their line. Function expressions and arrow functions assigned to var/let do NOT hoist with their value, only the variable name does.'
          ),
        },
        {
          q: '== vs ===',
          a: tx(
            '== (equalidad abstracta) permite coerción de tipo antes de comparar (1 == "1" → true, null == undefined → true, 0 == false → true). === (equalidad estricta) compara valor Y tipo sin coerción (1 === "1" → false). Convención: usar siempre === salvo el caso idiomático x == null (cubre null y undefined a la vez). Caso especial: NaN === NaN es false; usar Number.isNaN() u Object.is().',
            '== (abstract equality) coerces types before comparing (1 == "1" → true, null == undefined → true, 0 == false → true). === (strict equality) compares value AND type with no coercion (1 === "1" → false). Convention: always use ===, except the idiomatic x == null (covers both null and undefined). Edge case: NaN === NaN is false; use Number.isNaN() or Object.is() instead.'
          ),
        },
        {
          q: tx('typeof vs instanceof', 'typeof vs instanceof'),
          a: tx(
            'typeof devuelve un string con el tipo primitivo ("string", "number", "boolean", "undefined", "object", "function", "symbol", "bigint") — pero typeof null es "object" (bug histórico) y typeof [] también es "object". instanceof verifica si el prototype de un objeto está en la cadena de prototipos de un constructor (arr instanceof Array → true). Para arrays usar Array.isArray(), más confiable entre realms/iframes.',
            'typeof returns a string with the primitive type ("string", "number", "boolean", "undefined", "object", "function", "symbol", "bigint") — but typeof null is "object" (a historical bug) and typeof [] is also "object". instanceof checks whether an object\'s prototype sits in a constructor\'s prototype chain (arr instanceof Array → true). For arrays prefer Array.isArray(), more reliable across realms/iframes.'
          ),
        },
        {
          q: 'null vs undefined',
          a: tx(
            'undefined: valor por defecto de una variable declarada sin asignar, de un parámetro no pasado, o de una property inexistente. null: ausencia de valor asignada intencionalmente por el programador. typeof undefined → "undefined", typeof null → "object". Se comparan iguales con == pero no con ===. Buena práctica: usar null explícito para "vacío a propósito" y dejar undefined para "nunca se asignó".',
            'undefined: the default value of a declared-but-unassigned variable, a missing parameter, or a nonexistent property. null: absence of value assigned intentionally by the developer. typeof undefined → "undefined", typeof null → "object". They compare equal with == but not ===. Good practice: use explicit null for "intentionally empty", leave undefined for "never assigned".'
          ),
        },
        {
          q: tx('Arrow function vs función tradicional', 'Arrow function vs regular function'),
          a: tx(
            'Arrow functions no tienen su propio this, arguments, super ni new.target — los heredan léxicamente del scope donde se definen, lo que las hace ideales dentro de callbacks y class methods (evita el patrón const self = this). No se pueden usar como constructores (new arrowFn() lanza TypeError) ni tienen prototype. Las funciones tradicionales sí bindean this dinámicamente según cómo se invocan (objeto.metodo(), call/apply/bind, o global/undefined en strict mode).',
            'Arrow functions have no own this, arguments, super or new.target — they inherit them lexically from the defining scope, which makes them ideal inside callbacks and class fields (avoids the const self = this pattern). They can\'t be used as constructors (new arrowFn() throws a TypeError) and have no prototype. Regular functions bind this dynamically based on how they\'re invoked (obj.method(), call/apply/bind, or global/undefined in strict mode).'
          ),
        },
        {
          q: tx('Destructuring y spread/rest — ¿para qué sirven?', 'Destructuring and spread/rest — what are they for?'),
          a: tx(
            'Destructuring extrae valores de arrays/objetos en variables individuales, con valores por defecto y renombrado: const { name: n = "?" } = user. Spread (...) expande un iterable/objeto en elementos individuales — clonado superficial, merge de objetos, pasar args: [...arr1, ...arr2], { ...defaults, ...overrides }. Rest (mismo símbolo, contexto distinto) agrupa lo restante: function f(a, ...rest) o const { id, ...others } = obj. Ambos hacen copias shallow, no deep clone.',
            'Destructuring pulls values out of arrays/objects into individual variables, with defaults and renaming: const { name: n = "?" } = user. Spread (...) expands an iterable/object into individual elements — shallow clone, object merge, passing args: [...arr1, ...arr2], { ...defaults, ...overrides }. Rest (same symbol, different context) collects what\'s left: function f(a, ...rest) or const { id, ...others } = obj. Both produce shallow copies, not deep clones.'
          ),
        },
      ],
    },
    {
      level: 'Mid',
      color: 'border-yellow-500/30 text-yellow-300',
      badgeColor: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
      items: [
        {
          q: tx('Explica el event loop', 'Explain the event loop'),
          a: tx(
            'JS es single-threaded. El call stack ejecuta código síncrono (LIFO). Las Web APIs / APIs del runtime (timers, I/O, fetch) manejan las tareas async fuera del stack. Al completarse, sus callbacks van a la microtask queue (Promises, queueMicrotask) o macrotask queue (setTimeout, I/O). El event loop mueve tareas al stack solo cuando este está vacío, y SIEMPRE vacía toda la microtask queue antes de tomar la siguiente macrotask — por eso Promises "corren antes" que setTimeout aunque ambos tengan delay 0.',
            'JS is single-threaded. The call stack executes synchronous code (LIFO). Web APIs / runtime APIs (timers, I/O, fetch) handle async work outside the stack. On completion their callbacks land in the microtask queue (Promises, queueMicrotask) or macrotask queue (setTimeout, I/O). The event loop moves tasks to the stack only when it\'s empty, and ALWAYS fully drains the microtask queue before taking the next macrotask — which is why Promises "run before" setTimeout even with a 0ms delay.'
          ),
        },
        {
          q: tx('¿Promise vs async/await?', 'Promise vs async/await?'),
          a: tx(
            'async/await es syntactic sugar sobre Promises — toda función async retorna una Promise implícitamente, y await simplemente pausa la ejecución hasta que esa Promise se resuelve o rechaza. Bajo el capó comparten el mismo motor de microtasks. async/await mejora la legibilidad (código con forma síncrona) y el manejo de errores (try/catch en vez de .catch encadenado), pero para ejecución paralela sigues necesitando Promise.all/.allSettled/.race/.any — no hay equivalente sintáctico directo en await. Top-level await ya es válido en ES modules.',
            'async/await is syntactic sugar over Promises — every async function implicitly returns a Promise, and await simply pauses execution until that Promise settles. Under the hood they share the same microtask engine. async/await improves readability (synchronous-looking code) and error handling (try/catch instead of chained .catch), but for parallel execution you still need Promise.all/.allSettled/.race/.any — there\'s no direct syntactic await equivalent. Top-level await is now valid in ES modules.'
          ),
        },
        {
          q: tx('¿Qué son los generadores?', 'What are generators?'),
          a: tx(
            'Funciones (function*) que pueden pausar su ejecución en cada yield y reanudarla donde quedaron, manteniendo su estado interno entre pausas. Retornan un objeto iterador con .next()/.return()/.throw(). Casos de uso: secuencias infinitas y lazy evaluation, implementar iterables custom (Symbol.iterator), y históricamente fueron la base de librerías como co/redux-saga para manejar async antes de que async/await existiera — de hecho async/await se puede pensar como generadores + Promises + un runner automático.',
            'Functions (function*) that can pause execution at each yield and resume where they left off, keeping internal state across pauses. They return an iterator object with .next()/.return()/.throw(). Use cases: infinite sequences and lazy evaluation, implementing custom iterables (Symbol.iterator), and historically they underpinned libraries like co/redux-saga for handling async before async/await existed — in fact async/await can be thought of as generators + Promises + an automatic runner.'
          ),
        },
        {
          q: tx('WeakMap vs Map', 'WeakMap vs Map'),
          a: tx(
            'WeakMap: las keys deben ser objetos, son referencias débiles (si no hay otra referencia al objeto, el garbage collector puede recolectarlo y la entrada desaparece sola), no es iterable ni tiene .size — por eso no puede tener memory leaks de metadatos. Map: acepta cualquier tipo de key (primitivos incluidos), mantiene referencias fuertes, es iterable y ordenado por inserción. WeakMap es ideal para asociar datos privados a un objeto (ej. estado interno de una clase) sin impedir su GC.',
            'WeakMap: keys must be objects, held via weak references (if nothing else references the object, the garbage collector can reclaim it and the entry vanishes on its own), not iterable and no .size — which means it can\'t leak metadata. Map: accepts any key type (primitives included), holds strong references, is iterable and insertion-ordered. WeakMap is ideal for attaching private data to an object (e.g. a class\'s internal state) without blocking its GC.'
          ),
        },
        {
          q: tx('¿Cómo funciona this y cómo se controla con call/apply/bind?', 'How does this work and how do you control it with call/apply/bind?'),
          a: tx(
            'this se determina en tiempo de EJECUCIÓN según cómo se llama la función, no dónde se define (excepto en arrow functions). Reglas en orden de prioridad: new Foo() → this es la instancia nueva; fn.call(ctx)/fn.apply(ctx) → this es ctx explícito; obj.method() → this es obj (implicit binding); llamada suelta fn() → this es undefined en strict mode o globalThis en sloppy mode. call/apply invocan la función inmediatamente con un this dado (call recibe args uno a uno, apply como array); bind retorna una nueva función con this fijado permanentemente, útil para pasar métodos como callbacks sin perder contexto.',
            'this is resolved at CALL TIME based on how the function is invoked, not where it\'s defined (except in arrow functions). Priority order: new Foo() → this is the new instance; fn.call(ctx)/fn.apply(ctx) → this is the explicit ctx; obj.method() → this is obj (implicit binding); a bare fn() call → this is undefined in strict mode or globalThis in sloppy mode. call/apply invoke the function immediately with a given this (call takes args one by one, apply as an array); bind returns a new function with this permanently fixed — useful for passing methods as callbacks without losing context.'
          ),
        },
        {
          q: tx('Cadena de prototipos: ¿cómo funciona la herencia en JS?', 'Prototype chain: how does inheritance work in JS?'),
          a: tx(
            'JS usa herencia prototípica, no clases reales (las class de ES6 son sugar sobre prototypes). Cada objeto tiene un link interno [[Prototype]] (accesible vía Object.getPrototypeOf u obj.__proto__) a otro objeto. Al leer una propiedad, el motor busca en el objeto y, si no está, sube por la cadena hasta encontrarla o llegar a null. Object.create(proto) crea un objeto con ese prototype explícito. class Foo extends Bar establece Foo.prototype.__proto__ = Bar.prototype automáticamente.',
            'JS uses prototypal inheritance, not real classes (ES6 class is sugar over prototypes). Every object has an internal [[Prototype]] link (accessible via Object.getPrototypeOf or obj.__proto__) to another object. When reading a property, the engine looks on the object itself, then walks up the chain until it finds it or hits null. Object.create(proto) creates an object with that explicit prototype. class Foo extends Bar sets Foo.prototype.__proto__ = Bar.prototype automatically.'
          ),
        },
        {
          q: 'Debounce vs throttle',
          a: tx(
            'Ambos limitan cuántas veces se ejecuta una función ante eventos frecuentes (scroll, resize, input), pero con estrategias distintas. Debounce: espera a que pase X ms de silencio desde la ÚLTIMA llamada antes de ejecutar — ideal para search-as-you-type o validación de formularios, donde solo importa el resultado final. Throttle: garantiza que la función se ejecute como máximo una vez cada X ms, sin importar cuántas veces se dispare el evento — ideal para scroll handlers o actualizar posición de un drag, donde necesitas feedback continuo pero limitado.',
            'Both limit how often a function runs in response to frequent events (scroll, resize, input), but with different strategies. Debounce: waits for X ms of silence since the LAST call before executing — ideal for search-as-you-type or form validation, where only the final result matters. Throttle: guarantees the function runs at most once every X ms, no matter how often the event fires — ideal for scroll handlers or updating drag position, where you need continuous but rate-limited feedback.'
          ),
        },
        {
          q: 'Optional chaining (?.) y nullish coalescing (??)',
          a: tx(
            'Optional chaining (?.) corta cortocircuito y retorna undefined si cualquier eslabón de la cadena es null/undefined, evitando el clásico Cannot read property of undefined: user?.address?.street, arr?.[0], fn?.(). Nullish coalescing (??) devuelve el operando derecho solo si el izquierdo es null o undefined — a diferencia de ||, NO trata 0, "" o false como "vacíos": count ?? 10 respeta count = 0, mientras count || 10 lo pisaría con 10.',
            'Optional chaining (?.) short-circuits and returns undefined if any link in the chain is null/undefined, avoiding the classic Cannot read property of undefined: user?.address?.street, arr?.[0], fn?.(). Nullish coalescing (??) returns the right-hand operand only when the left is null or undefined — unlike ||, it does NOT treat 0, "" or false as "empty": count ?? 10 respects count = 0, while count || 10 would overwrite it with 10.'
          ),
        },
      ],
    },
    {
      level: 'Senior',
      color: 'border-red-400/30 text-red-300',
      badgeColor: 'bg-red-500/20 border-red-500/40 text-red-300',
      items: [
        {
          q: tx('¿Cómo funcionan los conditional types de TS?', 'Explain TypeScript conditional types'),
          a: tx(
            'T extends U ? X : Y — evaluados en tiempo de compilación, permiten ramificar un tipo según si T es asignable a U. Con infer se pueden extraer tipos internos dentro de la rama true (ej. Unwrap<Promise<T>>). Son distributivos automáticamente sobre union types: si T es A | B, el conditional se aplica a cada miembro por separado y luego se unen los resultados (a menos que envuelvas T en [T] para desactivar la distribución). Forman la base de ReturnType, Parameters, Awaited, Exclude y Extract.',
            'T extends U ? X : Y — evaluated at compile time, they branch a type based on whether T is assignable to U. With infer you can extract inner types within the true branch (e.g. Unwrap<Promise<T>>). They automatically distribute over union types: if T is A | B, the conditional applies to each member separately and the results are unioned back (unless you wrap T in [T] to opt out of distribution). They form the basis of ReturnType, Parameters, Awaited, Exclude and Extract.'
          ),
        },
        {
          q: tx('¿Cómo optimiza V8 el JavaScript?', 'How does V8 optimize JavaScript?'),
          a: tx(
            'V8 usa JIT compilation: primero interpreta bytecode con Ignition, luego perfila el código en ejecución y compila con Turbofan las funciones "hot" a máquina optimizada. Usa hidden classes: objetos creados con la misma forma (mismas properties, mismo orden de asignación) comparten shape, lo que permite acceso a properties en tiempo O(1) vía inline caches en vez de lookup dinámico. Si una función recibe tipos distintos en llamadas sucesivas (polimorfismo), V8 deoptimiza y vuelve a interpretar — por eso mantener shapes consistentes y evitar cambiar el tipo de una variable importa para performance.',
            'V8 uses JIT compilation: it first interprets bytecode with Ignition, then profiles running code and compiles "hot" functions to optimized machine code with Turbofan. It uses hidden classes: objects created with the same shape (same properties, same assignment order) share a class, enabling O(1) property access via inline caches instead of dynamic lookup. If a function receives different types across successive calls (polymorphism), V8 deoptimizes and falls back to interpreting — which is why keeping shapes consistent and avoiding type-changing variables matters for performance.'
          ),
        },
        {
          q: tx('Microtask vs macrotask queue en detalle', 'Microtask vs macrotask queue in detail'),
          a: tx(
            'Tras cada macrotask, el motor vacía COMPLETAMENTE la microtask queue (incluyendo las microtasks encoladas durante el propio vaciado), antes de renderizar o tomar la siguiente macrotask. Esto puede starvar macrotasks e incluso bloquear el render si se encolan microtasks infinitamente. Node.js añade dos colas extra con prioridades propias: process.nextTick (mayor prioridad que Promise microtasks, se vacía primero) y setImmediate (macrotask de la check phase, corre después de I/O callbacks en cada vuelta del loop).',
            'After each macrotask, the engine fully drains the microtask queue (including microtasks enqueued during the draining itself), before rendering or taking the next macrotask. This can starve macrotasks and even block rendering if microtasks are enqueued infinitely. Node.js adds two extra queues with their own priorities: process.nextTick (higher priority than Promise microtasks, drained first) and setImmediate (a check-phase macrotask, runs after I/O callbacks on each loop turn).'
          ),
        },
        {
          q: tx('Tree shaking: ¿qué es y cómo habilitarlo?', 'Tree shaking: what is it and how to enable it?'),
          a: tx(
            'Eliminación de código no utilizado (dead code) en tiempo de build, basada en el análisis estático del grafo de dependencias de ES modules. Requiere: import/export estático (no require ni import dinámico condicional), un bundler que lo soporte (Rollup/Webpack/Vite/esbuild), declarar "sideEffects": false en package.json para que el bundler sepa que puede eliminar módulos sin usar con seguridad, y evitar re-exportar todo desde barrel files (index.js con export * suele arrastrar código innecesario porque rompe el análisis estático).',
            'Dead code elimination at build time, based on static analysis of the ES modules dependency graph. Requires: static import/export (no require or conditional dynamic import), a bundler that supports it (Rollup/Webpack/Vite/esbuild), declaring "sideEffects": false in package.json so the bundler knows it can safely drop unused modules, and avoiding re-exporting everything from barrel files (an index.js with export * usually drags in unnecessary code because it breaks static analysis).'
          ),
        },
        {
          q: tx('¿Qué son Proxy y Reflect?', 'What are Proxy and Reflect?'),
          a: tx(
            'Proxy envuelve un objeto y permite interceptar operaciones fundamentales (get, set, has, deleteProperty, apply...) mediante "traps", habilitando reactividad (así funciona Vue 3), validación automática, objetos observables o APIs con acceso dinámico tipo ORM. Reflect es el complemento: expone las mismas operaciones fundamentales como métodos estáticos (Reflect.get, Reflect.set) con comportamiento por defecto consistente — dentro de un trap de Proxy se usa Reflect.metodo(...args) para delegar al comportamiento original sin reimplementarlo a mano.',
            'Proxy wraps an object and lets you intercept fundamental operations (get, set, has, deleteProperty, apply...) via "traps", enabling reactivity (this is how Vue 3 works), automatic validation, observable objects, or ORM-style dynamic access APIs. Reflect is the counterpart: it exposes those same fundamental operations as static methods (Reflect.get, Reflect.set) with consistent default behavior — inside a Proxy trap you call Reflect.method(...args) to delegate to the original behavior instead of reimplementing it by hand.'
          ),
        },
        {
          q: tx('¿Cómo funciona el garbage collector en V8?', 'How does the garbage collector work in V8?'),
          a: tx(
            'V8 usa un GC generacional: el heap se divide en young generation (objetos nuevos, se recolecta frecuentemente con el algoritmo Scavenge, rápido y barato) y old generation (objetos que sobreviven varias rondas, se recolecta con Mark-Sweep-Compact, más lento pero menos frecuente). El algoritmo base es mark-and-sweep: desde raíces alcanzables (globals, stack) marca todo objeto vivo, y lo no marcado se libera. Memory leaks comunes en JS: listeners no removidos, closures que retienen referencias grandes innecesariamente, timers no limpiados, y variables globales accidentales.',
            'V8 uses a generational GC: the heap splits into young generation (new objects, collected frequently via the Scavenge algorithm, fast and cheap) and old generation (objects that survive several rounds, collected via Mark-Sweep-Compact, slower but less frequent). The underlying algorithm is mark-and-sweep: starting from reachable roots (globals, stack) it marks every live object, and anything unmarked gets freed. Common JS memory leaks: listeners never removed, closures unnecessarily retaining large references, uncleared timers, and accidental global variables.'
          ),
        },
        {
          q: tx('Structural typing en TS: ¿cómo se compara con nominal typing?', 'Structural typing in TS: how does it compare to nominal typing?'),
          a: tx(
            'TS usa structural typing (duck typing): dos tipos son compatibles si tienen la misma forma (shape), sin importar su nombre o jerarquía declarada — si camina como pato y grazna como pato, es un pato. Esto contrasta con nominal typing (Java, C#), donde la compatibilidad depende del nombre/herencia explícita de la clase. Consecuencia práctica: un objeto literal que cumple una interface es asignable aunque nunca la haya implementado explícitamente. Para simular nominal typing en TS se usa "branding" con una property privada única (tipo { __brand: "UserId" }).',
            'TS uses structural typing (duck typing): two types are compatible if they have the same shape, regardless of their declared name or hierarchy — if it walks like a duck and quacks like a duck, it\'s a duck. This contrasts with nominal typing (Java, C#), where compatibility depends on the class\'s explicit name/inheritance. Practical consequence: an object literal satisfying an interface is assignable even if it never explicitly implemented it. To simulate nominal typing in TS, developers use "branding" with a unique private property (like { __brand: "UserId" }).'
          ),
        },
        {
          q: tx('Varianza en TS: covarianza y contravarianza en genéricos', 'Variance in TS: covariance and contravariance in generics'),
          a: tx(
            'Covarianza: si Dog extends Animal, entonces Dog[] se puede usar donde se espera Animal[] — TS permite esto por posiciones de "salida" (return types, propiedades de lectura). Contravarianza: para posiciones de "entrada" (parámetros de función), lo seguro es lo inverso — un handler que acepta Animal es asignable donde se espera uno que acepte Dog, porque puede manejar cualquier Dog. TS relaja esto por defecto con "bivariant method checking" para parámetros de métodos (no de function types standalone) por compatibilidad práctica, lo cual es técnicamente unsound pero evita falsos positivos comunes en APIs orientadas a objetos.',
            'Covariance: if Dog extends Animal, then Dog[] can be used wherever Animal[] is expected — TS allows this for "output" positions (return types, readable properties). Contravariance: for "input" positions (function parameters), the safe direction is the reverse — a handler accepting Animal is assignable where one accepting Dog is expected, because it can handle any Dog. TS relaxes this by default via "bivariant method checking" for method parameters (not standalone function types) for practical compatibility, which is technically unsound but avoids common false positives in object-oriented APIs.'
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Preguntas de Entrevista', 'Interview Q&A')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Las preguntas más comunes en entrevistas de JavaScript y TypeScript, agrupadas por nivel.',
            'The most common JavaScript and TypeScript interview questions, grouped by level.'
          )}
        </p>
      </div>

      {groups.map((group) => (
        <div key={group.level} className={`bg-slate-900/40 border ${group.color.split(' ')[0]} rounded-xl overflow-hidden`}>
          <div className={`px-4 py-3 border-b border-slate-800/60 flex items-center gap-2`}>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${group.badgeColor}`}>
              {group.level}
            </span>
            <span className="text-xs text-slate-500">{group.items.length} {tx('preguntas', 'questions')}</span>
          </div>
          <div className="divide-y divide-slate-800/60">
            {group.items.map((item, i) => {
              const key = `${group.level}-${i}`;
              const isOpen = openItem === key;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenItem(isOpen ? null : key)}
                    className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="text-sm text-slate-200 font-medium">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-yellow-400 flex-shrink-0 mt-0.5"
                    >
                      ▾
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-1">
                          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 border border-yellow-500/10 rounded-lg p-3">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────────

function JSTSPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('closures');

  const sections = [
    {
      id: 'closures',
      title: tx('Closures', 'Closures'),
      subtitle: tx('Hoisting, scope chain, closures', 'Hoisting, scope chain, closures'),
    },
    {
      id: 'eventloop',
      title: 'Event Loop',
      subtitle: tx('Call Stack, Microtasks, Macrotasks', 'Call Stack, Microtasks, Macrotasks'),
    },
    {
      id: 'async',
      title: tx('Async Patterns', 'Async Patterns'),
      subtitle: tx('Callbacks → Promises → async/await', 'Callbacks → Promises → async/await'),
    },
    {
      id: 'typescript',
      title: 'TypeScript Core',
      subtitle: tx('Tipos, interfaces, generics', 'Types, interfaces, generics'),
    },
    {
      id: 'advanced',
      title: tx('TS Avanzado', 'Advanced TS'),
      subtitle: tx('Decorators, conditional, mapped types', 'Decorators, conditional, mapped types'),
    },
    {
      id: 'interview',
      title: tx('Entrevista', 'Interview Q&A'),
      subtitle: tx('Junior → Senior questions', 'Junior → Senior questions'),
    },
  ];

  const renderContent = () => {
    switch (active) {
      case 'closures':   return renderClosures(tx);
      case 'eventloop':  return renderEventLoop(tx);
      case 'async':      return renderAsync(tx);
      case 'typescript': return renderTypeScript(tx);
      case 'advanced':   return renderAdvanced(tx);
      case 'interview':  return <InterviewSection tx={tx} />;
      default:           return renderClosures(tx);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                active === s.id
                  ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-300'
                  : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{s.title}</div>
              <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{s.subtitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content panel */}
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default JSTSPro;
