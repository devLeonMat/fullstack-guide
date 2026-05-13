import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Play, Layers, Bug, Shield, Zap, Target, GitMerge } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Pyramid Diagram ───────────────────────────────────────────────────────────

const PyramidDiagram = ({ tx }) => {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveLayer(l => (l + 1) % 4), 1600);
    return () => clearInterval(id);
  }, []);

  const layers = [
    {
      label: 'E2E',
      sublabel: tx('Pocos, lentos, costosos', 'Few, slow, expensive'),
      width: 'w-full md:w-2/5',
      color: 'bg-red-500/20 border-red-500/40',
      glow: 'shadow-red-500/50',
      text: 'text-red-300',
      icon: <Globe2 />,
    },
    {
      label: tx('Integración', 'Integration'),
      sublabel: tx('Moderados', 'Moderate'),
      width: 'w-full md:w-3/5',
      color: 'bg-orange-500/20 border-orange-500/40',
      glow: 'shadow-orange-500/50',
      text: 'text-orange-300',
    },
    {
      label: tx('Unitarios', 'Unit'),
      sublabel: tx('Muchos, rápidos, baratos', 'Many, fast, cheap'),
      width: 'w-full md:w-4/5',
      color: 'bg-amber-500/20 border-amber-500/40',
      glow: 'shadow-amber-500/50',
      text: 'text-amber-300',
    },
    {
      label: tx('Estáticos (TS/ESLint)', 'Static (TS/ESLint)'),
      sublabel: tx('Base: más rápidos de todos', 'Base: fastest of all'),
      width: 'w-full',
      color: 'bg-yellow-500/20 border-yellow-500/40',
      glow: 'shadow-yellow-500/50',
      text: 'text-yellow-300',
    },
  ];

  return (
    <div className="bg-slate-950/40 border border-amber-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-widest mb-2">
        {tx('Pirámide de Testing', 'Testing Pyramid')}
      </p>

      <div className="flex flex-col items-center gap-1.5">
        {layers.map((layer, idx) => (
          <motion.div
            key={idx}
            animate={{
              boxShadow: activeLayer === idx ? `0 0 20px var(--tw-shadow-color)` : '0 0 0px transparent',
              opacity: activeLayer === idx ? 1 : 0.65,
            }}
            className={`${layer.width} border rounded-lg px-3 py-2 flex items-center justify-between transition-all duration-300 ${layer.color} ${activeLayer === idx ? layer.glow : ''}`}
          >
            <span className={`font-bold text-sm ${layer.text}`}>{layer.label}</span>
            <span className="text-slate-400 text-xs hidden sm:block">{layer.sublabel}</span>
          </motion.div>
        ))}
      </div>

      {/* Axes */}
      <div className="flex justify-between text-xs text-slate-500 mt-2 px-1">
        <span>← {tx('más lento / más costoso', 'slower / more expensive')}</span>
        <span>{tx('más rápido / más barato', 'faster / cheaper')} →</span>
      </div>

      {/* 70/20/10 rule */}
      <div className="border-t border-slate-800 pt-3 mt-2">
        <p className="text-xs text-slate-400 font-semibold mb-2">{tx('Regla 70/20/10', '70/20/10 Rule')}</p>
        <div className="flex gap-2">
          {[
            { pct: '70%', label: tx('Unitarios', 'Unit'), color: 'bg-amber-500' },
            { pct: '20%', label: tx('Integración', 'Integration'), color: 'bg-orange-500' },
            { pct: '10%', label: 'E2E', color: 'bg-red-500' },
          ].map(({ pct, label, color }) => (
            <div key={pct} className="flex-1 text-center">
              <div className={`${color} rounded-md text-white text-xs font-bold py-1`}>{pct}</div>
              <div className="text-slate-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// tiny inline icon for E2E label
function Globe2() {
  return null;
}

// ─── Unit Test Runner Diagram ──────────────────────────────────────────────────

const UnitDiagram = ({ tx }) => {
  const [runIdx, setRunIdx] = useState(0);

  const tests = [
    { name: 'add(2, 3) === 5', pass: true },
    { name: 'divide(10, 2) === 5', pass: true },
    { name: 'divide(10, 0) throws', pass: true },
    { name: 'formatDate(null)', pass: false },
    { name: 'parseUser({}) returns obj', pass: true },
    { name: 'fetchUser rejects on 404', pass: true },
  ];

  useEffect(() => {
    const id = setInterval(() => setRunIdx(i => (i + 1) % tests.length), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-amber-500/20 rounded-xl p-4 space-y-3">
      {/* Flow diagram */}
      <div className="flex flex-col sm:flex-row items-center gap-2 text-xs">
        {[
          { label: tx('Archivo test', 'Test file'), color: 'border-amber-500/40 text-amber-300' },
          { label: tx('Módulo bajo prueba', 'Subject module'), color: 'border-blue-500/40 text-blue-300' },
          { label: tx('Dependencias mock', 'Mock deps'), color: 'border-purple-500/40 text-purple-300' },
          { label: tx('Assert resultado', 'Assert result'), color: 'border-green-500/40 text-green-300' },
        ].map((node, i, arr) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`border rounded-lg px-2 py-1 font-semibold ${node.color} bg-slate-900/60 whitespace-nowrap`}>
              {node.label}
            </div>
            {i < arr.length - 1 && <span className="text-slate-600">→</span>}
          </div>
        ))}
      </div>

      {/* Animated test runner */}
      <div className="bg-slate-900/70 rounded-lg p-3 font-mono text-xs space-y-1 border border-slate-800">
        <div className="text-slate-500 mb-2 flex items-center gap-2">
          <Play className="w-3 h-3 text-amber-400" />
          <span className="text-amber-300">vitest run</span>
        </div>
        {tests.map((t, i) => (
          <motion.div
            key={t.name}
            animate={{
              opacity: i <= runIdx ? 1 : 0.2,
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            {i < runIdx ? (
              t.pass
                ? <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                : <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
            ) : i === runIdx ? (
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-amber-400 flex-shrink-0 inline-block"
              />
            ) : (
              <span className="w-3 h-3 rounded-full border border-slate-600 flex-shrink-0 inline-block" />
            )}
            <span className={i < runIdx ? (t.pass ? 'text-green-300' : 'text-red-300') : 'text-slate-400'}>
              {t.name}
            </span>
          </motion.div>
        ))}
        <div className="border-t border-slate-800 mt-2 pt-2 text-slate-400">
          <AnimatePresence mode="wait">
            <motion.span
              key={runIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {tx(`Ejecutando ${runIdx + 1}/${tests.length}...`, `Running ${runIdx + 1}/${tests.length}...`)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ─── Integration Diagram ───────────────────────────────────────────────────────

const IntegrationDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 4), 1600);
    return () => clearInterval(id);
  }, []);

  const nodes = [
    { label: tx('Servicio A', 'Service A'), color: 'bg-amber-500/10 border-amber-500/30 text-amber-300' },
    { label: tx('Endpoint API', 'API Endpoint'), color: 'bg-blue-500/10 border-blue-500/30 text-blue-300' },
    { label: tx('Base de datos', 'Database'), color: 'bg-green-500/10 border-green-500/30 text-green-300' },
  ];

  const steps = [
    tx('① Servicio envía request', '① Service sends request'),
    tx('② Endpoint procesa', '② Endpoint processes'),
    tx('③ DB persiste datos', '③ DB persists data'),
    tx('④ Respuesta retorna', '④ Response returns'),
  ];

  return (
    <div className="bg-slate-950/40 border border-amber-500/20 rounded-xl p-4 space-y-3">
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25 }}
          className="text-center text-sm font-semibold text-amber-300 h-5"
        >
          {steps[phase]}
        </motion.p>
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center gap-3 w-full sm:flex-1">
            <motion.div
              animate={{
                boxShadow: phase === i || (phase === 3 && i === 0)
                  ? '0 0 18px rgba(251,191,36,0.4)'
                  : '0 0 0px transparent',
              }}
              className={`flex-1 border rounded-xl px-3 py-3 text-center font-bold text-sm ${node.color}`}
            >
              {node.label}
            </motion.div>
            {i < nodes.length - 1 && (
              <motion.span
                animate={{ x: phase === i ? [0, 4, 0] : 0 }}
                transition={{ duration: 0.6, repeat: phase === i ? Infinity : 0 }}
                className="text-slate-500 text-lg hidden sm:block"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      <div className="text-xs text-slate-500 text-center">
        {tx('Test de integración: verificar que los módulos colaboran correctamente', 'Integration test: verify modules collaborate correctly')}
      </div>
    </div>
  );
};

// ─── E2E Browser Diagram ───────────────────────────────────────────────────────

const E2EDiagram = ({ tx }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % 5), 1600);
    return () => clearInterval(id);
  }, []);

  const userSteps = [
    { label: tx('Abrir navegador', 'Open browser'), icon: '🌐' },
    { label: tx('Ir a /login', 'Go to /login'), icon: '🔗' },
    { label: tx('Escribir credenciales', 'Type credentials'), icon: '⌨️' },
    { label: tx('Click en "Login"', 'Click "Login"'), icon: '🖱️' },
    { label: tx('Verificar dashboard', 'Verify dashboard'), icon: '✅' },
  ];

  const stack = [
    { label: 'Browser', color: 'border-blue-500/40 text-blue-300' },
    { label: 'App UI', color: 'border-amber-500/40 text-amber-300' },
    { label: 'API', color: 'border-green-500/40 text-green-300' },
    { label: 'DB', color: 'border-purple-500/40 text-purple-300' },
  ];

  return (
    <div className="bg-slate-950/40 border border-amber-500/20 rounded-xl p-4 space-y-4">
      {/* Full-stack layers */}
      <div className="flex gap-2 justify-center">
        {stack.map((s, i) => (
          <div key={i} className={`border rounded-lg px-2 py-1 text-xs font-bold ${s.color} bg-slate-900/60`}>
            {s.label}
          </div>
        ))}
      </div>

      {/* Animated user flow */}
      <div className="space-y-1.5">
        {userSteps.map((s, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i === step ? 1 : i < step ? 0.5 : 0.2 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg border transition-all ${
              i === step
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-slate-900/30 border-slate-800'
            }`}
          >
            <span className="text-base">{s.icon}</span>
            <span className="text-sm text-slate-300">{s.label}</span>
            {i < step && <CheckCircle className="w-4 h-4 text-green-400 ml-auto flex-shrink-0" />}
            {i === step && (
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-amber-400 ml-auto flex-shrink-0"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── TDD Cycle Diagram ─────────────────────────────────────────────────────────

const TDDDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 3), 1600);
    return () => clearInterval(id);
  }, []);

  const phases = [
    {
      label: 'RED',
      desc: tx('Escribe un test que falla', 'Write a failing test'),
      color: 'bg-red-500/20 border-red-500/50 text-red-300',
      glow: '0 0 30px rgba(239,68,68,0.5)',
      icon: <XCircle className="w-6 h-6 text-red-400" />,
    },
    {
      label: 'GREEN',
      desc: tx('Escribe código mínimo para pasar', 'Write minimal code to pass'),
      color: 'bg-green-500/20 border-green-500/50 text-green-300',
      glow: '0 0 30px rgba(34,197,94,0.5)',
      icon: <CheckCircle className="w-6 h-6 text-green-400" />,
    },
    {
      label: 'REFACTOR',
      desc: tx('Mejora el código, mantén tests en verde', 'Improve code, keep tests green'),
      color: 'bg-blue-500/20 border-blue-500/50 text-blue-300',
      glow: '0 0 30px rgba(59,130,246,0.5)',
      icon: <Zap className="w-6 h-6 text-blue-400" />,
    },
  ];

  return (
    <div className="bg-slate-950/40 border border-amber-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs text-slate-500 uppercase tracking-widest font-semibold">
        {tx('Ciclo TDD', 'TDD Cycle')}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {phases.map((p, i) => (
          <div key={i} className="flex items-center gap-3">
            <motion.div
              animate={{
                boxShadow: phase === i ? p.glow : '0 0 0px transparent',
                scale: phase === i ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
              className={`border rounded-xl px-5 py-4 text-center min-w-[110px] ${p.color}`}
            >
              <div className="flex justify-center mb-1">{p.icon}</div>
              <div className="font-black text-lg tracking-widest">{p.label}</div>
              <div className="text-xs mt-1 opacity-80">{p.desc}</div>
            </motion.div>
            {i < phases.length - 1 && (
              <span className="text-slate-600 text-2xl hidden sm:block">⟳</span>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-center text-sm text-slate-300 bg-slate-900/50 rounded-lg px-3 py-2"
        >
          {phases[phase].desc}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

function TestingPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('pyramid');

  const sections = [
    {
      id: 'pyramid',
      title: tx('Pirámide', 'Pyramid'),
      subtitle: tx('Estrategia de testing', 'Testing strategy'),
      icon: Layers,
    },
    {
      id: 'unit',
      title: tx('Unitarios', 'Unit Tests'),
      subtitle: 'Jest / Vitest',
      icon: Target,
    },
    {
      id: 'integration',
      title: tx('Integración', 'Integration'),
      subtitle: 'Supertest, DB',
      icon: GitMerge,
    },
    {
      id: 'e2e',
      title: 'E2E',
      subtitle: 'Cypress / Playwright',
      icon: Play,
    },
    {
      id: 'mocking',
      title: 'Mocking',
      subtitle: 'Spies, Stubs, MSW',
      icon: Bug,
    },
    {
      id: 'tdd',
      title: 'TDD',
      subtitle: 'Red → Green → Refactor',
      icon: Shield,
    },
  ];

  // ─── Section: pyramid ─────────────────────────────────────────────────────

  const renderPyramid = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Pirámide de Testing', 'Testing Pyramid')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Equilibra velocidad, costo y confianza distribuyendo tus tests correctamente.',
            'Balance speed, cost and confidence by distributing your tests correctly.'
          )}
        </p>
      </div>

      <PyramidDiagram tx={tx} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
            title: 'E2E',
            color: 'border-red-500/30',
            points: [
              tx('Prueban toda la aplicación end-to-end', 'Test the entire app end-to-end'),
              tx('Lentos: minutos por suite', 'Slow: minutes per suite'),
              tx('Frágiles ante cambios de UI', 'Brittle with UI changes'),
              tx('Alta confianza pero alto costo', 'High confidence but high cost'),
            ],
          },
          {
            icon: <GitMerge className="w-5 h-5 text-orange-400" />,
            title: tx('Integración', 'Integration'),
            color: 'border-orange-500/30',
            points: [
              tx('Prueban la colaboración entre módulos', 'Test collaboration between modules'),
              tx('Verifican contratos de API reales', 'Verify real API contracts'),
              tx('Moderadamente rápidos', 'Moderately fast'),
              tx('Balance costo/confianza', 'Cost/confidence balance'),
            ],
          },
          {
            icon: <Target className="w-5 h-5 text-amber-400" />,
            title: tx('Unitarios', 'Unit'),
            color: 'border-amber-500/30',
            points: [
              tx('Prueban una sola función o clase', 'Test a single function or class'),
              tx('Aislados: dependencias mockeadas', 'Isolated: dependencies mocked'),
              tx('Muy rápidos: milisegundos', 'Very fast: milliseconds'),
              tx('Base de la pirámide: 70%', 'Pyramid base: 70%'),
            ],
          },
          {
            icon: <Shield className="w-5 h-5 text-yellow-400" />,
            title: tx('Estáticos', 'Static'),
            color: 'border-yellow-500/30',
            points: [
              tx('TypeScript, ESLint, Prettier', 'TypeScript, ESLint, Prettier'),
              tx('Errores sin ejecutar código', 'Errors without running code'),
              tx('Instantáneo en el editor', 'Instant feedback in editor'),
              tx('La capa más barata de todas', 'The cheapest layer of all'),
            ],
          },
        ].map(({ icon, title, color, points }) => (
          <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-3">
              {icon}
              <h3 className="font-bold text-white">{title}</h3>
            </div>
            <ul className="space-y-1.5">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── Section: unit ────────────────────────────────────────────────────────

  const renderUnit = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Tests Unitarios con Jest / Vitest', 'Unit Tests with Jest / Vitest')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Prueba funciones en aislamiento. Mockea dependencias externas.',
            'Test functions in isolation. Mock external dependencies.'
          )}
        </p>
      </div>

      <UnitDiagram tx={tx} />

      {/* AAA Pattern */}
      <div className="bg-slate-950/40 border border-amber-500/20 rounded-xl p-4">
        <h3 className="font-bold text-amber-300 mb-3 text-sm uppercase tracking-wide">
          {tx('Patrón AAA (Arrange / Act / Assert)', 'AAA Pattern (Arrange / Act / Assert)')}
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          {[
            { step: 'Arrange', desc: tx('Prepara datos y mocks', 'Prepare data and mocks'), color: 'border-blue-500/40 text-blue-300' },
            { step: 'Act', desc: tx('Ejecuta la función', 'Execute the function'), color: 'border-amber-500/40 text-amber-300' },
            { step: 'Assert', desc: tx('Verifica el resultado', 'Verify the result'), color: 'border-green-500/40 text-green-300' },
          ].map(({ step, desc, color }) => (
            <div key={step} className={`flex-1 border rounded-lg p-3 bg-slate-900/50 ${color}`}>
              <div className="font-bold text-sm mb-1">{step}</div>
              <div className="text-slate-400 text-xs">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Key concepts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { title: tx('Aislamiento', 'Isolation'), desc: tx('Cada test es independiente. No comparte estado entre tests.', 'Each test is independent. No shared state between tests.'), icon: <Shield className="w-4 h-4 text-amber-400" /> },
          { title: 'Mocking', desc: tx('Reemplaza deps reales (DB, HTTP) con objetos controlados.', 'Replace real deps (DB, HTTP) with controlled objects.'), icon: <Bug className="w-4 h-4 text-amber-400" /> },
          { title: 'Snapshot', desc: tx('Captura la salida y la compara en ejecuciones futuras.', 'Captures output and compares it in future runs.'), icon: <Layers className="w-4 h-4 text-amber-400" /> },
        ].map(({ title, desc, icon }) => (
          <div key={title} className="bg-slate-900/50 border border-amber-500/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              {icon}
              <h4 className="font-bold text-slate-200 text-sm">{title}</h4>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <CodeBlock language="javascript" code={`// math.js
function add(a, b) { return a + b; }
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}
module.exports = { add, divide };

// math.test.js  (Jest / Vitest)
const { add, divide } = require('./math');

// ── Arrange / Act / Assert ───────────────────────
describe('Math', () => {
  let logger;

  beforeEach(() => {
    logger = jest.fn(); // reset mock each test
  });

  it('add: sums two numbers', () => {
    // Arrange
    const a = 2, b = 3;
    // Act
    const result = add(a, b);
    // Assert
    expect(result).toBe(5);
  });

  it('divide: throws on zero denominator', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });

  it('fetches user (mock example)', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ id: 1, name: 'Ana' });
    const user = await mockFetch(1);
    expect(mockFetch).toHaveBeenCalledWith(1);
    expect(user.name).toBe('Ana');
  });
});

// ── Snapshot test ────────────────────────────────
it('renders button snapshot', () => {
  const btn = { label: 'Click me', disabled: false };
  expect(btn).toMatchSnapshot();
});`} />
    </div>
  );

  // ─── Section: integration ─────────────────────────────────────────────────

  const renderIntegration = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Tests de Integración', 'Integration Tests')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Verifica que los módulos colaboran correctamente: HTTP, base de datos, servicios externos.',
            'Verify that modules collaborate correctly: HTTP, database, external services.'
          )}
        </p>
      </div>

      <IntegrationDiagram tx={tx} />

      {/* When to mock vs not */}
      <div className="bg-slate-950/40 border border-amber-500/20 rounded-xl p-4">
        <h3 className="font-bold text-amber-300 mb-3 text-sm">
          {tx('¿Cuándo mockear y cuándo no?', 'When to mock vs not?')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="border border-green-500/30 rounded-lg p-3 bg-slate-900/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-300 font-bold text-sm">{tx('Mockear', 'Mock')}</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              <li>• {tx('APIs de terceros (Stripe, Twilio)', 'Third-party APIs (Stripe, Twilio)')}</li>
              <li>• {tx('Servicios externos lentos', 'Slow external services')}</li>
              <li>• {tx('Efectos secundarios no deseados', 'Unwanted side effects')}</li>
              <li>• {tx('Email / SMS / notificaciones', 'Email / SMS / notifications')}</li>
            </ul>
          </div>
          <div className="border border-red-500/30 rounded-lg p-3 bg-slate-900/50">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 font-bold text-sm">{tx('No mockear', "Don't mock")}</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              <li>• {tx('Tu propia base de datos (usa DB de test)', 'Your own DB (use test DB)')}</li>
              <li>• {tx('Lógica de negocio real', 'Real business logic')}</li>
              <li>• {tx('Código que estás integrando', 'Code you are integrating')}</li>
              <li>• {tx('Migraciones y queries SQL', 'Migrations and SQL queries')}</li>
            </ul>
          </div>
        </div>
      </div>

      <CodeBlock language="javascript" code={`// app.js – Express app exported for testing
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/users/:id', async (req, res) => {
  const user = await db.findUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

app.post('/api/users', async (req, res) => {
  const user = await db.createUser(req.body);
  res.status(201).json(user);
});

module.exports = app;

// users.integration.test.js
const request = require('supertest');
const app = require('./app');
const db = require('./db');

beforeAll(async () => {
  await db.migrate(); // run migrations on test DB
});

afterEach(async () => {
  await db.truncate('users'); // clean state between tests
});

afterAll(async () => {
  await db.close();
});

describe('Users API', () => {
  it('GET /api/users/:id returns 404 when user not found', async () => {
    const res = await request(app)
      .get('/api/users/999')
      .expect(404);

    expect(res.body).toHaveProperty('error', 'Not found');
  });

  it('POST /api/users creates a new user', async () => {
    const payload = { name: 'Ana', email: 'ana@example.com' };

    const res = await request(app)
      .post('/api/users')
      .send(payload)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Ana');

    // Verify persisted in DB
    const dbUser = await db.findUserById(res.body.id);
    expect(dbUser).not.toBeNull();
  });
});`} />

      <div className="bg-slate-900/50 border border-amber-500/20 rounded-xl p-4">
        <h3 className="font-bold text-amber-300 mb-2 text-sm">{tx('Contenedores de Test', 'Test Containers')}</h3>
        <p className="text-slate-400 text-xs leading-relaxed">
          {tx(
            'Testcontainers levanta contenedores Docker reales para tu DB durante los tests. Garantiza que tus tests de integración usen la misma versión de PostgreSQL/MySQL/Redis que producción.',
            'Testcontainers spins up real Docker containers for your DB during tests. It guarantees integration tests use the same version of PostgreSQL/MySQL/Redis as production.'
          )}
        </p>
      </div>
    </div>
  );

  // ─── Section: e2e ─────────────────────────────────────────────────────────

  const renderE2E = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('E2E con Cypress / Playwright', 'E2E with Cypress / Playwright')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Prueba flujos completos como lo haría un usuario real en el navegador.',
            'Test complete flows as a real user would in the browser.'
          )}
        </p>
      </div>

      <E2EDiagram tx={tx} />

      {/* Best practices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/50 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h3 className="font-bold text-green-300 text-sm">{tx('Buenas prácticas de selectores', 'Selector best practices')}</h3>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex gap-2"><span className="text-green-400">✓</span> <code className="text-green-300">data-testid="submit-btn"</code></li>
            <li className="flex gap-2"><span className="text-green-400">✓</span> <code className="text-green-300">cy.findByRole('button')</code></li>
            <li className="flex gap-2"><span className="text-green-400">✓</span> <code className="text-green-300">cy.findByLabelText('Email')</code></li>
            <li className="flex gap-2"><span className="text-red-400">✗</span> <code className="text-red-300">.submit-button-v2</code> (CSS classes)</li>
            <li className="flex gap-2"><span className="text-red-400">✗</span> <code className="text-red-300">div &gt; form &gt; button:nth-child(2)</code></li>
          </ul>
        </div>
        <div className="bg-slate-900/50 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-300 text-sm">{tx('Prevenir tests frágiles (flaky)', 'Prevent flaky tests')}</h3>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex gap-2"><span className="text-amber-400">•</span>{tx('Esperar elementos, no tiempos fijos', 'Wait for elements, not fixed times')}</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span>{tx('Intercept y mockear APIs externas', 'Intercept and mock external APIs')}</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span>{tx('Seed de DB antes de cada test', 'DB seed before each test')}</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span>{tx('Evitar dependencias entre tests', 'Avoid test interdependencies')}</li>
            <li className="flex gap-2"><span className="text-amber-400">•</span>{tx('Reintentos automáticos en CI', 'Automatic retries on CI')}</li>
          </ul>
        </div>
      </div>

      <CodeBlock language="javascript" code={`// cypress/e2e/login.cy.js
describe('Login flow', () => {
  beforeEach(() => {
    // Seed test user via API, not UI
    cy.request('POST', '/api/test/seed', {
      email: 'user@test.com',
      password: 'secret123'
    });
    cy.visit('/login');
  });

  it('logs in successfully with valid credentials', () => {
    // Use data-testid selectors (stable)
    cy.get('[data-testid="email-input"]').type('user@test.com');
    cy.get('[data-testid="password-input"]').type('secret123');
    cy.get('[data-testid="login-btn"]').click();

    // Wait for navigation, not arbitrary timeout
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome back').should('be.visible');
  });

  it('shows error on invalid credentials', () => {
    cy.get('[data-testid="email-input"]').type('user@test.com');
    cy.get('[data-testid="password-input"]').type('wrongpass');
    cy.get('[data-testid="login-btn"]').click();

    cy.get('[data-testid="error-msg"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });

  it('intercepts and mocks the auth API', () => {
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { token: 'fake-jwt-token', user: { name: 'Ana' } }
    }).as('loginRequest');

    cy.get('[data-testid="email-input"]').type('any@email.com');
    cy.get('[data-testid="password-input"]').type('anypass');
    cy.get('[data-testid="login-btn"]').click();

    cy.wait('@loginRequest');
    cy.contains('Welcome back, Ana').should('be.visible');
  });
});`} />
    </div>
  );

  // ─── Section: mocking ─────────────────────────────────────────────────────

  const renderMocking = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Mocking y Dobles de Test', 'Mocking & Test Doubles')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Reemplaza dependencias reales con objetos controlados para tests aislados y deterministas.',
            'Replace real dependencies with controlled objects for isolated, deterministic tests.'
          )}
        </p>
      </div>

      {/* 5 types visual */}
      <div className="bg-slate-950/40 border border-amber-500/20 rounded-xl p-4">
        <h3 className="font-bold text-amber-300 mb-3 text-sm">
          {tx('Los 5 tipos de dobles de test', 'The 5 types of test doubles')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              type: 'Dummy',
              color: 'border-slate-600 text-slate-400',
              badge: 'bg-slate-700',
              desc: tx(
                'Objeto pasado pero nunca usado. Solo para llenar parámetros requeridos.',
                'Object passed but never used. Only fills required parameters.'
              ),
              example: 'null, {}, []',
            },
            {
              type: 'Stub',
              color: 'border-yellow-500/40 text-yellow-300',
              badge: 'bg-yellow-500/20',
              desc: tx(
                'Provee respuestas predefinidas. No verifica cómo fue llamado.',
                'Provides predefined responses. Does not verify how it was called.'
              ),
              example: 'mockFn.mockReturnValue(42)',
            },
            {
              type: 'Spy',
              color: 'border-blue-500/40 text-blue-300',
              badge: 'bg-blue-500/20',
              desc: tx(
                'Envuelve la implementación real y registra cómo fue llamado.',
                'Wraps the real implementation and records how it was called.'
              ),
              example: 'jest.spyOn(obj, "method")',
            },
            {
              type: 'Mock',
              color: 'border-amber-500/40 text-amber-300',
              badge: 'bg-amber-500/20',
              desc: tx(
                'Objeto preprogramado con expectativas. Verifica comportamiento.',
                'Pre-programmed object with expectations. Verifies behavior.'
              ),
              example: 'jest.fn().mockResolvedValue()',
            },
            {
              type: 'Fake',
              color: 'border-green-500/40 text-green-300',
              badge: 'bg-green-500/20',
              desc: tx(
                'Implementación simplificada pero funcional (e.g., DB en memoria).',
                'Simplified but functional implementation (e.g., in-memory DB).'
              ),
              example: 'Map() como fake DB',
            },
          ].map(({ type, color, badge, desc, example }) => (
            <div key={type} className={`border rounded-xl p-3 bg-slate-900/50 ${color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${badge} ${color.split(' ')[1]}`}>
                  {type}
                </span>
              </div>
              <p className="text-slate-300 text-xs mb-2 leading-relaxed">{desc}</p>
              <code className="text-xs font-mono text-slate-400">{example}</code>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock language="javascript" code={`// ── jest.fn() — Stub / Mock ──────────────────────
const sendEmail = jest.fn();
sendEmail.mockResolvedValue({ sent: true });

await sendEmail('user@test.com', 'Welcome!');

expect(sendEmail).toHaveBeenCalledTimes(1);
expect(sendEmail).toHaveBeenCalledWith('user@test.com', 'Welcome!');

// ── jest.spyOn() — Spy ───────────────────────────
const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

myFunction(); // calls console.error internally

expect(consoleSpy).toHaveBeenCalled();
consoleSpy.mockRestore(); // restore original

// ── jest.mock() — Module mock ────────────────────
jest.mock('./userService');
const userService = require('./userService');

userService.getUser.mockResolvedValue({ id: 1, name: 'Ana' });

const user = await userService.getUser(1);
expect(user.name).toBe('Ana');

// ── MSW — API mocking (service worker) ──────────
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(ctx.json({ id: req.params.id, name: 'Test User' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('loads user data from API', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Test User');
});

// ── Fake implementation ──────────────────────────
class FakeUserRepository {
  constructor() { this.store = new Map(); }
  async save(user) { this.store.set(user.id, user); return user; }
  async findById(id) { return this.store.get(id) || null; }
}

const repo = new FakeUserRepository();
await repo.save({ id: 1, name: 'Ana' });
expect(await repo.findById(1)).toEqual({ id: 1, name: 'Ana' });`} />
    </div>
  );

  // ─── Section: tdd ─────────────────────────────────────────────────────────

  const renderTDD = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Desarrollo Guiado por Tests (TDD)', 'Test-Driven Development (TDD)')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Escribe el test primero, luego el código mínimo para pasarlo, luego refactoriza.',
            'Write the test first, then minimal code to pass it, then refactor.'
          )}
        </p>
      </div>

      <TDDDiagram tx={tx} />

      {/* Benefits and pitfalls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/50 border border-green-500/30 rounded-xl p-4">
          <h3 className="font-bold text-green-300 mb-3 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            {tx('Beneficios del TDD', 'TDD Benefits')}
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {[
              tx('Diseño emergente: código más simple y desacoplado', 'Emergent design: simpler, decoupled code'),
              tx('Confianza para refactorizar sin miedo', 'Confidence to refactor without fear'),
              tx('Documentación viva: los tests describen el comportamiento', 'Living docs: tests describe behavior'),
              tx('Detecta bugs antes, más baratos de corregir', 'Catches bugs early, cheaper to fix'),
              tx('Coverage natural: cada línea es probada', 'Natural coverage: every line is tested'),
            ].map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-900/50 border border-red-500/30 rounded-xl p-4">
          <h3 className="font-bold text-red-300 mb-3 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {tx('Errores comunes', 'Common pitfalls')}
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {[
              tx('Escribir los tests después del código (no es TDD)', 'Writing tests after code (not TDD)'),
              tx('Tests demasiado acoplados a la implementación', 'Tests too coupled to implementation'),
              tx('No refactorizar en el tercer paso (quedarse en verde)', 'Not refactoring in the third step'),
              tx('Pasar directamente a RED→GREEN sin planear', 'Jumping to RED→GREEN without planning'),
              tx('Aplicar TDD donde no aporta (UI simple, scripts)', 'Applying TDD where it adds no value'),
            ].map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CodeBlock language="javascript" code={`// ─── PASO 1: RED — Test que falla ───────────────
// stack.test.js
const Stack = require('./stack');

describe('Stack', () => {
  it('starts empty', () => {
    const stack = new Stack();
    expect(stack.size()).toBe(0);          // ❌ Stack doesn't exist yet
  });

  it('push adds element', () => {
    const stack = new Stack();
    stack.push('a');
    expect(stack.size()).toBe(1);          // ❌ will fail
  });

  it('pop removes and returns top element', () => {
    const stack = new Stack();
    stack.push('a');
    stack.push('b');
    expect(stack.pop()).toBe('b');         // ❌ will fail
    expect(stack.size()).toBe(1);
  });

  it('pop on empty stack throws', () => {
    const stack = new Stack();
    expect(() => stack.pop()).toThrow('Stack is empty'); // ❌
  });
});

// ─── PASO 2: GREEN — Mínimo para pasar ──────────
// stack.js
class Stack {
  constructor() { this._items = []; }
  size() { return this._items.length; }
  push(item) { this._items.push(item); }
  pop() {
    if (this._items.length === 0) throw new Error('Stack is empty');
    return this._items.pop();
  }
}
module.exports = Stack;
// ✅ All 4 tests pass

// ─── PASO 3: REFACTOR — Mejorar sin romper ───────
class Stack {
  #items = [];                              // private field (ES2022)

  get size() { return this.#items.length; } // getter instead of method

  push(item) {
    if (item === undefined) throw new TypeError('Cannot push undefined');
    this.#items.push(item);
    return this; // chainable
  }

  pop() {
    if (this.#items.length === 0) throw new Error('Stack is empty');
    return this.#items.pop();
  }

  peek() { return this.#items[this.#items.length - 1]; }
}
// ✅ Tests still pass — refactoring is safe`} />
    </div>
  );

  // ─── Render dispatcher ────────────────────────────────────────────────────

  const renderContent = () => {
    switch (active) {
      case 'pyramid': return renderPyramid();
      case 'unit': return renderUnit();
      case 'integration': return renderIntegration();
      case 'e2e': return renderE2E();
      case 'mocking': return renderMocking();
      case 'tdd': return renderTDD();
      default: return renderPyramid();
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
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${active === section.id ? 'text-amber-400' : 'text-slate-500'}`} />
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
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2 space-y-6">
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

export default TestingPro;
