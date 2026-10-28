import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiJavascript, SiTypescript } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import InterviewQA from './languages/InterviewQA';
import WorkNote from './languages/WorkNote';
import { buildJsTsInterview } from './languages/jsts';
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
          'El scope decide dónde vive cada variable, y un closure es una función que se lleva ese scope consigo. Es de lo primero que preguntan en una entrevista de JavaScript, y explica bugs reales del día a día.',
          'Scope decides where each variable lives, and a closure is a function that carries that scope with it. It’s one of the first things asked in a JavaScript interview, and it explains real everyday bugs.'
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
            tx('Vive en toda la función, no solo en el bloque', 'Lives in the whole function, not just the block'),
            tx('Se “sube” al inicio y vale undefined hasta su línea', 'Gets “hoisted” and is undefined until its line'),
            tx('Se puede volver a declarar sin error', 'Can be declared again without an error'),
            tx('En código moderno ya no se usa', 'Modern code no longer uses it'),
          ],
        },
        {
          title: 'let',
          color: 'border-yellow-500/30 text-yellow-300',
          points: [
            tx('Vive solo dentro de su bloque { }', 'Lives only inside its { } block'),
            tx('Existe desde el inicio, pero usarla antes de su línea da error (TDZ)', 'Exists from the start, but using it before its line throws (TDZ)'),
            tx('Se puede reasignar, pero no redeclarar', 'Can be reassigned, not redeclared'),
            tx('Para valores que cambian, como un contador', 'For values that change, like a counter'),
          ],
        },
        {
          title: 'const',
          color: 'border-green-500/30 text-green-300',
          points: [
            tx('Vive dentro del bloque, igual que let', 'Lives inside the block, like let'),
            tx('Tiene la misma TDZ que let', 'Has the same TDZ as let'),
            tx('No se puede reasignar: es mi opción por defecto', 'Can’t be reassigned: it’s my default choice'),
            tx('Ojo: si es un objeto o array, su contenido sí puede cambiar', 'Careful: if it’s an object or array, its contents can still change'),
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

    <WorkNote tx={tx} accent="yellow">
      {tx(
        'En React, la mayoría de los bugs raros con hooks son closures: un callback o un useEffect que “ve” el estado de un render anterior. Se arregla con las dependencias correctas o con la forma funcional setX(prev => ...).',
        'In React, most weird hook bugs are closures: a callback or useEffect that “sees” state from an earlier render. You fix it with the right dependencies or the functional form setX(prev => ...).'
      )}
    </WorkNote>
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
          'JavaScript corre en un solo hilo y aun así no se bloquea: lo lento (timers, red, disco) se resuelve afuera y vuelve por colas. Entender el orden de esas colas es lo que te permite predecir qué se imprime primero.',
          'JavaScript runs on a single thread and still doesn’t block: slow work (timers, network, disk) happens outside and comes back through queues. Knowing the order of those queues is what lets you predict what prints first.'
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
            tx('Se vacía completa antes de pasar a la siguiente macrotask', 'It’s fully drained before the next macrotask'),
          ],
        },
        {
          title: tx('Macrotask Queue', 'Macrotask Queue'),
          color: 'border-amber-500/30 text-amber-300',
          badge: tx('Baja prioridad', 'Lower priority'),
          points: [
            'setTimeout / setInterval',
            'setImmediate (Node.js)',
            tx('Callbacks de I/O y render de la UI', 'I/O callbacks and UI rendering'),
            tx('Se toma una por vuelta del event loop', 'One is taken per event loop turn'),
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

    <WorkNote tx={tx} accent="yellow">
      {tx(
        'En los servicios Node/NestJS que hice para Intercorp y Lynk, la consecuencia práctica es simple: un cálculo pesado en el hilo principal frena a todos los requests. Ese trabajo va a un worker o a otro servicio.',
        'In the Node/NestJS services I built for Intercorp and Lynk, the practical consequence is simple: a heavy computation on the main thread slows every request. That work goes to a worker or another service.'
      )}
    </WorkNote>
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
          'Callbacks, promesas y async/await resuelven lo mismo con distinta comodidad. Lo que de verdad importa es manejar bien los errores y saber cuándo lanzar llamadas en paralelo en vez de una tras otra.',
          'Callbacks, promises and async/await solve the same problem with different levels of comfort. What really matters is handling errors well and knowing when to fire calls in parallel instead of one after another.'
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

    <WorkNote tx={tx} accent="yellow">
      {tx(
        'Lo que más miro en code review: awaits en serie que podrían ir juntos con Promise.all, y promesas que nadie captura. La primera es la mejora de rendimiento más barata que existe.',
        'What I look for most in code review: sequential awaits that could run together with Promise.all, and promises nobody catches. The first one is the cheapest performance win there is.'
      )}
    </WorkNote>
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
          'TypeScript es JavaScript con tipos que se revisan al compilar y desaparecen al ejecutar. Su valor aparece cuando el proyecto crece: cambias algo y el compilador te muestra todo lo que rompiste.',
          'TypeScript is JavaScript with types that are checked at compile time and vanish at runtime. Its value shows up as the project grows: you change something and the compiler shows you everything you broke.'
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
            tx('interface para la forma de objetos y clases; se puede extender y “fusionar”', 'interface for the shape of objects and classes; it can be extended and “merged”'),
            tx('type para todo lo demás: uniones, intersecciones y tipos calculados', 'type for everything else: unions, intersections and computed types'),
            tx('interface combina con extends; type combina con &', 'interface combines with extends; type combines with &'),
            tx('Una clase puede implementar cualquiera de las dos', 'A class can implement either one'),
          ],
        },
        {
          title: tx('Utility Types clave', 'Key Utility Types'),
          color: 'border-amber-500/30 text-amber-300',
          points: [
            tx('Partial<T>: todo opcional, ideal para un PATCH', 'Partial<T>: everything optional, great for a PATCH'),
            tx('Required<T>: todo obligatorio', 'Required<T>: everything required'),
            tx('Pick<T, K>: solo los campos que eliges', 'Pick<T, K>: only the fields you choose'),
            tx('Omit<T, K>: todo menos esos campos (por ejemplo, sin password)', 'Omit<T, K>: everything except those fields (say, no password)'),
            tx('Record<K, V>: un diccionario con claves y valores tipados', 'Record<K, V>: a dictionary with typed keys and values'),
            tx('Readonly<T>: no se puede modificar (solo al compilar)', 'Readonly<T>: can’t be modified (compile time only)'),
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

    <WorkNote tx={tx} accent="yellow">
      {tx(
        'Con Angular (de Equifax a Qorta) y NestJS, TypeScript fue mi día a día. Lo que más uso: interfaces para los DTOs que llegan del backend y Partial, Pick u Omit para no duplicarlos.',
        'With Angular (from Equifax to Qorta) and NestJS, TypeScript was my everyday tool. What I use most: interfaces for the DTOs coming from the backend, and Partial, Pick or Omit so I don’t duplicate them.'
      )}
    </WorkNote>
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
          'Esto ya es TypeScript para escribir tipos reutilizables: tipos que se calculan a partir de otros. No se usa todos los días, pero aparece en entrevistas senior y te ayuda a leer los tipos de librerías como React o NestJS.',
          'This is TypeScript for writing reusable types: types computed from other types. You don’t use it every day, but it shows up in senior interviews and helps you read the types of libraries like React or NestJS.'
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
            tx('Un if a nivel de tipos, resuelto al compilar', 'An if at the type level, resolved at compile time'),
            tx('infer saca un tipo de adentro de otro', 'infer pulls a type out of another'),
            'ReturnType<T>, Parameters<T>, Awaited<T>',
          ],
        },
        {
          title: tx('Mapped Types', 'Mapped Types'),
          color: 'border-amber-500/30 text-amber-300',
          points: [
            tx('{ [K in keyof T]: ... } recorre las claves de un tipo', '{ [K in keyof T]: ... } walks the keys of a type'),
            tx('Con + y - agregas o quitas readonly y ?', 'With + and - you add or remove readonly and ?'),
            tx('Así están hechos Partial, Required y Readonly', 'That’s how Partial, Required and Readonly are built'),
            tx('Con as puedes renombrar las claves', 'With as you can rename the keys'),
          ],
        },
        {
          title: tx('Template Literal Types', 'Template Literal Types'),
          color: 'border-yellow-600/30 text-yellow-200',
          points: [
            tx('`${string}Handler`: strings con un formato tipado', '`${string}Handler`: strings with a typed format'),
            tx('Combina uniones de strings por ti', 'Combines string unions for you'),
            'Capitalize, Uppercase, Lowercase, Uncapitalize',
            tx('Útil para nombres de eventos, clases CSS o rutas de API', 'Handy for event names, CSS classes or API paths'),
          ],
        },
        {
          title: tx('Decoradores', 'Decorators'),
          color: 'border-yellow-400/30 text-yellow-100',
          points: [
            tx('TS 5.0 soporta los decoradores estándar (Stage 3)', 'TS 5.0 supports standard (Stage 3) decorators'),
            tx('Angular y NestJS siguen usando los “experimentales” (@Component, @Injectable)', 'Angular and NestJS still use the “experimental” ones (@Component, @Injectable)'),
            tx('Se aplican a clases, métodos, propiedades y parámetros', 'They apply to classes, methods, properties and parameters'),
            tx('La inyección de dependencias de esos frameworks se apoya en reflect-metadata', 'Those frameworks’ dependency injection relies on reflect-metadata'),
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

    <WorkNote tx={tx} accent="yellow">
      {tx(
        'Los decoradores los uso todo el tiempo sin escribirlos: @Component en Angular, @Controller e @Injectable en NestJS. Escribir uno propio es raro; entender cómo funcionan ayuda a depurar la inyección de dependencias.',
        'I use decorators all the time without writing them: @Component in Angular, @Controller and @Injectable in NestJS. Writing your own is rare; understanding how they work helps debug dependency injection.'
      )}
    </WorkNote>
  </div>
);

// ─── Section: Interview Q&A ──────────────────────────────────────────────────────

const InterviewSection = ({ tx }) => (
  <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Preguntas de Entrevista', 'Interview Q&A')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Respuestas cortas, como las diría en una entrevista, agrupadas por nivel.', 'Short answers, the way I would say them in an interview, grouped by level.')}
        </p>
      </div>
    <InterviewQA groups={buildJsTsInterview(tx)} tx={tx} accent="yellow" />
  </div>
);

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
