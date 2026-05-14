import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── SRP Diagram ──────────────────────────────────────────────────────────────

const SRPDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0); // 0 = god class, 1 = splitting, 2 = split

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 3), 2000);
    return () => clearInterval(id);
  }, []);

  const services = [
    { label: tx('AuthService', 'AuthService'), color: 'border-green-500/60', bg: 'bg-green-500/10', text: 'text-green-300' },
    { label: tx('EmailService', 'EmailService'), color: 'border-emerald-500/60', bg: 'bg-emerald-500/10', text: 'text-emerald-300' },
    { label: tx('LogService', 'LogService'), color: 'border-teal-500/60', bg: 'bg-teal-500/10', text: 'text-teal-300' },
    { label: tx('UserRepository', 'UserRepository'), color: 'border-cyan-500/60', bg: 'bg-cyan-500/10', text: 'text-cyan-300' },
  ];

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-violet-300 uppercase tracking-wider">
        {tx('Diagrama: Responsabilidad Única', 'Diagram: Single Responsibility')}
      </p>
      <div className="flex items-center justify-center gap-6 min-h-[120px]">
        {/* God class */}
        <AnimatePresence>
          {phase === 0 && (
            <motion.div
              key="god"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, boxShadow: ['0 0 10px rgba(239,68,68,0.3)', '0 0 24px rgba(239,68,68,0.6)', '0 0 10px rgba(239,68,68,0.3)'] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ boxShadow: { duration: 1, repeat: Infinity }, opacity: { duration: 0.3 } }}
              className="flex flex-col gap-1 p-3 bg-red-500/10 border-2 border-red-500/60 rounded-xl min-w-[140px]"
            >
              <p className="text-xs font-bold text-red-300 text-center mb-1">UserService</p>
              {['auth()', 'sendEmail()', 'log()', 'saveDB()'].map(m => (
                <div key={m} className="text-[10px] text-red-400/80 font-mono bg-red-500/10 rounded px-1.5 py-0.5">{m}</div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Splitting arrow */}
        <AnimatePresence>
          {phase === 1 && (
            <motion.div
              key="split-anim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, boxShadow: ['0 0 10px rgba(239,68,68,0.3)', '0 0 24px rgba(239,68,68,0.6)', '0 0 10px rgba(239,68,68,0.3)'] }}
                transition={{ boxShadow: { duration: 0.8, repeat: Infinity } }}
                className="flex flex-col gap-1 p-3 bg-red-500/10 border-2 border-red-500/60 rounded-xl min-w-[130px]"
              >
                <p className="text-xs font-bold text-red-300 text-center mb-1">UserService</p>
                {['auth()', 'sendEmail()', 'log()', 'saveDB()'].map(m => (
                  <div key={m} className="text-[10px] text-red-400/80 font-mono bg-red-500/10 rounded px-1.5 py-0.5">{m}</div>
                ))}
              </motion.div>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="text-violet-400 text-lg font-bold"
              >
                ↓ {tx('dividir', 'split')}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Split services */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              key="split"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-2"
            >
              {services.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1, boxShadow: ['0 0 8px rgba(34,197,94,0.2)', '0 0 18px rgba(34,197,94,0.5)', '0 0 8px rgba(34,197,94,0.2)'] }}
                  transition={{ delay: i * 0.1, boxShadow: { duration: 1.2, repeat: Infinity, delay: i * 0.3 } }}
                  className={`px-2 py-1.5 ${s.bg} border ${s.color} rounded-lg`}
                >
                  <p className={`text-[10px] font-bold ${s.text} text-center`}>{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-center text-xs text-slate-400">
        {phase === 0 && tx('Clase Dios — múltiples responsabilidades', 'God Class — multiple responsibilities')}
        {phase === 1 && tx('Separando responsabilidades…', 'Splitting responsibilities…')}
        {phase === 2 && tx('Cada clase tiene una sola responsabilidad', 'Each class has a single responsibility')}
      </p>
    </div>
  );
};

// ─── OCP Diagram ──────────────────────────────────────────────────────────────

const OCPDiagram = ({ tx }) => {
  const [visibleExtensions, setVisibleExtensions] = useState(0);
  const extensions = ['CashPayment', 'CardPayment', 'CryptoPayment', 'BNPLPayment'];

  useEffect(() => {
    let count = 0;
    const id = setInterval(() => {
      count = (count + 1) % (extensions.length + 2);
      setVisibleExtensions(count > extensions.length ? 0 : count);
    }, 800);
    return () => clearInterval(id);
  }, [extensions.length]);

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-violet-300 uppercase tracking-wider">
        {tx('Diagrama: Abierto/Cerrado', 'Diagram: Open/Closed')}
      </p>
      <div className="flex items-start justify-center gap-6">
        {/* Base class - closed for modification */}
        <div className="flex flex-col items-center gap-1">
          <div className="px-3 py-2 bg-violet-500/15 border-2 border-violet-500/50 rounded-xl min-w-[110px]">
            <p className="text-xs font-bold text-violet-300 text-center">Payment</p>
            <p className="text-[9px] text-violet-400/70 font-mono text-center">process(): void</p>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-slate-500">
            <span className="text-red-400">🔒</span>
            <span>{tx('cerrado', 'closed')}</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center justify-center mt-4 text-violet-400 text-lg">→</div>

        {/* Extensions - open for extension */}
        <div className="flex flex-col gap-1.5">
          {extensions.map((ext, i) => (
            <AnimatePresence key={ext}>
              {i < visibleExtensions && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="px-2.5 py-1.5 bg-green-500/10 border border-green-500/40 rounded-lg"
                >
                  <p className="text-[10px] font-semibold text-green-300">{ext}</p>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-slate-400">
        {tx('Extensiones nuevas sin tocar Payment', 'New extensions without touching Payment')}
      </p>
    </div>
  );
};

// ─── LSP Diagram ──────────────────────────────────────────────────────────────

const LSPDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0); // 0 = bad tree, 1 = highlight problem, 2 = good tree

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 3), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-violet-300 uppercase tracking-wider">
        {tx('Diagrama: Sustitución de Liskov', 'Diagram: Liskov Substitution')}
      </p>
      <div className="flex gap-6 items-start justify-center">
        {/* Bad tree */}
        <div className={`flex flex-col items-center gap-1 transition-opacity duration-500 ${phase === 2 ? 'opacity-30' : 'opacity-100'}`}>
          <p className="text-[9px] text-red-400 font-semibold uppercase mb-0.5">{tx('Violación', 'Violation')}</p>
          <div className="px-2.5 py-1.5 bg-slate-800/60 border border-slate-600/40 rounded-lg text-[10px] font-mono text-slate-300">Bird</div>
          <div className="w-px h-3 bg-slate-600" />
          <div className="flex gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="px-2.5 py-1.5 bg-slate-800/60 border border-slate-600/40 rounded-lg text-[10px] font-mono text-slate-300">Eagle</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <motion.div
                animate={phase === 1 ? { borderColor: 'rgba(239,68,68,0.8)', backgroundColor: 'rgba(239,68,68,0.15)' } : {}}
                transition={{ duration: 0.3 }}
                className="px-2.5 py-1.5 bg-slate-800/60 border border-slate-600/40 rounded-lg text-[10px] font-mono text-slate-300 relative"
              >
                Penguin
                {phase === 1 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2 text-xs"
                  >
                    ❌
                  </motion.span>
                )}
              </motion.div>
              {phase === 1 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[9px] text-red-400">fly() throws!</motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Good tree */}
        <div className={`flex flex-col items-center gap-1 transition-opacity duration-500 ${phase !== 2 ? 'opacity-30' : 'opacity-100'}`}>
          <p className="text-[9px] text-green-400 font-semibold uppercase mb-0.5">{tx('Correcto', 'Correct')}</p>
          <div className="px-2.5 py-1.5 bg-slate-800/60 border border-slate-600/40 rounded-lg text-[10px] font-mono text-slate-300">Bird</div>
          <div className="w-px h-3 bg-slate-600" />
          <div className="flex gap-2">
            <div className="flex flex-col items-center gap-1">
              <div className="px-2.5 py-1.5 bg-green-500/10 border border-green-500/40 rounded-lg text-[10px] font-mono text-green-300">FlyingBird</div>
              <div className="w-px h-2 bg-slate-600" />
              <div className="px-2.5 py-1.5 bg-green-500/10 border border-green-500/40 rounded-lg text-[10px] font-mono text-green-300">Eagle</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="px-2.5 py-1.5 bg-green-500/10 border border-green-500/40 rounded-lg text-[10px] font-mono text-green-300">SwimBird</div>
              <div className="w-px h-2 bg-slate-600" />
              <div className="px-2.5 py-1.5 bg-green-500/10 border border-green-500/40 rounded-lg text-[10px] font-mono text-green-300">Penguin</div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400">
        {phase === 0 && tx('Penguin hereda Bird con fly()', 'Penguin inherits Bird with fly()')}
        {phase === 1 && tx('¡Penguin.fly() rompe el contrato!', 'Penguin.fly() breaks the contract!')}
        {phase === 2 && tx('Jerarquía correcta — sin contratos rotos', 'Correct hierarchy — no broken contracts')}
      </p>
    </div>
  );
};

// ─── ISP Diagram ──────────────────────────────────────────────────────────────

const ISPDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0); // 0 = fat interface, 1 = splitting, 2 = split

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 3), 2000);
    return () => clearInterval(id);
  }, []);

  const fatMethods = ['work()', 'eat()', 'sleep()', 'charge()', 'fly()', 'swim()', 'bark()', 'purr()'];
  const smallInterfaces = [
    { name: 'Workable', methods: ['work()'], color: 'border-violet-500/50 bg-violet-500/10 text-violet-300' },
    { name: 'Biological', methods: ['eat()', 'sleep()'], color: 'border-blue-500/50 bg-blue-500/10 text-blue-300' },
    { name: 'Chargeable', methods: ['charge()'], color: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300' },
  ];

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-violet-300 uppercase tracking-wider">
        {tx('Diagrama: Segregación de Interfaces', 'Diagram: Interface Segregation')}
      </p>
      <div className="flex items-center justify-center gap-4 min-h-[110px]">
        <AnimatePresence mode="wait">
          {phase < 2 ? (
            <motion.div
              key="fat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-1 p-3 bg-red-500/10 border-2 border-red-500/50 rounded-xl min-w-[130px]"
            >
              <p className="text-[10px] font-bold text-red-300 text-center mb-1">Worker {tx('(gorda)', '(fat)')}</p>
              {fatMethods.map(m => (
                <div key={m} className="text-[9px] text-red-400/70 font-mono bg-red-500/10 rounded px-1.5 py-0.5">{m}</div>
              ))}
              {phase === 1 && (
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-center text-violet-400 text-xs mt-1"
                >
                  ✂ {tx('dividiendo…', 'splitting…')}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="split"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              {smallInterfaces.map((iface, i) => (
                <motion.div
                  key={iface.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`flex flex-col gap-1 p-2.5 border rounded-xl min-w-[80px] ${iface.color}`}
                >
                  <p className="text-[10px] font-bold text-center">{iface.name}</p>
                  {iface.methods.map(m => (
                    <div key={m} className="text-[9px] font-mono opacity-70 text-center">{m}</div>
                  ))}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-center text-xs text-slate-400">
        {phase === 0 && tx('Interfaz monolítica con 8 métodos', 'Monolithic interface with 8 methods')}
        {phase === 1 && tx('Segregando en interfaces específicas…', 'Segregating into specific interfaces…')}
        {phase === 2 && tx('3 interfaces pequeñas y enfocadas', '3 small, focused interfaces')}
      </p>
    </div>
  );
};

// ─── DIP Diagram ──────────────────────────────────────────────────────────────

const DIPDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0); // 0 = without DIP, 1 = with DIP

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 2), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-violet-300 uppercase tracking-wider">
        {tx('Diagrama: Inversión de Dependencias', 'Diagram: Dependency Inversion')}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {/* Without DIP */}
        <motion.div
          animate={{ opacity: phase === 0 ? 1 : 0.35 }}
          className="flex flex-col items-center gap-1.5"
        >
          <p className="text-[9px] font-semibold text-red-400 uppercase">{tx('Sin DIP', 'Without DIP')}</p>
          <div className="px-2.5 py-1.5 bg-red-500/10 border border-red-500/40 rounded-lg text-[10px] font-mono text-red-300 w-full text-center">UserService</div>
          <motion.div
            animate={phase === 0 ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-red-400 text-base"
          >
            ↓
          </motion.div>
          <div className="px-2.5 py-1.5 bg-red-500/10 border border-red-500/40 rounded-lg text-[10px] font-mono text-red-300 w-full text-center">MySQLDatabase</div>
          <p className="text-[9px] text-red-400/70">{tx('acoplamiento directo', 'direct coupling')}</p>
        </motion.div>

        {/* With DIP */}
        <motion.div
          animate={{ opacity: phase === 1 ? 1 : 0.35 }}
          className="flex flex-col items-center gap-1.5"
        >
          <p className="text-[9px] font-semibold text-green-400 uppercase">{tx('Con DIP', 'With DIP')}</p>
          <div className="px-2.5 py-1.5 bg-green-500/10 border border-green-500/40 rounded-lg text-[10px] font-mono text-green-300 w-full text-center">UserService</div>
          <div className="flex items-center gap-1 text-[9px] text-slate-500">
            <div className="flex-1 h-px bg-slate-600" />
            <span>↓</span>
          </div>
          <div className="px-2.5 py-1.5 bg-violet-500/15 border-2 border-violet-500/50 rounded-lg text-[10px] font-bold text-violet-300 w-full text-center">«IDatabase»</div>
          <div className="flex gap-1 text-[9px] text-slate-500">
            <div className="h-px w-6 bg-slate-600 mt-1.5" />
            <span className="text-slate-400">↑</span>
            <div className="h-px w-6 bg-slate-600 mt-1.5" />
          </div>
          <div className="flex gap-1 w-full">
            <div className="flex-1 px-1.5 py-1 bg-green-500/10 border border-green-500/40 rounded text-[9px] font-mono text-green-300 text-center">MySQL</div>
            <div className="flex-1 px-1.5 py-1 bg-green-500/10 border border-green-500/40 rounded text-[9px] font-mono text-green-300 text-center">Mongo</div>
          </div>
        </motion.div>
      </div>
      <p className="text-center text-xs text-slate-400">
        {phase === 0
          ? tx('Alto nivel depende directamente de bajo nivel', 'High level depends directly on low level')
          : tx('Ambos dependen de la abstracción IDatabase', 'Both depend on IDatabase abstraction')}
      </p>
    </div>
  );
};

// ─── SOLID Quiz ───────────────────────────────────────────────────────────────

const SolidQuiz = ({ tx }) => {
  const questions = [
    {
      scenario: tx(
        'Una clase Report genera HTML, guarda en BD y envía por email.',
        'A Report class generates HTML, saves to DB and sends by email.'
      ),
      answer: 'S',
      hint: tx('Tres responsabilidades distintas', 'Three distinct responsibilities'),
    },
    {
      scenario: tx(
        'Cada vez que añades un nuevo formato de pago debes modificar PaymentProcessor.',
        'Every time you add a new payment format you must modify PaymentProcessor.'
      ),
      answer: 'O',
      hint: tx('Debería ser extensible, no modificable', 'Should be extensible, not modifiable'),
    },
    {
      scenario: tx(
        'Square extends Rectangle pero setWidth() rompe el invariante área.',
        'Square extends Rectangle but setWidth() breaks the area invariant.'
      ),
      answer: 'L',
      hint: tx('Un subtipo no puede remplazar al padre', 'A subtype cannot replace the parent'),
    },
    {
      scenario: tx(
        'Robot implementa Worker y está forzado a implementar eat() y sleep().',
        'Robot implements Worker and is forced to implement eat() and sleep().'
      ),
      answer: 'I',
      hint: tx('Interface demasiado amplia para el cliente', 'Interface too broad for the client'),
    },
    {
      scenario: tx(
        'OrderService crea new MySQLRepository() directamente en el constructor.',
        'OrderService creates new MySQLRepository() directly in the constructor.'
      ),
      answer: 'D',
      hint: tx('Debería depender de una abstracción', 'Should depend on an abstraction'),
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(Array(questions.length).fill(false));
  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const allDone = submitted.every(Boolean);

  const handleAnswer = (qi, letter) => {
    if (submitted[qi]) return;
    const newAnswers = [...answers];
    newAnswers[qi] = letter;
    setAnswers(newAnswers);
    const newSub = [...submitted];
    newSub[qi] = true;
    setSubmitted(newSub);
  };

  const handleReset = () => {
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(Array(questions.length).fill(false));
  };

  const letters = ['S', 'O', 'L', 'I', 'D'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-violet-300">
          {tx('Quiz — ¿Qué principio se viola?', 'Quiz — Which principle is violated?')}
        </p>
        <div className="flex items-center gap-3">
          {allDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-sm font-bold ${score === 5 ? 'text-green-400' : score >= 3 ? 'text-yellow-400' : 'text-red-400'}`}
            >
              {score}/5
            </motion.div>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            {tx('Reiniciar', 'Reset')}
          </button>
        </div>
      </div>

      {questions.map((q, qi) => {
        const isSubmitted = submitted[qi];
        const isCorrect = answers[qi] === q.answer;
        return (
          <div
            key={qi}
            className={`p-3 rounded-xl border transition-all ${
              isSubmitted
                ? isCorrect
                  ? 'bg-green-500/8 border-green-500/30'
                  : 'bg-red-500/8 border-red-500/30'
                : 'bg-slate-800/30 border-slate-700/50'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-xs text-slate-300 leading-relaxed flex-1">
                <span className="text-violet-400 font-bold mr-1">{qi + 1}.</span>
                {q.scenario}
              </p>
              {isSubmitted && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  {isCorrect
                    ? <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                </motion.div>
              )}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {letters.map(letter => {
                const isSelected = answers[qi] === letter;
                const isAnswer = letter === q.answer;
                let style = 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200';
                if (isSubmitted) {
                  if (isAnswer) style = 'bg-green-500/20 border-green-500/50 text-green-300';
                  else if (isSelected && !isCorrect) style = 'bg-red-500/20 border-red-500/50 text-red-300';
                  else style = 'bg-slate-800/30 border-slate-700/30 text-slate-600';
                } else if (isSelected) {
                  style = 'bg-violet-500/20 border-violet-500/50 text-violet-300';
                }
                return (
                  <button
                    key={letter}
                    onClick={() => handleAnswer(qi, letter)}
                    disabled={isSubmitted}
                    className={`px-3 py-1 text-xs font-bold border rounded-lg transition-all ${style} ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
            {isSubmitted && !isCorrect && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] text-yellow-400/80 mt-1.5"
              >
                {tx('Pista:', 'Hint:')} {q.hint}
              </motion.p>
            )}
          </div>
        );
      })}

      {allDone && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border text-center ${
            score === 5
              ? 'bg-green-500/10 border-green-500/30 text-green-300'
              : score >= 3
              ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          <p className="text-lg font-bold">{score}/5</p>
          <p className="text-xs mt-1">
            {score === 5
              ? tx('¡Perfecto! SOLID dominado.', 'Perfect! SOLID mastered.')
              : score >= 3
              ? tx('¡Bien! Repasa los principios fallados.', 'Good! Review the failed principles.')
              : tx('Sigue practicando, revisa el contenido.', 'Keep practicing, review the content.')}
          </p>
        </motion.div>
      )}
    </div>
  );
};

// ─── SOLID Relationship Diagram ───────────────────────────────────────────────

const SolidRelationshipDiagram = ({ tx }) => {
  const [active, setActive] = useState(null);
  const nodes = [
    { id: 'S', label: tx('Responsabilidad Única', 'Single Responsibility'), x: 50, y: 10, color: 'violet' },
    { id: 'O', label: tx('Abierto/Cerrado', 'Open/Closed'), x: 90, y: 45, color: 'blue' },
    { id: 'L', label: tx('Liskov', 'Liskov'), x: 70, y: 85, color: 'indigo' },
    { id: 'I', label: tx('Segregación', 'Segregation'), x: 30, y: 85, color: 'purple' },
    { id: 'D', label: tx('Inv. Dependencias', 'Dep. Inversion'), x: 10, y: 45, color: 'fuchsia' },
  ];
  const edges = [
    { from: 'S', to: 'O', label: tx('facilita', 'enables') },
    { from: 'O', to: 'L', label: tx('necesita', 'needs') },
    { from: 'L', to: 'I', label: tx('refuerza', 'reinforces') },
    { from: 'I', to: 'D', label: tx('permite', 'allows') },
    { from: 'D', to: 'S', label: tx('apoya', 'supports') },
  ];
  const colorMap = {
    violet: { bg: 'bg-violet-500/15', border: 'border-violet-500/50', text: 'text-violet-300', glow: 'rgba(139,92,246,0.5)' },
    blue: { bg: 'bg-blue-500/15', border: 'border-blue-500/50', text: 'text-blue-300', glow: 'rgba(59,130,246,0.5)' },
    indigo: { bg: 'bg-indigo-500/15', border: 'border-indigo-500/50', text: 'text-indigo-300', glow: 'rgba(99,102,241,0.5)' },
    purple: { bg: 'bg-purple-500/15', border: 'border-purple-500/50', text: 'text-purple-300', glow: 'rgba(168,85,247,0.5)' },
    fuchsia: { bg: 'bg-fuchsia-500/15', border: 'border-fuchsia-500/50', text: 'text-fuchsia-300', glow: 'rgba(217,70,239,0.5)' },
  };

  return (
    <div className="bg-slate-950/40 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-violet-300 uppercase tracking-wider">
        {tx('Relación entre principios SOLID', 'SOLID Principles Relationship')}
      </p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {nodes.map(node => {
          const c = colorMap[node.color];
          return (
            <motion.button
              key={node.id}
              onHoverStart={() => setActive(node.id)}
              onHoverEnd={() => setActive(null)}
              animate={active === node.id ? { boxShadow: `0 0 20px ${c.glow}` } : { boxShadow: '0 0 0px transparent' }}
              className={`flex flex-col items-center gap-1 p-2.5 ${c.bg} border ${c.border} rounded-xl transition-colors`}
            >
              <span className={`text-lg font-black ${c.text}`}>{node.id}</span>
              <span className={`text-[9px] font-medium text-center leading-tight ${c.text} opacity-80`}>{node.label}</span>
            </motion.button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {edges.map(e => (
          <span key={e.from + e.to} className="text-[10px] text-slate-500">
            <span className="text-violet-400 font-bold">{e.from}</span>
            <span className="text-slate-600 mx-0.5">→</span>
            <span className="text-violet-400 font-bold">{e.to}</span>
            <span className="text-slate-500 ml-0.5">({e.label})</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Section Renderers ─────────────────────────────────────────────────────────

const renderSRP = (tx) => (
  <div className="space-y-6">
    <div className="relative">
      <div className="absolute top-0 right-0 text-[120px] font-black text-violet-500/8 select-none pointer-events-none leading-none">S</div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1 relative z-10">
        {tx('S — Responsabilidad Única', 'S — Single Responsibility')}
      </h2>
      <p className="text-slate-400 text-sm relative z-10">
        {tx('Una clase debe tener una única razón para cambiar', 'A class must have only one reason to change')}
      </p>
    </div>

    <SRPDiagram tx={tx} />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {[
        {
          title: tx('Cuándo aplicar', 'When to apply'),
          color: 'text-violet-300', border: 'border-violet-500/20',
          items: [
            tx('Clase con más de 200–300 líneas', 'Class with more than 200–300 lines'),
            tx('Múltiples actores o stakeholders afectados', 'Multiple actors or stakeholders affected'),
            tx('Tests difíciles de aislar', 'Tests hard to isolate'),
          ],
        },
        {
          title: tx('Violaciones comunes', 'Common violations'),
          color: 'text-red-300', border: 'border-red-500/20',
          items: [
            tx('Clase que accede a BD y renderiza UI', 'Class that accesses DB and renders UI'),
            tx('Service que también envía notificaciones', 'Service that also sends notifications'),
            tx('"GodObject" que lo hace todo', '"GodObject" that does everything'),
          ],
        },
        {
          title: tx('Tip de refactoring', 'Refactoring tip'),
          color: 'text-green-300', border: 'border-green-500/20',
          items: [
            tx('Extrae cada responsabilidad a su propia clase', 'Extract each responsibility to its own class'),
            tx('Inyecta las dependencias creadas', 'Inject the created dependencies'),
            tx('Usa el patrón Facade para coordinar', 'Use the Facade pattern to coordinate'),
          ],
        },
      ].map(({ title, color, border, items }) => (
        <div key={title} className={`bg-slate-800/30 border ${border} rounded-xl p-3`}>
          <p className={`text-sm font-bold ${color} mb-2`}>{title}</p>
          <ul className="space-y-1">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                <span className="text-violet-400 mt-0.5 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="javascript" code={`// ❌ Violación — UserService hace demasiado
class UserService {
  constructor() {
    this.db = new Database();
    this.mailer = new Mailer();
  }

  // Responsabilidad 1: autenticación
  login(email, password) {
    const user = this.db.find('users', { email });
    if (!user || user.password !== hash(password)) throw new Error('Invalid');
    return generateJWT(user);
  }

  // Responsabilidad 2: email
  sendWelcome(user) {
    this.mailer.send(user.email, 'Welcome!', '<h1>Hi!</h1>');
  }

  // Responsabilidad 3: logging
  logActivity(userId, action) {
    this.db.insert('logs', { userId, action, at: new Date() });
  }

  // Responsabilidad 4: persistencia
  save(user) {
    return this.db.upsert('users', user);
  }
}
// Cuatro razones para cambiar = cuatro responsabilidades`} />

    <CodeBlock language="javascript" code={`// ✅ Solución — una clase, una responsabilidad
class AuthService {
  constructor(userRepo, tokenService) {
    this.userRepo = userRepo;
    this.tokenService = tokenService;
  }
  login(email, password) {
    const user = this.userRepo.findByEmail(email);
    if (!user || !verify(password, user.passwordHash)) throw new Error('Invalid credentials');
    return this.tokenService.sign({ sub: user.id, role: user.role });
  }
}

class EmailService {
  constructor(mailerAdapter) { this.mailer = mailerAdapter; }
  sendWelcome(user) {
    return this.mailer.send({ to: user.email, subject: 'Welcome!', body: welcomeTemplate(user) });
  }
}

class ActivityLogger {
  constructor(logRepo) { this.logRepo = logRepo; }
  log(userId, action) {
    return this.logRepo.insert({ userId, action, timestamp: new Date() });
  }
}

class UserRepository {
  constructor(db) { this.db = db; }
  findByEmail(email) { return this.db.findOne('users', { email }); }
  save(user)         { return this.db.upsert('users', user); }
}
// Cada clase tiene una única razón para cambiar ✓`} />
  </div>
);

const renderOCP = (tx) => (
  <div className="space-y-6">
    <div className="relative">
      <div className="absolute top-0 right-0 text-[120px] font-black text-violet-500/8 select-none pointer-events-none leading-none">O</div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1 relative z-10">
        {tx('O — Abierto/Cerrado', 'O — Open/Closed')}
      </h2>
      <p className="text-slate-400 text-sm relative z-10">
        {tx('Abierto para extensión, cerrado para modificación', 'Open for extension, closed for modification')}
      </p>
    </div>

    <OCPDiagram tx={tx} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {[
        {
          title: tx('Strategy como OCP', 'Strategy as OCP'),
          color: 'text-violet-300', border: 'border-violet-500/20',
          desc: tx(
            'El patrón Strategy encapsula algoritmos intercambiables. Añadir un nuevo algoritmo = nueva clase, sin tocar el cliente.',
            'Strategy pattern encapsulates interchangeable algorithms. Adding a new algorithm = new class, without touching the client.'
          ),
        },
        {
          title: tx('Plugin systems', 'Plugin systems'),
          color: 'text-blue-300', border: 'border-blue-500/20',
          desc: tx(
            'VSCode, webpack y Express usan OCP: la base no cambia, los plugins/middlewares extienden el comportamiento sin modificar el core.',
            'VSCode, webpack and Express use OCP: the base doesn\'t change, plugins/middlewares extend behavior without modifying the core.'
          ),
        },
      ].map(({ title, color, border, desc }) => (
        <div key={title} className={`bg-slate-800/30 border ${border} rounded-xl p-3`}>
          <p className={`text-sm font-bold ${color} mb-1.5`}>{title}</p>
          <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    <CodeBlock language="javascript" code={`// ❌ Violación — hay que modificar AreaCalculator para cada figura
class AreaCalculator {
  calculate(shape) {
    if (shape.type === 'circle') {
      return Math.PI * shape.radius ** 2;
    } else if (shape.type === 'rectangle') {
      return shape.width * shape.height;
    } else if (shape.type === 'triangle') {       // ← nueva figura = modificar
      return (shape.base * shape.height) / 2;
    }
    // Cada nueva figura requiere editar esta clase
  }
}
const calc = new AreaCalculator();
calc.calculate({ type: 'circle', radius: 5 });`} />

    <CodeBlock language="javascript" code={`// ✅ Solución — polimorfismo: cerrado para modificación, abierto para extensión

class Shape {
  area() { throw new Error('area() must be implemented'); }
}

class Circle extends Shape {
  constructor(radius) { super(); this.radius = radius; }
  area() { return Math.PI * this.radius ** 2; }
}

class Rectangle extends Shape {
  constructor(w, h) { super(); this.width = w; this.height = h; }
  area() { return this.width * this.height; }
}

// Añadir Triangle NO toca AreaCalculator ni las otras clases ✓
class Triangle extends Shape {
  constructor(base, height) { super(); this.base = base; this.height = height; }
  area() { return (this.base * this.height) / 2; }
}

class AreaCalculator {
  calculate(shape) { return shape.area(); }     // ← nunca cambia
  total(shapes)    { return shapes.reduce((sum, s) => sum + s.area(), 0); }
}

const calc = new AreaCalculator();
console.log(calc.total([new Circle(5), new Rectangle(4, 6), new Triangle(3, 8)]));`} />
  </div>
);

const renderLSP = (tx) => (
  <div className="space-y-6">
    <div className="relative">
      <div className="absolute top-0 right-0 text-[120px] font-black text-violet-500/8 select-none pointer-events-none leading-none">L</div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1 relative z-10">
        {tx('L — Sustitución de Liskov', 'L — Liskov Substitution')}
      </h2>
      <p className="text-slate-400 text-sm relative z-10">
        {tx('Los subtipos deben ser sustituibles por sus tipos base', 'Subtypes must be substitutable for their base types')}
      </p>
    </div>

    <LSPDiagram tx={tx} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {[
        {
          title: tx('Regla de precondición', 'Precondition rule'),
          color: 'text-indigo-300', border: 'border-indigo-500/20',
          desc: tx('Una subclase no puede añadir precondiciones más restrictivas que las del padre. Si Bird.fly() acepta cualquier altitud, FlyingBird.fly() no puede restringirla.', 'A subclass cannot add more restrictive preconditions than the parent. If Bird.fly() accepts any altitude, FlyingBird.fly() cannot restrict it.'),
        },
        {
          title: tx('Regla de postcondición', 'Postcondition rule'),
          color: 'text-purple-300', border: 'border-purple-500/20',
          desc: tx('Una subclase no puede debilitar las postcondiciones. Si Rectangle.setWidth() garantiza que la altura no cambia, Square no puede cambiarla.', 'A subclass cannot weaken postconditions. If Rectangle.setWidth() guarantees the height doesn\'t change, Square cannot change it.'),
        },
      ].map(({ title, color, border, desc }) => (
        <div key={title} className={`bg-slate-800/30 border ${border} rounded-xl p-3`}>
          <p className={`text-sm font-bold ${color} mb-1.5`}>{title}</p>
          <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    <CodeBlock language="javascript" code={`// ❌ Violación clásica — Square rompe el contrato de Rectangle
class Rectangle {
  constructor(w, h) { this.width = w; this.height = h; }
  setWidth(w)  { this.width = w; }
  setHeight(h) { this.height = h; }
  area()       { return this.width * this.height; }
}

class Square extends Rectangle {
  setWidth(w)  { this.width = w;  this.height = w; }   // ← rompe postcondición
  setHeight(h) { this.height = h; this.width = h; }    // ← rompe postcondición
}

function testRectangle(rect) {
  rect.setWidth(4);
  rect.setHeight(5);
  // Esperamos área = 20; Square devuelve 25 ← LSP violado
  console.assert(rect.area() === 20, 'Expected 20, got ' + rect.area());
}

testRectangle(new Rectangle(1, 1)); // ✓ pasa
testRectangle(new Square(1));       // ✗ falla — LSP roto`} />

    <CodeBlock language="javascript" code={`// ✅ Solución — no usar herencia donde no existe relación "es-un"

class Shape {
  area() { throw new Error('Not implemented'); }
}

class Rectangle extends Shape {
  constructor(w, h) { super(); this.width = w; this.height = h; }
  area() { return this.width * this.height; }
}

class Square extends Shape {           // Square extiende Shape, no Rectangle
  constructor(side) { super(); this.side = side; }
  area() { return this.side ** 2; }
}

// Bird → FlyingBird / SwimmingBird — jerarquía correcta
class Bird    { move() { throw new Error('Not implemented'); } }
class FlyingBird  extends Bird { move() { return 'Flying at altitude'; } }
class SwimmingBird extends Bird { move() { return 'Swimming underwater'; } }

class Eagle   extends FlyingBird  {}   // ✓ sustitución válida
class Penguin extends SwimmingBird {}  // ✓ sustitución válida — no fly()

function makeMove(bird) { return bird.move(); }   // funciona con cualquier Bird ✓`} />
  </div>
);

const renderISP = (tx) => (
  <div className="space-y-6">
    <div className="relative">
      <div className="absolute top-0 right-0 text-[120px] font-black text-violet-500/8 select-none pointer-events-none leading-none">I</div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1 relative z-10">
        {tx('I — Segregación de Interfaces', 'I — Interface Segregation')}
      </h2>
      <p className="text-slate-400 text-sm relative z-10">
        {tx('Ninguna clase debe implementar métodos que no usa', 'No class should be forced to implement methods it doesn\'t use')}
      </p>
    </div>

    <ISPDiagram tx={tx} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {[
        {
          title: tx('Señal de violación', 'Violation signal'),
          color: 'text-red-300', border: 'border-red-500/20',
          desc: tx('Cuando una clase implementa una interfaz y usa throw new Error("Not implemented") en algún método, está violando ISP.', 'When a class implements an interface and uses throw new Error("Not implemented") in some method, it\'s violating ISP.'),
        },
        {
          title: tx('Composición de interfaces', 'Interface composition'),
          color: 'text-violet-300', border: 'border-violet-500/20',
          desc: tx('TypeScript permite usar & para componer: type HumanWorker = Workable & Eatable & Sleepable. Las interfaces pequeñas son reutilizables.', 'TypeScript allows using & to compose: type HumanWorker = Workable & Eatable & Sleepable. Small interfaces are reusable.'),
        },
      ].map(({ title, color, border, desc }) => (
        <div key={title} className={`bg-slate-800/30 border ${border} rounded-xl p-3`}>
          <p className={`text-sm font-bold ${color} mb-1.5`}>{title}</p>
          <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`// ❌ Violación — interfaz Worker demasiado amplia
interface Worker {
  work(): void;
  eat(): void;     // Solo seres biológicos
  sleep(): void;   // Solo seres biológicos
  charge(): void;  // Solo robots
  fly(): void;     // Solo drones
}

class HumanWorker implements Worker {
  work()   { console.log('Working...'); }
  eat()    { console.log('Eating...'); }
  sleep()  { console.log('Sleeping...'); }
  charge() { throw new Error('Humans cannot charge!'); }  // ← ISP violado
  fly()    { throw new Error('Humans cannot fly!'); }     // ← ISP violado
}

class RobotWorker implements Worker {
  work()   { console.log('Working...'); }
  charge() { console.log('Charging...'); }
  eat()    { throw new Error('Robots do not eat!'); }     // ← ISP violado
  sleep()  { throw new Error('Robots do not sleep!'); }  // ← ISP violado
  fly()    { throw new Error('This robot cannot fly!'); }
}`} />

    <CodeBlock language="typescript" code={`// ✅ Solución — interfaces segregadas por capacidad

interface Workable   { work(): void; }
interface Eatable    { eat(): void; }
interface Sleepable  { sleep(): void; }
interface Chargeable { charge(): void; }
interface Flyable    { fly(): void; }

// Cada clase implementa solo lo que le corresponde
class HumanWorker implements Workable, Eatable, Sleepable {
  work()  { console.log('Working...'); }
  eat()   { console.log('Eating lunch...'); }
  sleep() { console.log('Sleeping 8h...'); }
}

class RobotWorker implements Workable, Chargeable {
  work()   { console.log('Processing tasks...'); }
  charge() { console.log('Charging battery...'); }
}

class Drone implements Workable, Flyable, Chargeable {
  work()   { console.log('Delivering package...'); }
  fly()    { console.log('Flying at 50m...'); }
  charge() { console.log('Charging via dock...'); }
}

// Composición en TypeScript
type HumanWorkerType = Workable & Eatable & Sleepable;  // ✓ semántica clara`} />
  </div>
);

const renderDIP = (tx) => (
  <div className="space-y-6">
    <div className="relative">
      <div className="absolute top-0 right-0 text-[120px] font-black text-violet-500/8 select-none pointer-events-none leading-none">D</div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1 relative z-10">
        {tx('D — Inversión de Dependencias', 'D — Dependency Inversion')}
      </h2>
      <p className="text-slate-400 text-sm relative z-10">
        {tx('Los módulos de alto nivel no deben depender de los de bajo nivel. Ambos deben depender de abstracciones.',
            'High-level modules must not depend on low-level modules. Both must depend on abstractions.')}
      </p>
    </div>

    <DIPDiagram tx={tx} />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {[
        {
          title: tx('Inyección de dependencias', 'Dependency injection'),
          color: 'text-violet-300', border: 'border-violet-500/20',
          desc: tx('Constructor injection es la forma más explícita: las dependencias se pasan al crear el objeto. Esto hace las dependencias visibles, testeable y sustituibles.',
                   'Constructor injection is the most explicit form: dependencies are passed when creating the object. This makes dependencies visible, testable and substitutable.'),
        },
        {
          title: tx('Contenedores IoC', 'IoC containers'),
          color: 'text-blue-300', border: 'border-blue-500/20',
          desc: tx('Frameworks como NestJS, Spring o InversifyJS automatizan la inyección. Registras las implementaciones y el framework las resuelve. DIP es el fundamento de toda arquitectura de capas.',
                   'Frameworks like NestJS, Spring or InversifyJS automate injection. You register implementations and the framework resolves them. DIP is the foundation of every layered architecture.'),
        },
      ].map(({ title, color, border, desc }) => (
        <div key={title} className={`bg-slate-800/30 border ${border} rounded-xl p-3`}>
          <p className={`text-sm font-bold ${color} mb-1.5`}>{title}</p>
          <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`// ❌ Violación — OrderService crea su propia dependencia (acoplamiento fuerte)
class MySQLOrderRepository {
  save(order: Order): void { /* INSERT INTO orders... */ }
  findById(id: string): Order { /* SELECT ... */ }
}

class OrderService {
  private repo: MySQLOrderRepository;

  constructor() {
    this.repo = new MySQLOrderRepository();  // ← acoplamiento concreto
    // No se puede testear sin una BD MySQL real
    // Imposible cambiar a PostgreSQL sin modificar OrderService
  }

  placeOrder(order: Order): void {
    // validar...
    this.repo.save(order);
  }
}`} />

    <CodeBlock language="typescript" code={`// ✅ Solución — ambos dependen de la abstracción IOrderRepository

// Abstracción (ni alto nivel ni bajo nivel cambia esta interfaz)
interface IOrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
}

// Bajo nivel — implementa la abstracción
class MySQLOrderRepository implements IOrderRepository {
  async save(order: Order)       { /* INSERT INTO orders... */ }
  async findById(id: string)     { /* SELECT ... */ }
}

class InMemoryOrderRepository implements IOrderRepository {  // para tests
  private store = new Map<string, Order>();
  async save(order: Order)       { this.store.set(order.id, order); }
  async findById(id: string)     { return this.store.get(id) ?? null; }
}

// Alto nivel — depende de la abstracción, no de MySQLOrderRepository
class OrderService {
  constructor(private readonly repo: IOrderRepository) {}  // ← inyección

  async placeOrder(order: Order): Promise<void> {
    if (!order.items.length) throw new Error('Order must have items');
    await this.repo.save(order);
  }
}

// Producción
const service = new OrderService(new MySQLOrderRepository());

// Test — sin base de datos real ✓
const testService = new OrderService(new InMemoryOrderRepository());`} />
  </div>
);

const renderOverview = (tx) => (
  <div className="space-y-6">
    <div className="relative">
      <div className="absolute top-0 right-0 text-[80px] font-black text-violet-500/8 select-none pointer-events-none leading-none">SOLID</div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1 relative z-10">
        {tx('SOLID en Práctica', 'SOLID in Practice')}
      </h2>
      <p className="text-slate-400 text-sm relative z-10">
        {tx('Pon a prueba tu comprensión y observa cómo los principios se relacionan entre sí', 'Test your understanding and see how the principles relate to each other')}
      </p>
    </div>

    <SolidQuiz tx={tx} />

    <SolidRelationshipDiagram tx={tx} />

    <div className="bg-slate-800/30 border border-violet-500/20 rounded-xl p-4 space-y-3">
      <p className="text-sm font-bold text-violet-300">{tx('Resumen rápido', 'Quick summary')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          { letter: 'S', desc: tx('Una clase = una responsabilidad = una razón para cambiar', 'One class = one responsibility = one reason to change') },
          { letter: 'O', desc: tx('Extiende sin modificar — usa herencia o composición', 'Extend without modifying — use inheritance or composition') },
          { letter: 'L', desc: tx('Los hijos son sustituibles por el padre sin romper el contrato', 'Children are substitutable for the parent without breaking the contract') },
          { letter: 'I', desc: tx('Interfaces pequeñas y enfocadas — mejor muchas que una grande', 'Small and focused interfaces — many small beats one large') },
          { letter: 'D', desc: tx('Depende de abstracciones, no de implementaciones concretas', 'Depend on abstractions, not concrete implementations') },
        ].map(({ letter, desc }) => (
          <div key={letter} className="flex items-start gap-2 p-2.5 bg-slate-900/40 rounded-lg">
            <span className="text-lg font-black text-violet-400 leading-tight flex-shrink-0">{letter}</span>
            <span className="text-xs text-slate-400 leading-relaxed">{desc}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────

function Solid() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('srp');

  const sections = [
    { id: 'srp',           title: tx('S — Responsabilidad Única', 'S — Single Responsibility'), subtitle: tx('Una razón para cambiar', 'One reason to change') },
    { id: 'ocp',           title: tx('O — Abierto/Cerrado', 'O — Open/Closed'),                subtitle: tx('Extensible sin modificar', 'Extensible without modifying') },
    { id: 'lsp',           title: tx('L — Sustitución Liskov', 'L — Liskov Substitution'),      subtitle: tx('Subtipos sustituibles', 'Substitutable subtypes') },
    { id: 'isp',           title: tx('I — Segregación', 'I — Interface Segregation'),           subtitle: tx('Interfaces pequeñas', 'Small interfaces') },
    { id: 'dip',           title: tx('D — Inv. Dependencias', 'D — Dep. Inversion'),            subtitle: tx('Depende de abstracciones', 'Depend on abstractions') },
    { id: 'solid-overview', title: tx('SOLID en Práctica', 'SOLID in Practice'),                subtitle: tx('Quiz + relaciones', 'Quiz + relationships') },
  ];

  const renderContent = () => {
    switch (active) {
      case 'srp':           return renderSRP(tx);
      case 'ocp':           return renderOCP(tx);
      case 'lsp':           return renderLSP(tx);
      case 'isp':           return renderISP(tx);
      case 'dip':           return renderDIP(tx);
      case 'solid-overview': return renderOverview(tx);
      default:              return renderSRP(tx);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                active === s.id
                  ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300'
                  : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}>
              <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{s.title}</div>
              <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{s.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Solid;
