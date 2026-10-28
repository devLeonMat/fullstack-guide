import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Puzzle, MessageCircleQuestion, Zap, GitBranch, Star } from 'lucide-react';
import { SiReact } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import Tabs from './solid/Tabs';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

// ─── Virtual DOM Diagram ─────────────────────────────────────────────────────────

const VirtualDOMDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0); // 0=old, 1=diff, 2=update

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 3), 2500);
    return () => clearInterval(id);
  }, []);

  const oldTree = [
    { label: '<div>', depth: 0, changed: false },
    { label: '<h1> Count: 0', depth: 1, changed: true },
    { label: '<button>', depth: 1, changed: false },
  ];

  const newTree = [
    { label: '<div>', depth: 0, changed: false },
    { label: '<h1> Count: 1', depth: 1, changed: true },
    { label: '<button>', depth: 1, changed: false },
  ];

  const phaseLabel = [
    tx('Virtual DOM anterior', 'Previous Virtual DOM'),
    tx('Diff — nodo cambiado', 'Diff — changed node'),
    tx('DOM real actualizado', 'Real DOM updated'),
  ];

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-cyan-300 uppercase tracking-wider">
        {phaseLabel[phase]}
      </p>
      <div className="grid grid-cols-3 gap-2 items-start">
        {/* Old VDOM */}
        <div className="space-y-1.5">
          <p className="text-xs text-slate-500 font-semibold text-center mb-1">{tx('Viejo', 'Old')}</p>
          {oldTree.map((node, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: phase === 1 && node.changed ? 0.4 : 1,
                backgroundColor: phase === 1 && node.changed ? 'rgba(234,179,8,0.12)' : 'transparent',
              }}
              transition={{ duration: 0.4 }}
              className={`border rounded-lg px-2 py-1 text-xs font-mono font-semibold
                ${node.changed
                  ? phase === 1 ? 'border-yellow-500/60 text-yellow-300' : 'border-cyan-500/40 text-cyan-300'
                  : 'border-slate-700/60 text-slate-400'}`}
              style={{ marginLeft: `${node.depth * 12}px` }}
            >
              {node.label}
            </motion.div>
          ))}
        </div>

        {/* Arrow + label */}
        <div className="flex flex-col items-center justify-center pt-8 gap-1">
          <motion.div
            animate={{ opacity: phase === 2 ? 1 : 0.25, scale: phase === 2 ? 1.15 : 1 }}
            transition={{ duration: 0.4 }}
            className="text-cyan-400 text-xl font-bold"
          >
            →
          </motion.div>
          <span className="text-xs text-slate-500">{tx('solo el diff', 'only the diff')}</span>
        </div>

        {/* New VDOM / DOM */}
        <div className="space-y-1.5">
          <p className="text-xs text-slate-500 font-semibold text-center mb-1">
            {phase === 2 ? tx('DOM Real', 'Real DOM') : tx('Nuevo', 'New')}
          </p>
          {newTree.map((node, i) => (
            <motion.div
              key={i}
              animate={{
                backgroundColor: phase >= 1 && node.changed
                  ? phase === 2 ? 'rgba(6,182,212,0.12)' : 'rgba(234,179,8,0.10)'
                  : 'transparent',
              }}
              transition={{ duration: 0.4 }}
              className={`border rounded-lg px-2 py-1 text-xs font-mono font-semibold
                ${node.changed
                  ? phase === 2 ? 'border-cyan-400/70 text-cyan-200' : 'border-yellow-500/60 text-yellow-300'
                  : 'border-slate-700/60 text-slate-400'}`}
              style={{ marginLeft: `${node.depth * 12}px` }}
            >
              {node.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Phase indicator dots */}
      <div className="flex justify-center gap-2 pt-1">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ scale: phase === i ? 1.4 : 1, opacity: phase === i ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="w-2 h-2 rounded-full bg-cyan-400"
          />
        ))}
      </div>
    </div>
  );
};

// ─── Hooks Flow Diagram ──────────────────────────────────────────────────────────

const HooksFlowDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: tx('Mount', 'Mount'), sub: 'render()', color: 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10' },
    { label: 'useEffect', sub: tx('se ejecuta', 'runs'), color: 'border-teal-500/50 text-teal-300 bg-teal-500/10' },
    { label: tx('State change', 'State change'), sub: 'setState()', color: 'border-yellow-500/50 text-yellow-300 bg-yellow-500/10' },
    { label: tx('Re-render', 'Re-render'), sub: tx('nuevo VDOM', 'new VDOM'), color: 'border-blue-500/50 text-blue-300 bg-blue-500/10' },
    { label: tx('Cleanup', 'Cleanup'), sub: 'return () => {}', color: 'border-orange-500/50 text-orange-300 bg-orange-500/10' },
    { label: tx('Unmount', 'Unmount'), sub: tx('componente destruido', 'component destroyed'), color: 'border-red-500/50 text-red-300 bg-red-500/10' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-3">
        {tx('Ciclo de vida de componente con hooks', 'Component lifecycle with hooks')}
      </p>
      <div className="flex flex-wrap items-center gap-1.5 justify-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <motion.div
              animate={{
                boxShadow: activeStep === i ? '0 0 18px rgba(6,182,212,0.55)' : '0 0 0px transparent',
                scale: activeStep === i ? 1.08 : 1,
              }}
              transition={{ duration: 0.35 }}
              className={`flex flex-col items-center border rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${step.color} ${activeStep === i ? 'opacity-100' : 'opacity-40'}`}
            >
              <span>{step.label}</span>
              <span className="text-slate-400 text-xs font-normal">{step.sub}</span>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                animate={{ opacity: activeStep === i ? 1 : 0.25 }}
                transition={{ duration: 0.35 }}
                className="text-cyan-500/70 text-sm"
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

// ─── Performance Diagram ─────────────────────────────────────────────────────────

const PerformanceDiagram = ({ tx }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {tx('Re-render tree — impacto de React.memo', 'Re-render tree — React.memo impact')}
      </p>
      <div className="flex flex-col items-center gap-3">
        {/* Parent */}
        <motion.div
          animate={{ boxShadow: pulse ? '0 0 20px rgba(234,179,8,0.5)' : '0 0 6px rgba(234,179,8,0.2)' }}
          transition={{ duration: 0.5 }}
          className="border border-yellow-500/60 bg-yellow-500/10 text-yellow-300 rounded-xl px-6 py-2 text-sm font-bold"
        >
          {tx('Padre', 'Parent')} — {tx('re-renderiza', 're-renders')}
        </motion.div>
        {/* Arrow */}
        <div className="flex gap-8">
          <div className="flex flex-col items-center gap-1">
            <span className="text-slate-500 text-lg">↙</span>
            {/* Child A — memo */}
            <motion.div
              animate={{ opacity: pulse ? 0.5 : 1 }}
              transition={{ duration: 0.5 }}
              className="border border-green-500/60 bg-green-500/10 text-green-300 rounded-xl px-4 py-2 text-xs font-bold text-center"
            >
              <div>Child A</div>
              <div className="text-green-400/60 font-normal">React.memo</div>
              <div className="text-xs text-green-400 mt-0.5">{tx('NO re-renderiza', 'NO re-render')}</div>
            </motion.div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-slate-500 text-lg">↘</span>
            {/* Child B — no memo */}
            <motion.div
              animate={{ boxShadow: pulse ? '0 0 16px rgba(239,68,68,0.5)' : '0 0 0px transparent' }}
              transition={{ duration: 0.5 }}
              className="border border-red-500/60 bg-red-500/10 text-red-300 rounded-xl px-4 py-2 text-xs font-bold text-center"
            >
              <div>Child B</div>
              <div className="text-red-400/60 font-normal">{tx('sin memo', 'no memo')}</div>
              <div className="text-xs text-red-400 mt-0.5">{tx('re-renderiza', 're-renders')}</div>
            </motion.div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 pt-1">
        {tx('Pulso = re-render del padre disparado', 'Pulse = parent re-render triggered')}
      </p>
    </div>
  );
};

// ─── Patterns Diagram ────────────────────────────────────────────────────────────

const PatternsDiagram = ({ tx }) => {
  const [active, setActive] = useState(0);

  const patterns = [
    {
      name: 'Compound Components',
      color: 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10',
      mini: ['<Select>', '  <Option />', '  <Option />', '</Select>'],
    },
    {
      name: 'Render Props',
      color: 'border-blue-500/50 text-blue-300 bg-blue-500/10',
      mini: ['<Mouse', '  render={pos =>', '    <Cat {...pos} />', '} />'],
    },
    {
      name: 'Custom Hooks',
      color: 'border-teal-500/50 text-teal-300 bg-teal-500/10',
      mini: ['function useFetch(url)', '  const [data]…', '  return { data,', '    loading }'],
    },
    {
      name: 'HOC',
      color: 'border-purple-500/50 text-purple-300 bg-purple-500/10',
      mini: ['withAuth(', '  ProfilePage', ')', '→ AuthProfile'],
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % patterns.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {tx('Patrones avanzados de React', 'Advanced React patterns')}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {patterns.map((p, i) => (
          <motion.div
            key={i}
            animate={{
              boxShadow: active === i ? '0 0 16px rgba(6,182,212,0.4)' : '0 0 0px transparent',
              scale: active === i ? 1.04 : 1,
            }}
            transition={{ duration: 0.35 }}
            className={`border rounded-xl p-2.5 transition-all ${p.color} ${active === i ? 'opacity-100' : 'opacity-40'}`}
          >
            <div className="font-bold text-xs mb-2">{p.name}</div>
            <div className="font-mono text-xs space-y-0.5">
              {p.mini.map((line, li) => (
                <div key={li} className="text-slate-400 leading-tight">{line}</div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── React 19 Timeline Diagram ───────────────────────────────────────────────────

const React19Diagram = ({ tx }) => {
  const [activeVer, setActiveVer] = useState(0);

  const versions = [
    { ver: 'React 16', year: '2017', label: tx('Fiber + Error Boundaries', 'Fiber + Error Boundaries'), color: 'border-purple-500/50 text-purple-300 bg-purple-500/10' },
    { ver: 'React 16.8', year: '2019', label: 'Hooks', color: 'border-blue-500/50 text-blue-300 bg-blue-500/10' },
    { ver: 'React 18', year: '2022', label: tx('Concurrent Mode', 'Concurrent Mode'), color: 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10' },
    { ver: 'React 19', year: '2024', label: tx('Server Components', 'Server Components'), color: 'border-teal-500/50 text-teal-300 bg-teal-500/10' },
    { ver: 'React 19.2', year: '2025', label: tx('Activity, useEffectEvent', 'Activity, useEffectEvent'), color: 'border-blue-500/50 text-blue-300 bg-blue-500/10' },
    { ver: 'React 19.3', year: '2026', label: tx('View Transitions estables', 'Stable View Transitions'), color: 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveVer(v => (v + 1) % versions.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {tx('Evolución de React', 'React evolution timeline')}
      </p>
      <div className="flex flex-wrap items-center gap-2 justify-center">
        {versions.map((v, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              animate={{
                boxShadow: activeVer === i ? '0 0 20px rgba(6,182,212,0.5)' : '0 0 0px transparent',
                scale: activeVer === i ? 1.08 : 1,
              }}
              transition={{ duration: 0.4 }}
              className={`border rounded-xl px-3 py-2 text-xs font-bold transition-all ${v.color} ${activeVer === i ? 'opacity-100' : 'opacity-35'}`}
            >
              <div>{v.ver}</div>
              <div className="text-slate-500 font-normal text-xs">{v.year}</div>
              <div className="mt-0.5">{v.label}</div>
            </motion.div>
            {i < versions.length - 1 && (
              <motion.span
                animate={{ opacity: activeVer === i ? 1 : 0.2 }}
                className="text-cyan-500/70 text-base"
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

// ─── Section renderers ───────────────────────────────────────────────────────────

const renderCore = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-cyan-400 mb-1">
        {tx('Conceptos Core', 'Core Concepts')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx('Virtual DOM, JSX, props y state — los pilares de React.', 'Virtual DOM, JSX, props and state — the pillars of React.')}
      </p>
    </div>

    <VirtualDOMDiagram tx={tx} />

    {[
      {
        topic: 'Virtual DOM',
        desc: tx('Representación en memoria del DOM real', 'In-memory representation of the real DOM'),
        explanation: tx(
          'React crea una copia virtual del DOM. Cuando el estado cambia, compara el Virtual DOM con el anterior (diffing) y actualiza solo lo necesario en el DOM real (reconciliation).',
          'React creates a virtual copy of the DOM. When state changes, it compares the new Virtual DOM with the previous one (diffing) and only updates what changed in the real DOM (reconciliation).'
        ),
        code: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
  // Solo el texto del h1 se actualiza en el DOM real
}`,
        points: [
          tx('Diffing Algorithm: compara árboles en O(n)', 'Diffing Algorithm: compares trees in O(n)'),
          tx('Reconciliation: actualiza solo los cambios', 'Reconciliation: only updates what changed'),
          tx('Batch Updates: agrupa múltiples setState', 'Batch Updates: groups multiple setStates'),
          tx('Keys: identifican elementos en listas', 'Keys: identify list elements'),
        ],
      },
      {
        topic: 'JSX',
        desc: tx('Sintaxis de extensión de JavaScript', 'JavaScript syntax extension'),
        explanation: tx(
          'JSX es azúcar sintáctico para React.createElement(). Permite escribir HTML en JavaScript con toda la potencia de JS.',
          'JSX is syntactic sugar for React.createElement(). It lets you write HTML inside JavaScript with full JS power.'
        ),
        code: `// JSX
const element = <h1 className="title">Hello, {name}</h1>;

// Se compila a:
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello, ', name
);

// Expresiones JavaScript
return (
  <div>
    {user.age >= 18 ? <p>Adult</p> : <p>Minor</p>}
    {items.map(item => <Item key={item.id} {...item} />)}
  </div>
);`,
        points: [
          tx('className en lugar de class', 'className instead of class'),
          tx('Expresiones JS entre llaves {}', 'JS expressions inside {}'),
          tx('Componentes en PascalCase', 'Components in PascalCase'),
          tx('Fragmentos <></> evitan divs innecesarios', 'Fragments <></> avoid unnecessary divs'),
        ],
      },
      {
        topic: tx('Props vs State', 'Props vs State'),
        desc: tx('Datos inmutables vs mutables', 'Immutable vs mutable data'),
        explanation: tx(
          'Props son argumentos del padre (inmutables). State es data interna del componente (mutable con setState).',
          'Props are parent arguments (immutable). State is internal component data (mutable via setState).'
        ),
        code: `// Props (inmutables, vienen del padre)
function Greeting({ name, age }) {
  return <h1>Hello {name}, you are {age}</h1>;
}
<Greeting name="Juan" age={30} />

// State (mutable, interno del componente)
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`,
        points: [
          tx('Props: read-only, vienen del padre', 'Props: read-only, come from parent'),
          tx('State: local, cambia con setState', 'State: local, changes with setState'),
          'UI = f(props, state)',
          tx('Lifting state: mover al ancestro común', 'Lifting state: move to common ancestor'),
        ],
      },
      {
        topic: tx('Flujo Unidireccional', 'Unidirectional Data Flow'),
        desc: tx('Datos de arriba hacia abajo', 'Data flows top-down'),
        explanation: tx(
          'Los datos fluyen del padre al hijo mediante props. Los hijos notifican cambios al padre mediante callbacks.',
          'Data flows from parent to child via props. Children notify parents of changes via callbacks.'
        ),
        code: `function Parent() {
  const [data, setData] = useState('');

  return <Child data={data} onChange={setData} />;
}

function Child({ data, onChange }) {
  return (
    <input value={data} onChange={e => onChange(e.target.value)} />
  );
}`,
        points: [
          tx('Props fluyen hacia abajo (top-down)', 'Props flow downward (top-down)'),
          tx('Eventos fluyen hacia arriba (callbacks)', 'Events flow upward (callbacks)'),
          tx('Single source of truth', 'Single source of truth'),
          tx('Predecible y fácil de debuggear', 'Predictable and easy to debug'),
        ],
      },
    ].map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: idx * 0.05 }}
        className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-5"
      >
        <div className="flex items-start gap-3 mb-3">
          <SiReact className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-cyan-400">{item.topic}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
        </div>
        {item.explanation && <p className="text-slate-300 mb-4 leading-relaxed text-sm">{item.explanation}</p>}
        <div className="mb-4">
          <CodeBlock code={item.code} language="javascript" />
        </div>
        <ul className="space-y-1.5">
          {item.points.map((pt, pi) => (
            <li key={pi} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-cyan-400 flex-shrink-0">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

const renderHooks = (tx, expandedFundamentals, toggleFundamental) => {
  const hooks = [
    {
      topic: 'useState',
      desc: tx('Estado local en componentes funcionales', 'Local state in functional components'),
      code: `function Form() {
  const [name, setName] = useState('');

  // Actualización funcional (cuando depende del valor anterior)
  const [count, setCount] = useState(0);
  const increment = () => setCount(prev => prev + 1);

  // Lazy initialization (costoso solo primera vez)
  const [data] = useState(() => expensiveComputation());

  return <input value={name} onChange={e => setName(e.target.value)} />;
}`,
      points: [
        tx('Retorna [valor, setter]', 'Returns [value, setter]'),
        tx('Setter puede recibir función updater', 'Setter can receive updater function'),
        tx('Lazy initialization con función', 'Lazy initialization with a function'),
        tx('Múltiples useState en un componente', 'Multiple useState in one component'),
      ],
    },
    {
      topic: 'useEffect',
      desc: tx('Efectos secundarios y sincronización', 'Side effects and synchronization'),
      code: `function Profile({ userId }) {
  const [user, setUser] = useState(null);

  // Solo en mount
  useEffect(() => {
    console.log('mounted');
  }, []);

  // Cuando userId cambia
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  // Con cleanup
  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer); // cleanup!
  }, []);
}`,
      points: [
        tx('Ejecuta después del render', 'Runs after render'),
        tx('[] vacío = solo en mount', '[] empty = only on mount'),
        tx('Return function = cleanup', 'Return function = cleanup'),
        tx('No usar para lógica sincrónica', "Don't use for synchronous logic"),
      ],
    },
    {
      topic: 'useMemo',
      desc: tx('Memoización de valores calculados', 'Memoize computed values'),
      code: `function ExpensiveComponent({ items, filter }) {
  // Solo recalcula si items o filter cambian
  const filtered = useMemo(() => {
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return <List items={filtered} total={total} />;
}`,
      points: [
        tx('Cachea valores calculados', 'Caches computed values'),
        tx('Solo recalcula si dependencies cambian', 'Only recalculates if deps change'),
        tx('Optimización de performance', 'Performance optimization'),
        tx('No abuses: tiene su costo', "Don't overuse: it has a cost"),
      ],
    },
    {
      topic: 'useCallback',
      desc: tx('Memoización de funciones', 'Memoize functions'),
      code: `function Parent() {
  const [count, setCount] = useState(0);

  // Misma referencia entre renders
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // [] = nunca cambia

  return <Child onClick={increment} />;
}

const Child = React.memo(({ onClick }) => (
  <button onClick={onClick}>Click</button>
));`,
      points: [
        tx('Cachea funciones entre renders', 'Caches functions between renders'),
        tx('Útil para React.memo y useEffect deps', 'Useful for React.memo and useEffect deps'),
        tx('Evita re-renders innecesarios', 'Avoids unnecessary re-renders'),
        'useCallback(fn, deps) = useMemo(() => fn, deps)',
      ],
    },
    {
      topic: 'useContext',
      desc: tx('Acceso a Context sin prop drilling', 'Access Context without prop drilling'),
      code: `const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
      Toggle {theme}
    </button>
  );
}`,
      points: [
        tx('Evita prop drilling', 'Avoids prop drilling'),
        tx('Acceso directo a valores del contexto', 'Direct access to context values'),
        tx('Re-render cuando contexto cambia', 'Re-renders when context changes'),
        tx('Combina múltiples contexts', 'Combine multiple contexts'),
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-cyan-400 mb-1">
          {tx('Dominio de Hooks', 'Hooks Mastery')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Domina los hooks de React — el ciclo de vida moderno.', 'Master React hooks — the modern lifecycle.')}
        </p>
      </div>

      <HooksFlowDiagram tx={tx} />

      <div className="space-y-3">
        {hooks.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.04 }}
            className="bg-slate-900/50 border border-cyan-500/20 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleFundamental(idx)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-800/30 transition-colors"
            >
              <SiReact className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-bold text-cyan-400">{item.topic}</div>
                <div className="text-slate-400 text-sm">{item.desc}</div>
              </div>
              <motion.span
                animate={{ rotate: expandedFundamentals[idx] ? 90 : 0 }}
                transition={{ duration: 0.25 }}
                className="text-cyan-400 text-lg"
              >
                ›
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {expandedFundamentals[idx] && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-4">
                    <CodeBlock code={item.code} language="javascript" />
                    <ul className="space-y-1.5">
                      {item.points.map((pt, pi) => (
                        <li key={pi} className="flex items-start gap-2 text-slate-300 text-sm">
                          <span className="text-cyan-400 flex-shrink-0">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const renderPerformance = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-cyan-400 mb-1">
        Performance
      </h2>
      <p className="text-slate-400 text-sm">
        {tx('React.memo, useMemo, useCallback, lazy loading', 'React.memo, useMemo, useCallback, lazy loading')}
      </p>
    </div>

    <PerformanceDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: 'React.memo',
          color: 'border-cyan-500/30 text-cyan-300',
          desc: tx(
            'Envuelve un componente para que solo re-renderice si sus props cambian. Ideal para componentes hijos puros.',
            'Wrap a component so it only re-renders if its props change. Ideal for pure child components.'
          ),
          when: tx('Úsalo cuando el componente recibe las mismas props frecuentemente y el render es costoso.', 'Use it when a component receives the same props often and rendering is expensive.'),
        },
        {
          title: 'useMemo',
          color: 'border-teal-500/30 text-teal-300',
          desc: tx(
            'Memoriza el resultado de un cálculo costoso. Solo recalcula si las dependencias cambian.',
            'Memoizes the result of an expensive calculation. Only recalculates if dependencies change.'
          ),
          when: tx('Úsalo para filtrar/reducir listas grandes, cálculos matemáticos pesados, o construir objetos complejos.', 'Use it for filtering/reducing large lists, heavy math, or building complex objects.'),
        },
        {
          title: 'useCallback',
          color: 'border-blue-500/30 text-blue-300',
          desc: tx(
            'Memoriza la referencia de una función para que sea estable entre renders. Evita que hijos memorizados re-rendericen.',
            'Memoizes a function reference to keep it stable across renders. Prevents memoized children from re-rendering.'
          ),
          when: tx('Úsalo cuando pasas callbacks a React.memo o las incluyes en deps de useEffect.', 'Use it when passing callbacks to React.memo or including them in useEffect deps.'),
        },
        {
          title: 'React.lazy + Suspense',
          color: 'border-purple-500/30 text-purple-300',
          desc: tx(
            'Carga componentes bajo demanda (code splitting). El bundle inicial es más pequeño y la app carga más rápido.',
            'Load components on demand (code splitting). The initial bundle is smaller and the app loads faster.'
          ),
          when: tx('Úsalo en rutas, modales pesados, o cualquier componente que no sea crítico en el primer render.', 'Use it on routes, heavy modals, or any component not critical on first render.'),
        },
      ].map(({ title, color, desc, when }) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}
        >
          <div className={`font-bold text-sm mb-2 ${color.split(' ')[1]}`}>{title}</div>
          <p className="text-slate-300 text-xs leading-relaxed mb-2">{desc}</p>
          <p className="text-slate-500 text-xs leading-relaxed italic">{when}</p>
        </motion.div>
      ))}
    </div>

    <CodeBlock language="javascript" code={`// React.memo — evita re-render si props no cambian
const ExpensiveList = React.memo(({ items }) => {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
});

// useMemo — memoriza cálculo costoso
function Dashboard({ data }) {
  const stats = useMemo(() => ({
    total: data.reduce((s, d) => s + d.value, 0),
    avg: data.reduce((s, d) => s + d.value, 0) / data.length,
    max: Math.max(...data.map(d => d.value)),
  }), [data]);

  return <StatsPanel stats={stats} />;
}

// useCallback — referencia estable para handlers
function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    onSearch(query.trim());
  }, [query, onSearch]);

  return <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />;
}`} />

    <CodeBlock language="javascript" code={`// React.lazy + Suspense — code splitting por ruta
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Settings  = lazy(() => import('./Settings'));
const Profile   = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<div className="spinner">Loading…</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings"  element={<Settings />} />
        <Route path="/profile"   element={<Profile />} />
      </Routes>
    </Suspense>
  );
}

// Preload manual para anticipar navegación
const preloadDashboard = () => import('./Dashboard');
<Link onMouseEnter={preloadDashboard} to="/dashboard">Dashboard</Link>`} />
  </div>
);

const renderPatterns = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-cyan-400 mb-1">
        {tx('Patrones', 'Patterns')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx('Patrones avanzados de React para código reutilizable y mantenible.', 'Advanced React patterns for reusable, maintainable code.')}
      </p>
    </div>

    <PatternsDiagram tx={tx} />

    {[
      {
        topic: 'Higher-Order Components (HOC)',
        desc: tx('Componentes que reciben y retornan componentes', 'Components that receive and return components'),
        code: `function withAuth(Component) {
  return function AuthComponent(props) {
    const { user } = useAuth();
    if (!user) return <Redirect to="/login" />;
    return <Component {...props} user={user} />;
  };
}

const ProtectedProfile = withAuth(ProfilePage);

function withLogging(Component, options = {}) {
  return function LoggedComponent(props) {
    useEffect(() => {
      console.log(\`\${Component.name} mounted\`, options);
    }, []);
    return <Component {...props} />;
  };
}`,
        points: [
          tx('Reutilización de lógica entre componentes', 'Logic reuse across components'),
          tx('No modifica el componente original', "Doesn't modify the original component"),
          tx('Composición sobre herencia', 'Composition over inheritance'),
          tx('Hooks son la alternativa moderna', 'Hooks are the modern alternative'),
        ],
      },
      {
        topic: 'Render Props',
        desc: tx('Compartir código usando props función', 'Share code using function props'),
        code: `function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return render(position);
}

<Mouse render={({ x, y }) => <h1>Position: {x}, {y}</h1>} />`,
        points: [
          tx('Flexibilidad máxima en renderizado', 'Maximum rendering flexibility'),
          tx('Lógica completamente reutilizable', 'Completely reusable logic'),
          tx('Puede causar "callback hell" con nesting', 'Can cause callback hell with nesting'),
          tx('Custom Hooks son mejor ahora', 'Custom Hooks are better now'),
        ],
      },
      {
        topic: 'Custom Hooks',
        desc: tx('Extrae lógica stateful reutilizable', 'Extract reusable stateful logic'),
        code: `function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(\`/api/users/\${userId}\`);
  if (loading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <Profile user={user} />;
}`,
        points: [
          tx('Prefijo "use" obligatorio', '"use" prefix is required'),
          tx('Compone hooks existentes', 'Composes existing hooks'),
          tx('Reutilización sin cambiar la jerarquía de componentes', 'Reuse without changing component hierarchy'),
          tx('Mejor que HOCs y Render Props', 'Better than HOCs and Render Props'),
        ],
      },
      {
        topic: tx('Controlado vs No Controlado', 'Controlled vs Uncontrolled'),
        desc: tx('Dónde vive el estado del formulario', 'Where form state lives'),
        code: `// Controlado: React controla el valor
function ControlledInput() {
  const [value, setValue] = useState('');
  return (
    <input value={value} onChange={e => setValue(e.target.value)} />
  );
}

// No controlado: el DOM lo gestiona con ref
function UncontrolledInput() {
  const inputRef = useRef(null);
  const handleSubmit = () => console.log(inputRef.current.value);
  return (
    <>
      <input ref={inputRef} defaultValue="initial" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}`,
        points: [
          tx('Controlado: fuente de verdad en React state', 'Controlled: source of truth in React state'),
          tx('No controlado: más simple, menos boilerplate', 'Uncontrolled: simpler, less boilerplate'),
          tx('Controlado permite validación en tiempo real', 'Controlled allows real-time validation'),
          tx('useRef para acceso imperativo al DOM', 'useRef for imperative DOM access'),
        ],
      },
    ].map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: idx * 0.05 }}
        className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-5"
      >
        <div className="flex items-start gap-3 mb-3">
          <Puzzle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-cyan-400">{item.topic}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
        </div>
        <div className="mb-4">
          <CodeBlock code={item.code} language="javascript" />
        </div>
        <ul className="space-y-1.5">
          {item.points.map((pt, pi) => (
            <li key={pi} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-cyan-400 flex-shrink-0">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

// Card grid shared by the React 19.x tabs: title, what it does, when to reach for it.
const FeatureGrid = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {items.map(({ title, color, desc, when }) => (
      <motion.div
        key={title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}
      >
        <div className={`font-bold text-sm mb-2 ${color.split(' ')[1]}`}>{title}</div>
        <p className="text-slate-300 text-xs leading-relaxed mb-2">{desc}</p>
        {when && <p className="text-slate-500 text-xs leading-relaxed italic">{when}</p>}
      </motion.div>
    ))}
  </div>
);

const VersionNote = ({ children }) => (
  <p className="text-slate-300 text-sm leading-relaxed">{children}</p>
);

const renderReact192 = (tx) => (
  <div className="space-y-6">
    <VersionNote>
      {tx(
        'React 19.2 salió el 1 de octubre de 2025. No cambia cómo escribes componentes, pero trae piezas que antes resolvías a mano: ocultar partes de la UI sin perder su estado, separar la lógica de “evento” de un efecto y prerenderizar en dos fases.',
        'React 19.2 shipped on October 1, 2025. It doesn’t change how you write components, but it brings pieces you used to solve by hand: hiding parts of the UI without losing their state, splitting the “event” logic out of an effect, and prerendering in two phases.'
      )}
    </VersionNote>

    <FeatureGrid
      items={[
        {
          title: '<Activity>',
          color: 'border-cyan-500/30 text-cyan-300',
          desc: tx(
            'Divide la app en “actividades” con dos modos: visible y hidden. En hidden, React esconde la parte, desmonta sus efectos y pospone sus actualizaciones, pero conserva el estado.',
            'Splits the app into “activities” with two modes: visible and hidden. When hidden, React hides that part, unmounts its effects and defers its updates, but keeps the state.'
          ),
          when: tx(
            'Para tabs o pantallas a las que el usuario vuelve: regresa y todo sigue como lo dejó.',
            'For tabs or screens the user comes back to: they return and everything is as they left it.'
          ),
        },
        {
          title: 'useEffectEvent',
          color: 'border-teal-500/30 text-teal-300',
          desc: tx(
            'Saca la parte de “evento” de un efecto: una función que siempre ve los props y el estado actuales, y que no va en la lista de dependencias.',
            'Pulls the “event” part out of an effect: a function that always sees the current props and state, and that doesn’t go in the dependency array.'
          ),
          when: tx(
            'Cuando un efecto se re-ejecuta solo porque cambió un valor que únicamente lees, como el tema en una notificación.',
            'When an effect re-runs only because a value you merely read changed, like the theme in a notification.'
          ),
        },
        {
          title: 'cacheSignal',
          color: 'border-blue-500/30 text-blue-300',
          desc: tx(
            'Solo para Server Components: te avisa cuando termina la vida de un cache(), para cancelar trabajo que ya no se va a usar.',
            'Server Components only: tells you when a cache() lifetime is over, so you can cancel work that won’t be used.'
          ),
          when: tx(
            'Para abortar un fetch cuando el render ya terminó o se canceló.',
            'To abort a fetch once the render has finished or been cancelled.'
          ),
        },
        {
          title: tx('Partial Pre-rendering', 'Partial Pre-rendering'),
          color: 'border-purple-500/30 text-purple-300',
          desc: tx(
            'prerender devuelve un prelude (la parte estática) y un postponed (lo pendiente). Sirves el prelude desde un CDN y después continúas con resume.',
            'prerender returns a prelude (the static part) and a postponed state (what’s pending). You serve the prelude from a CDN and later continue with resume.'
          ),
          when: tx(
            'Páginas con un esqueleto estático y partes dinámicas por usuario.',
            'Pages with a static shell and per-user dynamic parts.'
          ),
        },
      ]}
    />

    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 space-y-2">
      <p className="text-sm font-bold text-slate-200">{tx('Otros cambios a tener en cuenta', 'Other changes to keep in mind')}</p>
      <ul className="space-y-1.5 text-sm text-slate-300 leading-relaxed list-disc pl-5">
        <li>{tx('Performance Tracks: Chrome DevTools muestra pistas propias de React (Scheduler y Components) en el perfil de rendimiento.', 'Performance Tracks: Chrome DevTools shows React’s own tracks (Scheduler and Components) in the performance profile.')}</li>
        <li>{tx('useId cambia su prefijo por defecto a _r_.', 'useId changes its default prefix to _r_.')}</li>
        <li>{tx('eslint-plugin-react-hooks v6 usa flat config en el preset recomendado; si sigues con la config vieja, usa recommended-legacy.', 'eslint-plugin-react-hooks v6 uses flat config in the recommended preset; if you’re on the old config, use recommended-legacy.')}</li>
        <li>{tx('En SSR, React agrupa las Suspense boundaries que se resuelven juntas.', 'During SSR, React batches Suspense boundaries that resolve together.')}</li>
      </ul>
    </div>

    <CodeBlock language="javascript" code={`// <Activity>: ocultar sin perder estado
<Activity mode={tab === 'carrito' ? 'visible' : 'hidden'}>
  <Carrito />
</Activity>

// useEffectEvent: leer el valor actual sin re-ejecutar el efecto
function Chat({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Conectado', theme); // siempre el theme actual
  });

  useEffect(() => {
    const conn = connect(roomId);
    conn.on('connected', onConnected);
    return () => conn.disconnect();
  }, [roomId]); // theme no va en las dependencias
}

// Partial Pre-rendering: estático primero, dinámico después
const { prelude, postponed } = await prerender(<App />, { signal });
// guardar postponed y servir prelude desde el CDN...
const stream = await resume(<App />, postponed);`} />
  </div>
);

const renderReact193 = (tx) => (
  <div className="space-y-6">
    <VersionNote>
      {tx(
        'React 19.3 salió el 9 de septiembre de 2026 y es la versión actual (el último parche es 19.3.1, del 14 de octubre de 2026). Lo más importante: View Transitions y Fragment Refs, que eran experimentales, ahora son estables. Y no, no existe React 20: no hay ninguna versión mayor anunciada.',
        'React 19.3 shipped on September 9, 2026 and is the current version (the latest patch is 19.3.1, from October 14, 2026). The headline: View Transitions and Fragment Refs, which were experimental, are now stable. And no, there is no React 20: no major version has been announced.'
      )}
    </VersionNote>

    <FeatureGrid
      items={[
        {
          title: tx('<ViewTransition> (estable)', '<ViewTransition> (stable)'),
          color: 'border-cyan-500/30 text-cyan-300',
          desc: tx(
            'Anima la entrada, salida y actualización de elementos, y los compartidos entre pantallas, usando la View Transition API del navegador. Por ahora funciona solo en el DOM.',
            'Animates elements entering, exiting and updating, and shared elements across screens, using the browser’s View Transition API. For now it only works in the DOM.'
          ),
          when: tx(
            'Transiciones de navegación y listas que cambian, sin librería de animación.',
            'Navigation transitions and changing lists, without an animation library.'
          ),
        },
        {
          title: 'addTransitionType',
          color: 'border-teal-500/30 text-teal-300',
          desc: tx(
            'Le pone una etiqueta a la causa de una transición, por ejemplo addTransitionType("next"), para animar distinto según hacia dónde va el usuario.',
            'Tags the cause of a transition, for example addTransitionType("next"), so you can animate differently depending on where the user is going.'
          ),
          when: tx(
            'Animar “adelante” y “atrás” de forma distinta en un carrusel o un wizard.',
            'Animating “forward” and “back” differently in a carousel or a wizard.'
          ),
        },
        {
          title: tx('Fragment Refs (estable)', 'Fragment Refs (stable)'),
          color: 'border-blue-500/30 text-blue-300',
          desc: tx(
            'Ahora puedes pasarle ref a un <Fragment>. Recibes un FragmentInstance con métodos como addEventListener, focus u observeUsing que actúan sobre todos sus hijos.',
            'You can now pass a ref to a <Fragment>. You get a FragmentInstance with methods like addEventListener, focus or observeUsing that act on all its children.'
          ),
          when: tx(
            'Escuchar eventos u observar visibilidad de un grupo de elementos sin agregar un div extra.',
            'Listening to events or observing visibility of a group of elements without adding an extra div.'
          ),
        },
        {
          title: 'browser()',
          color: 'border-purple-500/30 text-purple-300',
          desc: tx(
            'Un componente que llama use(browser()) queda fuera del render en el servidor y se renderiza solo en el cliente.',
            'A component that calls use(browser()) opts out of server rendering and renders only on the client.'
          ),
          when: tx(
            'Componentes que dependen de window, del almacenamiento local o de APIs que no existen en el servidor.',
            'Components that depend on window, local storage or APIs that don’t exist on the server.'
          ),
        },
      ]}
    />

    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 space-y-2">
      <p className="text-sm font-bold text-slate-200">{tx('Otros cambios a tener en cuenta', 'Other changes to keep in mind')}</p>
      <ul className="space-y-1.5 text-sm text-slate-300 leading-relaxed list-disc pl-5">
        <li>{tx('Server Components pueden renderizar un <Context> importado de un módulo "use client" sin un Provider envolvente.', 'Server Components can render a <Context> imported from a "use client" module without a wrapping Provider.')}</li>
        <li>{tx('Trusted Types: React ya no convierte los valores a string, así las políticas de Trusted Types funcionan.', 'Trusted Types: React no longer coerces values to strings, so Trusted Types policies work.')}</li>
        <li>{tx('Las transiciones ahora se renderizan de forma independiente.', 'Transitions now render independently.')}</li>
        <li>{tx('En Strict Mode, los efectos también se invocan dos veces durante la hidratación.', 'In Strict Mode, effects are also double-invoked during hydration.')}</li>
        <li>{tx('19.3.1 mejora el protocolo de transporte de Server Components.', '19.3.1 improves the Server Components transport protocol.')}</li>
      </ul>
    </div>

    <CodeBlock language="javascript" code={`// <ViewTransition>: animación en una transición de React
import { ViewTransition, startTransition, addTransitionType } from 'react';

function Galeria({ fotos, indice, setIndice }) {
  function siguiente() {
    startTransition(() => {
      addTransitionType('next'); // la causa decide la animación
      setIndice(indice + 1);
    });
  }

  return (
    <ViewTransition>
      <img src={fotos[indice]} alt="" />
      <button onClick={siguiente}>Siguiente</button>
    </ViewTransition>
  );
}

// Fragment Refs: un ref para todos los hijos, sin div extra
function Grupo({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const onClick = () => console.log('click dentro del grupo');
    ref.current.addEventListener('click', onClick);
    return () => ref.current.removeEventListener('click', onClick);
  }, []);

  return <Fragment ref={ref}>{children}</Fragment>;
}

// browser(): solo en el cliente
import { browser } from 'react-dom';

function Mapa() {
  use(browser()); // se salta el render en el servidor
  return <MapaInteractivo />;
}`} />
  </div>
);

const renderReactCompiler = (tx) => (
  <div className="space-y-6">
    <VersionNote>
      {tx(
        'El React Compiler llegó a su versión estable 1.0 el 7 de octubre de 2025 y el equipo de React lo considera listo para producción. Analiza tus componentes al compilar y agrega la memoización por ti, así que la mayoría de los useMemo, useCallback y React.memo dejan de ser necesarios.',
        'The React Compiler reached its stable 1.0 on October 7, 2025, and the React team considers it production-ready. It analyzes your components at build time and adds memoization for you, so most useMemo, useCallback and React.memo calls are no longer needed.'
      )}
    </VersionNote>

    <FeatureGrid
      items={[
        {
          title: tx('Qué hace', 'What it does'),
          color: 'border-cyan-500/30 text-cyan-300',
          desc: tx(
            'Memoiza automáticamente valores, funciones y componentes según lo que realmente cambia. Sigue siendo React normal: no hay sintaxis nueva.',
            'Automatically memoizes values, functions and components based on what actually changes. It’s still plain React: no new syntax.'
          ),
        },
        {
          title: tx('Cómo se instala', 'How to install it'),
          color: 'border-teal-500/30 text-teal-300',
          desc: tx(
            'Es un plugin de Babel: babel-plugin-react-compiler. Funciona desde React 17. La integración con SWC todavía es experimental.',
            'It’s a Babel plugin: babel-plugin-react-compiler. It works from React 17 up. The SWC integration is still experimental.'
          ),
        },
        {
          title: tx('Reglas de lint', 'Lint rules'),
          color: 'border-blue-500/30 text-blue-300',
          desc: tx(
            'Las reglas del compilador vienen en el preset recomendado de eslint-plugin-react-hooks y marcan el código que rompe las reglas de React.',
            'The compiler’s rules ship in eslint-plugin-react-hooks’ recommended preset and flag code that breaks the Rules of React.'
          ),
        },
        {
          title: tx('Cuidado al adoptarlo', 'Adopt it carefully'),
          color: 'border-purple-500/30 text-purple-300',
          desc: tx(
            'Si no tienes buena cobertura de tests, fija la versión exacta (por ejemplo 1.0.0) para que una actualización no cambie la memoización sin que te des cuenta.',
            'If you don’t have good test coverage, pin the exact version (for example 1.0.0) so an upgrade doesn’t change memoization without you noticing.'
          ),
        },
      ]}
    />

    <CodeBlock language="javascript" code={`// npm install -D babel-plugin-react-compiler

// babel.config.js
module.exports = {
  plugins: ['babel-plugin-react-compiler'], // debe ir primero
};

// Antes: memoización a mano
const total = useMemo(() => calcularTotal(items), [items]);
const onAgregar = useCallback(id => agregar(id), [agregar]);

// Con el compilador: código normal, él decide qué memoizar
const total = calcularTotal(items);
const onAgregar = id => agregar(id);`} />
  </div>
);

const renderReact190 = (tx) => (
  <div className="space-y-6">
    <VersionNote>
      {tx(
        'React 19 (diciembre de 2024) es el cambio grande de esta generación: Server Components, Actions para formularios y el hook use(). Mis proyectos en producción, como el portal de AgentCloud, fueron con React 18, así que esto es lo que conviene tener claro para explicar qué cambió.',
        'React 19 (December 2024) is the big change of this generation: Server Components, Actions for forms and the use() hook. My production projects, like the AgentCloud portal, were on React 18, so this is what you want clear to explain what changed.'
      )}
    </VersionNote>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('React Server Components', 'React Server Components'),
          color: 'border-cyan-500/30 text-cyan-300',
          desc: tx(
            'Componentes que renderizan exclusivamente en el servidor. Sin JS en el cliente, acceso directo a BD y filesystem.',
            'Components that render exclusively on the server. No JS on the client, direct access to DB and filesystem.'
          ),
          when: tx('Úsalos para listas de datos, layouts, breadcrumbs — cualquier cosa sin interactividad.', 'Use them for data lists, layouts, breadcrumbs — anything without interactivity.'),
        },
        {
          title: 'Server Actions',
          color: 'border-teal-500/30 text-teal-300',
          desc: tx(
            'Funciones async que se ejecutan en el servidor e integran con formularios y mutaciones. Reemplazan los endpoints de API para mutaciones simples.',
            'Async functions that run on the server and integrate with forms and mutations. Replace API endpoints for simple mutations.'
          ),
          when: tx('Úsalos para submit de formularios, mutaciones CRUD, operaciones que requieren acceso a la BD.', 'Use them for form submissions, CRUD mutations, operations requiring DB access.'),
        },
        {
          title: 'use() hook',
          color: 'border-blue-500/30 text-blue-300',
          desc: tx(
            'Nuevo hook que permite consumir Promises y Context directamente durante el render, activando Suspense automáticamente.',
            'New hook that lets you consume Promises and Context directly during render, triggering Suspense automatically.'
          ),
          when: tx('Úsalo para leer datos de una Promise o Context de forma condicional dentro del render.', 'Use it to read Promise or Context data conditionally inside render.'),
        },
        {
          title: 'useOptimistic + useFormStatus',
          color: 'border-purple-500/30 text-purple-300',
          desc: tx(
            'useOptimistic muestra el estado deseado inmediatamente antes de que el servidor responda. useFormStatus da acceso al estado del form padre.',
            'useOptimistic shows the desired state immediately before the server responds. useFormStatus gives access to the parent form state.'
          ),
          when: tx('Úsalos para UIs reactivas tipo "like" y botones de submit con estado de carga automático.', 'Use them for reactive "like"-style UIs and submit buttons with automatic loading state.'),
        },
      ].map(({ title, color, desc, when }) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}
        >
          <div className={`font-bold text-sm mb-2 ${color.split(' ')[1]}`}>{title}</div>
          <p className="text-slate-300 text-xs leading-relaxed mb-2">{desc}</p>
          <p className="text-slate-500 text-xs leading-relaxed italic">{when}</p>
        </motion.div>
      ))}
    </div>

    <CodeBlock language="javascript" code={`// React Server Component (Next.js 14+ / React 19)
// NO client-side JS, acceso directo a la BD
async function UserList() {
  const users = await db.user.findMany(); // acceso directo a BD

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

// Server Action — se ejecuta en el servidor
async function createUser(formData) {
  'use server'; // directiva de React 19
  const name = formData.get('name');
  await db.user.create({ data: { name } });
  revalidatePath('/users');
}

// use() hook — consume Promises en render
function UserCard({ userPromise }) {
  const user = use(userPromise); // Suspense automático
  return <div>{user.name}</div>;
}

// useOptimistic
function LikeButton({ post }) {
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    post.likes,
    (state, increment) => state + increment
  );

  async function handleLike() {
    addOptimisticLike(1); // actualiza la UI inmediatamente
    await likePost(post.id); // llama al servidor
  }

  return <button onClick={handleLike}>♥ {optimisticLikes}</button>;
}`} />

    <CodeBlock language="javascript" code={`// useFormStatus — estado del formulario padre
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Guardando...' : 'Guardar'}
    </button>
  );
}

// useActionState — estado de la acción del formulario
function ContactForm() {
  const [state, formAction] = useActionState(sendContactAction, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <textarea name="message" />
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">Enviado!</p>}
      <SubmitButton />
    </form>
  );
}

// ref como prop (sin forwardRef)
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// Context como Provider (sin .Provider)
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext value="dark">
      <Page />
    </ThemeContext>
  );
}`} />
  </div>
);

const renderReact19 = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-cyan-400 mb-1">
        React 19.x
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Todo React 19 en un lugar: lo que trajo la 19.0, lo nuevo de la 19.2 y la 19.3 (la versión actual) y el React Compiler 1.0.',
          'All of React 19 in one place: what 19.0 brought, what’s new in 19.2 and 19.3 (the current version), and React Compiler 1.0.'
        )}
      </p>
    </div>

    <React19Diagram tx={tx} />

    <Tabs
      label={tx('Versiones de React 19', 'React 19 versions')}
      tx={tx}
      items={[
        { id: 'r190', label: '19.0', content: renderReact190(tx) },
        { id: 'r192', label: '19.2', content: renderReact192(tx) },
        { id: 'r193', label: tx('19.3 (actual)', '19.3 (current)'), content: renderReact193(tx) },
        { id: 'compiler', label: 'Compiler 1.0', content: renderReactCompiler(tx) },
      ]}
    />
  </div>
);

const renderInterview = (tx, expandedQuestions, toggleQuestion, expandedLevels, toggleLevel) => {
  const levels = [
    {
      id: 'junior',
      label: 'Junior',
      color: 'border-green-500/40 text-green-300 bg-green-500/10',
      activeColor: 'border-green-500/60 bg-green-500/15',
      questions: [
        {
          q: tx('¿Cuál es la diferencia entre props y state?', 'What is the difference between props and state?'),
          a: tx(
            'Props son datos pasados del padre al hijo (inmutables desde el hijo). State es data interna del componente, mutable usando setState/useState. Ambos afectan al render cuando cambian.',
            'Props are data passed from parent to child (immutable from the child). State is internal component data, mutable via setState/useState. Both trigger re-renders when they change.'
          ),
        },
        {
          q: tx('¿Qué es el Virtual DOM y por qué lo usa React?', 'What is the Virtual DOM and why does React use it?'),
          a: tx(
            'Es una representación en memoria del DOM real. React lo usa para minimizar operaciones al DOM real (costosas) mediante un proceso de diffing que identifica solo los cambios necesarios.',
            'It is an in-memory representation of the real DOM. React uses it to minimize real DOM operations (expensive) through a diffing process that identifies only necessary changes.'
          ),
        },
        {
          q: tx('¿Para qué sirven las keys en listas?', 'What are keys for in lists?'),
          a: tx(
            'Las keys ayudan a React a identificar qué elementos han cambiado, añadido o eliminado en una lista. Sin keys, React debe re-renderizar la lista completa. Deben ser únicas entre hermanos, no entre toda la app.',
            'Keys help React identify which list items have changed, been added, or removed. Without keys, React must re-render the whole list. They must be unique among siblings, not globally.'
          ),
        },
        {
          q: tx('¿Cuándo usar useEffect?', 'When to use useEffect?'),
          a: tx(
            'Para efectos secundarios: fetching de datos, subscriptions, timers, manipulación directa del DOM. No debe usarse para transformar datos (useMemo) ni para event handlers (van inline). Siempre hacer cleanup de subscriptions y timers.',
            'For side effects: data fetching, subscriptions, timers, direct DOM manipulation. Do not use it to transform data (useMemo) or for event handlers (they go inline). Always clean up subscriptions and timers.'
          ),
        },
      ],
    },
    {
      id: 'mid',
      label: 'Mid',
      color: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
      activeColor: 'border-cyan-500/60 bg-cyan-500/15',
      questions: [
        {
          q: tx('¿Cuándo usarías useCallback vs useMemo?', 'When would you use useCallback vs useMemo?'),
          a: tx(
            'useCallback cachea una función (referencia estable). useMemo cachea el resultado de una función. Usa useCallback cuando pasas funciones a hijos con React.memo o las incluyes en deps de useEffect. Usa useMemo para cálculos costosos.',
            'useCallback caches a function (stable reference). useMemo caches the result of a function. Use useCallback when passing functions to React.memo children or including them in useEffect deps. Use useMemo for expensive calculations.'
          ),
        },
        {
          q: tx('¿Cómo evitarías el prop drilling?', 'How would you avoid prop drilling?'),
          a: tx(
            'Con Context API para datos globales (tema, usuario autenticado). Con composition (render props / children) cuando los datos no son globales. Con state managers como Zustand o Redux para apps complejas. No toda prop drilling es mala — Context tiene un costo de re-render.',
            'With Context API for global data (theme, authenticated user). With composition (render props / children) when data is not global. With state managers like Zustand or Redux for complex apps. Not all prop drilling is bad — Context has a re-render cost.'
          ),
        },
        {
          q: tx('¿Qué es y cuándo usarías React.lazy?', 'What is React.lazy and when would you use it?'),
          a: tx(
            'React.lazy permite cargar componentes dinámicamente con import(). El bundler crea un chunk separado que solo se descarga cuando el componente se necesita. Úsalo en rutas, modales, tabs — cualquier componente que no sea crítico en el primer render.',
            'React.lazy allows dynamically loading components with import(). The bundler creates a separate chunk downloaded only when the component is needed. Use it on routes, modals, tabs — any component not critical on first render.'
          ),
        },
        {
          q: tx('¿Qué son los Error Boundaries?', 'What are Error Boundaries?'),
          a: tx(
            'Son componentes de clase que capturan errores en el árbol de componentes hijo durante el render, en lifecycle methods, y en constructores. Implementan componentDidCatch y getDerivedStateFromError. Los hooks no pueden ser Error Boundaries (aún). Úsalos para mostrar UI alternativa en vez de una pantalla en blanco.',
            'Class components that catch errors in the child component tree during rendering, lifecycle methods, and constructors. They implement componentDidCatch and getDerivedStateFromError. Hooks cannot be Error Boundaries (yet). Use them to show fallback UI instead of a blank screen.'
          ),
        },
      ],
    },
    {
      id: 'senior',
      label: 'Senior',
      color: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
      activeColor: 'border-purple-500/60 bg-purple-500/15',
      questions: [
        {
          q: tx('Explica React Fiber y el algoritmo de reconciliación.', 'Explain React Fiber and the reconciliation algorithm.'),
          a: tx(
            'Fiber es la re-escritura del motor de React (v16). Representa cada nodo del árbol como una unidad de trabajo (fiber) enlazada como lista. El algoritmo puede pausar, priorizar y reanudar trabajo. La reconciliación en dos fases: render (puro, interrumpible, calcula el diff) y commit (muta el DOM, no interrumpible). Esto es la base del Concurrent Mode.',
            'Fiber is the rewrite of the React engine (v16). It represents each tree node as a unit of work (fiber) linked as a list. The algorithm can pause, prioritize, and resume work. Reconciliation has two phases: render (pure, interruptible, calculates the diff) and commit (mutates the DOM, non-interruptible). This is the foundation of Concurrent Mode.'
          ),
        },
        {
          q: tx('¿Qué son las concurrent features y cuándo usarlas?', 'What are concurrent features and when to use them?'),
          a: tx(
            'useTransition marca actualizaciones de baja prioridad (no bloquean la UI). useDeferredValue difiere una actualización costosa. startTransition para marcar sin el hook. Úsalos cuando tienes renders costosos que bloquean entradas del usuario. Ejemplo: filtrar una lista grande mientras el usuario escribe — el input debe responder inmediatamente, el filtro puede esperar.',
            'useTransition marks low-priority updates (they do not block the UI). useDeferredValue defers an expensive update. startTransition marks without the hook. Use them when you have expensive renders that block user input. Example: filtering a large list while the user types — the input must respond immediately, the filter can wait.'
          ),
        },
        {
          q: tx('Tradeoffs de React Server Components vs Client Components.', 'Tradeoffs of React Server Components vs Client Components.'),
          a: tx(
            'RSC: cero JS enviado al cliente, acceso directo a recursos del servidor (BD, filesystem), no pueden usar hooks de estado ni efectos, ni manejar interactividad. Client Components: interactividad completa, hooks, estado — pero añaden JS al bundle. La estrategia es "server by default": usar RSC para shells de datos y client components solo donde hay interactividad.',
            'RSC: zero JS sent to client, direct server resource access (DB, filesystem), cannot use state hooks or effects, no interactivity. Client Components: full interactivity, hooks, state — but add JS to the bundle. The strategy is "server by default": use RSC for data shells and client components only where there is interactivity.'
          ),
        },
        {
          q: tx('¿Cómo depurarías un problema de re-renders excesivos?', 'How would you debug excessive re-renders?'),
          a: tx(
            'React DevTools Profiler para identificar qué componentes re-renderizan y por qué. why-did-you-render para logs automáticos. Verificar que callbacks y objetos en props sean estables (useCallback/useMemo). Comprobar que el contexto no cambie en cada render (memorizar el value). Separar contextos de lectura y escritura. Usar React.memo con comparador personalizado si las props tienen objetos.',
            'React DevTools Profiler to identify which components re-render and why. why-did-you-render for automatic logs. Verify that callbacks and objects in props are stable (useCallback/useMemo). Check that context does not change on every render (memoize the value). Separate read and write contexts. Use React.memo with a custom comparator if props have objects.'
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-cyan-400 mb-1">
          {tx('Entrevista', 'Interview')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx('Preguntas frecuentes de entrevista — Junior, Mid y Senior.', 'Common interview questions — Junior, Mid, and Senior.')}
        </p>
      </div>

      {levels.map(level => (
        <div key={level.id} className="space-y-2">
          {/* Level header */}
          <button
            onClick={() => toggleLevel(level.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${level.color} hover:opacity-90`}
          >
            <MessageCircleQuestion className="w-4 h-4 flex-shrink-0" />
            <span className="font-bold flex-1">{level.label}</span>
            <motion.span
              animate={{ rotate: expandedLevels[level.id] ? 90 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-lg"
            >
              ›
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {expandedLevels[level.id] && (
              <motion.div
                key="qs"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-1">
                  {level.questions.map((item, idx) => {
                    const key = `${level.id}-${idx}`;
                    const isOpen = expandedQuestions[key];
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                        className="bg-slate-900/50 border border-cyan-500/15 rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(level.id, idx)}
                          className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-800/30 transition-colors"
                        >
                          <span className="text-cyan-400 font-bold text-sm flex-shrink-0 mt-0.5">Q</span>
                          <span className="text-slate-200 text-sm flex-1">{item.q}</span>
                          <motion.span
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-cyan-400 text-lg flex-shrink-0"
                          >
                            ›
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="answer"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 flex items-start gap-3">
                                <span className="text-teal-400 font-bold text-sm flex-shrink-0 mt-0.5">A</span>
                                <p className="text-slate-300 text-sm leading-relaxed">{item.a}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────────

function ReactPro() {
  const { language } = useLanguage();
  const tx = (es, en) => (language === 'en' ? en : es);
  const [activeSection, setActiveSection] = useState('core');
  const [expandedFundamentals, setExpandedFundamentals] = useState({ 0: true });
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [expandedLevels, setExpandedLevels] = useState({ junior: true });

  const toggleFundamental = (idx) =>
    setExpandedFundamentals(prev => ({ ...prev, [idx]: !prev[idx] }));

  const toggleQuestion = (level, idx) => {
    const key = `${level}-${idx}`;
    setExpandedQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleLevel = (level) =>
    setExpandedLevels(prev => ({ ...prev, [level]: !prev[level] }));

  const sections = [
    {
      id: 'core',
      title: tx('Conceptos Core', 'Core Concepts'),
      subtitle: tx('Virtual DOM, JSX, props', 'Virtual DOM, JSX, props'),
      icon: Layers,
    },
    {
      id: 'hooks',
      title: 'Hooks',
      subtitle: tx('useState, useEffect, más', 'useState, useEffect, more'),
      icon: SiReact,
    },
    {
      id: 'performance',
      title: 'Performance',
      subtitle: tx('memo, lazy, splits', 'memo, lazy, splits'),
      icon: Zap,
    },
    {
      id: 'patterns',
      title: tx('Patrones', 'Patterns'),
      subtitle: tx('HOC, Render Props, Custom Hooks', 'HOC, Render Props, Custom Hooks'),
      icon: Puzzle,
    },
    {
      id: 'react19',
      title: 'React 19.x',
      subtitle: tx('19.0 → 19.3 y Compiler 1.0', '19.0 → 19.3 and Compiler 1.0'),
      icon: Star,
    },
    {
      id: 'interview',
      title: tx('Entrevista', 'Interview'),
      subtitle: tx('Junior → Senior Q&A', 'Junior → Senior Q&A'),
      icon: MessageCircleQuestion,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'core':        return renderCore(tx);
      case 'hooks':       return renderHooks(tx, expandedFundamentals, toggleFundamental);
      case 'performance': return renderPerformance(tx);
      case 'patterns':    return renderPatterns(tx);
      case 'react19':     return renderReact19(tx);
      case 'interview':   return renderInterview(tx, expandedQuestions, toggleQuestion, expandedLevels, toggleLevel);
      default:            return renderCore(tx);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <h3 className="text-base lg:text-lg font-bold text-cyan-400 mb-2 lg:mb-4 flex items-center gap-2">
          <SiReact className="w-5 h-5 lg:w-6 lg:h-6" />
          {t('react', language).title}
        </h3>
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                  activeSection === s.id
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${activeSection === s.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div className="min-w-0">
                    <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{s.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{s.subtitle}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content panel */}
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

export default ReactPro;
