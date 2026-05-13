import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Table, Search, Zap, Lock, GitCompare, Server, HardDrive, Layers, ArrowRight } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Shared helpers ─────────────────────────────────────────────────────────────

const FlowArrow = () => (
  <ArrowRight className="w-4 h-4 text-violet-400/60 flex-shrink-0" />
);

// ─── Section 1: SQL vs NoSQL Overview ───────────────────────────────────────────

const OverviewDiagram = ({ tx }) => {
  const [highlight, setHighlight] = useState('sql');

  useEffect(() => {
    const id = setInterval(() => setHighlight(h => h === 'sql' ? 'nosql' : 'sql'), 1800);
    return () => clearInterval(id);
  }, []);

  const sqlFeatures = [
    { label: tx('Esquema rígido', 'Rigid schema'), icon: '📋' },
    { label: tx('Escalado vertical', 'Vertical scaling'), icon: '⬆️' },
    { label: tx('ACID garantizado', 'Guaranteed ACID'), icon: '🔒' },
    { label: tx('JOIN potentes', 'Powerful JOINs'), icon: '🔗' },
  ];

  const nosqlFeatures = [
    { label: tx('Esquema flexible', 'Flexible schema'), icon: '📄' },
    { label: tx('Escalado horizontal', 'Horizontal scaling'), icon: '↔️' },
    { label: tx('Consistencia eventual', 'Eventual consistency'), icon: '🔄' },
    { label: tx('Documentos / KV / Grafos', 'Documents / KV / Graphs'), icon: '🗂️' },
  ];

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-violet-300 uppercase tracking-wider">
        {highlight === 'sql'
          ? tx('SQL — estructura y consistencia', 'SQL — structure & consistency')
          : tx('NoSQL — flexibilidad y escala', 'NoSQL — flexibility & scale')}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* SQL column */}
        <motion.div
          animate={{ boxShadow: highlight === 'sql' ? '0 0 20px rgba(139,92,246,0.4)' : '0 0 0px transparent' }}
          className="flex flex-col gap-2 p-3 bg-violet-500/10 border border-violet-500/30 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-5 h-5 text-violet-400" />
            <span className="text-violet-300 font-bold text-sm">PostgreSQL</span>
          </div>
          {sqlFeatures.map((f, i) => (
            <motion.div
              key={f.label}
              animate={{ opacity: highlight === 'sql' ? 1 : 0.45, x: highlight === 'sql' ? 0 : -2 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-1.5 text-xs text-slate-300"
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* NoSQL column */}
        <motion.div
          animate={{ boxShadow: highlight === 'nosql' ? '0 0 20px rgba(99,102,241,0.4)' : '0 0 0px transparent' }}
          className="flex flex-col gap-2 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-1">
            <HardDrive className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-300 font-bold text-sm">MongoDB / Redis</span>
          </div>
          {nosqlFeatures.map((f, i) => (
            <motion.div
              key={f.label}
              animate={{ opacity: highlight === 'nosql' ? 1 : 0.45, x: highlight === 'nosql' ? 0 : 2 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-1.5 text-xs text-slate-300"
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decision guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-700/50">
        <div className="p-2 bg-violet-500/5 rounded-lg">
          <p className="text-xs font-semibold text-violet-300 mb-1">{tx('Usa SQL cuando…', 'Use SQL when…')}</p>
          <ul className="text-xs text-slate-400 space-y-0.5">
            <li>• {tx('Datos con relaciones complejas', 'Complex relational data')}</li>
            <li>• {tx('Necesitas transacciones ACID', 'You need ACID transactions')}</li>
            <li>• {tx('Reportes y queries complejos', 'Complex reporting queries')}</li>
          </ul>
        </div>
        <div className="p-2 bg-indigo-500/5 rounded-lg">
          <p className="text-xs font-semibold text-indigo-300 mb-1">{tx('Usa NoSQL cuando…', 'Use NoSQL when…')}</p>
          <ul className="text-xs text-slate-400 space-y-0.5">
            <li>• {tx('Esquema variable / docs anidados', 'Variable schema / nested docs')}</li>
            <li>• {tx('Escala masiva horizontal', 'Massive horizontal scale')}</li>
            <li>• {tx('Alta velocidad de escritura', 'High-velocity writes')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ─── Section 2: PostgreSQL ────────────────────────────────────────────────────

const PostgresDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0);
  const phases = [
    tx('Parse — SQL → AST', 'Parse — SQL → AST'),
    tx('Plan — optimizador elige estrategia', 'Plan — optimizer selects strategy'),
    tx('Execute — accede a datos', 'Execute — accesses data'),
    tx('Return — resultados al cliente', 'Return — results to client'),
  ];

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 4), 1800);
    return () => clearInterval(id);
  }, []);

  const archNodes = [
    { label: 'Client', color: 'text-blue-300', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    { label: 'pgBouncer', color: 'text-yellow-300', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
    { label: 'PostgreSQL', color: 'text-violet-300', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
    { label: 'WAL / Storage', color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  ];

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-4">
      {/* Architecture */}
      <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider text-center">
        {tx('Arquitectura de conexión', 'Connection Architecture')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {archNodes.map((n, i) => (
          <div key={n.label} className="flex items-center gap-2">
            <div className={`px-3 py-1.5 ${n.bg} border ${n.border} rounded-lg text-xs font-semibold ${n.color}`}>
              {n.label}
            </div>
            {i < archNodes.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>

      {/* Query lifecycle */}
      <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider text-center">
        {tx('Ciclo de vida de una query', 'Query Lifecycle')}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {['Parse', 'Plan', 'Execute', 'Return'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <motion.div
              animate={{
                backgroundColor: phase === i ? 'rgba(139,92,246,0.3)' : 'rgba(15,23,42,0.5)',
                borderColor: phase === i ? 'rgba(139,92,246,0.6)' : 'rgba(100,116,139,0.3)',
              }}
              transition={{ duration: 0.3 }}
              className="px-3 py-1.5 border rounded-lg text-xs font-semibold text-slate-300"
            >
              {step}
            </motion.div>
            {i < 3 && <FlowArrow />}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25 }}
          className="text-center text-xs text-violet-400 h-4"
        >
          {phases[phase]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Section 3: MongoDB ───────────────────────────────────────────────────────

const MongoDiagram = ({ tx }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 3), 1800);
    return () => clearInterval(id);
  }, []);

  const docSteps = [
    tx('Documento insertado en Collection', 'Document inserted into Collection'),
    tx('Índice actualizado automáticamente', 'Index updated automatically'),
    tx('Query retorna documento completo', 'Query returns full document'),
  ];

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-4">
      <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider text-center">
        {tx('Modelo de documentos', 'Document Model')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Collection */}
        <div className="p-2.5 bg-violet-500/10 border border-violet-500/30 rounded-xl">
          <p className="text-xs font-bold text-violet-300 mb-2">Collection: users</p>
          <div className="space-y-1">
            {['doc_1', 'doc_2', 'doc_3'].map((d, i) => (
              <motion.div
                key={d}
                animate={{ opacity: step === 0 && i === 0 ? [0.5, 1, 0.5] : 0.7 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xs text-slate-400 bg-slate-800/50 rounded px-2 py-1 font-mono"
              >
                {`{ _id: ObjectId, … }`}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Embedded doc */}
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl">
          <p className="text-xs font-bold text-indigo-300 mb-2">{tx('Documento embebido', 'Embedded Document')}</p>
          <pre className="text-[10px] text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
{`{
  name: "Alice",
  address: {
    city: "Madrid",
    zip: "28001"
  },
  tags: ["admin"]
}`}
          </pre>
        </div>

        {/* Reference */}
        <div className="p-2.5 bg-slate-800/50 border border-slate-600/30 rounded-xl">
          <p className="text-xs font-bold text-slate-300 mb-2">{tx('Referencia (DBRef)', 'Reference (DBRef)')}</p>
          <pre className="text-[10px] text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
{`{
  name: "Alice",
  roleId: ObjectId(
    "64a1…"
  )
  // → roles collection
}`}
          </pre>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25 }}
          className="text-center text-xs text-violet-400 h-4"
        >
          {docSteps[step]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Section 4: Redis ─────────────────────────────────────────────────────────

const RedisDiagram = ({ tx }) => {
  const [cacheState, setCacheState] = useState('hit');

  useEffect(() => {
    const id = setInterval(() => setCacheState(s => s === 'hit' ? 'miss' : 'hit'), 1800);
    return () => clearInterval(id);
  }, []);

  const isHit = cacheState === 'hit';

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-4">
      <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider text-center">
        {tx('Cache-aside pattern', 'Cache-Aside Pattern')}
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-3">
        {/* App */}
        <div className="px-4 py-2.5 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
          <Layers className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <span className="text-blue-300 font-bold text-xs">{tx('Aplicación', 'Application')}</span>
        </div>

        <FlowArrow />

        {/* Redis */}
        <motion.div
          animate={{
            boxShadow: isHit ? '0 0 18px rgba(139,92,246,0.5)' : '0 0 4px rgba(139,92,246,0.1)',
            borderColor: isHit ? 'rgba(139,92,246,0.6)' : 'rgba(100,116,139,0.3)',
          }}
          transition={{ duration: 0.4 }}
          className="px-4 py-2.5 bg-violet-500/10 border rounded-xl text-center"
        >
          <Zap className="w-5 h-5 text-violet-400 mx-auto mb-1" />
          <span className="text-violet-300 font-bold text-xs">Redis</span>
          <motion.div
            animate={{ backgroundColor: isHit ? 'rgba(139,92,246,0.3)' : 'rgba(239,68,68,0.2)' }}
            className="mt-1 rounded px-2 py-0.5 text-[10px] font-semibold text-white"
          >
            {isHit ? tx('✓ HIT', '✓ HIT') : tx('✗ MISS', '✗ MISS')}
          </motion.div>
        </motion.div>

        {/* Arrow to DB — only visible on miss */}
        <motion.div
          animate={{ opacity: isHit ? 0.2 : 1 }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-2"
        >
          <FlowArrow />
          <div className="px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
            <Database className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <span className="text-emerald-300 font-bold text-xs">Database</span>
          </div>
        </motion.div>
      </div>

      <p className="text-center text-xs text-violet-400">
        {isHit
          ? tx('Cache HIT — respuesta inmediata desde Redis', 'Cache HIT — instant response from Redis')
          : tx('Cache MISS — consulta a la DB, luego almacena en Redis', 'Cache MISS — queries DB, then stores in Redis')}
      </p>

      {/* Hit rate indicator */}
      <div className="flex items-center gap-3 pt-1">
        <span className="text-xs text-slate-400 whitespace-nowrap">{tx('Hit rate estimado:', 'Est. hit rate:')}</span>
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: isHit ? '85%' : '42%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
          />
        </div>
        <motion.span
          animate={{ color: isHit ? '#a78bfa' : '#f87171' }}
          className="text-xs font-bold w-8 text-right"
        >
          {isHit ? '85%' : '42%'}
        </motion.span>
      </div>
    </div>
  );
};

// ─── Section 5: Indexes ───────────────────────────────────────────────────────

const IndexDiagram = ({ tx }) => {
  const [indexed, setIndexed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setIndexed(v => !v), 1800);
    return () => clearInterval(id);
  }, []);

  const rows = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-4">
      <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider text-center">
        {indexed
          ? tx('Con índice — recorrido de árbol B-tree', 'With index — B-tree traversal')
          : tx('Sin índice — Full Table Scan', 'Without index — Full Table Scan')}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* B-tree structure */}
        <div className="p-2.5 bg-slate-800/50 border border-violet-500/20 rounded-xl">
          <p className="text-xs text-violet-300 font-semibold mb-2 text-center">B-tree Index</p>
          <div className="flex flex-col items-center gap-1">
            <div className="px-3 py-1 bg-violet-500/20 border border-violet-500/40 rounded text-xs text-violet-200 font-mono">root</div>
            <div className="flex gap-2">
              <div className="px-2 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded text-xs text-indigo-200 font-mono">L</div>
              <div className="px-2 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded text-xs text-indigo-200 font-mono">R</div>
            </div>
            <div className="flex gap-1">
              {['l1','l2','r1','r2'].map(n => (
                <div key={n} className="px-1.5 py-0.5 bg-slate-700/60 border border-slate-600/40 rounded text-[10px] text-slate-300 font-mono">{n}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Hash structure */}
        <div className="p-2.5 bg-slate-800/50 border border-violet-500/20 rounded-xl">
          <p className="text-xs text-violet-300 font-semibold mb-2 text-center">Hash Index</p>
          <div className="space-y-1">
            {['h(k1)→row3','h(k2)→row7','h(k3)→row1'].map(entry => (
              <div key={entry} className="px-2 py-1 bg-slate-700/60 border border-slate-600/40 rounded text-[10px] text-slate-300 font-mono">
                {entry}
              </div>
            ))}
            <p className="text-[10px] text-slate-500 text-center">{tx('solo igualdad exacta', 'equality only')}</p>
          </div>
        </div>
      </div>

      {/* Row scan animation */}
      <div className="flex flex-wrap gap-1 justify-center pt-1">
        {rows.map(i => (
          <motion.div
            key={i}
            animate={{
              backgroundColor: indexed
                ? i === 3 ? 'rgba(139,92,246,0.5)' : 'rgba(30,41,59,0.6)'
                : 'rgba(139,92,246,0.3)',
              borderColor: indexed
                ? i === 3 ? 'rgba(139,92,246,0.8)' : 'rgba(100,116,139,0.3)'
                : 'rgba(139,92,246,0.4)',
            }}
            transition={{ duration: 0.3, delay: indexed ? 0 : i * 0.08 }}
            className="w-7 h-7 border rounded text-[10px] text-slate-300 font-mono flex items-center justify-center"
          >
            r{i + 1}
          </motion.div>
        ))}
      </div>
      <p className="text-center text-[11px] text-slate-500">
        {indexed
          ? tx('→ acceso directo a fila objetivo', '→ direct access to target row')
          : tx('→ escanea todas las filas', '→ scans every row')}
      </p>
    </div>
  );
};

// ─── Section 6: ACID ─────────────────────────────────────────────────────────

const AcidDiagram = ({ tx }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % 4), 1800);
    return () => clearInterval(id);
  }, []);

  const properties = [
    {
      letter: 'A',
      name: tx('Atomicidad', 'Atomicity'),
      desc: tx('Todo o nada — si falla una operación, se revierten todas', 'All or nothing — if one op fails, all are rolled back'),
    },
    {
      letter: 'C',
      name: tx('Consistencia', 'Consistency'),
      desc: tx('La DB pasa de un estado válido a otro válido (constraints, triggers)', 'DB transitions from one valid state to another (constraints, triggers)'),
    },
    {
      letter: 'I',
      name: tx('Aislamiento', 'Isolation'),
      desc: tx('Transacciones concurrentes no se interfieren entre sí', 'Concurrent transactions do not interfere with each other'),
    },
    {
      letter: 'D',
      name: tx('Durabilidad', 'Durability'),
      desc: tx('Los commits persisten aunque el sistema falle (WAL)', 'Commits persist even if the system crashes (WAL)'),
    },
  ];

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider text-center">
        {tx('Propiedades ACID', 'ACID Properties')}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {properties.map((p, i) => (
          <motion.div
            key={p.letter}
            animate={{
              backgroundColor: active === i ? 'rgba(139,92,246,0.2)' : 'rgba(15,23,42,0.4)',
              borderColor: active === i ? 'rgba(139,92,246,0.5)' : 'rgba(100,116,139,0.2)',
            }}
            transition={{ duration: 0.35 }}
            className="p-2.5 border rounded-xl"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-black text-violet-400">{p.letter}</span>
              <span className="text-xs font-bold text-slate-200">{p.name}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

function DatabasesPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('overview');

  const sections = [
    {
      id: 'overview',
      title: 'SQL vs NoSQL',
      subtitle: tx('Comparativa y cuándo usar cada uno', 'Comparison & when to use each'),
      icon: GitCompare,
    },
    {
      id: 'postgres',
      title: 'PostgreSQL',
      subtitle: tx('MVCC, WAL, connection pooling', 'MVCC, WAL, connection pooling'),
      icon: Database,
    },
    {
      id: 'mongodb',
      title: 'MongoDB',
      subtitle: tx('Documentos, Atlas, agregaciones', 'Documents, Atlas, aggregations'),
      icon: HardDrive,
    },
    {
      id: 'redis',
      title: 'Redis & Caching',
      subtitle: tx('Cache-aside, estructuras, pub/sub', 'Cache-aside, structures, pub/sub'),
      icon: Zap,
    },
    {
      id: 'indexes',
      title: tx('Índices & Optimización', 'Indexes & Optimization'),
      subtitle: tx('B-tree, Hash, query planning', 'B-tree, Hash, query planning'),
      icon: Search,
    },
    {
      id: 'acid',
      title: tx('Transacciones & ACID', 'Transactions & ACID'),
      subtitle: tx('Isolation levels, locks', 'Isolation levels, locks'),
      icon: Lock,
    },
  ];

  // ─── Section renderers ────────────────────────────────────────────────────

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">SQL vs NoSQL</h2>
        <p className="text-slate-400 text-sm">{tx('Comparativa de paradigmas de bases de datos', 'Comparison of database paradigms')}</p>
      </div>

      <OverviewDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/30 border border-violet-500/20 rounded-xl p-4">
          <h3 className="text-sm font-bold text-violet-300 mb-3 flex items-center gap-2">
            <Database className="w-4 h-4" />
            {tx('SQL — Bases relacionales', 'SQL — Relational Databases')}
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex gap-2"><span className="text-violet-400">•</span>{tx('PostgreSQL — robusto, extensible, open source', 'PostgreSQL — robust, extensible, open source')}</li>
            <li className="flex gap-2"><span className="text-violet-400">•</span>{tx('MySQL / MariaDB — popular en web tradicional', 'MySQL / MariaDB — popular in traditional web')}</li>
            <li className="flex gap-2"><span className="text-violet-400">•</span>{tx('SQLite — embebido, ideal para desarrollo', 'SQLite — embedded, ideal for development')}</li>
            <li className="flex gap-2"><span className="text-violet-400">•</span>{tx('Tablas, filas, columnas, JOINs, índices', 'Tables, rows, columns, JOINs, indexes')}</li>
          </ul>
        </div>
        <div className="bg-slate-800/30 border border-indigo-500/20 rounded-xl p-4">
          <h3 className="text-sm font-bold text-indigo-300 mb-3 flex items-center gap-2">
            <HardDrive className="w-4 h-4" />
            {tx('NoSQL — Bases no relacionales', 'NoSQL — Non-relational Databases')}
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex gap-2"><span className="text-indigo-400">•</span>{tx('MongoDB — documentos JSON, flexible', 'MongoDB — JSON documents, flexible')}</li>
            <li className="flex gap-2"><span className="text-indigo-400">•</span>{tx('Redis — clave-valor en memoria, ultra rápido', 'Redis — in-memory key-value, ultra fast')}</li>
            <li className="flex gap-2"><span className="text-indigo-400">•</span>{tx('Cassandra — columnar, alta disponibilidad', 'Cassandra — columnar, high availability')}</li>
            <li className="flex gap-2"><span className="text-indigo-400">•</span>{tx('Neo4j — grafos, relaciones complejas', 'Neo4j — graphs, complex relationships')}</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderPostgres = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">PostgreSQL</h2>
        <p className="text-slate-400 text-sm">{tx('El sistema de base de datos relacional más avanzado de código abierto', 'The most advanced open source relational database system')}</p>
      </div>

      <PostgresDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { title: 'MVCC', desc: tx('Multi-Version Concurrency Control: reads no bloquean writes. Cada transacción ve un snapshot consistente.', 'Multi-Version Concurrency Control: reads don\'t block writes. Each transaction sees a consistent snapshot.'), icon: Layers },
          { title: 'WAL', desc: tx('Write-Ahead Log: los cambios se escriben en el log antes que en el dato. Garantiza durabilidad y permite point-in-time recovery.', 'Write-Ahead Log: changes written to log before data. Guarantees durability and enables point-in-time recovery.'), icon: HardDrive },
          { title: tx('Connection Pooling', 'Connection Pooling'), desc: tx('pgBouncer reutiliza conexiones al pool. Evita crear una conexión nueva por cada request (caro en Postgres).', 'pgBouncer reuses pool connections. Avoids creating a new connection per request (expensive in Postgres).'), icon: Server },
        ].map(({ title, desc, icon: Icon }) => (
          <div key={title} className="bg-slate-800/30 border border-violet-500/20 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-bold text-violet-300">{title}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-violet-300">{tx('Ejemplos de código', 'Code Examples')}</h3>
        <CodeBlock language="sql" code={`-- CREATE TABLE con constraints
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  username    VARCHAR(50)  NOT NULL,
  created_at  TIMESTAMPTZ  DEFAULT NOW(),
  role        VARCHAR(20)  DEFAULT 'user' CHECK (role IN ('user','admin','mod'))
);

-- SELECT con JOIN
SELECT u.username, p.title, p.created_at
FROM   posts p
JOIN   users u ON u.id = p.user_id
WHERE  p.published = TRUE
ORDER  BY p.created_at DESC
LIMIT  20;

-- Índice parcial (optimiza queries frecuentes)
CREATE INDEX idx_posts_published ON posts (user_id, created_at)
  WHERE published = TRUE;

-- EXPLAIN ANALYZE para diagnóstico
EXPLAIN ANALYZE
  SELECT * FROM posts WHERE user_id = 42 AND published = TRUE;
-- Seq Scan vs Index Scan — buscar Index Scan en tablas grandes`} />
      </div>
    </div>
  );

  const renderMongoDB = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">MongoDB</h2>
        <p className="text-slate-400 text-sm">{tx('Base de datos orientada a documentos JSON/BSON', 'JSON/BSON document-oriented database')}</p>
      </div>

      <MongoDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { title: tx('Modelo de documentos', 'Document Model'), desc: tx('Los datos se almacenan como documentos BSON (JSON binario). Un documento puede contener arrays y sub-documentos anidados, eliminando la necesidad de JOINs en muchos casos.', 'Data stored as BSON (binary JSON) documents. A document can contain arrays and nested sub-documents, eliminating the need for JOINs in many cases.') },
          { title: 'MongoDB Atlas', desc: tx('DBaaS de MongoDB en la nube. Provee backups automáticos, escalado horizontal con sharding, Atlas Search (full-text) y triggers serverless.', 'MongoDB\'s cloud DBaaS. Provides automatic backups, horizontal scaling with sharding, Atlas Search (full-text), and serverless triggers.') },
          { title: tx('Agregaciones', 'Aggregations'), desc: tx('Pipeline de transformación: $match filtra, $group agrupa, $project selecciona campos, $lookup hace JOINs. Muy potente para analytics.', 'Transformation pipeline: $match filters, $group groups, $project selects fields, $lookup does JOINs. Very powerful for analytics.') },
          { title: tx('Indexación', 'Indexing'), desc: tx('Índices en campos, arrays, geoespaciales y text search. Los índices compuestos soportan queries de múltiples campos con orden específico.', 'Indexes on fields, arrays, geospatial and text search. Compound indexes support multi-field queries with specific ordering.') },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-slate-800/30 border border-violet-500/20 rounded-xl p-3">
            <p className="text-sm font-bold text-violet-300 mb-1.5">{title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-violet-300">{tx('Ejemplos de código', 'Code Examples')}</h3>
        <CodeBlock language="javascript" code={`// insertOne — insertar documento
await db.collection('users').insertOne({
  name: 'Alice',
  email: 'alice@example.com',
  tags: ['admin', 'beta'],
  address: { city: 'Madrid', zip: '28001' },
  createdAt: new Date(),
});

// find con projection y filtro
const users = await db.collection('users')
  .find({ 'address.city': 'Madrid' })
  .project({ name: 1, email: 1, _id: 0 })
  .sort({ createdAt: -1 })
  .limit(20)
  .toArray();

// Aggregation pipeline
const stats = await db.collection('orders').aggregate([
  { $match: { status: 'completed', createdAt: { $gte: new Date('2024-01-01') } } },
  { $group: { _id: '$userId', total: { $sum: '$amount' }, count: { $sum: 1 } } },
  { $project: { userId: '$_id', total: 1, avgOrder: { $divide: ['$total', '$count'] } } },
  { $sort: { total: -1 } },
  { $limit: 10 },
]).toArray();

// Índice compuesto
await db.collection('users').createIndex({ 'address.city': 1, createdAt: -1 });`} />
      </div>
    </div>
  );

  const renderRedis = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">Redis & Caching</h2>
        <p className="text-slate-400 text-sm">{tx('Almacenamiento en memoria ultra rápido — caché, pub/sub, colas', 'Ultra-fast in-memory store — cache, pub/sub, queues')}</p>
      </div>

      <RedisDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { title: tx('Políticas de evicción', 'Eviction Policies'), desc: tx('allkeys-lru (evicta la menos usada), volatile-ttl (evicta la que expira antes), noeviction (rechaza writes). Elegir según el patrón de acceso.', 'allkeys-lru (evicts least recently used), volatile-ttl (evicts soonest to expire), noeviction (rejects writes). Choose based on access pattern.') },
          { title: tx('Estructuras de datos', 'Data Structures'), desc: tx('String, Hash, List, Set, Sorted Set, Stream, Bitmap, HyperLogLog. Cada una tiene complejidad O(1) para operaciones comunes.', 'String, Hash, List, Set, Sorted Set, Stream, Bitmap, HyperLogLog. Each has O(1) complexity for common operations.') },
          { title: 'Pub/Sub', desc: tx('Mensajería en tiempo real: publishers envían a channels, subscribers reciben. Para chat, notificaciones, invalidación de caché distribuida.', 'Real-time messaging: publishers send to channels, subscribers receive. For chat, notifications, distributed cache invalidation.') },
          { title: tx('Casos de uso', 'Use Cases'), desc: tx('Caché de sesiones, rate limiting, leaderboards (Sorted Set), colas de trabajos (List), contadores en tiempo real (INCR), búsqueda de texto (RediSearch).', 'Session cache, rate limiting, leaderboards (Sorted Set), job queues (List), real-time counters (INCR), text search (RediSearch).') },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-slate-800/30 border border-violet-500/20 rounded-xl p-3">
            <p className="text-sm font-bold text-violet-300 mb-1.5">{title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-violet-300">{tx('Ejemplos de código', 'Code Examples')}</h3>
        <CodeBlock language="javascript" code={`import { createClient } from 'redis';
const client = await createClient().connect();

// SET / GET
await client.set('user:42:name', 'Alice');
const name = await client.get('user:42:name'); // 'Alice'

// SETEX — con TTL (expiración en segundos)
await client.setEx('session:abc123', 3600, JSON.stringify({ userId: 42 }));

// HSET / HGET — Hash (objeto)
await client.hSet('user:42', { name: 'Alice', email: 'alice@x.com', role: 'admin' });
const email = await client.hGet('user:42', 'email');
const all   = await client.hGetAll('user:42');  // { name, email, role }

// RPUSH / LRANGE — List (cola)
await client.rPush('jobs:queue', JSON.stringify({ type: 'email', to: 'alice@x.com' }));
const jobs = await client.lRange('jobs:queue', 0, -1); // todos los items

// Sorted Set — leaderboard
await client.zAdd('leaderboard', [{ score: 9500, value: 'alice' }, { score: 8200, value: 'bob' }]);
const top3 = await client.zRangeWithScores('leaderboard', 0, 2, { REV: true });

// SUBSCRIBE — pub/sub
const subscriber = client.duplicate();
await subscriber.connect();
await subscriber.subscribe('notifications', (message) => {
  console.log('Received:', JSON.parse(message));
});
// En otro proceso:
await client.publish('notifications', JSON.stringify({ event: 'new_order', id: 99 }));`} />
      </div>
    </div>
  );

  const renderIndexes = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">{tx('Índices & Optimización', 'Indexes & Query Optimization')}</h2>
        <p className="text-slate-400 text-sm">{tx('Acelera tus queries con estrategias de indexado y query planning', 'Speed up queries with indexing strategies and query planning')}</p>
      </div>

      <IndexDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { title: tx('Selectividad del índice', 'Index Selectivity'), desc: tx('Un índice es selectivo cuando filtra muchas filas. Cardinalidad alta (email, id) = muy selectivo. Cardinalidad baja (boolean) = poco útil como índice único.', 'An index is selective when it filters many rows. High cardinality (email, id) = highly selective. Low cardinality (boolean) = not useful as sole index.') },
          { title: tx('Problema N+1', 'N+1 Problem'), desc: tx('1 query para lista + N queries para detalles. Solución: JOIN, eager loading (ORM) o DataLoader (batching). Muy común con ORMs como Prisma u Hibernate.', '1 query for list + N queries for details. Solution: JOIN, eager loading (ORM), or DataLoader (batching). Very common with ORMs like Prisma or Hibernate.') },
          { title: tx('Índices compuestos', 'Composite Indexes'), desc: tx('Un índice en (a, b) sirve para queries sobre a y sobre (a, b), pero NO solo sobre b. El orden importa — poner columnas de filtrado primero.', 'An index on (a, b) serves queries on a and (a, b), but NOT on b alone. Order matters — put filter columns first.') },
          { title: tx('Covering Index', 'Covering Index'), desc: tx('Un índice que contiene todas las columnas que necesita la query. Postgres puede responder desde el índice sin tocar la tabla (Index-Only Scan).', 'An index containing all columns the query needs. Postgres can answer from the index without touching the table (Index-Only Scan).') },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-slate-800/30 border border-violet-500/20 rounded-xl p-3">
            <p className="text-sm font-bold text-violet-300 mb-1.5">{title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-violet-300">{tx('Ejemplos de código', 'Code Examples')}</h3>
        <CodeBlock language="sql" code={`-- Índice simple
CREATE INDEX idx_users_email ON users (email);

-- Índice compuesto (columna de filtro primero)
CREATE INDEX idx_posts_user_date ON posts (user_id, created_at DESC);

-- Índice parcial — solo filas activas
CREATE INDEX idx_users_active ON users (email) WHERE active = TRUE;

-- Covering index — incluye columnas extra para Index-Only Scan
CREATE INDEX idx_posts_covering ON posts (user_id, created_at DESC)
  INCLUDE (title, published);

-- EXPLAIN ANALYZE — interpretar el plan
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
  SELECT title, created_at
  FROM   posts
  WHERE  user_id = 42 AND published = TRUE
  ORDER  BY created_at DESC
  LIMIT  10;

-- Buscar en el output:
-- "Index Scan"     → usa el índice                 ✓
-- "Seq Scan"       → escanea toda la tabla          ✗ (en tablas grandes)
-- "Bitmap Scan"    → combina varios índices         ✓
-- "rows=1 loops=1" → estimación del planner
-- Actual rows vs Estimated rows — diferencia grande = desactualizar estadísticas

-- Actualizar estadísticas
ANALYZE posts;
VACUUM ANALYZE posts;`} />
      </div>
    </div>
  );

  const renderAcid = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">{tx('Transacciones & ACID', 'Transactions & ACID')}</h2>
        <p className="text-slate-400 text-sm">{tx('Garantías de integridad en operaciones de base de datos', 'Integrity guarantees for database operations')}</p>
      </div>

      <AcidDiagram tx={tx} />

      {/* Isolation levels table */}
      <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4">
        <p className="text-xs font-semibold text-violet-300 uppercase tracking-wider mb-3">{tx('Niveles de aislamiento', 'Isolation Levels')}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-1.5 pr-3 text-slate-400 font-semibold whitespace-nowrap">{tx('Nivel', 'Level')}</th>
                <th className="text-center py-1.5 px-2 text-slate-400 font-semibold whitespace-nowrap">Dirty Read</th>
                <th className="text-center py-1.5 px-2 text-slate-400 font-semibold whitespace-nowrap">Non-repeatable</th>
                <th className="text-center py-1.5 px-2 text-slate-400 font-semibold whitespace-nowrap">Phantom</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {[
                { level: 'READ UNCOMMITTED', dirty: '✗', nonrep: '✗', phantom: '✗', color: 'text-red-400' },
                { level: 'READ COMMITTED', dirty: '✓', nonrep: '✗', phantom: '✗', color: 'text-yellow-400' },
                { level: 'REPEATABLE READ', dirty: '✓', nonrep: '✓', phantom: '✗', color: 'text-orange-400' },
                { level: 'SERIALIZABLE', dirty: '✓', nonrep: '✓', phantom: '✓', color: 'text-emerald-400' },
              ].map(row => (
                <tr key={row.level}>
                  <td className={`py-1.5 pr-3 font-mono font-semibold whitespace-nowrap ${row.color}`}>{row.level}</td>
                  <td className="text-center py-1.5 px-2 text-slate-300">{row.dirty}</td>
                  <td className="text-center py-1.5 px-2 text-slate-300">{row.nonrep}</td>
                  <td className="text-center py-1.5 px-2 text-slate-300">{row.phantom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 mt-2">
          {tx('PostgreSQL usa READ COMMITTED por defecto. ✓ = fenómeno prevenido', 'PostgreSQL defaults to READ COMMITTED. ✓ = phenomenon prevented')}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-violet-300">{tx('Ejemplos de código', 'Code Examples')}</h3>
        <CodeBlock language="sql" code={`-- Transacción básica
BEGIN;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
  -- si alguna falla, ROLLBACK automático en error; si no:
COMMIT;

-- ROLLBACK explícito
BEGIN;
  UPDATE orders SET status = 'shipped' WHERE id = 99;
  -- algo salió mal:
ROLLBACK;

-- SAVEPOINT — checkpoint parcial
BEGIN;
  INSERT INTO audit_log (action) VALUES ('process_started');
  SAVEPOINT sp1;

  UPDATE inventory SET qty = qty - 1 WHERE product_id = 42;

  -- si falla la actualización, volvemos a sp1 sin abortar toda la tx
  ROLLBACK TO SAVEPOINT sp1;

  -- continuamos con otra estrategia
  INSERT INTO backorders (product_id, qty) VALUES (42, 1);
COMMIT;

-- Nivel de aislamiento por transacción
BEGIN ISOLATION LEVEL SERIALIZABLE;
  SELECT qty FROM inventory WHERE product_id = 42 FOR UPDATE; -- lock pesimista
  UPDATE inventory SET qty = qty - 1 WHERE product_id = 42;
COMMIT;

-- Locking optimista (con version column)
-- 1) Leer versión actual
SELECT id, qty, version FROM inventory WHERE id = 42;

-- 2) Actualizar solo si versión no cambió
UPDATE inventory
SET    qty = qty - 1, version = version + 1
WHERE  id = 42 AND version = 7; -- versión leída
-- Si rows_affected = 0 → conflicto → reintentar`} />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (active) {
      case 'overview':  return renderOverview();
      case 'postgres':  return renderPostgres();
      case 'mongodb':   return renderMongoDB();
      case 'redis':     return renderRedis();
      case 'indexes':   return renderIndexes();
      case 'acid':      return renderAcid();
      default:          return renderOverview();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActive(section.id)}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                  active === section.id
                    ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{section.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{section.subtitle}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content panel */}
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DatabasesPro;
