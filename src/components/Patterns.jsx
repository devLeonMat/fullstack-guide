import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Factory, Bell, Shuffle, Plug, Command, Shield, Layers, Box, Boxes } from 'lucide-react';
import CodeBlock from './CodeBlock';
import Tabs from './solid/Tabs';
import { buildPatterns } from './patterns/patterns';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

// Simple visual diagram components for patterns
const SingletonDiagram = () => (
  <div className="relative w-full h-[200px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="relative"
    >
      <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-purple-400">
        <Eye className="w-16 h-16 text-white" />
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center border-4 border-slate-900"
      >
        <span className="text-2xl">🔒</span>
      </motion.div>
    </motion.div>
    <p className="absolute bottom-4 text-slate-400 text-sm">Una Única Instancia Global</p>
  </div>
);

const FactoryDiagram = () => (
  <div className="relative w-full h-[200px] grid grid-cols-3 gap-4 items-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
    <div className="flex justify-center">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl"
      >
        ⚙️
      </motion.div>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Factory className="w-16 h-16 text-emerald-400" />
      <span className="text-emerald-400 font-bold text-sm">FACTORY</span>
    </div>
    <div className="flex flex-col gap-2">
      {['🚗', '🚙', '🚕'].map((icon, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.3, repeat: Infinity, repeatDelay: 2 }}
          className="text-2xl"
        >
          {icon}
        </motion.div>
      ))}
    </div>
  </div>
);

const ObserverDiagram = () => (
  <div className="relative w-full h-[200px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
    <div className="flex items-center gap-8">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="relative"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
          <Bell className="w-10 h-10 text-white" />
        </div>
        <p className="text-xs text-center text-slate-400 mt-2">Subject</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center"
          >
            <span className="text-white text-xs">O{i}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const StrategyDiagram = () => (
  <div className="relative w-full h-[200px] flex flex-col items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800 gap-4">
    <div className="text-cyan-400 font-bold">CONTEXT</div>
    <div className="flex gap-4">
      {['A', 'B', 'C'].map((strategy, idx) => (
        <motion.div
          key={strategy}
          animate={{
            y: [0, -10, 0],
            backgroundColor: idx === 1 ? ['rgb(6, 182, 212)', 'rgb(34, 211, 238)', 'rgb(6, 182, 212)'] : 'rgb(6, 182, 212)'
          }}
          transition={{ duration: 2, delay: idx * 0.3, repeat: Infinity }}
          className="w-16 h-16 bg-cyan-600 rounded-lg flex items-center justify-center text-white font-bold"
        >
          {strategy}
        </motion.div>
      ))}
    </div>
    <p className="text-slate-400 text-xs">Algoritmos Intercambiables</p>
  </div>
);

const DecoratorDiagram = () => (
  <div className="relative w-full h-[200px] flex items-center justify-center bg-slate-950/30 rounded-xl p-6 border border-slate-800">
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-32 h-32 border-4 border-dashed border-purple-400 rounded-lg absolute"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 border-4 border-dashed border-pink-400 rounded-lg absolute top-4 left-4"
      />
      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg absolute top-8 left-8 flex items-center justify-center">
        <Layers className="w-8 h-8 text-white" />
      </div>
    </div>
    <p className="absolute bottom-4 text-slate-400 text-sm">Wrapping Functionality</p>
  </div>
);

const AdapterDiagram = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 3), 1400);
    return () => clearInterval(id);
  }, []);
  const nodes = [
    { label: 'Client', color: 'bg-blue-500/20 border-blue-500/40 text-blue-300' },
    { label: 'Adapter', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
    { label: 'Legacy API', color: 'bg-slate-600/40 border-slate-500/40 text-slate-300' },
  ];
  return (
    <div className="w-full h-[180px] flex items-center justify-center bg-slate-950/30 rounded-xl border border-slate-800 p-4 gap-3">
      {nodes.map((n, i) => (
        <div key={n.label} className="flex items-center gap-3">
          <motion.div animate={{ scale: step === i ? 1.1 : 1, opacity: step >= i ? 1 : 0.4 }}
            className={`border rounded-xl px-4 py-3 text-center text-sm font-bold ${n.color}`}>
            {n.label}
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div animate={{ opacity: step > i ? 1 : 0.2 }} className="flex flex-col items-center text-xs text-slate-500 gap-0.5">
              <motion.div animate={{ x: step > i ? [0, 6, 0] : 0 }} transition={{ duration: 0.6, repeat: Infinity }}>→</motion.div>
              <span className="text-[10px]">{i === 0 ? 'fetch()' : 'request()'}</span>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

const CommandDiagram = () => {
  const [active, setActive] = useState(0);
  const commands = ['execute(On)', 'execute(Off)', 'undo()'];
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % commands.length), 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full h-[180px] flex items-center justify-between bg-slate-950/30 rounded-xl border border-slate-800 p-4">
      <div className="border border-amber-500/40 bg-amber-500/10 rounded-xl px-4 py-3 text-amber-300 font-bold text-sm text-center">
        Invoker<br /><span className="text-xs font-normal text-slate-400">RemoteControl</span>
      </div>
      <div className="flex flex-col gap-1.5 flex-1 mx-3">
        {commands.map((cmd, i) => (
          <motion.div key={cmd} animate={{ scale: active === i ? 1.04 : 1, opacity: active >= i ? 1 : 0.35 }}
            className={`border rounded-lg px-2 py-1 text-xs font-mono text-center transition-all ${active === i ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-slate-800/40 border-slate-700/40 text-slate-500'}`}>
            {cmd}
          </motion.div>
        ))}
      </div>
      <div className="border border-slate-600/40 bg-slate-700/20 rounded-xl px-4 py-3 text-slate-300 font-bold text-sm text-center">
        Receiver<br /><span className="text-xs font-normal text-slate-400">Light</span>
      </div>
    </div>
  );
};

const ProxyDiagram = () => {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 4), 1000);
    return () => clearInterval(id);
  }, []);
  const labels = ['Client', 'Proxy', 'Real Subject'];
  const checks = ['Valida acceso', 'Cachea', 'Loguea'];
  return (
    <div className="w-full h-[180px] flex flex-col gap-3 items-center justify-center bg-slate-950/30 rounded-xl border border-slate-800 p-4">
      <div className="flex items-center gap-3 w-full justify-center">
        {labels.map((l, i) => (
          <div key={l} className="flex items-center gap-3">
            <motion.div animate={{ scale: phase === i + 1 ? 1.1 : 1, opacity: phase >= i + 1 ? 1 : 0.4 }}
              className={`border rounded-xl px-3 py-2 text-center text-xs font-bold ${i === 1 ? 'border-green-500/40 bg-green-500/10 text-green-300' : 'border-slate-600/40 bg-slate-700/20 text-slate-300'}`}>
              {l}
            </motion.div>
            {i < labels.length - 1 && <motion.span animate={{ opacity: phase > i + 1 ? 1 : 0.2 }} className="text-slate-500 text-sm">→</motion.span>}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {checks.map((c, i) => (
          <motion.div key={c} animate={{ opacity: phase === i + 2 ? 1 : 0.2, scale: phase === i + 2 ? 1.05 : 1 }}
            className="text-xs border border-green-500/30 bg-green-500/10 text-green-400 rounded-lg px-2 py-1">
            ✓ {c}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FacadeDiagram = () => {
  const [showInternals, setShowInternals] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setShowInternals(v => !v), 2000);
    return () => clearInterval(id);
  }, []);
  const subsystems = ['CPU', 'Memory', 'HardDrive', 'Network'];
  return (
    <div className="w-full h-[180px] flex items-center justify-center gap-6 bg-slate-950/30 rounded-xl border border-slate-800 p-4">
      <div className="border border-indigo-500/40 bg-indigo-500/10 rounded-xl px-4 py-3 text-indigo-300 font-bold text-sm text-center">
        Client
      </div>
      <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
        className="text-slate-500 text-lg">→</motion.div>
      <div className="border-2 border-purple-500/50 bg-purple-500/10 rounded-xl px-5 py-4 text-purple-300 font-bold text-sm text-center shadow-lg shadow-purple-500/10">
        Facade<br /><span className="text-xs font-normal text-slate-400">computer.start()</span>
      </div>
      <AnimatePresence>
        {showInternals && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            className="flex flex-col gap-1.5">
            {subsystems.map((s, i) => (
              <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.12 }}
                className="border border-slate-600/40 bg-slate-700/20 rounded-lg px-3 py-1 text-slate-400 text-xs font-mono">
                {s}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BuilderDiagram = () => {
  const [built, setBuilt] = useState(0);
  const steps = [
    { label: 'setName()', color: 'bg-orange-500/20 border-orange-500/40 text-orange-300' },
    { label: 'setAge()', color: 'bg-orange-400/20 border-orange-400/40 text-orange-200' },
    { label: 'setEmail()', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
    { label: '.build()', color: 'bg-green-500/20 border-green-500/40 text-green-300' },
  ];
  useEffect(() => {
    const id = setInterval(() => setBuilt(b => b < steps.length ? b + 1 : 0), 600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full h-[180px] flex flex-col items-center justify-center gap-3 bg-slate-950/30 rounded-xl border border-slate-800 p-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {steps.map((s, i) => (
          <motion.div key={s.label} animate={{ opacity: built > i ? 1 : 0.2, scale: built === i + 1 ? 1.08 : 1 }}
            className={`border rounded-lg px-3 py-1.5 text-xs font-mono font-semibold ${s.color}`}>
            {s.label}
          </motion.div>
        ))}
      </div>
      <motion.div animate={{ scale: built >= steps.length ? [1, 1.05, 1] : 1 }}
        transition={{ duration: 0.6 }}
        className={`border-2 rounded-xl px-6 py-2 text-sm font-bold transition-all ${built >= steps.length ? 'border-green-500/60 bg-green-500/15 text-green-300' : 'border-slate-700/40 bg-slate-800/20 text-slate-500'}`}>
        {built >= steps.length ? '✓ User Object' : 'Building...'}
      </motion.div>
    </div>
  );
};


const VISUALS = {
  singleton: { icon: Eye, diagram: SingletonDiagram },
  factory: { icon: Factory, diagram: FactoryDiagram },
  builder: { icon: Boxes, diagram: BuilderDiagram },
  adapter: { icon: Plug, diagram: AdapterDiagram },
  facade: { icon: Box, diagram: FacadeDiagram },
  proxy: { icon: Shield, diagram: ProxyDiagram },
  decorator: { icon: Layers, diagram: DecoratorDiagram },
  strategy: { icon: Shuffle, diagram: StrategyDiagram },
  observer: { icon: Bell, diagram: ObserverDiagram },
  command: { icon: Command, diagram: CommandDiagram },
};

const Section = ({ title, children }) => (
  <div>
    <h5 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">{title}</h5>
    <p className="text-slate-300 text-sm leading-relaxed">{children}</p>
  </div>
);

function Patterns() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [selectedPattern, setSelectedPattern] = useState('singleton');

  const categories = t('patterns', language).categories;
  const patternList = buildPatterns(tx);
  const currentPattern = patternList.find(p => p.id === selectedPattern);
  const Icon = VISUALS[currentPattern.id].icon;
  const Diagram = VISUALS[currentPattern.id].diagram;
  const { story } = currentPattern;

  const tabs = [
    {
      id: 'idea',
      label: tx('La idea', 'The idea'),
      content: (
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed">{currentPattern.summary}</p>
          <Diagram />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-bold text-sm mb-1">{tx('Úsalo cuando', 'Use it when')}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{currentPattern.useWhen}</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-red-400 font-bold text-sm mb-1">{tx('Mejor no, si...', 'Skip it if...')}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{currentPattern.avoidWhen}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'story',
      label: tx('En mi trabajo', 'On the job'),
      content: (
        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 lg:p-6 space-y-4">
          <div>
            <p className="text-purple-300 font-bold">{story.client}</p>
            <p className="text-slate-400 text-xs">{story.project} · {story.years}</p>
          </div>
          <Section title={tx('Contexto', 'Context')}>{story.context}</Section>
          <Section title={tx('El problema', 'The problem')}>{story.problem}</Section>
          <Section title={tx('Lo que hice', 'What I did')}>{story.solution}</Section>
          <Section title={tx('Lo que ganamos', 'What we got')}>{story.payoff}</Section>
        </div>
      ),
    },
    {
      id: 'code',
      label: tx('Código', 'Code'),
      content: <CodeBlock code={currentPattern.code} language="java" />,
    },
    {
      id: 'interview',
      label: tx('En entrevista', 'In the interview'),
      content: (
        <div className="space-y-3">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="text-purple-400 font-bold text-sm mb-1">{tx('Cómo lo contaría', 'How I’d say it')}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">“{currentPattern.pitch}”</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <h4 className="text-amber-300 font-bold text-sm mb-1">{tx('Ojo con esto', 'Watch out')}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{currentPattern.gotcha}</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <h3 className="text-base lg:text-lg font-bold text-purple-400 mb-2 lg:mb-4">
          {t('patterns', language).title}
        </h3>
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
        {patternList.map((pattern) => {
          const PatternIcon = VISUALS[pattern.id].icon;
          return (
            <button
              key={pattern.id}
              onClick={() => setSelectedPattern(pattern.id)}
              className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all flex items-center gap-2 lg:gap-3 ${selectedPattern === pattern.id
                ? 'bg-purple-500/20 border border-purple-500/50 text-purple-300'
                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
            >
              <PatternIcon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm lg:text-base whitespace-nowrap lg:whitespace-normal">{pattern.name}</div>
                <div className="hidden lg:block text-xs opacity-70 line-clamp-1">{categories[pattern.category]}</div>
              </div>
            </button>
          );
        })}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPattern}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                <Icon className="w-10 h-10 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl lg:text-3xl font-bold text-purple-400">{currentPattern.name}</h3>
                <p className="text-slate-400 text-sm">{categories[currentPattern.category]} · {story.client}</p>
              </div>
            </div>

            <Tabs items={tabs} label={currentPattern.name} tx={tx} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Patterns;
