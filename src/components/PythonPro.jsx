import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, GitBranch, Zap, Globe, Database, HelpCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { SiPython } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Python Data Structures Diagram ─────────────────────────────────────────

const PythonDataStructuresDiagram = ({ tx }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const structures = [
    {
      name: 'list',
      syntax: '[1, 2, 3]',
      desc: tx('Ordenada, mutable, duplicados', 'Ordered, mutable, duplicates'),
      color: 'border-blue-500/60 text-blue-300 bg-blue-500/15',
      glow: 'rgba(59,130,246,0.45)',
    },
    {
      name: 'dict',
      syntax: '{"k": "v"}',
      desc: tx('Clave-valor, O(1) lookup', 'Key-value, O(1) lookup'),
      color: 'border-blue-400/60 text-blue-200 bg-blue-400/15',
      glow: 'rgba(96,165,250,0.45)',
    },
    {
      name: 'set',
      syntax: '{1, 2, 3}',
      desc: tx('Sin duplicados, O(1) pertenencia', 'No duplicates, O(1) membership'),
      color: 'border-blue-600/60 text-blue-400 bg-blue-600/15',
      glow: 'rgba(37,99,235,0.45)',
    },
    {
      name: 'tuple',
      syntax: '(1, 2, 3)',
      desc: tx('Ordenada, inmutable, hashable', 'Ordered, immutable, hashable'),
      color: 'border-sky-500/60 text-sky-300 bg-sky-500/15',
      glow: 'rgba(14,165,233,0.45)',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % structures.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-blue-300 uppercase tracking-wider">
        {tx('Estructuras de datos principales', 'Core Data Structures')}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {structures.map((s, i) => (
          <motion.div
            key={s.name}
            animate={{
              boxShadow: activeIdx === i ? `0 0 20px ${s.glow}` : '0 0 0px transparent',
              scale: activeIdx === i ? 1.05 : 1,
            }}
            transition={{ duration: 0.35 }}
            className={`flex flex-col items-center gap-1.5 p-3 border rounded-xl transition-all ${s.color} ${activeIdx === i ? 'opacity-100' : 'opacity-40'}`}
          >
            <span className="font-bold text-sm font-mono">{s.name}</span>
            <code className="text-[10px] font-mono text-slate-300 bg-slate-900/60 px-1.5 py-0.5 rounded">{s.syntax}</code>
            <span className="text-[10px] text-slate-400 text-center leading-tight">{s.desc}</span>
          </motion.div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={activeIdx}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="text-center text-xs text-blue-400 h-4"
        >
          {[
            tx('Acceso por índice — slicing soportado', 'Index access — slicing supported'),
            tx('Python 3.7+ mantiene orden de inserción', 'Python 3.7+ maintains insertion order'),
            tx('Operaciones: union |, intersección &, diferencia -', 'Operations: union |, intersection &, difference -'),
            tx('Hashable: puede ser clave de dict o elemento de set', 'Hashable: can be dict key or set element'),
          ][activeIdx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Python OOP Diagram ──────────────────────────────────────────────────────

const PythonOOPDiagram = ({ tx }) => {
  const [mroActive, setMroActive] = useState(false);
  const [mroStep, setMroStep] = useState(0);

  const mroChain = ['Dog', 'Animal', 'object'];

  useEffect(() => {
    const id = setInterval(() => {
      setMroActive(true);
      setMroStep(0);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!mroActive) return;
    if (mroStep >= mroChain.length - 1) {
      const t = setTimeout(() => setMroActive(false), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setMroStep(s => s + 1), 350);
    return () => clearTimeout(t);
  }, [mroActive, mroStep]);

  const children = [
    { name: 'Dog', methods: ['speak() → "Woof"', 'fetch()'], color: 'border-blue-400/50 text-blue-200 bg-blue-400/10' },
    { name: 'Cat', methods: ['speak() → "Meow"', 'purr()'], color: 'border-sky-500/50 text-sky-300 bg-sky-500/10' },
  ];

  return (
    <div className="bg-slate-950/40 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-blue-300 uppercase tracking-wider">
        {tx('Jerarquía de clases & MRO', 'Class Hierarchy & MRO')}
      </p>
      {/* Animal parent */}
      <div className="flex justify-center">
        <div className="border border-blue-500/50 bg-blue-500/10 rounded-xl px-4 py-2.5 text-center min-w-[130px]">
          <p className="text-blue-300 font-bold text-sm">Animal</p>
          <p className="text-slate-400 text-[10px] font-mono mt-0.5">speak() / __init__()</p>
        </div>
      </div>
      {/* Arrow down */}
      <div className="flex justify-center gap-16">
        <span className="text-blue-500/50 text-lg leading-none">↙</span>
        <span className="text-blue-500/50 text-lg leading-none">↘</span>
      </div>
      {/* Children */}
      <div className="grid grid-cols-2 gap-3">
        {children.map((cls) => (
          <div key={cls.name} className={`border rounded-xl px-3 py-2.5 text-center ${cls.color}`}>
            <p className="font-bold text-sm">{cls.name}</p>
            {cls.methods.map((m, i) => (
              <p key={i} className="text-slate-400 text-[10px] font-mono">{m}</p>
            ))}
          </div>
        ))}
      </div>
      {/* MRO animation */}
      <div className="border-t border-slate-800 pt-2.5">
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide mb-1.5">
          {tx('MRO — dog.speak() busca en…', 'MRO — dog.speak() searches…')}
        </p>
        <div className="flex items-center gap-1.5 flex-wrap">
          {mroChain.map((cls, i) => (
            <div key={cls} className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  backgroundColor: mroActive && mroStep >= i ? 'rgba(59,130,246,0.25)' : 'rgba(15,23,42,0.6)',
                  borderColor: mroActive && mroStep >= i ? 'rgba(59,130,246,0.6)' : 'rgba(100,116,139,0.3)',
                  boxShadow: mroActive && mroStep === i ? '0 0 14px rgba(59,130,246,0.5)' : '0 0 0px transparent',
                }}
                transition={{ duration: 0.3 }}
                className="px-2.5 py-1 border rounded-lg text-xs font-mono font-semibold text-slate-300"
              >
                {cls}
              </motion.div>
              {i < mroChain.length - 1 && (
                <motion.span
                  animate={{ opacity: mroActive && mroStep > i ? 1 : 0.25 }}
                  className="text-blue-500/60 text-xs"
                >
                  →
                </motion.span>
              )}
            </div>
          ))}
          {mroActive && mroStep === mroChain.length - 1 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-xs font-semibold ml-1"
            >
              ✓ {tx('encontrado en Animal', 'found in Animal')}
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Python Async Diagram ────────────────────────────────────────────────────

const PythonAsyncDiagram = ({ tx }) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const tasks = [
    { name: 'fetch_users()', color: 'border-blue-500/60 text-blue-300 bg-blue-500/15' },
    { name: 'query_db()', color: 'border-blue-400/60 text-blue-200 bg-blue-400/15' },
    { name: 'send_email()', color: 'border-sky-500/60 text-sky-300 bg-sky-500/15' },
  ];

  const activeTask = tick % tasks.length;

  return (
    <div className="bg-slate-950/40 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-blue-300 uppercase tracking-wider">
        {tx('Event Loop — corrutinas en cola', 'Event Loop — coroutines queued')}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Event loop circle */}
        <div className="relative flex-shrink-0 w-24 h-24 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-2 border-blue-500/40 border-t-blue-400 rounded-full"
          />
          <div className="text-center">
            <SiPython className="w-6 h-6 text-blue-400 mx-auto" />
            <span className="text-[9px] text-blue-300 font-semibold block mt-0.5">event loop</span>
          </div>
        </div>
        {/* Tasks */}
        <div className="flex sm:flex-col gap-2 flex-wrap justify-center">
          {tasks.map((task, i) => (
            <motion.div
              key={task.name}
              animate={{
                boxShadow: activeTask === i ? '0 0 16px rgba(59,130,246,0.5)' : '0 0 0px transparent',
                scale: activeTask === i ? 1.06 : 1,
                opacity: activeTask === i ? 1 : 0.45,
              }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-2 border rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold ${task.color}`}
            >
              {activeTask === i ? (
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"
                />
              ) : (
                <div className="w-1.5 h-1.5 bg-slate-600 rounded-full flex-shrink-0" />
              )}
              {task.name}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 text-[10px] pt-1 border-t border-slate-800">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
          <span className="text-blue-300">{tx('Ejecutando', 'Running')}</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-slate-600 inline-block" />
          <span className="text-slate-400">{tx('En cola (await)', 'Queued (await)')}</span>
        </span>
      </div>
    </div>
  );
};

// ─── Web Framework Diagram ───────────────────────────────────────────────────

const WebFrameworkDiagram = ({ tx }) => {
  const [activeFramework, setActiveFramework] = useState(0);

  const frameworks = [
    {
      name: 'FastAPI',
      color: 'border-blue-500/60 text-blue-300 bg-blue-500/15',
      glow: 'rgba(59,130,246,0.4)',
      steps: ['routing', 'Pydantic', 'response'],
    },
    {
      name: 'Django',
      color: 'border-blue-400/60 text-blue-200 bg-blue-400/15',
      glow: 'rgba(96,165,250,0.4)',
      steps: ['urls.py', 'middleware', 'response'],
    },
    {
      name: 'Flask',
      color: 'border-sky-500/60 text-sky-300 bg-sky-500/15',
      glow: 'rgba(14,165,233,0.4)',
      steps: ['@route', 'before_req', 'response'],
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveFramework(f => (f + 1) % frameworks.length), 2000);
    return () => clearInterval(id);
  }, []);

  const fw = frameworks[activeFramework];

  return (
    <div className="bg-slate-950/40 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-blue-300 uppercase tracking-wider">
        {tx('Flujo de request por framework', 'Request flow per framework')}
      </p>
      {/* Framework tabs */}
      <div className="flex gap-2 justify-center">
        {frameworks.map((f, i) => (
          <motion.button
            key={f.name}
            onClick={() => setActiveFramework(i)}
            animate={{
              boxShadow: activeFramework === i ? `0 0 14px ${f.glow}` : '0 0 0px transparent',
            }}
            transition={{ duration: 0.3 }}
            className={`px-3 py-1 border rounded-lg text-xs font-bold transition-all ${f.color} ${activeFramework === i ? 'opacity-100' : 'opacity-40'}`}
          >
            {f.name}
          </motion.button>
        ))}
      </div>
      {/* Request flow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFramework}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center gap-2 flex-wrap"
        >
          <div className="flex items-center gap-2 border border-slate-700/50 bg-slate-800/40 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-300">
            <ArrowRight className="w-3 h-3 text-blue-400" />
            Request
          </div>
          <ArrowRight className="w-3 h-3 text-blue-500/50 flex-shrink-0" />
          {fw.steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`border rounded-lg px-2.5 py-1.5 text-xs font-mono font-semibold ${fw.color}`}>
                {step}
              </div>
              {i < fw.steps.length - 1 && (
                <ArrowRight className="w-3 h-3 text-blue-500/50 flex-shrink-0" />
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Data Pipeline Diagram ───────────────────────────────────────────────────

const DataPipelineDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: tx('Raw Data', 'Raw Data'), detail: 'CSV / JSON / DB', color: 'border-blue-600/60 text-blue-400 bg-blue-600/15' },
    { label: 'DataFrame', detail: 'pd.read_csv()', color: 'border-blue-500/60 text-blue-300 bg-blue-500/15' },
    { label: tx('Transform', 'Transform'), detail: 'groupby / merge', color: 'border-blue-400/60 text-blue-200 bg-blue-400/15' },
    { label: 'NumPy Ops', detail: 'vectorized', color: 'border-sky-500/60 text-sky-300 bg-sky-500/15' },
    { label: 'Output', detail: 'to_csv / plot', color: 'border-sky-400/60 text-sky-200 bg-sky-400/15' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-blue-300 uppercase tracking-wider">
        {tx('Pipeline ETL con Pandas & NumPy', 'ETL Pipeline with Pandas & NumPy')}
      </p>
      <div className="flex items-center flex-wrap gap-1.5 justify-center">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1.5">
            <motion.div
              animate={{
                boxShadow: activeStep === i ? '0 0 16px rgba(59,130,246,0.5)' : activeStep > i ? '0 0 6px rgba(59,130,246,0.2)' : '0 0 0px transparent',
                scale: activeStep === i ? 1.07 : 1,
                opacity: activeStep >= i ? 1 : 0.4,
              }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col items-center border rounded-xl px-2.5 py-2 text-center ${step.color}`}
            >
              <span className="text-xs font-bold">{step.label}</span>
              <code className="text-[9px] text-slate-400 font-mono mt-0.5">{step.detail}</code>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                animate={{ opacity: activeStep > i ? 1 : 0.25 }}
                className="text-blue-500/60 text-sm"
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

// ─── Section Renderers ───────────────────────────────────────────────────────

const renderFundamentals = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Fundamentos de Python', 'Python Fundamentals')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Duck typing, comprehensions, generadores, decoradores y gestores de contexto.',
          'Duck typing, comprehensions, generators, decorators and context managers.'
        )}
      </p>
    </div>

    <PythonDataStructuresDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Duck Typing', 'Duck Typing'),
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('"Si camina como pato y grazna como pato, es un pato"', '"If it walks like a duck and quacks like a duck, it\'s a duck"'),
            tx('No importa el tipo, sino los métodos/atributos disponibles', 'Type doesn\'t matter, only available methods/attributes'),
            tx('Usa isinstance() solo cuando sea necesario', 'Use isinstance() only when truly necessary'),
            tx('Prefiere protocolos (Protocol) sobre herencia', 'Prefer protocols (Protocol) over inheritance'),
          ],
        },
        {
          title: tx('Comprehensions', 'Comprehensions'),
          color: 'border-blue-400/30 text-blue-200',
          points: [
            '[x*2 for x in range(10) if x%2==0] — list',
            '{k: v for k, v in d.items()} — dict',
            '{x for x in lst if x > 0} — set',
            tx('(x**2 for x in range(n)) — generator expression', '(x**2 for x in range(n)) — generator expression'),
          ],
        },
        {
          title: tx('Generadores (yield)', 'Generators (yield)'),
          color: 'border-sky-500/30 text-sky-300',
          points: [
            tx('Produce valores de uno en uno — lazy evaluation', 'Produces values one at a time — lazy evaluation'),
            tx('Usa O(1) memoria independiente del tamaño del dataset', 'Uses O(1) memory regardless of dataset size'),
            tx('yield from para delegar en sub-generador', 'yield from to delegate to sub-generator'),
            tx('Perfecto para streams, ficheros grandes, pipelines', 'Perfect for streams, large files, pipelines'),
          ],
        },
        {
          title: tx('Decoradores', 'Decorators'),
          color: 'border-blue-600/30 text-blue-400',
          points: [
            tx('Función que envuelve otra función — patrón wrapper', 'Function wrapping another function — wrapper pattern'),
            tx('@functools.wraps preserva __name__, __doc__', '@functools.wraps preserves __name__, __doc__'),
            tx('Apilables: @cache @validate @log en orden inverso', 'Stackable: @cache @validate @log in reverse order'),
            tx('@decorator es azúcar sintáctica para func = decorator(func)', '@decorator is syntactic sugar for func = decorator(func)'),
          ],
        },
        {
          title: tx('Context Managers', 'Context Managers'),
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('with open("f") as f garantiza cierre del recurso', 'with open("f") as f guarantees resource close'),
            tx('@contextmanager de contextlib para creación sencilla', '@contextmanager from contextlib for easy creation'),
            tx('__enter__ retorna el recurso, __exit__ lo libera', '__enter__ returns resource, __exit__ releases it'),
            tx('Ideal para conexiones DB, locks, tempdir', 'Ideal for DB connections, locks, tempdir'),
          ],
        },
        {
          title: 'f-strings & más',
          color: 'border-sky-400/30 text-sky-200',
          points: [
            tx('f"{name!r}" — repr, f"{pi:.2f}" — formato', 'f"{name!r}" — repr, f"{pi:.2f}" — format'),
            tx('f"{value = }" — debug automático (Python 3.8+)', 'f"{value = }" — automatic debug (Python 3.8+)'),
            tx('*args = posicionales, **kwargs = nominales', '*args = positional, **kwargs = keyword'),
            tx('walrus := asigna y evalúa en la misma expresión', 'walrus := assigns and evaluates in same expression'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <SiPython className={`w-4 h-4 ${color.split(' ')[1]}`} />
            <h3 className={`font-bold text-sm ${color.split(' ')[1]}`}>{title}</h3>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="python" code={`# ── Comprehensions & Generators ──────────────────────────────
# List / dict / set comprehensions
squares = [x**2 for x in range(10) if x % 2 == 0]
word_len = {word: len(word) for word in ["hello", "world"]}
unique_chars = {c.lower() for c in "Hello World" if c.isalpha()}

# Generator — lazy, memory-efficient
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]

# Generator expression (no list in memory)
total = sum(x**2 for x in range(1_000_000))

# yield from — delegating generator
def chain_iters(*iterables):
    for it in iterables:
        yield from it

# Walrus operator (:=) — assign and test in one expression
import re
text = "Order 42 processed"
if m := re.search(r'\\d+', text):
    print(m.group())   # "42"

# f-string debug (Python 3.8+)
value = 42
print(f"{value = }")   # value = 42`} />

    <CodeBlock language="python" code={`import functools
import contextlib
import time

# ── Decorator with functools.wraps ────────────────────────────
def timer(func):
    @functools.wraps(func)          # preserves __name__, __doc__
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

def retry(times=3):
    """Parametrized decorator."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception:
                    if attempt == times - 1:
                        raise
            return None
        return wrapper
    return decorator

@timer
@retry(times=3)
def fetch_data(url: str) -> dict:
    ...   # HTTP call here

# ── Context Manager (class-based) ─────────────────────────────
class ManagedDB:
    def __init__(self, url: str):
        self.url = url
        self.conn = None

    def __enter__(self):
        self.conn = connect(self.url)
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.conn.close()
        return False  # don't suppress exceptions

# ── Context Manager (contextlib) ─────────────────────────────
@contextlib.contextmanager
def temp_directory():
    import tempfile, shutil
    path = tempfile.mkdtemp()
    try:
        yield path
    finally:
        shutil.rmtree(path)

with ManagedDB("postgresql://localhost/mydb") as conn:
    rows = conn.execute("SELECT * FROM users").fetchall()

with temp_directory() as tmp:
    process_files(tmp)`} />
  </div>
);

const renderOOP = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('OOP en Python', 'OOP in Python')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Clases, herencia, dataclasses, ABC y Protocol para interfaces estructurales.',
          'Classes, inheritance, dataclasses, ABC and Protocol for structural interfaces.'
        )}
      </p>
    </div>

    <PythonOOPDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: '__dunder__ methods',
          color: 'border-blue-500/30 text-blue-300',
          points: [
            '__repr__ — representación no ambigua para depurar',
            '__str__ — representación legible para usuarios',
            '__eq__ / __hash__ — comparación e igualdad',
            '__len__ / __iter__ / __getitem__ — protocolo de secuencia',
            '__enter__ / __exit__ — context manager protocol',
          ],
        },
        {
          title: '@property / @classmethod / @staticmethod',
          color: 'border-blue-400/30 text-blue-200',
          points: [
            tx('@property — getter lazy, sin () al acceder', '@property — lazy getter, no () needed'),
            tx('@property.setter — validación al asignar', '@property.setter — validation on assignment'),
            tx('@classmethod — recibe cls, factory patterns', '@classmethod — receives cls, factory patterns'),
            tx('@staticmethod — sin self/cls, función de utilidad', '@staticmethod — no self/cls, utility function'),
          ],
        },
        {
          title: '@dataclass',
          color: 'border-sky-500/30 text-sky-300',
          points: [
            tx('Genera __init__, __repr__, __eq__ automáticamente', 'Auto-generates __init__, __repr__, __eq__'),
            tx('frozen=True hace la clase inmutable (hashable)', 'frozen=True makes class immutable (hashable)'),
            tx('field(default_factory=list) para mutables', 'field(default_factory=list) for mutables'),
            tx('Python 3.10+: slots=True reduce uso de memoria', 'Python 3.10+: slots=True reduces memory'),
          ],
        },
        {
          title: 'ABC / Protocol',
          color: 'border-blue-600/30 text-blue-400',
          points: [
            tx('ABC: herencia + @abstractmethod — fuerza implementación', 'ABC: inheritance + @abstractmethod — forces implementation'),
            tx('Protocol: duck typing estructural — sin herencia', 'Protocol: structural duck typing — no inheritance'),
            tx('runtime_checkable permite isinstance() con Protocol', 'runtime_checkable enables isinstance() with Protocol'),
            tx('Prefer Protocol para código más desacoplado', 'Prefer Protocol for more decoupled code'),
          ],
        },
        {
          title: tx('Herencia múltiple & MRO', 'Multiple Inheritance & MRO'),
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('Python usa C3 Linearization para resolver el MRO', 'Python uses C3 Linearization to resolve MRO'),
            tx('super() respeta el MRO — siempre úsalo en __init__', 'super() respects MRO — always use in __init__'),
            tx('Mixin: clase sin estado que añade comportamiento', 'Mixin: stateless class that adds behavior'),
            tx('ClassName.__mro__ para ver el orden de resolución', 'ClassName.__mro__ to see resolution order'),
          ],
        },
        {
          title: '__slots__',
          color: 'border-sky-400/30 text-sky-200',
          points: [
            tx('Declara atributos fijos — elimina __dict__ por instancia', 'Declares fixed attributes — removes per-instance __dict__'),
            tx('Reduce uso de memoria ~30-50% en muchas instancias', 'Reduces memory ~30-50% with many instances'),
            tx('Mejora velocidad de acceso a atributos', 'Improves attribute access speed'),
            tx('No compatible con herencia múltiple sin cuidado', 'Not compatible with multiple inheritance carelessly'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <h3 className={`font-bold text-sm font-mono ${color.split(' ')[1]} mb-3`}>{title}</h3>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="python" code={`from __future__ import annotations
from typing import ClassVar

class Animal:
    species_count: ClassVar[int] = 0

    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age
        Animal.species_count += 1

    def __str__(self) -> str:
        return f"{self.name} ({self.age}y)"

    def __repr__(self) -> str:
        return f"Animal(name={self.name!r}, age={self.age!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Animal):
            return NotImplemented
        return self.name == other.name and self.age == other.age

    def __hash__(self) -> int:
        return hash((self.name, self.age))

    @property
    def age(self) -> int:
        return self._age

    @age.setter
    def age(self, value: int) -> None:
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value

    @classmethod
    def from_dict(cls, data: dict) -> Animal:
        return cls(data["name"], data["age"])

    @staticmethod
    def validate_name(name: str) -> bool:
        return bool(name and name.isalpha())

    def speak(self) -> str:
        raise NotImplementedError

class Dog(Animal):
    __slots__ = ("breed",)

    def __init__(self, name: str, age: int, breed: str) -> None:
        super().__init__(name, age)
        self.breed = breed

    def speak(self) -> str:
        return f"{self.name} says: Woof!"

print(Dog.__mro__)  # Dog → Animal → object`} />

    <CodeBlock language="python" code={`from dataclasses import dataclass, field
from typing import Protocol, runtime_checkable
from abc import ABC, abstractmethod

# ── Dataclass ─────────────────────────────────────────────────
@dataclass(frozen=True, slots=True)
class Point:
    x: float
    y: float

    def distance_to(self, other: Point) -> float:
        return ((self.x - other.x)**2 + (self.y - other.y)**2) ** 0.5

@dataclass
class Config:
    name: str
    tags: list[str] = field(default_factory=list)
    max_retries: int = 3

# ── Protocol (structural subtyping) ──────────────────────────
@runtime_checkable
class Drawable(Protocol):
    def draw(self) -> None: ...
    def resize(self, factor: float) -> None: ...

class Circle:                   # Does NOT inherit Drawable
    def draw(self) -> None:
        print("Drawing circle")
    def resize(self, factor: float) -> None:
        self.radius *= factor

def render(shape: Drawable) -> None:
    shape.draw()

circle = Circle()
render(circle)                           # Works via duck typing
print(isinstance(circle, Drawable))      # True (runtime_checkable)

# ── Abstract Base Class ───────────────────────────────────────
class Storage(ABC):
    @abstractmethod
    def save(self, key: str, value: bytes) -> None: ...

    @abstractmethod
    def load(self, key: str) -> bytes: ...

class S3Storage(Storage):
    def save(self, key: str, value: bytes) -> None:
        ...

    def load(self, key: str) -> bytes:
        ...`} />
  </div>
);

const renderAsync = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Async & Concurrencia', 'Async & Concurrency')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'asyncio, async/await, threading vs multiprocessing — cuándo usar cada uno.',
          'asyncio, async/await, threading vs multiprocessing — when to use each.'
        )}
      </p>
    </div>

    <PythonAsyncDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: 'async def / await',
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('async def define una corrutina — no bloquea el hilo', 'async def defines a coroutine — doesn\'t block the thread'),
            tx('await cede el control al event loop mientras espera I/O', 'await yields control to event loop while waiting for I/O'),
            tx('Solo funciona dentro de funciones async', 'Only works inside async functions'),
            tx('asyncio.run() arranca el event loop desde código síncrono', 'asyncio.run() starts the event loop from sync code'),
          ],
        },
        {
          title: 'gather vs create_task',
          color: 'border-blue-400/30 text-blue-200',
          points: [
            tx('asyncio.gather() ejecuta awaitables en paralelo', 'asyncio.gather() runs awaitables in parallel'),
            tx('return_exceptions=True: no cancela todo si uno falla', 'return_exceptions=True: doesn\'t cancel all if one fails'),
            tx('create_task() programa la tarea inmediatamente', 'create_task() schedules the task immediately'),
            tx('TaskGroup (Python 3.11+) cancela automáticamente en error', 'TaskGroup (Python 3.11+) auto-cancels on error'),
          ],
        },
        {
          title: 'aiohttp',
          color: 'border-sky-500/30 text-sky-300',
          points: [
            tx('Cliente HTTP async — no bloquea el event loop', 'Async HTTP client — doesn\'t block event loop'),
            tx('ClientSession reutiliza conexiones TCP (pool)', 'ClientSession reuses TCP connections (pool)'),
            tx('timeout=aiohttp.ClientTimeout(total=10)', 'timeout=aiohttp.ClientTimeout(total=10)'),
            tx('Soporta WebSockets y SSE nativamente', 'Native WebSocket and SSE support'),
          ],
        },
        {
          title: tx('Threading — GIL', 'Threading — GIL'),
          color: 'border-blue-600/30 text-blue-400',
          points: [
            tx('GIL: solo un hilo ejecuta bytecode Python a la vez', 'GIL: only one thread executes Python bytecode at a time'),
            tx('Bueno para I/O-bound: esperas de red, disco, DB', 'Good for I/O-bound: network, disk, DB waits'),
            tx('threading.Thread, ThreadPoolExecutor', 'threading.Thread, ThreadPoolExecutor'),
            tx('Lock / Event / Queue para sincronización entre hilos', 'Lock / Event / Queue for inter-thread sync'),
          ],
        },
        {
          title: tx('Multiprocessing — CPU-bound', 'Multiprocessing — CPU-bound'),
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('Procesos separados — cada uno tiene su propio GIL', 'Separate processes — each has its own GIL'),
            tx('Bueno para CPU-bound: ML training, compresión, parsing', 'Good for CPU-bound: ML training, compression, parsing'),
            tx('ProcessPoolExecutor con concurrent.futures', 'ProcessPoolExecutor with concurrent.futures'),
            tx('Serialización con pickle — evita objetos no serializables', 'Pickle serialization — avoid non-serializable objects'),
          ],
        },
        {
          title: 'concurrent.futures',
          color: 'border-sky-400/30 text-sky-200',
          points: [
            tx('API unificada para threads y procesos', 'Unified API for threads and processes'),
            tx('executor.map() reemplaza un for loop en paralelo', 'executor.map() replaces a parallel for loop'),
            tx('as_completed() procesa resultados según llegan', 'as_completed() processes results as they arrive'),
            tx('submit() retorna un Future — .result() bloquea', 'submit() returns a Future — .result() blocks'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <h3 className={`font-bold text-sm font-mono ${color.split(' ')[1]} mb-3`}>{title}</h3>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="python" code={`import asyncio
import aiohttp

# ── asyncio.gather — parallel I/O ────────────────────────────
async def fetch_url(session: aiohttp.ClientSession, url: str) -> dict:
    timeout = aiohttp.ClientTimeout(total=10)
    async with session.get(url, timeout=timeout) as resp:
        resp.raise_for_status()
        return await resp.json()

async def fetch_all(urls: list[str]) -> list[dict]:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        return [r for r in results if not isinstance(r, Exception)]

# ── asyncio.create_task — schedule immediately ────────────────
async def process_queue(items: list[str]) -> list[str]:
    async def worker(item: str) -> str:
        await asyncio.sleep(0.1)   # simulate I/O
        return item.upper()

    tasks = [asyncio.create_task(worker(item)) for item in items]
    return await asyncio.gather(*tasks)

# ── Python 3.11 TaskGroup (structured concurrency) ───────────
async def main_taskgroup():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(fetch_all(["https://api.example.com/a"]))
        task2 = tg.create_task(process_queue(["x", "y", "z"]))
    # Both tasks done — if either raises, both are cancelled

if __name__ == "__main__":
    asyncio.run(fetch_all(["https://api.example.com/users"]))`} />

    <CodeBlock language="python" code={`from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor, as_completed
import threading
import math

# ── Threading — I/O-bound ────────────────────────────────────
def download_file(url: str) -> str:
    import time; time.sleep(0.5)   # simulate network
    return f"downloaded: {url}"

urls = [f"https://example.com/file{i}" for i in range(8)]

with ThreadPoolExecutor(max_workers=4) as executor:
    futures = {executor.submit(download_file, url): url for url in urls}
    for future in as_completed(futures):
        url = futures[future]
        try:
            print(future.result())
        except Exception as e:
            print(f"Failed {url}: {e}")

# ── Multiprocessing — CPU-bound ──────────────────────────────
def is_prime(n: int) -> bool:
    if n < 2:
        return False
    return all(n % i != 0 for i in range(2, int(math.sqrt(n)) + 1))

numbers = list(range(100_000, 100_100))

with ProcessPoolExecutor() as executor:
    results = list(executor.map(is_prime, numbers))

primes = [n for n, p in zip(numbers, results) if p]

# ── Thread safety with Lock ──────────────────────────────────
counter = 0
lock = threading.Lock()

def increment():
    global counter
    with lock:
        counter += 1

threads = [threading.Thread(target=increment) for _ in range(100)]
for t in threads: t.start()
for t in threads: t.join()

# Rule: threading for I/O-bound, multiprocessing for CPU-bound,
#        asyncio for high-concurrency I/O (1000s connections)`} />
  </div>
);

const renderWeb = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Web Frameworks', 'Web Frameworks')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'FastAPI, Django, Flask — cuándo usar cada uno y sus patrones clave.',
          'FastAPI, Django, Flask — when to use each and their key patterns.'
        )}
      </p>
    </div>

    <WebFrameworkDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        {
          title: 'FastAPI',
          color: 'border-blue-500/30 text-blue-300',
          bg: 'bg-blue-500/5',
          points: [
            tx('async/await nativo — alto rendimiento', 'Native async/await — high performance'),
            tx('Type hints → validación automática con Pydantic', 'Type hints → auto-validation with Pydantic'),
            tx('Swagger UI y ReDoc autogenerados en /docs', 'Auto-generated Swagger UI and ReDoc at /docs'),
            tx('Dependencias con Depends() — inyección limpia', 'Dependencies with Depends() — clean injection'),
            tx('Ideal: APIs nuevas, microservicios, ML backends', 'Ideal: new APIs, microservices, ML backends'),
          ],
        },
        {
          title: 'Django',
          color: 'border-sky-500/30 text-sky-300',
          bg: 'bg-sky-500/5',
          points: [
            tx('"Batteries-included" — ORM, admin, auth incluidos', '"Batteries-included" — ORM, admin, auth included'),
            tx('Django REST Framework para APIs REST completas', 'Django REST Framework for full REST APIs'),
            tx('Migraciones de BD automáticas con makemigrations', 'Auto DB migrations with makemigrations'),
            tx('Panel admin generado desde los modelos', 'Auto admin panel from models'),
            tx('Ideal: apps grandes, monolitos, equipos grandes', 'Ideal: large apps, monoliths, large teams'),
          ],
        },
        {
          title: 'Flask',
          color: 'border-blue-400/30 text-blue-200',
          bg: 'bg-blue-400/5',
          points: [
            tx('Micro-framework — sin ORM ni admin incluidos', 'Micro-framework — no ORM or admin included'),
            tx('Total flexibilidad para estructurar el proyecto', 'Total flexibility to structure the project'),
            tx('Blueprints para modularizar rutas', 'Blueprints to modularize routes'),
            tx('Flask-SQLAlchemy, Flask-Login como extensiones', 'Flask-SQLAlchemy, Flask-Login as extensions'),
            tx('Ideal: prototipos, scripts web, proyectos pequeños', 'Ideal: prototypes, web scripts, small projects'),
          ],
        },
      ].map(({ title, color, bg, points }) => (
        <div key={title} className={`${bg} border ${color.split(' ')[0]} rounded-xl p-4`}>
          <h3 className={`font-bold text-sm ${color.split(' ')[1]} mb-3`}>{title}</h3>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Decision guide table */}
    <div className="bg-slate-950/40 border border-blue-500/20 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800">
        <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
          {tx('Guía de decisión — ¿Cuándo usar cada uno?', 'Decision Guide — When to use each?')}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-950/70">
            <tr>
              <th className="px-4 py-2.5 text-left text-slate-400 font-semibold">{tx('Criterio', 'Criterion')}</th>
              <th className="px-4 py-2.5 text-left text-blue-300 font-semibold">FastAPI</th>
              <th className="px-4 py-2.5 text-left text-sky-300 font-semibold">Django</th>
              <th className="px-4 py-2.5 text-left text-blue-200 font-semibold">Flask</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {[
              { label: tx('Rendimiento', 'Performance'), fa: tx('Muy alto (async)', 'Very high (async)'), dj: tx('Medio', 'Medium'), fl: tx('Medio', 'Medium') },
              { label: tx('Curva de aprendizaje', 'Learning curve'), fa: tx('Baja', 'Low'), dj: tx('Alta', 'High'), fl: tx('Muy baja', 'Very low') },
              { label: 'Admin UI', fa: tx('No incluido', 'Not included'), dj: tx('Incluido', 'Built-in'), fl: tx('No incluido', 'Not included') },
              { label: 'ORM', fa: 'SQLAlchemy (ext)', dj: tx('Incluido', 'Built-in'), fl: 'SQLAlchemy (ext)' },
              { label: tx('Mejor para', 'Best for'), fa: 'APIs / microservices', dj: tx('Apps completas', 'Full apps'), fl: tx('Prototipos', 'Prototypes') },
            ].map(row => (
              <tr key={row.label} className="hover:bg-slate-800/20">
                <td className="px-4 py-2.5 text-slate-300 font-medium">{row.label}</td>
                <td className="px-4 py-2.5 text-slate-400">{row.fa}</td>
                <td className="px-4 py-2.5 text-slate-400">{row.dj}</td>
                <td className="px-4 py-2.5 text-slate-400">{row.fl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <CodeBlock language="python" code={`from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, field_validator
from typing import Annotated
from sqlalchemy.orm import Session

app = FastAPI(title="User API", version="1.0.0")

# ── Pydantic model with validation ───────────────────────────
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    age: int

    @field_validator("age")
    @classmethod
    def age_must_be_positive(cls, v: int) -> int:
        if v < 0:
            raise ValueError("Age must be positive")
        return v

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    model_config = {"from_attributes": True}

# ── Dependency injection ──────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DbDep = Annotated[Session, Depends(get_db)]

# ── Endpoints ─────────────────────────────────────────────────
@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate, db: DbDep):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )
    db_user = User(**user.model_dump())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: DbDep):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user`} />

    <CodeBlock language="python" code={`# ── Django model + DRF serializer ────────────────────────────
from django.db import models
from rest_framework import serializers, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(
        "auth.User", on_delete=models.CASCADE, related_name="articles"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    published = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["author", "published"])]

    def __str__(self) -> str:
        return self.title

class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Article
        fields = ["id", "title", "content", "author_name", "created_at", "published"]
        read_only_fields = ["id", "created_at", "author_name"]

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related("author").all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_staff:
            qs = qs.filter(published=True)
        return qs

    @action(detail=True, methods=["post"])
    def publish(self, request, pk=None):
        article = self.get_object()
        article.published = True
        article.save()
        return Response({"status": "published"})`} />
  </div>
);

const renderData = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Data & Scripting', 'Data & Scripting')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'NumPy, Pandas, automatización con pathlib, subprocess y entornos virtuales.',
          'NumPy, Pandas, automation with pathlib, subprocess and virtual environments.'
        )}
      </p>
    </div>

    <DataPipelineDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: 'NumPy',
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('ndarray: operaciones vectorizadas sin for loops', 'ndarray: vectorized operations without for loops'),
            tx('Broadcasting: operaciones entre arrays de distintas formas', 'Broadcasting: operations between differently shaped arrays'),
            tx('np.where, np.argmax, np.sort, np.unique', 'np.where, np.argmax, np.sort, np.unique'),
            tx('dtype=np.float32 para reducir memoria a la mitad', 'dtype=np.float32 to halve memory usage'),
          ],
        },
        {
          title: 'Pandas',
          color: 'border-blue-400/30 text-blue-200',
          points: [
            tx('DataFrame: tabla 2D con índice y tipos por columna', 'DataFrame: 2D table with index and per-column types'),
            tx('groupby().agg() para aggregations en pocas líneas', 'groupby().agg() for aggregations in few lines'),
            tx('merge() como SQL JOIN entre DataFrames', 'merge() like SQL JOIN between DataFrames'),
            tx('query() y loc/iloc para filtros expresivos', 'query() and loc/iloc for expressive filters'),
          ],
        },
        {
          title: 'itertools / functools',
          color: 'border-sky-500/30 text-sky-300',
          points: [
            tx('chain, islice, groupby, product, combinations', 'chain, islice, groupby, product, combinations'),
            tx('functools.lru_cache — memoización con una línea', 'functools.lru_cache — memoization in one line'),
            tx('functools.partial — funciones con args prefijados', 'functools.partial — functions with preset args'),
            tx('operator.attrgetter/itemgetter para sorted() eficiente', 'operator.attrgetter/itemgetter for efficient sorted()'),
          ],
        },
        {
          title: 'pathlib / subprocess',
          color: 'border-blue-600/30 text-blue-400',
          points: [
            tx('Path("dir") / "file.txt" — rutas OS-agnósticas', 'Path("dir") / "file.txt" — OS-agnostic paths'),
            tx('path.glob("**/*.py") — búsqueda recursiva', 'path.glob("**/*.py") — recursive search'),
            tx('subprocess.run(cmd, capture_output=True, text=True)', 'subprocess.run(cmd, capture_output=True, text=True)'),
            tx('check=True lanza CalledProcessError en fallo', 'check=True raises CalledProcessError on failure'),
          ],
        },
        {
          title: 're — Regex',
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('re.compile(pattern) para reutilizar el regex', 're.compile(pattern) to reuse the regex'),
            tx('re.findall, re.search, re.sub, re.split', 're.findall, re.search, re.sub, re.split'),
            tx('(?P<name>...) para grupos nombrados', '(?P<name>...) for named groups'),
            tx('r"..." raw strings evitan doble escape', 'r"..." raw strings avoid double escaping'),
          ],
        },
        {
          title: 'venv / poetry',
          color: 'border-sky-400/30 text-sky-200',
          points: [
            'python -m venv .venv && source .venv/bin/activate',
            tx('poetry add pandas — gestión de deps + lockfile', 'poetry add pandas — dep management + lockfile'),
            tx('pyproject.toml es el estándar moderno (PEP 517/518)', 'pyproject.toml is the modern standard (PEP 517/518)'),
            tx('pip-tools: pip-compile genera requirements.txt determinista', 'pip-tools: pip-compile generates deterministic requirements.txt'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <h3 className={`font-bold text-sm font-mono ${color.split(' ')[1]} mb-3`}>{title}</h3>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="python" code={`import pandas as pd
import numpy as np

# ── NumPy vectorized operations ───────────────────────────────
arr = np.array([1, 2, 3, 4, 5], dtype=np.float64)
scaled = (arr - arr.mean()) / arr.std()    # z-score normalization

matrix = np.random.rand(1000, 1000)
result = matrix @ matrix.T                 # matrix multiplication (fast)

data = np.arange(20)
even = data[data % 2 == 0]                # boolean indexing → [0, 2, 4, ...]

# ── Pandas data manipulation ──────────────────────────────────
df = pd.read_csv("sales.csv", parse_dates=["date"])

# Filter with query()
recent = df.query("date >= '2025-01-01' and amount > 100")

# GroupBy aggregation
summary = (
    df
    .groupby(["region", "product"])
    .agg(
        total_sales=("amount", "sum"),
        avg_sales=("amount", "mean"),
        count=("amount", "count"),
    )
    .reset_index()
    .sort_values("total_sales", ascending=False)
)

# SQL-style merge
customers = pd.read_csv("customers.csv")
enriched = df.merge(customers, on="customer_id", how="left")

# Vectorized conditional with numpy
df["tier"] = np.where(df["amount"] > 1000, "premium", "standard")

# Pivot table
pivot = df.pivot_table(
    values="amount",
    index="region",
    columns="product",
    aggfunc="sum",
    fill_value=0,
)
print(summary.head(10))`} />

    <CodeBlock language="python" code={`import asyncio
from pathlib import Path
import subprocess
import re

# ── pathlib — OS-agnostic file operations ─────────────────────
base = Path(__file__).parent
data_dir = base / "data"
data_dir.mkdir(exist_ok=True)

py_files = list(base.glob("**/*.py"))
large_files = [f for f in data_dir.glob("**/*") if f.stat().st_size > 1_000_000]

config_text = (base / "config.json").read_text(encoding="utf-8")
(base / "output.txt").write_text("result", encoding="utf-8")

# ── subprocess — run shell commands safely ────────────────────
def run_cmd(cmd: list[str]) -> str:
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        check=True,    # raises CalledProcessError on non-zero exit
    )
    return result.stdout.strip()

git_log = run_cmd(["git", "log", "--oneline", "-5"])
docker_ps = run_cmd(["docker", "ps", "--format", "{{.Names}}"])

# ── re — regex log parsing ────────────────────────────────────
LOG_PATTERN = re.compile(
    r'(?P<timestamp>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) '
    r'(?P<level>ERROR|WARN|INFO) '
    r'(?P<message>.+)'
)

def parse_log_line(line: str) -> dict | None:
    if m := LOG_PATTERN.match(line):
        return m.groupdict()
    return None

# ── Async file processing script ─────────────────────────────
async def process_logs(directory: Path) -> list[dict]:
    results = []
    for path in directory.glob("**/*.log"):
        content = await asyncio.to_thread(path.read_text)
        parsed = [parse_log_line(ln) for ln in content.splitlines()]
        results.extend([r for r in parsed if r and r["level"] == "ERROR"])
    return results

if __name__ == "__main__":
    errors = asyncio.run(process_logs(Path("logs")))
    print(f"Found {len(errors)} errors")`} />
  </div>
);

// ─── Interview Accordion ─────────────────────────────────────────────────────

const InterviewAccordion = ({ tx }) => {
  const [openItems, setOpenItems] = useState({});

  const toggle = (key) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = [
    {
      level: 'Junior',
      color: 'border-blue-600/40 text-blue-400 bg-blue-600/10',
      qs: [
        {
          q: tx('¿Qué es el GIL?', 'What is the GIL?'),
          a: tx(
            'El Global Interpreter Lock es un mutex en CPython que permite que solo un hilo ejecute bytecode Python a la vez. Protege las estructuras internas del intérprete. No afecta operaciones I/O (que liberan el GIL) ni extensiones C. Para CPU-bound paralelo real se usa multiprocessing.',
            'The Global Interpreter Lock is a mutex in CPython that allows only one thread to execute Python bytecode at a time. It protects the interpreter\'s internal data structures. It doesn\'t affect I/O operations (which release the GIL) or C extensions. Use multiprocessing for real CPU-bound parallelism.'
          ),
        },
        {
          q: tx('¿List vs tuple?', 'List vs tuple?'),
          a: tx(
            'List es mutable ([1,2,3]) — se puede modificar. Tuple es inmutable ((1,2,3)) — no cambia tras crearse. Tuple es hashable (puede ser clave de dict), ocupa menos memoria y es ligeramente más rápido de iterar. Usa tuple para datos fijos (coordenadas, registros inmutables).',
            'List is mutable ([1,2,3]) — can be modified. Tuple is immutable ((1,2,3)) — cannot change after creation. Tuple is hashable (can be dict key), uses less memory and iterates slightly faster. Use tuple for fixed data (coordinates, immutable records).'
          ),
        },
        {
          q: tx('¿is vs ==?', 'is vs ==?'),
          a: tx(
            '== compara valor (llama a __eq__). is compara identidad de objeto (mismo id() en memoria). Nunca uses is para comparar valores — solo para None, True, False. Ejemplo: a = [1,2]; b = [1,2]; a == b → True, a is b → False.',
            '== compares value (calls __eq__). is compares object identity (same id() in memory). Never use is to compare values — only for None, True, False. Example: a = [1,2]; b = [1,2]; a == b → True, a is b → False.'
          ),
        },
        {
          q: tx('¿Qué son *args y **kwargs?', 'What are *args and **kwargs?'),
          a: tx(
            '*args captura argumentos posicionales extra como tuple. **kwargs captura argumentos nominales extra como dict. Permiten funciones de aridad variable. Orden en signatura: params normales → *args → keyword-only → **kwargs.',
            '*args captures extra positional arguments as a tuple. **kwargs captures extra keyword arguments as a dict. They allow variadic functions. Signature order: normal params → *args → keyword-only → **kwargs.'
          ),
        },
      ],
    },
    {
      level: 'Mid',
      color: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
      qs: [
        {
          q: tx('¿Generadores vs iteradores?', 'Generators vs iterators?'),
          a: tx(
            'Un iterador implementa __iter__ y __next__. Un generador es una función con yield que crea un iterador automáticamente — es lazy (produce valores bajo demanda) y usa O(1) memoria. Todo generador es un iterador, pero no viceversa. yield from delega en un sub-generador.',
            'An iterator implements __iter__ and __next__. A generator is a function with yield that creates an iterator automatically — it\'s lazy (produces values on demand) and uses O(1) memory. Every generator is an iterator, but not vice versa. yield from delegates to a sub-generator.'
          ),
        },
        {
          q: tx('¿Cómo funcionan los decoradores?', 'How do decorators work?'),
          a: tx(
            '@decorator es azúcar sintáctica para func = decorator(func). Un decorador recibe una función, define un wrapper que la envuelve con lógica adicional, y retorna el wrapper. @functools.wraps preserva __name__ y __doc__. Se apilan en orden de abajo a arriba.',
            '@decorator is syntactic sugar for func = decorator(func). A decorator receives a function, defines a wrapper that wraps it with extra logic, and returns the wrapper. @functools.wraps preserves __name__ and __doc__. They stack bottom to top.'
          ),
        },
        {
          q: tx('¿Qué es el MRO?', 'What is the MRO?'),
          a: tx(
            'Method Resolution Order: el orden en que Python busca métodos en la jerarquía de herencia. CPython usa C3 Linearization. Para Dog(Animal): Dog → Animal → object. Inspeccionar con Dog.__mro__. super() respeta este orden — úsalo siempre en __init__ con herencia múltiple.',
            'Method Resolution Order: the order Python searches for methods in the inheritance hierarchy. CPython uses C3 Linearization. For Dog(Animal): Dog → Animal → object. Inspect with Dog.__mro__. super() respects this order — always use it in __init__ with multiple inheritance.'
          ),
        },
        {
          q: '__slots__?',
          a: tx(
            '__slots__ = ("x", "y") elimina el __dict__ por instancia y reserva espacio fijo para los atributos declarados. Reduce uso de memoria ~30-50% con muchas instancias. También mejora la velocidad de acceso. Limitación: no permite atributos no declarados ni herencia múltiple sin cuidado.',
            '__slots__ = ("x", "y") removes the per-instance __dict__ and reserves fixed space for declared attributes. Reduces memory ~30-50% with many instances. Also improves attribute access speed. Limitation: no undeclared attributes; use care with multiple inheritance.'
          ),
        },
      ],
    },
    {
      level: 'Senior',
      color: 'border-sky-500/40 text-sky-300 bg-sky-500/10',
      qs: [
        {
          q: tx('¿Cómo optimizarías un script Python lento?', 'How would you optimize a slow Python script?'),
          a: tx(
            'Primero profila con cProfile / line_profiler para encontrar el cuello de botella real. Luego: (1) vectoriza con NumPy en lugar de loops, (2) usa generadores para datos grandes, (3) @functools.lru_cache en funciones puras costosas, (4) considera Cython/Numba para loops críticos, (5) multiprocessing si CPU-bound, asyncio si I/O-bound.',
            'First profile with cProfile / line_profiler to find the real bottleneck. Then: (1) vectorize with NumPy instead of loops, (2) use generators for large data, (3) @functools.lru_cache on expensive pure functions, (4) consider Cython/Numba for critical loops, (5) multiprocessing if CPU-bound, asyncio if I/O-bound.'
          ),
        },
        {
          q: tx('Explica el event loop de asyncio', 'Explain asyncio\'s event loop'),
          a: tx(
            'El event loop mantiene una cola de corrutinas listas. Cuando un await libera el control (I/O pendiente), el loop selecciona la siguiente tarea lista. Un selector (epoll/kqueue) notifica cuando el I/O completa y la tarea vuelve a la cola. Un solo hilo maneja miles de conexiones. El GIL no importa aquí porque solo un hilo está activo.',
            'The event loop maintains a queue of ready coroutines. When an await yields control (pending I/O), the loop selects the next ready task. A selector (epoll/kqueue) notifies when I/O completes and the task returns to the ready queue. A single thread handles thousands of connections. The GIL doesn\'t matter here since only one thread is active.'
          ),
        },
        {
          q: tx('¿Multiprocessing vs threading?', 'Multiprocessing vs threading?'),
          a: tx(
            'Threading: hilos comparten memoria, bueno para I/O-bound, el GIL limita el paralelismo CPU real. Multiprocessing: procesos separados con su propio GIL, true parallelism para CPU-bound, overhead de pickling. asyncio supera a threading para I/O altamente concurrente (miles de conexiones) con mucho menos overhead.',
            'Threading: threads share memory, good for I/O-bound, GIL limits real CPU parallelism. Multiprocessing: separate processes with own GIL, true parallelism for CPU-bound, pickling overhead. asyncio beats threading for highly concurrent I/O (thousands of connections) with much less overhead.'
          ),
        },
        {
          q: tx('¿Cómo funciona el garbage collector de CPython?', 'How does CPython\'s garbage collector work?'),
          a: tx(
            'CPython usa reference counting como mecanismo primario: cuando el contador llega a 0, el objeto se libera inmediatamente. El módulo gc maneja ciclos de referencias (A → B → A) con un collector generacional de 3 generaciones. La mayoría de objetos mueren jóvenes (generación 0). gc.disable() puede mejorar rendimiento si no hay ciclos referenciales.',
            'CPython uses reference counting as the primary mechanism: when the count reaches 0, the object is freed immediately. The gc module handles reference cycles (A → B → A) with a generational collector with 3 generations. Most objects die young (generation 0). gc.disable() can improve performance when there are no reference cycles.'
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
          {tx('Preguntas frecuentes de Junior a Senior con respuestas detalladas.', 'Frequent questions from Junior to Senior with detailed answers.')}
        </p>
      </div>

      {categories.map(cat => (
        <div key={cat.level} className="space-y-2">
          <div className={`inline-flex items-center gap-2 px-3 py-1 border rounded-lg text-xs font-bold ${cat.color}`}>
            <HelpCircle className="w-3.5 h-3.5" />
            {cat.level}
          </div>
          <div className="space-y-2">
            {cat.qs.map((item, qi) => {
              const key = `${cat.level}-${qi}`;
              const isOpen = openItems[key];
              return (
                <div key={qi} className="border border-slate-700/50 bg-slate-900/40 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggle(key)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="text-sm font-semibold text-slate-200">{item.q}</span>
                    {isOpen
                      ? <ChevronUp className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    }
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
                        <div className="px-4 pb-4 pt-0 border-t border-slate-800">
                          <p className="text-xs text-slate-300 leading-relaxed mt-3">{item.a}</p>
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

// ─── Main Component ──────────────────────────────────────────────────────────

function PythonPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('fundamentals');

  const sections = [
    {
      id: 'fundamentals',
      title: tx('Fundamentos', 'Fundamentals'),
      subtitle: tx('Tipos, comprehensions, generadores, decoradores', 'Types, comprehensions, generators, decorators'),
    },
    {
      id: 'oop',
      title: 'OOP',
      subtitle: tx('Clases, herencia, dataclasses, protocolos', 'Classes, inheritance, dataclasses, protocols'),
    },
    {
      id: 'async',
      title: tx('Async & Concurrencia', 'Async & Concurrency'),
      subtitle: tx('asyncio, async/await, threading vs multiprocessing', 'asyncio, async/await, threading vs multiprocessing'),
    },
    {
      id: 'web',
      title: 'Web Frameworks',
      subtitle: tx('FastAPI, Django, Flask — cuándo usar cada uno', 'FastAPI, Django, Flask — when to use each'),
    },
    {
      id: 'data',
      title: 'Data & Scripting',
      subtitle: tx('NumPy, Pandas, automatización', 'NumPy, Pandas, automation'),
    },
    {
      id: 'interview',
      title: tx('Entrevista', 'Interview Q&A'),
      subtitle: tx('Junior → Senior preguntas', 'Junior → Senior questions'),
    },
  ];

  const renderContent = () => {
    switch (active) {
      case 'fundamentals': return renderFundamentals(tx);
      case 'oop':          return renderOOP(tx);
      case 'async':        return renderAsync(tx);
      case 'web':          return renderWeb(tx);
      case 'data':         return renderData(tx);
      case 'interview':    return <InterviewAccordion tx={tx} />;
      default:             return renderFundamentals(tx);
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
                  ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
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

export default PythonPro;
