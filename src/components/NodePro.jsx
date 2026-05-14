import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, MessageCircleQuestion, Cpu, GitBranch, Layers } from 'lucide-react';
import { SiNodedotjs } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

// ─── Event Loop Diagram ──────────────────────────────────────────────────────────

const EventLoopDiagram = ({ tx }) => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    { id: 'timers',    label: 'Timers',            desc: tx('setTimeout / setInterval', 'setTimeout / setInterval') },
    { id: 'pending',   label: 'Pending Callbacks', desc: tx('I/O callbacks diferidos', 'Deferred I/O callbacks') },
    { id: 'poll',      label: 'Poll',              desc: tx('Recupera nuevos eventos I/O', 'Retrieve new I/O events') },
    { id: 'check',     label: 'Check',             desc: 'setImmediate' },
    { id: 'close',     label: 'Close Callbacks',   desc: tx('socket.on("close"...)', 'socket.on("close"...)') },
    { id: 'callstack', label: 'Call Stack',        desc: tx('Ejecución síncrona', 'Synchronous execution') },
  ];

  useEffect(() => {
    const id = setInterval(() => setActivePhase(p => (p + 1) % phases.length), 1000);
    return () => clearInterval(id);
  }, []);

  // Positions for a hexagonal/circular arrangement (5 outer + 1 center)
  const outerPhases = phases.slice(0, 5);
  const centerPhase = phases[5];

  const outerPositions = [
    { top: '0%',   left: '50%',  transform: 'translate(-50%, 0)' },
    { top: '25%',  left: '88%',  transform: 'translate(-50%, 0)' },
    { top: '65%',  left: '78%',  transform: 'translate(-50%, 0)' },
    { top: '65%',  left: '22%',  transform: 'translate(-50%, 0)' },
    { top: '25%',  left: '12%',  transform: 'translate(-50%, 0)' },
  ];

  return (
    <div className="bg-slate-950/40 border border-green-500/20 rounded-xl p-4 space-y-4">
      <p className="text-xs font-semibold text-green-300 uppercase tracking-wider text-center">
        {tx('Fases del Event Loop', 'Event Loop Phases')}
      </p>

      {/* Circular diagram */}
      <div className="relative mx-auto" style={{ width: '100%', maxWidth: 360, height: 260 }}>
        {/* Orbit ring */}
        <div
          className="absolute border border-green-500/20 rounded-full"
          style={{ top: '10%', left: '10%', width: '80%', height: '80%' }}
        />

        {/* Outer phase boxes */}
        {outerPhases.map((phase, i) => {
          const pos = outerPositions[i];
          const isActive = activePhase === i;
          return (
            <motion.div
              key={phase.id}
              animate={{
                boxShadow: isActive ? '0 0 18px rgba(74,222,128,0.5)' : '0 0 0px transparent',
                scale: isActive ? 1.08 : 1,
              }}
              transition={{ duration: 0.35 }}
              className={`absolute border rounded-lg px-2 py-1.5 text-center text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-green-500/20 border-green-400/60 text-green-300'
                  : 'bg-slate-800/60 border-slate-700/50 text-slate-400'
              }`}
              style={{ ...pos, position: 'absolute', minWidth: 100 }}
            >
              <div className="font-bold">{phase.label}</div>
              <div className={`text-xs mt-0.5 ${isActive ? 'text-green-400/80' : 'text-slate-500'}`}>{phase.desc}</div>
            </motion.div>
          );
        })}

        {/* Center: Call Stack */}
        <motion.div
          animate={{
            boxShadow: activePhase === 5 ? '0 0 22px rgba(74,222,128,0.6)' : '0 0 8px rgba(74,222,128,0.2)',
            scale: activePhase === 5 ? 1.06 : 1,
          }}
          transition={{ duration: 0.35 }}
          className={`absolute border-2 rounded-full flex flex-col items-center justify-center text-center transition-colors ${
            activePhase === 5
              ? 'border-green-400/80 bg-green-500/15 text-green-300'
              : 'border-green-500/30 bg-slate-900/60 text-slate-400'
          }`}
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 88, height: 88 }}
        >
          <div className="text-xs font-bold leading-tight">Call Stack</div>
          <div className="text-xs text-slate-500 mt-0.5">{tx('centro', 'center')}</div>
        </motion.div>

        {/* Animated token arrow */}
        <motion.div
          animate={{ rotate: [0, 72, 144, 216, 288, 360] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute"
          style={{ top: '50%', left: '50%', width: 2, transformOrigin: '0 0' }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-lg shadow-green-400/60"
            style={{ position: 'absolute', top: -64, left: -5 }}
          />
        </motion.div>
      </div>

      {/* Microtask queue row */}
      <div className="border-t border-slate-800 pt-3">
        <p className="text-xs text-slate-400 font-semibold mb-2 uppercase tracking-wide">
          {tx('Microtask Queue — Corre entre fases', 'Microtask Queue — Runs between phases')}
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'process.nextTick()', priority: tx('1ª prioridad', '1st priority'), color: 'border-green-500/50 text-green-300 bg-green-500/10' },
            { label: 'Promise.then()', priority: tx('2ª prioridad', '2nd priority'), color: 'border-emerald-500/50 text-emerald-300 bg-emerald-500/10' },
            { label: 'queueMicrotask()', priority: tx('2ª prioridad', '2nd priority'), color: 'border-teal-500/40 text-teal-300 bg-teal-500/10' },
          ].map(item => (
            <div key={item.label} className={`border rounded-lg px-2.5 py-1.5 text-xs font-semibold ${item.color}`}>
              <div>{item.label}</div>
              <div className="text-xs opacity-70">{item.priority}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Async Patterns Diagram ──────────────────────────────────────────────────────

const AsyncPatternsDiagram = ({ tx }) => {
  const [activePattern, setActivePattern] = useState(0);

  const patterns = [
    {
      name: 'Callbacks',
      subtitle: tx('Callback Hell', 'Callback Hell'),
      color: 'border-red-500/50 text-red-300 bg-red-500/10',
      activeColor: 'border-red-400/80 bg-red-500/20',
      glow: '0 0 18px rgba(239,68,68,0.4)',
      lines: ['getData(url, (err, data) => {', '  parseData(data, (err, parsed) => {', '    saveData(parsed, (err, result) => {', '      // Pyramid of Doom', '    });', '  });', '});'],
    },
    {
      name: 'Promises',
      subtitle: '.then() chain',
      color: 'border-yellow-500/50 text-yellow-300 bg-yellow-500/10',
      activeColor: 'border-yellow-400/80 bg-yellow-500/20',
      glow: '0 0 18px rgba(234,179,8,0.4)',
      lines: ['getData(url)', '  .then(data => parseData(data))', '  .then(parsed => saveData(parsed))', '  .then(result => console.log(result))', '  .catch(err => console.error(err));'],
    },
    {
      name: 'async/await',
      subtitle: tx('Lineal, legible', 'Linear, readable'),
      color: 'border-green-500/50 text-green-300 bg-green-500/10',
      activeColor: 'border-green-400/80 bg-green-500/20',
      glow: '0 0 18px rgba(74,222,128,0.4)',
      lines: ['async function main() {', '  try {', '    const data = await getData(url);', '    const parsed = await parseData(data);', '    const result = await saveData(parsed);', '    return result;', '  } catch (err) { handleError(err); }', '}'],
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActivePattern(p => (p + 1) % patterns.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-green-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs font-semibold text-green-300 uppercase tracking-wider text-center mb-2">
        {tx('Evolución de patrones async', 'Async pattern evolution')}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {patterns.map((p, i) => {
          const isActive = activePattern === i;
          return (
            <motion.div
              key={p.name}
              animate={{
                boxShadow: isActive ? p.glow : '0 0 0px transparent',
                scale: isActive ? 1.03 : 1,
              }}
              transition={{ duration: 0.4 }}
              className={`border rounded-xl p-3 transition-colors ${isActive ? p.activeColor : 'border-slate-700/40 bg-slate-800/20'}`}
            >
              <div className={`font-bold text-xs mb-0.5 ${isActive ? p.color.split(' ')[1] : 'text-slate-400'}`}>
                {p.name}
              </div>
              <div className="text-xs text-slate-500 mb-2">{p.subtitle}</div>
              <div className="font-mono text-xs space-y-0.5">
                {p.lines.map((line, li) => (
                  <motion.div
                    key={li}
                    animate={{ opacity: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.3, delay: li * 0.04 }}
                    className={`leading-relaxed ${isActive ? p.color.split(' ')[1] : 'text-slate-600'}`}
                    style={{ paddingLeft: `${(line.match(/^\s+/) || [''])[0].length * 4}px` }}
                  >
                    {line.trimStart()}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Modules Diagram ─────────────────────────────────────────────────────────────

const ModulesDiagram = ({ tx }) => {
  const [active, setActive] = useState('cjs');

  useEffect(() => {
    const id = setInterval(() => setActive(a => a === 'cjs' ? 'esm' : 'cjs'), 2000);
    return () => clearInterval(id);
  }, []);

  const isCjs = active === 'cjs';

  const cjsProps = [
    { label: 'require()', note: tx('Síncrono', 'Synchronous') },
    { label: 'module.exports', note: tx('Objeto dinámico', 'Dynamic object') },
    { label: '.js extension', note: tx('Por defecto', 'Default') },
    { label: tx('No tree-shaking', 'No tree-shaking'), note: 'Bundle larger' },
  ];

  const esmProps = [
    { label: 'import/export', note: tx('Asíncrono', 'Asynchronous') },
    { label: 'export default', note: tx('Estático', 'Static') },
    { label: '.mjs / "type":"module"', note: 'ESM flag' },
    { label: 'Tree-shaking', note: tx('Bundle más pequeño', 'Smaller bundle') },
  ];

  return (
    <div className="bg-slate-950/40 border border-green-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs font-semibold text-green-300 uppercase tracking-wider text-center">
        {tx('CommonJS vs ES Modules', 'CommonJS vs ES Modules')}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* CJS */}
        <motion.div
          animate={{
            boxShadow: isCjs ? '0 0 18px rgba(74,222,128,0.35)' : '0 0 0px transparent',
            scale: isCjs ? 1.02 : 1,
          }}
          transition={{ duration: 0.4 }}
          className={`border rounded-xl p-3 transition-colors ${isCjs ? 'border-green-500/50 bg-green-500/10' : 'border-slate-700/40 bg-slate-800/20'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${isCjs ? 'border-green-400 text-green-300' : 'border-slate-600 text-slate-500'}`}>C</div>
            <span className={`font-bold text-xs ${isCjs ? 'text-green-300' : 'text-slate-400'}`}>CommonJS</span>
          </div>
          {cjsProps.map((prop, i) => (
            <motion.div key={i} animate={{ opacity: isCjs ? 1 : 0.35 }} transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center justify-between py-0.5">
              <span className={`text-xs font-mono ${isCjs ? 'text-green-300' : 'text-slate-500'}`}>{prop.label}</span>
              <span className="text-xs text-slate-500">{prop.note}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ESM */}
        <motion.div
          animate={{
            boxShadow: !isCjs ? '0 0 18px rgba(74,222,128,0.35)' : '0 0 0px transparent',
            scale: !isCjs ? 1.02 : 1,
          }}
          transition={{ duration: 0.4 }}
          className={`border rounded-xl p-3 transition-colors ${!isCjs ? 'border-green-500/50 bg-green-500/10' : 'border-slate-700/40 bg-slate-800/20'}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className={`w-5 h-5 ${!isCjs ? 'text-green-400' : 'text-slate-600'}`} />
            <span className={`font-bold text-xs ${!isCjs ? 'text-green-300' : 'text-slate-400'}`}>ES Modules</span>
          </div>
          {esmProps.map((prop, i) => (
            <motion.div key={i} animate={{ opacity: !isCjs ? 1 : 0.35 }} transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center justify-between py-0.5">
              <span className={`text-xs font-mono ${!isCjs ? 'text-green-300' : 'text-slate-500'}`}>{prop.label}</span>
              <span className="text-xs text-slate-500">{prop.note}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <p className="text-xs text-slate-500 text-center">
        {tx('ESM es el estándar moderno — preferirlo en proyectos nuevos', 'ESM is the modern standard — prefer it for new projects')}
      </p>
    </div>
  );
};

// ─── Cluster Diagram ─────────────────────────────────────────────────────────────

const ClusterDiagram = ({ tx }) => {
  const [activeWorker, setActiveWorker] = useState(0);
  const workerCount = 4;

  useEffect(() => {
    const id = setInterval(() => setActiveWorker(w => (w + 1) % workerCount), 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-green-500/20 rounded-xl p-4 space-y-4">
      <p className="text-xs font-semibold text-green-300 uppercase tracking-wider text-center">
        {tx('Cluster: Master + Workers (Round Robin)', 'Cluster: Master + Workers (Round Robin)')}
      </p>

      {/* Master */}
      <div className="flex justify-center">
        <motion.div
          animate={{ boxShadow: '0 0 14px rgba(74,222,128,0.4)' }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="border-2 border-green-400/70 bg-green-500/15 rounded-xl px-5 py-2.5 text-center"
        >
          <div className="text-green-300 font-bold text-sm">Master Process</div>
          <div className="text-xs text-slate-400">{tx('os.cpus().length forks', 'os.cpus().length forks')}</div>
        </motion.div>
      </div>

      {/* Arrow down */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-0.5">
          {[0, 1, 2].map(i => (
            <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
              className="w-0.5 h-2 bg-green-400/60 rounded"
            />
          ))}
        </div>
      </div>

      {/* Workers */}
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: workerCount }).map((_, i) => {
          const isActive = activeWorker === i;
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              {/* Request token */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-xs bg-green-400/20 border border-green-400/50 text-green-300 rounded px-1.5 py-0.5 font-mono"
                  >
                    req
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                animate={{
                  boxShadow: isActive ? '0 0 16px rgba(74,222,128,0.5)' : '0 0 0px transparent',
                  scale: isActive ? 1.07 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`w-full border rounded-xl py-2 text-center transition-colors ${
                  isActive
                    ? 'border-green-400/70 bg-green-500/20 text-green-300'
                    : 'border-slate-700/50 bg-slate-800/30 text-slate-500'
                }`}
              >
                <div className="text-xs font-bold">W{i + 1}</div>
                <div className="text-xs opacity-60">PID {1000 + i * 13}</div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-500 text-center">
        {tx('Cada worker maneja requests independientemente', 'Each worker handles requests independently')}
      </p>
    </div>
  );
};

// ─── Section renderers ───────────────────────────────────────────────────────────

const renderEventLoop = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Event Loop', 'Event Loop')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx('Non-blocking I/O, fases y prioridades', 'Non-blocking I/O, phases and priorities')}
      </p>
    </div>

    <EventLoopDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Fases del Event Loop', 'Event Loop Phases'),
          color: 'border-green-500/30',
          points: [
            tx('Timers: ejecuta callbacks de setTimeout/setInterval expirados', 'Timers: executes expired setTimeout/setInterval callbacks'),
            tx('Pending Callbacks: I/O callbacks diferidos de la iteración anterior', 'Pending Callbacks: I/O callbacks deferred from previous iteration'),
            tx('Poll: recupera eventos I/O nuevos; bloquea si la queue está vacía', 'Poll: retrieves new I/O events; blocks if queue is empty'),
            tx('Check (setImmediate): callbacks de setImmediate', 'Check (setImmediate): setImmediate callbacks'),
            tx('Close Callbacks: socket.destroy(), fs.close()...', 'Close Callbacks: socket.destroy(), fs.close()...'),
          ],
        },
        {
          title: tx('Prioridades de microtask', 'Microtask priorities'),
          color: 'border-emerald-500/30',
          points: [
            tx('process.nextTick() → máxima prioridad, corre antes de todo', 'process.nextTick() → highest priority, runs before anything'),
            tx('Promise.then() / queueMicrotask() → después de nextTick', 'Promise.then() / queueMicrotask() → after nextTick'),
            tx('Las microtasks vacían su queue entera entre cada fase', 'Microtasks drain their entire queue between each phase'),
            tx('Demasiados nextTick() pueden starvar el Event Loop', 'Too many nextTick() can starve the Event Loop'),
            tx('process.nextTick no es parte oficial de las fases libuv', 'process.nextTick is not an official libuv phase'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="font-bold text-sm text-green-300 mb-2">{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="javascript" code={`// Event Loop — prioridades\nsetTimeout(() => console.log('1 Timeout'), 0);     // Timers phase\nsetImmediate(() => console.log('2 Immediate'));    // Check phase\nprocess.nextTick(() => console.log('3 NextTick')); // Microtask (highest)\nPromise.resolve().then(() => console.log('4 Promise')); // Microtask\nconsole.log('5 Sync');\n\n// Output order:\n// 5 Sync → 3 NextTick → 4 Promise → 1 Timeout → 2 Immediate\n\n// Inside an I/O callback, setImmediate always beats setTimeout\nconst fs = require('fs');\nfs.readFile(__filename, () => {\n  setTimeout(() => console.log('timeout'), 0);\n  setImmediate(() => console.log('immediate'));\n  // Output: immediate → timeout  (guaranteed)\n});`} />

    <CodeBlock language="javascript" code={`// Non-blocking I/O — contraste\nconst fs = require('fs');\n\n// ❌ Blocking — detiene el Event Loop durante la lectura\nconst data = fs.readFileSync('large-file.txt', 'utf8');\nconsole.log('After sync read'); // Espera\n\n// ✅ Non-blocking — el loop sigue libre\nfs.readFile('large-file.txt', 'utf8', (err, data) => {\n  if (err) throw err;\n  console.log('File content ready');\n});\nconsole.log('This prints FIRST'); // Imprime inmediatamente\n\n// ✅ Con promises + async/await\nasync function readAsync() {\n  const { readFile } = require('fs').promises;\n  const data = await readFile('large-file.txt', 'utf8');\n  return data;\n}`} />
  </div>
);

const renderAsync = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Async Patterns', 'Async Patterns')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx('Callbacks, Promises, async/await, Streams', 'Callbacks, Promises, async/await, Streams')}
      </p>
    </div>

    <AsyncPatternsDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Promise combinators', 'Promise combinators'),
          color: 'border-green-500/30',
          points: [
            tx('Promise.all([]) — espera todas; falla si una falla', 'Promise.all([]) — waits for all; fails if any fails'),
            tx('Promise.allSettled([]) — espera todas, nunca rechaza', 'Promise.allSettled([]) — waits for all, never rejects'),
            tx('Promise.race([]) — resuelve/rechaza con la más rápida', 'Promise.race([]) — settles with the fastest'),
            tx('Promise.any([]) — resuelve con la primera exitosa', 'Promise.any([]) — resolves with first successful'),
          ],
        },
        {
          title: tx('Async Iterators & Streams', 'Async Iterators & Streams'),
          color: 'border-emerald-500/30',
          points: [
            tx('for await...of consume streams y async generators', 'for await...of consumes streams and async generators'),
            tx('ReadableStream.pipe() encadena readable → writable', 'ReadableStream.pipe() chains readable → writable'),
            tx('Transform stream modifica datos en tránsito (gzip, encrypt)', 'Transform stream modifies data in flight (gzip, encrypt)'),
            tx('stream.pipeline() con manejo de errores automático', 'stream.pipeline() with automatic error handling'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="font-bold text-sm text-green-300 mb-2">{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="javascript" code={`// Promise combinators\nconst [user, posts, comments] = await Promise.all([\n  fetchUser(id),\n  fetchPosts(id),\n  fetchComments(id),\n]);\n\n// allSettled — nunca lanza, siempre devuelve resultados\nconst results = await Promise.allSettled([p1, p2, p3]);\nresults.forEach(({ status, value, reason }) => {\n  if (status === 'fulfilled') process(value);\n  else logError(reason);\n});\n\n// any — primer éxito gana (AggregateError si todas fallan)\nconst fastest = await Promise.any([mirror1, mirror2, mirror3]);\n\n// race — primer settled (éxito o fallo)\nconst result = await Promise.race([\n  fetch('/api/data'),\n  new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),\n]);`} />

    <CodeBlock language="javascript" code={`// Async Iterators — consume un ReadableStream\nconst { createReadStream } = require('fs');\nconst { pipeline } = require('stream/promises');\nconst { createGzip } = require('zlib');\n\n// async for-await\nasync function processLines(filepath) {\n  const stream = createReadStream(filepath, { encoding: 'utf8' });\n  for await (const chunk of stream) {\n    console.log('Chunk:', chunk.length, 'bytes');\n  }\n}\n\n// pipeline con manejo de errores\nawait pipeline(\n  createReadStream('input.txt'),\n  createGzip(),\n  createWriteStream('output.txt.gz')\n); // lanza si cualquier paso falla\n\n// Async generator\nasync function* paginate(url) {\n  let cursor = null;\n  do {\n    const res = await fetch(url + (cursor ? \`?cursor=\${cursor}\` : ''));\n    const { data, next } = await res.json();\n    yield* data;\n    cursor = next;\n  } while (cursor);\n}\n\nfor await (const item of paginate('/api/items')) {\n  console.log(item);\n}`} />
  </div>
);

const renderModules = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Módulos', 'Modules')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx('CommonJS vs ESM, package.json', 'CommonJS vs ESM, package.json')}
      </p>
    </div>

    <ModulesDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Campos clave de package.json', 'Key package.json fields'),
          color: 'border-green-500/30',
          points: [
            tx('"type": "module" → activa ESM en todo el proyecto', '"type": "module" → enables ESM project-wide'),
            tx('"exports" → define API pública del paquete (subpath exports)', '"exports" → defines public package API (subpath exports)'),
            tx('"main" → entry para CJS (legacy fallback)', '"main" → CJS entry point (legacy fallback)'),
            tx('"module" → entry ESM para bundlers (Rollup, Vite)', '"module" → ESM entry for bundlers (Rollup, Vite)'),
            tx('"engines" → versión mínima de Node requerida', '"engines" → minimum required Node version'),
          ],
        },
        {
          title: tx('Anti-patrones de módulos', 'Module anti-patterns'),
          color: 'border-emerald-500/30',
          points: [
            tx('Barrel files (index.js re-exportando todo) → peor tree-shaking', 'Barrel files (index.js re-exporting everything) → worse tree-shaking'),
            tx('require() dinámico en hot path → penalización de caché', 'Dynamic require() in hot path → cache penalty'),
            tx('Circular dependencies → valores undefined en el momento del require', 'Circular dependencies → undefined values at require time'),
            tx('import * as → importa todo, imposibilita tree-shaking', 'import * as → imports everything, prevents tree-shaking'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="font-bold text-sm text-green-300 mb-2">{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="javascript" code={`// CommonJS\n// math.js\nmodule.exports = { add: (a, b) => a + b };\n// app.js\nconst { add } = require('./math');   // síncrono\nconsole.log(add(2, 3)); // 5\n\n// Los módulos se cachean — require('x') siempre devuelve el mismo objeto\nrequire.cache[require.resolve('./math')]; // acceso al caché\n\n// ES Modules (package.json: "type": "module")\n// math.mjs\nexport const multiply = (a, b) => a * b;\nexport default class Calc { add(a, b) { return a + b; } }\n\n// app.mjs\nimport Calc, { multiply } from './math.mjs';\nconsole.log(multiply(3, 4)); // 12\n\n// Dynamic import — lazy loading (funciona en CJS y ESM)\nconst { parse } = await import('csv-parse/sync'); // top-level await (ESM)\n\n// Conditional import para compatibilidad\nconst isProd = process.env.NODE_ENV === 'production';\nconst { logger } = await import(isProd ? './logger.prod.js' : './logger.dev.js');`} />

    <CodeBlock language="json" code={`// package.json — configuración de módulos moderna\n{\n  "name": "my-lib",\n  "version": "1.0.0",\n  "type": "module",\n  "main": "./dist/index.cjs",\n  "module": "./dist/index.js",\n  "exports": {\n    ".": {\n      "import": "./dist/index.js",\n      "require": "./dist/index.cjs",\n      "types": "./dist/index.d.ts"\n    },\n    "./utils": {\n      "import": "./dist/utils.js",\n      "require": "./dist/utils.cjs"\n    }\n  },\n  "engines": { "node": ">=18.0.0" },\n  "sideEffects": false\n}`} />
  </div>
);

const renderPerformance = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Performance & Clustering', 'Performance & Clustering')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx('Cluster, Worker Threads, streams', 'Cluster, Worker Threads, streams')}
      </p>
    </div>

    <ClusterDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Cluster vs Worker Threads', 'Cluster vs Worker Threads'),
          color: 'border-green-500/30',
          points: [
            tx('Cluster: múltiples procesos Node, cada uno con su Event Loop', 'Cluster: multiple Node processes, each with own Event Loop'),
            tx('Worker Threads: hilos dentro del mismo proceso, memoria compartida', 'Worker Threads: threads within same process, shared memory'),
            tx('Cluster → ideal para I/O-bound (APIs, servidores web)', 'Cluster → ideal for I/O-bound workloads (APIs, web servers)'),
            tx('Worker Threads → ideal para CPU-bound (crypto, compresión, ML)', 'Worker Threads → ideal for CPU-bound (crypto, compression, ML)'),
            tx('PM2 gestiona clustering automáticamente en producción', 'PM2 manages clustering automatically in production'),
          ],
        },
        {
          title: tx('Gestión de memoria', 'Memory management'),
          color: 'border-emerald-500/30',
          points: [
            tx('V8 heap: --max-old-space-size=4096 para aumentar límite', 'V8 heap: --max-old-space-size=4096 to increase limit'),
            tx('Memory leaks: closures que retienen referencias, EventEmitters sin cleanup', 'Memory leaks: closures retaining references, EventEmitters without cleanup'),
            tx('Detectar: node --inspect + Chrome DevTools heap snapshot', 'Detect: node --inspect + Chrome DevTools heap snapshot'),
            tx('WeakMap/WeakRef para referencias que no impiden GC', 'WeakMap/WeakRef for references that don\'t prevent GC'),
            tx('Streams > Buffers para archivos grandes (evita heap overflow)', 'Streams > Buffers for large files (avoids heap overflow)'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="font-bold text-sm text-green-300 mb-2">{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="javascript" code={`// Cluster module — un proceso por CPU\nconst cluster = require('cluster');\nconst os = require('os');\n\nif (cluster.isPrimary) {\n  const numCPUs = os.cpus().length;\n  console.log(\`Master PID \${process.pid}: forking \${numCPUs} workers\`);\n\n  for (let i = 0; i < numCPUs; i++) cluster.fork();\n\n  cluster.on('exit', (worker, code) => {\n    console.warn(\`Worker \${worker.process.pid} exited (code \${code}) — restarting\`);\n    cluster.fork(); // auto-restart\n  });\n} else {\n  // Cada worker arranca su propio servidor Express\n  const app = require('./app');\n  app.listen(3000, () => console.log(\`Worker \${process.pid} listening\`));\n}\n\n// Worker Threads — CPU intensivo\nconst { Worker, isMainThread, parentPort, workerData } = require('worker_threads');\n\nif (isMainThread) {\n  const worker = new Worker(__filename, { workerData: { n: 42 } });\n  worker.on('message', result => console.log('Fibonacci:', result));\n  worker.on('error', console.error);\n} else {\n  // Esto corre en el thread del worker — no bloquea el loop principal\n  const fib = n => n <= 1 ? n : fib(n - 1) + fib(n - 2);\n  parentPort.postMessage(fib(workerData.n));\n}`} />

    <CodeBlock language="javascript" code={`// Streams — procesado de archivos grandes sin cargar en memoria\nconst { createReadStream, createWriteStream } = require('fs');\nconst { createGzip } = require('zlib');\nconst { pipeline } = require('stream/promises');\nconst { Transform } = require('stream');\n\n// Transform stream personalizado\nconst upperCase = new Transform({\n  transform(chunk, _enc, callback) {\n    this.push(chunk.toString().toUpperCase());\n    callback();\n  },\n});\n\n// pipeline maneja errores y cleanup automáticamente\nawait pipeline(\n  createReadStream('input.txt'),       // Readable\n  upperCase,                           // Transform\n  createGzip(),                        // Transform (zlib)\n  createWriteStream('output.txt.gz')  // Writable\n);\n\n// Readable desde async generator\nconst { Readable } = require('stream');\nasync function* generateNumbers(limit) {\n  for (let i = 0; i < limit; i++) yield \`\${i}\\n\`;\n}\nconst readable = Readable.from(generateNumbers(1_000_000));\nawait pipeline(readable, createWriteStream('numbers.txt'));`} />
  </div>
);

const renderInterview = (tx, expandedLevels, toggleLevel, expandedQuestions, toggleQuestion) => {
  const levels = {
    junior: {
      label: 'Junior',
      questions: [
        {
          q: tx('¿Qué es Node.js?', 'What is Node.js?'),
          a: tx(
            'Runtime de JavaScript construido sobre el motor V8 de Chrome. Permite ejecutar JS en el servidor con I/O asíncrono y non-blocking, basado en el patrón Event Loop. Ideal para APIs y aplicaciones I/O intensivas.',
            'JavaScript runtime built on Chrome\'s V8 engine. Allows running JS on the server with non-blocking, asynchronous I/O based on the Event Loop pattern. Ideal for APIs and I/O-intensive applications.'
          ),
        },
        {
          q: tx('Explica el Event Loop de forma sencilla', 'Explain the Event Loop simply'),
          a: tx(
            'Node.js tiene un solo hilo de ejecución. Cuando una operación I/O (leer archivo, petición HTTP) ocurre, la delega al sistema operativo y registra un callback. El Event Loop comprueba continuamente si hay callbacks pendientes y los ejecuta cuando la operación termina.',
            'Node.js has a single execution thread. When an I/O operation (file read, HTTP request) occurs, it delegates to the OS and registers a callback. The Event Loop continuously checks for pending callbacks and executes them when the operation completes.'
          ),
        },
        {
          q: tx('require vs import — ¿cuál es la diferencia?', 'require vs import — what\'s the difference?'),
          a: tx(
            'require() es CommonJS: síncrono, disponible por defecto en Node. import es ES Modules: asíncrono, estático (permite tree-shaking), requiere "type": "module" en package.json o extensión .mjs. ESM es el estándar moderno.',
            'require() is CommonJS: synchronous, available by default in Node. import is ES Modules: asynchronous, static (enables tree-shaking), requires "type": "module" in package.json or .mjs extension. ESM is the modern standard.'
          ),
        },
        {
          q: tx('¿Qué es npm y package.json?', 'What is npm and package.json?'),
          a: tx(
            'npm (Node Package Manager) es el gestor de paquetes de Node. package.json es el manifiesto del proyecto: contiene nombre, versión, scripts (start, test, build), dependencies (producción) y devDependencies (desarrollo). package-lock.json fija versiones exactas.',
            'npm (Node Package Manager) is Node\'s package manager. package.json is the project manifest: contains name, version, scripts (start, test, build), dependencies (production) and devDependencies (development). package-lock.json locks exact versions.'
          ),
        },
        {
          q: tx('Callback Hell — ¿qué es y cómo evitarlo?', 'Callback Hell — what is it and how to avoid it?'),
          a: tx(
            'Anidamiento excesivo de callbacks que hace el código ilegible (pirámide de la perdición). Se evita con Promises (.then/.catch), async/await, o modularizando callbacks en funciones nombradas separadas.',
            'Excessive nesting of callbacks making code unreadable (pyramid of doom). Avoided with Promises (.then/.catch), async/await, or modularizing callbacks into separate named functions.'
          ),
        },
      ],
    },
    mid: {
      label: 'Mid',
      questions: [
        {
          q: tx('¿Cómo funciona el clustering en Node.js?', 'How does clustering work in Node.js?'),
          a: tx(
            'El módulo cluster permite crear procesos hijo (workers) que comparten el mismo puerto TCP. El proceso master hace fork() una vez por CPU. El SO distribuye conexiones entre workers en round-robin (o el master en Windows). Si un worker cae, el master puede relanzarlo.',
            'The cluster module creates child processes (workers) that share the same TCP port. The master process fork()s once per CPU. The OS distributes connections between workers round-robin (or master on Windows). If a worker dies, the master can restart it.'
          ),
        },
        {
          q: tx('Streams vs Buffers — ¿cuándo usar cada uno?', 'Streams vs Buffers — when to use each?'),
          a: tx(
            'Buffer: carga todo en memoria — ideal para datos pequeños o cuando necesitas el contenido completo. Stream: procesa en chunks — ideal para archivos grandes, video, logs. Un stream de 10GB usa ~64KB de RAM vs 10GB con Buffer.',
            'Buffer: loads everything into memory — ideal for small data or when you need the full content. Stream: processes in chunks — ideal for large files, video, logs. A 10GB stream uses ~64KB of RAM vs 10GB with Buffer.'
          ),
        },
        {
          q: tx('process.nextTick vs setImmediate — diferencias', 'process.nextTick vs setImmediate — differences'),
          a: tx(
            'process.nextTick corre inmediatamente después del código síncrono actual, antes de que el Event Loop avance de fase (no forma parte oficial del loop). setImmediate corre en la fase Check, después de Poll. nextTick siempre es más rápido que setImmediate.',
            'process.nextTick runs immediately after current synchronous code, before the Event Loop advances to the next phase (not officially part of the loop). setImmediate runs in the Check phase, after Poll. nextTick is always faster than setImmediate.'
          ),
        },
        {
          q: tx('Promise.all vs Promise.allSettled vs Promise.any', 'Promise.all vs Promise.allSettled vs Promise.any'),
          a: tx(
            'Promise.all: paralelo, falla rápido si cualquiera rechaza. Promise.allSettled: espera todas, nunca rechaza — devuelve array de {status, value/reason}. Promise.any: resuelve con la primera exitosa, solo rechaza si todas fallan (AggregateError). Promise.race: primer settled gana.',
            'Promise.all: parallel, fast-fails if any rejects. Promise.allSettled: waits for all, never rejects — returns array of {status, value/reason}. Promise.any: resolves with first successful, only rejects if all fail (AggregateError). Promise.race: first settled wins.'
          ),
        },
        {
          q: tx('¿Qué es libuv?', 'What is libuv?'),
          a: tx(
            'Librería C++ multiplataforma que maneja el Event Loop, el thread pool (4 threads por defecto para fs, crypto, dns.lookup), y operaciones I/O asíncronas. Node.js delega operaciones que el OS no puede hacer de forma async (como algunas fs ops) al thread pool de libuv.',
            'Cross-platform C++ library that manages the Event Loop, the thread pool (4 threads by default for fs, crypto, dns.lookup), and async I/O operations. Node.js delegates operations the OS cannot do asynchronously (like some fs ops) to libuv\'s thread pool.'
          ),
        },
      ],
    },
    senior: {
      label: 'Senior',
      questions: [
        {
          q: tx('¿Cómo debugueas un memory leak en Node.js?', 'How would you debug a memory leak in Node.js?'),
          a: tx(
            '1) Inicia con node --inspect. 2) Abre chrome://inspect en Chrome → DevTools. 3) Toma heap snapshots antes y después de reproducir el leak. 4) Compara snapshots: busca objetos con "Retained size" creciente. 5) Causas comunes: EventEmitters sin removeListener(), closures en timers no limpiados, caché sin límite. 6) Usa clinic.js o 0x para flamegraphs de CPU.',
            '1) Start with node --inspect. 2) Open chrome://inspect in Chrome → DevTools. 3) Take heap snapshots before and after reproducing the leak. 4) Compare snapshots: look for objects with growing "Retained size". 5) Common causes: EventEmitters without removeListener(), closures in uncleaned timers, unbounded caches. 6) Use clinic.js or 0x for CPU flamegraphs.'
          ),
        },
        {
          q: tx('Explica el thread pool de libuv en detalle', 'Explain libuv\'s thread pool in detail'),
          a: tx(
            'libuv tiene un thread pool con 4 workers por defecto (UV_THREADPOOL_SIZE). Procesa: operaciones fs (read/write/stat excepto epoll), crypto (pbkdf2, scrypt, randomBytes), dns.lookup(), y pipes con zlib. Si el pool está saturado, las operaciones se encolan. Puedes aumentarlo con UV_THREADPOOL_SIZE=8 (max 128). Worker Threads de Node son independientes del thread pool de libuv.',
            'libuv has a thread pool with 4 workers by default (UV_THREADPOOL_SIZE). It processes: fs operations (read/write/stat except epoll), crypto (pbkdf2, scrypt, randomBytes), dns.lookup(), and zlib pipes. If the pool is saturated, operations queue up. You can increase it with UV_THREADPOOL_SIZE=8 (max 128). Node\'s Worker Threads are independent from libuv\'s thread pool.'
          ),
        },
        {
          q: tx('¿Cuándo usar Worker Threads vs Clustering?', 'When to use Worker Threads vs clustering?'),
          a: tx(
            'Clustering: aislamiento de procesos (crash de un worker no afecta a otros), ideal para servidores web HTTP, escala N veces donde N = CPUs. Worker Threads: memoria compartida via SharedArrayBuffer, ideal para paralelizar trabajo CPU intensivo dentro de un request (ej: image processing, ML inference). Si necesitas manejar múltiples requests concurrentes → Cluster. Si un solo request es CPU intensivo → Worker Threads.',
            'Clustering: process isolation (worker crash doesn\'t affect others), ideal for HTTP web servers, scales N times where N = CPUs. Worker Threads: shared memory via SharedArrayBuffer, ideal for parallelizing CPU-intensive work within a single request (e.g.: image processing, ML inference). If handling multiple concurrent requests → Cluster. If a single request is CPU-intensive → Worker Threads.'
          ),
        },
        {
          q: tx('Diseña un rate limiter distribuido en Node.js', 'Design a distributed rate limiter in Node.js'),
          a: tx(
            'Usa el algoritmo sliding window counter en Redis. Por cada request: 1) ZADD ip:key timestamp timestamp. 2) ZREMRANGEBYSCORE ip:key 0 (now - window). 3) ZCARD ip:key → si > limit, rechaza con 429. 4) EXPIRE ip:key window. Hazlo atómico con un script Lua o MULTI/EXEC. En Node: redis-rate-limiter-flexible o implementación custom. Considera: rate limit por IP, user ID, y endpoint con different limits.',
            'Use sliding window counter algorithm in Redis. For each request: 1) ZADD ip:key timestamp timestamp. 2) ZREMRANGEBYSCORE ip:key 0 (now - window). 3) ZCARD ip:key → if > limit, reject with 429. 4) EXPIRE ip:key window. Make it atomic with a Lua script or MULTI/EXEC. In Node: redis-rate-limiter-flexible or custom implementation. Consider: rate limiting by IP, user ID, and endpoint with different limits.'
          ),
        },
        {
          q: tx('¿Cómo optimizarías el arranque de una app Node con muchos módulos?', 'How would you optimize startup of a Node app with many modules?'),
          a: tx(
            '1) Dynamic imports para lazy-load módulos no críticos. 2) --require preload para módulos esenciales antes del entry point. 3) Node.js Single Executable Applications (SEA) en v20+ para bundle + snapshot V8. 4) Startup snapshots (--build-snapshot) para serializar el heap tras el require inicial. 5) Evitar barrel files (index.js re-exportando todo). 6) Medir con node --prof o clinic.js doctor.',
            '1) Dynamic imports for lazy-loading non-critical modules. 2) --require preload for essential modules before entry point. 3) Node.js Single Executable Applications (SEA) in v20+ for bundle + V8 snapshot. 4) Startup snapshots (--build-snapshot) to serialize heap after initial require. 5) Avoid barrel files (index.js re-exporting everything). 6) Measure with node --prof or clinic.js doctor.'
          ),
        },
      ],
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Entrevista', 'Interview Q&A')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Junior → Senior preguntas', 'Junior → Senior questions')}
        </p>
      </div>

      {Object.entries(levels).map(([levelKey, levelData]) => {
        const isLevelExpanded = expandedLevels[levelKey];
        return (
          <div key={levelKey} className="bg-slate-900/50 border border-green-500/30 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleLevel(levelKey)}
              className="w-full flex items-center justify-between p-5 hover:bg-slate-900/70 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <MessageCircleQuestion className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-bold text-green-300">{levelData.label} Level</h3>
                <span className="text-slate-500 text-xs">({levelData.questions.length} {tx('preguntas', 'questions')})</span>
              </div>
              <motion.div animate={{ rotate: isLevelExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>

            <AnimatePresence>
              {isLevelExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-2.5">
                    {levelData.questions.map((item, idx) => {
                      const qKey = `${levelKey}-${idx}`;
                      const isQExpanded = expandedQuestions[qKey];
                      return (
                        <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleQuestion(levelKey, idx)}
                            className="w-full flex items-start justify-between p-3.5 hover:bg-slate-800/70 transition-colors text-left gap-3"
                          >
                            <div className="flex items-start gap-2 flex-1 min-w-0">
                              <span className="text-green-400 font-bold flex-shrink-0 text-sm">Q{idx + 1}:</span>
                              <p className="font-semibold text-green-200 text-sm leading-snug">{item.q}</p>
                            </div>
                            <motion.div
                              animate={{ rotate: isQExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex-shrink-0 mt-0.5"
                            >
                              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {isQExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-1">
                                  <div className="flex items-start gap-2 bg-slate-900/60 p-3 rounded border-l-2 border-green-400/50">
                                    <span className="text-green-400 font-bold flex-shrink-0 text-sm">A:</span>
                                    <p className="text-slate-200 text-sm leading-relaxed">{item.a}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────────

function NodePro() {
  const { language } = useLanguage();
  const tx = (es, en) => (language === 'en' ? en : es);

  const [activeSection, setActiveSection] = useState('eventloop');
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [expandedLevels, setExpandedLevels] = useState({ junior: true });

  const toggleQuestion = (level, idx) => {
    const key = `${level}-${idx}`;
    setExpandedQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleLevel = (level) => {
    setExpandedLevels(prev => ({ ...prev, [level]: !prev[level] }));
  };

  const sections = [
    {
      id: 'eventloop',
      title: tx('Event Loop', 'Event Loop'),
      subtitle: tx('Non-blocking I/O, fases', 'Non-blocking I/O, phases'),
      icon: Zap,
    },
    {
      id: 'async',
      title: tx('Async Patterns', 'Async Patterns'),
      subtitle: tx('Callbacks, Promises, streams', 'Callbacks, Promises, streams'),
      icon: GitBranch,
    },
    {
      id: 'modules',
      title: tx('Módulos', 'Modules'),
      subtitle: tx('CommonJS vs ESM', 'CommonJS vs ESM'),
      icon: Layers,
    },
    {
      id: 'performance',
      title: tx('Performance', 'Performance'),
      subtitle: tx('Cluster, Workers, streams', 'Cluster, Workers, streams'),
      icon: Cpu,
    },
    {
      id: 'interview',
      title: tx('Entrevista', 'Interview Q&A'),
      subtitle: tx('Junior → Senior', 'Junior → Senior'),
      icon: MessageCircleQuestion,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'eventloop':   return renderEventLoop(tx);
      case 'async':       return renderAsync(tx);
      case 'modules':     return renderModules(tx);
      case 'performance': return renderPerformance(tx);
      case 'interview':   return renderInterview(tx, expandedLevels, toggleLevel, expandedQuestions, toggleQuestion);
      default:            return renderEventLoop(tx);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <h3 className="text-base lg:text-lg font-bold text-green-400 mb-2 lg:mb-4 flex items-center gap-2">
          <SiNodedotjs className="w-5 h-5 lg:w-6 lg:h-6" />
          {t('node', language).title}
        </h3>
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all flex items-center gap-2 lg:gap-3 ${
                  isActive
                    ? 'bg-green-500/20 border border-green-500/40 text-green-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0 ${isActive ? 'text-green-400' : 'text-slate-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm lg:text-base whitespace-nowrap lg:whitespace-normal">{section.title}</div>
                  <div className="hidden lg:block text-xs opacity-70 mt-0.5">{section.subtitle}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content Panel */}
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NodePro;
