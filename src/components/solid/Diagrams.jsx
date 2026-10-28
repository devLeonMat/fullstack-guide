import { useRef, useState } from 'react';
import { FOCUS_RING } from './theme';
import { Inline } from './Inline';

// ─── Dependency flow diagram ───────────────────────────────────────────────────
// Horizontal on md+, vertical on small screens. Every arrow means
// "depends on" and points from the class whose code mentions the other one.

const NODE_STYLES = {
  ok: 'border-green-500/50 bg-green-500/10',
  bad: 'border-red-500/50 bg-red-500/10',
  new: 'border-amber-500/50 bg-amber-500/10',
  interface: 'border-violet-500/60 bg-violet-500/10 border-dashed',
  default: 'border-slate-600 bg-slate-800/50',
};

const STATUS_ICON = { ok: '✅ ', bad: '❌ ', new: '✨ ' };

function FlowNode({ node, grow }) {
  const style = NODE_STYLES[node.status] || (node.kind === 'interface' ? NODE_STYLES.interface : NODE_STYLES.default);
  return (
    <div className={`${grow ? 'md:flex-1' : ''} min-w-0 rounded-lg border px-3 py-2 text-center ${style}`}>
      {node.layer && (
        <div className="text-[10px] uppercase tracking-wider text-slate-500">{node.layer}</div>
      )}
      {node.kind === 'interface' && (
        <div className="text-[10px] font-mono text-violet-300">«interface»</div>
      )}
      <div className="text-xs font-mono font-semibold text-slate-100 [overflow-wrap:anywhere]">
        {STATUS_ICON[node.status] || ''}{node.title}
      </div>
      {node.note && <div className="text-[11px] text-slate-400 mt-0.5">{node.note}</div>}
      {node.chips && (
        <ul className="mt-1.5 flex flex-wrap justify-center gap-1">
          {node.chips.map(chip => {
            const c = typeof chip === 'string' ? { text: chip } : chip;
            return (
              <li
                key={c.text}
                className={`px-1.5 py-0.5 rounded border text-[10px] font-mono ${
                  c.status === 'bad' ? 'border-red-500/40 bg-red-500/10 text-red-300' : 'border-slate-600 bg-slate-900/50 text-slate-300'
                }`}
              >
                {c.text}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FlowArrow({ arrow, label, tone }) {
  const backward = arrow === 'backward';
  const color = tone === 'bad' ? 'text-red-400' : 'text-slate-400';
  return (
    <div className={`flex shrink-0 items-center justify-center gap-2 py-1 md:flex-col md:gap-0.5 md:py-0 ${color}`}>
      {/* vertical (mobile) */}
      <svg className={`md:hidden ${backward ? '-scale-y-100' : ''}`} width="10" height="28" viewBox="0 0 10 28" fill="none">
        <line x1="5" y1="1" x2="5" y2="21" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="1,20 5,27 9,20" fill="currentColor" />
      </svg>
      {/* horizontal (md+) */}
      <svg className={`hidden md:block ${backward ? '-scale-x-100' : ''}`} width="56" height="10" viewBox="0 0 56 10" fill="none">
        <line x1="1" y1="5" x2="48" y2="5" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="47,1 55,5 47,9" fill="currentColor" />
      </svg>
      {label && <span className="text-[10px] leading-tight md:text-center md:max-w-[80px]">{label}</span>}
    </div>
  );
}

function FlowGroup({ group, items }) {
  return (
    <div className="md:flex-1 min-w-0 rounded-xl border border-dashed border-slate-600 p-2 space-y-1.5">
      <div className="text-[10px] uppercase tracking-wider text-slate-500 text-center">{group}</div>
      {items.map(item => <FlowNode key={item.title} node={item} />)}
    </div>
  );
}

function FlowRow({ nodes }) {
  return (
    <div aria-hidden="true" className="flex flex-col md:flex-row items-stretch md:items-center gap-1 md:gap-2">
      {nodes.map((n, i) => {
        if (n.arrow) return <FlowArrow key={i} {...n} />;
        if (n.group) return <FlowGroup key={i} {...n} />;
        return <FlowNode key={i} node={n} grow />;
      })}
    </div>
  );
}

const ArrowLegend = ({ tx }) => (
  <p className="text-[11px] text-slate-500 text-center">
    {tx(
      'Cada flecha significa «depende de»: sale de la clase cuyo código menciona a la otra.',
      'Each arrow means "depends on": it starts at the class whose code mentions the other one.'
    )}
  </p>
);

// ─── Before → after picture of a principle ─────────────────────────────────────

export function BeforeAfterVisual({ visual, tx }) {
  const sides = [
    { key: 'before', label: tx('ANTES', 'BEFORE'), icon: '❌', color: 'text-red-300', border: 'border-red-500/30', data: visual.before },
    { key: 'after', label: tx('DESPUÉS', 'AFTER'), icon: '✅', color: 'text-green-300', border: 'border-green-500/30', data: visual.after },
  ];
  return (
    <figure className="bg-slate-950/40 border border-slate-700/50 rounded-xl p-4 space-y-3">
      <figcaption className="text-xs font-semibold uppercase tracking-wider text-slate-300 text-center">
        {tx('Imagen para recordar', 'Picture to remember')}
      </figcaption>
      {sides.map((side, i) => (
        <div key={side.key} className="space-y-2">
          {i === 1 && (
            <p className="text-center text-xs text-slate-500" aria-hidden="true">↓ {tx('refactor', 'refactor')} ↓</p>
          )}
          <div className={`rounded-lg border ${side.border} p-3 space-y-2`}>
            <p className={`text-xs font-bold ${side.color}`}>
              {side.label} {side.icon} <span className="font-normal text-slate-400">— {side.data.caption}</span>
            </p>
            <p className="sr-only">{side.data.description}</p>
            {side.data.rows.map((row, r) => <FlowRow key={r} nodes={row} />)}
          </div>
        </div>
      ))}
      <p className="rounded-lg border-l-4 border-violet-500 bg-violet-500/10 px-3 py-2 text-sm font-semibold text-slate-100">
        💡 {visual.takeaway}
      </p>
      <ArrowLegend tx={tx} />
    </figure>
  );
}

// ─── Pictograms: one tiny drawing per letter ───────────────────────────────────

const PICTOGRAMS = {
  // One fat box split into small boxes
  S: (
    <>
      <rect x="4" y="8" width="36" height="48" rx="4" />
      <line x1="4" y1="20" x2="40" y2="20" /><line x1="4" y1="32" x2="40" y2="32" /><line x1="4" y1="44" x2="40" y2="44" />
      <line x1="48" y1="32" x2="66" y2="32" /><polyline points="61,27 67,32 61,37" />
      <rect x="76" y="8" width="18" height="20" rx="3" /><rect x="98" y="8" width="18" height="20" rx="3" />
      <rect x="76" y="36" width="18" height="20" rx="3" /><rect x="98" y="36" width="18" height="20" rx="3" />
    </>
  ),
  // Closed core, new plug-ins added on the side
  O: (
    <>
      <rect x="4" y="14" width="44" height="36" rx="4" />
      <path d="M20 32 h12 M22 32 v-5 a4 4 0 0 1 8 0 v5" />
      <line x1="48" y1="22" x2="72" y2="12" /><line x1="48" y1="32" x2="72" y2="32" /><line x1="48" y1="42" x2="72" y2="52" />
      <rect x="72" y="5" width="42" height="14" rx="3" /><rect x="72" y="25" width="42" height="14" rx="3" />
      <rect x="72" y="45" width="42" height="14" rx="3" strokeDasharray="4 3" />
      <line x1="93" y1="48" x2="93" y2="56" /><line x1="89" y1="52" x2="97" y2="52" />
    </>
  ),
  // Contract on top; one piece honors it, the other does not
  L: (
    <>
      <rect x="34" y="4" width="52" height="16" rx="3" strokeDasharray="4 3" />
      <line x1="44" y1="12" x2="76" y2="12" />
      <line x1="28" y1="40" x2="46" y2="22" /><line x1="92" y1="40" x2="74" y2="22" />
      <rect x="6" y="40" width="44" height="20" rx="3" />
      <rect x="70" y="40" width="44" height="20" rx="3" />
      <polyline points="20,50 26,55 36,45" className="text-green-400" />
      <path d="M86 45 l10 10 M96 45 l-10 10" className="text-red-400" />
    </>
  ),
  // One wide interface split into narrow ones
  I: (
    <>
      <rect x="4" y="8" width="44" height="48" rx="4" strokeDasharray="4 3" />
      <rect x="12" y="16" width="28" height="8" rx="2" /><rect x="12" y="28" width="28" height="8" rx="2" /><rect x="12" y="40" width="28" height="8" rx="2" />
      <line x1="54" y1="32" x2="68" y2="32" /><polyline points="63,27 69,32 63,37" />
      <rect x="76" y="4" width="40" height="15" rx="3" strokeDasharray="4 3" />
      <rect x="76" y="24" width="40" height="15" rx="3" strokeDasharray="4 3" />
      <rect x="76" y="44" width="40" height="15" rx="3" strokeDasharray="4 3" />
    </>
  ),
  // Business above, technology below, both point to the abstraction
  D: (
    <>
      <rect x="36" y="2" width="48" height="14" rx="3" />
      <rect x="36" y="25" width="48" height="14" rx="3" strokeDasharray="4 3" />
      <rect x="36" y="48" width="48" height="14" rx="3" />
      <line x1="60" y1="16" x2="60" y2="23" /><polyline points="56,19 60,24 64,19" />
      <line x1="60" y1="48" x2="60" y2="41" /><polyline points="56,45 60,40 64,45" />
    </>
  ),
};

const D_LABELS = [
  { y: 12, es: 'negocio', en: 'business' },
  { y: 35, es: 'interfaz', en: 'interface' },
  { y: 58, es: 'infra', en: 'infra' },
];

export function Pictogram({ letter, tx, className = '' }) {
  return (
    <svg
      viewBox="0 0 120 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PICTOGRAMS[letter]}
      {letter === 'D' && tx && D_LABELS.map(l => (
        <text key={l.y} x="90" y={l.y} fontSize="8" fill="currentColor" stroke="none">{tx(l.es, l.en)}</text>
      ))}
    </svg>
  );
}

// ─── Visual map: the five pictures side by side ───────────────────────────────

export function VisualMap({ lessons, accents, tx, onOpen }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-400">
        {tx(
          'Una imagen por principio. Si en la entrevista te bloqueas, piensa en el dibujo y reconstruye la idea desde ahí.',
          'One picture per principle. If you freeze in the interview, think of the drawing and rebuild the idea from there.'
        )}
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {lessons.map(l => {
          const accent = accents[l.color];
          return (
            <li key={l.id} className={`rounded-xl border ${accent.border} bg-slate-800/30 p-4 space-y-2`}>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-black ${accent.text}`} aria-hidden="true">{l.letter}</span>
                <span className="text-sm font-bold text-slate-100">{l.nameEn.replace(' Principle', '')}</span>
              </div>
              <Pictogram letter={l.letter} tx={tx} className={`w-full h-20 ${accent.text}`} />
              <p className="text-sm font-semibold text-slate-200">{l.visual.takeaway}</p>
              <p className="text-xs text-slate-400">“{l.tagline}”</p>
              {onOpen && (
                <button
                  type="button"
                  onClick={() => onOpen(l.id)}
                  className={`text-xs font-semibold ${accent.text} underline-offset-2 hover:underline rounded ${FOCUS_RING}`}
                >
                  {tx('Ver lección', 'Open lesson')} →<span className="sr-only"> {l.nameEn}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─── Implementation switcher ("what happens if we swap it?") ───────────────────

const RESULT_TONE = {
  ok: 'text-green-300',
  bad: 'text-red-300',
};

export function Switcher({ block, tx }) {
  const [selected, setSelected] = useState(block.options[0].id);
  const refs = useRef([]);
  const current = block.options.find(o => o.id === selected);
  const isBad = current.result.some(r => r.tone === 'bad');

  const onKeyDown = (e, index) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (index + keys[e.key] + block.options.length) % block.options.length;
    setSelected(block.options[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div className="bg-slate-950/40 border border-indigo-500/30 rounded-xl p-4 space-y-3">
      <p className="text-sm font-bold text-indigo-300">{block.title}</p>
      <p className="text-xs text-slate-400">{block.prompt}</p>
      <div role="radiogroup" aria-label={tx('Implementación inyectada', 'Injected implementation')} className="flex flex-col sm:flex-row flex-wrap gap-2">
        {block.options.map((option, i) => {
          const active = option.id === selected;
          return (
            <button
              key={option.id}
              ref={el => { refs.current[i] = el; }}
              type="button"
              role="radio"
              aria-checked={active}
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(option.id)}
              onKeyDown={e => onKeyDown(e, i)}
              className={`text-left px-3 py-2 rounded-lg border text-xs font-mono transition-colors ${FOCUS_RING} ${
                active
                  ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                  : 'bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <pre className="text-xs font-mono bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 overflow-x-auto text-slate-200">
        {block.call}
      </pre>
      <ol className="space-y-1.5" aria-live="polite">
        {current.result.map((row, i) => (
          <li key={row.label} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3 text-xs">
            <span className="text-slate-500 shrink-0 sm:w-44 font-mono">{i + 1}. {row.label}</span>
            <span className={`font-mono ${RESULT_TONE[row.tone]}`}>{row.value}</span>
          </li>
        ))}
      </ol>
      <p className={`text-xs font-semibold ${isBad ? 'text-red-300' : 'text-green-300'}`}>
        <Inline text={current.verdict} />
      </p>
    </div>
  );
}
