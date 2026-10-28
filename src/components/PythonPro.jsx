import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, GitBranch, Zap, Globe, Database, ArrowRight } from 'lucide-react';
import { SiPython } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import InterviewQA from './languages/InterviewQA';
import WorkNote from './languages/WorkNote';
import { buildPythonInterview } from './languages/python';
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
          'Lo que hace que un código se sienta “pythonic”: comprehensions en vez de bucles largos, generadores para no cargar todo en memoria, decoradores para sumar comportamiento y with para no olvidar cerrar recursos.',
          'What makes code feel “pythonic”: comprehensions instead of long loops, generators so you don’t load everything into memory, decorators to add behavior, and with so you never forget to close resources.'
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
            tx('No importa de qué clase es un objeto, sino qué sabe hacer', 'It doesn’t matter what class an object is, only what it can do'),
            tx('isinstance() solo cuando de verdad haga falta', 'isinstance() only when you really need it'),
            tx('Para tipar ese contrato, Protocol en vez de herencia', 'To type that contract, use Protocol instead of inheritance'),
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
            tx('Entrega valores de a uno, solo cuando se los pides', 'Hands out values one at a time, only when asked'),
            tx('La memoria no crece con el tamaño de los datos', 'Memory doesn’t grow with the size of the data'),
            tx('yield from delega en otro generador', 'yield from delegates to another generator'),
            tx('Ideal para archivos grandes y procesos por etapas', 'Ideal for large files and step-by-step pipelines'),
          ],
        },
        {
          title: tx('Decoradores', 'Decorators'),
          color: 'border-blue-600/30 text-blue-400',
          points: [
            tx('Una función que envuelve a otra para sumarle algo: logs, caché, reintentos', 'A function that wraps another to add something: logging, caching, retries'),
            tx('@functools.wraps conserva el nombre y la documentación de la original', '@functools.wraps keeps the original’s name and docs'),
            tx('Se pueden apilar; el de más abajo se aplica primero', 'They stack; the bottom one is applied first'),
            tx('@decorador es lo mismo que func = decorador(func)', '@decorator is the same as func = decorator(func)'),
          ],
        },
        {
          title: tx('Context Managers', 'Context Managers'),
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('with garantiza que el recurso se cierre, aunque haya una excepción', 'with guarantees the resource gets closed, even on an exception'),
            tx('@contextmanager te deja escribir uno con un simple yield', '@contextmanager lets you write one with a plain yield'),
            tx('Por dentro: __enter__ abre, __exit__ libera', 'Under the hood: __enter__ opens, __exit__ releases'),
            tx('Úsalo con conexiones, locks y archivos temporales', 'Use it for connections, locks and temp files'),
          ],
        },
        {
          title: tx('f-strings y más', 'f-strings & more'),
          color: 'border-sky-400/30 text-sky-200',
          points: [
            tx('f"{name!r}" — repr, f"{pi:.2f}" — formato', 'f"{name!r}" — repr, f"{pi:.2f}" — format'),
            tx('f"{valor = }" imprime nombre y valor, ideal para depurar', 'f"{value = }" prints name and value, great for debugging'),
            tx('*args junta posicionales y **kwargs, nombrados', '*args gathers positional and **kwargs, keyword arguments'),
            tx('El walrus := asigna dentro de una expresión, útil en while e if', 'The walrus := assigns inside an expression, handy in while and if'),
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

    <WorkNote tx={tx} accent="blue">
      {tx(
        'Los generadores y los context managers son lo que más uso en scripts de Python: leer archivos grandes por partes y asegurar que todo se cierre, aunque algo falle a mitad de camino.',
        'Generators and context managers are what I use most in Python scripts: reading large files in chunks and making sure everything gets closed, even if something fails halfway.'
      )}
    </WorkNote>
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
          'Python tiene clases como Java, pero con otra filosofía: menos ceremonia, dataclasses en vez de getters y setters, y contratos por forma (Protocol) más que por herencia.',
          'Python has classes like Java, but a different philosophy: less ceremony, dataclasses instead of getters and setters, and contracts by shape (Protocol) more than by inheritance.'
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
            tx('__repr__: lo que ves al depurar; que no sea ambiguo', '__repr__: what you see when debugging; keep it unambiguous'),
            tx('__str__: la versión legible para personas', '__str__: the human-readable version'),
            tx('__eq__ y __hash__: siempre juntos, como equals y hashCode en Java', '__eq__ and __hash__: always together, like equals and hashCode in Java'),
            tx('__len__, __iter__, __getitem__: tu objeto se comporta como una lista', '__len__, __iter__, __getitem__: your object behaves like a list'),
            tx('__enter__ y __exit__: tu objeto funciona con with', '__enter__ and __exit__: your object works with with'),
          ],
        },
        {
          title: '@property / @classmethod / @staticmethod',
          color: 'border-blue-400/30 text-blue-200',
          points: [
            tx('@property: un método que se lee como atributo, sin ()', '@property: a method you read like an attribute, no ()'),
            tx('Su setter es el lugar para validar al asignar', 'Its setter is where you validate on assignment'),
            tx('@classmethod recibe la clase: perfecto para constructores alternativos', '@classmethod receives the class: perfect for alternate constructors'),
            tx('@staticmethod no recibe nada: una utilidad que vive en la clase', '@staticmethod receives nothing: a utility living in the class'),
          ],
        },
        {
          title: '@dataclass',
          color: 'border-sky-500/30 text-sky-300',
          points: [
            tx('Te genera __init__, __repr__ y __eq__: el record de Python', 'Generates __init__, __repr__ and __eq__: Python’s record'),
            tx('frozen=True la vuelve inmutable y usable como clave', 'frozen=True makes it immutable and usable as a key'),
            tx('Para listas o dicts por defecto: field(default_factory=list)', 'For default lists or dicts: field(default_factory=list)'),
            tx('Desde 3.10, slots=True ahorra memoria', 'Since 3.10, slots=True saves memory'),
          ],
        },
        {
          title: 'ABC / Protocol',
          color: 'border-blue-600/30 text-blue-400',
          points: [
            tx('ABC con @abstractmethod obliga a las subclases a implementar', 'ABC with @abstractmethod forces subclasses to implement'),
            tx('Protocol describe un contrato sin herencia, como las interfaces de TypeScript', 'Protocol describes a contract without inheritance, like TypeScript interfaces'),
            tx('Con @runtime_checkable también funciona isinstance()', 'With @runtime_checkable, isinstance() works too'),
            tx('Prefiero Protocol: acopla menos', 'I prefer Protocol: it couples less'),
          ],
        },
        {
          title: tx('Herencia múltiple & MRO', 'Multiple Inheritance & MRO'),
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('Python calcula el orden de búsqueda de métodos con el algoritmo C3', 'Python computes the method lookup order with the C3 algorithm'),
            tx('super() sigue ese orden: úsalo siempre en vez de nombrar al padre', 'super() follows that order: always use it instead of naming the parent'),
            tx('Un mixin es una clase chica, sin estado, que suma comportamiento', 'A mixin is a small stateless class that adds behavior'),
            tx('Clase.__mro__ te muestra el orden', 'Class.__mro__ shows you the order'),
          ],
        },
        {
          title: '__slots__',
          color: 'border-sky-400/30 text-sky-200',
          points: [
            tx('Declara los atributos de antemano y quita el __dict__ de cada instancia', 'Declares attributes up front and drops each instance’s __dict__'),
            tx('Se nota cuando tienes cientos de miles de objetos', 'It pays off when you have hundreds of thousands of objects'),
            tx('El acceso a atributos también es algo más rápido', 'Attribute access gets a bit faster too'),
            tx('A cambio, no puedes agregar atributos al vuelo', 'In exchange, you can’t add attributes on the fly'),
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

    <WorkNote tx={tx} accent="blue">
      {tx(
        'Viniendo de Java, la mayor diferencia es soltar la ceremonia: una @dataclass reemplaza a un DTO con getters y setters, y Protocol cumple el papel de una interfaz sin obligar a heredar.',
        'Coming from Java, the biggest shift is dropping the ceremony: a @dataclass replaces a DTO with getters and setters, and Protocol plays the role of an interface without forcing inheritance.'
      )}
    </WorkNote>
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
          'Hay tres formas de hacer varias cosas a la vez y la elección depende de una sola pregunta: ¿tu programa espera (I/O) o calcula (CPU)? Para esperar, asyncio o hilos; para calcular, procesos.',
          'There are three ways to do several things at once, and the choice comes down to one question: does your program wait (I/O) or compute (CPU)? For waiting, asyncio or threads; for computing, processes.'
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
            tx('async def define una corrutina: una función que se puede pausar', 'async def defines a coroutine: a function that can pause'),
            tx('En cada await, el event loop atiende otra cosa mientras llega la respuesta', 'At each await, the event loop serves something else while the response arrives'),
            tx('await solo vale dentro de una función async', 'await only works inside an async function'),
            tx('asyncio.run() es la puerta de entrada desde código normal', 'asyncio.run() is the entry point from regular code'),
          ],
        },
        {
          title: 'gather vs create_task',
          color: 'border-blue-400/30 text-blue-200',
          points: [
            tx('gather() corre varias corrutinas a la vez (concurrencia, no paralelismo)', 'gather() runs several coroutines at once (concurrency, not parallelism)'),
            tx('Con return_exceptions=True devuelve los errores como resultados en vez de lanzar el primero', 'With return_exceptions=True it returns errors as results instead of raising the first one'),
            tx('create_task() la deja corriendo en segundo plano y sigues', 'create_task() leaves it running in the background while you continue'),
            tx('Desde 3.11, TaskGroup: si una falla, cancela las demás. Es lo que uso hoy', 'Since 3.11, TaskGroup: if one fails, it cancels the rest. It’s what I use today'),
          ],
        },
        {
          title: 'aiohttp',
          color: 'border-sky-500/30 text-sky-300',
          points: [
            tx('Cliente HTTP que no bloquea el event loop (requests sí lo bloquea)', 'HTTP client that doesn’t block the event loop (requests does)'),
            tx('Crea una ClientSession y reúsala: mantiene un pool de conexiones', 'Create one ClientSession and reuse it: it keeps a connection pool'),
            tx('timeout=aiohttp.ClientTimeout(total=10)', 'timeout=aiohttp.ClientTimeout(total=10)'),
            tx('También maneja WebSockets', 'It handles WebSockets too'),
          ],
        },
        {
          title: tx('Threading — GIL', 'Threading — GIL'),
          color: 'border-blue-600/30 text-blue-400',
          points: [
            tx('Por el GIL, solo un hilo ejecuta Python a la vez', 'Because of the GIL, only one thread runs Python at a time'),
            tx('Aun así sirve para I/O: mientras un hilo espera, el GIL se libera', 'Still useful for I/O: while a thread waits, the GIL is released'),
            tx('threading.Thread, ThreadPoolExecutor', 'threading.Thread, ThreadPoolExecutor'),
            tx('Lock, Event y Queue para coordinar hilos', 'Lock, Event and Queue to coordinate threads'),
          ],
        },
        {
          title: tx('Multiprocessing — CPU-bound', 'Multiprocessing — CPU-bound'),
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('Procesos separados, cada uno con su GIL: paralelismo real', 'Separate processes, each with its own GIL: real parallelism'),
            tx('Para trabajo de CPU: cálculos, compresión, parseo pesado', 'For CPU work: calculations, compression, heavy parsing'),
            tx('ProcessPoolExecutor con concurrent.futures', 'ProcessPoolExecutor with concurrent.futures'),
            tx('Los datos viajan entre procesos con pickle: pasa solo lo necesario', 'Data travels between processes via pickle: send only what’s needed'),
          ],
        },
        {
          title: 'concurrent.futures',
          color: 'border-sky-400/30 text-sky-200',
          points: [
            tx('La misma API para hilos y procesos: cambias el executor y listo', 'The same API for threads and processes: swap the executor and you’re done'),
            tx('executor.map() es un for que corre en paralelo', 'executor.map() is a for loop that runs in parallel'),
            tx('as_completed() te da cada resultado apenas termina', 'as_completed() hands you each result as soon as it’s done'),
            tx('submit() devuelve un Future; .result() espera', 'submit() returns a Future; .result() waits'),
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

    <WorkNote tx={tx} accent="blue">
      {tx(
        'En las Lambdas de AgentCloud casi todo era I/O (S3, SQS), así que la regla era la de siempre: no bloquear mientras esperas. Es el mismo principio que aplico con WebFlux en Java.',
        'In AgentCloud’s Lambdas almost everything was I/O (S3, SQS), so the rule was the usual one: don’t block while you wait. It’s the same principle I apply with WebFlux in Java.'
      )}
    </WorkNote>
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
          'Los tres frameworks más usados para servir HTTP en Python. La pregunta típica de entrevista no es cómo se usan, sino cuál elegirías y por qué.',
          'The three most used frameworks for serving HTTP in Python. The typical interview question isn’t how to use them, but which you’d pick and why.'
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
            tx('Async nativo y muy rápido', 'Native async and very fast'),
            tx('Los type hints validan el request solos, vía Pydantic', 'Type hints validate the request on their own, via Pydantic'),
            tx('Swagger se genera solo en /docs', 'Swagger is generated for you at /docs'),
            tx('Depends() da inyección de dependencias, parecido a Spring', 'Depends() gives dependency injection, similar to Spring'),
            tx('Mi elección para una API o microservicio nuevo', 'My pick for a new API or microservice'),
          ],
        },
        {
          title: 'Django',
          color: 'border-sky-500/30 text-sky-300',
          bg: 'bg-sky-500/5',
          points: [
            tx('Trae de todo: ORM, admin, autenticación', 'Comes with everything: ORM, admin, auth'),
            tx('Con Django REST Framework haces APIs completas', 'With Django REST Framework you build full APIs'),
            tx('Genera las migraciones a partir de los modelos', 'Generates migrations from your models'),
            tx('Y un panel de administración gratis', 'And a free admin panel'),
            tx('Para aplicaciones completas donde todo eso te ahorra semanas', 'For full applications where all that saves you weeks'),
          ],
        },
        {
          title: 'Flask',
          color: 'border-blue-400/30 text-blue-200',
          bg: 'bg-blue-400/5',
          points: [
            tx('Mínimo: rutas y poco más, el resto lo eliges tú', 'Minimal: routes and little else, you pick the rest'),
            tx('Libertad total, y también toda la responsabilidad', 'Total freedom, and all the responsibility too'),
            tx('Blueprints para separar rutas por módulo', 'Blueprints to split routes by module'),
            tx('Base de datos y login llegan como extensiones', 'Database and login come as extensions'),
            tx('Bueno para prototipos y servicios chicos', 'Good for prototypes and small services'),
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

    <WorkNote tx={tx} accent="blue">
      {tx(
        'Mi Python en producción fue serverless y herramientas internas, no APIs web grandes. Si hoy tuviera que hacer una API en Python, elegiría FastAPI: tipos, validación e inyección de dependencias se sienten muy cercanos a Spring.',
        'My production Python was serverless and internal tools, not large web APIs. If I had to build a Python API today, I’d pick FastAPI: types, validation and dependency injection feel very close to Spring.'
      )}
    </WorkNote>
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
          'Donde Python brilla: procesar datos y automatizar tareas con muy poco código. NumPy y Pandas para datos; pathlib, subprocess y re para scripts del día a día.',
          'Where Python shines: processing data and automating tasks with very little code. NumPy and Pandas for data; pathlib, subprocess and re for everyday scripts.'
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
            tx('Operas sobre arreglos enteros sin escribir un for', 'You operate on whole arrays without writing a for'),
            tx('Broadcasting combina arreglos de distinta forma', 'Broadcasting combines arrays of different shapes'),
            tx('np.where, np.argmax, np.sort, np.unique', 'np.where, np.argmax, np.sort, np.unique'),
            tx('float32 en vez de float64 usa la mitad de memoria', 'float32 instead of float64 uses half the memory'),
          ],
        },
        {
          title: 'Pandas',
          color: 'border-blue-400/30 text-blue-200',
          points: [
            tx('Un DataFrame es una tabla con tipo por columna', 'A DataFrame is a table with a type per column'),
            tx('groupby().agg() es un GROUP BY de SQL en una línea', 'groupby().agg() is a SQL GROUP BY in one line'),
            tx('merge() es un JOIN entre tablas', 'merge() is a JOIN between tables'),
            tx('query(), loc e iloc para filtrar', 'query(), loc and iloc to filter'),
          ],
        },
        {
          title: 'itertools / functools',
          color: 'border-sky-500/30 text-sky-300',
          points: [
            tx('chain, islice, groupby, product, combinations', 'chain, islice, groupby, product, combinations'),
            tx('lru_cache: memoización en una línea', 'lru_cache: memoization in one line'),
            tx('partial: una función con algunos argumentos ya puestos', 'partial: a function with some arguments pre-filled'),
            tx('attrgetter e itemgetter como clave de sorted()', 'attrgetter and itemgetter as sorted() keys'),
          ],
        },
        {
          title: 'pathlib / subprocess',
          color: 'border-blue-600/30 text-blue-400',
          points: [
            tx('Path("dir") / "archivo.txt" arma rutas que funcionan en cualquier sistema', 'Path("dir") / "file.txt" builds paths that work on any OS'),
            tx('glob("**/*.py") busca en todas las subcarpetas', 'glob("**/*.py") searches every subfolder'),
            tx('subprocess.run(cmd, capture_output=True, text=True)', 'subprocess.run(cmd, capture_output=True, text=True)'),
            tx('Con check=True, si el comando falla, lanza una excepción en vez de seguir callado', 'With check=True, a failing command raises instead of failing silently'),
          ],
        },
        {
          title: 're — Regex',
          color: 'border-blue-500/30 text-blue-300',
          points: [
            tx('Compila el patrón una vez si lo vas a reutilizar', 'Compile the pattern once if you’ll reuse it'),
            tx('re.findall, re.search, re.sub, re.split', 're.findall, re.search, re.sub, re.split'),
            tx('(?P<nombre>...) le pone nombre a un grupo', '(?P<name>...) names a group'),
            tx('r"..." evita escapar cada barra invertida', 'r"..." saves you from escaping every backslash'),
          ],
        },
        {
          title: 'venv / poetry',
          color: 'border-sky-400/30 text-sky-200',
          points: [
            'python -m venv .venv && source .venv/bin/activate',
            tx('poetry o uv manejan dependencias con lockfile', 'poetry or uv manage dependencies with a lockfile'),
            tx('pyproject.toml es el estándar actual para configurar el proyecto', 'pyproject.toml is today’s standard for project config'),
            tx('Si usas pip, fija versiones con pip-compile', 'If you use pip, pin versions with pip-compile'),
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

    <WorkNote tx={tx} accent="blue">
      {tx(
        'Para automatizar tareas de operación, como procesar archivos o llamar herramientas de línea de comandos, pathlib y subprocess con check=True son lo primero que uso: rutas que funcionan en cualquier sistema y errores que no pasan en silencio.',
        'To automate operational tasks, like processing files or calling command-line tools, pathlib and subprocess with check=True are the first things I reach for: paths that work on any OS and errors that don’t pass silently.'
      )}
    </WorkNote>
  </div>
);

// ─── Interview Accordion ─────────────────────────────────────────────────────

const InterviewAccordion = ({ tx }) => (
  <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Preguntas de Entrevista', 'Interview Q&A')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Respuestas cortas, como las diría en una entrevista, agrupadas por nivel.', 'Short answers, the way I would say them in an interview, grouped by level.')}
        </p>
      </div>
    <InterviewQA groups={buildPythonInterview(tx)} tx={tx} accent="blue" />
  </div>
);

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
