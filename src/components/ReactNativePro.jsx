import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Cpu, Palette, List, Compass, Plug, Rocket, MessageCircleQuestion, ChevronDown, FileCode2, Layers } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Shared UI ───────────────────────────────────────────────────────────────────

const SectionHeader = ({ title, subtitle }) => (
  <div>
    <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">{title}</h2>
    <p className="text-slate-400 text-sm">{subtitle}</p>
  </div>
);

const Cards = ({ cards }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {cards.map((card, i) => (
      <div key={i} className="border border-cyan-500/20 bg-slate-900/40 rounded-xl p-4">
        <h3 className="font-bold text-cyan-300 text-sm mb-2">{card.title}</h3>
        <ul className="space-y-1.5">
          {card.points.map((p, pi) => (
            <li key={pi} className="text-xs text-slate-400 flex gap-2">
              <span className="text-cyan-500 flex-shrink-0">▸</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const Callout = ({ title, children }) => (
  <div className="border border-slate-700/50 bg-slate-900/30 rounded-xl p-4">
    <p className="text-xs text-slate-400">
      <span className="font-bold text-cyan-300">{title} </span>
      {children}
    </p>
  </div>
);

const SubHeader = ({ id, n, title, subtitle }) => (
  <div id={id} className="pt-2 border-t border-slate-800">
    <h3 className="text-lg font-bold text-white flex items-center gap-2">
      <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 text-xs flex items-center justify-center flex-shrink-0">{n}</span>
      {title}
    </h3>
    {subtitle && <p className="text-slate-400 text-xs mt-1">{subtitle}</p>}
  </div>
);

const CompareTable = ({ headers, rows }) => (
  <div className="overflow-x-auto border border-cyan-500/20 rounded-xl">
    <table className="w-full text-xs">
      <thead className="bg-cyan-500/10">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="text-left px-3 py-2 text-cyan-300 font-semibold whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className="border-t border-slate-800">
            {row.map((cell, ci) => (
              <td key={ci} className={`px-3 py-2 align-top ${ci === 0 ? 'text-slate-200 font-semibold whitespace-nowrap' : 'text-slate-400'}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Architecture Diagram ────────────────────────────────────────────────────────

const ArchitectureDiagram = ({ tx }) => {
  const [mode, setMode] = useState('new');
  const [step, setStep] = useState(0);

  const flows = {
    old: [
      { label: 'JS Thread', sub: tx('Tu código React', 'Your React code') },
      { label: 'JSON', sub: tx('Serializa mensaje', 'Serializes message') },
      { label: 'Bridge', sub: tx('Async, en batch', 'Async, batched') },
      { label: 'Native', sub: tx('Deserializa y ejecuta', 'Deserializes and runs') },
    ],
    new: [
      { label: 'JS Thread', sub: 'Hermes' },
      { label: 'JSI', sub: tx('Refs C++ directas', 'Direct C++ refs') },
      { label: 'TurboModules', sub: tx('Lazy, sync o async', 'Lazy, sync or async') },
      { label: 'Fabric', sub: tx('Renderer concurrente', 'Concurrent renderer') },
    ],
  };

  const nodes = flows[mode];

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % nodes.length), 1200);
    return () => clearInterval(id);
  }, [nodes.length]);

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4 space-y-4">
      <div className="flex justify-center gap-2">
        {[
          { id: 'old', label: tx('Arquitectura antigua (Bridge)', 'Legacy architecture (Bridge)') },
          { id: 'new', label: tx('Nueva Arquitectura (JSI)', 'New Architecture (JSI)') },
        ].map(b => (
          <button
            key={b.id}
            onClick={() => { setMode(b.id); setStep(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              mode === b.id
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        {nodes.map((node, i) => (
          <div key={`${mode}-${i}`} className="flex flex-col sm:flex-row items-center gap-2 sm:flex-1">
            <motion.div
              animate={{
                boxShadow: step === i ? '0 0 18px rgba(34,211,238,0.45)' : '0 0 0px transparent',
                opacity: step === i ? 1 : 0.55,
              }}
              transition={{ duration: 0.3 }}
              className={`w-full flex-1 border rounded-xl px-3 py-2 text-center ${
                mode === 'old' && i === 2 ? 'border-red-500/40 bg-red-500/10' : 'border-cyan-500/40 bg-cyan-500/10'
              }`}
            >
              <div className={`font-bold text-sm ${mode === 'old' && i === 2 ? 'text-red-300' : 'text-cyan-300'}`}>{node.label}</div>
              <div className="text-xs text-slate-500">{node.sub}</div>
            </motion.div>
            {i < nodes.length - 1 && <span className="text-slate-600 rotate-90 sm:rotate-0">→</span>}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center text-xs text-slate-500"
        >
          {mode === 'old'
            ? tx('Cuello de botella: todo cruza un bridge asíncrono serializando JSON', 'Bottleneck: everything crosses an async bridge serializing JSON')
            : tx('JS invoca objetos C++ directamente: sin serialización, llamadas síncronas posibles', 'JS calls C++ objects directly: no serialization, synchronous calls possible')}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Virtualization Diagram ──────────────────────────────────────────────────────

const VirtualizationDiagram = ({ tx }) => {
  const total = 14;
  const viewportSize = 4;
  const buffer = 2;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setOffset(o => (o + 1) % (total - viewportSize + 1)), 900);
    return () => clearInterval(id);
  }, []);

  const stateOf = i => {
    if (i >= offset && i < offset + viewportSize) return 'visible';
    if (i >= offset - buffer && i < offset + viewportSize + buffer) return 'buffer';
    return 'unmounted';
  };

  const styles = {
    visible: 'bg-cyan-500/30 border-cyan-400/60 text-cyan-200',
    buffer: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400/70',
    unmounted: 'bg-transparent border-slate-800 border-dashed text-slate-700',
  };

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-cyan-400 uppercase tracking-wider">
        {tx('FlatList — virtualización', 'FlatList — virtualization')}
      </p>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}>
        {Array.from({ length: total }).map((_, i) => {
          const s = stateOf(i);
          return (
            <motion.div
              key={i}
              animate={{ scale: s === 'visible' ? 1.05 : 1 }}
              className={`h-10 border rounded flex items-center justify-center text-[10px] font-mono ${styles[s]}`}
            >
              {s === 'unmounted' ? '' : i}
            </motion.div>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-cyan-500/30 border border-cyan-400/60" />{tx('En pantalla', 'On screen')}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-cyan-500/10 border border-cyan-500/30" />{tx('Buffer (windowSize)', 'Buffer (windowSize)')}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-dashed border-slate-700" />{tx('Desmontado', 'Unmounted')}</span>
      </div>
      <p className="text-center text-xs text-slate-500">
        {tx('ScrollView renderiza los 14 items; FlatList solo los cercanos al viewport', 'ScrollView renders all 14 items; FlatList only those near the viewport')}
      </p>
    </div>
  );
};

// ─── Pattern Explorer (MVC / MVP / MVVM / MVI / VIPER) ───────────────────────────

const PatternExplorer = ({ tx }) => {
  const patterns = [
    {
      id: 'mvc',
      name: 'MVC',
      nodes: ['View', 'Controller', 'Model'],
      arrows: [tx('evento', 'event'), tx('actualiza', 'updates')],
      loop: tx('El Model cambia → el Controller actualiza la View a mano', 'Model changes → the Controller updates the View manually'),
      summary: tx('El Controller recibe eventos de la View, cambia el Model y vuelve a pintar la View.', 'The Controller receives View events, changes the Model and repaints the View.'),
      pros: [tx('Simple, poco código', 'Simple, little code'), tx('Fácil de entender', 'Easy to understand')],
      cons: [tx('"Massive View Controller": todo termina en el Controller', '"Massive View Controller": everything ends up in the Controller'), tx('Difícil de testear (acoplado a UIKit)', 'Hard to test (coupled to UIKit)')],
      usedIn: tx('iOS UIKit clásico', 'Classic iOS UIKit'),
    },
    {
      id: 'mvp',
      name: 'MVP',
      nodes: [tx('View (pasiva)', 'View (passive)'), 'Presenter', 'Model'],
      arrows: ['onClick()', tx('pide datos', 'requests data')],
      loop: tx('El Presenter llama view.showItems(): la View solo implementa una interfaz', 'The Presenter calls view.showItems(): the View only implements an interface'),
      summary: tx('La View es "tonta" y delega todo al Presenter, que le dice exactamente qué mostrar.', 'The View is "dumb" and delegates everything to the Presenter, which tells it exactly what to show.'),
      pros: [tx('Presenter testeable con una View mock', 'Presenter testable with a mock View'), tx('Separación clara UI / lógica', 'Clear UI / logic separation')],
      cons: [tx('Mucho boilerplate (interfaces)', 'Lots of boilerplate (interfaces)'), tx('Presenter y View acoplados 1 a 1', 'Presenter and View coupled 1-to-1')],
      usedIn: tx('Android legacy (antes de Jetpack)', 'Legacy Android (pre-Jetpack)'),
    },
    {
      id: 'mvvm',
      name: 'MVVM',
      nodes: ['View', 'ViewModel', 'Model'],
      arrows: [tx('comandos', 'commands'), tx('datos', 'data')],
      loop: tx('La View OBSERVA el estado del ViewModel; el ViewModel no conoce a la View', 'The View OBSERVES the ViewModel state; the ViewModel does not know the View'),
      summary: tx('El ViewModel expone estado y acciones; la View se suscribe y se re-renderiza sola.', 'The ViewModel exposes state and actions; the View subscribes and re-renders by itself.'),
      pros: [tx('ViewModel sin referencias a la UI → muy testeable', 'ViewModel has no UI references → very testable'), tx('Encaja natural con hooks en React', 'Fits hooks in React naturally')],
      cons: [tx('Varios estados sueltos pueden quedar inconsistentes', 'Several loose states can become inconsistent'), tx('Riesgo de ViewModels gigantes', 'Risk of giant ViewModels')],
      usedIn: tx('Android Jetpack, SwiftUI, React Native (custom hooks)', 'Android Jetpack, SwiftUI, React Native (custom hooks)'),
    },
    {
      id: 'mvi',
      name: 'MVI',
      nodes: ['View', 'Intent', 'Reducer', 'State'],
      arrows: ['dispatch', tx('(estado, intent)', '(state, intent)'), tx('nuevo estado', 'new state')],
      loop: tx('Un único State inmutable vuelve a la View: flujo unidireccional', 'A single immutable State flows back to the View: unidirectional flow'),
      summary: tx('La View emite intenciones; un reducer puro calcula el nuevo estado completo.', 'The View emits intents; a pure reducer computes the whole new state.'),
      pros: [tx('Una sola fuente de verdad, estados imposibles evitados', 'Single source of truth, impossible states avoided'), tx('Reducer = función pura → test trivial, time-travel debugging', 'Reducer = pure function → trivial tests, time-travel debugging')],
      cons: [tx('Más ceremonia para pantallas simples', 'More ceremony for simple screens'), tx('Cada cambio crea un objeto de estado nuevo', 'Every change creates a new state object')],
      usedIn: tx('Jetpack Compose, Redux / useReducer, TCA en iOS', 'Jetpack Compose, Redux / useReducer, TCA on iOS'),
    },
    {
      id: 'viper',
      name: 'VIPER',
      nodes: ['View', 'Presenter', 'Interactor', 'Entity'],
      arrows: [tx('evento', 'event'), tx('caso de uso', 'use case'), tx('datos', 'data')],
      loop: tx('+ Router para la navegación: 5 piezas por pantalla', '+ Router for navigation: 5 pieces per screen'),
      summary: tx('Divide cada pantalla en View, Interactor (negocio), Presenter, Entity y Router.', 'Splits each screen into View, Interactor (business), Presenter, Entity and Router.'),
      pros: [tx('Responsabilidades muy separadas', 'Very separated responsibilities'), tx('Escala en equipos grandes', 'Scales in large teams')],
      cons: [tx('Muchísimos archivos por pantalla', 'Lots of files per screen'), tx('Overkill para la mayoría de apps', 'Overkill for most apps')],
      usedIn: tx('Apps iOS grandes (UIKit)', 'Large iOS apps (UIKit)'),
    },
  ];

  const [activeId, setActiveId] = useState('mvvm');
  const [step, setStep] = useState(0);
  const p = patterns.find(x => x.id === activeId);

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % p.nodes.length), 1100);
    return () => clearInterval(id);
  }, [p.nodes.length]);

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4 space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {patterns.map(x => (
          <button
            key={x.id}
            onClick={() => { setActiveId(x.id); setStep(0); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              activeId === x.id
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {x.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        {p.nodes.map((node, i) => (
          <div key={`${p.id}-${i}`} className="flex flex-col sm:flex-row items-center gap-2 sm:flex-1">
            <motion.div
              animate={{
                boxShadow: step === i ? '0 0 18px rgba(34,211,238,0.45)' : '0 0 0px transparent',
                opacity: step === i ? 1 : 0.55,
              }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1 border border-cyan-500/40 bg-cyan-500/10 rounded-xl px-3 py-3 text-center font-bold text-sm text-cyan-300"
            >
              {node}
            </motion.div>
            {i < p.nodes.length - 1 && (
              <div className="flex flex-col items-center text-[10px] text-slate-500 whitespace-nowrap">
                <span className="hidden sm:block">{p.arrows[i]}</span>
                <span className="text-slate-600 rotate-90 sm:rotate-0">→</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-slate-500">↻ {p.loop}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          <p className="text-sm text-slate-300 text-center">{p.summary}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="border border-green-500/30 bg-green-500/5 rounded-lg p-3">
              <div className="font-bold text-green-300 mb-1">{tx('Ventajas', 'Pros')}</div>
              {p.pros.map((x, i) => <div key={i} className="text-slate-400">+ {x}</div>)}
            </div>
            <div className="border border-red-500/30 bg-red-500/5 rounded-lg p-3">
              <div className="font-bold text-red-300 mb-1">{tx('Desventajas', 'Cons')}</div>
              {p.cons.map((x, i) => <div key={i} className="text-slate-400">− {x}</div>)}
            </div>
            <div className="border border-cyan-500/30 bg-cyan-500/5 rounded-lg p-3">
              <div className="font-bold text-cyan-300 mb-1">{tx('Dónde se usa', 'Where it is used')}</div>
              <div className="text-slate-400">{p.usedIn}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Clean Architecture Layers Diagram ───────────────────────────────────────────

const CleanLayersDiagram = ({ tx }) => {
  const [active, setActive] = useState(0);

  const layers = [
    {
      name: 'Presentation',
      items: tx('Screens, componentes, ViewModels (hooks)', 'Screens, components, ViewModels (hooks)'),
      depends: tx('depende de Domain', 'depends on Domain'),
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-300',
    },
    {
      name: 'Domain',
      items: tx('Entidades, casos de uso, interfaces de repositorio', 'Entities, use cases, repository interfaces'),
      depends: tx('no depende de NADA (TS puro, sin React Native)', 'depends on NOTHING (pure TS, no React Native)'),
      color: 'border-cyan-400/60 bg-cyan-500/15 text-cyan-200',
    },
    {
      name: 'Data',
      items: tx('API (fetch), storage (MMKV/SQLite), implementación de repositorios', 'API (fetch), storage (MMKV/SQLite), repository implementations'),
      depends: tx('implementa interfaces de Domain', 'implements Domain interfaces'),
      color: 'border-violet-500/40 bg-violet-500/10 text-violet-300',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % layers.length), 1600);
    return () => clearInterval(id);
  }, [layers.length]);

  return (
    <div className="bg-slate-950/40 border border-cyan-500/20 rounded-xl p-4 space-y-2">
      <p className="text-center text-xs font-semibold text-cyan-400 uppercase tracking-wider">
        {tx('Regla de dependencia: todo apunta hacia el dominio', 'Dependency rule: everything points to the domain')}
      </p>
      {layers.map((layer, i) => (
        <div key={layer.name}>
          <motion.div
            animate={{
              boxShadow: active === i ? '0 0 18px rgba(34,211,238,0.35)' : '0 0 0px transparent',
              opacity: active === i ? 1 : 0.6,
            }}
            transition={{ duration: 0.35 }}
            className={`border rounded-xl px-4 py-3 ${layer.color}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="font-bold text-sm">{layer.name}</span>
              <span className="text-[11px] text-slate-500">{layer.depends}</span>
            </div>
            <div className="text-xs text-slate-400 mt-1">{layer.items}</div>
          </motion.div>
          {i === 0 && <div className="text-center text-slate-500 text-sm leading-5">↓</div>}
          {i === 1 && <div className="text-center text-slate-500 text-sm leading-5">↑</div>}
        </div>
      ))}
    </div>
  );
};

// ─── Interview Q&A ──────────────────────────────────────────────────────────────

const QAItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-cyan-500/20 bg-slate-900/40 rounded-xl">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 text-left px-4 py-3"
      >
        <span className="text-sm font-semibold text-slate-200">{q}</span>
        <ChevronDown className={`w-4 h-4 text-cyan-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-xs text-slate-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

function ReactNativePro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('fundamentals');

  const sections = [
    { id: 'fundamentals', title: tx('Fundamentos', 'Fundamentals'), subtitle: tx('Core components, Expo', 'Core components, Expo'), icon: Smartphone },
    { id: 'typescript', title: 'TypeScript', subtitle: tx('Props, navegación, listas', 'Props, navigation, lists'), icon: FileCode2 },
    { id: 'architecture', title: tx('Arquitectura interna', 'Internal Architecture'), subtitle: 'JSI, Fabric, TurboModules', icon: Cpu },
    { id: 'apparch', title: tx('Arquitectura de apps', 'App Architecture'), subtitle: 'MVVM, MVI, Clean, offline-first', icon: Layers },
    { id: 'styling', title: tx('Estilos & Layout', 'Styling & Layout'), subtitle: 'StyleSheet, Flexbox, Platform', icon: Palette },
    { id: 'performance', title: tx('Listas & Performance', 'Lists & Performance'), subtitle: 'FlatList, Reanimated', icon: List },
    { id: 'navigation', title: tx('Navegación & Estado', 'Navigation & State'), subtitle: 'React Navigation, Expo Router', icon: Compass },
    { id: 'native', title: tx('Nativo & APIs', 'Native & APIs'), subtitle: tx('Módulos, permisos, storage', 'Modules, permissions, storage'), icon: Plug },
    { id: 'deploy', title: tx('Testing & Deploy', 'Testing & Deploy'), subtitle: 'RNTL, Detox, EAS', icon: Rocket },
    { id: 'interview', title: tx('Preguntas de entrevista', 'Interview Questions'), subtitle: tx('Respuestas listas', 'Ready-made answers'), icon: MessageCircleQuestion },
  ];

  // ─── Section: Fundamentals ──────────────────────────────────────────────────

  const renderFundamentals = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Fundamentos de React Native', 'React Native Fundamentals')}
        subtitle={tx(
          'React para construir apps nativas reales en iOS y Android: no es un WebView, renderiza vistas nativas.',
          'React for building truly native iOS and Android apps: not a WebView, it renders native views.'
        )}
      />

      <Cards cards={[
        {
          title: tx('¿Qué es React Native?', 'What is React Native?'),
          points: [
            tx('Mismo modelo de React (componentes, hooks, props, estado)', 'Same React model (components, hooks, props, state)'),
            tx('<View> se convierte en UIView (iOS) / android.view.View (Android)', '<View> becomes UIView (iOS) / android.view.View (Android)'),
            tx('JS corre en un motor (Hermes) y comunica con el lado nativo', 'JS runs in an engine (Hermes) and talks to the native side'),
            tx('"Learn once, write anywhere" — no "write once, run anywhere"', '"Learn once, write anywhere" — not "write once, run anywhere"'),
          ],
        },
        {
          title: tx('Core Components', 'Core Components'),
          points: [
            tx('<View> ≈ div · <Text> ≈ span/p (TODO texto va dentro de <Text>)', '<View> ≈ div · <Text> ≈ span/p (ALL text must be inside <Text>)'),
            tx('<Image>, <ScrollView>, <TextInput>, <FlatList>, <SectionList>', '<Image>, <ScrollView>, <TextInput>, <FlatList>, <SectionList>'),
            tx('<Pressable> reemplaza a TouchableOpacity/Highlight (API moderna)', '<Pressable> replaces TouchableOpacity/Highlight (modern API)'),
            tx('<Modal>, <ActivityIndicator>, <Switch>, <KeyboardAvoidingView>', '<Modal>, <ActivityIndicator>, <Switch>, <KeyboardAvoidingView>'),
          ],
        },
        {
          title: tx('React web vs React Native', 'React web vs React Native'),
          points: [
            tx('No hay DOM, ni HTML, ni CSS: no existen <div>, className ni selectores', 'No DOM, HTML or CSS: no <div>, className or selectors'),
            tx('onClick → onPress; onChange → onChangeText', 'onClick → onPress; onChange → onChangeText'),
            tx('Estilos con objetos JS, sin cascada ni herencia (salvo dentro de <Text>)', 'Styles are JS objects, no cascade or inheritance (except inside <Text>)'),
            tx('Navegación por stacks nativos, no por URLs del navegador', 'Navigation via native stacks, not browser URLs'),
          ],
        },
        {
          title: 'Expo vs React Native CLI',
          points: [
            tx('Expo es el framework recomendado oficialmente por el equipo de RN', 'Expo is the framework officially recommended by the RN team'),
            tx('Expo: Expo Router, EAS Build/Update, SDK de módulos, config plugins', 'Expo: Expo Router, EAS Build/Update, module SDK, config plugins'),
            tx('Con Development Builds puedes usar cualquier librería nativa (ya no hay "eject")', 'With Development Builds you can use any native library (no more "eject")'),
            tx('CLI "bare": control total de ios/ y android/, más mantenimiento manual', 'Bare CLI: full control of ios/ and android/, more manual maintenance'),
          ],
        },
      ]} />

      <CodeBlock language="jsx" code={`import { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, StyleSheet } from 'react-native';

export default function ProfileCard({ user, onSave }) {
  const [name, setName] = useState(user.name);

  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />

      {/* Todo texto DEBE ir dentro de <Text> */}
      <Text style={styles.title}>Hola, {name}</Text>

      <TextInput
        value={name}
        onChangeText={setName}            // no onChange
        placeholder="Tu nombre"
        autoCapitalize="words"
        style={styles.input}
      />

      <Pressable
        onPress={() => onSave(name)}       // no onClick
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Guardar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: '#fff', gap: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32 }, // remote images NECESITAN tamaño
  title: { fontSize: 18, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10 },
  button: { backgroundColor: '#0ea5e9', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});`} />

      <CodeBlock language="bash" code={`# Crear proyecto (forma recomendada)
npx create-expo-app@latest my-app
cd my-app && npx expo start      # Expo Go / emulador / dispositivo

# Development build (cuando usas librerías nativas propias)
npx expo run:ios
npx expo run:android

# Alternativa sin framework (bare)
npx @react-native-community/cli@latest init MyApp`} />
    </div>
  );

  // ─── Section: TypeScript ────────────────────────────────────────────────────

  const renderTypeScript = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('TypeScript en React Native', 'TypeScript in React Native')}
        subtitle={tx(
          'TypeScript es el default en proyectos nuevos de RN (desde 0.71) y de Expo. Hoy es lo esperado en cualquier entrevista.',
          'TypeScript is the default for new RN (since 0.71) and Expo projects. It is what any interview expects today.'
        )}
      />

      <Cards cards={[
        {
          title: tx('Setup', 'Setup'),
          points: [
            tx('tsconfig extiende "expo/tsconfig.base" o "@react-native/typescript-config"', 'tsconfig extends "expo/tsconfig.base" or "@react-native/typescript-config"'),
            tx('Activa "strict": true desde el día uno', 'Enable "strict": true from day one'),
            tx('Babel/Metro solo BORRA los tipos: no verifica nada al compilar', 'Babel/Metro only STRIPS types: nothing is checked at build time'),
            tx('Por eso: tsc --noEmit en CI y en pre-commit', 'Hence: tsc --noEmit in CI and pre-commit'),
          ],
        },
        {
          title: tx('Props & componentes', 'Props & components'),
          points: [
            tx('type Props = { ... } y tipar el parámetro de la función', 'type Props = { ... } and type the function parameter'),
            tx('children: React.ReactNode', 'children: React.ReactNode'),
            tx('Extiende props nativas: PressableProps, TextInputProps, ComponentProps<typeof X>', 'Extend native props: PressableProps, TextInputProps, ComponentProps<typeof X>'),
            tx('Uniones discriminadas para variantes: { variant: "primary" } | { variant: "link"; href: string }', 'Discriminated unions for variants: { variant: "primary" } | { variant: "link"; href: string }'),
          ],
        },
        {
          title: tx('Navegación tipada', 'Typed navigation'),
          points: [
            tx('RootStackParamList: mapa pantalla → params (undefined si no tiene)', 'RootStackParamList: screen → params map (undefined if none)'),
            'NativeStackScreenProps<RootStackParamList, "Details">',
            tx('declare global ReactNavigation.RootParamList → useNavigation() tipado en toda la app', 'declare global ReactNavigation.RootParamList → typed useNavigation() app-wide'),
            tx('Expo Router: typedRoutes + useLocalSearchParams<{ id: string }>()', 'Expo Router: typedRoutes + useLocalSearchParams<{ id: string }>()'),
          ],
        },
        {
          title: tx('Datos & runtime', 'Data & runtime'),
          points: [
            tx('TS no valida en runtime: la API puede devolver cualquier cosa', 'TS does not validate at runtime: the API can return anything'),
            tx('Zod/Valibot para validar respuestas y derivar el tipo (z.infer)', 'Zod/Valibot to validate responses and derive the type (z.infer)'),
            tx('TanStack Query infiere el tipo desde queryFn', 'TanStack Query infers the type from queryFn'),
            tx('Zustand: create<State>()(...) — la forma "curried" es necesaria para inferir bien', 'Zustand: create<State>()(...) — the curried form is needed for correct inference'),
          ],
        },
      ]} />

      <CompareTable
        headers={[tx('Tipo', 'Type'), tx('Para qué', 'Used for')]}
        rows={[
          ['ViewStyle / TextStyle / ImageStyle', tx('Estilos de cada tipo de componente', 'Styles for each component kind')],
          ['StyleProp<ViewStyle>', tx('Prop "style" que acepta objeto, array, false o undefined', '"style" prop accepting object, array, false or undefined')],
          ['PressableProps, TextInputProps', tx('Reenviar props de un componente nativo', 'Forward props of a native component')],
          ['ComponentProps<typeof X>', tx('Extraer las props de cualquier componente', 'Extract the props of any component')],
          ['ListRenderItem<T>', tx('Tipar renderItem de FlatList', 'Type FlatList renderItem')],
          ['useRef<TextInput>(null)', tx('Refs para focus(), scrollToIndex(), etc.', 'Refs for focus(), scrollToIndex(), etc.')],
          ['NativeStackScreenProps<List, "Screen">', tx('Props de navigation y route de una pantalla', 'navigation and route props for a screen')],
          ['GestureResponderEvent', tx('Evento de onPress', 'onPress event')],
        ]}
      />

      <CodeBlock language="json" code={`// tsconfig.json (Expo)
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}

// package.json → "typecheck": "tsc --noEmit"   (Metro NO verifica tipos)`} />

      <CodeBlock language="tsx" code={`import { Pressable, Text, StyleSheet, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

// Extiende las props nativas de Pressable y agrega las propias
type ButtonProps = Omit<PressableProps, 'style'> & {
  title: string;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;     // acepta objeto, array o condicionales
};

export function Button({ title, variant = 'primary', style, ...rest }: ButtonProps) {
  return (
    <Pressable
      {...rest}                     // onPress, disabled, accessibilityLabel... tipados
      style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { padding: 12, borderRadius: 8, alignItems: 'center' },
  primary: { backgroundColor: '#0ea5e9' },
  secondary: { backgroundColor: '#334155' },
  pressed: { opacity: 0.7 },
  text: { color: '#fff', fontWeight: '600' },
});

// <Button title="OK" variant="danger" />  ❌ error de compilación`} />

      <CodeBlock language="tsx" code={`// React Navigation tipado
import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Button } from './Button';

export type RootStackParamList = {
  Home: undefined;                       // sin params
  Details: { id: string };
  Checkout: { cartId: string; coupon?: string };
};

// useNavigation() queda tipado en toda la app sin genéricos
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({ route, navigation }: DetailsProps) {
  const { id } = route.params;           // id: string
  return <Button title="Pagar" onPress={() => navigation.navigate('Checkout', { cartId: id })} />;
}

function HomeScreen() {
  const navigation = useNavigation();
  // navigation.navigate('Details');            ❌ falta { id }
  // navigation.navigate('Detail', { id: '1' }); ❌ la pantalla no existe
  return <Button title="Ver" onPress={() => navigation.navigate('Details', { id: '42' })} />;
}

// ── Expo Router: app.json → "experiments": { "typedRoutes": true }
// const { id } = useLocalSearchParams<{ id: string }>();
// router.push('/product/42');   // la ruta se valida contra la carpeta app/`} />

      <CodeBlock language="tsx" code={`import { useRef } from 'react';
import { FlatList, TextInput, Text, type ListRenderItem } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { z } from 'zod';

// 1) Un solo origen de verdad: schema → tipo + validación en runtime
const ProductSchema = z.object({ id: z.string(), name: z.string(), price: z.number() });
type Product = z.infer<typeof ProductSchema>;

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://api.example.com/products');
  return z.array(ProductSchema).parse(await res.json()); // falla si la API cambia
}

// 2) Zustand tipado (fíjate en el doble paréntesis)
type CartState = {
  items: Product[];
  add: (p: Product) => void;
};
export const useCart = create<CartState>()(set => ({
  items: [],
  add: p => set(s => ({ items: [...s.items, p] })),
}));

// 3) FlatList genérica + refs tipadas
const renderItem: ListRenderItem<Product> = ({ item }) => <Text>{item.name}</Text>;

export function ProductList() {
  const { data = [] } = useQuery({ queryKey: ['products'], queryFn: fetchProducts }); // data: Product[]
  const listRef = useRef<FlatList<Product>>(null);
  const searchRef = useRef<TextInput>(null);

  return (
    <>
      <TextInput ref={searchRef} onSubmitEditing={() => listRef.current?.scrollToOffset({ offset: 0 })} />
      <FlatList ref={listRef} data={data} renderItem={renderItem} keyExtractor={p => p.id} />
    </>
  );
}`} />

      <Callout title={tx('Pregunta típica:', 'Typical question:')}>
        {tx(
          '"Si tengo TypeScript, ¿por qué falló en producción con un undefined?" — porque los tipos desaparecen al compilar y la API devolvió algo distinto a lo declarado. Valida los bordes del sistema (red, storage, deep links) con Zod y usa los tipos derivados del schema.',
          '"If I have TypeScript, why did it crash in production with undefined?" — because types are erased at build time and the API returned something other than declared. Validate the system boundaries (network, storage, deep links) with Zod and use types derived from the schema.'
        )}
      </Callout>
    </div>
  );

  // ─── Section: Architecture ──────────────────────────────────────────────────

  const renderArchitecture = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Arquitectura de React Native', 'React Native Architecture')}
        subtitle={tx(
          'La pregunta senior por excelencia: cómo se comunica JS con lo nativo y qué cambió con la New Architecture.',
          'The quintessential senior question: how JS talks to native and what changed with the New Architecture.'
        )}
      />

      <ArchitectureDiagram tx={tx} />

      <Cards cards={[
        {
          title: tx('Threads', 'Threads'),
          points: [
            tx('Main/UI thread: renderiza vistas nativas y recibe gestos', 'Main/UI thread: renders native views and handles gestures'),
            tx('JS thread: ejecuta tu código React, lógica y reconciliación', 'JS thread: runs your React code, logic and reconciliation'),
            tx('Background (layout): Yoga calcula el layout Flexbox en C++', 'Background (layout): Yoga computes Flexbox layout in C++'),
            tx('Si bloqueas el JS thread, la app deja de responder a toques', 'If you block the JS thread, the app stops responding to touches'),
          ],
        },
        {
          title: 'JSI (JavaScript Interface)',
          points: [
            tx('API en C++ que permite a JS tener referencias a objetos nativos', 'C++ API that lets JS hold references to native objects'),
            tx('Elimina la serialización JSON del bridge', 'Removes the bridge\'s JSON serialization'),
            tx('Permite llamadas síncronas (ej. MMKV, Reanimated, VisionCamera)', 'Enables synchronous calls (e.g. MMKV, Reanimated, VisionCamera)'),
            tx('Independiente del motor JS (Hermes, JSC)', 'Engine-agnostic (Hermes, JSC)'),
          ],
        },
        {
          title: 'Fabric & TurboModules',
          points: [
            tx('Fabric: nuevo renderer en C++, soporta features concurrentes de React 18+', 'Fabric: new C++ renderer, supports React 18+ concurrent features'),
            tx('Layout síncrono: medir y posicionar sin "saltos" visuales', 'Synchronous layout: measure and position without visual jumps'),
            tx('TurboModules: módulos nativos cargados de forma lazy vía JSI', 'TurboModules: native modules loaded lazily via JSI'),
            tx('Codegen: genera bindings tipados a partir de specs TS/Flow', 'Codegen: generates typed bindings from TS/Flow specs'),
          ],
        },
        {
          title: tx('Hermes & estado actual', 'Hermes & current state'),
          points: [
            tx('Hermes: motor JS de Meta optimizado para móvil (default desde 0.70)', 'Hermes: Meta\'s mobile-optimized JS engine (default since 0.70)'),
            tx('Precompila a bytecode en build → arranque más rápido y menos memoria', 'Precompiles to bytecode at build time → faster startup, less memory'),
            tx('New Architecture activada por defecto desde RN 0.76', 'New Architecture enabled by default since RN 0.76'),
            tx('Bridgeless mode: el bridge legacy ya no se inicializa', 'Bridgeless mode: the legacy bridge is no longer initialized'),
          ],
        },
      ]} />

      <CompareTable
        headers={[tx('Aspecto', 'Aspect'), tx('Antigua (Bridge)', 'Legacy (Bridge)'), tx('Nueva (JSI)', 'New (JSI)')]}
        rows={[
          [tx('Comunicación', 'Communication'), tx('Mensajes JSON asíncronos en batch', 'Async batched JSON messages'), tx('Referencias C++ directas', 'Direct C++ references')],
          [tx('Llamadas síncronas', 'Sync calls'), tx('No', 'No'), tx('Sí', 'Yes')],
          [tx('Carga de módulos', 'Module loading'), tx('Todos al inicio', 'All at startup'), tx('Lazy (bajo demanda)', 'Lazy (on demand)')],
          ['Renderer', 'Paper', 'Fabric (C++)'],
          [tx('Type safety', 'Type safety'), tx('Manual', 'Manual'), tx('Codegen desde specs', 'Codegen from specs')],
          ['React concurrente', tx('No soportado', 'Not supported'), tx('Suspense, transitions, automatic batching', 'Suspense, transitions, automatic batching')],
        ]}
      />
    </div>
  );

  // ─── Section: Styling ───────────────────────────────────────────────────────

  // ─── Section: App Architecture ──────────────────────────────────────────────

  // Desktop scrolls the content panel; mobile scrolls the window below the sticky nav.
  const scrollToAnchor = id => {
    const el = document.getElementById(id);
    if (!el) return;
    const panel = el.closest('[data-scroll-panel]');
    if (panel && panel.scrollHeight > panel.clientHeight) {
      const top = el.getBoundingClientRect().top - panel.getBoundingClientRect().top;
      panel.scrollBy({ top: top - 8, behavior: 'smooth' });
    } else {
      const navBottom = document.querySelector('nav')?.getBoundingClientRect().bottom ?? 0;
      window.scrollBy({ top: el.getBoundingClientRect().top - navBottom - 12, behavior: 'smooth' });
    }
  };

  const archIndex = [
    { id: 'apparch-patterns', label: tx('Patrones', 'Patterns') },
    { id: 'apparch-mvvm', label: 'MVVM' },
    { id: 'apparch-mvi', label: 'MVI' },
    { id: 'apparch-clean', label: 'Clean Architecture' },
    { id: 'apparch-folders', label: tx('Carpetas', 'Folders') },
    { id: 'apparch-offline', label: 'Offline-first' },
    { id: 'apparch-qa', label: tx('Preguntas', 'Questions') },
  ];

  const archQA = [
    {
      q: tx('¿MVVM o MVI?', 'MVVM or MVI?'),
      a: tx(
        'Depende de la complejidad del estado. MVVM (un custom hook que expone estado y acciones) alcanza para la mayoría de pantallas. Si la pantalla tiene muchos estados que dependen entre sí (un checkout, un formulario de varios pasos, un chat), prefiero MVI con un reducer: un único estado inmutable, transiciones explícitas y un reducer puro fácil de testear. En la práctica se combinan: MVVM por fuera, y el ViewModel usa un reducer por dentro.',
        'It depends on how complex the state is. MVVM (a custom hook exposing state and actions) is enough for most screens. If the screen has many interdependent states (a checkout, a multi-step form, a chat), I prefer MVI with a reducer: a single immutable state, explicit transitions and a pure, easily tested reducer. In practice they combine: MVVM on the outside, with a reducer inside the ViewModel.'
      ),
    },
    {
      q: tx('¿Qué es el "ViewModel" en React Native si no hay clases ViewModel?', 'What is the "ViewModel" in React Native if there are no ViewModel classes?'),
      a: tx(
        'Un custom hook (useCartViewModel) que concentra la lógica de la pantalla: pide datos, deriva valores, expone acciones y devuelve un objeto listo para pintar. El componente queda "tonto": solo llama al hook y renderiza. El hook se testea con renderHook sin montar la UI.',
        'A custom hook (useCartViewModel) that holds the screen logic: fetches data, derives values, exposes actions and returns an object ready to render. The component stays "dumb": it only calls the hook and renders. The hook is tested with renderHook without mounting the UI.'
      ),
    },
    {
      q: tx('¿Cómo estructurarías una app grande de React Native?', 'How would you structure a large React Native app?'),
      a: tx(
        'Por feature, no por tipo de archivo: src/features/cart, src/features/auth, cada una con sus componentes, hooks, api y tipos, exponiendo solo un index.ts público. Código compartido en shared/ (UI kit, utils) y configuración en core/ (cliente HTTP, navegación, DI). Las features no importan internals de otras, y lo hago cumplir con reglas de ESLint. Si hay web y mobile, un monorepo con paquetes compartidos.',
        'By feature, not by file type: src/features/cart, src/features/auth, each with its components, hooks, api and types, exposing only a public index.ts. Shared code in shared/ (UI kit, utils) and setup in core/ (HTTP client, navigation, DI). Features do not import each other\'s internals, enforced with ESLint rules. With web and mobile, a monorepo with shared packages.'
      ),
    },
    {
      q: tx('¿Clean Architecture no es overkill en mobile?', 'Isn\'t Clean Architecture overkill on mobile?'),
      a: tx(
        'Aplicada al pie de la letra en una app chica, sí. Lo que siempre vale la pena es la idea central: que la lógica de negocio no dependa de React Native, de fetch ni del storage. Con eso ya puedo testear reglas sin emulador y cambiar la API o la base local sin tocar pantallas. Empiezo simple (hooks + repositorio) y agrego casos de uso cuando la lógica de negocio crece.',
        'Applied to the letter in a small app, yes. What always pays off is the core idea: business logic must not depend on React Native, fetch or storage. That alone lets me test rules without an emulator and swap the API or local DB without touching screens. I start simple (hooks + repository) and add use cases as business logic grows.'
      ),
    },
    {
      q: tx('¿Cómo diseñarías una app que funcione sin conexión?', 'How would you design an app that works offline?'),
      a: tx(
        'Offline-first: la base local (SQLite/WatermelonDB) es la fuente de verdad y la UI siempre lee de ahí. Las escrituras se aplican localmente al instante (optimistic) y se guardan en una cola (outbox). Un sync engine envía la cola cuando vuelve la conexión (NetInfo, AppState), con reintentos y backoff, usando un idempotency key para no duplicar. Para conflictos defino una estrategia: last-write-wins, el servidor gana, o merge por campo.',
        'Offline-first: the local DB (SQLite/WatermelonDB) is the source of truth and the UI always reads from it. Writes are applied locally right away (optimistic) and stored in a queue (outbox). A sync engine sends the queue when connectivity returns (NetInfo, AppState), with retries and backoff, using an idempotency key to avoid duplicates. For conflicts I pick a strategy: last-write-wins, server wins, or per-field merge.'
      ),
    },
    {
      q: tx('¿Qué es "Massive View Controller" y cómo lo evitas?', 'What is "Massive View Controller" and how do you avoid it?'),
      a: tx(
        'Es el problema típico de MVC en iOS: el controller termina con red, validación, navegación y UI mezcladas, y es imposible de testear. El equivalente en React Native es el "componente de 800 líneas". Se evita separando responsabilidades: lógica de pantalla en un ViewModel (hook), negocio en casos de uso, datos en repositorios, y componentes pequeños y presentacionales.',
        'It is the classic MVC problem on iOS: the controller ends up mixing networking, validation, navigation and UI, and becomes impossible to test. The React Native equivalent is the "800-line component". You avoid it by separating responsibilities: screen logic in a ViewModel (hook), business in use cases, data in repositories, and small presentational components.'
      ),
    },
  ];

  const renderAppArchitecture = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Arquitectura de apps móviles', 'Mobile App Architecture')}
        subtitle={tx(
          'Cómo organizar el código de una app para que escale y se pueda testear. Pregunta casi segura en entrevistas mid y senior.',
          'How to organize an app\'s code so it scales and stays testable. An almost certain question in mid and senior interviews.'
        )}
      />

      <div className="flex flex-wrap gap-2">
        {archIndex.map((item, i) => (
          <button
            key={item.id}
            onClick={() => scrollToAnchor(item.id)}
            className="px-3 py-1 rounded-full text-xs border border-slate-700 bg-slate-900/50 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
          >
            {i + 1}. {item.label}
          </button>
        ))}
      </div>

      <div className="border border-cyan-500/30 bg-cyan-500/5 rounded-xl p-4">
        <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
          {tx('Tu respuesta de 30 segundos', 'Your 30-second answer')}
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          {tx(
            '"Organizo la app por features. Cada pantalla tiene un componente tonto y un ViewModel en un custom hook (MVVM); si el estado es complejo, ese hook usa un reducer (MVI). La lógica de negocio vive en casos de uso que no dependen de React Native, y los datos se acceden por repositorios, así puedo cambiar la API o el storage sin tocar la UI. Estado de servidor con TanStack Query, estado de cliente con Zustand, y si la app debe funcionar sin red, la base local es la fuente de verdad con una cola de sincronización."',
            '"I organize the app by feature. Each screen has a dumb component and a ViewModel in a custom hook (MVVM); if the state is complex, that hook uses a reducer (MVI). Business logic lives in use cases that do not depend on React Native, and data is accessed through repositories, so I can swap the API or storage without touching the UI. Server state with TanStack Query, client state with Zustand, and if the app must work offline, the local DB is the source of truth with a sync queue."'
          )}
        </p>
      </div>

      {/* 1. Patterns */}
      <SubHeader
        id="apparch-patterns"
        n={1}
        title={tx('Patrones de presentación', 'Presentation patterns')}
        subtitle={tx('Todos responden lo mismo: ¿dónde vive la lógica de la pantalla y cómo llega el estado a la vista? Toca cada patrón.', 'They all answer the same thing: where does screen logic live and how does state reach the view? Tap each pattern.')}
      />
      <PatternExplorer tx={tx} />
      <CompareTable
        headers={[tx('Patrón', 'Pattern'), tx('Lógica de UI en', 'UI logic in'), tx('La View...', 'The View...'), tx('Testeabilidad', 'Testability'), tx('Hoy se usa en', 'Used today in')]}
        rows={[
          ['MVC', 'Controller', tx('conoce al Controller', 'knows the Controller'), tx('Baja', 'Low'), 'iOS UIKit legacy'],
          ['MVP', 'Presenter', tx('es pasiva (interfaz)', 'is passive (interface)'), tx('Alta', 'High'), 'Android legacy'],
          ['MVVM', 'ViewModel', tx('observa el estado', 'observes state'), tx('Alta', 'High'), 'Jetpack, SwiftUI, RN hooks'],
          ['MVI', 'Reducer', tx('renderiza un único State', 'renders a single State'), tx('Muy alta', 'Very high'), 'Compose, Redux, TCA'],
          ['VIPER', 'Presenter + Interactor', tx('es pasiva', 'is passive'), tx('Alta, mucho boilerplate', 'High, lots of boilerplate'), tx('iOS grandes', 'Large iOS apps')],
        ]}
      />

      {/* 2. MVVM */}
      <SubHeader
        id="apparch-mvvm"
        n={2}
        title={tx('MVVM en React Native: custom hook = ViewModel', 'MVVM in React Native: custom hook = ViewModel')}
        subtitle={tx('El patrón por defecto. El hook piensa, el componente pinta.', 'The default pattern. The hook thinks, the component paints.')}
      />
      <Cards cards={[
        {
          title: tx('El ViewModel (hook)', 'The ViewModel (hook)'),
          points: [
            tx('Pide los datos (TanStack Query / repositorio)', 'Fetches data (TanStack Query / repository)'),
            tx('Deriva valores: total, canCheckout, isEmpty', 'Derives values: total, canCheckout, isEmpty'),
            tx('Expone acciones con nombres de negocio: removeItem()', 'Exposes business-named actions: removeItem()'),
            tx('No devuelve JSX ni conoce estilos', 'Returns no JSX and knows no styles'),
          ],
        },
        {
          title: tx('La View (componente)', 'The View (component)'),
          points: [
            tx('Llama al hook y renderiza lo que recibe', 'Calls the hook and renders what it gets'),
            tx('Sin fetch, sin cálculos, sin reglas de negocio', 'No fetch, no calculations, no business rules'),
            tx('Se puede mostrar en Storybook con datos falsos', 'Can be shown in Storybook with fake data'),
            tx('El hook se testea con renderHook, sin UI', 'The hook is tested with renderHook, no UI'),
          ],
        },
      ]} />
      <CodeBlock language="tsx" code={`// features/cart/hooks/useCartViewModel.ts  ← ViewModel
import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartRepository } from '../data/cartRepository';

export function useCartViewModel() {
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: cartRepository.getItems,
  });

  const remove = useMutation({
    mutationFn: cartRepository.removeItem,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return {
    items,
    total,
    isLoading,
    canCheckout: items.length > 0,
    removeItem: (id: string) => remove.mutate(id),
  };
}

// features/cart/CartScreen.tsx  ← View: solo pinta
export function CartScreen() {
  const vm = useCartViewModel();

  if (vm.isLoading) return <ActivityIndicator />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={vm.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CartRow item={item} onRemove={vm.removeItem} />}
      />
      <Text>Total: \${vm.total.toFixed(2)}</Text>
      <Button title="Pagar" disabled={!vm.canCheckout} onPress={() => router.push('/checkout')} />
    </View>
  );
}`} />

      {/* 3. MVI */}
      <SubHeader
        id="apparch-mvi"
        n={3}
        title={tx('MVI: flujo unidireccional con un reducer', 'MVI: unidirectional flow with a reducer')}
        subtitle={tx('Para pantallas con muchos estados que dependen entre sí.', 'For screens with many interdependent states.')}
      />
      <Cards cards={[
        {
          title: tx('Las 3 piezas', 'The 3 pieces'),
          points: [
            tx('State: UN objeto inmutable con todo lo que la pantalla muestra', 'State: ONE immutable object with everything the screen shows'),
            tx('Intent (action): lo que el usuario o el sistema quiere hacer', 'Intent (action): what the user or system wants to do'),
            tx('Reducer: (state, intent) → nuevo state. Función pura', 'Reducer: (state, intent) → new state. Pure function'),
          ],
        },
        {
          title: tx('Por qué conviene', 'Why it helps'),
          points: [
            tx('Evita estados imposibles (loading y error a la vez)', 'Avoids impossible states (loading and error at once)'),
            tx('Cada transición es explícita y se puede loguear', 'Every transition is explicit and loggable'),
            tx('El reducer se testea sin React: entra estado, sale estado', 'The reducer is tested without React: state in, state out'),
          ],
        },
      ]} />
      <CodeBlock language="tsx" code={`// features/search/searchReducer.ts
type State =
  | { status: 'idle'; query: string }
  | { status: 'loading'; query: string }
  | { status: 'success'; query: string; results: Product[] }
  | { status: 'error'; query: string; message: string };

type Intent =
  | { type: 'QUERY_CHANGED'; query: string }
  | { type: 'SEARCH_STARTED' }
  | { type: 'SEARCH_SUCCEEDED'; results: Product[] }
  | { type: 'SEARCH_FAILED'; message: string };

export function searchReducer(state: State, intent: Intent): State {
  switch (intent.type) {
    case 'QUERY_CHANGED':    return { status: 'idle', query: intent.query };
    case 'SEARCH_STARTED':   return { status: 'loading', query: state.query };
    case 'SEARCH_SUCCEEDED': return { status: 'success', query: state.query, results: intent.results };
    case 'SEARCH_FAILED':    return { status: 'error', query: state.query, message: intent.message };
  }
}

// features/search/SearchScreen.tsx
export function SearchScreen() {
  const [state, dispatch] = useReducer(searchReducer, { status: 'idle', query: '' });

  const search = async () => {
    dispatch({ type: 'SEARCH_STARTED' });
    try {
      dispatch({ type: 'SEARCH_SUCCEEDED', results: await productApi.search(state.query) });
    } catch {
      dispatch({ type: 'SEARCH_FAILED', message: 'No se pudo buscar' });
    }
  };

  return (
    <View>
      <TextInput
        value={state.query}
        onChangeText={query => dispatch({ type: 'QUERY_CHANGED', query })}
        onSubmitEditing={search}
      />
      {state.status === 'loading' && <ActivityIndicator />}
      {state.status === 'error' && <Text>{state.message}</Text>}
      {state.status === 'success' && <ProductList products={state.results} />}
    </View>
  );
}

// Test: sin React, sin emulador
expect(searchReducer({ status: 'loading', query: 'tv' }, { type: 'SEARCH_FAILED', message: 'x' }))
  .toEqual({ status: 'error', query: 'tv', message: 'x' });`} />

      {/* 4. Clean Architecture */}
      <SubHeader
        id="apparch-clean"
        n={4}
        title={tx('Clean Architecture en mobile', 'Clean Architecture on mobile')}
        subtitle={tx('La idea clave: el negocio no depende de React Native, de la API ni del storage.', 'The key idea: business logic does not depend on React Native, the API or storage.')}
      />
      <CleanLayersDiagram tx={tx} />
      <Cards cards={[
        {
          title: tx('Piezas', 'Pieces'),
          points: [
            tx('Entity: el modelo de negocio (Order, User)', 'Entity: the business model (Order, User)'),
            tx('Use case: una acción de negocio (payOrder)', 'Use case: one business action (payOrder)'),
            tx('Repository (interfaz): qué datos necesito, no cómo se obtienen', 'Repository (interface): what data I need, not how it is fetched'),
            tx('Repository (implementación): HTTP, SQLite, MMKV, mocks', 'Repository (implementation): HTTP, SQLite, MMKV, mocks'),
          ],
        },
        {
          title: tx('Qué ganas', 'What you gain'),
          points: [
            tx('Tests de negocio rápidos, sin emulador ni red', 'Fast business tests, no emulator or network'),
            tx('Cambias REST por GraphQL sin tocar pantallas', 'Swap REST for GraphQL without touching screens'),
            tx('Mapeas DTOs de la API → entidades: la API puede cambiar', 'Map API DTOs → entities: the API can change'),
            tx('Empieza simple: agrega casos de uso cuando crezca el negocio', 'Start simple: add use cases as the business grows'),
          ],
        },
      ]} />
      <CodeBlock language="typescript" code={`// domain/entities/Order.ts
export type Order = { id: string; total: number; status: 'pending' | 'paid' };

// domain/repositories/OrderRepository.ts  ← interfaz: el dominio no sabe de fetch ni SQLite
export interface OrderRepository {
  getById(id: string): Promise<Order>;
  save(order: Order): Promise<void>;
}
export interface PaymentGateway {
  charge(amount: number): Promise<void>;
}

// domain/usecases/payOrder.ts  ← regla de negocio pura, testeable sin React Native
export const makePayOrder = (orders: OrderRepository, payments: PaymentGateway) =>
  async (orderId: string): Promise<Order> => {
    const order = await orders.getById(orderId);
    if (order.status === 'paid') throw new Error('La orden ya fue pagada');

    await payments.charge(order.total);
    const paid = { ...order, status: 'paid' as const };
    await orders.save(paid);
    return paid;
  };

// data/HttpOrderRepository.ts  ← implementación concreta + mapeo DTO → entidad
type OrderDto = { order_id: string; amount_cents: number; state: string };

export class HttpOrderRepository implements OrderRepository {
  constructor(private http: HttpClient) {}

  async getById(id: string): Promise<Order> {
    const dto = await this.http.get<OrderDto>(\`/orders/\${id}\`);
    return { id: dto.order_id, total: dto.amount_cents / 100, status: dto.state === 'PAID' ? 'paid' : 'pending' };
  }
  async save(order: Order) {
    await this.http.put(\`/orders/\${order.id}\`, { state: order.status.toUpperCase() });
  }
}

// core/di.ts  ← composition root: el único lugar que conoce las implementaciones
export const payOrder = makePayOrder(new HttpOrderRepository(http), new StripeGateway());

// presentation/usePayOrderViewModel.ts
export const usePayOrderViewModel = (orderId: string) =>
  useMutation({ mutationFn: () => payOrder(orderId) });

// Test del caso de uso con fakes, sin red:
// const pay = makePayOrder(fakeOrders, fakePayments);
// await expect(pay('already-paid')).rejects.toThrow('ya fue pagada');`} />

      {/* 5. Folder structure */}
      <SubHeader
        id="apparch-folders"
        n={5}
        title={tx('Estructura de carpetas', 'Folder structure')}
        subtitle={tx('Por feature, no por tipo de archivo.', 'By feature, not by file type.')}
      />
      <CodeBlock language="bash" code={`# ❌ Por tipo: funciona al inicio, se rompe al crecer
src/
├── components/     # 120 archivos de todas las features mezclados
├── screens/
├── hooks/
├── services/
└── store/          # para tocar "carrito" editas 5 carpetas distintas

# ✅ Por feature: todo lo del carrito vive junto
src/
├── app/                      # rutas de Expo Router: finas, solo componen features
│   ├── (tabs)/index.tsx
│   └── cart.tsx              # → import { CartScreen } from '@/features/cart'
├── features/
│   ├── cart/
│   │   ├── components/       # CartRow, CartSummary
│   │   ├── hooks/            # useCartViewModel (ViewModels)
│   │   ├── domain/           # tipos, casos de uso (si hace falta)
│   │   ├── data/             # cartRepository, api, DTOs
│   │   ├── store.ts          # estado de cliente de la feature
│   │   └── index.ts          # API PÚBLICA: lo único que otras features importan
│   ├── auth/
│   └── catalog/
├── shared/                   # sin lógica de negocio
│   ├── ui/                   # Button, Card, Text (design system)
│   ├── hooks/                # useDebounce, useAppState
│   └── lib/                  # formatters, utils
└── core/                     # infraestructura global
    ├── http.ts               # cliente HTTP, interceptores, auth
    ├── di.ts                 # composition root
    └── navigation/types.ts`} />
      <Cards cards={[
        {
          title: tx('Reglas de dependencia', 'Dependency rules'),
          points: [
            tx('features/* → shared, core: sí', 'features/* → shared, core: yes'),
            tx('feature A → internals de feature B: NO (solo su index.ts)', 'feature A → feature B internals: NO (only its index.ts)'),
            tx('shared → features: NUNCA', 'shared → features: NEVER'),
            tx('Se hace cumplir con ESLint (boundaries / no-restricted-imports)', 'Enforced with ESLint (boundaries / no-restricted-imports)'),
          ],
        },
        {
          title: tx('Cuando hay web + mobile', 'When there is web + mobile'),
          points: [
            tx('Monorepo (Turborepo, Nx, pnpm workspaces)', 'Monorepo (Turborepo, Nx, pnpm workspaces)'),
            tx('packages/domain y packages/api compartidos', 'Shared packages/domain and packages/api'),
            tx('UI separada por plataforma (o Expo Router + react-native-web)', 'Platform-specific UI (or Expo Router + react-native-web)'),
            tx('Lo que más se comparte: tipos, validación (Zod), lógica de negocio', 'What is shared most: types, validation (Zod), business logic'),
          ],
        },
      ]} />

      {/* 6. Offline-first */}
      <SubHeader
        id="apparch-offline"
        n={6}
        title={tx('Arquitectura offline-first', 'Offline-first architecture')}
        subtitle={tx('En mobile la red falla: metro, ascensor, avión. Diseña para eso.', 'On mobile the network fails: subway, elevator, plane. Design for it.')}
      />
      <div className="flex flex-col sm:flex-row items-stretch gap-2 text-center text-xs">
        {[
          { t: 'UI', d: tx('Lee SIEMPRE de local', 'ALWAYS reads local') },
          { t: tx('Base local', 'Local DB'), d: tx('Fuente de verdad', 'Source of truth') },
          { t: 'Outbox', d: tx('Cola de cambios pendientes', 'Pending changes queue') },
          { t: 'Sync engine', d: tx('Envía y descarga al reconectar', 'Pushes and pulls on reconnect') },
          { t: 'API', d: tx('Servidor', 'Server') },
        ].map((n, i, arr) => (
          <div key={i} className="flex flex-col sm:flex-row items-center gap-2 sm:flex-1">
            <div className="w-full flex-1 border border-cyan-500/30 bg-cyan-500/10 rounded-lg px-2 py-2">
              <div className="font-bold text-cyan-300">{n.t}</div>
              <div className="text-slate-500">{n.d}</div>
            </div>
            {i < arr.length - 1 && <span className="text-slate-600 rotate-90 sm:rotate-0">⇄</span>}
          </div>
        ))}
      </div>
      <Cards cards={[
        {
          title: tx('Principios', 'Principles'),
          points: [
            tx('La base local es la fuente de verdad, no la API', 'The local DB is the source of truth, not the API'),
            tx('Escrituras optimistas: la UI cambia al instante', 'Optimistic writes: the UI changes instantly'),
            tx('Outbox: cola persistente de mutaciones con reintentos y backoff', 'Outbox: persistent mutation queue with retries and backoff'),
            tx('Idempotency key por mutación → reintentar no duplica', 'Idempotency key per mutation → retrying never duplicates'),
          ],
        },
        {
          title: tx('Conflictos & herramientas', 'Conflicts & tools'),
          points: [
            tx('Last-write-wins (simple), server-wins, o merge por campo', 'Last-write-wins (simple), server-wins, or per-field merge'),
            tx('Guarda updatedAt / version en cada registro', 'Store updatedAt / version on every record'),
            'WatermelonDB, expo-sqlite + Drizzle, PowerSync',
            tx('Caso simple: TanStack Query + persistencia + onlineManager', 'Simple case: TanStack Query + persistence + onlineManager'),
          ],
        },
      ]} />
      <CodeBlock language="typescript" code={`// features/cart/data/offlineCart.ts
import NetInfo from '@react-native-community/netinfo';
import { AppState } from 'react-native';

type PendingMutation = {
  id: string;               // también se envía como Idempotency-Key
  type: 'ADD_TO_CART' | 'REMOVE_FROM_CART';
  payload: { productId: string };
  attempts: number;
};

export async function addToCart(productId: string) {
  await db.cart.insert({ productId, synced: false });            // 1. local primero → UI instantánea
  await outbox.enqueue({ id: uuid(), type: 'ADD_TO_CART', payload: { productId }, attempts: 0 });
  void syncNow();                                                // 2. intenta sincronizar
}

let syncing = false;
export async function syncNow() {
  if (syncing) return;
  const { isConnected } = await NetInfo.fetch();
  if (!isConnected) return;                                       // sin red: queda en la cola

  syncing = true;
  try {
    for (const m of await outbox.pending()) {                     // en orden (FIFO)
      try {
        await api.post('/cart/mutations', m, { headers: { 'Idempotency-Key': m.id } });
        await outbox.remove(m.id);
      } catch {
        await outbox.incrementAttempts(m.id);                      // reintento con backoff luego
        break;                                                     // conserva el orden
      }
    }
  } finally {
    syncing = false;
  }
}

// Disparadores: vuelve la red o la app vuelve a primer plano
NetInfo.addEventListener(state => { if (state.isConnected) void syncNow(); });
AppState.addEventListener('change', s => { if (s === 'active') void syncNow(); });`} />

      {/* 7. Q&A */}
      <SubHeader
        id="apparch-qa"
        n={7}
        title={tx('Preguntas de entrevista sobre arquitectura', 'Architecture interview questions')}
      />
      <div className="space-y-2">
        {archQA.map((item, i) => <QAItem key={i} q={item.q} a={item.a} />)}
      </div>
    </div>
  );

  const renderStyling = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Estilos & Layout', 'Styling & Layout')}
        subtitle={tx(
          'Flexbox en todos lados, pero con defaults distintos a la web. Y siempre pensando en dos plataformas.',
          'Flexbox everywhere, but with different defaults than the web. Always thinking about two platforms.'
        )}
      />

      <Cards cards={[
        {
          title: tx('StyleSheet', 'StyleSheet'),
          points: [
            tx('StyleSheet.create valida y organiza estilos fuera del render', 'StyleSheet.create validates and organizes styles outside render'),
            tx('Propiedades en camelCase: backgroundColor, marginTop', 'camelCase properties: backgroundColor, marginTop'),
            tx('Arrays para combinar: style={[styles.a, isActive && styles.b]}', 'Arrays to combine: style={[styles.a, isActive && styles.b]}'),
            tx('Unidades sin "px": son density-independent pixels (dp/pt)', 'No "px" units: they are density-independent pixels (dp/pt)'),
          ],
        },
        {
          title: tx('Flexbox: diferencias con la web', 'Flexbox: differences from the web'),
          points: [
            tx('flexDirection default: column (web: row)', 'flexDirection default: column (web: row)'),
            tx('alignContent default: flex-start (web: stretch)', 'alignContent default: flex-start (web: stretch)'),
            tx('flexShrink default: 0 (web: 1)', 'flexShrink default: 0 (web: 1)'),
            tx('flex: 1 = ocupa el espacio disponible (un solo número)', 'flex: 1 = take available space (single number)'),
          ],
        },
        {
          title: tx('Plataformas & pantallas', 'Platforms & screens'),
          points: [
            'Platform.OS === "ios" | "android" · Platform.select({ ios, android })',
            tx('Archivos por plataforma: Button.ios.tsx / Button.android.tsx', 'Per-platform files: Button.ios.tsx / Button.android.tsx'),
            tx('useWindowDimensions() se actualiza al rotar (Dimensions.get no)', 'useWindowDimensions() updates on rotation (Dimensions.get does not)'),
            tx('Sombras: shadow* en iOS vs elevation en Android (o boxShadow en New Arch)', 'Shadows: shadow* on iOS vs elevation on Android (or boxShadow on New Arch)'),
          ],
        },
        {
          title: tx('Safe areas, teclado & theming', 'Safe areas, keyboard & theming'),
          points: [
            tx('react-native-safe-area-context: notch, home indicator, status bar', 'react-native-safe-area-context: notch, home indicator, status bar'),
            tx('KeyboardAvoidingView (behavior distinto por plataforma)', 'KeyboardAvoidingView (behavior differs per platform)'),
            tx('useColorScheme() para dark mode del sistema', 'useColorScheme() for system dark mode'),
            tx('Librerías: NativeWind (Tailwind), Tamagui, Unistyles, Restyle', 'Libraries: NativeWind (Tailwind), Tamagui, Unistyles, Restyle'),
          ],
        },
      ]} />

      <CodeBlock language="jsx" code={`import { View, Text, StyleSheet, Platform, useWindowDimensions, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Screen({ children }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const isTablet = width >= 768;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
        scheme === 'dark' && styles.dark,
        isTablet && { paddingHorizontal: 48 },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                     // ocupa toda la pantalla
    // flexDirection: 'column'   ← ya es el default en RN
    backgroundColor: '#fff',
  },
  dark: { backgroundColor: '#0f172a' },
  card: {
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 4 },
    }),
  },
});`} />
    </div>
  );

  // ─── Section: Performance ───────────────────────────────────────────────────

  const renderPerformance = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Listas & Performance', 'Lists & Performance')}
        subtitle={tx(
          'Objetivo: 60 fps (o 120 en pantallas ProMotion). Casi todos los problemas vienen de listas mal hechas o de un JS thread bloqueado.',
          'Goal: 60 fps (or 120 on ProMotion screens). Most issues come from badly built lists or a blocked JS thread.'
        )}
      />

      <VirtualizationDiagram tx={tx} />

      <Cards cards={[
        {
          title: 'FlatList vs ScrollView',
          points: [
            tx('ScrollView renderiza TODOS los hijos: solo para contenido corto', 'ScrollView renders ALL children: only for short content'),
            tx('FlatList virtualiza: monta solo lo cercano al viewport', 'FlatList virtualizes: mounts only what is near the viewport'),
            tx('SectionList para listas agrupadas con headers', 'SectionList for grouped lists with headers'),
            tx('FlashList (Shopify) recicla celdas: más rápida en listas grandes', 'FlashList (Shopify) recycles cells: faster for large lists'),
          ],
        },
        {
          title: tx('Optimizar FlatList', 'Optimizing FlatList'),
          points: [
            tx('keyExtractor estable (id, nunca el índice)', 'Stable keyExtractor (id, never the index)'),
            tx('renderItem memoizado + item con React.memo', 'Memoized renderItem + item wrapped in React.memo'),
            tx('getItemLayout si la altura es fija → evita medir', 'getItemLayout when height is fixed → skips measuring'),
            'initialNumToRender, windowSize, maxToRenderPerBatch, removeClippedSubviews',
          ],
        },
        {
          title: tx('Animaciones', 'Animations'),
          points: [
            tx('Animated API: usa useNativeDriver: true (solo transform/opacity)', 'Animated API: use useNativeDriver: true (transform/opacity only)'),
            tx('Reanimated: worklets que corren en el UI thread, no en JS', 'Reanimated: worklets that run on the UI thread, not JS'),
            tx('react-native-gesture-handler: gestos nativos sin pasar por JS', 'react-native-gesture-handler: native gestures without going through JS'),
            tx('LayoutAnimation para transiciones simples de layout', 'LayoutAnimation for simple layout transitions'),
          ],
        },
        {
          title: tx('Re-renders, imágenes & profiling', 'Re-renders, images & profiling'),
          points: [
            tx('React.memo, useMemo, useCallback (o React Compiler)', 'React.memo, useMemo, useCallback (or React Compiler)'),
            tx('expo-image / FastImage: caché de disco y memoria', 'expo-image / FastImage: disk and memory caching'),
            tx('Quita console.log en producción (cruzan al nativo)', 'Strip console.log in production (they cross to native)'),
            tx('React Native DevTools, Perf Monitor, Flashlight para medir', 'React Native DevTools, Perf Monitor, Flashlight to measure'),
          ],
        },
      ]} />

      <CodeBlock language="jsx" code={`import { memo, useCallback } from 'react';
import { FlatList, Text, Pressable } from 'react-native';

const ITEM_HEIGHT = 72;

const Row = memo(function Row({ item, onPress }) {
  return (
    <Pressable onPress={() => onPress(item.id)} style={{ height: ITEM_HEIGHT }}>
      <Text>{item.title}</Text>
    </Pressable>
  );
});

export function ProductList({ products, onSelect, loadMore }) {
  const renderItem = useCallback(
    ({ item }) => <Row item={item} onPress={onSelect} />,
    [onSelect]
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id}              // estable, NO el index
      getItemLayout={(_, index) => ({            // altura fija → sin medir
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      initialNumToRender={10}
      windowSize={5}                             // pantallas montadas alrededor
      onEndReached={loadMore}                    // paginación infinita
      onEndReachedThreshold={0.5}
      ListEmptyComponent={<Text>Sin productos</Text>}
    />
  );
}`} />

      <CodeBlock language="jsx" code={`// Reanimated: la animación corre en el UI thread (60/120 fps aunque JS esté ocupado)
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export function DraggableCard() {
  const x = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate(e => { x.value = e.translationX; })   // worklet → UI thread
    .onEnd(() => { x.value = withSpring(0); });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[{ width: 120, height: 120, backgroundColor: '#06b6d4' }, style]} />
    </GestureDetector>
  );
}`} />
    </div>
  );

  // ─── Section: Navigation & State ────────────────────────────────────────────

  const renderNavigation = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Navegación & Estado', 'Navigation & State')}
        subtitle={tx(
          'No hay URLs de navegador: la navegación es una pila de pantallas nativas. El estado sigue las mismas reglas que en React web.',
          'There are no browser URLs: navigation is a stack of native screens. State follows the same rules as React web.'
        )}
      />

      <Cards cards={[
        {
          title: 'React Navigation',
          points: [
            tx('Native Stack: push/pop con transiciones nativas de cada plataforma', 'Native Stack: push/pop with each platform\'s native transitions'),
            tx('Bottom Tabs, Drawer, Material Top Tabs — se anidan entre sí', 'Bottom Tabs, Drawer, Material Top Tabs — they nest together'),
            'navigation.navigate("Details", { id }) · route.params',
            tx('Las pantallas NO se desmontan al navegar hacia adelante (useFocusEffect)', 'Screens are NOT unmounted when navigating forward (useFocusEffect)'),
          ],
        },
        {
          title: 'Expo Router',
          points: [
            tx('Routing basado en archivos (como Next.js) sobre React Navigation', 'File-based routing (like Next.js) built on React Navigation'),
            tx('app/(tabs)/index.tsx, app/product/[id].tsx, _layout.tsx', 'app/(tabs)/index.tsx, app/product/[id].tsx, _layout.tsx'),
            tx('Deep links automáticos para cada ruta', 'Automatic deep links for every route'),
            tx('Rutas tipadas, API routes y soporte web', 'Typed routes, API routes and web support'),
          ],
        },
        {
          title: tx('Estado', 'State'),
          points: [
            tx('Local: useState/useReducer — igual que en web', 'Local: useState/useReducer — same as web'),
            tx('Global de cliente: Zustand, Redux Toolkit, Jotai, Context', 'Global client state: Zustand, Redux Toolkit, Jotai, Context'),
            tx('Estado de servidor: TanStack Query (caché, retry, refetch on focus)', 'Server state: TanStack Query (cache, retry, refetch on focus)'),
            tx('Separa estado de servidor y de cliente — pregunta típica', 'Separate server and client state — a typical question'),
          ],
        },
        {
          title: tx('Persistencia', 'Persistence'),
          points: [
            tx('AsyncStorage: key-value asíncrono, simple, no cifrado', 'AsyncStorage: async key-value, simple, unencrypted'),
            tx('MMKV: síncrono vía JSI, ~30x más rápido que AsyncStorage', 'MMKV: synchronous via JSI, ~30x faster than AsyncStorage'),
            tx('expo-secure-store / Keychain: tokens y secretos (cifrado)', 'expo-secure-store / Keychain: tokens and secrets (encrypted)'),
            tx('SQLite (expo-sqlite), WatermelonDB, Realm: datos relacionales/offline', 'SQLite (expo-sqlite), WatermelonDB, Realm: relational/offline data'),
          ],
        },
      ]} />

      <CodeBlock language="bash" code={`# Expo Router — la estructura de carpetas ES la navegación
app/
├── _layout.tsx            # Stack raíz
├── (tabs)/
│   ├── _layout.tsx        # Tab navigator
│   ├── index.tsx          # → /
│   └── profile.tsx        # → /profile
├── product/[id].tsx       # → /product/42  (ruta dinámica)
└── +not-found.tsx`} />

      <CodeBlock language="jsx" code={`// app/product/[id].tsx
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';

// Estado de cliente (global)
export const useCart = create(set => ({
  items: [],
  add: product => set(state => ({ items: [...state.items, product] })),
}));

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const add = useCart(s => s.add);

  // Estado de servidor (caché, loading, error, refetch)
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetch(\`https://api.example.com/products/\${id}\`).then(r => r.json()),
  });

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error</Text>;

  return (
    <View>
      <Text>{data.name}</Text>
      <Button title="Añadir" onPress={() => { add(data); router.push('/cart'); }} />
    </View>
  );
}`} />
    </div>
  );

  // ─── Section: Native & APIs ─────────────────────────────────────────────────

  const renderNative = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Nativo & APIs del dispositivo', 'Native & Device APIs')}
        subtitle={tx(
          'Cuando JS no alcanza: cámara, permisos, notificaciones, sensores o tu propio código Swift/Kotlin.',
          'When JS is not enough: camera, permissions, notifications, sensors or your own Swift/Kotlin code.'
        )}
      />

      <Cards cards={[
        {
          title: tx('Módulos nativos', 'Native modules'),
          points: [
            tx('Turbo Native Modules: spec en TS → Codegen → implementación en Obj-C++/Kotlin', 'Turbo Native Modules: TS spec → Codegen → Obj-C++/Kotlin implementation'),
            tx('Expo Modules API: escribir módulos en Swift y Kotlin con un DSL simple', 'Expo Modules API: write modules in Swift and Kotlin with a simple DSL'),
            tx('Fabric Native Components para vistas nativas propias', 'Fabric Native Components for custom native views'),
            tx('Config plugins: modifican ios/ y android/ en el prebuild', 'Config plugins: modify ios/ and android/ during prebuild'),
          ],
        },
        {
          title: tx('Permisos', 'Permissions'),
          points: [
            tx('iOS: Info.plist con NSCameraUsageDescription, etc.', 'iOS: Info.plist with NSCameraUsageDescription, etc.'),
            tx('Android: AndroidManifest.xml + petición en runtime', 'Android: AndroidManifest.xml + runtime request'),
            tx('Pide el permiso en contexto, no al abrir la app', 'Ask for permission in context, not on app launch'),
            tx('Maneja "denegado permanentemente" → Linking.openSettings()', 'Handle "permanently denied" → Linking.openSettings()'),
          ],
        },
        {
          title: tx('Notificaciones & Deep linking', 'Notifications & Deep linking'),
          points: [
            tx('Push: APNs (iOS) y FCM (Android); expo-notifications unifica ambos', 'Push: APNs (iOS) and FCM (Android); expo-notifications unifies both'),
            tx('Deep links: esquema custom myapp://product/42', 'Deep links: custom scheme myapp://product/42'),
            tx('Universal Links (iOS) / App Links (Android): https verificados', 'Universal Links (iOS) / App Links (Android): verified https'),
            tx('Linking API para abrir URLs, teléfono, email, ajustes', 'Linking API to open URLs, phone, email, settings'),
          ],
        },
        {
          title: tx('Ciclo de vida & red', 'Lifecycle & network'),
          points: [
            tx('AppState: active / background / inactive', 'AppState: active / background / inactive'),
            tx('BackHandler para el botón atrás de Android', 'BackHandler for the Android back button'),
            tx('@react-native-community/netinfo para estado de conexión', '@react-native-community/netinfo for connectivity state'),
            tx('fetch funciona igual; iOS bloquea http plano por ATS', 'fetch works the same; iOS blocks plain http via ATS'),
          ],
        },
      ]} />

      <CodeBlock language="typescript" code={`// 1) Spec de un Turbo Native Module — Codegen genera los bindings
// specs/NativeDeviceInfo.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getBatteryLevel(): number;               // síncrono gracias a JSI
  getDeviceName(): Promise<string>;        // asíncrono
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeDeviceInfo');`} />

      <CodeBlock language="swift" code={`// 2) Alternativa más simple: Expo Modules API (Swift)
import ExpoModulesCore

public class DeviceInfoModule: Module {
  public func definition() -> ModuleDefinition {
    Name("DeviceInfo")

    Function("getBatteryLevel") { () -> Float in
      UIDevice.current.isBatteryMonitoringEnabled = true
      return UIDevice.current.batteryLevel
    }

    AsyncFunction("getDeviceName") { () -> String in
      return UIDevice.current.name
    }
  }
}`} />

      <CodeBlock language="jsx" code={`// Permisos en contexto + AppState
import { useEffect, useRef } from 'react';
import { AppState, Linking, Alert, Button } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

export function ScanButton({ onScan }) {
  const [permission, requestPermission] = useCameraPermissions();

  const handlePress = async () => {
    if (permission?.granted) return onScan();

    const result = await requestPermission();
    if (result.granted) return onScan();

    if (!result.canAskAgain) {
      Alert.alert('Permiso requerido', 'Actívalo en Ajustes', [
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]);
    }
  };

  return <Button title="Escanear" onPress={handlePress} />;
}

export function useRefreshOnForeground(refetch) {
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const sub = AppState.addEventListener('change', next => {
      if (appState.current.match(/inactive|background/) && next === 'active') refetch();
      appState.current = next;
    });
    return () => sub.remove();
  }, [refetch]);
}`} />
    </div>
  );

  // ─── Section: Testing & Deploy ──────────────────────────────────────────────

  const renderDeploy = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Testing, Build & Deploy', 'Testing, Build & Deploy')}
        subtitle={tx(
          'Publicar una app no es un deploy web: hay firmas, stores, revisiones y versiones viejas que siguen vivas en los teléfonos.',
          'Shipping an app is not a web deploy: there are signatures, stores, reviews and old versions still alive on phones.'
        )}
      />

      <Cards cards={[
        {
          title: 'Testing',
          points: [
            tx('Jest + React Native Testing Library (getByRole, getByText)', 'Jest + React Native Testing Library (getByRole, getByText)'),
            tx('Mockea módulos nativos (jest.mock) — no existen en Node', 'Mock native modules (jest.mock) — they do not exist in Node'),
            tx('E2E: Maestro (YAML, simple) o Detox (gray-box, sincronizado con la app)', 'E2E: Maestro (YAML, simple) or Detox (gray-box, synced with the app)'),
            tx('Prueba en dispositivos reales y en Android de gama baja', 'Test on real devices and low-end Android'),
          ],
        },
        {
          title: 'Build & EAS',
          points: [
            tx('EAS Build: compila iOS/Android en la nube (no necesitas Mac para iOS)', 'EAS Build: builds iOS/Android in the cloud (no Mac needed for iOS)'),
            tx('Perfiles en eas.json: development, preview, production', 'Profiles in eas.json: development, preview, production'),
            tx('EAS Submit: sube a App Store Connect y Google Play', 'EAS Submit: uploads to App Store Connect and Google Play'),
            tx('Firmado: certificados/provisioning (iOS), keystore (Android)', 'Signing: certificates/provisioning (iOS), keystore (Android)'),
          ],
        },
        {
          title: tx('OTA Updates', 'OTA Updates'),
          points: [
            tx('Actualizar el bundle JS sin pasar por la store (EAS Update)', 'Update the JS bundle without going through the store (EAS Update)'),
            tx('Solo JS/assets: un cambio nativo requiere nuevo build', 'JS/assets only: a native change requires a new build'),
            tx('runtimeVersion garantiza compatibilidad JS ↔ binario nativo', 'runtimeVersion guarantees JS ↔ native binary compatibility'),
            tx('CodePush (App Center) fue retirado en 2025', 'CodePush (App Center) was retired in 2025'),
          ],
        },
        {
          title: tx('Producción', 'Production'),
          points: [
            tx('Crash reporting: Sentry, Crashlytics (con source maps)', 'Crash reporting: Sentry, Crashlytics (with source maps)'),
            tx('Feature flags y forced update para versiones viejas', 'Feature flags and forced updates for old versions'),
            tx('Versionado: version (visible) vs buildNumber/versionCode', 'Versioning: version (user-facing) vs buildNumber/versionCode'),
            tx('Staged rollout en Play Store / phased release en App Store', 'Staged rollout on Play Store / phased release on App Store'),
          ],
        },
      ]} />

      <CodeBlock language="jsx" code={`// React Native Testing Library
import { render, screen, fireEvent } from '@testing-library/react-native';
import ProfileCard from './ProfileCard';

jest.mock('expo-haptics', () => ({ impactAsync: jest.fn() }));

test('guarda el nombre editado', () => {
  const onSave = jest.fn();
  render(<ProfileCard user={{ name: 'Ana', avatarUrl: 'x' }} onSave={onSave} />);

  fireEvent.changeText(screen.getByPlaceholderText('Tu nombre'), 'Leo');
  fireEvent.press(screen.getByRole('button', { name: 'Guardar' }));

  expect(onSave).toHaveBeenCalledWith('Leo');
});`} />

      <CodeBlock language="yaml" code={`# Maestro E2E — flows/login.yaml
appId: com.example.myapp
---
- launchApp
- tapOn: "Email"
- inputText: "ana@example.com"
- tapOn: "Contraseña"
- inputText: "secret123"
- tapOn: "Entrar"
- assertVisible: "Bienvenida, Ana"`} />

      <CodeBlock language="json" code={`// eas.json
{
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview":     { "distribution": "internal", "channel": "preview" },
    "production":  { "autoIncrement": true, "channel": "production" }
  },
  "submit": { "production": {} }
}

// Comandos:
// eas build --platform all --profile production
// eas submit --platform ios
// eas update --channel production --message "fix: crash en checkout"`} />
    </div>
  );

  // ─── Section: Interview Q&A ─────────────────────────────────────────────────

  const qa = [
    {
      q: tx('¿React Native es un WebView?', 'Is React Native a WebView?'),
      a: tx(
        'No. A diferencia de Cordova/Ionic, React Native renderiza componentes nativos reales (UIView, android.view.View). JS solo describe la UI; el renderer (Fabric) crea y actualiza las vistas nativas.',
        'No. Unlike Cordova/Ionic, React Native renders real native components (UIView, android.view.View). JS only describes the UI; the renderer (Fabric) creates and updates native views.'
      ),
    },
    {
      q: tx('¿TypeScript verifica los tipos cuando Metro compila la app?', 'Does TypeScript check types when Metro builds the app?'),
      a: tx(
        'No. Metro usa Babel, que solo elimina las anotaciones de tipo; la app compila aunque haya errores de tipos. Por eso se corre tsc --noEmit en CI y en pre-commit. Y como los tipos no existen en runtime, los datos externos (API, storage, deep links) se validan con algo como Zod.',
        'No. Metro uses Babel, which only strips type annotations; the app builds even with type errors. That is why tsc --noEmit runs in CI and pre-commit. And since types do not exist at runtime, external data (API, storage, deep links) is validated with something like Zod.'
      ),
    },
    {
      q: tx('¿Cómo tipas la navegación?', 'How do you type navigation?'),
      a: tx(
        'Con un ParamList que mapea cada pantalla a sus params (undefined si no tiene), pasado a createNativeStackNavigator<RootStackParamList>(). Las pantallas usan NativeStackScreenProps<RootStackParamList, "Details">, y declarando global ReactNavigation.RootParamList, useNavigation() queda tipado en toda la app. En Expo Router se activa typedRoutes y se tipan los params con useLocalSearchParams<{ id: string }>().',
        'With a ParamList mapping each screen to its params (undefined if none), passed to createNativeStackNavigator<RootStackParamList>(). Screens use NativeStackScreenProps<RootStackParamList, "Details">, and declaring the global ReactNavigation.RootParamList makes useNavigation() typed app-wide. In Expo Router you enable typedRoutes and type params with useLocalSearchParams<{ id: string }>().'
      ),
    },
    {
      q: tx('¿Qué problema resuelve la New Architecture?', 'What problem does the New Architecture solve?'),
      a: tx(
        'El bridge asíncrono serializaba todo a JSON, lo que añadía latencia, impedía llamadas síncronas y cargaba todos los módulos al inicio. JSI permite que JS tenga referencias directas a objetos C++; TurboModules carga módulos bajo demanda; Fabric habilita el render concurrente de React y layout síncrono; Codegen aporta type safety entre JS y nativo.',
        'The async bridge serialized everything to JSON, adding latency, preventing synchronous calls and loading every module at startup. JSI lets JS hold direct references to C++ objects; TurboModules load on demand; Fabric enables React concurrent rendering and synchronous layout; Codegen adds type safety between JS and native.'
      ),
    },
    {
      q: tx('¿Por qué mi animación se traba cuando la app está ocupada?', 'Why does my animation stutter when the app is busy?'),
      a: tx(
        'Porque corre en el JS thread y éste está bloqueado. Solución: Animated con useNativeDriver: true (para transform/opacity) o Reanimated, cuyos worklets se ejecutan en el UI thread. Para gestos, react-native-gesture-handler.',
        'Because it runs on the JS thread and that thread is blocked. Fix: Animated with useNativeDriver: true (for transform/opacity) or Reanimated, whose worklets run on the UI thread. For gestures, react-native-gesture-handler.'
      ),
    },
    {
      q: tx('FlatList vs ScrollView vs FlashList', 'FlatList vs ScrollView vs FlashList'),
      a: tx(
        'ScrollView monta todos los hijos (bien para contenido corto). FlatList virtualiza: solo monta los items cerca del viewport y desmonta los lejanos. FlashList recicla las celdas en lugar de desmontarlas, reduciendo blank cells y uso de memoria en listas largas.',
        'ScrollView mounts every child (fine for short content). FlatList virtualizes: mounts only items near the viewport and unmounts distant ones. FlashList recycles cells instead of unmounting them, reducing blank cells and memory in long lists.'
      ),
    },
    {
      q: tx('¿Expo o React Native CLI?', 'Expo or React Native CLI?'),
      a: tx(
        'Hoy Expo es el framework recomendado oficialmente. Con development builds y config plugins puedes usar cualquier librería nativa, así que la razón histórica para evitar Expo ya no aplica. El CLI "bare" tiene sentido si necesitas control total de los proyectos nativos o integras RN en una app nativa existente (brownfield).',
        'Expo is now the officially recommended framework. With development builds and config plugins you can use any native library, so the historical reason to avoid Expo no longer applies. Bare CLI makes sense when you need full control over native projects or embed RN into an existing native app (brownfield).'
      ),
    },
    {
      q: tx('¿Dónde guardas un token de autenticación?', 'Where do you store an auth token?'),
      a: tx(
        'En almacenamiento seguro: Keychain (iOS) / Keystore (Android), vía expo-secure-store o react-native-keychain. Nunca en AsyncStorage, que no está cifrado. MMKV sirve para preferencias y caché, aunque soporta cifrado opcional.',
        'In secure storage: Keychain (iOS) / Keystore (Android), via expo-secure-store or react-native-keychain. Never in AsyncStorage, which is unencrypted. MMKV is good for preferences and cache, though it supports optional encryption.'
      ),
    },
    {
      q: tx('¿Qué se puede actualizar por OTA y qué no?', 'What can be updated OTA and what cannot?'),
      a: tx(
        'Por OTA (EAS Update) solo el bundle JS y los assets. Cualquier cambio nativo (nueva librería con código nativo, permisos, versión de RN, config de Info.plist/Manifest) requiere un build nuevo y pasar por la store. runtimeVersion evita enviar JS incompatible a un binario viejo. Además, las stores prohíben cambiar el propósito de la app vía OTA.',
        'Over the air (EAS Update) only the JS bundle and assets. Any native change (new library with native code, permissions, RN version, Info.plist/Manifest config) requires a new build and store review. runtimeVersion prevents shipping incompatible JS to an old binary. Stores also forbid changing the app\'s purpose via OTA.'
      ),
    },
    {
      q: tx('¿Cómo depuras un problema de performance?', 'How do you debug a performance problem?'),
      a: tx(
        'Mido primero: Perf Monitor (FPS de JS y UI thread por separado), React Native DevTools (profiler de React y de JS), y herramientas nativas (Xcode Instruments, Android Studio Profiler). Si cae el FPS de JS: re-renders o trabajo pesado en JS. Si cae el de UI: vistas demasiado complejas, overdraw o imágenes grandes. Siempre probar en build de release y en un Android de gama baja.',
        'Measure first: Perf Monitor (JS and UI thread FPS separately), React Native DevTools (React and JS profiler), and native tools (Xcode Instruments, Android Studio Profiler). JS FPS drops: re-renders or heavy JS work. UI FPS drops: overly complex views, overdraw or large images. Always test a release build on a low-end Android device.'
      ),
    },
    {
      q: tx('¿Qué es Hermes y por qué importa?', 'What is Hermes and why does it matter?'),
      a: tx(
        'Es el motor JS de Meta optimizado para móvil y el default desde RN 0.70. Compila el JS a bytecode en tiempo de build, así que la app no parsea ni compila JS al arrancar: mejor tiempo de inicio (TTI), menos memoria y APK más pequeño.',
        'It is Meta\'s mobile-optimized JS engine and the default since RN 0.70. It compiles JS to bytecode at build time, so the app does not parse or compile JS at startup: better time to interactive, lower memory and smaller APK.'
      ),
    },
    {
      q: tx('¿Cómo manejas diferencias entre iOS y Android?', 'How do you handle iOS vs Android differences?'),
      a: tx(
        'Platform.OS / Platform.select para diferencias pequeñas; archivos .ios.tsx / .android.tsx para componentes muy distintos. Cosas típicas: sombras (shadow* vs elevation), KeyboardAvoidingView behavior, botón atrás de Android (BackHandler), safe areas, permisos y fuentes.',
        'Platform.OS / Platform.select for small differences; .ios.tsx / .android.tsx files for very different components. Typical spots: shadows (shadow* vs elevation), KeyboardAvoidingView behavior, Android back button (BackHandler), safe areas, permissions and fonts.'
      ),
    },
  ];

  const renderInterview = () => (
    <div className="space-y-6">
      <SectionHeader
        title={tx('Preguntas de entrevista', 'Interview Questions')}
        subtitle={tx(
          'Las preguntas que más se repiten en entrevistas de React Native, con respuestas listas para usar.',
          'The most frequent React Native interview questions, with ready-to-use answers.'
        )}
      />
      <div className="space-y-2">
        {qa.map((item, i) => <QAItem key={i} q={item.q} a={item.a} />)}
      </div>
      <Callout title={tx('Tip:', 'Tip:')}>
        {tx(
          'en entrevistas senior casi siempre aparecen tres temas: arquitectura (Bridge vs JSI), performance de listas/animaciones, y el ciclo de release (builds, OTA, versiones viejas en producción).',
          'senior interviews almost always cover three topics: architecture (Bridge vs JSI), list/animation performance, and the release cycle (builds, OTA, old versions in production).'
        )}
      </Callout>
    </div>
  );

  const renderContent = () => {
    switch (active) {
      case 'fundamentals': return renderFundamentals();
      case 'typescript': return renderTypeScript();
      case 'architecture': return renderArchitecture();
      case 'apparch': return renderAppArchitecture();
      case 'styling': return renderStyling();
      case 'performance': return renderPerformance();
      case 'navigation': return renderNavigation();
      case 'native': return renderNative();
      case 'deploy': return renderDeploy();
      case 'interview': return renderInterview();
      default: return renderFundamentals();
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
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${active === section.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div className="min-w-0">
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
      <div data-scroll-panel className="lg:col-span-3 lg:overflow-y-auto lg:pr-2 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
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

export default ReactNativePro;
