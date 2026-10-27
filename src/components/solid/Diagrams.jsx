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

export function Flow({ block, tx }) {
  return (
    <figure className="bg-slate-950/40 border border-slate-700/50 rounded-xl p-4 space-y-3">
      <figcaption className="text-xs font-semibold uppercase tracking-wider text-slate-300 text-center">
        {block.title}
      </figcaption>
      <p className="sr-only">{block.description}</p>
      <div aria-hidden="true" className="flex flex-col md:flex-row items-stretch md:items-center gap-1 md:gap-2">
        {block.nodes.map((n, i) => {
          if (n.arrow) return <FlowArrow key={i} {...n} />;
          if (n.group) return <FlowGroup key={i} {...n} />;
          return <FlowNode key={i} node={n} grow />;
        })}
      </div>
      <p className="text-[11px] text-slate-500 text-center">
        {tx(
          'Cada flecha significa «depende de»: sale de la clase cuyo código menciona a la otra.',
          'Each arrow means "depends on": it starts at the class whose code mentions the other one.'
        )}
      </p>
    </figure>
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
