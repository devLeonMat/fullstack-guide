import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Array & Hash Map Diagram ─────────────────────────────────────────────────

const ArrayHashDiagram = ({ tx }) => {
  const [mode, setMode] = useState('array');
  const [activeIdx, setActiveIdx] = useState(0);
  const [hashStep, setHashStep] = useState(0);

  const arrayItems = [12, 45, 7, 89, 23, 56];
  const hashEntries = [
    { key: '"name"', bucket: 2, value: '"Alice"' },
    { key: '"age"', bucket: 5, value: '30' },
    { key: '"city"', bucket: 1, value: '"NYC"' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setMode(m => {
        if (m === 'array') {
          setActiveIdx(i => {
            if (i >= arrayItems.length - 1) return 0;
            return i + 1;
          });
          return 'array';
        } else {
          setHashStep(s => (s + 1) % hashEntries.length);
          return 'hash';
        }
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const modeTimer = setTimeout(() => {
      setMode(m => m === 'array' ? 'hash' : 'array');
      setActiveIdx(0);
      setHashStep(0);
    }, 1800 * (arrayItems.length + 1));
    return () => clearTimeout(modeTimer);
  }, [mode]);

  return (
    <div className="bg-slate-950/40 border border-indigo-500/20 rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-3 justify-center">
        <button
          onClick={() => { setMode('array'); setActiveIdx(0); }}
          className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${mode === 'array' ? 'border-indigo-500/50 bg-indigo-500/20 text-indigo-300' : 'border-slate-700/50 text-slate-500'}`}
        >
          {tx('Array O(1) acceso', 'Array O(1) access')}
        </button>
        <button
          onClick={() => { setMode('hash'); setHashStep(0); }}
          className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all ${mode === 'hash' ? 'border-indigo-500/50 bg-indigo-500/20 text-indigo-300' : 'border-slate-700/50 text-slate-500'}`}
        >
          {tx('HashMap key→bucket', 'HashMap key→bucket')}
        </button>
      </div>

      {mode === 'array' && (
        <div className="space-y-3">
          <p className="text-center text-xs text-slate-400">
            {tx('Acceso por índice: array[i] es O(1) — búsqueda lineal es O(n)', 'Index access: array[i] is O(1) — linear search is O(n)')}
          </p>
          <div className="flex items-center gap-1 justify-center flex-wrap">
            {arrayItems.map((val, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <motion.div
                  animate={{
                    boxShadow: activeIdx === i ? '0 0 18px rgba(99,102,241,0.6)' : '0 0 0px transparent',
                    scale: activeIdx === i ? 1.12 : 1,
                    backgroundColor: activeIdx === i ? 'rgba(99,102,241,0.25)' : 'rgba(30,41,59,0.6)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="border border-indigo-500/30 rounded-lg w-10 h-10 flex items-center justify-center text-sm font-bold text-indigo-200"
                >
                  {val}
                </motion.div>
                <span className="text-xs text-slate-500">[{i}]</span>
              </div>
            ))}
          </div>
          <motion.p
            key={activeIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-xs text-indigo-300 font-mono"
          >
            arr[{activeIdx}] = {arrayItems[activeIdx]} → O(1)
          </motion.p>
        </div>
      )}

      {mode === 'hash' && (
        <div className="space-y-3">
          <p className="text-center text-xs text-slate-400">
            {tx('hash(key) → índice de bucket → O(1) promedio', 'hash(key) → bucket index → O(1) average')}
          </p>
          <div className="flex items-center gap-3 justify-center flex-wrap">
            {hashEntries.map((entry, i) => (
              <motion.div
                key={i}
                animate={{
                  boxShadow: hashStep === i ? '0 0 18px rgba(99,102,241,0.55)' : '0 0 0px transparent',
                  opacity: hashStep === i ? 1 : 0.4,
                  scale: hashStep === i ? 1.05 : 1,
                }}
                transition={{ duration: 0.35 }}
                className="border border-indigo-500/30 rounded-xl px-3 py-2 bg-indigo-500/10 text-center"
              >
                <div className="text-xs font-mono text-indigo-300 font-bold">{entry.key}</div>
                <div className="text-xs text-slate-400 mt-1">→ bucket[{entry.bucket}]</div>
                <div className="text-xs text-green-400 font-mono mt-0.5">{entry.value}</div>
              </motion.div>
            ))}
          </div>
          <motion.p
            key={hashStep}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-xs text-indigo-300 font-mono"
          >
            hash({hashEntries[hashStep].key}) → [{hashEntries[hashStep].bucket}] = {hashEntries[hashStep].value}
          </motion.p>
        </div>
      )}
    </div>
  );
};

// ─── Linked List Diagram ──────────────────────────────────────────────────────

const LinkedListDiagram = ({ tx }) => {
  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    { val: 1, next: true },
    { val: 3, next: true },
    { val: 7, next: true },
    { val: 12, next: true },
    { val: 99, next: false },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setActiveNode(n => (n + 1) % nodes.length);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-indigo-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {tx('Recorrido de Lista Enlazada — O(n)', 'Linked List Traversal — O(n)')}
      </p>
      <div className="flex items-center justify-center flex-wrap gap-1">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center gap-1">
            <motion.div
              animate={{
                boxShadow: activeNode === i ? '0 0 18px rgba(99,102,241,0.6)' : '0 0 0px transparent',
                scale: activeNode === i ? 1.1 : 1,
                borderColor: activeNode === i ? 'rgba(99,102,241,0.7)' : 'rgba(99,102,241,0.2)',
              }}
              transition={{ duration: 0.3 }}
              className="border rounded-xl overflow-hidden"
            >
              <div className="px-3 py-2 flex items-center gap-2">
                <span className="text-sm font-bold text-indigo-200">{node.val}</span>
                <div className="w-px h-5 bg-slate-600/50" />
                <motion.span
                  animate={{ color: activeNode === i ? '#818cf8' : '#475569' }}
                  className="text-xs font-mono"
                >
                  {node.next ? 'next→' : 'null'}
                </motion.span>
              </div>
            </motion.div>
            {node.next && (
              <motion.span
                animate={{ opacity: activeNode === i ? 1 : 0.25, x: activeNode === i ? [0, 4, 0] : 0 }}
                transition={{ duration: 0.4, repeat: activeNode === i ? Infinity : 0 }}
                className="text-indigo-400 font-bold text-lg"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-slate-500">
        {tx('Inserción al inicio O(1) — acceso por índice O(n)', 'Head insertion O(1) — index access O(n)')}
      </p>
    </div>
  );
};

// ─── Tree Diagram ─────────────────────────────────────────────────────────────

const TreeDiagram = ({ tx }) => {
  const [traversalStep, setTraversalStep] = useState(0);

  // In-order traversal of BST: 3,7,10,15,20,25,30
  const inorderSequence = [3, 7, 10, 15, 20, 25, 30];
  const nodes = [
    { val: 15, x: 50, y: 10, parent: null },
    { val: 7, x: 25, y: 35, parent: 15 },
    { val: 25, x: 75, y: 35, parent: 15 },
    { val: 3, x: 12, y: 62, parent: 7 },
    { val: 10, x: 38, y: 62, parent: 7 },
    { val: 20, x: 62, y: 62, parent: 25 },
    { val: 30, x: 88, y: 62, parent: 25 },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setTraversalStep(s => (s + 1) % inorderSequence.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const activeVal = inorderSequence[traversalStep];

  return (
    <div className="bg-slate-950/40 border border-indigo-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {tx('BST — Recorrido In-Order (izq → raíz → der)', 'BST — In-Order Traversal (left → root → right)')}
      </p>
      <div className="relative w-full" style={{ height: '120px' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet">
          {nodes.filter(n => n.parent !== null).map(n => {
            const parent = nodes.find(p => p.val === n.parent);
            return (
              <line
                key={`edge-${n.val}`}
                x1={parent.x} y1={parent.y + 5}
                x2={n.x} y2={n.y - 5}
                stroke="rgba(99,102,241,0.25)"
                strokeWidth="0.8"
              />
            );
          })}
          {nodes.map(n => (
            <g key={n.val}>
              <circle
                cx={n.x} cy={n.y} r="5.5"
                fill={n.val === activeVal ? 'rgba(99,102,241,0.5)' : 'rgba(30,41,59,0.8)'}
                stroke={n.val === activeVal ? 'rgba(99,102,241,0.9)' : 'rgba(99,102,241,0.25)'}
                strokeWidth="0.8"
              />
              <text x={n.x} y={n.y + 1.5} textAnchor="middle" fontSize="3.5" fill={n.val === activeVal ? '#c7d2fe' : '#64748b'} fontWeight="bold">
                {n.val}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <motion.p
        key={traversalStep}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-xs font-mono text-indigo-300"
      >
        {tx('Visitando', 'Visiting')}: {activeVal} ({tx('paso', 'step')} {traversalStep + 1}/{inorderSequence.length})
      </motion.p>
      <p className="text-center text-xs text-slate-500">
        {tx('In-order en BST siempre produce valores ordenados', 'In-order on BST always produces sorted values')}
      </p>
    </div>
  );
};

// ─── Graph Diagram ────────────────────────────────────────────────────────────

const GraphDiagram = ({ tx }) => {
  const [bfsStep, setBfsStep] = useState(0);

  const nodePositions = [
    { id: 0, x: 50, y: 15, label: 'A' },
    { id: 1, x: 20, y: 45, label: 'B' },
    { id: 2, x: 80, y: 45, label: 'C' },
    { id: 3, x: 10, y: 75, label: 'D' },
    { id: 4, x: 50, y: 75, label: 'E' },
    { id: 5, x: 90, y: 75, label: 'F' },
  ];

  const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5]];

  // BFS from A: level 0=[A], level 1=[B,C], level 2=[D,E,F]
  const bfsLevels = [[0], [1, 2], [3, 4, 5]];
  const visitedAtStep = (step) => {
    const visited = new Set();
    for (let i = 0; i <= step && i < bfsLevels.length; i++) {
      bfsLevels[i].forEach(n => visited.add(n));
    }
    return visited;
  };

  useEffect(() => {
    const id = setInterval(() => {
      setBfsStep(s => (s + 1) % (bfsLevels.length + 1));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  const visited = visitedAtStep(bfsStep - 1);
  const frontier = bfsStep < bfsLevels.length ? new Set(bfsLevels[bfsStep]) : new Set();

  return (
    <div className="bg-slate-950/40 border border-indigo-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {tx('BFS — Frontera expandiéndose nivel por nivel', 'BFS — Frontier expanding level by level')}
      </p>
      <div className="relative w-full" style={{ height: '130px' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
          {edges.map(([a, b]) => {
            const na = nodePositions[a];
            const nb = nodePositions[b];
            return (
              <line
                key={`${a}-${b}`}
                x1={na.x} y1={na.y}
                x2={nb.x} y2={nb.y}
                stroke={visited.has(a) && visited.has(b) ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.15)'}
                strokeWidth="0.8"
              />
            );
          })}
          {nodePositions.map(n => {
            const isVisited = visited.has(n.id);
            const isFrontier = frontier.has(n.id);
            return (
              <g key={n.id}>
                <motion.circle
                  cx={n.x} cy={n.y} r="7"
                  fill={isFrontier ? 'rgba(234,179,8,0.3)' : isVisited ? 'rgba(99,102,241,0.4)' : 'rgba(30,41,59,0.8)'}
                  stroke={isFrontier ? 'rgba(234,179,8,0.8)' : isVisited ? 'rgba(99,102,241,0.8)' : 'rgba(99,102,241,0.2)'}
                  strokeWidth="0.8"
                />
                <text x={n.x} y={n.y + 1.5} textAnchor="middle" fontSize="4.5" fill={isFrontier ? '#fde68a' : isVisited ? '#c7d2fe' : '#475569'} fontWeight="bold">
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex items-center gap-3 justify-center text-xs">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500/60 inline-block" />{tx('Visitado', 'Visited')}</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60 inline-block" />{tx('Frontera actual', 'Current frontier')}</span>
      </div>
    </div>
  );
};

// ─── Sorting Diagram ──────────────────────────────────────────────────────────

const SortingDiagram = ({ tx }) => {
  const initialBars = [6, 3, 8, 1, 7, 2, 5, 4];
  const [bars, setBars] = useState([...initialBars]);
  const [comparing, setComparing] = useState([-1, -1]);
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    let arr = [...initialBars];
    const swaps = [];
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        swaps.push({ type: 'compare', i: j, k: j + 1, arr: [...arr] });
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps.push({ type: 'swap', i: j, k: j + 1, arr: [...arr] });
        }
      }
      swaps.push({ type: 'sorted', idx: n - 1 - i, arr: [...arr] });
    }
    swaps.push({ type: 'done', arr: [...arr] });

    let step = 0;
    const sortedSet = new Set();
    const id = setInterval(() => {
      if (step >= swaps.length) {
        setBars([...initialBars]);
        setComparing([-1, -1]);
        setSorted([]);
        step = 0;
        sortedSet.clear();
        return;
      }
      const s = swaps[step];
      setBars([...s.arr]);
      if (s.type === 'compare' || s.type === 'swap') {
        setComparing([s.i, s.k]);
      } else if (s.type === 'sorted') {
        sortedSet.add(s.idx);
        setSorted([...sortedSet]);
        setComparing([-1, -1]);
      } else {
        setComparing([-1, -1]);
        setSorted([0, 1, 2, 3, 4, 5, 6, 7]);
      }
      step++;
    }, 600);
    return () => clearInterval(id);
  }, []);

  const maxBar = 8;

  return (
    <div className="bg-slate-950/40 border border-indigo-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {tx('Bubble Sort — O(n²) comparaciones', 'Bubble Sort — O(n²) comparisons')}
      </p>
      <div className="flex items-end justify-center gap-1.5 h-20">
        {bars.map((h, i) => {
          const isComparing = comparing[0] === i || comparing[1] === i;
          const isSorted = sorted.includes(i);
          return (
            <motion.div
              key={i}
              animate={{
                height: `${(h / maxBar) * 72}px`,
                backgroundColor: isSorted
                  ? 'rgba(34,197,94,0.5)'
                  : isComparing
                  ? 'rgba(234,179,8,0.6)'
                  : 'rgba(99,102,241,0.4)',
                borderColor: isSorted
                  ? 'rgba(34,197,94,0.8)'
                  : isComparing
                  ? 'rgba(234,179,8,0.9)'
                  : 'rgba(99,102,241,0.5)',
              }}
              transition={{ duration: 0.3 }}
              className="w-8 border rounded-t-md flex items-end justify-center pb-1"
              style={{ minHeight: '8px' }}
            >
              <span className="text-xs font-bold text-white/80">{h}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 justify-center text-xs">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-yellow-400/60 inline-block" />{tx('Comparando', 'Comparing')}</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-green-500/60 inline-block" />{tx('Ordenado', 'Sorted')}</span>
      </div>
    </div>
  );
};

// ─── DP / Fibonacci Diagram ───────────────────────────────────────────────────

const DPDiagram = ({ tx }) => {
  const [filledCells, setFilledCells] = useState(0);
  const fibValues = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];

  useEffect(() => {
    setFilledCells(0);
    const id = setInterval(() => {
      setFilledCells(c => {
        if (c >= fibValues.length) return 0;
        return c + 1;
      });
    }, 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-indigo-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {tx('Tabla DP — Fibonacci (bottom-up tabulation)', 'DP Table — Fibonacci (bottom-up tabulation)')}
      </p>
      <div className="flex items-center gap-1 justify-center flex-wrap">
        {fibValues.map((val, i) => {
          const isActive = filledCells === i + 1;
          const isFilled = filledCells > i;
          const isOverlap = i >= 2 && isFilled;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.div
                animate={{
                  boxShadow: isActive
                    ? '0 0 18px rgba(99,102,241,0.7)'
                    : isOverlap
                    ? '0 0 6px rgba(99,102,241,0.2)'
                    : '0 0 0px transparent',
                  backgroundColor: isActive
                    ? 'rgba(99,102,241,0.4)'
                    : isOverlap
                    ? 'rgba(99,102,241,0.15)'
                    : isFilled
                    ? 'rgba(99,102,241,0.1)'
                    : 'rgba(30,41,59,0.6)',
                  borderColor: isActive
                    ? 'rgba(99,102,241,0.8)'
                    : isOverlap
                    ? 'rgba(99,102,241,0.4)'
                    : 'rgba(99,102,241,0.15)',
                  scale: isActive ? 1.15 : 1,
                  opacity: isFilled ? 1 : 0.3,
                }}
                transition={{ duration: 0.25 }}
                className="border rounded-lg w-9 h-9 flex items-center justify-center text-sm font-bold text-indigo-200"
              >
                {isFilled ? val : '?'}
              </motion.div>
              <span className="text-xs text-slate-500">dp[{i}]</span>
            </div>
          );
        })}
      </div>
      {filledCells >= 3 && (
        <motion.p
          key={filledCells}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs font-mono text-indigo-300"
        >
          dp[{filledCells - 1}] = dp[{filledCells - 2}] + dp[{filledCells - 3}] = {fibValues[filledCells - 2]} + {fibValues[filledCells - 3]} = {fibValues[filledCells - 1]}
        </motion.p>
      )}
      <p className="text-center text-xs text-slate-500">
        {tx('Subproblemas solapados evitados con memoización', 'Overlapping subproblems avoided with memoization')}
      </p>
    </div>
  );
};

// ─── Big O Diagram ────────────────────────────────────────────────────────────

const BigODiagram = ({ tx }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const duration = 2000;
    const id = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p >= 1) {
        clearInterval(id);
        setTimeout(() => setProgress(0), 800);
      }
    }, 30);
    return () => clearInterval(id);
  }, [progress === 0 ? 0 : undefined]);

  useEffect(() => {
    const id = setInterval(() => setProgress(0), 3200);
    return () => clearInterval(id);
  }, []);

  const width = 220;
  const height = 110;
  const maxN = 8;

  const complexities = [
    { label: 'O(1)', color: '#22c55e', fn: () => 15 },
    { label: 'O(log n)', color: '#84cc16', fn: (n) => 10 + Math.log2(n + 1) * 12 },
    { label: 'O(n)', color: '#eab308', fn: (n) => 10 + n * 9 },
    { label: 'O(n log n)', color: '#f97316', fn: (n) => 10 + n * Math.log2(n + 1) * 4 },
    { label: 'O(n²)', color: '#ef4444', fn: (n) => 10 + n * n * 1.5 },
    { label: 'O(2ⁿ)', color: '#a855f7', fn: (n) => 10 + Math.pow(1.8, n) * 0.8 },
  ];

  const buildPath = (fn) => {
    const points = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * progress;
      const n = t * maxN;
      const rawY = fn(n);
      const x = (t / 1) * (width - 30) + 20;
      const y = Math.max(5, height - 10 - Math.min(rawY, height - 15));
      points.push(`${x},${y}`);
    }
    return points.length > 1 ? `M ${points.join(' L ')}` : '';
  };

  return (
    <div className="bg-slate-950/40 border border-indigo-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {tx('Curvas de complejidad temporal — n crece →', 'Time complexity curves — n grows →')}
      </p>
      <div className="overflow-x-auto">
        <svg width={width} height={height} className="mx-auto block">
          {/* Axes */}
          <line x1="20" y1="5" x2="20" y2={height - 10} stroke="rgba(148,163,184,0.3)" strokeWidth="0.8" />
          <line x1="20" y1={height - 10} x2={width - 10} y2={height - 10} stroke="rgba(148,163,184,0.3)" strokeWidth="0.8" />
          <text x="22" y={height - 3} fontSize="5" fill="#475569">n</text>
          <text x="10" y="10" fontSize="5" fill="#475569">T</text>
          {complexities.map((c, i) => (
            <path key={i} d={buildPath(c.fn)} fill="none" stroke={c.color} strokeWidth="1.2" strokeLinecap="round" />
          ))}
        </svg>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {complexities.map(c => (
          <span key={c.label} className="flex items-center gap-1 text-xs">
            <span className="w-4 h-0.5 inline-block rounded" style={{ backgroundColor: c.color }} />
            <span style={{ color: c.color }} className="font-mono font-semibold">{c.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Section renderers ────────────────────────────────────────────────────────

const renderArrays = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Arrays & Hash Maps', 'Arrays & Hash Maps')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Acceso O(1) por índice, búsqueda O(1) promedio con hash, patrones de dos punteros y ventana deslizante.',
          'O(1) index access, O(1) average lookup with hash, two-pointer and sliding window patterns.'
        )}
      </p>
    </div>

    <ArrayHashDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Operaciones Array — Big-O', 'Array Operations — Big-O'),
          color: 'border-indigo-500/30',
          titleColor: 'text-indigo-300',
          points: [
            tx('Acceso por índice: O(1)', 'Index access: O(1)'),
            tx('Búsqueda lineal: O(n)', 'Linear search: O(n)'),
            tx('Inserción al final (amortizado): O(1)', 'Append (amortized): O(1)'),
            tx('Inserción/eliminación en medio: O(n)', 'Insert/delete middle: O(n)'),
          ],
        },
        {
          title: tx('HashMap Internos', 'HashMap Internals'),
          color: 'border-indigo-400/30',
          titleColor: 'text-indigo-200',
          points: [
            tx('hash(key) % capacity → bucket index', 'hash(key) % capacity → bucket index'),
            tx('Colisiones → chaining o open addressing', 'Collisions → chaining or open addressing'),
            tx('Load factor > 0.75 → rehash (O(n) amortizado)', 'Load factor > 0.75 → rehash (O(n) amortized)'),
            tx('Peor caso O(n) con muchas colisiones', 'Worst case O(n) with many collisions'),
          ],
        },
        {
          title: tx('Patrones Comunes', 'Common Patterns'),
          color: 'border-indigo-500/20',
          titleColor: 'text-indigo-300',
          points: [
            tx('Two pointers: L y R convergen, O(n)', 'Two pointers: L and R converge, O(n)'),
            tx('Sliding window: tamaño fijo o variable', 'Sliding window: fixed or variable size'),
            tx('Prefix sum: suma de subarray en O(1)', 'Prefix sum: subarray sum in O(1)'),
            tx('Counter map: frecuencia de elementos', 'Counter map: element frequency'),
          ],
        },
        {
          title: tx('Casos de Uso', 'Use Cases'),
          color: 'border-indigo-400/20',
          titleColor: 'text-indigo-200',
          points: [
            tx('Two Sum → HashMap O(n) vs O(n²) brute', 'Two Sum → HashMap O(n) vs O(n²) brute'),
            tx('Anagramas → frequency counter', 'Anagrams → frequency counter'),
            tx('Max subarray sum → Kadane\'s algorithm', "Max subarray sum → Kadane's algorithm"),
            tx('Subarray con suma k → prefix sum + map', 'Subarray with sum k → prefix sum + map'),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`// ── Two Pointer Technique ─────────────────────────
// Problem: find pair with target sum in sorted array
function twoSum(nums: number[], target: number): [number, number] | null {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}
// Time: O(n) | Space: O(1)

// ── Sliding Window — Max sum subarray of size k ───
function maxSumSubarray(nums: number[], k: number): number {
  let windowSum = nums.slice(0, k).reduce((a, b) => a + b, 0);
  let maxSum = windowSum;

  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k]; // slide the window
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}
// Time: O(n) | Space: O(1)

// ── Variable Sliding Window — longest subarray sum ≤ limit ─
function longestSubarrayWithLimit(nums: number[], limit: number): number {
  let left = 0;
  let currentSum = 0;
  let maxLen = 0;

  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];
    while (currentSum > limit) {
      currentSum -= nums[left++];
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// ── HashMap Two Sum (unsorted) ────────────────────
function twoSumMap(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>(); // value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return null;
}
// Time: O(n) | Space: O(n)`} />
  </div>
);

const renderLinkedLists = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Listas Enlazadas, Stacks & Queues', 'Linked Lists, Stacks & Queues')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Nodos con punteros, inserción O(1) en cabeza, LIFO con Stack, FIFO con Queue.',
          'Nodes with pointers, O(1) head insertion, LIFO with Stack, FIFO with Queue.'
        )}
      </p>
    </div>

    <LinkedListDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Singly vs Doubly', 'Singly vs Doubly'),
          color: 'border-indigo-500/30',
          titleColor: 'text-indigo-300',
          points: [
            tx('Singly: cada nodo apunta al siguiente', 'Singly: each node points to next'),
            tx('Doubly: prev y next, recorrido bidireccional', 'Doubly: prev and next, bidirectional traversal'),
            tx('Inserción/eliminación cabeza: O(1) ambas', 'Head insert/delete: O(1) both'),
            tx('Búsqueda: O(n) — no acceso aleatorio', 'Search: O(n) — no random access'),
          ],
        },
        {
          title: tx('Stack (LIFO)', 'Stack (LIFO)'),
          color: 'border-indigo-400/30',
          titleColor: 'text-indigo-200',
          points: [
            tx('push/pop en O(1), peek en O(1)', 'push/pop in O(1), peek in O(1)'),
            tx('Implementar con array o linked list', 'Implement with array or linked list'),
            tx('Usos: call stack, backtracking, undo/redo', 'Uses: call stack, backtracking, undo/redo'),
            tx('Paréntesis balanceados, DFS iterativo', 'Balanced parentheses, iterative DFS'),
          ],
        },
        {
          title: tx('Queue (FIFO)', 'Queue (FIFO)'),
          color: 'border-indigo-500/20',
          titleColor: 'text-indigo-300',
          points: [
            tx('enqueue/dequeue en O(1) con linked list', 'enqueue/dequeue in O(1) with linked list'),
            tx('Deque: inserción/eliminación en ambos extremos', 'Deque: insert/delete at both ends'),
            tx('Usos: BFS, scheduling de procesos', 'Uses: BFS, process scheduling'),
            tx('Circular buffer para tamaño fijo eficiente', 'Circular buffer for efficient fixed size'),
          ],
        },
        {
          title: tx('¿Cuándo usar listas enlazadas?', 'When to use linked lists?'),
          color: 'border-indigo-400/20',
          titleColor: 'text-indigo-200',
          points: [
            tx('Muchas inserciones/eliminaciones en cabeza', 'Many insertions/deletions at head'),
            tx('Tamaño desconocido en tiempo de compilación', 'Unknown size at compile time'),
            tx('No necesitas acceso aleatorio por índice', 'No need for random index access'),
            tx('Implementar otras estructuras (stack, queue)', 'Implementing other structures (stack, queue)'),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`// ── Linked List Node & List ───────────────────────
class ListNode<T> {
  val: T;
  next: ListNode<T> | null = null;
  constructor(val: T) { this.val = val; }
}

class LinkedList<T> {
  head: ListNode<T> | null = null;
  private _size = 0;

  get size() { return this._size; }

  prepend(val: T): void {
    const node = new ListNode(val);
    node.next = this.head;
    this.head = node;
    this._size++;
  }

  append(val: T): void {
    const node = new ListNode(val);
    if (!this.head) { this.head = node; this._size++; return; }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
    this._size++;
  }

  delete(val: T): boolean {
    if (!this.head) return false;
    if (this.head.val === val) { this.head = this.head.next; this._size--; return true; }
    let cur = this.head;
    while (cur.next) {
      if (cur.next.val === val) { cur.next = cur.next.next; this._size--; return true; }
      cur = cur.next;
    }
    return false;
  }

  reverse(): void {
    let prev: ListNode<T> | null = null;
    let cur = this.head;
    while (cur) {
      const next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
    }
    this.head = prev;
  }

  toArray(): T[] {
    const result: T[] = [];
    let cur = this.head;
    while (cur) { result.push(cur.val); cur = cur.next; }
    return result;
  }
}

// ── Stack (LIFO) using array ──────────────────────
class Stack<T> {
  private items: T[] = [];

  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
  isEmpty(): boolean { return this.items.length === 0; }
  get size(): number { return this.items.length; }
}

// ── Validate balanced parentheses ─────────────────
function isValid(s: string): boolean {
  const stack = new Stack<string>();
  const map: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if ('([{'.includes(ch)) { stack.push(ch); continue; }
    if (stack.isEmpty() || stack.pop() !== map[ch]) return false;
  }
  return stack.isEmpty();
}`} />
  </div>
);

const renderTrees = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Árboles & BST', 'Trees & Binary Search Trees')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Invariante BST, recorridos in/pre/post-order, BFS por niveles, árboles balanceados y tries.',
          'BST invariant, in/pre/post-order traversals, BFS level-order, balanced trees and tries.'
        )}
      </p>
    </div>

    <TreeDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Invariante BST', 'BST Invariant'),
          color: 'border-indigo-500/30',
          titleColor: 'text-indigo-300',
          points: [
            tx('Todo nodo izquierdo < nodo actual', 'Every left node < current node'),
            tx('Todo nodo derecho > nodo actual', 'Every right node > current node'),
            tx('Búsqueda, inserción, eliminación: O(h)', 'Search, insert, delete: O(h)'),
            tx('h = O(log n) balanceado, O(n) degenerado', 'h = O(log n) balanced, O(n) degenerate'),
          ],
        },
        {
          title: tx('Balanceado vs Desbalanceado', 'Balanced vs Unbalanced'),
          color: 'border-indigo-400/30',
          titleColor: 'text-indigo-200',
          points: [
            tx('AVL: balance factor ∈ {-1,0,1} en cada nodo', 'AVL: balance factor ∈ {-1,0,1} at every node'),
            tx('Red-Black: garantiza O(log n) amortizado', 'Red-Black: guarantees O(log n) amortized'),
            tx('Árbol degenerado = linked list → O(n)', 'Degenerate tree = linked list → O(n)'),
            tx('Rotaciones restauran el balance', 'Rotations restore balance'),
          ],
        },
        {
          title: tx('Recorridos', 'Traversals'),
          color: 'border-indigo-500/20',
          titleColor: 'text-indigo-300',
          points: [
            tx('In-order (L→N→R): produce valores ordenados', 'In-order (L→N→R): produces sorted values'),
            tx('Pre-order (N→L→R): serializar el árbol', 'Pre-order (N→L→R): serialize the tree'),
            tx('Post-order (L→R→N): eliminar el árbol', 'Post-order (L→R→N): delete the tree'),
            tx('Level-order (BFS): por capas con queue', 'Level-order (BFS): by layers with queue'),
          ],
        },
        {
          title: 'Tries',
          color: 'border-indigo-400/20',
          titleColor: 'text-indigo-200',
          points: [
            tx('Árbol de prefijos para cadenas', 'Prefix tree for strings'),
            tx('Inserción y búsqueda O(m), m = longitud', 'Insert and search O(m), m = length'),
            tx('Autocompletado, corrección ortográfica', 'Autocomplete, spell checking'),
            tx('Cada nodo = un carácter del prefijo', 'Each node = one character of prefix'),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`// ── BST Node & Operations ─────────────────────────
class TreeNode {
  val: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;
  constructor(val: number) { this.val = val; }
}

class BST {
  root: TreeNode | null = null;

  insert(val: number): void {
    this.root = this._insert(this.root, val);
  }
  private _insert(node: TreeNode | null, val: number): TreeNode {
    if (!node) return new TreeNode(val);
    if (val < node.val) node.left  = this._insert(node.left,  val);
    else if (val > node.val) node.right = this._insert(node.right, val);
    return node;
  }

  search(val: number): boolean {
    let cur = this.root;
    while (cur) {
      if (val === cur.val) return true;
      cur = val < cur.val ? cur.left : cur.right;
    }
    return false;
  }

  // In-order — produces sorted values
  inOrder(node: TreeNode | null = this.root, result: number[] = []): number[] {
    if (!node) return result;
    this.inOrder(node.left, result);
    result.push(node.val);
    this.inOrder(node.right, result);
    return result;
  }
}

// ── BFS Level-order traversal ─────────────────────
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const level: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left)  queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

// ── Validate BST ──────────────────────────────────
function isValidBST(
  node: TreeNode | null,
  min = -Infinity,
  max = Infinity
): boolean {
  if (!node) return true;
  if (node.val <= min || node.val >= max) return false;
  return (
    isValidBST(node.left,  min,      node.val) &&
    isValidBST(node.right, node.val, max)
  );
}

// ── Lowest Common Ancestor ────────────────────────
function lca(root: TreeNode | null, p: number, q: number): TreeNode | null {
  if (!root) return null;
  if (p < root.val && q < root.val) return lca(root.left,  p, q);
  if (p > root.val && q > root.val) return lca(root.right, p, q);
  return root; // root is the split point
}`} />
  </div>
);

const renderGraphs = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Grafos — BFS & DFS', 'Graphs — BFS & DFS')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Representación con lista de adyacencia, BFS para caminos más cortos, DFS para detección de ciclos.',
          'Adjacency list representation, BFS for shortest paths, DFS for cycle detection.'
        )}
      </p>
    </div>

    <GraphDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Dirigido vs No Dirigido', 'Directed vs Undirected'),
          color: 'border-indigo-500/30',
          titleColor: 'text-indigo-300',
          points: [
            tx('Dirigido (dígrafo): aristas con dirección A→B', 'Directed (digraph): edges have direction A→B'),
            tx('No dirigido: arista A-B implica B-A', 'Undirected: edge A-B implies B-A'),
            tx('Ponderado: aristas con peso (distancia, coste)', 'Weighted: edges have weight (distance, cost)'),
            tx('DAG: grafo dirigido acíclico (dependencias)', 'DAG: directed acyclic graph (dependencies)'),
          ],
        },
        {
          title: tx('Lista de Adyacencia vs Matriz', 'Adjacency List vs Matrix'),
          color: 'border-indigo-400/30',
          titleColor: 'text-indigo-200',
          points: [
            tx('Lista: O(V+E) espacio, mejor para grafos dispersos', 'List: O(V+E) space, better for sparse graphs'),
            tx('Matriz: O(V²) espacio, O(1) check de arista', 'Matrix: O(V²) space, O(1) edge check'),
            tx('Lista: iteración de vecinos O(grado)', 'List: neighbor iteration O(degree)'),
            tx('Matriz: iteración de vecinos O(V)', 'Matrix: neighbor iteration O(V)'),
          ],
        },
        {
          title: tx('BFS vs DFS — Cuándo usar', 'BFS vs DFS — When to use'),
          color: 'border-indigo-500/20',
          titleColor: 'text-indigo-300',
          points: [
            tx('BFS: camino más corto (no ponderado), nivel por nivel', 'BFS: shortest path (unweighted), level by level'),
            tx('DFS: detección de ciclos, orden topológico', 'DFS: cycle detection, topological order'),
            tx('DFS: flood fill, componentes conectados', 'DFS: flood fill, connected components'),
            tx('BFS: distancia mínima, bipartite check', 'BFS: minimum distance, bipartite check'),
          ],
        },
        {
          title: tx('Detección de Ciclos', 'Cycle Detection'),
          color: 'border-indigo-400/20',
          titleColor: 'text-indigo-200',
          points: [
            tx('No dirigido: DFS con nodo padre (evitar backtrack)', 'Undirected: DFS with parent node (avoid backtrack)'),
            tx('Dirigido: DFS con 3 colores (blanco/gris/negro)', 'Directed: DFS with 3 colors (white/gray/black)'),
            tx('Union-Find: detecta ciclos en O(α(n)) ≈ O(1)', 'Union-Find: detects cycles in O(α(n)) ≈ O(1)'),
            tx('Orden topológico: Kahn\'s (BFS) o DFS', "Topological order: Kahn's (BFS) or DFS"),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`// ── Graph with adjacency list ─────────────────────
class Graph {
  private adj = new Map<number, number[]>();

  addEdge(u: number, v: number, directed = false): void {
    if (!this.adj.has(u)) this.adj.set(u, []);
    if (!this.adj.has(v)) this.adj.set(v, []);
    this.adj.get(u)!.push(v);
    if (!directed) this.adj.get(v)!.push(u);
  }

  // ── BFS — shortest path (unweighted) ─────────────
  bfs(start: number): Map<number, number> {
    const dist = new Map<number, number>();
    const queue: number[] = [start];
    dist.set(start, 0);

    while (queue.length) {
      const node = queue.shift()!;
      for (const neighbor of this.adj.get(node) ?? []) {
        if (!dist.has(neighbor)) {
          dist.set(neighbor, dist.get(node)! + 1);
          queue.push(neighbor);
        }
      }
    }
    return dist;
  }

  // ── DFS — iterative ───────────────────────────────
  dfs(start: number): number[] {
    const visited = new Set<number>();
    const stack: number[] = [start];
    const order: number[] = [];

    while (stack.length) {
      const node = stack.pop()!;
      if (visited.has(node)) continue;
      visited.add(node);
      order.push(node);
      for (const neighbor of (this.adj.get(node) ?? []).slice().reverse()) {
        if (!visited.has(neighbor)) stack.push(neighbor);
      }
    }
    return order;
  }

  // ── Detect cycle (undirected) ─────────────────────
  hasCycle(): boolean {
    const visited = new Set<number>();

    const dfs = (node: number, parent: number): boolean => {
      visited.add(node);
      for (const nb of this.adj.get(node) ?? []) {
        if (!visited.has(nb)) {
          if (dfs(nb, node)) return true;
        } else if (nb !== parent) return true;
      }
      return false;
    };

    for (const node of this.adj.keys()) {
      if (!visited.has(node) && dfs(node, -1)) return true;
    }
    return false;
  }
}

// ── Number of Islands (BFS) ───────────────────────
function numIslands(grid: string[][]): number {
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  const bfs = (r: number, c: number) => {
    const q: [number, number][] = [[r, c]];
    grid[r][c] = '0';
    while (q.length) {
      const [row, col] = q.shift()!;
      for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
        const nr = row + dr, nc = col + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
          grid[nr][nc] = '0';
          q.push([nr, nc]);
        }
      }
    }
  };

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === '1') { bfs(r, c); count++; }

  return count;
}`} />
  </div>
);

const renderSorting = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Algoritmos de Ordenamiento', 'Sorting Algorithms')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'De O(n²) cuadráticos a O(n log n) divide y vencerás, estabilidad e in-place.',
          'From O(n²) quadratic to O(n log n) divide and conquer, stability and in-place properties.'
        )}
      </p>
    </div>

    <SortingDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Sorts O(n²)', 'O(n²) Sorts'),
          color: 'border-indigo-500/30',
          titleColor: 'text-indigo-300',
          points: [
            tx('Bubble: compara pares adyacentes, estable', 'Bubble: compares adjacent pairs, stable'),
            tx('Insertion: construye array ordenado incrementalmente', 'Insertion: builds sorted array incrementally'),
            tx('Selection: encuentra el mínimo en cada paso', 'Selection: finds minimum at each step'),
            tx('Útiles para arrays pequeños o casi ordenados', 'Useful for small or nearly-sorted arrays'),
          ],
        },
        {
          title: tx('Sorts O(n log n)', 'O(n log n) Sorts'),
          color: 'border-indigo-400/30',
          titleColor: 'text-indigo-200',
          points: [
            tx('Merge sort: divide y vencerás, estable, O(n) espacio', 'Merge sort: divide and conquer, stable, O(n) space'),
            tx('Quick sort: in-place, O(log n) espacio, no estable', 'Quick sort: in-place, O(log n) space, not stable'),
            tx('Heap sort: in-place, O(1) extra, no estable', 'Heap sort: in-place, O(1) extra, not stable'),
            tx('TimSort: merge + insertion, usado en Python/Java', 'TimSort: merge + insertion, used in Python/Java'),
          ],
        },
        {
          title: tx('Estabilidad', 'Stability'),
          color: 'border-indigo-500/20',
          titleColor: 'text-indigo-300',
          points: [
            tx('Estable: preserva el orden relativo de iguales', 'Stable: preserves relative order of equals'),
            tx('Merge, Insertion, Bubble, TimSort son estables', 'Merge, Insertion, Bubble, TimSort are stable'),
            tx('Quick, Heap, Selection no son estables', 'Quick, Heap, Selection are not stable'),
            tx('Importante en sorts multi-clave encadenados', 'Important for chained multi-key sorts'),
          ],
        },
        {
          title: tx('Sorts lineales', 'Linear Sorts'),
          color: 'border-indigo-400/20',
          titleColor: 'text-indigo-200',
          points: [
            tx('Counting sort: O(n+k), enteros en rango [0,k]', 'Counting sort: O(n+k), integers in [0,k]'),
            tx('Radix sort: O(d·n), d dígitos, estable', 'Radix sort: O(d·n), d digits, stable'),
            tx('Bucket sort: O(n) promedio con distribución uniforme', 'Bucket sort: O(n) average with uniform distribution'),
            tx('No comparan — eluden la barrera Ω(n log n)', "Don't compare — bypass the Ω(n log n) barrier"),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`// ── Merge Sort — O(n log n) stable ───────────────
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else                     result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}
// Time: O(n log n) | Space: O(n)

// ── Quick Sort — O(n log n) average, O(n²) worst ─
function quickSort(arr: number[], low = 0, high = arr.length - 1): void {
  if (low >= high) return;
  const pivotIdx = partition(arr, low, high);
  quickSort(arr, low,          pivotIdx - 1);
  quickSort(arr, pivotIdx + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
  // Median-of-three pivot to reduce worst case
  const mid = Math.floor((low + high) / 2);
  if (arr[low] > arr[mid])  [arr[low],  arr[mid]]  = [arr[mid],  arr[low]];
  if (arr[low] > arr[high]) [arr[low],  arr[high]] = [arr[high], arr[low]];
  if (arr[mid] > arr[high]) [arr[mid],  arr[high]] = [arr[high], arr[mid]];

  const pivot = arr[mid];
  [arr[mid], arr[high - 1]] = [arr[high - 1], arr[mid]];
  let i = low, j = high - 1;

  while (true) {
    while (arr[++i] < pivot) {}
    while (arr[--j] > pivot) {}
    if (i >= j) break;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  [arr[i], arr[high - 1]] = [arr[high - 1], arr[i]];
  return i;
}
// Time: O(n log n) avg, O(n²) worst | Space: O(log n)

// ── Counting Sort — O(n + k) ──────────────────────
function countingSort(arr: number[], max: number): number[] {
  const count = new Array(max + 1).fill(0);
  for (const n of arr) count[n]++;
  for (let i = 1; i <= max; i++) count[i] += count[i - 1]; // prefix sum

  const output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    output[--count[arr[i]]] = arr[i];
  }
  return output;
}`} />
  </div>
);

const renderDP = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Programación Dinámica', 'Dynamic Programming')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Subestructura óptima y subproblemas solapados. Memoización top-down vs tabulation bottom-up.',
          'Optimal substructure and overlapping subproblems. Top-down memoization vs bottom-up tabulation.'
        )}
      </p>
    </div>

    <DPDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Top-down (Memoización)', 'Top-down (Memoization)'),
          color: 'border-indigo-500/30',
          titleColor: 'text-indigo-300',
          points: [
            tx('Recursión + caché (Map o array)', 'Recursion + cache (Map or array)'),
            tx('Solo calcula los subproblemas necesarios', 'Only computes needed subproblems'),
            tx('Más natural desde la definición recursiva', 'More natural from recursive definition'),
            tx('Overhead de llamadas recursivas y caché', 'Overhead of recursive calls and cache'),
          ],
        },
        {
          title: tx('Bottom-up (Tabulación)', 'Bottom-up (Tabulation)'),
          color: 'border-indigo-400/30',
          titleColor: 'text-indigo-200',
          points: [
            tx('Rellena tabla iterativamente de base a meta', 'Fills table iteratively from base to goal'),
            tx('Sin recursión: más eficiente en espacio y pila', 'No recursion: more stack/space efficient'),
            tx('Hay que definir el orden de llenado', 'Must define fill order explicitly'),
            tx('Optimizable reduciendo dimensiones de la tabla', 'Optimizable by reducing table dimensions'),
          ],
        },
        {
          title: tx('Subestructura Óptima', 'Optimal Substructure'),
          color: 'border-indigo-500/20',
          titleColor: 'text-indigo-300',
          points: [
            tx('La solución óptima contiene soluciones óptimas de subproblemas', 'Optimal solution contains optimal sub-solutions'),
            tx('Dijkstra, Floyd-Warshall: caminos óptimos', 'Dijkstra, Floyd-Warshall: optimal paths'),
            tx('Knapsack: subconjuntos de peso máximo', 'Knapsack: max-weight subsets'),
            tx('LCS: subsecuencia común más larga', 'LCS: longest common subsequence'),
          ],
        },
        {
          title: tx('Patrones Clásicos', 'Classic Patterns'),
          color: 'border-indigo-400/20',
          titleColor: 'text-indigo-200',
          points: [
            tx('0/1 Knapsack: incluir o no cada item', '0/1 Knapsack: include or exclude each item'),
            tx('Coin Change: mínimas monedas para suma S', 'Coin Change: min coins for sum S'),
            tx('Edit Distance: operaciones entre strings', 'Edit Distance: operations between strings'),
            tx('Matrix Chain: orden óptimo de multiplicación', 'Matrix Chain: optimal multiplication order'),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`// ── Fibonacci — top-down memoization ─────────────
function fibMemo(n: number, memo = new Map<number, number>()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}
// Time: O(n) | Space: O(n)

// ── Fibonacci — bottom-up tabulation ─────────────
function fibTab(n: number): number {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}
// Time: O(n) | Space: O(1)

// ── Coin Change — min coins (bottom-up) ───────────
function coinChange(coins: number[], amount: number): number {
  // dp[i] = min coins to make amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
// coinChange([1,5,11], 15) → 3  (11+3×1 → no, 11+4 → no, 5+5+5 → 3)
// Time: O(amount * coins.length) | Space: O(amount)

// ── 0/1 Knapsack ──────────────────────────────────
function knapsack(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  // dp[i][w] = max value using first i items with capacity w
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w]; // don't take item i
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}
// Time: O(n * capacity) | Space: O(n * capacity)`} />
  </div>
);

const renderBigO = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Big O & Complejidad', 'Big O & Complexity')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Notación asintótica, complejidad temporal y espacial, análisis amortizado y consejos para entrevistas.',
          'Asymptotic notation, time and space complexity, amortized analysis and interview tips.'
        )}
      </p>
    </div>

    <BigODiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Complejidad Temporal', 'Time Complexity'),
          color: 'border-indigo-500/30',
          titleColor: 'text-indigo-300',
          points: [
            tx('O(1): acceso array, HashMap get/set, stack push/pop', 'O(1): array access, HashMap get/set, stack push/pop'),
            tx('O(log n): binary search, BST en árbol balanceado', 'O(log n): binary search, BST on balanced tree'),
            tx('O(n): recorrido lineal, búsqueda lineal, BFS/DFS', 'O(n): linear traversal, linear search, BFS/DFS'),
            tx('O(n²): bucles anidados, bubble/insertion sort', 'O(n²): nested loops, bubble/insertion sort'),
          ],
        },
        {
          title: tx('Complejidad Espacial', 'Space Complexity'),
          color: 'border-indigo-400/30',
          titleColor: 'text-indigo-200',
          points: [
            tx('O(1): in-place, sin estructuras auxiliares', 'O(1): in-place, no auxiliary structures'),
            tx('O(n): almacenar copia del input, tabla DP', 'O(n): storing copy of input, DP table'),
            tx('O(log n): pila de recursión en binary search', 'O(log n): recursion stack in binary search'),
            tx('O(h): pila de recursión de árbol, h = altura', 'O(h): tree recursion stack, h = height'),
          ],
        },
        {
          title: tx('Análisis Amortizado', 'Amortized Analysis'),
          color: 'border-indigo-500/20',
          titleColor: 'text-indigo-300',
          points: [
            tx('Costo promedio por operación en secuencia larga', 'Average cost per operation over a long sequence'),
            tx('Array.push: O(1) amortizado (occasional O(n) resize)', 'Array.push: O(1) amortized (occasional O(n) resize)'),
            tx('Aggregate, potential y accounting methods', 'Aggregate, potential and accounting methods'),
            tx('Union-Find con rank+path compression: O(α(n))', 'Union-Find with rank+path compression: O(α(n))'),
          ],
        },
        {
          title: tx('Consejos de Entrevista', 'Interview Tips'),
          color: 'border-indigo-400/20',
          titleColor: 'text-indigo-200',
          points: [
            tx('Declara la complejidad T y E antes de codear', 'State T and E complexity before coding'),
            tx('Busca patrones: hash → O(n→1), sort → O(n log n)', 'Look for patterns: hash → O(n→1), sort → O(n log n)'),
            tx('Ignora constantes y términos de orden menor', 'Ignore constants and lower-order terms'),
            tx('Peor caso por defecto; menciona promedio si difiere', 'Default to worst case; mention average if different'),
          ],
        },
      ].map(({ title, color, titleColor, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color} rounded-xl p-4`}>
          <div className={`font-bold text-sm mb-3 ${titleColor}`}>{title}</div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`// ── O(1) — constant time ──────────────────────────
function getFirst(arr: number[]): number { return arr[0]; }
const map = new Map<string, number>();
map.set('key', 42);          // O(1)
map.get('key');              // O(1)

// ── O(log n) — binary search ──────────────────────
function binarySearch(arr: number[], target: number): number {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if      (arr[mid] === target) return mid;
    else if (arr[mid] <  target) lo = mid + 1;
    else                          hi = mid - 1;
  }
  return -1;
}
// Each iteration halves the search space → log₂(n) iterations

// ── O(n) — single pass ────────────────────────────
function maxValue(arr: number[]): number {
  let max = -Infinity;
  for (const n of arr) if (n > max) max = n;
  return max;
}

// ── O(n log n) — sort + scan ──────────────────────
function findKthLargest(arr: number[], k: number): number {
  return arr.sort((a, b) => b - a)[k - 1];
}

// ── O(n²) — nested loops ──────────────────────────
function hasDuplicate(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] === arr[j]) return true;
  return false;
}
// Better: O(n) with Set
function hasDuplicateFast(arr: number[]): boolean {
  return arr.length !== new Set(arr).size;
}

// ── O(2ⁿ) — exponential (naive recursion) ────────
function fibNaive(n: number): number {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2); // 2^n calls!
}
// Fix: memoize → O(n)

// ── Space complexity examples ─────────────────────
// O(1) space — two pointers, no extra array
function reverseInPlace(arr: number[]): void {
  let l = 0, r = arr.length - 1;
  while (l < r) { [arr[l++], arr[r--]] = [arr[r], arr[l]]; }
}

// O(n) space — new array
function reverseNew(arr: number[]): number[] { return [...arr].reverse(); }`} />
  </div>
);

// ─── Interview Section ────────────────────────────────────────────────────────

const InterviewSection = ({ groups, tx }) => {
  const [openItems, setOpenItems] = useState({});
  const toggle = (key) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Preparación para Entrevistas', 'Interview Prep')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Preguntas de entrevista de DSA de Junior a Senior con respuestas detalladas.',
            'DSA interview questions from Junior to Senior with detailed answers.'
          )}
        </p>
      </div>

      {groups.map((group) => (
        <div key={group.level} className={`border ${group.color} rounded-xl p-4 space-y-3`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${group.badgeColor}`}>
              {group.level}
            </span>
          </div>
          {group.qa.map((item, qi) => {
            const key = `${group.level}-${qi}`;
            const isOpen = !!openItems[key];
            return (
              <div key={qi} className="border border-slate-700/50 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggle(key)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-semibold text-sm text-slate-200 pr-2">{item.q}</span>
                  {isOpen
                    ? <ChevronUp className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-700/50 bg-slate-900/30">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const renderInterview = (tx) => {
  const groups = [
    {
      level: 'Junior',
      color: 'border-green-500/30 bg-green-500/5',
      badgeColor: 'bg-green-500/20 text-green-300',
      qa: [
        {
          q: tx('¿Cuándo usar un array vs un objeto/mapa?', 'When to use an array vs an object/map?'),
          a: tx(
            'Usa un array cuando el orden importa y accedes por índice entero. Usa un Map/objeto cuando necesitas búsquedas por clave arbitraria en O(1). Ejemplos: frecuencia de caracteres → Map; lista ordenada de pasos → array. En TypeScript, Map tiene mejor semántica para claves no-string.',
            'Use an array when order matters and you access by integer index. Use a Map/object when you need O(1) lookup by arbitrary key. Examples: character frequency → Map; ordered list of steps → array. In TypeScript, Map has better semantics for non-string keys.'
          ),
        },
        {
          q: tx('¿Qué es la complejidad O(n log n) y por qué importa?', 'What is O(n log n) complexity and why does it matter?'),
          a: tx(
            'O(n log n) es la barrera teórica inferior para algoritmos de ordenamiento basados en comparaciones (teorema del límite inferior). Significa que cada uno de los n elementos requiere log n comparaciones para encontrar su posición correcta. En la práctica, un millón de elementos se ordena en ~20M operaciones vs ~10¹² para O(n²), la diferencia entre milisegundos y horas.',
            'O(n log n) is the theoretical lower bound for comparison-based sorting (lower bound theorem). It means each of n elements requires log n comparisons to find its correct position. In practice, a million elements sort in ~20M operations vs ~10¹² for O(n²), the difference between milliseconds and hours.'
          ),
        },
        {
          q: tx('¿Diferencia entre BFS y DFS?', 'What is the difference between BFS and DFS?'),
          a: tx(
            'BFS usa una queue (FIFO) y explora nivel por nivel — garantiza el camino más corto en grafos no ponderados. DFS usa una stack (o recursión) y va tan profundo como puede antes de retroceder — útil para topological sort, detección de ciclos y explorar todos los caminos. BFS usa O(n) espacio (nivel más ancho); DFS usa O(h) espacio (profundidad del árbol).',
            'BFS uses a queue (FIFO) and explores level by level — guarantees shortest path in unweighted graphs. DFS uses a stack (or recursion) and goes as deep as possible before backtracking — useful for topological sort, cycle detection and exploring all paths. BFS uses O(n) space (widest level); DFS uses O(h) space (tree depth).'
          ),
        },
        {
          q: tx('¿Qué es un árbol BST y cuándo degrada a O(n)?', 'What is a BST and when does it degrade to O(n)?'),
          a: tx(
            'Un BST es un árbol donde todo nodo izquierdo < nodo actual < nodo derecho. Búsqueda, inserción y eliminación son O(h) donde h es la altura. Si los datos se insertan en orden ascendente o descendente, el árbol se degenera en una lista enlazada (h = n), haciendo todo O(n). Los árboles autobalanceados (AVL, Red-Black) garantizan h = O(log n).',
            'A BST is a tree where every left node < current node < right node. Search, insert, delete are O(h) where h is height. If data is inserted in ascending or descending order, the tree degenerates into a linked list (h = n), making everything O(n). Self-balancing trees (AVL, Red-Black) guarantee h = O(log n).'
          ),
        },
        {
          q: tx('¿Cuándo usarías una lista enlazada sobre un array?', 'When would you use a linked list over an array?'),
          a: tx(
            'Usa una lista enlazada cuando: (1) necesitas insertar/eliminar frecuentemente al principio o en el medio sin conocer el índice — O(1) vs O(n) en array; (2) el tamaño varía mucho y no quieres el overhead de redimensionar. Desventajas: no hay acceso aleatorio O(1) por índice, peor localidad de caché que un array contiguo, overhead de punteros (8 bytes por nodo en 64-bit).',
            'Use a linked list when: (1) you frequently insert/delete at the head or middle without knowing the index — O(1) vs O(n) for arrays; (2) size varies widely and you want to avoid resize overhead. Downsides: no O(1) random index access, worse cache locality than contiguous arrays, pointer overhead (8 bytes per node on 64-bit).'
          ),
        },
      ],
    },
    {
      level: 'Mid',
      color: 'border-yellow-500/30 bg-yellow-500/5',
      badgeColor: 'bg-yellow-500/20 text-yellow-300',
      qa: [
        {
          q: tx('¿Cómo detectas un ciclo en una lista enlazada?', 'How do you detect a cycle in a linked list?'),
          a: tx(
            'Algoritmo de Floyd (dos punteros): slow avanza 1 nodo, fast avanza 2. Si hay ciclo, se encuentran antes del final. Tiempo O(n), espacio O(1). Para encontrar el inicio del ciclo: cuando se encuentran, mueve slow al head y avanza ambos a velocidad 1 — se vuelven a encontrar exactamente en el inicio del ciclo. Alternativa: HashSet de nodos visitados O(n) tiempo y espacio.',
            "Floyd's algorithm (two pointers): slow moves 1 node, fast moves 2. If there's a cycle they meet before the end. Time O(n), space O(1). To find cycle start: when they meet, move slow to head and advance both at speed 1 — they meet exactly at the cycle start. Alternative: HashSet of visited nodes, O(n) time and space."
          ),
        },
        {
          q: tx('¿Qué es programación dinámica y cómo la identificas?', 'What is dynamic programming and how do you identify it?'),
          a: tx(
            'DP aplica cuando un problema tiene: (1) subestructura óptima — la solución óptima global se construye de soluciones óptimas de subproblemas; (2) subproblemas solapados — los mismos subproblemas se resuelven múltiples veces en la recursión ingenua. Señales: preguntas con "mínimo/máximo/número de formas", problemas de secuencias (LCS, edit distance), mochila, cortar cadenas. Patrón: define dp[estado], escribe la recurrencia, rellena en orden correcto.',
            'DP applies when a problem has: (1) optimal substructure — the global optimal solution is built from optimal sub-solutions; (2) overlapping subproblems — the same sub-problems are solved multiple times in the naive recursion. Signals: questions with "minimum/maximum/number of ways", sequence problems (LCS, edit distance), knapsack, string cutting. Pattern: define dp[state], write the recurrence, fill in the correct order.'
          ),
        },
        {
          q: tx('¿Cómo implementarías un LRU cache?', 'How would you implement an LRU cache?'),
          a: tx(
            'Combina HashMap + Doubly Linked List. El map guarda clave→nodo en O(1). La lista mantiene orden de uso: más reciente en la cabeza, menos reciente en la cola. get(key): accede al nodo O(1) vía map, lo mueve al frente O(1). put(key,val): si existe, actualiza y mueve al frente; si no, crea nodo nuevo al frente; si capacity excedida, elimina el nodo de la cola y su entrada en el map. Todo O(1). En JS puedes aprovechar que Map mantiene orden de inserción.',
            'Combine HashMap + Doubly Linked List. The map stores key→node in O(1). The list maintains usage order: most recent at head, least recent at tail. get(key): access node O(1) via map, move to front O(1). put(key,val): if exists update and move to front; if not, create new node at front; if capacity exceeded, remove tail node and its map entry. All O(1). In JS you can exploit that Map maintains insertion order.'
          ),
        },
        {
          q: tx('¿Qué es una tabla de hash y cómo maneja las colisiones?', 'What is a hash table and how does it handle collisions?'),
          a: tx(
            'Una hash table mapea claves a índices via función hash. Colisiones (dos claves → mismo bucket) se resuelven por: (1) Chaining: cada bucket es una lista enlazada, O(1) promedio con buen hash, O(n) peor caso; (2) Open Addressing: busca el siguiente slot libre (linear probing, quadratic, double hashing). Factor de carga (elementos/buckets) controla cuándo rehashear — típicamente 0.75. Rehash duplica el tamaño y reininserta todo: O(n) pero amortizado O(1).',
            'A hash table maps keys to indices via a hash function. Collisions (two keys → same bucket) are resolved by: (1) Chaining: each bucket is a linked list, O(1) average with good hash, O(n) worst case; (2) Open Addressing: finds next free slot (linear probing, quadratic, double hashing). Load factor (elements/buckets) controls when to rehash — typically 0.75. Rehash doubles size and re-inserts everything: O(n) but amortized O(1).'
          ),
        },
        {
          q: tx('¿Cuándo usarías Quick Sort vs Merge Sort?', 'When would you use Quick Sort vs Merge Sort?'),
          a: tx(
            'Quick Sort: preferido cuando la memoria es limitada (O(log n) espacio in-place vs O(n) de merge), los datos caben en caché (mejor localidad), y se puede hacer pivot aleatorio para evitar O(n²). Merge Sort: preferido cuando la estabilidad importa (preserva el orden de iguales), los datos son externos (no caben en memoria), o el peor caso garantizado O(n log n) es crítico. Arrays en práctica: QuickSort (con optimizaciones). Linked lists: MergeSort (no hay acceso aleatorio para partition).',
            'Quick Sort: preferred when memory is limited (O(log n) in-place space vs O(n) for merge), data fits in cache (better locality), and random pivot avoids O(n²). Merge Sort: preferred when stability matters (preserves equal elements order), data is external (doesn\'t fit in memory), or guaranteed O(n log n) worst case is critical. Arrays in practice: QuickSort (with optimizations). Linked lists: MergeSort (no random access for partition).'
          ),
        },
      ],
    },
    {
      level: 'Senior',
      color: 'border-red-500/30 bg-red-500/5',
      badgeColor: 'bg-red-500/20 text-red-300',
      qa: [
        {
          q: tx('¿Cómo abordarías un problema de grafos en producción?', 'How would you approach a graph problem in production?'),
          a: tx(
            'Primero modelar: ¿nodos y aristas representan qué? ¿Dirigido/no dirigido? ¿Ponderado? Luego elegir representación: lista de adyacencia para grafos dispersos (V<<E posibles), matriz para grafos densos o cuando el check de arista frecuente importa. Para camino más corto: BFS (no ponderado), Dijkstra (pesos positivos, O((V+E)log V) con heap), Bellman-Ford (pesos negativos, O(VE)). Para ciclos/orden topológico: DFS coloreado o Kahn. Escala: grafos millonarios requieren Pregel/GraphX, no algoritmos in-memory.',
            'First model: what do nodes and edges represent? Directed/undirected? Weighted? Then choose representation: adjacency list for sparse graphs (V<<possible E), matrix for dense graphs or frequent edge checks. For shortest path: BFS (unweighted), Dijkstra (positive weights, O((V+E)log V) with heap), Bellman-Ford (negative weights, O(VE)). For cycles/topological order: colored DFS or Kahn. Scale: million-node graphs need Pregel/GraphX, not in-memory algorithms.'
          ),
        },
        {
          q: tx('¿Cómo optimizarías el espacio en una solución DP 2D?', 'How would you optimize space in a 2D DP solution?'),
          a: tx(
            'Si dp[i][j] solo depende de dp[i-1][*] (fila anterior), puedes reducir de O(n*m) a O(m) usando dos arrays de una fila. Si dp[i][j] depende solo de dp[i][j-1] y dp[i-1][j-1], puedes usar una sola fila actualizada de derecha a izquierda. Ejemplo: 0/1 Knapsack con O(capacity) en lugar de O(n*capacity). LCS puede reducirse de O(n*m) a O(min(n,m)). El truco es identificar exactamente de qué celdas anteriores depende la celda actual y mantener solo esas.',
            'If dp[i][j] only depends on dp[i-1][*] (previous row), you can reduce from O(n*m) to O(m) using two single-row arrays. If dp[i][j] depends only on dp[i][j-1] and dp[i-1][j-1], you can use a single row updated right-to-left. Example: 0/1 Knapsack with O(capacity) instead of O(n*capacity). LCS can be reduced from O(n*m) to O(min(n,m)). The trick is identifying exactly which previous cells the current cell depends on and keeping only those.'
          ),
        },
        {
          q: tx('¿Cómo diseñarías un sistema de autocompletado escalable?', 'How would you design a scalable autocomplete system?'),
          a: tx(
            'Estructura de datos: Trie con frecuencias en cada nodo — cada prefijo apunta a sus top-k palabras (heap de tamaño k). Inserción O(m) por palabra, búsqueda O(m + k). A escala: particionar el trie por prefijo (sharding). Capa de caché (Redis) para los prefijos más buscados. Actualización asíncrona de frecuencias con un pipeline de stream (Kafka → counters). Para tolerancia a faltas tipográficas: BK-tree o Levenshtein acotado. En producción (Google Suggest): precalcular top sugerencias offline, servir desde caché con < 100ms p99.',
            'Data structure: Trie with frequencies at each node — each prefix points to its top-k words (heap of size k). Insert O(m) per word, search O(m + k). At scale: partition the trie by prefix (sharding). Cache layer (Redis) for most-searched prefixes. Async frequency updates with a stream pipeline (Kafka → counters). For typo tolerance: BK-tree or bounded Levenshtein. In production (Google Suggest): precompute top suggestions offline, serve from cache at <100ms p99.'
          ),
        },
        {
          q: tx('¿Cuándo es preferible un heap sobre un árbol BST?', 'When is a heap preferable over a BST?'),
          a: tx(
            'Un heap es preferible cuando solo necesitas el mínimo/máximo eficientemente y no el conjunto ordenado completo. Heap: insert O(log n), extractMin O(log n), getMin O(1), no soporta búsqueda arbitrary O(log n). BST balanceado: insert/search/delete O(log n), in-order traversal da ordenado. Usa heap para: priority queue, top-k elements (heap de tamaño k → O(n log k)), Dijkstra, Huffman coding. Usa BST cuando necesitas: rango de búsqueda, sucesor/predecesor, iteración ordenada. En la práctica, heaps tienen mejor cache locality al ser arrays.',
            'A heap is preferable when you only need the min/max efficiently, not the full sorted set. Heap: insert O(log n), extractMin O(log n), getMin O(1), no arbitrary O(log n) search. Balanced BST: insert/search/delete O(log n), in-order traversal gives sorted output. Use heap for: priority queue, top-k elements (heap of size k → O(n log k)), Dijkstra, Huffman coding. Use BST when you need: range search, successor/predecessor, sorted iteration. In practice, heaps have better cache locality as arrays.'
          ),
        },
        {
          q: tx('¿Cómo evaluarías la complejidad de un algoritmo recursivo con árbol de recursión?', 'How do you evaluate recursive algorithm complexity using recursion trees?'),
          a: tx(
            'El árbol de recursión expande cada llamada como un nodo con sus subproblemas como hijos. El costo total = suma de costos en todos los niveles. Pasos: (1) dibuja el árbol, identifica branching factor b y factor de reducción; (2) calcula altura h = log_b(n); (3) costo por nivel * número de niveles. El Master Theorem automatiza esto para T(n) = aT(n/b) + f(n): si f(n) = O(n^{log_b(a) - ε}) → T(n) = Θ(n^{log_b a}); si f(n) = Θ(n^{log_b a}) → T(n) = Θ(n^{log_b a} log n); si f(n) = Ω(n^{log_b a + ε}) → T(n) = Θ(f(n)).',
            'The recursion tree expands each call as a node with subproblems as children. Total cost = sum of costs at all levels. Steps: (1) draw the tree, identify branching factor b and reduction factor; (2) compute height h = log_b(n); (3) cost per level × number of levels. The Master Theorem automates this for T(n) = aT(n/b) + f(n): if f(n) = O(n^{log_b(a) - ε}) → T(n) = Θ(n^{log_b a}); if f(n) = Θ(n^{log_b a}) → T(n) = Θ(n^{log_b a} log n); if f(n) = Ω(n^{log_b a + ε}) → T(n) = Θ(f(n)).'
          ),
        },
      ],
    },
  ];

  return <InterviewSection groups={groups} tx={tx} />;
};

// ─── Main Component ───────────────────────────────────────────────────────────

function DSAPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('arrays');

  const sections = [
    {
      id: 'arrays',
      title: tx('Arrays & Hash Maps', 'Arrays & Hash Maps'),
      subtitle: tx('Two pointers, ventana deslizante', 'Two pointers, sliding window'),
    },
    {
      id: 'linkedlists',
      title: tx('Listas Enlazadas', 'Linked Lists'),
      subtitle: tx('Stack, Queue, LIFO, FIFO', 'Stack, Queue, LIFO, FIFO'),
    },
    {
      id: 'trees',
      title: tx('Árboles & BST', 'Trees & BST'),
      subtitle: tx('Recorridos, balanceo, tries', 'Traversals, balancing, tries'),
    },
    {
      id: 'graphs',
      title: tx('Grafos BFS/DFS', 'Graphs BFS/DFS'),
      subtitle: tx('Lista adyacencia, ciclos', 'Adjacency list, cycles'),
    },
    {
      id: 'sorting',
      title: tx('Ordenamiento', 'Sorting'),
      subtitle: tx('Merge, Quick, Counting', 'Merge, Quick, Counting'),
    },
    {
      id: 'dp',
      title: tx('Prog. Dinámica', 'Dynamic Prog.'),
      subtitle: tx('Memo, tabulación, knapsack', 'Memo, tabulation, knapsack'),
    },
    {
      id: 'bigo',
      title: 'Big O',
      subtitle: tx('Complejidad T y E, amortizado', 'Time & Space, amortized'),
    },
    {
      id: 'interview',
      title: tx('Entrevista', 'Interview Prep'),
      subtitle: tx('Junior → Senior preguntas', 'Junior → Senior questions'),
    },
  ];

  const renderContent = () => {
    switch (active) {
      case 'arrays':     return renderArrays(tx);
      case 'linkedlists': return renderLinkedLists(tx);
      case 'trees':      return renderTrees(tx);
      case 'graphs':     return renderGraphs(tx);
      case 'sorting':    return renderSorting(tx);
      case 'dp':         return renderDP(tx);
      case 'bigo':       return renderBigO(tx);
      case 'interview':  return renderInterview(tx);
      default:           return renderArrays(tx);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                active === s.id
                  ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                  : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{s.title}</div>
              <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{s.subtitle}</div>
            </button>
          ))}
        </div>
      </div>

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

export default DSAPro;
