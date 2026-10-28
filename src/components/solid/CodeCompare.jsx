import { useId, useRef, useState } from 'react';
import CodeBlock from '../CodeBlock';
import { Inline } from './Inline';
import { FOCUS_RING } from './theme';

// Before/after comparator: two columns on xl screens, tabs below that.
function CodeCompare({ before, after, rows = [], tx }) {
  const [tab, setTab] = useState('before');
  const [showCode, setShowCode] = useState(false);
  const baseId = useId();
  const tabRefs = useRef({});

  const panes = [
    { id: 'before', label: tx('ANTES', 'BEFORE'), icon: '❌', code: before, tone: 'bad', color: 'text-red-300', border: 'border-red-500/40' },
    { id: 'after', label: tx('DESPUÉS', 'AFTER'), icon: '✅', code: after, tone: 'good', color: 'text-green-300', border: 'border-green-500/40' },
  ];

  const onKeyDown = (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const next = e.key === 'Home' ? 'before' : e.key === 'End' ? 'after' : tab === 'before' ? 'after' : 'before';
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="space-y-4">
      {/* Both panes share one toggle so the comparison opens in a single click */}
      <button
        type="button"
        onClick={() => setShowCode(v => !v)}
        aria-expanded={showCode}
        className={`inline-flex items-center gap-2 px-3 py-2 bg-slate-800/70 hover:bg-slate-800 border border-slate-700 rounded-lg text-sm text-slate-200 transition-colors ${FOCUS_RING}`}
      >
        <span className="text-slate-400" aria-hidden="true">{showCode ? '▼' : '▶'}</span>
        <span>{showCode ? tx('Ocultar código antes/después', 'Hide before/after code') : tx('Ver código antes/después', 'Show before/after code')}</span>
      </button>

      {showCode && (
      <>
      <div role="tablist" aria-label={tx('Comparar código', 'Compare code')} className="xl:hidden flex gap-2">
        {panes.map(p => {
          const selected = tab === p.id;
          return (
            <button
              key={p.id}
              ref={el => { tabRefs.current[p.id] = el; }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${p.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${p.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(p.id)}
              onKeyDown={onKeyDown}
              className={`flex-1 px-3 py-2 rounded-lg border text-sm font-bold transition-colors ${FOCUS_RING} ${
                selected ? `${p.border} bg-slate-800/50 ${p.color}` : 'border-slate-700/50 bg-slate-800/30 text-slate-400'
              }`}
            >
              {p.label} {p.icon}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {panes.map(p => (
          <div
            key={p.id}
            role="tabpanel"
            id={`${baseId}-panel-${p.id}`}
            aria-labelledby={`${baseId}-tab-${p.id}`}
            className={`min-w-0 space-y-2 ${tab === p.id ? '' : 'hidden xl:block'}`}
          >
            <p className={`hidden xl:block text-sm font-bold ${p.color}`}>{p.label} {p.icon}</p>
            <CodeBlock
              code={p.code.code}
              language={p.code.lang || 'java'}
              highlightLines={p.code.highlight}
              highlightTone={p.tone}
              collapsible={false}
            />
          </div>
        ))}
      </div>
      </>
      )}

      {rows.length > 0 && (
        <>
          {/* Table on md+ */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-700/50">
            <table className="w-full text-xs text-left">
              <caption className="sr-only">{tx('Diferencias entre antes y después', 'Differences between before and after')}</caption>
              <thead className="bg-slate-800/50">
                <tr>
                  <th scope="col" className="px-3 py-2 text-slate-300 font-semibold">{tx('Aspecto', 'Aspect')}</th>
                  <th scope="col" className="px-3 py-2 text-red-300 font-semibold">{tx('Antes ❌', 'Before ❌')}</th>
                  <th scope="col" className="px-3 py-2 text-green-300 font-semibold">{tx('Después ✅', 'After ✅')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rows.map(([aspect, b, a]) => (
                  <tr key={aspect}>
                    <th scope="row" className="px-3 py-2 text-slate-200 font-medium align-top">{aspect}</th>
                    <td className="px-3 py-2 text-slate-400 align-top"><Inline text={b} /></td>
                    <td className="px-3 py-2 text-slate-300 align-top"><Inline text={a} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Stacked cards on small screens */}
          <ul className="md:hidden space-y-2">
            {rows.map(([aspect, b, a]) => (
              <li key={aspect} className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-3 space-y-1 text-xs">
                <p className="font-semibold text-slate-200">{aspect}</p>
                <p className="text-slate-400"><span aria-hidden="true">❌ </span><span className="sr-only">{tx('Antes: ', 'Before: ')}</span><Inline text={b} /></p>
                <p className="text-slate-300"><span aria-hidden="true">✅ </span><span className="sr-only">{tx('Después: ', 'After: ')}</span><Inline text={a} /></p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default CodeCompare;
