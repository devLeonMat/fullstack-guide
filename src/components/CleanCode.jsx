import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, AlertTriangle, Layers, Shield, Users, Trash2, Zap } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Shared helpers ────────────────────────────────────────────────────────────

const FlowArrow = () => (
  <ArrowRight className="w-4 h-4 text-emerald-400/60 flex-shrink-0" />
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-1">
    <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">{title}</h2>
    <p className="text-slate-400 text-sm">{subtitle}</p>
  </div>
);

const InfoCard = ({ title, color, border, children }) => (
  <div className={`bg-slate-800/30 border ${border} rounded-xl p-4`}>
    <p className={`text-sm font-bold ${color} mb-2`}>{title}</p>
    <p className="text-xs text-slate-400 leading-relaxed">{children}</p>
  </div>
);

// ─── Section 1: Naming Diagram ─────────────────────────────────────────────────

const NamingDiagram = ({ tx }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const pairs = [
    { bad: 'd',          good: 'daysUntilExpiry' },
    { bad: 'tmp',        good: 'temporaryFilePath' },
    { bad: 'data',       good: 'userProfile' },
    { bad: 'flag',       good: 'isAuthenticated' },
    { bad: 'fn',         good: 'calculateTotalPrice' },
    { bad: 'arr',        good: 'activeSubscriptions' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % pairs.length), 1600);
    return () => clearInterval(id);
  }, [pairs.length]);

  return (
    <div className="bg-slate-950/40 border border-emerald-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-emerald-300 uppercase tracking-wider">
        {tx('Nombres: malos vs buenos', 'Names: bad vs good')}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* Bad column */}
        <div className="space-y-1.5">
          <p className="text-center text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">
            {tx('Críptico', 'Cryptic')}
          </p>
          {pairs.map((pair, i) => (
            <motion.div
              key={pair.bad}
              animate={{
                backgroundColor: activeIdx === i ? 'rgba(239,68,68,0.2)' : 'rgba(30,41,59,0.5)',
                borderColor: activeIdx === i ? 'rgba(239,68,68,0.5)' : 'rgba(71,85,105,0.3)',
              }}
              transition={{ duration: 0.3 }}
              className="px-2.5 py-1.5 border rounded-lg text-center font-mono"
            >
              <span className={`text-xs font-semibold ${activeIdx === i ? 'text-red-300' : 'text-slate-500'}`}>
                {pair.bad}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Good column */}
        <div className="space-y-1.5">
          <p className="text-center text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
            {tx('Descriptivo', 'Descriptive')}
          </p>
          {pairs.map((pair, i) => (
            <motion.div
              key={pair.good}
              animate={{
                backgroundColor: activeIdx === i ? 'rgba(52,211,153,0.15)' : 'rgba(30,41,59,0.5)',
                borderColor: activeIdx === i ? 'rgba(52,211,153,0.5)' : 'rgba(71,85,105,0.3)',
              }}
              transition={{ duration: 0.3 }}
              className="px-2.5 py-1.5 border rounded-lg text-center font-mono"
            >
              <span className={`text-[10px] font-semibold ${activeIdx === i ? 'text-emerald-300' : 'text-slate-500'}`}>
                {pair.good}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Section 2: Function Size Diagram ─────────────────────────────────────────

const FunctionSizeDiagram = ({ tx }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(id);
  }, []);

  const bars = [
    { label: '5-10',  lines: tx('5-10 líneas', '5-10 lines'),  score: 95, color: 'bg-emerald-400' },
    { label: '10-20', lines: tx('10-20 líneas', '10-20 lines'), score: 80, color: 'bg-emerald-500' },
    { label: '20-40', lines: tx('20-40 líneas', '20-40 lines'), score: 55, color: 'bg-yellow-400' },
    { label: '40-80', lines: tx('40-80 líneas', '40-80 lines'), score: 30, color: 'bg-orange-400' },
    { label: '80+',   lines: tx('80+ líneas',   '80+ lines'),   score: 10, color: 'bg-red-500' },
  ];

  return (
    <div className="bg-slate-950/40 border border-emerald-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-emerald-300 uppercase tracking-wider">
        {tx('Tamaño de función vs Mantenibilidad', 'Function size vs Maintainability')}
      </p>
      <div className="flex items-end gap-3 justify-center h-28">
        {bars.map(bar => (
          <div key={bar.label} className="flex flex-col items-center gap-1 flex-1">
            <span className="text-[9px] text-slate-400 font-semibold">{bar.score}%</span>
            <div className="w-full bg-slate-800 rounded-t-md overflow-hidden" style={{ height: '80px' }}>
              <motion.div
                className={`w-full ${bar.color} rounded-t-md`}
                initial={{ height: 0 }}
                animate={{ height: mounted ? `${bar.score}%` : 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: bars.indexOf(bar) * 0.1 }}
                style={{ originY: 1 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 flex-wrap">
        {bars.map(bar => (
          <div key={bar.label} className="flex items-center gap-1">
            <span className={`w-2.5 h-2.5 rounded-sm inline-block ${bar.color}`} />
            <span className="text-[10px] text-slate-400">{bar.lines}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-emerald-400 font-medium">
        {tx('Objetivo: funciones de 5-20 líneas', 'Target: functions of 5-20 lines')}
      </p>
    </div>
  );
};

// ─── Section 3: Principles Diagram ────────────────────────────────────────────

const PrinciplesDiagram = ({ tx }) => {
  const [activeCard, setActiveCard] = useState(0);
  const [showFix, setShowFix] = useState(false);

  const principles = [
    {
      acronym: 'DRY',
      full: "Don't Repeat Yourself",
      color: 'text-emerald-300',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      glow: 'rgba(52,211,153,0.3)',
      anti: tx('Código copy-paste sin extraer', 'Copy-paste code without extracting'),
      fix:  tx('Extrae funciones/módulos reutilizables', 'Extract reusable functions/modules'),
    },
    {
      acronym: 'KISS',
      full: 'Keep It Simple',
      color: 'text-sky-300',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      glow: 'rgba(56,189,248,0.3)',
      anti: tx('Solución ingeniosa pero ilegible', 'Clever but unreadable solution'),
      fix:  tx('Prefiere lo obvio y legible', 'Prefer the obvious and readable'),
    },
    {
      acronym: 'YAGNI',
      full: "You Aren't Gonna Need It",
      color: 'text-violet-300',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      glow: 'rgba(167,139,250,0.3)',
      anti: tx('Código para necesidades hipotéticas', 'Code for hypothetical future needs'),
      fix:  tx('Implementa solo lo requerido hoy', 'Implement only what is needed today'),
    },
  ];

  useEffect(() => {
    let tick = 0;
    const id = setInterval(() => {
      tick++;
      if (tick % 2 === 0) {
        setActiveCard(c => (c + 1) % 3);
        setShowFix(false);
      } else {
        setShowFix(true);
      }
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const p = principles[activeCard];

  return (
    <div className="bg-slate-950/40 border border-emerald-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-emerald-300 uppercase tracking-wider">
        {tx('Los 3 Principios Clave', 'The 3 Key Principles')}
      </p>

      <div className="grid grid-cols-3 gap-2">
        {principles.map((pr, i) => (
          <motion.button
            key={pr.acronym}
            onClick={() => { setActiveCard(i); setShowFix(false); }}
            animate={{
              boxShadow: activeCard === i ? `0 0 18px ${pr.glow}` : '0 0 0px transparent',
              borderColor: activeCard === i ? pr.glow.replace('0.3', '0.6') : 'rgba(100,116,139,0.25)',
            }}
            transition={{ duration: 0.35 }}
            className={`p-2.5 border rounded-xl text-center ${activeCard === i ? pr.bg : 'bg-slate-800/30'}`}
          >
            <p className={`text-base font-extrabold ${activeCard === i ? pr.color : 'text-slate-500'}`}>
              {pr.acronym}
            </p>
            <p className="text-[9px] text-slate-500 leading-tight mt-0.5">{pr.full}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCard}-${showFix}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className={`flex items-start gap-2 p-3 rounded-lg border ${
            showFix
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-red-500/10 border-red-500/30'
          }`}
        >
          {showFix
            ? <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            : <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
          }
          <p className={`text-xs ${showFix ? 'text-emerald-200' : 'text-red-200'}`}>
            {showFix ? p.fix : p.anti}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Section 4: Comments Diagram ──────────────────────────────────────────────

const CommentsDiagram = ({ tx }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const items = [
    { good: false, label: tx('Explica QUÉ hace el código (obvio)', 'Explains WHAT code does (obvious)'),          example: '// increment counter by 1' },
    { good: false, label: tx('Comentario redundante del nombre', 'Redundant of the function name'),               example: '// get user → getUser()' },
    { good: false, label: tx('Comentario desactualizado / mentira', 'Outdated / lying comment'),                  example: '// returns string ← returns number' },
    { good: true,  label: tx('Explica POR QUÉ (decisión de negocio)', 'Explains WHY (business decision)'),        example: '// Regulación PCI: no loguear CVV' },
    { good: true,  label: tx('Workaround documentado con ticket', 'Workaround documented with ticket'),           example: '// HACK: ver BUG-4231' },
    { good: true,  label: tx('Invariante no obvia para el lector', 'Non-obvious invariant for the reader'),       example: '// Array siempre ordenado por fecha' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % items.length), 2000);
    return () => clearInterval(id);
  }, [items.length]);

  const item = items[activeIdx];

  return (
    <div className="bg-slate-950/40 border border-emerald-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-emerald-300 uppercase tracking-wider">
        {tx('¿Cuándo comentar?', 'When to comment?')}
      </p>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <p className="text-center text-[10px] font-bold text-red-400 uppercase tracking-wider">
            {tx('Evitar', 'Avoid')}
          </p>
          {items.filter(it => !it.good).map((it, i) => (
            <motion.div
              key={it.example}
              animate={{
                backgroundColor: (!item.good && items.indexOf(item) === items.indexOf(it))
                  ? 'rgba(239,68,68,0.2)'
                  : 'rgba(30,41,59,0.4)',
                borderColor: (!item.good && items.indexOf(item) === items.indexOf(it))
                  ? 'rgba(239,68,68,0.5)'
                  : 'rgba(71,85,105,0.25)',
              }}
              transition={{ duration: 0.3 }}
              className="px-2 py-1.5 border rounded-lg flex items-start gap-1.5"
            >
              <XCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
              <span className="text-[9px] text-slate-400 leading-tight">{it.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="space-y-1.5">
          <p className="text-center text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
            {tx('Justificado', 'Justified')}
          </p>
          {items.filter(it => it.good).map((it, i) => (
            <motion.div
              key={it.example}
              animate={{
                backgroundColor: (item.good && items.indexOf(item) === items.indexOf(it))
                  ? 'rgba(52,211,153,0.15)'
                  : 'rgba(30,41,59,0.4)',
                borderColor: (item.good && items.indexOf(item) === items.indexOf(it))
                  ? 'rgba(52,211,153,0.5)'
                  : 'rgba(71,85,105,0.25)',
              }}
              transition={{ duration: 0.3 }}
              className="px-2 py-1.5 border rounded-lg flex items-start gap-1.5"
            >
              <CheckCircle className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="text-[9px] text-slate-400 leading-tight">{it.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25 }}
          className={`text-center font-mono text-xs px-3 py-2 rounded-lg border ${
            item.good
              ? 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25'
              : 'text-red-300 bg-red-500/10 border-red-500/25'
          }`}
        >
          {item.example}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Section 5: Refactoring Flow Diagram ──────────────────────────────────────

const RefactoringFlow = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: tx('Detectar smell', 'Detect smell'),           desc: tx('Identifica el problema: código largo, duplicado, números mágicos', 'Identify the problem: long code, duplicated, magic numbers') },
    { label: tx('Entender', 'Understand'),                   desc: tx('Lee el código existente, los tests y el contexto de negocio', 'Read existing code, tests and business context') },
    { label: tx('Extraer / Renombrar', 'Extract / Rename'), desc: tx('Aplica el refactor mínimo: Extract Method, rename, simplify', 'Apply minimal refactor: Extract Method, rename, simplify') },
    { label: tx('Verificar tests', 'Verify tests'),         desc: tx('Ejecuta la suite completa. El comportamiento no debe cambiar', 'Run full test suite. Behavior must not change') },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 1500);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div className="bg-slate-950/40 border border-emerald-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-emerald-300 uppercase tracking-wider">
        {tx('Pipeline de Refactoring', 'Refactoring Pipeline')}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          const isPast = i < activeStep;
          return (
            <div key={step.label} className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  backgroundColor: isActive
                    ? 'rgba(52,211,153,0.2)'
                    : isPast
                    ? 'rgba(52,211,153,0.08)'
                    : 'rgba(15,23,42,0.6)',
                  borderColor: isActive
                    ? 'rgba(52,211,153,0.6)'
                    : isPast
                    ? 'rgba(52,211,153,0.3)'
                    : 'rgba(100,116,139,0.3)',
                }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-1 px-3 py-2 border rounded-lg min-w-[72px]"
              >
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] font-bold text-center leading-tight ${
                    isActive ? 'text-emerald-300' : isPast ? 'text-emerald-400/60' : 'text-slate-500'
                  }`}>
                    {i + 1}
                  </span>
                  {isActive && (
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
                    />
                  )}
                </div>
                <span className={`text-[9px] font-semibold text-center leading-tight ${
                  isActive ? 'text-emerald-300' : isPast ? 'text-emerald-400/60' : 'text-slate-500'
                }`}>
                  {step.label}
                </span>
              </motion.div>
              {i < steps.length - 1 && <FlowArrow />}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={activeStep}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25 }}
          className="text-center text-xs text-emerald-400 min-h-[2rem] px-2"
        >
          {steps[activeStep].desc}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Section 6: Interactive Checklist ─────────────────────────────────────────

const ChecklistSection = ({ tx }) => {
  const groups = [
    {
      category: tx('Nomenclatura', 'Naming'),
      items: [
        tx('Variables revelan intención (no abreviaturas crípticas)', 'Variables reveal intent (no cryptic abbreviations)'),
        tx('Funciones tienen verbo en el nombre (get, save, validate...)', 'Functions have a verb in their name (get, save, validate...)'),
        tx('Booleanos usan prefijo is/has/can/should', 'Booleans use is/has/can/should prefix'),
        tx('Clases son sustantivos, no verbos', 'Classes are nouns, not verbs'),
      ],
    },
    {
      category: tx('Funciones', 'Functions'),
      items: [
        tx('Cada función hace una sola cosa', 'Each function does one thing only'),
        tx('Funciones < 20 líneas (salvo casos justificados)', 'Functions < 20 lines (except justified cases)'),
        tx('Máximo 3 parámetros; desestructura objetos si hay más', 'Max 3 parameters; destructure objects if more needed'),
        tx('Sin efectos secundarios ocultos (funciones puras donde sea posible)', 'No hidden side effects (pure functions where possible)'),
      ],
    },
    {
      category: tx('Comentarios', 'Comments'),
      items: [
        tx('El código no necesita comentarios para entenderse', 'Code does not need comments to be understood'),
        tx('Los comentarios explican el POR QUÉ, no el QUÉ', 'Comments explain the WHY, not the WHAT'),
        tx('Todos los TODOs tienen número de ticket asociado', 'All TODOs have an associated ticket number'),
      ],
    },
    {
      category: tx('Tests', 'Tests'),
      items: [
        tx('Cada función pública tiene al menos un test', 'Every public function has at least one test'),
        tx('Los tests son legibles y tienen nombres descriptivos', 'Tests are readable with descriptive names'),
        tx('Tests cubren casos límite (null, vacío, error)', 'Tests cover edge cases (null, empty, error)'),
      ],
    },
    {
      category: tx('Manejo de errores', 'Error Handling'),
      items: [
        tx('No se silencian errores con catch vacíos', 'Errors are not silenced with empty catches'),
        tx('Los errores tienen mensajes descriptivos para el debugger', 'Errors have descriptive messages for debugging'),
        tx('Inputs externos son validados antes de procesarse', 'External inputs are validated before processing'),
        tx('No hay números mágicos sin constante nombrada', 'No magic numbers without a named constant'),
      ],
    },
  ];

  const allItems = groups.flatMap(g => g.items);
  const [checked, setChecked] = useState(() => Array(allItems.length).fill(false));

  const totalChecked = checked.filter(Boolean).length;
  const percentage = Math.round((totalChecked / allItems.length) * 100);

  const toggleItem = (globalIdx) => {
    setChecked(prev => {
      const next = [...prev];
      next[globalIdx] = !next[globalIdx];
      return next;
    });
  };

  let globalIdx = 0;

  const scoreColor =
    percentage === 100 ? 'text-emerald-400' :
    percentage >= 70   ? 'text-sky-400'     :
    percentage >= 40   ? 'text-yellow-400'  :
                         'text-red-400';

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div className="bg-slate-950/40 border border-emerald-500/20 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
            {tx('Progreso de revisión', 'Review progress')}
          </p>
          <span className={`text-lg font-extrabold ${scoreColor}`}>
            {percentage}%
          </span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>
        <p className="text-xs text-slate-400">
          {totalChecked} / {allItems.length} {tx('elementos completados', 'items completed')}
          {percentage === 100 && (
            <span className="ml-2 text-emerald-400 font-semibold">
              {tx('¡Listo para revisión!', 'Ready for review!')}
            </span>
          )}
        </p>
      </div>

      {/* Checklist groups */}
      {groups.map(group => (
        <div key={group.category} className="bg-slate-900/40 border border-slate-700/40 rounded-xl p-4 space-y-2">
          <p className="text-sm font-bold text-emerald-400 mb-3">{group.category}</p>
          {group.items.map(item => {
            const idx = globalIdx++;
            const isChecked = checked[idx];
            return (
              <label
                key={idx}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className={`mt-0.5 w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-slate-600 group-hover:border-emerald-500/60'
                  }`}
                >
                  {isChecked && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </button>
                <span
                  className={`text-xs leading-relaxed transition-colors ${
                    isChecked ? 'text-emerald-300 line-through' : 'text-slate-300 group-hover:text-slate-100'
                  }`}
                >
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

function CleanCode() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('naming');

  const sections = [
    {
      id: 'naming',
      title: tx('Nombres', 'Naming'),
      subtitle: tx('Variables, funciones y clases', 'Variables, functions and classes'),
    },
    {
      id: 'functions',
      title: tx('Funciones', 'Functions'),
      subtitle: tx('Pequeñas, puras y con un propósito', 'Small, pure and purposeful'),
    },
    {
      id: 'dry',
      title: 'DRY / KISS / YAGNI',
      subtitle: tx('Los 3 principios clave', 'The 3 key principles'),
    },
    {
      id: 'comments',
      title: tx('Comentarios', 'Comments'),
      subtitle: tx('Cuándo escribir (y NO escribir) comentarios', 'When to write (and NOT write) comments'),
    },
    {
      id: 'refactoring',
      title: 'Refactoring',
      subtitle: tx('Code smells y cómo eliminarlos', 'Code smells and how to fix them'),
    },
    {
      id: 'formatting',
      title: tx('Formato', 'Formatting'),
      subtitle: tx('Densidad vertical & horizontal', 'Vertical & horizontal density'),
    },
    {
      id: 'errors',
      title: tx('Errores', 'Error Handling'),
      subtitle: tx('Excepciones, null y fail fast', 'Exceptions, null & fail fast'),
    },
    {
      id: 'abstractions',
      title: tx('Abstracciones', 'Abstractions'),
      subtitle: tx('SLAP, Ley de Demeter, Tell Don\'t Ask', 'SLAP, Law of Demeter, Tell Don\'t Ask'),
    },
    {
      id: 'classes',
      title: tx('Clases', 'Classes'),
      subtitle: tx('Cohesión, tamaño y SRP', 'Cohesion, size and SRP'),
    },
    {
      id: 'boyscout',
      title: tx('Boy Scout & Límites', 'Boy Scout & Boundaries'),
      subtitle: tx('Código muerto, 3rd party, concurrencia', 'Dead code, 3rd party, concurrency'),
    },
    {
      id: 'checklist',
      title: 'Checklist',
      subtitle: tx('¿Tu código está listo para revisión?', 'Is your code ready for review?'),
    },
  ];

  // ─── Section renderers ──────────────────────────────────────────────────────

  const renderNaming = () => (
    <div className="space-y-6">
      <SectionTitle
        title={tx('Nombres Significativos', 'Meaningful Names')}
        subtitle={tx(
          'Un buen nombre elimina la necesidad de un comentario. El código debe leerse como prosa.',
          'A good name eliminates the need for a comment. Code should read like prose.'
        )}
      />

      <NamingDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          title={tx('Variables: revela la intención', 'Variables: reveal intent')}
          color="text-emerald-300"
          border="border-emerald-500/20"
        >
          {tx(
            'Usa nombres que respondan por qué existe y qué hace. Evita abreviaturas (d, tmp, arr). Incluye unidades si aplica: durationMs, heightPx, retryCount.',
            'Use names that answer why it exists and what it does. Avoid abbreviations (d, tmp, arr). Include units where applicable: durationMs, heightPx, retryCount.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Funciones: usa verbos específicos', 'Functions: use specific verbs')}
          color="text-sky-300"
          border="border-sky-500/20"
        >
          {tx(
            'Empieza con un verbo que describa la acción exacta: getUserById, validateEmail, parseJwt, sendWelcomeEmail. Evita nombres vagos como process, handle, manage.',
            'Start with a verb describing the exact action: getUserById, validateEmail, parseJwt, sendWelcomeEmail. Avoid vague names like process, handle, manage.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Clases: sustantivos en PascalCase', 'Classes: nouns in PascalCase')}
          color="text-violet-300"
          border="border-violet-500/20"
        >
          {tx(
            'Las clases representan entidades: User, OrderService, PaymentGateway. Evita sufijos genéricos como Manager, Processor, Handler, Helper a menos que sean precisos.',
            'Classes represent entities: User, OrderService, PaymentGateway. Avoid generic suffixes like Manager, Processor, Handler, Helper unless precise.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Booleanos: is/has/can/should', 'Booleans: is/has/can/should')}
          color="text-orange-300"
          border="border-orange-500/20"
        >
          {tx(
            'Prefijos que generan frases naturales: isLoading, hasPermission, canDelete, shouldRetry. Evita invertidos (notFound → isNotFound confunde; mejor isFound).',
            'Prefixes that form natural phrases: isLoading, hasPermission, canDelete, shouldRetry. Avoid inverted names (notFound → isNotFound confuses; better isFound).'
          )}
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400">{tx('Malo', 'Bad')}</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`// ❌ Nombres crípticos
let d = new Date();
let arr = [];
let flag = false;

function calc(a, b, t) {
  if (t === 1) return a + b;
  if (t === 2) return a - b;
  return a * b;
}

class DataProcessor {
  handle(x) { /* ... */ }
}`}
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">{tx('Bueno', 'Good')}</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`// ✅ Nombres que revelan intención
let createdAt = new Date();
let activeUsers = [];
let isAuthenticated = false;

function calculatePrice(baseAmount, taxRate, operation) {
  if (operation === 'add')      return baseAmount + taxRate;
  if (operation === 'subtract') return baseAmount - taxRate;
  return baseAmount * taxRate;
}

class InvoiceGenerator {
  generateForOrder(order) { /* ... */ }
}`}
          />
        </div>
      </div>
    </div>
  );

  const renderFunctions = () => (
    <div className="space-y-6">
      <SectionTitle
        title={tx('Funciones Limpias', 'Clean Functions')}
        subtitle={tx(
          'Una función debe hacer una cosa, hacerla bien y solo esa cosa. — Robert C. Martin',
          'A function should do one thing, do it well and do it only. — Robert C. Martin'
        )}
      />

      <FunctionSizeDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          title={tx('Responsabilidad única', 'Single Responsibility')}
          color="text-emerald-300"
          border="border-emerald-500/20"
        >
          {tx(
            'Si necesitas usar "y" para describir lo que hace una función, tiene demasiadas responsabilidades. Extrae las partes en funciones separadas.',
            'If you need to use "and" to describe what a function does, it has too many responsibilities. Extract the parts into separate functions.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Tamaño ideal: < 20 líneas', 'Ideal size: < 20 lines')}
          color="text-sky-300"
          border="border-sky-500/20"
        >
          {tx(
            'Funciones cortas son más fáciles de entender, testear y reutilizar. Si una función supera 20 líneas, suele ser señal de que puede dividirse.',
            'Short functions are easier to understand, test and reuse. If a function exceeds 20 lines, it is often a sign it can be split.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Máximo 3 parámetros', 'Maximum 3 parameters')}
          color="text-violet-300"
          border="border-violet-500/20"
        >
          {tx(
            'Con más de 3 parámetros, usa un objeto de configuración. Permite valores por defecto, es más legible y facilita la extensión futura.',
            'With more than 3 parameters, use a configuration object. Enables defaults, is more readable and easier to extend in the future.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Separación comando / consulta', 'Command / Query Separation')}
          color="text-orange-300"
          border="border-orange-500/20"
        >
          {tx(
            'Una función o bien devuelve datos (query) o bien cambia el estado (command), nunca ambos. getUserById devuelve; saveUser guarda. No mezcles.',
            'A function either returns data (query) or changes state (command), never both. getUserById returns; saveUser saves. Do not mix them.'
          )}
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400">{tx('Malo', 'Bad')}</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`// ❌ Función que hace demasiado
function processUserRegistration(name, email, password,
  role, sendEmail, saveToDb, logAction) {
  const hash = bcrypt.hashSync(password, 10);
  const user = { name, email, password: hash, role };
  if (!name || !email) return null;
  if (saveToDb) db.users.insert(user);
  if (sendEmail) mailer.send({ to: email, template: 'welcome' });
  if (logAction) logger.info('User registered', { email });
  return user;
}`}
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">{tx('Bueno', 'Good')}</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`// ✅ Funciones pequeñas con un propósito
function hashPassword(plainText) {
  return bcrypt.hashSync(plainText, 10);
}

function buildUser({ name, email, password, role }) {
  if (!name || !email) throw new Error('Name and email required');
  return { name, email, password: hashPassword(password), role };
}

async function registerUser(userData) {
  const user = buildUser(userData);
  await db.users.insert(user);
  await mailer.sendWelcome(user.email);
  logger.info('User registered', { email: user.email });
  return user;
}`}
          />
        </div>
      </div>
    </div>
  );

  const renderDry = () => (
    <div className="space-y-6">
      <SectionTitle
        title="DRY / KISS / YAGNI"
        subtitle={tx(
          'Tres principios que guían decisiones de diseño cotidianas en el código.',
          'Three principles that guide everyday design decisions in code.'
        )}
      />

      <PrinciplesDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard
          title="DRY — Don't Repeat Yourself"
          color="text-emerald-300"
          border="border-emerald-500/20"
        >
          {tx(
            'Cada pieza de conocimiento debe tener una representación única en el sistema. La duplicación multiplica el coste del cambio. Extrae funciones, módulos y constantes.',
            'Every piece of knowledge must have a single representation in the system. Duplication multiplies the cost of change. Extract functions, modules and constants.'
          )}
        </InfoCard>
        <InfoCard
          title="KISS — Keep It Simple"
          color="text-sky-300"
          border="border-sky-500/20"
        >
          {tx(
            'El código más simple suele ser el más correcto. Evita abstracciones prematuras. Prefiere una condición clara sobre un operador bit a bit ingenioso.',
            'The simplest code is usually the most correct. Avoid premature abstractions. Prefer a clear condition over a clever bitwise operator.'
          )}
        </InfoCard>
        <InfoCard
          title="YAGNI — You Aren't Gonna Need It"
          color="text-violet-300"
          border="border-violet-500/20"
        >
          {tx(
            'No construyas funcionalidad que no se necesita hoy. El código especulativo añade complejidad real por valor hipotético. Borrarlo más tarde es costoso.',
            'Do not build functionality not needed today. Speculative code adds real complexity for hypothetical value. Deleting it later is expensive.'
          )}
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400">{tx('Anti-patrones', 'Anti-patterns')}</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`// ❌ DRY violado: lógica duplicada
function validateUserEmail(email) {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email);
}
function checkAdminEmail(email) {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email); // misma regex copiada
}

// ❌ KISS violado: innecesariamente complejo
const isEven = n => (n & 1) === 0 ? true : false;

// ❌ YAGNI: preparado para "futuras" necesidades
class User {
  constructor(name) {
    this.name = name;
    this.preferences = {};    // "por si acaso"
    this.auditLog = [];       // "tal vez lo necesitemos"
    this.featureFlags = {};   // "para el futuro"
  }
}`}
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">{tx('Aplicando los principios', 'Applying the principles')}</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`// ✅ DRY: una sola fuente de verdad
const EMAIL_REGEX = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
const isValidEmail = (email) => EMAIL_REGEX.test(email);

// Reutilizada en todo el sistema:
validateUserEmail(email)  // → isValidEmail(email)
checkAdminEmail(email)    // → isValidEmail(email)

// ✅ KISS: simple y obvio
const isEven = n => n % 2 === 0;

// ✅ YAGNI: solo lo que se necesita hoy
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    // Se añaden más campos cuando se necesiten
  }
}`}
          />
        </div>
      </div>
    </div>
  );

  const renderComments = () => (
    <div className="space-y-6">
      <SectionTitle
        title={tx('Comentarios: Cuándo y Cómo', 'Comments: When and How')}
        subtitle={tx(
          'El mejor comentario es el que no necesitas escribir porque el código ya se explica solo.',
          'The best comment is the one you do not need to write because the code already explains itself.'
        )}
      />

      <CommentsDiagram tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          title={tx('Código auto-documentado primero', 'Self-documenting code first')}
          color="text-emerald-300"
          border="border-emerald-500/20"
        >
          {tx(
            'Antes de añadir un comentario, pregúntate si puedes renombrar la variable o función para que el comentario sea innecesario. Suele ser posible.',
            'Before adding a comment, ask yourself if you can rename the variable or function so the comment becomes unnecessary. It is usually possible.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Comenta el POR QUÉ, no el QUÉ', 'Comment the WHY, not the WHAT')}
          color="text-sky-300"
          border="border-sky-500/20"
        >
          {tx(
            'El código dice qué hace. El comentario debe explicar por qué se tomó una decisión no obvia: regla de negocio, workaround de un bug externo, restricción de rendimiento.',
            'Code tells what it does. Comments should explain why a non-obvious decision was made: business rule, workaround for external bug, performance constraint.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Workarounds y tickets', 'Workarounds and tickets')}
          color="text-yellow-300"
          border="border-yellow-500/20"
        >
          {tx(
            'Si haces un hack temporal, documenta el porqué y enlaza el ticket: // HACK: ver ISSUE-1234. Esto convierte deuda técnica en deuda gestionada.',
            'If you write a temporary hack, document why and link the ticket: // HACK: see ISSUE-1234. This turns technical debt into managed debt.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('JSDoc para APIs públicas', 'JSDoc for public APIs')}
          color="text-violet-300"
          border="border-violet-500/20"
        >
          {tx(
            'Los comentarios de documentación (JSDoc, TSDoc) sí tienen valor para APIs públicas o librerías. Describen parámetros, retornos y casos de error para los consumidores.',
            'Documentation comments (JSDoc, TSDoc) have value for public APIs or libraries. They describe parameters, returns and error cases for consumers.'
          )}
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400">{tx('Comentarios que no ayudan', 'Comments that do not help')}</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`// ❌ Ruido: explica lo obvio
// Incrementa el contador
counter++;

// ❌ Redundante del nombre
// Obtiene el usuario
function getUser(id) { ... }

// ❌ Código comentado (usa git para esto)
// function oldCalculate(a, b) {
//   return a + b + 10;
// }

// ❌ Comentario desactualizado / mentira
// Returns a string
function getCount() {
  return 42; // devuelve un número, no string
}`}
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">{tx('Comentarios que aportan valor', 'Comments that add value')}</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`// ✅ Explica una regla de negocio no obvia
// PCI-DSS 3.4: los datos de tarjeta no pueden
// persistir en logs bajo ninguna circunstancia
logger.info({ userId }, 'Payment processed');

// ✅ Workaround documentado con ticket
// HACK: Safari < 16 no soporta ResizeObserver en iframes
// Eliminar cuando soportemos Safari 16+ (ver ISSUE-891)
if (isSafariBefore16) { ... }

// ✅ JSDoc para API pública
/**
 * Calcula el descuento aplicable a un pedido.
 * @param {number} subtotal - Importe antes de descuentos (EUR)
 * @param {string} couponCode - Código promocional opcional
 * @returns {number} Porcentaje de descuento (0-100)
 * @throws {InvalidCouponError} Si el cupón está caducado
 */
function calculateDiscount(subtotal, couponCode) { ... }`}
          />
        </div>
      </div>
    </div>
  );

  const renderRefactoring = () => (
    <div className="space-y-6">
      <SectionTitle
        title={tx('Refactoring y Code Smells', 'Refactoring and Code Smells')}
        subtitle={tx(
          'Refactorizar es mejorar la estructura interna del código sin cambiar su comportamiento externo.',
          'Refactoring is improving the internal structure of code without changing its external behavior.'
        )}
      />

      <RefactoringFlow tx={tx} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoCard
          title={tx('Code smells comunes', 'Common code smells')}
          color="text-emerald-300"
          border="border-emerald-500/20"
        >
          {tx(
            'Método largo, clase grande, grupos de datos (data clumps), números mágicos, código muerto, código duplicado, lista de parámetros larga, comentarios de sección.',
            'Long method, large class, data clumps, magic numbers, dead code, duplicated code, long parameter list, section comments.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Extract Method', 'Extract Method')}
          color="text-sky-300"
          border="border-sky-500/20"
        >
          {tx(
            'El refactor más frecuente: extrae un bloque con un nombre descriptivo. Cada extracción reduce la complejidad cognitiva y hace el código más testeable.',
            'The most frequent refactor: extract a block with a descriptive name. Each extraction reduces cognitive complexity and makes code more testable.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Constantes con nombre', 'Named constants')}
          color="text-violet-300"
          border="border-violet-500/20"
        >
          {tx(
            'Replace Magic Number with Symbolic Constant. Los números solos no transmiten significado. MAX_RETRY_ATTEMPTS = 3 explica el contexto; 3 no lo hace.',
            'Replace Magic Number with Symbolic Constant. Numbers alone convey no meaning. MAX_RETRY_ATTEMPTS = 3 explains the context; 3 does not.'
          )}
        </InfoCard>
        <InfoCard
          title={tx('Regla del boy scout', 'Boy Scout Rule')}
          color="text-orange-300"
          border="border-orange-500/20"
        >
          {tx(
            'Deja el código un poco más limpio de como lo encontraste. No necesitas refactorizar todo el módulo: renombra una variable, extrae una función, borra código muerto.',
            'Leave the code a little cleaner than you found it. You do not need to refactor the whole module: rename a variable, extract a function, delete dead code.'
          )}
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400">{tx('Antes del refactor', 'Before refactoring')}</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`// ❌ Code smells: números mágicos,
//    método largo, código duplicado
function processOrder(order) {
  if (order.items.length === 0) return null;

  let total = 0;
  for (const item of order.items) {
    total += item.price * item.qty;
  }

  let discount = 0;
  if (total > 100) discount = total * 0.1;
  if (total > 500) discount = total * 0.2;
  if (total > 1000) discount = total * 0.3;

  const tax = (total - discount) * 0.21;
  const shipping = total > 50 ? 0 : 4.99;

  return {
    subtotal: total,
    discount,
    tax,
    shipping,
    grandTotal: total - discount + tax + shipping,
  };
}`}
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400">{tx('Después del refactor', 'After refactoring')}</span>
          </div>
          <CodeBlock
            language="javascript"
            code={`// ✅ Refactorizado: constantes, Extract Method
const TAX_RATE            = 0.21;
const FREE_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING   = 4.99;
const DISCOUNT_TIERS = [
  { threshold: 1000, rate: 0.30 },
  { threshold: 500,  rate: 0.20 },
  { threshold: 100,  rate: 0.10 },
];

function calculateSubtotal(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function calculateDiscount(subtotal) {
  const tier = DISCOUNT_TIERS.find(t => subtotal > t.threshold);
  return tier ? subtotal * tier.rate : 0;
}

function calculateShipping(subtotal) {
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
}

function processOrder({ items }) {
  if (items.length === 0) return null;
  const subtotal = calculateSubtotal(items);
  const discount = calculateDiscount(subtotal);
  const taxable  = subtotal - discount;
  const tax      = taxable * TAX_RATE;
  const shipping = calculateShipping(subtotal);
  return { subtotal, discount, tax, shipping,
           grandTotal: taxable + tax + shipping };
}`}
          />
        </div>
      </div>
    </div>
  );

  const renderChecklist = () => (
    <div className="space-y-6">
      <SectionTitle
        title={tx('Checklist de Revisión de Código', 'Code Review Checklist')}
        subtitle={tx(
          'Marca cada punto antes de abrir un pull request. El porcentaje se actualiza en tiempo real.',
          'Check each point before opening a pull request. The percentage updates in real time.'
        )}
      />
      <ChecklistSection tx={tx} />
    </div>
  );

  // ─── Formatting ────────────────────────────────────────────────────────────

  const renderFormatting = () => (
    <div className="space-y-6">
      <SectionTitle
        title={tx('Formato del Código', 'Code Formatting')}
        subtitle={tx('El formato comunica. Un estilo consistente reduce la carga cognitiva.', 'Formatting communicates. Consistent style reduces cognitive load.')}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            title: tx('Metáfora del periódico', 'Newspaper Metaphor'),
            color: 'text-emerald-300', border: 'border-emerald-500/30 bg-emerald-500/5',
            items: [
              tx('El nombre del archivo debe decir de qué trata', 'The filename should tell you what it\'s about'),
              tx('Las partes más importantes van arriba', 'The most important parts go at the top'),
              tx('Los detalles van bajando hacia el final', 'Details descend to the bottom'),
              tx('Cada sección es independiente y legible', 'Each section is independent and readable'),
            ],
          },
          {
            title: tx('Densidad vertical', 'Vertical Density'),
            color: 'text-cyan-300', border: 'border-cyan-500/30 bg-cyan-500/5',
            items: [
              tx('Líneas en blanco separan conceptos distintos', 'Blank lines separate distinct concepts'),
              tx('Código relacionado va junto, sin espacios', 'Related code stays together without gaps'),
              tx('Una línea en blanco entre métodos', 'One blank line between methods'),
              tx('Evita pantallas de scroll innecesarias', 'Avoid unnecessary scrolling'),
            ],
          },
          {
            title: tx('Densidad horizontal', 'Horizontal Density'),
            color: 'text-blue-300', border: 'border-blue-500/30 bg-blue-500/5',
            items: [
              tx('Máximo 120 caracteres por línea (configurable en linter)', 'Max 120 characters per line (linter-configurable)'),
              tx('Los espacios alrededor de operadores muestran precedencia', 'Spaces around operators show precedence'),
              tx('No alinear variables manualmente: se desincroniza', 'Don\'t manually align variables: they fall out of sync'),
              tx('Indentación consistente (2 o 4 espacios, no tabs)', 'Consistent indentation (2 or 4 spaces, not tabs)'),
            ],
          },
          {
            title: tx('Herramientas de formato', 'Formatting Tools'),
            color: 'text-teal-300', border: 'border-teal-500/30 bg-teal-500/5',
            items: [
              tx('Prettier: formatea automáticamente (JS/TS/CSS)', 'Prettier: auto-formats (JS/TS/CSS)'),
              tx('ESLint: detecta problemas de estilo y bugs', 'ESLint: detects style issues and bugs'),
              tx('Black / Ruff (Python), ktlint (Kotlin), gofmt (Go)', 'Black / Ruff (Python), ktlint (Kotlin), gofmt (Go)'),
              tx('Configura en CI: el equipo no debate estilo manualmente', 'Configure in CI: the team doesn\'t debate style manually'),
            ],
          },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 ${card.color}`}>{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="javascript" code={`// ❌ Sin formato — difícil de leer
function calc(a,b,c){const r=a*b+c;if(r>100){return r}else{return 0}}

// ✅ Con formato — legible
function calculateBonus(salary, multiplier, bonus) {
  const total = salary * multiplier + bonus;

  if (total > 100) {
    return total;
  }

  return 0;
}

// ❌ Densidad vertical incorrecta
function process(items) {
  const result = [];

  for (const item of items) {

    if (item.active) {

      result.push(item.value);

    }

  }

  return result;
}

// ✅ Densidad correcta
function process(items) {
  const result = [];
  for (const item of items) {
    if (item.active) {
      result.push(item.value);
    }
  }
  return result;
}`} />
    </div>
  );

  // ─── Error Handling ─────────────────────────────────────────────────────────

  const renderErrors = () => (
    <div className="space-y-6">
      <SectionTitle
        title={tx('Manejo de Errores', 'Error Handling')}
        subtitle={tx('Los errores son parte del dominio. Tratalos con la misma limpieza que el código normal.', 'Errors are part of the domain. Handle them with the same cleanliness as normal code.')}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            title: tx('Excepciones > códigos de retorno', 'Exceptions > return codes'),
            icon: <AlertTriangle className="w-4 h-4" />, color: 'text-amber-300', border: 'border-amber-500/30 bg-amber-500/5',
            items: [
              tx('Devolver -1 o null como error obliga al llamante a comprobar', 'Returning -1 or null as error forces caller to check'),
              tx('Las excepciones separan el flujo feliz del manejo de errores', 'Exceptions separate happy path from error handling'),
              tx('Usa excepciones tipadas: DatabaseException, not Exception', 'Use typed exceptions: DatabaseException, not Exception'),
              tx('El catch debe ser específico, nunca catch(Exception e) {}', 'The catch should be specific, never catch(Exception e) {}'),
            ],
          },
          {
            title: tx('No devuelvas null', 'Don\'t Return Null'),
            icon: <XCircle className="w-4 h-4" />, color: 'text-red-300', border: 'border-red-500/30 bg-red-500/5',
            items: [
              tx('Null como retorno obliga al llamante a comprobar: NullPointerException', 'Null return forces caller to check: NullPointerException'),
              tx('Devuelve Optional<T> (Java), T | null tipado (TS), [] para listas', 'Return Optional<T> (Java), typed T | null (TS), [] for lists'),
              tx('Null Object Pattern: devuelve un objeto vacío con comportamiento neutral', 'Null Object Pattern: return empty object with neutral behavior'),
              tx('Tampoco pases null como argumento', 'Also don\'t pass null as argument'),
            ],
          },
          {
            title: tx('Fail Fast', 'Fail Fast'),
            icon: <Zap className="w-4 h-4 text-yellow-400" />, color: 'text-yellow-300', border: 'border-yellow-500/30 bg-yellow-500/5',
            items: [
              tx('Valida inputs al inicio de la función (guard clauses)', 'Validate inputs at function start (guard clauses)'),
              tx('Lanza excepción tan pronto como detectes el error', 'Throw exception as soon as you detect the error'),
              tx('No propagues estados inválidos; falla rápido y con claridad', 'Don\'t propagate invalid state; fail fast and clearly'),
              tx('Los errores silenciosos (swallowed exceptions) son los más peligrosos', 'Silent errors (swallowed exceptions) are the most dangerous'),
            ],
          },
          {
            title: tx('Contexto en los errores', 'Error Context'),
            icon: <Shield className="w-4 h-4 text-blue-400" />, color: 'text-blue-300', border: 'border-blue-500/30 bg-blue-500/5',
            items: [
              tx('El mensaje de error debe decir QUÉ falló, DÓNDE y POR QUÉ', 'Error message must say WHAT failed, WHERE and WHY'),
              tx('Incluye el valor que causó el error: "Invalid age: -5"', 'Include the value that caused the error: "Invalid age: -5"'),
              tx('Loguea el stack trace, no solo el mensaje', 'Log the stack trace, not just the message'),
              tx('Diferencia errores de dominio (404) de errores de sistema (500)', 'Differentiate domain errors (404) from system errors (500)'),
            ],
          },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 flex items-center gap-2 ${card.color}`}>{card.icon}{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowRight className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="typescript" code={`// ❌ Código de retorno — obliga al llamante a comprobar
function findUser(id: string): User | null {
  const user = db.find(id);
  if (!user) return null;    // ← el llamante puede olvidar comprobar
  return user;
}
const user = findUser('123');
user.email;  // 💥 TypeError si user es null

// ✅ Excepción tipada — clara y explícita
function findUser(id: string): User {
  const user = db.find(id);
  if (!user) throw new UserNotFoundException(\`User \${id} not found\`);
  return user;
}

// ✅ Guard clauses — fail fast al inicio
function processPayment(amount: number, userId: string): void {
  if (amount <= 0) throw new InvalidAmountError(\`Amount must be > 0, got \${amount}\`);
  if (!userId)    throw new Error('userId is required');

  // lógica limpia a partir de aquí, sabemos que los inputs son válidos
  const user = findUser(userId);
  charge(user, amount);
}

// ✅ No devuelvas null — devuelve lista vacía
function getOrders(userId: string): Order[] {
  return db.orders.filter(o => o.userId === userId) ?? [];  // nunca null
}`} />
    </div>
  );

  // ─── Abstractions ───────────────────────────────────────────────────────────

  const renderAbstractions = () => (
    <div className="space-y-6">
      <SectionTitle
        title={tx('Abstracciones y Niveles', 'Abstractions and Levels')}
        subtitle={tx('El código de alta calidad mezcla un solo nivel de abstracción a la vez.', 'High quality code mixes only one level of abstraction at a time.')}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            title: tx('SLAP — Single Level of Abstraction', 'SLAP — Single Level of Abstraction'),
            color: 'text-emerald-300', border: 'border-emerald-500/30 bg-emerald-500/5',
            items: [
              tx('Una función no debe mezclar alto nivel con detalles de implementación', 'A function must not mix high level with implementation details'),
              tx('Si entra en detalles, extrae esa lógica a una función con nombre', 'If it dives into detail, extract that logic to a named function'),
              tx('El nivel de abstracción = el nivel de las palabras que usas', 'Abstraction level = the level of words you use'),
              tx('processOrder() → validateOrder(), chargeUser(), sendConfirmation()', 'processOrder() → validateOrder(), chargeUser(), sendConfirmation()'),
            ],
          },
          {
            title: tx('Ley de Demeter', 'Law of Demeter'),
            color: 'text-cyan-300', border: 'border-cyan-500/30 bg-cyan-500/5',
            items: [
              tx('Un objeto solo habla con sus amigos directos, no con extraños', 'An object only talks to its direct friends, not strangers'),
              tx('❌ user.getAddress().getCity().getZipCode() — "train wreck"', '❌ user.getAddress().getCity().getZipCode() — "train wreck"'),
              tx('✅ user.getZipCode() — delega la navegación al objeto', '✅ user.getZipCode() — delegates navigation to the object'),
              tx('Reduce acoplamiento: cambiar Address no rompe el código cliente', 'Reduces coupling: changing Address doesn\'t break client code'),
            ],
          },
          {
            title: tx('Tell, Don\'t Ask', 'Tell, Don\'t Ask'),
            color: 'text-blue-300', border: 'border-blue-500/30 bg-blue-500/5',
            items: [
              tx('No preguntes el estado de un objeto para tomar decisiones por él', 'Don\'t ask an object\'s state to make decisions for it'),
              tx('❌ if (account.getBalance() > 0) { account.debit(amount); }', '❌ if (account.getBalance() > 0) { account.debit(amount); }'),
              tx('✅ account.debit(amount) — el objeto sabe si puede debitar', '✅ account.debit(amount) — the object knows if it can debit'),
              tx('Promueve encapsulación real: el comportamiento vive con los datos', 'Promotes real encapsulation: behavior lives with data'),
            ],
          },
          {
            title: tx('Objetos vs Estructuras de Datos', 'Objects vs Data Structures'),
            color: 'text-violet-300', border: 'border-violet-500/30 bg-violet-500/5',
            items: [
              tx('Objetos: ocultan datos, exponen comportamiento (POO)', 'Objects: hide data, expose behavior (OOP)'),
              tx('Estructuras de datos (DTO/records): exponen datos, sin comportamiento', 'Data structures (DTO/records): expose data, no behavior'),
              tx('No mezcles: un objeto con getters/setters públicos es una "data class"', 'Don\'t mix: an object with public getters/setters is a "data class"'),
              tx('Antipatrón: Anemic Domain Model — objetos sin comportamiento real', 'Anti-pattern: Anemic Domain Model — objects with no real behavior'),
            ],
          },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 ${card.color}`}>{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowRight className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="typescript" code={`// ❌ SLAP violado — mezcla alto nivel con SQL raw
function processOrder(orderId: string) {
  const order = db.query(\`SELECT * FROM orders WHERE id = '\${orderId}'\`);
  if (order.status === 'pending' && order.items.length > 0) {
    const total = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    db.query(\`UPDATE orders SET status='paid', total=\${total} WHERE id='\${orderId}'\`);
    sendEmail(order.user.email, 'Your order is confirmed');
  }
}

// ✅ SLAP correcto — cada función hace una cosa al mismo nivel
function processOrder(orderId: string) {
  const order = findOrder(orderId);
  validateOrder(order);
  const total = calculateTotal(order);
  markAsPaid(order, total);
  notifyUser(order);
}

// ❌ Ley de Demeter (train wreck)
const zip = customer.getProfile().getAddress().getZip();

// ✅ Ley de Demeter
const zip = customer.getShippingZip();  // Customer encapsula la navegación

// ❌ Ask — código cliente toma decisiones por el objeto
if (user.isAdmin() && user.getPermissions().includes('write')) {
  document.save();
}

// ✅ Tell — el objeto decide por sí mismo
document.saveAs(user);  // Document sabe qué permisos necesita`} />
    </div>
  );

  // ─── Classes ────────────────────────────────────────────────────────────────

  const renderClasses = () => (
    <div className="space-y-6">
      <SectionTitle
        title={tx('Clases Limpias', 'Clean Classes')}
        subtitle={tx('Las clases deben ser pequeñas, cohesivas y tener una sola razón para cambiar.', 'Classes should be small, cohesive and have a single reason to change.')}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            title: tx('Tamaño de clases', 'Class Size'),
            color: 'text-emerald-300', border: 'border-emerald-500/30 bg-emerald-500/5',
            items: [
              tx('El tamaño se mide en responsabilidades, no en líneas', 'Size is measured in responsibilities, not lines'),
              tx('Si no puedes describir la clase sin "y" o "o", es demasiado grande', 'If you can\'t describe the class without "and" or "or", it\'s too big'),
              tx('Regla práctica: < 200 líneas, < 15 métodos públicos', 'Practical rule: < 200 lines, < 15 public methods'),
              tx('God Class = señal de alarma: hace demasiado', 'God Class = red flag: does too much'),
            ],
          },
          {
            title: tx('Cohesión', 'Cohesion'),
            color: 'text-blue-300', border: 'border-blue-500/30 bg-blue-500/5',
            items: [
              tx('Cohesión alta = los métodos usan la mayoría de las variables de instancia', 'High cohesion = methods use most instance variables'),
              tx('Si un grupo de métodos solo usa un subconjunto de vars → extrae clase', 'If a method group only uses a subset of vars → extract class'),
              tx('Cohesión baja = la clase tiene múltiples responsabilidades', 'Low cohesion = the class has multiple responsibilities'),
              tx('El refactoring a clases cohesivas suele mejorar la testabilidad', 'Refactoring to cohesive classes usually improves testability'),
            ],
          },
          {
            title: tx('Organización interna', 'Internal Organization'),
            color: 'text-cyan-300', border: 'border-cyan-500/30 bg-cyan-500/5',
            items: [
              tx('Constantes → variables de instancia → constructor → métodos públicos → privados', 'Constants → instance variables → constructor → public methods → private'),
              tx('Los métodos privados van justo después del público que los llama', 'Private methods go right after the public method that calls them'),
              tx('Las variables de instancia van arriba, no dispersas por la clase', 'Instance variables go at the top, not scattered throughout'),
              tx('Accesibilidad: public → protected → package → private', 'Visibility: public → protected → package → private'),
            ],
          },
          {
            title: tx('Encapsulación real', 'Real Encapsulation'),
            color: 'text-violet-300', border: 'border-violet-500/30 bg-violet-500/5',
            items: [
              tx('Evita setters innecesarios: ¿realmente necesitas mutar ese campo?', 'Avoid unnecessary setters: do you really need to mutate that field?'),
              tx('Prefiere constructores con todos los campos requeridos', 'Prefer constructors with all required fields'),
              tx('Inmutabilidad siempre que sea posible: reduce bugs de concurrencia', 'Immutability whenever possible: reduces concurrency bugs'),
              tx('No expongas colecciones internas directamente — devuelve copia o vista', 'Don\'t expose internal collections directly — return copy or view'),
            ],
          },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 ${card.color}`}>{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="typescript" code={`// ❌ God Class — hace demasiado
class UserManager {
  createUser(data) { ... }
  deleteUser(id) { ... }
  sendWelcomeEmail(user) { ... }         // ← responsabilidad de Email
  generateInvoice(user, items) { ... }   // ← responsabilidad de Billing
  checkInventory(productId) { ... }      // ← responsabilidad de Stock
  formatUserReport(user) { ... }         // ← responsabilidad de Report
}

// ✅ Clases cohesivas — cada una tiene una razón para cambiar
class UserRepository {
  create(data: CreateUserDTO): User { ... }
  delete(id: string): void { ... }
  findById(id: string): User | null { ... }
}

class UserEmailService {
  sendWelcome(user: User): Promise<void> { ... }
  sendPasswordReset(user: User): Promise<void> { ... }
}

class InvoiceService {
  generate(user: User, items: LineItem[]): Invoice { ... }
}

// ✅ Encapsulación real — inmutabilidad
class Money {
  constructor(
    private readonly amount: number,
    private readonly currency: string,
  ) {
    if (amount < 0) throw new Error('Amount cannot be negative');
  }

  add(other: Money): Money {
    if (other.currency !== this.currency) throw new Error('Currency mismatch');
    return new Money(this.amount + other.amount, this.currency);  // inmutable
  }

  get value() { return this.amount; }  // solo getter, no setter
}`} />
    </div>
  );

  // ─── Boy Scout & Boundaries ─────────────────────────────────────────────────

  const renderBoyscout = () => (
    <div className="space-y-6">
      <SectionTitle
        title={tx('Boy Scout, Código Muerto y Límites', 'Boy Scout, Dead Code & Boundaries')}
        subtitle={tx('Deja el código mejor de como lo encontraste. Elimina lo que no sirve. Aísla lo externo.', 'Leave code better than you found it. Remove what doesn\'t serve. Isolate external code.')}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          {
            title: tx('Regla del Boy Scout', 'Boy Scout Rule'),
            icon: <Users className="w-4 h-4" />, color: 'text-emerald-300', border: 'border-emerald-500/30 bg-emerald-500/5',
            items: [
              tx('"Siempre deja el campamento más limpio de como lo encontraste"', '"Always leave the campground cleaner than you found it"'),
              tx('No necesitas reescribir todo — mejoras pequeñas y constantes', 'You don\'t need to rewrite everything — small, constant improvements'),
              tx('Renombra una variable confusa, extrae un método, elimina un comentario', 'Rename a confusing variable, extract a method, remove a comment'),
              tx('La deuda técnica se paga en cuotas, no en rescates masivos', 'Technical debt is paid in installments, not massive rescues'),
            ],
          },
          {
            title: tx('Código Muerto', 'Dead Code'),
            icon: <Trash2 className="w-4 h-4" />, color: 'text-red-300', border: 'border-red-500/30 bg-red-500/5',
            items: [
              tx('Código comentado = código muerto disfrazado → bórralo, git lo guarda', 'Commented code = disguised dead code → delete it, git keeps it'),
              tx('Funciones que nadie llama, variables que nadie lee → bórralo', 'Functions nobody calls, variables nobody reads → delete it'),
              tx('Feature flags viejos que nunca se eliminan → deuda técnica activa', 'Old feature flags never removed → active technical debt'),
              tx('Las herramientas de cobertura y linters detectan código muerto', 'Coverage tools and linters detect dead code'),
            ],
          },
          {
            title: tx('Límites (Boundaries)', 'Boundaries'),
            icon: <Layers className="w-4 h-4" />, color: 'text-blue-300', border: 'border-blue-500/30 bg-blue-500/5',
            items: [
              tx('Envuelve librerías de terceros en tu propia abstracción (Adapter)', 'Wrap third-party libraries in your own abstraction (Adapter)'),
              tx('Si cambia la librería, solo cambias el adaptador, no todo el código', 'If the library changes, only the adapter changes, not all code'),
              tx('Learning tests: escribe tests para aprender la API de la librería', 'Learning tests: write tests to learn the library API'),
              tx('Evita que tu dominio dependa de DTOs/tipos de librerías externas', 'Avoid domain depending on DTOs/types from external libraries'),
            ],
          },
          {
            title: tx('Concurrencia básica', 'Basic Concurrency'),
            icon: <Shield className="w-4 h-4" />, color: 'text-amber-300', border: 'border-amber-500/30 bg-amber-500/5',
            items: [
              tx('Separa código concurrente del código de negocio', 'Separate concurrent code from business code'),
              tx('Prefiere inmutabilidad — los objetos inmutables son thread-safe por defecto', 'Prefer immutability — immutable objects are thread-safe by default'),
              tx('Evita variables de estado compartido; usa mensajes (Actor model)', 'Avoid shared state; use messages (Actor model)'),
              tx('Principio de responsabilidad única aplica también a threads', 'Single Responsibility Principle also applies to threads'),
            ],
          },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`border rounded-xl p-4 ${card.border}`}>
            <p className={`font-bold text-sm mb-2 flex items-center gap-2 ${card.color}`}>{card.icon}{card.title}</p>
            <ul className="space-y-1.5">
              {card.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                  <ArrowRight className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <CodeBlock language="typescript" code={`// ❌ Sin límites — tu dominio acoplado a la librería
import Stripe from 'stripe';
class OrderService {
  async pay(order: Order) {
    const stripe = new Stripe(process.env.STRIPE_KEY!);
    const intent = await stripe.paymentIntents.create({   // ← Stripe en el dominio
      amount: order.total * 100,
      currency: 'usd',
    });
    order.paymentId = intent.id;
  }
}

// ✅ Con límites — Adapter Pattern
interface PaymentGateway {                  // tu abstracción
  charge(amount: number): Promise<string>;
}

class StripeGateway implements PaymentGateway {   // adaptador
  private client = new Stripe(process.env.STRIPE_KEY!);
  async charge(amount: number) {
    const intent = await this.client.paymentIntents.create({ amount: amount * 100, currency: 'usd' });
    return intent.id;
  }
}

class OrderService {                        // dominio limpio
  constructor(private payments: PaymentGateway) {}
  async pay(order: Order) {
    order.paymentId = await this.payments.charge(order.total);
  }
}

// ✅ Boy Scout Rule — mejora pequeña al pasar
// Antes: function proc(d) { return d.filter(x => x.a).map(x => x.v) }
// Después:
function getActiveValues(items: Item[]): number[] {
  return items.filter(item => item.active).map(item => item.value);
}`} />
    </div>
  );

  const renderContent = () => {
    switch (active) {
      case 'naming':      return renderNaming();
      case 'functions':   return renderFunctions();
      case 'dry':         return renderDry();
      case 'comments':    return renderComments();
      case 'refactoring': return renderRefactoring();
      case 'formatting':  return renderFormatting();
      case 'errors':      return renderErrors();
      case 'abstractions':return renderAbstractions();
      case 'classes':     return renderClasses();
      case 'boyscout':    return renderBoyscout();
      case 'checklist':   return renderChecklist();
      default:            return renderNaming();
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
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
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

export default CleanCode;
