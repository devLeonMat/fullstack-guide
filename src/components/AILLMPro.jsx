import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Zap } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── LLM Architecture Diagram ────────────────────────────────────────────────

const LLMArchDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: tx('Texto de entrada', 'Input Text'),
      detail: '"Hello world"',
      color: 'border-fuchsia-500/60 text-fuchsia-300 bg-fuchsia-500/15',
      glow: 'rgba(217,70,239,0.45)',
    },
    {
      label: tx('Tokenizador', 'Tokenizer'),
      detail: '[15496, 995]',
      color: 'border-purple-500/60 text-purple-300 bg-purple-500/15',
      glow: 'rgba(168,85,247,0.45)',
    },
    {
      label: tx('Capas Transformer', 'Transformer Layers'),
      detail: 'Attention × 32',
      color: 'border-fuchsia-400/60 text-fuchsia-200 bg-fuchsia-400/15',
      glow: 'rgba(232,121,249,0.45)',
    },
    {
      label: tx('Tokens de salida', 'Output Tokens'),
      detail: '[p=0.92, ...]',
      color: 'border-purple-400/60 text-purple-200 bg-purple-400/15',
      glow: 'rgba(192,132,252,0.45)',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-fuchsia-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-fuchsia-300 uppercase tracking-wider">
        {tx('Flujo de tokens en un LLM', 'Token Flow in an LLM')}
      </p>
      <div className="flex items-center justify-center flex-wrap gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <motion.div
              animate={{
                boxShadow: activeStep === i ? `0 0 20px ${step.glow}` : activeStep > i ? `0 0 6px ${step.glow}` : '0 0 0px transparent',
                scale: activeStep === i ? 1.07 : 1,
                opacity: activeStep >= i ? 1 : 0.35,
              }}
              transition={{ duration: 0.35 }}
              className={`flex flex-col items-center border rounded-xl px-3 py-2 text-center min-w-[90px] ${step.color}`}
            >
              <span className="text-xs font-bold leading-tight">{step.label}</span>
              <code className="text-[10px] text-slate-300 font-mono mt-1 bg-slate-900/50 px-1.5 py-0.5 rounded">{step.detail}</code>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                animate={{ opacity: activeStep > i ? 1 : 0.2 }}
                transition={{ duration: 0.3 }}
                className="text-fuchsia-500/70 text-lg font-bold"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={activeStep}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="text-center text-xs text-fuchsia-400 h-4"
        >
          {[
            tx('El texto crudo es dividido en subpalabras o caracteres', 'Raw text is split into subwords or characters'),
            tx('BPE o SentencePiece asigna IDs numéricos a cada token', 'BPE or SentencePiece assigns numeric IDs to each token'),
            tx('Multi-head self-attention captura dependencias contextuales', 'Multi-head self-attention captures contextual dependencies'),
            tx('Softmax sobre vocabulario produce distribución de probabilidad', 'Softmax over vocabulary produces probability distribution'),
          ][activeStep]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Prompt Techniques Diagram ───────────────────────────────────────────────

const PromptTechniquesDiagram = ({ tx }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const techniques = [
    {
      name: 'Zero-shot',
      desc: tx('Sin ejemplos — solo instrucción directa', 'No examples — just direct instruction'),
      example: tx('"Traduce al francés: Hello"', '"Translate to French: Hello"'),
      color: 'border-fuchsia-500/60 text-fuchsia-300 bg-fuchsia-500/15',
      glow: 'rgba(217,70,239,0.45)',
    },
    {
      name: 'Few-shot',
      desc: tx('2-5 ejemplos de entrada/salida antes del input', '2-5 input/output examples before the input'),
      example: tx('"ES: Hola → FR: Bonjour\\nES: Gracias → FR:?"', '"ES: Hola → FR: Bonjour\\nES: Gracias → FR:?"'),
      color: 'border-purple-500/60 text-purple-300 bg-purple-500/15',
      glow: 'rgba(168,85,247,0.45)',
    },
    {
      name: 'Chain-of-Thought',
      desc: tx('Fuerza razonamiento paso a paso', 'Forces step-by-step reasoning'),
      example: '"Think step by step..."',
      color: 'border-fuchsia-400/60 text-fuchsia-200 bg-fuchsia-400/15',
      glow: 'rgba(232,121,249,0.45)',
    },
    {
      name: 'ReAct',
      desc: tx('Thought → Action → Observation loop', 'Thought → Action → Observation loop'),
      example: tx('"Thought: necesito buscar...\\nAction: search(query)"', '"Thought: I need to look up...\\nAction: search(query)"'),
      color: 'border-purple-400/60 text-purple-200 bg-purple-400/15',
      glow: 'rgba(192,132,252,0.45)',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % techniques.length), 1800);
    return () => clearInterval(id);
  }, []);

  const active = techniques[activeIdx];

  return (
    <div className="bg-slate-950/40 border border-fuchsia-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-fuchsia-300 uppercase tracking-wider">
        {tx('Técnicas de prompting', 'Prompting Techniques')}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {techniques.map((t, i) => (
          <motion.div
            key={t.name}
            animate={{
              boxShadow: activeIdx === i ? `0 0 18px ${t.glow}` : '0 0 0px transparent',
              scale: activeIdx === i ? 1.04 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`flex flex-col items-center gap-1.5 p-2.5 border rounded-xl text-center ${t.color} ${activeIdx === i ? 'opacity-100' : 'opacity-35'}`}
          >
            <span className="font-bold text-xs">{t.name}</span>
          </motion.div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className={`border rounded-xl p-3 ${active.color}`}
        >
          <p className="text-xs font-semibold mb-1">{active.desc}</p>
          <code className="text-[10px] text-slate-300 font-mono bg-slate-900/50 px-2 py-1 rounded block">{active.example}</code>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── RAG Pipeline Diagram ─────────────────────────────────────────────────────

const RAGPipelineDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: tx('Consulta', 'User Query'), detail: '"What is RAG?"', color: 'border-fuchsia-600/60 text-fuchsia-400 bg-fuchsia-600/15', glow: 'rgba(192,38,211,0.4)' },
    { label: tx('Embed', 'Embed'), detail: 'text-embedding-3', color: 'border-fuchsia-500/60 text-fuchsia-300 bg-fuchsia-500/15', glow: 'rgba(217,70,239,0.4)' },
    { label: tx('Búsqueda vectorial', 'Vector Search'), detail: 'top-k=5', color: 'border-purple-500/60 text-purple-300 bg-purple-500/15', glow: 'rgba(168,85,247,0.4)' },
    { label: tx('Aumentar prompt', 'Augment Prompt'), detail: 'ctx + query', color: 'border-fuchsia-400/60 text-fuchsia-200 bg-fuchsia-400/15', glow: 'rgba(232,121,249,0.4)' },
    { label: 'LLM', detail: 'claude-3-5', color: 'border-purple-400/60 text-purple-200 bg-purple-400/15', glow: 'rgba(192,132,252,0.4)' },
    { label: tx('Respuesta', 'Answer'), detail: '"RAG is..."', color: 'border-fuchsia-300/60 text-fuchsia-100 bg-fuchsia-300/15', glow: 'rgba(240,171,252,0.4)' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-fuchsia-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-fuchsia-300 uppercase tracking-wider">
        {tx('Pipeline RAG — 6 pasos', 'RAG Pipeline — 6 Steps')}
      </p>
      <div className="flex items-center flex-wrap gap-1.5 justify-center">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1.5">
            <motion.div
              animate={{
                boxShadow: activeStep === i ? `0 0 18px ${step.glow}` : activeStep > i ? `0 0 5px ${step.glow}` : '0 0 0px transparent',
                scale: activeStep === i ? 1.07 : 1,
                opacity: activeStep >= i ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col items-center border rounded-xl px-2.5 py-2 text-center ${step.color}`}
            >
              <span className="text-[11px] font-bold leading-tight">{step.label}</span>
              <code className="text-[9px] text-slate-400 font-mono mt-0.5">{step.detail}</code>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                animate={{ opacity: activeStep > i ? 1 : 0.2 }}
                className="text-fuchsia-500/60 text-sm"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={activeStep}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="text-center text-xs text-fuchsia-400 h-4"
        >
          {[
            tx('El usuario envía una pregunta al sistema RAG', 'User sends a question to the RAG system'),
            tx('La consulta se convierte en un vector de embeddings denso', 'Query is converted to a dense embedding vector'),
            tx('Cosine similarity encuentra los k documentos más relevantes', 'Cosine similarity finds the k most relevant documents'),
            tx('Los documentos recuperados se insertan en el prompt del LLM', 'Retrieved documents are inserted into the LLM prompt'),
            tx('El LLM genera la respuesta usando el contexto recuperado', 'LLM generates answer using retrieved context'),
            tx('Respuesta fundamentada — sin alucinaciones sobre los hechos', 'Grounded answer — no hallucinations about the facts'),
          ][activeStep]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Vector Search Diagram ───────────────────────────────────────────────────

const VectorSearchDiagram = ({ tx }) => {
  const [tick, setTick] = useState(0);

  const queryPoint = { x: 50, y: 45 };
  const points = [
    { id: 'A', x: 62, y: 38, dist: 0.15, label: 'doc_A' },
    { id: 'B', x: 44, y: 55, dist: 0.22, label: 'doc_B' },
    { id: 'C', x: 70, y: 52, dist: 0.28, label: 'doc_C' },
    { id: 'D', x: 20, y: 25, dist: 0.75, label: 'doc_D' },
    { id: 'E', x: 85, y: 15, dist: 0.88, label: 'doc_E' },
    { id: 'F', x: 30, y: 75, dist: 0.81, label: 'doc_F' },
    { id: 'G', x: 78, y: 70, dist: 0.65, label: 'doc_G' },
  ];

  const topK = 3;
  const sortedByDist = [...points].sort((a, b) => a.dist - b.dist);
  const highlighted = new Set(sortedByDist.slice(0, topK).map(p => p.id));

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1500);
    return () => clearInterval(id);
  }, []);

  const phase = tick % 3;

  return (
    <div className="bg-slate-950/40 border border-fuchsia-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-fuchsia-300 uppercase tracking-wider">
        {tx('Búsqueda de vecinos más cercanos (k=3)', 'k-Nearest Neighbors Search (k=3)')}
      </p>
      <div className="relative w-full h-40 bg-slate-900/50 rounded-xl overflow-hidden border border-slate-800/50">
        {/* Grid lines */}
        {[25, 50, 75].map(v => (
          <div key={`h${v}`} className="absolute w-full border-t border-slate-800/30" style={{ top: `${v}%` }} />
        ))}
        {[25, 50, 75].map(v => (
          <div key={`v${v}`} className="absolute h-full border-l border-slate-800/30" style={{ left: `${v}%` }} />
        ))}

        {/* Connection lines to top-k */}
        <svg className="absolute inset-0 w-full h-full">
          {points.map(p => (
            highlighted.has(p.id) && (
              <motion.line
                key={`line-${p.id}`}
                x1={`${queryPoint.x}%`}
                y1={`${queryPoint.y}%`}
                x2={`${p.x}%`}
                y2={`${p.y}%`}
                stroke="rgba(217,70,239,0.4)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                animate={{ opacity: phase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
            )
          ))}
        </svg>

        {/* Document points */}
        {points.map(p => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
            animate={{
              scale: highlighted.has(p.id) && phase >= 1 ? 1.3 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                backgroundColor: highlighted.has(p.id) && phase >= 1
                  ? 'rgba(217,70,239,0.7)'
                  : 'rgba(100,116,139,0.5)',
                boxShadow: highlighted.has(p.id) && phase >= 1
                  ? '0 0 12px rgba(217,70,239,0.6)'
                  : '0 0 0px transparent',
              }}
              transition={{ duration: 0.4 }}
              className="w-2.5 h-2.5 rounded-full border border-slate-600/50"
            />
            {highlighted.has(p.id) && phase >= 2 && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-3 top-0 text-[9px] text-fuchsia-300 font-mono whitespace-nowrap"
              >
                {p.label} ({p.dist.toFixed(2)})
              </motion.span>
            )}
          </motion.div>
        ))}

        {/* Query vector point */}
        <div
          className="absolute"
          style={{ left: `${queryPoint.x}%`, top: `${queryPoint.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <motion.div
            animate={{
              boxShadow: ['0 0 8px rgba(250,204,21,0.6)', '0 0 20px rgba(250,204,21,0.9)', '0 0 8px rgba(250,204,21,0.6)'],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-4 h-4 rounded-full bg-yellow-400/80 border-2 border-yellow-300 flex items-center justify-center"
          >
            <span className="text-[8px] font-bold text-yellow-900">Q</span>
          </motion.div>
          <span className="absolute left-4 top-0 text-[9px] text-yellow-300 font-mono whitespace-nowrap">
            {tx('consulta', 'query')}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 text-[10px] border-t border-slate-800 pt-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
          <span className="text-yellow-300">{tx('Vector consulta', 'Query vector')}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500/70 inline-block" />
          <span className="text-fuchsia-300">{tx('Top-3 vecinos', 'Top-3 neighbors')}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-500/50 inline-block" />
          <span className="text-slate-400">{tx('Otros docs', 'Other docs')}</span>
        </span>
      </div>
    </div>
  );
};

// ─── Agent Loop Diagram ──────────────────────────────────────────────────────

const AgentLoopDiagram = ({ tx }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: 'Thought', detail: tx('Razono sobre el objetivo', 'Reasoning about goal'), color: 'border-purple-500/60 text-purple-300 bg-purple-500/15', glow: 'rgba(168,85,247,0.5)' },
    { label: 'Action', detail: tx('Elijo una herramienta', 'Choose a tool'), color: 'border-fuchsia-500/60 text-fuchsia-300 bg-fuchsia-500/15', glow: 'rgba(217,70,239,0.5)' },
    { label: 'Tool Call', detail: 'search("climate")', color: 'border-purple-400/60 text-purple-200 bg-purple-400/15', glow: 'rgba(192,132,252,0.5)' },
    { label: 'Observation', detail: tx('Resultado de la herramienta', 'Tool result'), color: 'border-fuchsia-400/60 text-fuchsia-200 bg-fuchsia-400/15', glow: 'rgba(232,121,249,0.5)' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-fuchsia-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-fuchsia-300 uppercase tracking-wider">
        {tx('Bucle ReAct del agente', 'Agent ReAct Loop')}
      </p>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <motion.div
              animate={{
                boxShadow: activeStep === i ? `0 0 22px ${step.glow}` : '0 0 0px transparent',
                scale: activeStep === i ? 1.08 : 1,
                opacity: activeStep === i ? 1 : 0.4,
              }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col items-center border rounded-xl px-3 py-2.5 text-center min-w-[80px] ${step.color}`}
            >
              <span className="font-bold text-xs">{step.label}</span>
              <span className="text-[10px] text-slate-400 mt-0.5 leading-tight text-center">{step.detail}</span>
            </motion.div>
            {i < steps.length - 1 ? (
              <motion.span
                animate={{ opacity: activeStep > i ? 0.9 : 0.2 }}
                className="text-fuchsia-500/70 text-lg font-bold"
              >
                →
              </motion.span>
            ) : (
              <motion.span
                animate={{ opacity: activeStep === steps.length - 1 ? 0.9 : 0.2 }}
                className="text-purple-500/60 text-xs font-mono"
              >
                ↩ loop
              </motion.span>
            )}
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={activeStep}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
          className="text-center text-xs text-fuchsia-400 h-4"
        >
          {[
            tx('El agente decide qué necesita hacer a continuación', 'Agent decides what it needs to do next'),
            tx('Selecciona la herramienta y construye los argumentos', 'Selects tool and constructs arguments'),
            tx('Invoca la herramienta y espera el resultado', 'Invokes the tool and waits for result'),
            tx('Procesa el resultado e itera hasta completar el objetivo', 'Processes result and iterates until goal is complete'),
          ][activeStep]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── LLM Patterns Diagram ────────────────────────────────────────────────────

const LLMPatternsDiagram = ({ tx }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const patterns = [
    {
      name: 'Router',
      desc: tx('Enruta la consulta al modelo o agente especializado', 'Routes query to the specialized model or agent'),
      steps: [tx('Entrada', 'Input'), tx('Clasificador', 'Classifier'), tx('Agente A / B', 'Agent A / B')],
      color: 'border-fuchsia-500/60 text-fuchsia-300 bg-fuchsia-500/15',
      glow: 'rgba(217,70,239,0.4)',
    },
    {
      name: tx('Paralelización', 'Parallelization'),
      desc: tx('Divide la tarea y ejecuta subtareas en paralelo', 'Splits task and runs subtasks in parallel'),
      steps: [tx('Tarea', 'Task'), tx('Split', 'Split'), tx('Merge', 'Merge')],
      color: 'border-purple-500/60 text-purple-300 bg-purple-500/15',
      glow: 'rgba(168,85,247,0.4)',
    },
    {
      name: 'Evaluator-Optimizer',
      desc: tx('Evalúa y refina la salida iterativamente', 'Evaluates and refines output iteratively'),
      steps: [tx('Generador', 'Generator'), tx('Evaluador', 'Evaluator'), tx('Refinar', 'Refine')],
      color: 'border-fuchsia-400/60 text-fuchsia-200 bg-fuchsia-400/15',
      glow: 'rgba(232,121,249,0.4)',
    },
    {
      name: 'Fallback',
      desc: tx('Modelo barato primero, costoso si falla', 'Cheap model first, expensive if it fails'),
      steps: ['Haiku', tx('¿OK?', 'OK?'), 'Opus'],
      color: 'border-purple-400/60 text-purple-200 bg-purple-400/15',
      glow: 'rgba(192,132,252,0.4)',
    },
  ];

  useEffect(() => {
    const id = setInterval(() => setActiveIdx(i => (i + 1) % patterns.length), 2000);
    return () => clearInterval(id);
  }, []);

  const active = patterns[activeIdx];

  return (
    <div className="bg-slate-950/40 border border-fuchsia-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-fuchsia-300 uppercase tracking-wider">
        {tx('Patrones de diseño LLM', 'LLM Design Patterns')}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {patterns.map((p, i) => (
          <motion.button
            key={p.name}
            onClick={() => setActiveIdx(i)}
            animate={{
              boxShadow: activeIdx === i ? `0 0 14px ${p.glow}` : '0 0 0px transparent',
            }}
            transition={{ duration: 0.3 }}
            className={`px-2 py-1.5 border rounded-lg text-[11px] font-bold transition-all ${p.color} ${activeIdx === i ? 'opacity-100' : 'opacity-35'}`}
          >
            {p.name}
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          className="space-y-2"
        >
          <p className={`text-xs text-center ${active.color.split(' ')[1]}`}>{active.desc}</p>
          <div className="flex items-center justify-center gap-2">
            {active.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`px-2.5 py-1.5 border rounded-lg text-xs font-mono font-semibold ${active.color}`}>
                  {step}
                </div>
                {i < active.steps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-fuchsia-500/50 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Section: Fundamentals ───────────────────────────────────────────────────

const renderFundamentals = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Fundamentos de LLMs', 'LLM Fundamentals')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Tokens, context window, temperature, familias de modelos y cómo funcionan los transformers.',
          'Tokens, context window, temperature, model families, and how transformers work.'
        )}
      </p>
    </div>

    <LLMArchDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Tokens & Context Window', 'Tokens & Context Window'),
          color: 'border-fuchsia-500/30 text-fuchsia-300',
          points: [
            tx('Un token ≈ 4 chars en inglés — "hello" = 1 token, "tokenization" = 3 tokens', 'A token ≈ 4 chars in English — "hello" = 1 token, "tokenization" = 3 tokens'),
            tx('Context window = máximo de tokens de entrada + salida procesados a la vez', 'Context window = maximum input + output tokens processed at once'),
            tx('Claude 3.5 Sonnet: 200k tokens (~150k palabras) de contexto', 'Claude 3.5 Sonnet: 200k tokens (~150k words) of context'),
            tx('KV cache almacena activaciones de tokens previos para velocidad', 'KV cache stores activations of previous tokens for speed'),
          ],
        },
        {
          title: tx('Temperature & Sampling', 'Temperature & Sampling'),
          color: 'border-purple-500/30 text-purple-300',
          points: [
            tx('temperature=0: determinista — siempre el token más probable', 'temperature=0: deterministic — always the most probable token'),
            tx('temperature=1: distribución original del modelo (default)', 'temperature=1: model\'s original distribution (default)'),
            tx('temperature>1: más creativo/aleatorio — mayor diversidad', 'temperature>1: more creative/random — higher diversity'),
            tx('top_p (nucleus sampling): limita al conjunto mínimo de tokens que suman p', 'top_p (nucleus sampling): limits to minimum token set summing to p'),
          ],
        },
        {
          title: tx('System Prompts', 'System Prompts'),
          color: 'border-fuchsia-400/30 text-fuchsia-200',
          points: [
            tx('Define el rol, personalidad y restricciones del modelo', 'Defines the model\'s role, personality and constraints'),
            tx('Se procesa antes que los mensajes de usuario', 'Processed before user messages'),
            tx('Anthropic recomienda instrucciones claras y específicas', 'Anthropic recommends clear and specific instructions'),
            tx('Con prompt caching: ahorra hasta 90% en tokens de entrada', 'With prompt caching: saves up to 90% on input tokens'),
          ],
        },
        {
          title: tx('Familias de modelos', 'Model Families'),
          color: 'border-purple-400/30 text-purple-200',
          points: [
            tx('GPT-4o (OpenAI): multimodal, 128k context, function calling', 'GPT-4o (OpenAI): multimodal, 128k context, function calling'),
            tx('Claude 3.5 Sonnet (Anthropic): 200k context, tool use nativo', 'Claude 3.5 Sonnet (Anthropic): 200k context, native tool use'),
            tx('Gemini 1.5 Pro (Google): 1M context, multimodal nativo', 'Gemini 1.5 Pro (Google): 1M context, native multimodal'),
            tx('Llama 3.1 (Meta): open-source, 405B parámetros, self-host', 'Llama 3.1 (Meta): open-source, 405B parameters, self-host'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <Brain className={`w-4 h-4 ${color.split(' ')[1]}`} />
            <h3 className={`font-bold text-sm ${color.split(' ')[1]}`}>{title}</h3>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-fuchsia-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ── Basic streaming call with Anthropic SDK ───────────────────
async function streamCompletion(userMessage: string): Promise<string> {
  let fullText = '';

  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: \`You are a helpful assistant that provides clear,
concise answers. Always cite your reasoning.\`,
    messages: [
      {
        role: 'user',
        content: userMessage,
      },
    ],
  });

  // Process stream events
  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      fullText += event.delta.text;
      process.stdout.write(event.delta.text);
    }
  }

  // Get final message with usage stats
  const finalMessage = await stream.finalMessage();
  console.log('\\nUsage:', {
    inputTokens: finalMessage.usage.input_tokens,
    outputTokens: finalMessage.usage.output_tokens,
    stopReason: finalMessage.stop_reason,
  });

  return fullText;
}

// ── Non-streaming with temperature control ────────────────────
async function generateWithOptions(
  prompt: string,
  temperature = 0.7,
  maxTokens = 512
): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: maxTokens,
    // Note: Anthropic doesn't expose temperature in messages API
    // Use top_p and top_k for sampling control instead
    top_p: temperature > 0.5 ? 0.95 : 0.5,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = response.content[0];
  if (content.type !== 'text') {
    throw new Error(\`Unexpected content type: \${content.type}\`);
  }
  return content.text;
}

// Usage
const answer = await streamCompletion(
  'Explain how transformer attention works in 3 sentences.'
);`} />
  </div>
);

// ─── Section: Prompt Engineering ─────────────────────────────────────────────

const renderPrompting = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Prompt Engineering', 'Prompt Engineering')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Zero-shot, few-shot, cadena de pensamiento (CoT) y el patrón ReAct para maximizar la calidad de las respuestas.',
          'Zero-shot, few-shot, chain-of-thought (CoT) and the ReAct pattern to maximize response quality.'
        )}
      </p>
    </div>

    <PromptTechniquesDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Zero-shot Prompting', 'Zero-shot Prompting'),
          color: 'border-fuchsia-500/30 text-fuchsia-300',
          points: [
            tx('Solo instrucción, sin ejemplos — el modelo usa conocimiento preentrenado', 'Just instruction, no examples — model uses pretraining knowledge'),
            tx('Funciona bien para tareas de clasificación, traducción, resumen simples', 'Works well for classification, translation, simple summarization'),
            tx('Añadir "think carefully before answering" mejora resultados', 'Adding "think carefully before answering" improves results'),
            tx('Especifica el formato de salida deseado explícitamente', 'Specify the desired output format explicitly'),
          ],
        },
        {
          title: tx('Few-shot con ejemplos', 'Few-shot with Examples'),
          color: 'border-purple-500/30 text-purple-300',
          points: [
            tx('2-5 pares entrada/salida establecen el patrón esperado', '2-5 input/output pairs establish the expected pattern'),
            tx('Elige ejemplos representativos y diversos', 'Choose representative and diverse examples'),
            tx('El orden de los ejemplos importa — mejor al final del contexto', 'Order of examples matters — best near end of context'),
            tx('Formato consistente entre ejemplos reduce errores de parsing', 'Consistent format across examples reduces parsing errors'),
          ],
        },
        {
          title: tx('Chain-of-Thought (CoT)', 'Chain-of-Thought (CoT)'),
          color: 'border-fuchsia-400/30 text-fuchsia-200',
          points: [
            tx('"Think step by step" mejora razonamiento matemático y lógico', '"Think step by step" improves mathematical and logical reasoning'),
            tx('CoT con ejemplos (few-shot CoT) es más efectivo que zero-shot CoT', 'CoT with examples (few-shot CoT) is more effective than zero-shot CoT'),
            tx('Self-consistency: genera múltiples razonamientos y vota la respuesta final', 'Self-consistency: generate multiple reasoning paths and vote on final answer'),
            tx('Extended thinking (Claude): tokens ocultos de razonamiento interno', 'Extended thinking (Claude): hidden internal reasoning tokens'),
          ],
        },
        {
          title: tx('Roles: System / User / Assistant', 'System / User / Assistant Roles'),
          color: 'border-purple-400/30 text-purple-200',
          points: [
            tx('system: define identidad, conocimiento y restricciones del modelo', 'system: defines model identity, knowledge and constraints'),
            tx('user: mensajes del humano — preguntas, instrucciones, contexto', 'user: human messages — questions, instructions, context'),
            tx('assistant: respuestas generadas — pre-fill fuerza un inicio concreto', 'assistant: generated responses — pre-fill forces a concrete start'),
            tx('Conversaciones multi-turn: alternar user/assistant mantiene contexto', 'Multi-turn conversations: alternating user/assistant maintains context'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-3">
            <Zap className={`w-4 h-4 ${color.split(' ')[1]}`} />
            <h3 className={`font-bold text-sm ${color.split(' ')[1]}`}>{title}</h3>
          </div>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-fuchsia-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ── Few-shot + Chain-of-Thought prompt ────────────────────────
const COT_SYSTEM_PROMPT = \`You are an expert code reviewer. When asked
to review code, always:
1. Identify the specific issues (bugs, security, performance)
2. Explain WHY each issue is problematic
3. Provide corrected code with inline comments
4. Rate severity: CRITICAL | HIGH | MEDIUM | LOW

Return your analysis as structured JSON.\`;

const FEW_SHOT_EXAMPLES = [
  {
    role: 'user' as const,
    content: \`Review this code:
\\\`\\\`\\\`python
def get_user(id):
    query = "SELECT * FROM users WHERE id = " + str(id)
    return db.execute(query)
\\\`\\\`\\\`\`,
  },
  {
    role: 'assistant' as const,
    content: JSON.stringify({
      issues: [
        {
          type: 'SQL_INJECTION',
          severity: 'CRITICAL',
          line: 2,
          description: 'String concatenation allows SQL injection attacks. An attacker can pass id=\\\"1; DROP TABLE users;\\\" to destroy the database.',
          fix: 'Use parameterized queries: db.execute("SELECT * FROM users WHERE id = ?", [id])',
        },
      ],
      overall_severity: 'CRITICAL',
      safe_version: \`def get_user(user_id: int):
    query = "SELECT * FROM users WHERE id = ?"
    return db.execute(query, [user_id])\`,
    }, null, 2),
  },
];

async function reviewCode(code: string): Promise<object> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 2048,
    system: COT_SYSTEM_PROMPT,
    messages: [
      ...FEW_SHOT_EXAMPLES,
      {
        role: 'user',
        content: \`Review this code:\\n\\\`\\\`\\\`typescript\\n\${code}\\n\\\`\\\`\\\`\`,
      },
    ],
  });

  const text = response.content[0].type === 'text'
    ? response.content[0].text
    : '';

  // Parse structured JSON from CoT response
  const jsonMatch = text.match(/\\\{[\\s\\S]*\\\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  return JSON.parse(jsonMatch[0]);
}

// ── Extended thinking (Claude) — deep reasoning ───────────────
async function solveWithThinking(problem: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 16000,
    thinking: {
      type: 'enabled',
      budget_tokens: 10000,  // Allow up to 10k tokens of internal reasoning
    },
    messages: [{ role: 'user', content: problem }],
  });

  // Extract thinking blocks and final answer
  const thinkingBlocks = response.content.filter(b => b.type === 'thinking');
  const textBlocks = response.content.filter(b => b.type === 'text');

  console.log(\`Reasoning tokens used: \${thinkingBlocks.length > 0 ? 'yes' : 'no'}\`);
  return textBlocks.map(b => b.type === 'text' ? b.text : '').join('');
}

const review = await reviewCode(\`
async function fetchUserData(userId: string) {
  const res = await fetch('/api/users/' + userId);
  return res.json();
}\`);

console.log(JSON.stringify(review, null, 2));`} />
  </div>
);

// ─── Section: RAG ─────────────────────────────────────────────────────────────

const renderRAG = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('RAG — Retrieval Augmented Generation', 'RAG — Retrieval Augmented Generation')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Reduce alucinaciones conectando el LLM a conocimiento externo actualizado via búsqueda vectorial.',
          'Reduce hallucinations by connecting the LLM to updated external knowledge via vector search.'
        )}
      </p>
    </div>

    <RAGPipelineDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('¿Por qué RAG?', 'Why RAG?'),
          color: 'border-fuchsia-500/30 text-fuchsia-300',
          points: [
            tx('Los LLMs tienen conocimiento estático (corte de entrenamiento)', 'LLMs have static knowledge (training cutoff)'),
            tx('RAG proporciona hechos verificables reduciendo alucinaciones', 'RAG provides verifiable facts reducing hallucinations'),
            tx('Más barato que fine-tuning para actualizar conocimiento', 'Cheaper than fine-tuning for updating knowledge'),
            tx('Permite citar las fuentes de información usadas', 'Allows citing the information sources used'),
          ],
        },
        {
          title: tx('Estrategias de chunking', 'Chunking Strategies'),
          color: 'border-purple-500/30 text-purple-300',
          points: [
            tx('Fixed-size: 512 tokens con 20% overlap — sencillo pero ignora estructura', 'Fixed-size: 512 tokens with 20% overlap — simple but ignores structure'),
            tx('Sentence/paragraph: respeta límites naturales del texto', 'Sentence/paragraph: respects natural text boundaries'),
            tx('Semantic chunking: agrupa frases por similitud de embeddings', 'Semantic chunking: groups sentences by embedding similarity'),
            tx('Hierarchical: chunks + resúmenes a distintos niveles para summary + detail', 'Hierarchical: chunks + summaries at different levels for summary + detail'),
          ],
        },
        {
          title: tx('Modelos de embeddings', 'Embedding Models'),
          color: 'border-fuchsia-400/30 text-fuchsia-200',
          points: [
            tx('text-embedding-3-large (OpenAI): 3072 dims, state-of-the-art', 'text-embedding-3-large (OpenAI): 3072 dims, state-of-the-art'),
            tx('voyage-3 (Anthropic/Voyage): optimizado para RAG con Claude', 'voyage-3 (Anthropic/Voyage): optimized for RAG with Claude'),
            tx('BGE-M3 (BAAI): multilingüe open-source, alto rendimiento', 'BGE-M3 (BAAI): multilingual open-source, high performance'),
            tx('Consistencia de modelo: usar el mismo para indexar y consultar', 'Model consistency: use same model for indexing and querying'),
          ],
        },
        {
          title: tx('Reranking', 'Reranking'),
          color: 'border-purple-400/30 text-purple-200',
          points: [
            tx('Rerank: segunda pasada que reordena los k resultados por relevancia', 'Rerank: second pass that reorders k results by relevance'),
            tx('Cohere Rerank y voyage-rerank-2 son los más populares', 'Cohere Rerank and voyage-rerank-2 are the most popular'),
            tx('Recupera top-50 con búsqueda vectorial, rerank a top-5', 'Retrieve top-50 with vector search, rerank to top-5'),
            tx('Mejora precision@k significativamente con poco overhead', 'Significantly improves precision@k with little overhead'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <h3 className={`font-bold text-sm ${color.split(' ')[1]} mb-3`}>{title}</h3>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-fuchsia-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`import Anthropic from '@anthropic-ai/sdk';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';

const anthropic = new Anthropic();
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

// ── Step 1: Ingest documents into vector store ────────────────
async function ingestDocuments(docs: Array<{ content: string; metadata: object }>) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 64,
    separators: ['\\n\\n', '\\n', '. ', ' '],
  });

  const chunks = await splitter.createDocuments(
    docs.map(d => d.content),
    docs.map(d => d.metadata)
  );

  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-large',
    dimensions: 1536,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX!);
  await PineconeStore.fromDocuments(chunks, embeddings, {
    pineconeIndex: index,
    namespace: 'production',
  });

  console.log(\`Indexed \${chunks.length} chunks\`);
}

// ── Step 2: Retrieve relevant context ─────────────────────────
async function retrieveContext(
  query: string,
  topK = 5
): Promise<Array<{ content: string; score: number; metadata: object }>> {
  const embeddings = new OpenAIEmbeddings({ model: 'text-embedding-3-large', dimensions: 1536 });
  const index = pinecone.Index(process.env.PINECONE_INDEX!);

  const store = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    namespace: 'production',
  });

  const results = await store.similaritySearchWithScore(query, topK, {
    // Metadata filter example
    filter: { category: { $in: ['documentation', 'faq'] } },
  });

  return results
    .filter(([, score]) => score > 0.75)   // minimum relevance threshold
    .map(([doc, score]) => ({
      content: doc.pageContent,
      score,
      metadata: doc.metadata,
    }));
}

// ── Step 3: Generate answer with retrieved context ────────────
async function ragQuery(userQuestion: string): Promise<{
  answer: string;
  sources: object[];
  tokensUsed: number;
}> {
  const contextDocs = await retrieveContext(userQuestion);

  if (contextDocs.length === 0) {
    return {
      answer: "I don't have enough relevant information to answer this question.",
      sources: [],
      tokensUsed: 0,
    };
  }

  const contextText = contextDocs
    .map((doc, i) => \`[Source \${i + 1}] (relevance: \${doc.score.toFixed(2)})\\n\${doc.content}\`)
    .join('\\n\\n---\\n\\n');

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 2048,
    system: \`You are a precise assistant. Answer questions using ONLY the
provided context. If the context doesn't contain enough information,
say so explicitly. Always cite [Source N] when using information.\`,
    messages: [
      {
        role: 'user',
        content: \`Context:\\n\${contextText}\\n\\n---\\n\\nQuestion: \${userQuestion}\`,
      },
    ],
  });

  const answerText = response.content[0].type === 'text'
    ? response.content[0].text
    : '';

  return {
    answer: answerText,
    sources: contextDocs.map(d => d.metadata),
    tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
  };
}

// Usage
const result = await ragQuery('What is the refund policy for enterprise plans?');
console.log(result.answer);
console.log('Sources:', result.sources);
console.log('Tokens used:', result.tokensUsed);`} />
  </div>
);

// ─── Section: Vector Databases ───────────────────────────────────────────────

const renderVectorDB = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Bases de datos vectoriales', 'Vector Databases')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Pinecone, pgvector y Weaviate — indexación HNSW, similitud coseno y filtrado por metadatos.',
          'Pinecone, pgvector and Weaviate — HNSW indexing, cosine similarity and metadata filtering.'
        )}
      </p>
    </div>

    <VectorSearchDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Similitud coseno', 'Cosine Similarity'),
          color: 'border-fuchsia-500/30 text-fuchsia-300',
          points: [
            tx('cos(θ) = (A·B) / (|A|·|B|) — mide el ángulo entre dos vectores', 'cos(θ) = (A·B) / (|A|·|B|) — measures angle between two vectors'),
            tx('1 = idéntico, 0 = ortogonal, -1 = opuesto', '1 = identical, 0 = orthogonal, -1 = opposite'),
            tx('Normalizar vectores primero: dot product = cosine similarity', 'Normalize vectors first: dot product = cosine similarity'),
            tx('Invariante a la magnitud — ideal para texto de distinta longitud', 'Magnitude invariant — ideal for text of different lengths'),
          ],
        },
        {
          title: 'Pinecone vs pgvector vs Weaviate',
          color: 'border-purple-500/30 text-purple-300',
          points: [
            tx('Pinecone: serverless, managed, 10B+ vectores, alta escalabilidad', 'Pinecone: serverless, managed, 10B+ vectors, high scalability'),
            tx('pgvector: extensión PostgreSQL, ideal si ya tienes Postgres', 'pgvector: PostgreSQL extension, ideal if you already have Postgres'),
            tx('Weaviate: open-source, grafos de conocimiento, vectores + objetos', 'Weaviate: open-source, knowledge graphs, vectors + objects'),
            tx('Qdrant: open-source Rust, filtrado eficiente por payload', 'Qdrant: open-source Rust, efficient payload filtering'),
          ],
        },
        {
          title: tx('Indexación: HNSW vs IVF', 'Indexing: HNSW vs IVF'),
          color: 'border-fuchsia-400/30 text-fuchsia-200',
          points: [
            tx('HNSW: grafo jerárquico — O(log n) query, alta precisión, más RAM', 'HNSW: hierarchical graph — O(log n) query, high precision, more RAM'),
            tx('IVF: clusters Voronoi — más rápido en disco, menos RAM, algo menos preciso', 'IVF: Voronoi clusters — faster on disk, less RAM, slightly less precise'),
            tx('HNSW recomendado para < 100M vectores en RAM', 'HNSW recommended for < 100M vectors in RAM'),
            tx('ef_construction, M controlan precision/speed trade-off en HNSW', 'ef_construction, M control precision/speed trade-off in HNSW'),
          ],
        },
        {
          title: tx('Filtrado por metadatos', 'Metadata Filtering'),
          color: 'border-purple-400/30 text-purple-200',
          points: [
            tx('Pre-filtering: aplica filtro antes de búsqueda vectorial (más rápido)', 'Pre-filtering: apply filter before vector search (faster)'),
            tx('Post-filtering: busca vectorialmente y luego filtra (más preciso)', 'Post-filtering: vector search then filter (more precise)'),
            tx('Ejemplo: { category: "docs", lang: "en", year: { $gte: 2024 } }', 'Example: { category: "docs", lang: "en", year: { $gte: 2024 } }'),
            tx('Índices en metadatos clave mejoran drásticamente el rendimiento', 'Indexes on key metadata dramatically improve performance'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <h3 className={`font-bold text-sm ${color.split(' ')[1]} mb-3`}>{title}</h3>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-fuchsia-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Comparison table */}
    <div className="bg-slate-950/40 border border-fuchsia-500/20 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-800">
        <p className="text-xs font-semibold text-fuchsia-300 uppercase tracking-wider">
          {tx('Comparación de bases de datos vectoriales', 'Vector Database Comparison')}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-950/70">
            <tr>
              <th className="px-4 py-2.5 text-left text-slate-400 font-semibold">{tx('Criterio', 'Criterion')}</th>
              <th className="px-4 py-2.5 text-left text-fuchsia-300 font-semibold">Pinecone</th>
              <th className="px-4 py-2.5 text-left text-purple-300 font-semibold">pgvector</th>
              <th className="px-4 py-2.5 text-left text-fuchsia-200 font-semibold">Weaviate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {[
              { label: tx('Hosting', 'Hosting'), pi: 'Managed SaaS', pg: 'Self-host / RDS', we: 'Self-host / Cloud' },
              { label: tx('Escalabilidad', 'Scalability'), pi: tx('Muy alta (serverless)', 'Very high (serverless)'), pg: tx('Limitada por Postgres', 'Limited by Postgres'), we: tx('Alta (clusters)', 'High (clusters)') },
              { label: tx('Filtrado', 'Filtering'), pi: 'JSON metadata', pg: 'SQL WHERE', we: 'GraphQL filters' },
              { label: tx('Precio', 'Pricing'), pi: tx('Por uso', 'Pay-per-use'), pg: tx('Infraestructura', 'Infrastructure'), we: tx('Open-source / Enterprise', 'Open-source / Enterprise') },
              { label: tx('Mejor para', 'Best for'), pi: tx('Producción escalada', 'Scaled production'), pg: tx('Apps Postgres existentes', 'Existing Postgres apps'), we: tx('Grafos + vectores', 'Graphs + vectors') },
            ].map(row => (
              <tr key={row.label} className="hover:bg-slate-800/20">
                <td className="px-4 py-2.5 text-slate-300 font-medium">{row.label}</td>
                <td className="px-4 py-2.5 text-slate-400">{row.pi}</td>
                <td className="px-4 py-2.5 text-slate-400">{row.pg}</td>
                <td className="px-4 py-2.5 text-slate-400">{row.we}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <CodeBlock language="typescript" code={`import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const openai = new OpenAI();
const index = pinecone.Index('knowledge-base');

// ── Generate embeddings ───────────────────────────────────────
async function embed(texts: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-large',
    input: texts,
    dimensions: 1536,
  });
  return response.data.map(d => d.embedding);
}

// ── Upsert vectors with metadata ──────────────────────────────
async function upsertDocuments(
  documents: Array<{ id: string; text: string; metadata: Record<string, unknown> }>
): Promise<void> {
  const BATCH_SIZE = 100;

  for (let i = 0; i < documents.length; i += BATCH_SIZE) {
    const batch = documents.slice(i, i + BATCH_SIZE);
    const texts = batch.map(d => d.text);
    const embeddings = await embed(texts);

    const vectors = batch.map((doc, j) => ({
      id: doc.id,
      values: embeddings[j],
      metadata: {
        ...doc.metadata,
        text: doc.text.slice(0, 1000),  // Pinecone metadata limit
        indexed_at: new Date().toISOString(),
      },
    }));

    await index.namespace('production').upsert(vectors);
    console.log(\`Upserted batch \${Math.floor(i / BATCH_SIZE) + 1}\`);
  }
}

// ── Query with metadata filter ────────────────────────────────
async function semanticSearch(
  query: string,
  options: {
    topK?: number;
    namespace?: string;
    filter?: Record<string, unknown>;
    minScore?: number;
  } = {}
): Promise<Array<{ id: string; score: number; metadata: Record<string, unknown> }>> {
  const { topK = 10, namespace = 'production', filter, minScore = 0.7 } = options;

  const [queryEmbedding] = await embed([query]);

  const results = await index.namespace(namespace).query({
    vector: queryEmbedding,
    topK,
    filter,
    includeMetadata: true,
    includeValues: false,
  });

  return (results.matches ?? [])
    .filter(m => (m.score ?? 0) >= minScore)
    .map(m => ({
      id: m.id,
      score: m.score ?? 0,
      metadata: (m.metadata ?? {}) as Record<string, unknown>,
    }));
}

// ── Delete by ID or metadata filter ──────────────────────────
async function deleteDocuments(ids: string[]): Promise<void> {
  await index.namespace('production').deleteMany(ids);
}

async function deleteByFilter(filter: Record<string, unknown>): Promise<void> {
  // Fetch IDs matching filter first, then delete
  const results = await semanticSearch('', { filter, topK: 1000, minScore: 0 });
  const ids = results.map(r => r.id);
  if (ids.length > 0) {
    await index.namespace('production').deleteMany(ids);
    console.log(\`Deleted \${ids.length} vectors\`);
  }
}

// Usage
await upsertDocuments([
  {
    id: 'doc-001',
    text: 'Pinecone is a managed vector database for building AI applications.',
    metadata: { category: 'docs', source: 'pinecone.io', lang: 'en', year: 2024 },
  },
]);

const matches = await semanticSearch('vector database for AI', {
  filter: { category: { $in: ['docs', 'tutorials'] }, lang: 'en' },
  topK: 5,
  minScore: 0.75,
});

console.log(matches);`} />
  </div>
);

// ─── Section: Agents ─────────────────────────────────────────────────────────

const renderAgents = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Agentes IA & Tool Use', 'AI Agents & Tool Use')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Anthropic tool use API, function calling, sistemas multi-agente y tipos de memoria.',
          'Anthropic tool use API, function calling, multi-agent systems and memory types.'
        )}
      </p>
    </div>

    <AgentLoopDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Anthropic Tool Use API', 'Anthropic Tool Use API'),
          color: 'border-fuchsia-500/30 text-fuchsia-300',
          points: [
            tx('Define herramientas con nombre, descripción y schema JSON', 'Define tools with name, description and JSON schema'),
            tx('El modelo decide cuándo y cómo llamar cada herramienta', 'Model decides when and how to call each tool'),
            tx('stop_reason: "tool_use" indica que el modelo quiere invocar una tool', 'stop_reason: "tool_use" indicates model wants to invoke a tool'),
            tx('Devuelve ToolResultBlock con el resultado antes de continuar', 'Return ToolResultBlock with result before continuing'),
          ],
        },
        {
          title: 'Function Calling',
          color: 'border-purple-500/30 text-purple-300',
          points: [
            tx('Abstracción sobre tool_use para llamadas a funciones reales', 'Abstraction over tool_use for real function calls'),
            tx('El schema JSON sigue el estándar JSON Schema (type, properties, required)', 'JSON schema follows JSON Schema standard (type, properties, required)'),
            tx('Validar entradas del modelo antes de ejecutar — nunca confiar ciegamente', 'Validate model inputs before executing — never trust blindly'),
            tx('Tool choice: auto | any | none | específica', 'Tool choice: auto | any | none | specific'),
          ],
        },
        {
          title: tx('Sistemas multi-agente', 'Multi-Agent Systems'),
          color: 'border-fuchsia-400/30 text-fuchsia-200',
          points: [
            tx('Orquestador → sub-agentes especializados (paralelo o secuencial)', 'Orchestrator → specialized sub-agents (parallel or sequential)'),
            tx('Cada agente tiene su propia historia de conversación', 'Each agent has its own conversation history'),
            tx('Anthropic recomienda descomponer tareas complejas en sub-agentes', 'Anthropic recommends decomposing complex tasks into sub-agents'),
            tx('Compartir contexto vía herramientas o mensajes explícitos', 'Share context via tools or explicit messages'),
          ],
        },
        {
          title: tx('Tipos de memoria', 'Memory Types'),
          color: 'border-purple-400/30 text-purple-200',
          points: [
            tx('En-contexto: todo el historial de conversación en el context window', 'In-context: full conversation history in context window'),
            tx('Externa: base de datos vectorial o KV store para hechos persistentes', 'External: vector database or KV store for persistent facts'),
            tx('Episódica: resúmenes comprimidos de conversaciones pasadas', 'Episodic: compressed summaries of past conversations'),
            tx('Semántica: grafos de conocimiento con entidades y relaciones', 'Semantic: knowledge graphs with entities and relationships'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <h3 className={`font-bold text-sm ${color.split(' ')[1]} mb-3`}>{title}</h3>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-fuchsia-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// ── Tool definitions ──────────────────────────────────────────
const tools: Anthropic.Tool[] = [
  {
    name: 'get_weather',
    description: 'Get current weather conditions and forecast for a location. Returns temperature, humidity, wind speed and a 3-day forecast.',
    input_schema: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'City name or coordinates (e.g., "San Francisco, CA" or "37.7749,-122.4194")',
        },
        units: {
          type: 'string',
          enum: ['celsius', 'fahrenheit'],
          description: 'Temperature units',
          default: 'celsius',
        },
      },
      required: ['location'],
    },
  },
  {
    name: 'search_web',
    description: 'Search the web for current information. Use for recent events, facts, or any information that may not be in training data.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query',
        },
        num_results: {
          type: 'number',
          description: 'Number of results to return (1-10)',
          default: 5,
        },
      },
      required: ['query'],
    },
  },
];

// ── Tool implementations ──────────────────────────────────────
async function executeWeather(input: { location: string; units?: string }): Promise<object> {
  // In production: call a real weather API (e.g., OpenWeatherMap)
  return {
    location: input.location,
    temperature: 22,
    units: input.units ?? 'celsius',
    humidity: 65,
    wind_speed_kmh: 15,
    condition: 'Partly cloudy',
    forecast: [
      { day: 'Tomorrow', high: 24, low: 18, condition: 'Sunny' },
      { day: 'Day 2', high: 19, low: 14, condition: 'Rain' },
      { day: 'Day 3', high: 21, low: 16, condition: 'Cloudy' },
    ],
  };
}

async function executeSearch(input: { query: string; num_results?: number }): Promise<object> {
  // In production: call a real search API (e.g., Brave, Serper, Tavily)
  return {
    results: [
      { title: 'Result 1', url: 'https://example.com/1', snippet: 'Relevant snippet...' },
    ],
    query: input.query,
    total_results: 1000000,
  };
}

// ── Agentic loop ──────────────────────────────────────────────
async function runAgent(userMessage: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userMessage },
  ];

  const MAX_ITERATIONS = 10;
  let iteration = 0;

  while (iteration < MAX_ITERATIONS) {
    iteration++;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      tools,
      tool_choice: { type: 'auto' },
      system: \`You are a helpful assistant with access to weather and web search tools.
Use tools when you need current information. Be concise and accurate.\`,
      messages,
    });

    // Add assistant response to history
    messages.push({ role: 'assistant', content: response.content });

    // If no tool use, we have the final answer
    if (response.stop_reason === 'end_turn') {
      const textBlock = response.content.find(b => b.type === 'text');
      return textBlock?.type === 'text' ? textBlock.text : '';
    }

    // Process all tool calls in this response
    if (response.stop_reason === 'tool_use') {
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of response.content) {
        if (block.type !== 'tool_use') continue;

        let toolResult: object;
        try {
          if (block.name === 'get_weather') {
            toolResult = await executeWeather(block.input as { location: string; units?: string });
          } else if (block.name === 'search_web') {
            toolResult = await executeSearch(block.input as { query: string; num_results?: number });
          } else {
            toolResult = { error: \`Unknown tool: \${block.name}\` };
          }
        } catch (err) {
          toolResult = { error: \`Tool execution failed: \${(err as Error).message}\` };
        }

        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: JSON.stringify(toolResult),
        });
      }

      // Return tool results to the model
      messages.push({ role: 'user', content: toolResults });
    }
  }

  throw new Error('Max iterations reached without a final answer');
}

// Usage
const answer = await runAgent(
  "What's the weather in Tokyo right now, and are there any major news events there today?"
);
console.log(answer);`} />
  </div>
);

// ─── Section: Patterns ───────────────────────────────────────────────────────

const renderPatterns = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
        {tx('Patrones de diseño LLM', 'LLM Design Patterns')}
      </h2>
      <p className="text-slate-400 text-sm">
        {tx(
          'Prompt caching, salida estructurada, guardrails y optimización de costes en producción.',
          'Prompt caching, structured output, guardrails and cost optimization in production.'
        )}
      </p>
    </div>

    <LLMPatternsDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        {
          title: tx('Prompt Caching (Anthropic)', 'Prompt Caching (Anthropic)'),
          color: 'border-fuchsia-500/30 text-fuchsia-300',
          points: [
            tx('cache_control: { type: "ephemeral" } marca un bloque para caché', 'cache_control: { type: "ephemeral" } marks a block for caching'),
            tx('Ahorra hasta 90% en tokens de entrada para prompts repetidos', 'Saves up to 90% on input tokens for repeated prompts'),
            tx('El caché dura 5 minutos (reiniciado con cada uso)', 'Cache lasts 5 minutes (reset on each use)'),
            tx('Mínimo 1024 tokens para activar el caché (Claude 3.5)', 'Minimum 1024 tokens to activate cache (Claude 3.5)'),
          ],
        },
        {
          title: tx('Salida estructurada (JSON mode)', 'Structured Output (JSON Mode)'),
          color: 'border-purple-500/30 text-purple-300',
          points: [
            tx('Pre-fill con { fuerza respuesta JSON (técnica de Anthropic)', 'Pre-fill with { forces JSON response (Anthropic technique)'),
            tx('Zod + json-schema-to-zod para validar la respuesta del modelo', 'Zod + json-schema-to-zod to validate model response'),
            tx('Instrucciones claras en system prompt sobre el schema esperado', 'Clear instructions in system prompt about expected schema'),
            tx('Retry con mensaje de error si el JSON no es válido', 'Retry with error message if JSON is invalid'),
          ],
        },
        {
          title: tx('Guardrails & Seguridad', 'Guardrails & Safety'),
          color: 'border-fuchsia-400/30 text-fuchsia-200',
          points: [
            tx('Validación de entrada: detecta prompts maliciosos antes de enviar al LLM', 'Input validation: detect malicious prompts before sending to LLM'),
            tx('Moderación de contenido: filtrar PII, contenido dañino en salidas', 'Content moderation: filter PII, harmful content in outputs'),
            tx('Llama Guard / OpenAI Moderation API para categorización automática', 'Llama Guard / OpenAI Moderation API for automatic categorization'),
            tx('Prompt injection defense: instrucciones del sistema marcadas como irremplazables', 'Prompt injection defense: system instructions marked as non-overridable'),
          ],
        },
        {
          title: tx('Optimización de costes', 'Cost Optimization'),
          color: 'border-purple-400/30 text-purple-200',
          points: [
            tx('Usa el modelo más pequeño que cumple el requisito de calidad', 'Use the smallest model that meets the quality requirement'),
            tx('Haiku para clasificación, Sonnet para razonamiento, Opus para tareas críticas', 'Haiku for classification, Sonnet for reasoning, Opus for critical tasks'),
            tx('Batch API (Anthropic): 50% descuento para tareas no urgentes', 'Batch API (Anthropic): 50% discount for non-urgent tasks'),
            tx('Monitorear token usage con usage.input_tokens + output_tokens', 'Monitor token usage with usage.input_tokens + output_tokens'),
          ],
        },
      ].map(({ title, color, points }) => (
        <div key={title} className={`bg-slate-900/50 border ${color.split(' ')[0]} rounded-xl p-4`}>
          <h3 className={`font-bold text-sm ${color.split(' ')[1]} mb-3`}>{title}</h3>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <span className="text-fuchsia-400 mt-0.5 flex-shrink-0">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';

const client = new Anthropic();

// ── Prompt caching — amortize large system prompts ────────────
const LARGE_KNOWLEDGE_BASE = \`You are an expert software architect.
[... imagine 2000+ tokens of documentation, examples, guidelines ...]\`;

async function cachedAnalysis(userQuestion: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: LARGE_KNOWLEDGE_BASE,
        // Mark this large block for caching
        // On first call: write_tokens charged. Subsequent calls: read_tokens (90% cheaper)
        cache_control: { type: 'ephemeral' },
      },
      {
        type: 'text',
        text: 'Answer concisely based on the knowledge base above.',
      },
    ],
    messages: [{ role: 'user', content: userQuestion }],
  });

  // Check cache status in response headers (x-cache-read-input-tokens)
  const cacheReadTokens = response.usage.cache_read_input_tokens ?? 0;
  const cacheWriteTokens = response.usage.cache_creation_input_tokens ?? 0;
  console.log(\`Cache: read=\${cacheReadTokens}, write=\${cacheWriteTokens}\`);

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// ── Structured JSON output with pre-fill + Zod validation ─────
const CodeReviewSchema = z.object({
  summary: z.string(),
  issues: z.array(z.object({
    line: z.number().optional(),
    severity: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
    category: z.enum(['security', 'performance', 'style', 'logic', 'test']),
    message: z.string(),
    suggestion: z.string(),
  })),
  overall_score: z.number().min(0).max(10),
  approved: z.boolean(),
});

type CodeReview = z.infer<typeof CodeReviewSchema>;

async function structuredCodeReview(code: string): Promise<CodeReview> {
  const MAX_RETRIES = 3;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 2048,
      system: \`You are a code reviewer. Return ONLY valid JSON matching this schema:
{
  "summary": "string",
  "issues": [{ "line": number?, "severity": "CRITICAL|HIGH|MEDIUM|LOW",
    "category": "security|performance|style|logic|test",
    "message": "string", "suggestion": "string" }],
  "overall_score": number (0-10),
  "approved": boolean
}\`,
      messages: [
        {
          role: 'user',
          content: \`Review this code:\\n\\\`\\\`\\\`\\n\${code}\\n\\\`\\\`\\\`\`,
        },
        // Pre-fill forces the model to start with { (ensures JSON output)
        {
          role: 'assistant',
          content: '{',
        },
      ],
    });

    const rawText = '{' + (response.content[0].type === 'text' ? response.content[0].text : '');

    try {
      const parsed = JSON.parse(rawText);
      return CodeReviewSchema.parse(parsed);
    } catch (err) {
      lastError = err as Error;
      // On retry, include the parsing error for self-correction
      if (attempt < MAX_RETRIES - 1) {
        console.warn(\`Parse attempt \${attempt + 1} failed: \${lastError.message}\`);
      }
    }
  }

  throw new Error(\`Failed to parse structured output after \${MAX_RETRIES} attempts: \${lastError?.message}\`);
}

// ── Router pattern — select model based on task complexity ────
async function smartRouter(task: string, content: string): Promise<string> {
  const ROUTING_MAP: Record<string, 'claude-haiku-4-5' | 'claude-sonnet-4-5' | 'claude-opus-4-5'> = {
    classify: 'claude-haiku-4-5',
    summarize: 'claude-haiku-4-5',
    analyze: 'claude-sonnet-4-5',
    architect: 'claude-sonnet-4-5',
    reason: 'claude-opus-4-5',
    research: 'claude-opus-4-5',
  };

  const model = ROUTING_MAP[task] ?? 'claude-sonnet-4-5';
  console.log(\`Routing task "\${task}" to \${model}\`);

  const response = await client.messages.create({
    model,
    max_tokens: task === 'classify' ? 100 : 2048,
    messages: [{ role: 'user', content: \`Task: \${task}\\n\\n\${content}\` }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}

// Usage
const review = await structuredCodeReview(\`
function divide(a, b) {
  return a / b;
}
\`);
console.log(\`Score: \${review.overall_score}/10, Approved: \${review.approved}\`);
console.log(\`Issues: \${review.issues.length}\`);`} />
  </div>
);

// ─── Interview Accordion ─────────────────────────────────────────────────────

const InterviewAccordionAI = ({ tx }) => {
  const [openItems, setOpenItems] = useState({});

  const toggle = (key) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = [
    {
      level: 'Junior',
      color: 'border-fuchsia-600/40 text-fuchsia-400 bg-fuchsia-600/10',
      qs: [
        {
          q: tx('¿Qué es un token en el contexto de los LLMs?', 'What is a token in the context of LLMs?'),
          a: tx(
            'Un token es la unidad básica de texto que procesa un LLM. Aproximadamente equivale a ~4 caracteres en inglés o ~0.75 palabras. Los tokenizadores modernos (BPE, SentencePiece) descomponen texto en subpalabras. "tokenization" puede ser [token, ization] = 2 tokens. Los LLMs tienen un límite llamado context window (ej: Claude 3.5: 200k tokens). El coste de los LLMs se mide en tokens procesados.',
            'A token is the basic unit of text that an LLM processes. It\'s approximately ~4 characters in English or ~0.75 words. Modern tokenizers (BPE, SentencePiece) decompose text into subwords. "tokenization" may be [token, ization] = 2 tokens. LLMs have a limit called context window (e.g. Claude 3.5: 200k tokens). LLM cost is measured in tokens processed.'
          ),
        },
        {
          q: tx('¿Qué es la temperatura en los LLMs?', 'What is temperature in LLMs?'),
          a: tx(
            'La temperatura controla la aleatoriedad de las respuestas. Temperature=0: el modelo siempre elige el token más probable (determinista, reproducible). Temperature=1: distribución original del modelo. Temperature>1: más creativo pero puede volverse incoherente. Para tareas que requieren precisión (código, matemáticas) usa temperature=0. Para creatividad (escritura, brainstorming) usa 0.7-1.0.',
            'Temperature controls the randomness of responses. Temperature=0: model always picks the most probable token (deterministic, reproducible). Temperature=1: model\'s original distribution. Temperature>1: more creative but may become incoherent. For tasks requiring precision (code, math) use temperature=0. For creativity (writing, brainstorming) use 0.7-1.0.'
          ),
        },
        {
          q: tx('¿Qué es RAG y por qué se usa?', 'What is RAG and why is it used?'),
          a: tx(
            'RAG (Retrieval Augmented Generation) conecta un LLM a una base de conocimiento externa para reducir alucinaciones. En lugar de depender solo del conocimiento de entrenamiento (que tiene una fecha de corte), el sistema: (1) convierte la consulta a vector embedding, (2) busca documentos relevantes en una base vectorial, (3) inserta esos documentos en el prompt del LLM, (4) el modelo genera respuestas fundamentadas en hechos verificables.',
            'RAG (Retrieval Augmented Generation) connects an LLM to an external knowledge base to reduce hallucinations. Instead of relying only on training knowledge (which has a cutoff date), the system: (1) converts the query to a vector embedding, (2) searches for relevant documents in a vector database, (3) inserts those documents into the LLM prompt, (4) the model generates answers grounded in verifiable facts.'
          ),
        },
        {
          q: tx('¿Qué es el fine-tuning vs. prompting?', 'What is fine-tuning vs. prompting?'),
          a: tx(
            'El prompting guía al modelo con instrucciones sin modificar sus pesos. El fine-tuning ajusta los pesos del modelo con ejemplos específicos del dominio. Cuándo usar prompting: tareas generales, prototipado rápido, cuando el modelo base ya es capaz. Cuándo usar fine-tuning: adaptar estilo/tono específico, dominio muy especializado, reducir costes en producción con modelos más pequeños, cuando el prompting no da resultados satisfactorios.',
            'Prompting guides the model with instructions without modifying its weights. Fine-tuning adjusts the model weights with domain-specific examples. When to use prompting: general tasks, rapid prototyping, when the base model is already capable. When to use fine-tuning: adapt specific style/tone, highly specialized domain, reduce production costs with smaller models, when prompting doesn\'t give satisfactory results.'
          ),
        },
        {
          q: tx('¿Qué son los embeddings?', 'What are embeddings?'),
          a: tx(
            'Los embeddings son representaciones numéricas densas (vectores) de texto que capturan su significado semántico. Textos con significado similar tienen vectores cercanos en el espacio. Por ejemplo, "rey" - "hombre" + "mujer" ≈ "reina" en el espacio de embeddings. Los modelos de embeddings (text-embedding-3-large, voyage-3) transforman texto en vectores de alta dimensión (1536-3072 dims) optimizados para búsqueda semántica.',
            'Embeddings are dense numerical representations (vectors) of text that capture semantic meaning. Texts with similar meaning have close vectors in space. For example, "king" - "man" + "woman" ≈ "queen" in the embedding space. Embedding models (text-embedding-3-large, voyage-3) transform text into high-dimensional vectors (1536-3072 dims) optimized for semantic search.'
          ),
        },
      ],
    },
    {
      level: 'Mid',
      color: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
      qs: [
        {
          q: tx('¿Cómo diseñarías un pipeline RAG en producción?', 'How would you design a RAG pipeline for production?'),
          a: tx(
            'Pipeline completo: (1) Ingesta: chunking semántico (512 tokens, 20% overlap), embed con text-embedding-3-large, upsert en Pinecone con metadatos estructurados. (2) Retrieval: embed query, búsqueda vectorial top-50, reranking (Cohere/Voyage) a top-5, filtro por score mínimo 0.75. (3) Generación: construir prompt con contexto + query, usar prompt caching para el system prompt, devolver respuesta con fuentes citadas. Métricas: faithfulness, answer_relevancy, context_precision via RAGAS.',
            'Complete pipeline: (1) Ingestion: semantic chunking (512 tokens, 20% overlap), embed with text-embedding-3-large, upsert to Pinecone with structured metadata. (2) Retrieval: embed query, top-50 vector search, reranking (Cohere/Voyage) to top-5, filter by minimum score 0.75. (3) Generation: build prompt with context + query, use prompt caching for system prompt, return response with cited sources. Metrics: faithfulness, answer_relevancy, context_precision via RAGAS.'
          ),
        },
        {
          q: tx('¿Cómo funciona el mecanismo de atención en los Transformers?', 'How does the attention mechanism work in Transformers?'),
          a: tx(
            'La atención calcula qué partes del input son relevantes para cada token. Para cada token se calculan Q (query), K (key), V (value) mediante proyecciones lineales. Attention(Q,K,V) = softmax(QK^T/√d_k)V. La raíz cuadrada de d_k (dimensión) escala el producto punto para estabilizar los gradientes. Multi-head attention aplica esto en paralelo con distintas proyecciones (cabezas), capturando distintos tipos de dependencias. La complejidad es O(n²) respecto a la longitud del contexto.',
            'Attention calculates which parts of the input are relevant for each token. For each token, Q (query), K (key), V (value) are calculated via linear projections. Attention(Q,K,V) = softmax(QK^T/√d_k)V. The square root of d_k (dimension) scales the dot product to stabilize gradients. Multi-head attention applies this in parallel with different projections (heads), capturing different types of dependencies. Complexity is O(n²) relative to context length.'
          ),
        },
        {
          q: tx('¿Qué son los agentes IA y cómo se implementan?', 'What are AI agents and how are they implemented?'),
          a: tx(
            'Un agente IA es un LLM equipado con herramientas que puede tomar decisiones y actuar en un entorno. El patrón ReAct (Reasoning + Acting): Thought (analiza el problema) → Action (selecciona herramienta) → Tool Call (ejecuta) → Observation (procesa resultado) → loop hasta completar el objetivo. Implementación con Anthropic: definir tools con schema JSON, procesar stop_reason="tool_use", ejecutar la herramienta, devolver ToolResultBlock, continuar. Guardar historial de mensajes para multi-turn.',
            'An AI agent is an LLM equipped with tools that can make decisions and act in an environment. The ReAct pattern (Reasoning + Acting): Thought (analyzes the problem) → Action (selects tool) → Tool Call (executes) → Observation (processes result) → loop until goal is complete. Implementation with Anthropic: define tools with JSON schema, handle stop_reason="tool_use", execute tool, return ToolResultBlock, continue. Save message history for multi-turn.'
          ),
        },
        {
          q: tx('¿Cómo se evalúa la calidad de un sistema RAG?', 'How do you evaluate the quality of a RAG system?'),
          a: tx(
            'Marco RAGAS: (1) Faithfulness: ¿la respuesta se basa en el contexto recuperado? (ideal: >0.9). (2) Answer Relevancy: ¿la respuesta responde a la pregunta? (3) Context Precision: ¿los documentos recuperados son relevantes? (4) Context Recall: ¿se recuperaron todos los documentos necesarios? Evaluación humana para casos límite. LLM-as-judge (Claude evaluando Claude) para escala. Dataset de preguntas sintéticas generado con el LLM para pruebas de regresión automáticas.',
            'RAGAS framework: (1) Faithfulness: does the answer base itself on the retrieved context? (ideal: >0.9). (2) Answer Relevancy: does the answer address the question? (3) Context Precision: are the retrieved documents relevant? (4) Context Recall: were all necessary documents retrieved? Human evaluation for edge cases. LLM-as-judge (Claude evaluating Claude) for scale. Synthetic question dataset generated with the LLM for automatic regression tests.'
          ),
        },
        {
          q: tx('¿Qué es el prompt caching y cómo lo aprovechas?', 'What is prompt caching and how do you leverage it?'),
          a: tx(
            'El prompt caching de Anthropic almacena activaciones de bloques de texto marcados con cache_control: { type: "ephemeral" }. Los tokens en caché cuestan ~10% del precio normal de input (90% de ahorro). El caché dura 5 minutos y se renueva con cada uso. Mejor para: system prompts largos, documentos de referencia grandes, ejemplos de few-shot. Requiere mínimo 1024 tokens (Sonnet/Opus) o 2048 (Haiku). Estrategia: colocar contenido estático y largo al principio, dinámico al final.',
            'Anthropic\'s prompt caching stores activations of text blocks marked with cache_control: { type: "ephemeral" }. Cached tokens cost ~10% of normal input price (90% savings). Cache lasts 5 minutes and renews on each use. Best for: long system prompts, large reference documents, few-shot examples. Requires minimum 1024 tokens (Sonnet/Opus) or 2048 (Haiku). Strategy: place static and long content first, dynamic content last.'
          ),
        },
      ],
    },
    {
      level: 'Senior',
      color: 'border-fuchsia-400/40 text-fuchsia-300 bg-fuchsia-400/10',
      qs: [
        {
          q: tx('¿Cómo diseñarías un sistema multi-agente en producción?', 'How would you design a multi-agent system for production?'),
          a: tx(
            'Arquitectura: Orquestador central recibe la tarea, la descompone y coordina sub-agentes especializados. Consideraciones: (1) Comunicación entre agentes: mensajes estructurados con schema, nunca texto libre. (2) Estado compartido: base vectorial + Redis para contexto efímero. (3) Observabilidad: trazas por agente con LangSmith/Langfuse. (4) Error handling: timeouts, fallbacks, circuit breakers. (5) Costes: presupuesto de tokens por tarea, routing al modelo más barato que cumple el requisito. (6) Seguridad: validar inputs de herramientas, sandboxing para ejecución de código.',
            'Architecture: Central orchestrator receives the task, decomposes it and coordinates specialized sub-agents. Considerations: (1) Inter-agent communication: structured messages with schema, never free text. (2) Shared state: vector store + Redis for ephemeral context. (3) Observability: per-agent traces with LangSmith/Langfuse. (4) Error handling: timeouts, fallbacks, circuit breakers. (5) Costs: token budget per task, routing to cheapest model that meets the requirement. (6) Security: validate tool inputs, sandboxing for code execution.'
          ),
        },
        {
          q: tx('¿Cuáles son los principales riesgos de seguridad en aplicaciones LLM?', 'What are the main security risks in LLM applications?'),
          a: tx(
            'OWASP LLM Top 10: (1) Prompt Injection: entradas maliciosas que manipulan las instrucciones del sistema — mitigación: separar claramente instrucciones de datos, validar inputs. (2) Insecure Output Handling: ejecutar código o HTML generado por el LLM sin sanitizar. (3) Training Data Poisoning: datos comprometidos en fine-tuning. (4) Excessive Agency: agente con demasiados permisos — principio de mínimo privilegio. (5) Sensitive Information Disclosure: PII en el contexto. Defenses: input/output validation, Llama Guard, rate limiting, audit logs, sandboxing.',
            'OWASP LLM Top 10: (1) Prompt Injection: malicious inputs that manipulate system instructions — mitigation: clearly separate instructions from data, validate inputs. (2) Insecure Output Handling: executing code or HTML generated by LLM without sanitizing. (3) Training Data Poisoning: compromised data in fine-tuning. (4) Excessive Agency: agent with too many permissions — principle of least privilege. (5) Sensitive Information Disclosure: PII in context. Defenses: input/output validation, Llama Guard, rate limiting, audit logs, sandboxing.'
          ),
        },
        {
          q: tx('¿Cómo optimizarías los costes de un LLM en producción masiva?', 'How would you optimize LLM costs at massive production scale?'),
          a: tx(
            'Estrategia en capas: (1) Routing inteligente: clasificador ligero (Haiku) enruta al modelo correcto por complejidad. (2) Prompt caching: system prompts grandes con cache_control = 90% ahorro en prompts repetidos. (3) Batch API: 50% descuento para tareas sin latencia crítica (indexación, análisis). (4) Caché semántica: cacheado de respuestas para queries similares (Redis + cosine similarity). (5) Compresión de contexto: resumir conversaciones largas en vez de truncar. (6) Fine-tuning: modelos pequeños para tareas específicas de alto volumen. Objetivo: Haiku para 80% de queries, Sonnet para 15%, Opus para 5%.',
            'Layered strategy: (1) Smart routing: lightweight classifier (Haiku) routes to the right model by complexity. (2) Prompt caching: large system prompts with cache_control = 90% savings on repeated prompts. (3) Batch API: 50% discount for tasks without critical latency (indexing, analysis). (4) Semantic cache: response caching for similar queries (Redis + cosine similarity). (5) Context compression: summarize long conversations instead of truncating. (6) Fine-tuning: small models for specific high-volume tasks. Goal: Haiku for 80% of queries, Sonnet for 15%, Opus for 5%.'
          ),
        },
        {
          q: tx('¿Cómo implementas observabilidad para un sistema LLM en producción?', 'How do you implement observability for an LLM system in production?'),
          a: tx(
            'Stack de observabilidad LLM: (1) Trazas: LangSmith o Langfuse para rastrear cada llamada — latencia, tokens, modelo, inputs/outputs. (2) Métricas de calidad: faithfulness, relevancy vía LLM-as-judge asíncrono, TTFT (time-to-first-token). (3) Alertas: anomalías de coste, spike de errores, degradación de calidad en ventana deslizante. (4) Evaluación continua: golden dataset con preguntas + respuestas esperadas, CI/CD test contra modelos nuevos antes de deploy. (5) Costes: tokens por usuario/sesión/endpoint, proyección de costes con volumen. (6) PII detection en inputs para compliance (GDPR/HIPAA).',
            'LLM observability stack: (1) Traces: LangSmith or Langfuse to track every call — latency, tokens, model, inputs/outputs. (2) Quality metrics: faithfulness, relevancy via async LLM-as-judge, TTFT (time-to-first-token). (3) Alerts: cost anomalies, error spikes, quality degradation in sliding window. (4) Continuous evaluation: golden dataset with questions + expected answers, CI/CD test against new models before deploy. (5) Costs: tokens per user/session/endpoint, cost projection with volume. (6) PII detection on inputs for compliance (GDPR/HIPAA).'
          ),
        },
        {
          q: tx('¿Cuáles son las métricas clave para evaluar LLMs en producción?', 'What are the key metrics for evaluating LLMs in production?'),
          a: tx(
            'Métricas técnicas: (1) TTFT (Time To First Token): latencia percibida por el usuario. (2) TPS (Tokens Per Second): throughput de generación. (3) p50/p95/p99 latency: para SLAs realistas. Métricas de calidad: (4) Faithfulness: respuesta basada en contexto (RAG). (5) Answer relevancy: la respuesta responde la pregunta. (6) Hallucination rate: hechos incorrectos vs. verificables. (7) Task success rate: para agentes con objetivos claros. Métricas de negocio: (8) Costo por query. (9) Tasa de escalada a humano. (10) NPS / satisfacción del usuario. A/B testing entre versiones de prompts/modelos.',
            'Technical metrics: (1) TTFT (Time To First Token): perceived user latency. (2) TPS (Tokens Per Second): generation throughput. (3) p50/p95/p99 latency: for realistic SLAs. Quality metrics: (4) Faithfulness: answer grounded in context (RAG). (5) Answer relevancy: answer addresses the question. (6) Hallucination rate: incorrect vs. verifiable facts. (7) Task success rate: for agents with clear objectives. Business metrics: (8) Cost per query. (9) Human escalation rate. (10) NPS / user satisfaction. A/B testing between prompt/model versions.'
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Preguntas de Entrevista — IA/LLM', 'Interview Questions — AI/LLM')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Preguntas frecuentes de Junior a Senior sobre LLMs, RAG, agentes y sistemas en producción.',
            'Frequent questions from Junior to Senior about LLMs, RAG, agents and production systems.'
          )}
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
                      ? <ChevronUp className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
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

function AILLMPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('fundamentals');

  const sections = [
    {
      id: 'fundamentals',
      title: tx('Fundamentos LLM', 'LLM Fundamentals'),
      subtitle: tx('Tokens, temperatura, familias de modelos', 'Tokens, temperature, model families'),
    },
    {
      id: 'prompting',
      title: tx('Prompt Engineering', 'Prompt Engineering'),
      subtitle: tx('Zero-shot, few-shot, CoT, ReAct', 'Zero-shot, few-shot, CoT, ReAct'),
    },
    {
      id: 'rag',
      title: 'RAG',
      subtitle: tx('Retrieval Augmented Generation', 'Retrieval Augmented Generation'),
    },
    {
      id: 'vectordb',
      title: tx('Bases vectoriales', 'Vector DBs'),
      subtitle: tx('Pinecone, pgvector, Weaviate, HNSW', 'Pinecone, pgvector, Weaviate, HNSW'),
    },
    {
      id: 'agents',
      title: tx('Agentes & Tool Use', 'Agents & Tool Use'),
      subtitle: tx('ReAct, tool_use API, multi-agente', 'ReAct, tool_use API, multi-agent'),
    },
    {
      id: 'patterns',
      title: tx('Patrones LLM', 'LLM Patterns'),
      subtitle: tx('Caching, JSON output, guardrails, costes', 'Caching, JSON output, guardrails, costs'),
    },
    {
      id: 'interview',
      title: tx('Entrevista', 'Interview Q&A'),
      subtitle: tx('Junior → Senior preguntas IA', 'Junior → Senior AI questions'),
    },
  ];

  const renderContent = () => {
    switch (active) {
      case 'fundamentals': return renderFundamentals(tx);
      case 'prompting':    return renderPrompting(tx);
      case 'rag':          return renderRAG(tx);
      case 'vectordb':     return renderVectorDB(tx);
      case 'agents':       return renderAgents(tx);
      case 'patterns':     return renderPatterns(tx);
      case 'interview':    return <InterviewAccordionAI tx={tx} />;
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
                  ? 'bg-fuchsia-500/20 border border-fuchsia-500/40 text-fuchsia-300'
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

export default AILLMPro;
