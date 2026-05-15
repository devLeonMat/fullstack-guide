import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, GitMerge, GitCommit, Terminal, Zap, Shield, RefreshCw, ChevronDown, ChevronUp, Box, ArrowRight, Code } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Git Objects Diagram ─────────────────────────────────────────────────────────

const GitObjectsDiagram = ({ tx }) => {
  const [activeObj, setActiveObj] = useState(0);

  const objects = [
    {
      type: 'blob',
      label: tx('Blob — Contenido de archivo', 'Blob — File Content'),
      color: 'border-rose-500/50 text-rose-300 bg-rose-500/10',
      glow: 'rgba(244,63,94,0.4)',
      sha: 'a1b2c3d',
      desc: tx('Almacena el contenido puro de un archivo. No incluye nombre ni ruta.', 'Stores raw file content. Does not include filename or path.'),
      fields: ['content: "console.log(\'hello\')"'],
    },
    {
      type: 'tree',
      label: tx('Tree — Directorio', 'Tree — Directory'),
      color: 'border-orange-500/50 text-orange-300 bg-orange-500/10',
      glow: 'rgba(251,146,60,0.4)',
      sha: 'b3c4d5e',
      desc: tx('Apunta a blobs y otros trees. Representa la estructura de un directorio.', 'Points to blobs and other trees. Represents directory structure.'),
      fields: ['100644 blob a1b2c3d  index.js', '100644 blob f7e8d9c  package.json', '040000 tree c9d0e1f  src/'],
    },
    {
      type: 'commit',
      label: tx('Commit — Snapshot', 'Commit — Snapshot'),
      color: 'border-rose-400/50 text-rose-200 bg-rose-400/10',
      glow: 'rgba(251,113,133,0.4)',
      sha: 'c5d6e7f',
      desc: tx('Apunta a un tree raíz y al commit padre. Incluye metadatos del autor y mensaje.', 'Points to root tree and parent commit. Includes author metadata and message.'),
      fields: ['tree b3c4d5e', 'parent 9a8b7c6', 'author dev <dev@example.com>', 'message: feat: add login'],
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveObj(o => (o + 1) % objects.length), 1600);
    return () => clearInterval(id);
  }, []);

  const obj = objects[activeObj];

  return (
    <div className="bg-slate-950/40 border border-rose-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-rose-300 uppercase tracking-wider">
        {tx('Objetos internos de Git (Content-Addressable Storage)', 'Git Internal Objects (Content-Addressable Storage)')}
      </p>

      {/* Three-object type selector */}
      <div className="flex gap-2 justify-center">
        {objects.map((o, i) => (
          <motion.button
            key={o.type}
            onClick={() => setActiveObj(i)}
            animate={{
              boxShadow: activeObj === i ? `0 0 18px ${o.glow}` : '0 0 0px transparent',
              scale: activeObj === i ? 1.06 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`border rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${o.color} ${activeObj === i ? 'opacity-100' : 'opacity-40'}`}
          >
            {o.type}
          </motion.button>
        ))}
      </div>

      {/* Active object detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeObj}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className={`border rounded-xl p-4 space-y-3 ${obj.color}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm">{obj.label}</span>
            <code className="text-slate-400 font-mono text-xs">SHA: {obj.sha}…</code>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{obj.desc}</p>
          <div className="bg-slate-900/60 rounded-lg p-2.5 space-y-1 font-mono text-xs">
            {obj.fields.map((f, i) => (
              <div key={i} className="text-slate-300">{f}</div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* SHA chain arrows */}
      <div className="flex items-center gap-2 justify-center flex-wrap">
        {['blob a1b2c3d', 'tree b3c4d5e', 'commit c5d6e7f'].map((item, i, arr) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: activeObj === i ? 1 : 0.35 }}
              transition={{ duration: 0.3 }}
              className="border border-rose-500/30 text-rose-300 bg-rose-500/5 rounded-lg px-2 py-1 text-xs font-mono"
            >
              {item}
            </motion.div>
            {i < arr.length - 1 && <span className="text-orange-400/60 text-sm">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Branching Strategy Diagram ──────────────────────────────────────────────────

const BranchingDiagram = ({ tx }) => {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  useEffect(() => {
    const id = setInterval(() => setStep(s => (s + 1) % totalSteps), 1200);
    return () => clearInterval(id);
  }, []);

  const gitFlowBranches = [
    { name: 'main', color: 'border-rose-500/60 text-rose-300 bg-rose-500/10', visibleAt: 0 },
    { name: 'develop', color: 'border-orange-500/60 text-orange-300 bg-orange-500/10', visibleAt: 1 },
    { name: 'feature/login', color: 'border-yellow-500/60 text-yellow-300 bg-yellow-500/10', visibleAt: 2 },
    { name: 'release/1.0', color: 'border-green-500/60 text-green-300 bg-green-500/10', visibleAt: 3 },
    { name: 'hotfix/bug-42', color: 'border-red-500/60 text-red-300 bg-red-500/10', visibleAt: 4 },
  ];

  const trunkBranches = [
    { name: 'main', color: 'border-rose-500/60 text-rose-300 bg-rose-500/10', visibleAt: 0 },
    { name: 'feature/A (short-lived)', color: 'border-orange-400/60 text-orange-300 bg-orange-400/10', visibleAt: 1 },
    { name: 'feature/B (short-lived)', color: 'border-rose-400/60 text-rose-200 bg-rose-400/10', visibleAt: 2 },
  ];

  return (
    <div className="bg-slate-950/40 border border-rose-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-rose-300 uppercase tracking-wider">
        {tx('Estrategias de branching', 'Branching Strategies')}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Git Flow */}
        <div className="border border-rose-500/20 bg-rose-500/5 rounded-xl p-3 space-y-2">
          <p className="text-xs font-bold text-rose-300">Git Flow</p>
          <div className="space-y-1.5">
            {gitFlowBranches.map((b, i) => (
              <motion.div
                key={b.name}
                animate={{ opacity: step >= b.visibleAt ? 1 : 0.2, x: step >= b.visibleAt ? 0 : -6 }}
                transition={{ duration: 0.35 }}
                className={`flex items-center gap-2 border rounded-lg px-2.5 py-1.5 text-xs font-semibold ${b.color}`}
              >
                <GitBranch className="w-3 h-3 flex-shrink-0" />
                <span>{b.name}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-slate-500">{tx('5 tipos de ramas estructuradas', '5 structured branch types')}</p>
        </div>

        {/* Trunk-Based */}
        <div className="border border-orange-500/20 bg-orange-500/5 rounded-xl p-3 space-y-2">
          <p className="text-xs font-bold text-orange-300">{tx('Trunk-Based Development', 'Trunk-Based Development')}</p>
          <div className="space-y-1.5">
            {trunkBranches.map((b, i) => (
              <motion.div
                key={b.name}
                animate={{ opacity: step >= b.visibleAt ? 1 : 0.2, x: step >= b.visibleAt ? 0 : -6 }}
                transition={{ duration: 0.35 }}
                className={`flex items-center gap-2 border rounded-lg px-2.5 py-1.5 text-xs font-semibold ${b.color}`}
              >
                <GitBranch className="w-3 h-3 flex-shrink-0" />
                <span>{b.name}</span>
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: step >= 3 ? 1 : 0.2 }}
              className="flex items-center gap-2 border border-slate-600/40 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-400 bg-slate-800/20"
            >
              <Shield className="w-3 h-3 flex-shrink-0" />
              <span>{tx('Feature flags → producción segura', 'Feature flags → safe production')}</span>
            </motion.div>
          </div>
          <p className="text-xs text-slate-500">{tx('Integración continua directa a main', 'Direct continuous integration to main')}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Rebase vs Merge Diagram ─────────────────────────────────────────────────────

const RebaseDiagram = ({ tx }) => {
  const [phase, setPhase] = useState(0);
  // 0 = initial, 1 = showing merge result, 2 = showing rebase result, cycle 2s
  const totalPhases = 3;

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % totalPhases), 2000);
    return () => clearInterval(id);
  }, []);

  const commits = ['C1', 'C2', 'C3'];

  return (
    <div className="bg-slate-950/40 border border-rose-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-rose-300 uppercase tracking-wider">
        {tx('Merge vs Rebase — Historial de commits', 'Merge vs Rebase — Commit History')}
      </p>

      {/* Initial shared state */}
      <div className="space-y-1">
        <p className="text-xs text-slate-400 font-semibold">{tx('Estado inicial', 'Initial state')}</p>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            {['M1', 'M2'].map((c, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="border border-rose-500/40 text-rose-300 bg-rose-500/10 rounded px-2 py-1 text-xs font-mono">{c}</div>
                {i < 1 && <span className="text-slate-500 text-xs">→</span>}
              </div>
            ))}
            <span className="text-slate-500 text-xs ml-1">← main</span>
          </div>
          <div className="flex items-center gap-1 ml-4">
            {commits.map((c, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="border border-orange-500/40 text-orange-300 bg-orange-500/10 rounded px-2 py-1 text-xs font-mono">{c}</div>
                {i < commits.length - 1 && <span className="text-slate-500 text-xs">→</span>}
              </div>
            ))}
            <span className="text-slate-500 text-xs ml-1">← feature</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Merge column */}
        <motion.div
          animate={{ boxShadow: phase === 1 ? '0 0 16px rgba(244,63,94,0.35)' : '0 0 0px transparent' }}
          className="border border-rose-500/25 bg-rose-500/5 rounded-xl p-3 space-y-2"
        >
          <p className="text-xs font-bold text-rose-300">git merge</p>
          <div className="flex items-center gap-1 flex-wrap">
            {['M1', 'M2', 'C1', 'C2', 'C3'].map((c, i) => (
              <div key={i} className="flex items-center gap-1">
                <motion.div
                  animate={{ opacity: phase >= 1 ? 1 : 0.35 }}
                  className={`border rounded px-2 py-1 text-xs font-mono ${c.startsWith('M') ? 'border-rose-500/40 text-rose-300 bg-rose-500/10' : 'border-orange-500/40 text-orange-300 bg-orange-500/10'}`}
                >
                  {c}
                </motion.div>
                {i < 4 && <span className="text-slate-500 text-xs">→</span>}
              </div>
            ))}
            <span className="text-slate-500 text-xs">→</span>
            <motion.div
              animate={{ opacity: phase >= 1 ? 1 : 0.2, scale: phase === 1 ? 1.1 : 1 }}
              transition={{ duration: 0.35 }}
              className="border border-rose-400/60 text-rose-200 bg-rose-400/15 rounded px-2 py-1 text-xs font-mono font-bold"
            >
              M3(merge)
            </motion.div>
          </div>
          <p className="text-xs text-slate-500">{tx('Crea commit de merge — historial no lineal', 'Creates merge commit — non-linear history')}</p>
        </motion.div>

        {/* Rebase column */}
        <motion.div
          animate={{ boxShadow: phase === 2 ? '0 0 16px rgba(251,146,60,0.35)' : '0 0 0px transparent' }}
          className="border border-orange-500/25 bg-orange-500/5 rounded-xl p-3 space-y-2"
        >
          <p className="text-xs font-bold text-orange-300">git rebase</p>
          <div className="flex items-center gap-1 flex-wrap">
            {["M1", "M2", "C1'", "C2'", "C3'"].map((c, i) => (
              <div key={i} className="flex items-center gap-1">
                <motion.div
                  animate={{ opacity: phase >= 2 ? 1 : 0.35 }}
                  className={`border rounded px-2 py-1 text-xs font-mono ${c.startsWith('M') ? 'border-rose-500/40 text-rose-300 bg-rose-500/10' : 'border-orange-500/40 text-orange-300 bg-orange-500/10'}`}
                >
                  {c}
                </motion.div>
                {i < 4 && <span className="text-slate-500 text-xs">→</span>}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">{tx('Replanta commits — historial lineal limpio', 'Replays commits — clean linear history')}</p>
        </motion.div>
      </div>

      {/* Phase indicator */}
      <div className="flex gap-2 justify-center">
        {[
          tx('Estado inicial', 'Initial'),
          tx('Después de merge', 'After merge'),
          tx('Después de rebase', 'After rebase'),
        ].map((label, i) => (
          <motion.div
            key={i}
            animate={{ opacity: phase === i ? 1 : 0.35, scale: phase === i ? 1.05 : 1 }}
            className="text-xs text-rose-300 border border-rose-500/30 rounded px-2 py-1"
          >
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Advanced Commands Diagram ────────────────────────────────────────────────────

const AdvancedCommandsDiagram = ({ tx }) => {
  const [activeCmd, setActiveCmd] = useState(0);

  const commands = [
    {
      name: 'git cherry-pick',
      color: 'border-rose-500/50 text-rose-300 bg-rose-500/10',
      glow: 'rgba(244,63,94,0.4)',
      desc: tx('Aplica commits específicos de otra rama sin hacer merge completo.', 'Apply specific commits from another branch without full merge.'),
      example: 'git cherry-pick abc1234',
    },
    {
      name: 'git stash',
      color: 'border-orange-500/50 text-orange-300 bg-orange-500/10',
      glow: 'rgba(251,146,60,0.4)',
      desc: tx('Guarda cambios sin confirmar temporalmente para limpiar el working tree.', 'Temporarily saves uncommitted changes to clean working tree.'),
      example: 'git stash push -m "WIP: login feature"',
    },
    {
      name: 'git bisect',
      color: 'border-rose-400/50 text-rose-200 bg-rose-400/10',
      glow: 'rgba(251,113,133,0.4)',
      desc: tx('Búsqueda binaria automática para encontrar el commit que introdujo un bug.', 'Automated binary search to find the commit that introduced a bug.'),
      example: 'git bisect start; git bisect bad HEAD; git bisect good v1.0',
    },
    {
      name: 'git reflog',
      color: 'border-orange-400/50 text-orange-200 bg-orange-400/10',
      glow: 'rgba(251,146,60,0.35)',
      desc: tx('Registro de todos los movimientos de HEAD — rescata commits "perdidos".', 'Record of all HEAD movements — recovers "lost" commits.'),
      example: 'git reflog; git checkout HEAD@{3}',
    },
    {
      name: 'git worktree',
      color: 'border-rose-300/50 text-rose-100 bg-rose-300/10',
      glow: 'rgba(253,164,175,0.3)',
      desc: tx('Múltiples árboles de trabajo desde el mismo repositorio simultáneamente.', 'Multiple working trees from the same repository simultaneously.'),
      example: 'git worktree add ../hotfix-branch hotfix/urgent',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveCmd(c => (c + 1) % commands.length), 1800);
    return () => clearInterval(id);
  }, []);

  const cmd = commands[activeCmd];

  return (
    <div className="bg-slate-950/40 border border-rose-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-rose-300 uppercase tracking-wider">
        {tx('Comandos Git Avanzados', 'Advanced Git Commands')}
      </p>

      {/* Command buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {commands.map((c, i) => (
          <motion.button
            key={c.name}
            onClick={() => setActiveCmd(i)}
            animate={{
              boxShadow: activeCmd === i ? `0 0 14px ${c.glow}` : '0 0 0px transparent',
              scale: activeCmd === i ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`border rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold transition-all ${c.color} ${activeCmd === i ? 'opacity-100' : 'opacity-40'}`}
          >
            {c.name}
          </motion.button>
        ))}
      </div>

      {/* Active command detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCmd}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28 }}
          className={`border rounded-xl p-4 space-y-2 ${cmd.color}`}
        >
          <div className="font-bold text-sm font-mono">{cmd.name}</div>
          <p className="text-xs text-slate-300 leading-relaxed">{cmd.desc}</p>
          <code className="block bg-slate-900/60 rounded-lg px-3 py-2 text-xs font-mono text-orange-300">
            $ {cmd.example}
          </code>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-1.5 justify-center">
        {commands.map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: activeCmd === i ? 1.4 : 1, opacity: activeCmd === i ? 1 : 0.35 }}
            transition={{ duration: 0.25 }}
            className="w-1.5 h-1.5 rounded-full bg-rose-400"
          />
        ))}
      </div>
    </div>
  );
};

// ─── Hooks Pipeline Diagram ──────────────────────────────────────────────────────

const HooksPipelineDiagram = ({ tx }) => {
  const [activeHook, setActiveHook] = useState(0);
  const [passing, setPassing] = useState(true);

  const hooks = [
    {
      name: 'pre-commit',
      label: tx('pre-commit', 'pre-commit'),
      desc: tx('Lint, format, tests unitarios rápidos', 'Lint, format, fast unit tests'),
      color: 'border-rose-500/50 text-rose-300 bg-rose-500/10',
    },
    {
      name: 'commit-msg',
      label: tx('commit-msg', 'commit-msg'),
      desc: tx('Valida formato del mensaje (Conventional Commits)', 'Validates message format (Conventional Commits)'),
      color: 'border-orange-500/50 text-orange-300 bg-orange-500/10',
    },
    {
      name: 'pre-push',
      label: tx('pre-push', 'pre-push'),
      desc: tx('Tests de integración, type-check', 'Integration tests, type-check'),
      color: 'border-rose-400/50 text-rose-200 bg-rose-400/10',
    },
    {
      name: 'post-receive',
      label: tx('post-receive (server)', 'post-receive (server)'),
      desc: tx('Dispara CI/CD, notificaciones', 'Triggers CI/CD, notifications'),
      color: 'border-orange-400/50 text-orange-200 bg-orange-400/10',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setActiveHook(h => {
        const next = (h + 1) % hooks.length;
        setPassing(Math.random() > 0.25); // 75% pass rate simulation
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-rose-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-rose-300 uppercase tracking-wider">
        {tx('Pipeline de Git Hooks', 'Git Hooks Pipeline')}
      </p>

      <div className="flex flex-wrap items-center gap-2 justify-center">
        {hooks.map((hook, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              animate={{
                boxShadow: activeHook === i
                  ? passing
                    ? '0 0 16px rgba(34,197,94,0.45)'
                    : '0 0 16px rgba(239,68,68,0.45)'
                  : '0 0 0px transparent',
                scale: activeHook === i ? 1.06 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`border rounded-xl px-3 py-2 text-center transition-all ${hook.color} ${activeHook === i ? 'opacity-100' : 'opacity-40'}`}
            >
              <div className="text-xs font-bold font-mono">{hook.label}</div>
              <div className="text-xs text-slate-400 mt-0.5 max-w-[120px]">{hook.desc}</div>
              {activeHook === i && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`mt-1 text-xs font-bold ${passing ? 'text-green-400' : 'text-red-400'}`}
                >
                  {passing ? '✓ PASS' : '✗ FAIL'}
                </motion.div>
              )}
            </motion.div>
            {i < hooks.length - 1 && (
              <motion.span
                animate={{ opacity: activeHook >= i ? 1 : 0.2 }}
                className="text-rose-400/60 text-sm font-bold"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 justify-center">
        <div className="flex items-center gap-1.5 text-xs text-green-400">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          {tx('Hook pasa → continúa', 'Hook passes → continues')}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-red-400">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          {tx('Hook falla → operación cancelada', 'Hook fails → operation cancelled')}
        </div>
      </div>
    </div>
  );
};

// ─── CI/CD Workflow Diagram ──────────────────────────────────────────────────────

const CICDWorkflowDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const pipeline = [
    { label: tx('git push', 'git push'), icon: <GitCommit className="w-3.5 h-3.5" />, color: 'border-rose-500/50 text-rose-300 bg-rose-500/10' },
    { label: tx('Trigger CI', 'Trigger CI'), icon: <Zap className="w-3.5 h-3.5" />, color: 'border-orange-500/50 text-orange-300 bg-orange-500/10' },
    { label: tx('Test', 'Test'), icon: <Shield className="w-3.5 h-3.5" />, color: 'border-yellow-500/50 text-yellow-300 bg-yellow-500/10' },
    { label: tx('Build', 'Build'), icon: <Box className="w-3.5 h-3.5" />, color: 'border-rose-400/50 text-rose-200 bg-rose-400/10' },
    { label: tx('Deploy', 'Deploy'), icon: <ArrowRight className="w-3.5 h-3.5" />, color: 'border-green-500/50 text-green-300 bg-green-500/10' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % pipeline.length), 1200);
    return () => clearInterval(id);
  }, []);

  const branchFlow = [
    { branch: 'feature/*', dest: tx('Pull Request', 'Pull Request'), color: 'border-orange-500/40 text-orange-300' },
    { branch: 'main', dest: 'Staging', color: 'border-rose-500/40 text-rose-300' },
    { branch: 'main (tag)', dest: 'Production', color: 'border-green-500/40 text-green-300' },
  ];

  return (
    <div className="bg-slate-950/40 border border-rose-500/20 rounded-xl p-4 space-y-4">
      <p className="text-center text-xs font-semibold text-rose-300 uppercase tracking-wider">
        {tx('Pipeline CI/CD con Git', 'CI/CD Pipeline with Git')}
      </p>

      {/* Main pipeline */}
      <div className="flex flex-wrap items-center gap-1.5 justify-center">
        {pipeline.map((step, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <motion.div
              animate={{
                boxShadow: activeStep === i ? '0 0 18px rgba(244,63,94,0.45)' : '0 0 0px transparent',
                scale: activeStep === i ? 1.08 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`flex items-center gap-1.5 border rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${step.color} ${activeStep === i ? 'opacity-100' : 'opacity-45'}`}
            >
              {step.icon}
              <span>{step.label}</span>
            </motion.div>
            {i < pipeline.length - 1 && (
              <motion.span
                animate={{ opacity: activeStep >= i ? 1 : 0.2 }}
                className="text-rose-400/60 text-sm"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* Branch strategy */}
      <div className="border-t border-slate-800 pt-3 space-y-2">
        <p className="text-xs text-slate-400 font-semibold">{tx('Estrategia de ramas y entornos', 'Branch → Environment strategy')}</p>
        <div className="space-y-1.5">
          {branchFlow.map((bf, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`border rounded px-2 py-0.5 text-xs font-mono font-bold ${bf.color}`}>{bf.branch}</span>
              <span className="text-slate-500 text-xs">→</span>
              <span className="text-slate-300 text-xs">{bf.dest}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Section renderers ───────────────────────────────────────────────────────────

const renderInternals = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Internos de Git', 'Git Internals')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Entiende cómo Git almacena objetos, gestiona el índice y navega referencias.',
          'Understand how Git stores objects, manages the index, and navigates references.'
        )}
      </p>
    </div>

    <GitObjectsDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          icon: <Box className="w-5 h-5 text-rose-400" />,
          title: tx('Almacenamiento content-addressable', 'Content-Addressable Storage'),
          color: 'border-rose-500/30',
          points: [
            tx('Cada objeto tiene SHA-1/SHA-256 como clave', 'Each object has SHA-1/SHA-256 as key'),
            tx('El mismo contenido siempre produce el mismo hash', 'Same content always produces same hash'),
            tx('Los objetos son inmutables una vez creados', 'Objects are immutable once created'),
            tx('Deduplicación automática de contenido idéntico', 'Automatic deduplication of identical content'),
          ],
        },
        {
          icon: <GitCommit className="w-5 h-5 text-orange-400" />,
          title: tx('Tipos de objeto: blob/tree/commit/tag', 'Object types: blob/tree/commit/tag'),
          color: 'border-orange-500/30',
          points: [
            tx('blob: contenido de archivo puro (sin metadatos)', 'blob: raw file content (no metadata)'),
            tx('tree: listado de blobs y trees con permisos', 'tree: listing of blobs and trees with permissions'),
            tx('commit: apunta a tree, parent y autor', 'commit: points to tree, parent and author'),
            tx('tag: referencia nombrada a un commit específico', 'tag: named reference to a specific commit'),
          ],
        },
        {
          icon: <GitBranch className="w-5 h-5 text-rose-400" />,
          title: tx('El índice (staging area)', 'The Index (Staging Area)'),
          color: 'border-rose-400/30',
          points: [
            tx('Archivo binario en .git/index', 'Binary file at .git/index'),
            tx('git add actualiza el índice con nuevos SHAs de blob', 'git add updates index with new blob SHAs'),
            tx('git commit lee el índice para crear el tree', 'git commit reads index to create tree'),
            tx('git diff --cached compara índice vs último commit', 'git diff --cached compares index vs last commit'),
          ],
        },
        {
          icon: <Terminal className="w-5 h-5 text-orange-400" />,
          title: tx('HEAD y refs', 'HEAD and refs'),
          color: 'border-orange-400/30',
          points: [
            tx('HEAD es un puntero al commit activo (o rama)', 'HEAD is a pointer to the active commit (or branch)'),
            tx('.git/refs/heads/* contiene el SHA del tip de cada rama', '.git/refs/heads/* holds SHA of each branch tip'),
            tx('Detached HEAD: HEAD apunta a SHA, no a rama', 'Detached HEAD: HEAD points to SHA, not branch'),
            tx('ORIG_HEAD, MERGE_HEAD: refs temporales de operaciones', 'ORIG_HEAD, MERGE_HEAD: temporary operation refs'),
          ],
        },
      ].map(({ icon, title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            {icon}
            <h3 className="font-bold text-white text-sm">{title}</h3>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-rose-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="bash" code={`# ── Inspeccionar objetos Git ─────────────────────────────────────────
# Mostrar tipo de un objeto
git cat-file -t HEAD               # "commit"
git cat-file -t HEAD:README.md     # "blob"

# Mostrar contenido de un objeto
git cat-file -p HEAD               # muestra el commit
git cat-file -p HEAD:src/index.js  # muestra el archivo

# Crear un blob manualmente
echo "hello world" | git hash-object --stdin        # devuelve SHA
echo "hello world" | git hash-object -w --stdin     # guarda en .git/objects

# Leer un árbol (tree)
git ls-tree HEAD                   # archivos del commit actual
git ls-tree HEAD src/              # solo directorio src/
git ls-tree -r HEAD                # recursivo: todos los archivos

# Ver el índice (staging area)
git ls-files --stage               # lista con SHA de cada blob en índice

# Ver refs
cat .git/HEAD                      # ref: refs/heads/main
cat .git/refs/heads/main           # SHA del tip de main
git show-ref --heads               # todas las ramas y sus SHAs

# Número de objetos y tamaño del repo
git count-objects -v

# Encontrar objetos que ocupan más espacio
git cat-file --batch-all-objects --batch-check | sort -k3 -n -r | head -20`} />
  </div>
);

const renderBranching = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Estrategias de Branching', 'Branching Strategies')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Elige la estrategia de ramas correcta según el ritmo de lanzamiento y el tamaño del equipo.',
          'Choose the right branching strategy based on release cadence and team size.'
        )}
      </p>
    </div>

    <BranchingDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          icon: <GitBranch className="w-5 h-5 text-rose-400" />,
          title: tx('Git Flow — Lanzamientos estables', 'Git Flow — Stable releases'),
          color: 'border-rose-500/30',
          points: [
            tx('5 tipos: main, develop, feature, release, hotfix', '5 types: main, develop, feature, release, hotfix'),
            tx('Ideal para software con versiones definidas (SemVer)', 'Ideal for software with defined versions (SemVer)'),
            tx('Develop acumula features; release estabiliza', 'Develop accumulates features; release stabilizes'),
            tx('Hotfixes van directo a main y se retromergen', 'Hotfixes go direct to main and are back-merged'),
          ],
        },
        {
          icon: <Zap className="w-5 h-5 text-orange-400" />,
          title: tx('Trunk-Based — Optimizado para CI/CD', 'Trunk-Based — CI/CD optimized'),
          color: 'border-orange-500/30',
          points: [
            tx('Todos integran a main (trunk) frecuentemente', 'Everyone integrates to main (trunk) frequently'),
            tx('Ramas de feature muy cortas (<1-2 días)', 'Feature branches very short-lived (<1-2 days)'),
            tx('Feature flags para código incompleto en producción', 'Feature flags for incomplete code in production'),
            tx('Requiere alta cobertura de tests automatizados', 'Requires high automated test coverage'),
          ],
        },
        {
          icon: <GitMerge className="w-5 h-5 text-rose-400" />,
          title: 'GitHub Flow — Simplificado',
          color: 'border-rose-400/30',
          points: [
            tx('Una sola rama larga: main', 'Single long-lived branch: main'),
            tx('Feature branches directas a main via PR', 'Feature branches directly to main via PR'),
            tx('Deploy desde main en cada merge aprobado', 'Deploy from main on each approved merge'),
            tx('Ideal para apps web con despliegue continuo', 'Ideal for web apps with continuous deployment'),
          ],
        },
        {
          icon: <Shield className="w-5 h-5 text-orange-400" />,
          title: tx('¿Cuándo usar cada estrategia?', 'When to use each strategy?'),
          color: 'border-orange-400/30',
          points: [
            tx('Git Flow: librerías, apps móviles, software B2B', 'Git Flow: libraries, mobile apps, B2B software'),
            tx('Trunk-Based: SaaS, microservicios con CI maduro', 'Trunk-Based: SaaS, microservices with mature CI'),
            tx('GitHub Flow: startups, proyectos con 1-10 devs', 'GitHub Flow: startups, 1-10 dev projects'),
            tx('Escoge según cadencia de release, no moda', 'Choose by release cadence, not trend'),
          ],
        },
      ].map(({ icon, title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            {icon}
            <h3 className="font-bold text-white text-sm">{title}</h3>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-rose-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="bash" code={`# ── git-flow CLI (instalar: brew install git-flow-avh) ──────────────
# Inicializar git flow en un repo
git flow init -d          # -d acepta todos los defaults

# Iniciar y terminar una feature
git flow feature start user-auth
# ... hacer commits ...
git flow feature finish user-auth    # merge a develop, borra rama

# Publicar feature para colaborar
git flow feature publish user-auth

# Iniciar un release (desde develop)
git flow release start 1.2.0
# ... bumps de versión, fixes finales ...
git flow release finish 1.2.0       # merge a main + tag + merge a develop

# Hotfix de producción (desde main)
git flow hotfix start fix-null-crash
# ... fix ...
git flow hotfix finish fix-null-crash   # merge a main + tag + merge a develop

# ── Convenciones de nombres de rama ─────────────────────────────────
# Feature branch
git checkout -b feature/GH-123-oauth-login develop

# Bugfix branch
git checkout -b fix/GH-456-null-crash develop

# Release branch
git checkout -b release/2.1.0 develop

# ── Branch protection rules (GitHub CLI) ────────────────────────────
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["ci/tests","ci/lint"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null`} />
  </div>
);

const renderRebase = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Rebase vs Merge', 'Rebase vs Merge')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Mantén un historial limpio con rebase interactivo o preserva el contexto con merge.',
          'Keep a clean history with interactive rebase or preserve context with merge.'
        )}
      </p>
    </div>

    <RebaseDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          icon: <GitMerge className="w-5 h-5 text-rose-400" />,
          title: tx('Merge — preserva historial', 'Merge — preserves history'),
          color: 'border-rose-500/30',
          points: [
            tx('Crea un commit de merge extra en el historial', 'Creates extra merge commit in history'),
            tx('Seguro para ramas públicas/compartidas', 'Safe for public/shared branches'),
            tx('git log --graph muestra la topología real', 'git log --graph shows real topology'),
            tx('Fácil de revertir: git revert -m 1 <merge-sha>', 'Easy to revert: git revert -m 1 <merge-sha>'),
          ],
        },
        {
          icon: <RefreshCw className="w-5 h-5 text-orange-400" />,
          title: tx('Rebase — historial lineal', 'Rebase — linear history'),
          color: 'border-orange-500/30',
          points: [
            tx('Replanta commits sobre el tip del target', 'Replays commits on top of the target tip'),
            tx('NUNCA rebase ramas públicas/compartidas', 'NEVER rebase public/shared branches'),
            tx('Crea nuevos SHAs: git push --force-with-lease', 'Creates new SHAs: git push --force-with-lease'),
            tx('Historial limpio y fácil de leer con git log', 'Clean history easy to read with git log'),
          ],
        },
        {
          icon: <Code className="w-5 h-5 text-rose-400" />,
          title: tx('Rebase interactivo', 'Interactive rebase'),
          color: 'border-rose-400/30',
          points: [
            tx('git rebase -i HEAD~N: edita los últimos N commits', 'git rebase -i HEAD~N: edit last N commits'),
            tx('pick: mantener, squash/s: fusionar con anterior', 'pick: keep, squash/s: fuse with previous'),
            tx('fixup/f: squash descartando el mensaje', 'fixup/f: squash discarding message'),
            tx('reword/r: cambiar solo el mensaje del commit', 'reword/r: change only the commit message'),
          ],
        },
        {
          icon: <GitCommit className="w-5 h-5 text-orange-400" />,
          title: tx('Squash merging', 'Squash merging'),
          color: 'border-orange-400/30',
          points: [
            tx('git merge --squash: combina toda la rama en un commit', 'git merge --squash: combines entire branch into one commit'),
            tx('Mantiene main limpio con commits lógicos', 'Keeps main clean with logical commits'),
            tx('Estándar en GitHub/GitLab PR merges', 'Standard in GitHub/GitLab PR merges'),
            tx('Desventaja: se pierde autoría granular', 'Downside: granular authorship is lost'),
          ],
        },
      ].map(({ icon, title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            {icon}
            <h3 className="font-bold text-white text-sm">{title}</h3>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-rose-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="bash" code={`# ── Rebase interactivo: limpiar los últimos 3 commits ───────────────
git rebase -i HEAD~3

# En el editor aparece algo como:
# pick a1b2c3d feat: add login form
# pick b2c3d4e wip: fix typo
# pick c3d4e5f wip: another fix

# Cambia a:
# pick a1b2c3d feat: add login form
# fixup b2c3d4e wip: fix typo       ← squash sin mensaje
# reword c3d4e5f fix: correct validation   ← renombra este commit

# Guardar y cerrar → Git aplica los cambios

# ── Rebase feature sobre main actualizado ────────────────────────────
git checkout feature/user-auth
git fetch origin
git rebase origin/main            # replanta sobre main remoto
# si hay conflictos:
git status                        # ver archivos en conflicto
# resolver conflictos...
git add .
git rebase --continue             # continuar rebase
# o abortar:
git rebase --abort

# Push forzado seguro después de rebase
git push --force-with-lease       # falla si alguien hizo push mientras tanto

# ── Squash merge de feature branch ──────────────────────────────────
git checkout main
git merge --squash feature/user-auth
git commit -m "feat: add user authentication (#123)"

# ── Merge con fast-forward desactivado (siempre merge commit) ────────
git merge --no-ff feature/user-auth -m "Merge feature/user-auth into main"

# ── Ver log gráfico ──────────────────────────────────────────────────
git log --oneline --graph --decorate --all`} />
  </div>
);

const renderAdvanced = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Comandos Avanzados', 'Advanced Commands')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Domina cherry-pick, stash, bisect, reflog y worktree para casos de uso avanzados.',
          'Master cherry-pick, stash, bisect, reflog and worktree for advanced use cases.'
        )}
      </p>
    </div>

    <AdvancedCommandsDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          icon: <GitBranch className="w-5 h-5 text-rose-400" />,
          title: 'git stash — Guardado temporal',
          color: 'border-rose-500/30',
          points: [
            tx('git stash push -m "descripción": guarda cambios staged y tracked', 'git stash push -m "desc": saves staged and tracked changes'),
            tx('git stash list: lista todos los stashes guardados', 'git stash list: lists all saved stashes'),
            tx('git stash pop: aplica stash más reciente y lo elimina', 'git stash pop: applies most recent stash and deletes it'),
            tx('git stash apply stash@{2}: aplica un stash específico sin borrarlo', 'git stash apply stash@{2}: apply specific stash without deleting'),
          ],
        },
        {
          icon: <GitCommit className="w-5 h-5 text-orange-400" />,
          title: 'git cherry-pick — Commits selectivos',
          color: 'border-orange-500/30',
          points: [
            tx('git cherry-pick <sha>: aplica un commit a la rama actual', 'git cherry-pick <sha>: applies one commit to current branch'),
            tx('git cherry-pick A..B: rango de commits (excluye A, incluye B)', 'git cherry-pick A..B: range of commits (excludes A, includes B)'),
            tx('git cherry-pick --no-commit: aplica cambios sin hacer commit', 'git cherry-pick --no-commit: apply changes without committing'),
            tx('Útil para backport de fixes a ramas de mantenimiento', 'Useful for backporting fixes to maintenance branches'),
          ],
        },
        {
          icon: <Terminal className="w-5 h-5 text-rose-400" />,
          title: 'git bisect — Búsqueda de bugs',
          color: 'border-rose-400/30',
          points: [
            tx('Búsqueda binaria: O(log n) en el historial de commits', 'Binary search: O(log n) across commit history'),
            tx('git bisect start; git bisect bad; git bisect good <tag>', 'git bisect start; git bisect bad; git bisect good <tag>'),
            tx('git bisect run <script>: totalmente automatizado', 'git bisect run <script>: fully automated'),
            tx('git bisect reset: vuelve al estado original', 'git bisect reset: returns to original state'),
          ],
        },
        {
          icon: <RefreshCw className="w-5 h-5 text-orange-400" />,
          title: 'git reflog — Recuperar commits',
          color: 'border-orange-400/30',
          points: [
            tx('Registra cada movimiento de HEAD (local, no se pushea)', 'Records every HEAD movement (local, not pushed)'),
            tx('git reflog: ver historial con formato HEAD@{N}', 'git reflog: view history with HEAD@{N} format'),
            tx('git checkout HEAD@{5}: ir a un estado anterior', 'git checkout HEAD@{5}: go to a previous state'),
            tx('git branch recovered HEAD@{3}: recuperar rama borrada', 'git branch recovered HEAD@{3}: recover deleted branch'),
          ],
        },
      ].map(({ icon, title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            {icon}
            <h3 className="font-bold text-white text-sm">{title}</h3>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-rose-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="bash" code={`# ── git bisect automatizado con script ──────────────────────────────
git bisect start
git bisect bad HEAD            # el bug existe en HEAD
git bisect good v2.3.0         # no existía en v2.3.0

# Bisect automático: el script retorna 0=good, 1=bad
git bisect run bash -c '
  npm test --silent 2>/dev/null
  exit $?
'

# Git imprimirá: "<sha> is the first bad commit"
git bisect reset               # volver al estado original

# ── git stash workflow completo ──────────────────────────────────────
# Guardar con mensaje
git stash push -m "WIP: refactoring auth module" --include-untracked

# Ver todos los stashes
git stash list
# stash@{0}: On feature/auth: WIP: refactoring auth module
# stash@{1}: On main: hotfix prep

# Inspeccionar sin aplicar
git stash show -p stash@{0}

# Aplicar y borrar
git stash pop                  # stash@{0}
git stash pop stash@{1}        # específico

# Crear rama desde un stash
git stash branch feature/recovered-work stash@{0}

# Borrar todos los stashes
git stash clear

# ── cherry-pick de rango ─────────────────────────────────────────────
# Aplicar commits del SHA A al SHA B (A no incluido)
git cherry-pick abc1234..def5678

# Aplicar commits incluyendo A
git cherry-pick abc1234^..def5678

# Cherry-pick sin auto-commit (para revisar antes)
git cherry-pick --no-commit abc1234 def5678
git diff --staged              # revisar los cambios
git commit -m "feat: backport login fix to v1.x"

# ── Recuperar rama borrada con reflog ────────────────────────────────
git reflog | grep "feature/payment"
# HEAD@{12}: checkout: moving from feature/payment to main

git checkout -b feature/payment HEAD@{12}  # restaurar rama

# ── git worktree: trabajar en dos ramas simultáneamente ──────────────
git worktree add ../myrepo-hotfix hotfix/urgent-fix
cd ../myrepo-hotfix
# ... hacer cambios y commits ...
cd ../myrepo
git worktree remove ../myrepo-hotfix`} />
  </div>
);

const renderHooks = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Git Hooks y Automatización', 'Git Hooks & Automation')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Automatiza calidad de código con hooks, Husky y lint-staged en cada commit y push.',
          'Automate code quality with hooks, Husky and lint-staged on every commit and push.'
        )}
      </p>
    </div>

    <HooksPipelineDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          icon: <Terminal className="w-5 h-5 text-rose-400" />,
          title: tx('Hooks del cliente', 'Client-side hooks'),
          color: 'border-rose-500/30',
          points: [
            tx('pre-commit: lint, tests, format antes del commit', 'pre-commit: lint, tests, format before commit'),
            tx('commit-msg: valida el formato del mensaje', 'commit-msg: validates message format'),
            tx('prepare-commit-msg: auto-completa el mensaje', 'prepare-commit-msg: auto-fills message'),
            tx('pre-push: tests de integración antes del push', 'pre-push: integration tests before push'),
          ],
        },
        {
          icon: <Server className="w-5 h-5 text-orange-400" />,
          title: tx('Hooks del servidor', 'Server-side hooks'),
          color: 'border-orange-500/30',
          points: [
            tx('pre-receive: rechaza pushes que violan políticas', 'pre-receive: rejects pushes violating policies'),
            tx('update: validación por rama (más granular)', 'update: per-branch validation (more granular)'),
            tx('post-receive: dispara CI/CD, notificaciones, deploy', 'post-receive: triggers CI/CD, notifications, deploy'),
            tx('Se ejecutan en el servidor, no ignorables por cliente', 'Run on server, cannot be skipped by client'),
          ],
        },
        {
          icon: <Zap className="w-5 h-5 text-rose-400" />,
          title: tx('Husky — Hooks fáciles de compartir', 'Husky — Easy shareable hooks'),
          color: 'border-rose-400/30',
          points: [
            tx('npm install --save-dev husky', 'npm install --save-dev husky'),
            tx('npx husky init → crea .husky/ y configura prepare', 'npx husky init → creates .husky/ and sets up prepare'),
            tx('Hooks en .husky/ se versionan con el proyecto', 'Hooks in .husky/ are versioned with the project'),
            tx('Todo el equipo usa los mismos hooks automáticamente', 'Whole team uses same hooks automatically'),
          ],
        },
        {
          icon: <Shield className="w-5 h-5 text-orange-400" />,
          title: 'lint-staged — Lint solo lo que cambia',
          color: 'border-orange-400/30',
          points: [
            tx('Ejecuta linters solo sobre archivos staged (git add)', 'Runs linters only on staged files (git add)'),
            tx('Mucho más rápido que lintear todo el proyecto', 'Much faster than linting the whole project'),
            tx('Configurable por extensión de archivo', 'Configurable per file extension'),
            tx('Se integra directamente con el hook pre-commit', 'Integrates directly with pre-commit hook'),
          ],
        },
      ].map(({ icon, title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            {icon}
            <h3 className="font-bold text-white text-sm">{title}</h3>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-rose-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="bash" code={`# ── .husky/pre-commit ────────────────────────────────────────────────
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Ejecutar lint-staged (solo archivos staged)
npx lint-staged

# Type check de TypeScript
npx tsc --noEmit

# Salir con error si algo falla (detiene el commit)
exit $?`} />

    <CodeBlock language="bash" code={`# ── .husky/commit-msg ────────────────────────────────────────────────
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Validar mensaje con commitlint
npx --no-install commitlint --edit "$1"`} />

    <CodeBlock language="javascript" code={`// commitlint.config.js — Conventional Commits
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Tipos permitidos: feat, fix, docs, style, refactor, test, chore, ci
    'type-enum': [2, 'always', [
      'feat',     // Nueva funcionalidad
      'fix',      // Bug fix
      'docs',     // Solo documentación
      'style',    // Formato, sin lógica
      'refactor', // Refactorización
      'test',     // Tests
      'chore',    // Build, deps, config
      'ci',       // CI/CD
      'perf',     // Mejoras de rendimiento
      'revert',   // Revertir commit
    ]],
    'subject-max-length': [2, 'always', 72],
    'subject-case': [2, 'always', 'lower-case'],
    'body-max-line-length': [1, 'always', 100],
  },
};`} />

    <CodeBlock language="json" code={`// package.json — lint-staged config
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml,yaml}": [
      "prettier --write"
    ],
    "*.{css,scss}": [
      "stylelint --fix",
      "prettier --write"
    ]
  },
  "scripts": {
    "prepare": "husky"
  },
  "devDependencies": {
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "@commitlint/cli": "^19.0.0",
    "@commitlint/config-conventional": "^19.0.0"
  }
}`} />
  </div>
);

// Tiny functional component to avoid using class names from outer scope
const Server = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="2" y="3" width="20" height="4" rx="1" />
    <rect x="2" y="10" width="20" height="4" rx="1" />
    <rect x="2" y="17" width="20" height="4" rx="1" />
    <circle cx="19" cy="5" r="1" fill="currentColor" />
    <circle cx="19" cy="12" r="1" fill="currentColor" />
    <circle cx="19" cy="19" r="1" fill="currentColor" />
  </svg>
);

const renderWorkflows = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Flujos CI/CD con Git', 'CI/CD Git Workflows')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Commits convencionales, versionado semántico automático y GitHub Actions para releases.',
          'Conventional commits, automatic semantic versioning and GitHub Actions for releases.'
        )}
      </p>
    </div>

    <CICDWorkflowDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          icon: <GitCommit className="w-5 h-5 text-rose-400" />,
          title: tx('Conventional Commits', 'Conventional Commits'),
          color: 'border-rose-500/30',
          points: [
            tx('formato: <type>[scope]: <description>', 'format: <type>[scope]: <description>'),
            tx('feat: nueva feature → bump MINOR (1.X.0)', 'feat: new feature → bumps MINOR (1.X.0)'),
            tx('fix: bug fix → bump PATCH (1.0.X)', 'fix: bug fix → bumps PATCH (1.0.X)'),
            tx('BREAKING CHANGE: en footer → bump MAJOR (X.0.0)', 'BREAKING CHANGE: in footer → bumps MAJOR (X.0.0)'),
          ],
        },
        {
          icon: <Zap className="w-5 h-5 text-orange-400" />,
          title: tx('Versionado semántico automático', 'Automatic semantic versioning'),
          color: 'border-orange-500/30',
          points: [
            tx('semantic-release analiza commits desde último tag', 'semantic-release analyzes commits since last tag'),
            tx('Genera CHANGELOG.md automáticamente', 'Generates CHANGELOG.md automatically'),
            tx('Crea tag Git y GitHub Release', 'Creates Git tag and GitHub Release'),
            tx('Publica a npm/Docker Hub si se configura', 'Publishes to npm/Docker Hub if configured'),
          ],
        },
        {
          icon: <RefreshCw className="w-5 h-5 text-rose-400" />,
          title: tx('GitHub Actions — Disparadores', 'GitHub Actions — Triggers'),
          color: 'border-rose-400/30',
          points: [
            tx('on: push: branches: [main]: dispara en merge a main', 'on: push: branches: [main]: triggers on merge to main'),
            tx('on: pull_request: validaciones en PR', 'on: pull_request: validations on PR'),
            tx('on: push: tags: ["v*"]: dispara en tags de release', 'on: push: tags: ["v*"]: triggers on release tags'),
            tx('on: workflow_dispatch: ejecución manual', 'on: workflow_dispatch: manual execution'),
          ],
        },
        {
          icon: <Shield className="w-5 h-5 text-orange-400" />,
          title: tx('Reglas de ramas protegidas', 'Protected branch rules'),
          color: 'border-orange-400/30',
          points: [
            tx('Require status checks: CI debe pasar antes de merge', 'Require status checks: CI must pass before merge'),
            tx('Require pull request reviews: al menos 1 aprobación', 'Require pull request reviews: at least 1 approval'),
            tx('Require signed commits: GPG o SSH key signing', 'Require signed commits: GPG or SSH key signing'),
            tx('Restrict pushes: solo via PR, no direct push a main', 'Restrict pushes: only via PR, no direct push to main'),
          ],
        },
      ].map(({ icon, title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            {icon}
            <h3 className="font-bold text-white text-sm">{title}</h3>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-rose-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="yaml" code={`# .github/workflows/ci.yml — CI en cada PR y push a main
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    name: Test & Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Unit tests with coverage
        run: npm test -- --coverage --ci

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          token: \${{ secrets.CODECOV_TOKEN }}

  build:
    name: Build
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 1`} />

    <CodeBlock language="yaml" code={`# .github/workflows/release.yml — semantic-release en push a main
name: Release

on:
  push:
    branches: [main]

permissions:
  contents: write
  issues: write
  pull-requests: write

jobs:
  release:
    name: Semantic Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0           # semantic-release necesita todo el historial

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - name: Semantic Release
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
        run: npx semantic-release`} />

    <CodeBlock language="json" code={`// .releaserc.json — configuración de semantic-release
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {
      "changelogFile": "CHANGELOG.md"
    }],
    ["@semantic-release/npm", {
      "npmPublish": false
    }],
    ["@semantic-release/git", {
      "assets": ["CHANGELOG.md", "package.json"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\\n\\n${nextRelease.notes}"
    }],
    "@semantic-release/github"
  ]
}`} />

    <CodeBlock language="bash" code={`# ── Ejemplos de Conventional Commits ────────────────────────────────
# PATCH bump (1.0.0 → 1.0.1)
git commit -m "fix(auth): handle null user on token refresh"
git commit -m "fix: prevent XSS in user input sanitization"

# MINOR bump (1.0.1 → 1.1.0)
git commit -m "feat(payments): add Stripe subscription support"
git commit -m "feat: export CSV from dashboard"

# MAJOR bump (1.1.0 → 2.0.0)
git commit -m "feat!: redesign REST API endpoints

BREAKING CHANGE: /api/v1/* routes are removed.
Migrate to /api/v2/* using the migration guide."

# No bump (chore, docs, ci, test, style, refactor)
git commit -m "chore(deps): upgrade react to 19.1.0"
git commit -m "docs: update API authentication guide"
git commit -m "ci: add SAST scanning step to pipeline"
git commit -m "test(auth): add unit tests for JWT refresh logic"
git commit -m "refactor: extract validation logic to separate module"`} />
  </div>
);

// ─── Interview Prep Section ──────────────────────────────────────────────────────

const InterviewAccordion = ({ level, questions, color }) => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className={`bg-slate-900/50 border ${color} rounded-xl overflow-hidden`}>
      <div className={`px-4 py-3 border-b ${color} bg-slate-900/40`}>
        <h3 className="font-bold text-white text-sm">{level}</h3>
      </div>
      <div className="divide-y divide-slate-800/60">
        {questions.map((q, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left hover:bg-slate-800/30 transition-colors"
            >
              <span className="text-sm text-slate-200 leading-snug">{q.q}</span>
              <span className="flex-shrink-0 mt-0.5">
                {openIdx === i
                  ? <ChevronUp className="w-4 h-4 text-rose-400" />
                  : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </span>
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {q.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const renderInterview = (tx) => {
  const levels = [
    {
      level: tx('Junior', 'Junior'),
      color: 'border-rose-500/30',
      questions: [
        {
          q: tx('¿Cuál es la diferencia entre git merge y git rebase?', 'What is the difference between git merge and git rebase?'),
          a: tx(
            'git merge combina dos ramas creando un commit de merge, preservando el historial completo con su topología de divergencia. git rebase replanta los commits de la rama feature sobre el tip del target, produciendo un historial lineal sin commit de merge. Regla clave: nunca rebase ramas públicas/compartidas porque reescribe los SHAs.',
            'git merge combines two branches by creating a merge commit, preserving the full history with its divergence topology. git rebase replays commits from the feature branch on top of the target tip, producing a linear history without a merge commit. Key rule: never rebase public/shared branches because it rewrites SHAs.'
          ),
        },
        {
          q: tx('¿Qué es el staging area (índice) en Git?', 'What is the staging area (index) in Git?'),
          a: tx(
            'El staging area (o índice) es una capa intermedia entre el working tree y el repositorio. Con git add colocas archivos o partes de archivos en el índice. git commit toma exactamente lo que hay en el índice y crea un commit. Esto permite commits granulares: puedes añadir solo algunas líneas de un archivo con git add -p.',
            'The staging area (or index) is an intermediate layer between the working tree and the repository. git add places files or partial files into the index. git commit takes exactly what is in the index and creates a commit. This enables granular commits: you can add only some lines of a file with git add -p.'
          ),
        },
        {
          q: tx('¿Cómo deshacer el último commit sin perder los cambios?', 'How do you undo the last commit without losing changes?'),
          a: tx(
            'git reset HEAD~1 (o git reset --mixed HEAD~1) deshace el commit y mueve los cambios de vuelta al staging area. git reset --soft HEAD~1 los deja staged. git reset --hard HEAD~1 los descarta completamente. Para un commit ya pusheado a un repositorio compartido, preferir git revert HEAD, que crea un nuevo commit que invierte los cambios.',
            'git reset HEAD~1 (or git reset --mixed HEAD~1) undoes the commit and moves changes back to the staging area. git reset --soft HEAD~1 leaves them staged. git reset --hard HEAD~1 discards them entirely. For a commit already pushed to a shared repository, prefer git revert HEAD, which creates a new commit that inverts the changes.'
          ),
        },
        {
          q: tx('¿Qué hace git stash y cuándo lo usarías?', 'What does git stash do and when would you use it?'),
          a: tx(
            'git stash guarda temporalmente los cambios no confirmados (staged + tracked unstaged) limpiando el working tree. Útil cuando necesitas cambiar de rama urgentemente sin hacer commit de trabajo incompleto. Los más comunes: git stash push -m "mensaje" para guardar, git stash pop para recuperar el último, git stash list para ver todos. También acepta --include-untracked para archivos nuevos.',
            'git stash temporarily saves uncommitted changes (staged + tracked unstaged) cleaning the working tree. Useful when you need to switch branches urgently without committing incomplete work. Most common: git stash push -m "message" to save, git stash pop to recover the last, git stash list to see all. Also accepts --include-untracked for new files.'
          ),
        },
        {
          q: tx('¿Cuál es la diferencia entre git fetch y git pull?', 'What is the difference between git fetch and git pull?'),
          a: tx(
            'git fetch descarga los cambios del remoto y actualiza las refs remotas (origin/main, etc.) pero NO modifica tu working tree ni tus ramas locales. git pull es git fetch + git merge (o git rebase si se configura con --rebase). Best practice: usar git fetch + git log origin/main..HEAD para revisar qué hay antes de integrar.',
            'git fetch downloads remote changes and updates remote refs (origin/main, etc.) but does NOT modify your working tree or local branches. git pull is git fetch + git merge (or git rebase if configured with --rebase). Best practice: use git fetch + git log origin/main..HEAD to review what is there before integrating.'
          ),
        },
      ],
    },
    {
      level: tx('Mid-level', 'Mid-level'),
      color: 'border-orange-500/30',
      questions: [
        {
          q: tx('Explica los internos de Git: tipos de objetos y content-addressable storage.', 'Explain Git internals: object types and content-addressable storage.'),
          a: tx(
            'Git usa un almacén de objetos content-addressable: cada objeto se identifica por el SHA-1/SHA-256 de su contenido. Hay 4 tipos: blob (contenido puro de archivo), tree (directorio: lista de blobs y trees con permisos y nombres), commit (apunta a un tree raíz, un parent commit y tiene metadatos de autor/fecha/mensaje), y tag (referencia nombrada a otro objeto). Los objetos se guardan comprimidos en .git/objects/ o en pack files. Puedes inspeccionarlos con git cat-file -p <sha>.',
            'Git uses a content-addressable object store: each object is identified by the SHA-1/SHA-256 of its content. There are 4 types: blob (raw file content), tree (directory: list of blobs and trees with permissions and names), commit (points to a root tree, a parent commit, and has author/date/message metadata), and tag (named reference to another object). Objects are stored compressed in .git/objects/ or in pack files. You can inspect them with git cat-file -p <sha>.'
          ),
        },
        {
          q: tx('¿Cómo resolverías un conflicto de merge complejo con múltiples archivos?', 'How would you resolve a complex merge conflict with multiple files?'),
          a: tx(
            'Estrategia sistemática: (1) git status para identificar archivos en conflicto. (2) Para cada archivo, usar una herramienta de diff a 3 vías: git mergetool (vimdiff, VS Code). (3) Entender el contexto de ambos cambios antes de elegir. (4) git add <archivo> después de resolver cada uno. (5) git commit para completar el merge. Para conflictos recurrentes, git rerere (Reuse Recorded Resolution) memoriza resoluciones pasadas. Para archivos binarios: git checkout --ours/--theirs <archivo>.',
            'Systematic strategy: (1) git status to identify conflicting files. (2) For each file, use a 3-way diff tool: git mergetool (vimdiff, VS Code). (3) Understand the context of both changes before choosing. (4) git add <file> after resolving each one. (5) git commit to complete the merge. For recurring conflicts, git rerere (Reuse Recorded Resolution) memorizes past resolutions. For binary files: git checkout --ours/--theirs <file>.'
          ),
        },
        {
          q: tx('¿Cuándo usarías git bisect y cómo lo automatizarías?', 'When would you use git bisect and how would you automate it?'),
          a: tx(
            'git bisect se usa para encontrar qué commit introdujo una regresión. Funciona con búsqueda binaria: O(log n) commits a revisar. Para automatizarlo: git bisect start, git bisect bad HEAD, git bisect good <ultimo-tag-bueno>, luego git bisect run <script> donde el script retorna 0 si el commit es bueno y código no-cero si es malo. Ideal para bugs detectados por tests automatizados. Al finalizar, git bisect reset vuelve al estado original.',
            'git bisect is used to find which commit introduced a regression. It works with binary search: O(log n) commits to review. To automate it: git bisect start, git bisect bad HEAD, git bisect good <last-good-tag>, then git bisect run <script> where the script returns 0 if the commit is good and non-zero if bad. Ideal for bugs detected by automated tests. When done, git bisect reset returns to original state.'
          ),
        },
        {
          q: tx('Monorepo vs polyrepo: ventajas y desventajas desde la perspectiva de Git.', 'Monorepo vs polyrepo: advantages and disadvantages from a Git perspective.'),
          a: tx(
            'Monorepo: un solo repo con múltiples proyectos. Ventajas: refactoring atómico cross-proyecto, cambios coordinados, un solo historial, tooling compartido (Nx, Turborepo). Desventajas: repo grande con git history lento, git clone tarda más, necesita herramientas como git sparse-checkout o partial clone (--filter=blob:none). Polyrepo: cada proyecto en su propio repo. Ventajas: historial limpio y enfocado, CI más rápido por defecto. Desventajas: cambios coordinados entre repos requieren múltiples PRs, versionado de dependencias más complejo.',
            'Monorepo: single repo with multiple projects. Advantages: atomic cross-project refactoring, coordinated changes, single history, shared tooling (Nx, Turborepo). Disadvantages: large repo with slow git history, slower git clone, needs tools like git sparse-checkout or partial clone (--filter=blob:none). Polyrepo: each project in its own repo. Advantages: clean focused history, faster CI by default. Disadvantages: coordinated changes across repos require multiple PRs, more complex dependency versioning.'
          ),
        },
        {
          q: tx('¿Cómo recuperarías commits perdidos después de un git reset --hard?', 'How would you recover lost commits after a git reset --hard?'),
          a: tx(
            'git reflog es la herramienta clave: registra todos los movimientos de HEAD incluidos los eliminados por reset. Pasos: (1) git reflog para ver el historial con HEAD@{N}. (2) Identificar el SHA del commit perdido. (3) git checkout -b recovery-branch HEAD@{N} para crear una rama en ese punto. O directamente git cherry-pick <sha> para aplicar los commits a la rama actual. El reflog dura 90 días por defecto (gc.reflogExpire). Objetos sin referencia se limpian con git gc.',
            'git reflog is the key tool: it records all HEAD movements including those eliminated by reset. Steps: (1) git reflog to see history with HEAD@{N}. (2) Identify the SHA of the lost commit. (3) git checkout -b recovery-branch HEAD@{N} to create a branch at that point. Or directly git cherry-pick <sha> to apply commits to current branch. Reflog lasts 90 days by default (gc.reflogExpire). Unreferenced objects are cleaned with git gc.'
          ),
        },
      ],
    },
    {
      level: tx('Senior', 'Senior'),
      color: 'border-rose-300/30',
      questions: [
        {
          q: tx('¿Cómo diseñarías una estrategia de branching para un equipo de 50 personas con 3 releases/semana?', 'How would you design a branching strategy for a 50-person team with 3 releases/week?'),
          a: tx(
            'Para alta cadencia con equipo grande: Trunk-Based Development con feature flags es la respuesta. Justificación: (1) Integración continua real: todos integran a main al menos diariamente, reduciendo merge hell. (2) Feature flags (LaunchDarkly/Unleash) permiten código en producción sin activar funcionalidad. (3) Ramas de feature máximo 1-2 días. (4) Branch protection: status checks obligatorios (CI verde + 1 reviewer). (5) Automated testing >80% cobertura para confianza en despliegue continuo. (6) semantic-release para versionado automático. Git Flow solo si existen releases programadas con fechas fijas.',
            'For high cadence with large team: Trunk-Based Development with feature flags is the answer. Justification: (1) Real continuous integration: everyone integrates to main at least daily, reducing merge hell. (2) Feature flags (LaunchDarkly/Unleash) allow code in production without activating functionality. (3) Feature branches maximum 1-2 days. (4) Branch protection: mandatory status checks (green CI + 1 reviewer). (5) Automated testing >80% coverage for confidence in continuous deployment. (6) semantic-release for automatic versioning. Git Flow only if scheduled releases with fixed dates exist.'
          ),
        },
        {
          q: tx('¿Cómo optimizarías un repositorio Git con historial de 5 años y 50GB?', 'How would you optimize a Git repository with 5 years of history and 50GB?'),
          a: tx(
            'Múltiples técnicas: (1) git gc --aggressive: repaqueta objetos y elimina referencias sueltas. (2) BFG Repo-Cleaner (más rápido que git filter-branch) para eliminar archivos grandes del historial: bfg --strip-blobs-bigger-than 10M. (3) git lfs: migrar binarios grandes a LFS (Large File Storage): git lfs migrate import --include="*.psd,*.mp4". (4) git sparse-checkout: para monorepos, los devs solo clonan lo que necesitan. (5) git partial clone --filter=blob:none: clona sin blobs, los descarga on-demand. (6) Separar el repo antiguo como un archivo con shallow clone (--depth=1) para nuevos devs.',
            'Multiple techniques: (1) git gc --aggressive: repacks objects and removes loose references. (2) BFG Repo-Cleaner (faster than git filter-branch) to remove large files from history: bfg --strip-blobs-bigger-than 10M. (3) git lfs: migrate large binaries to LFS (Large File Storage): git lfs migrate import --include="*.psd,*.mp4". (4) git sparse-checkout: for monorepos, devs only clone what they need. (5) git partial clone --filter=blob:none: clones without blobs, downloads on-demand. (6) Separate old repo as an archive with shallow clone (--depth=1) for new devs.'
          ),
        },
        {
          q: tx('Explica la diferencia entre git rerere, git notes y git replace.', 'Explain the difference between git rerere, git notes and git replace.'),
          a: tx(
            'git rerere (Reuse Recorded Resolution): cuando resuelves un conflicto de merge/rebase, Git lo memoriza. Si el mismo conflicto aparece de nuevo (ej. en múltiples rebases), Git lo resuelve automáticamente. Activar con git config rerere.enabled true. git notes: agrega metadatos a commits sin modificarlos (sin cambiar el SHA). Útil para CI: añadir resultado de tests al commit. Se pueden pushear/pullear como refs especiales. git replace: crea una referencia que reemplaza transparentemente un objeto por otro. Útil para "injertar" historial de repositorios separados o reescribir objetos específicos sin reescribir el historial completo.',
            'git rerere (Reuse Recorded Resolution): when you resolve a merge/rebase conflict, Git memorizes it. If the same conflict appears again (e.g. in multiple rebases), Git resolves it automatically. Enable with git config rerere.enabled true. git notes: adds metadata to commits without modifying them (without changing the SHA). Useful for CI: adding test results to commit. Can be pushed/pulled as special refs. git replace: creates a reference that transparently replaces one object with another. Useful for "grafting" history from separate repositories or rewriting specific objects without rewriting the entire history.'
          ),
        },
        {
          q: tx('¿Cómo implementarías una política de seguridad de commits en un equipo enterprise?', 'How would you implement a commit security policy in an enterprise team?'),
          a: tx(
            'Capa por capa: (1) GPG/SSH signing obligatorio: git config commit.gpgsign true + push.gpgSign always. Verificación con git log --show-signature. (2) Server-side hooks (pre-receive) en el servidor Git para rechazar pushes de commits sin firma o sin formato correcto. (3) CODEOWNERS: propietarios obligatorios de archivos sensibles. (4) Secret scanning: git secrets (AWS) o gitleaks en el hook pre-commit Y en CI para detectar credenciales antes y después del push. (5) Branch protection: required status checks, no force push a main/release. (6) Commit message policy con commitlint via Husky. (7) Auditoría: git log --format="%H %G? %GS %an %ae" para ver estado de firma de todos los commits.',
            'Layer by layer: (1) Mandatory GPG/SSH signing: git config commit.gpgsign true + push.gpgSign always. Verification with git log --show-signature. (2) Server-side hooks (pre-receive) on the Git server to reject pushes of unsigned commits or incorrect format. (3) CODEOWNERS: mandatory owners of sensitive files. (4) Secret scanning: git secrets (AWS) or gitleaks in pre-commit hook AND in CI to detect credentials before and after push. (5) Branch protection: required status checks, no force push to main/release. (6) Commit message policy with commitlint via Husky. (7) Audit: git log --format="%H %G? %GS %an %ae" to see signing status of all commits.'
          ),
        },
        {
          q: tx('¿Cuáles son las estrategias para manejar bases de código heredadas con historial complejo en Git?', 'What are strategies for handling legacy codebases with complex Git history?'),
          a: tx(
            'Enfoque pragmático: (1) git log --follow -p -- archivo para rastrear renombrados y ver evolución completa. (2) git blame -w -M -C para ignorar whitespace y detectar movimientos de código entre archivos. (3) Para limpiar historial antiguo: git filter-repo (sucesor oficial de filter-branch) es 10-100x más rápido. (4) Fossil grafts o replace objects para unir historiales de repos migrados desde SVN/Mercurial. (5) Para equipos: convención de commits desde "ahora" sin reescribir el pasado (menor riesgo). (6) git subtree para extraer un subdirectorio como repo independiente con historial preservado: git subtree split --prefix=src/lib -b lib-only. (7) Documentation as code: añadir ADRs (Architecture Decision Records) como commits convencionales docs: para contextualizar el historial.',
            'Pragmatic approach: (1) git log --follow -p -- file to track renames and see full evolution. (2) git blame -w -M -C to ignore whitespace and detect code movement between files. (3) To clean old history: git filter-repo (official successor to filter-branch) is 10-100x faster. (4) Fossil grafts or replace objects to join histories from repos migrated from SVN/Mercurial. (5) For teams: commit convention from "now" without rewriting the past (lower risk). (6) git subtree to extract a subdirectory as independent repo with preserved history: git subtree split --prefix=src/lib -b lib-only. (7) Documentation as code: add ADRs (Architecture Decision Records) as conventional commits docs: to contextualize history.'
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Preguntas de Entrevista — Git Avanzado', 'Interview Questions — Advanced Git')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            '15 preguntas reales categorizadas por nivel: de internos de Git hasta diseño de estrategias enterprise.',
            '15 real questions categorized by level: from Git internals to enterprise strategy design.'
          )}
        </p>
      </div>

      <div className="space-y-4">
        {levels.map(l => (
          <InterviewAccordion key={l.level} level={l.level} questions={l.questions} color={l.color} />
        ))}
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────────

function GitAdvancedPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('internals');

  const sections = [
    {
      id: 'internals',
      title: tx('Internos', 'Internals'),
      subtitle: tx('Objetos, SHA, índice', 'Objects, SHA, index'),
      icon: Box,
    },
    {
      id: 'branching',
      title: tx('Branching', 'Branching'),
      subtitle: tx('Git Flow, Trunk-Based', 'Git Flow, Trunk-Based'),
      icon: GitBranch,
    },
    {
      id: 'rebase',
      title: tx('Rebase/Merge', 'Rebase/Merge'),
      subtitle: tx('Historial lineal', 'Linear history'),
      icon: GitMerge,
    },
    {
      id: 'advanced',
      title: tx('Avanzado', 'Advanced'),
      subtitle: tx('stash, bisect, reflog', 'stash, bisect, reflog'),
      icon: Terminal,
    },
    {
      id: 'hooks',
      title: 'Hooks',
      subtitle: tx('Husky, lint-staged', 'Husky, lint-staged'),
      icon: Zap,
    },
    {
      id: 'workflows',
      title: 'CI/CD',
      subtitle: tx('Semver, Actions', 'Semver, Actions'),
      icon: RefreshCw,
    },
    {
      id: 'interview',
      title: tx('Entrevista', 'Interview'),
      subtitle: tx('Junior → Senior', 'Junior → Senior'),
      icon: GitCommit,
    },
  ];

  const renderContent = () => {
    switch (active) {
      case 'internals':  return renderInternals(tx);
      case 'branching':  return renderBranching(tx);
      case 'rebase':     return renderRebase(tx);
      case 'advanced':   return renderAdvanced(tx);
      case 'hooks':      return renderHooks(tx);
      case 'workflows':  return renderWorkflows(tx);
      case 'interview':  return renderInterview(tx);
      default:           return renderInternals(tx);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                  active === s.id
                    ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${active === s.id ? 'text-rose-400' : 'text-slate-500'}`} />
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

export default GitAdvancedPro;
