import { AlertTriangle, CheckCircle, ChevronRight, Info, Lightbulb, OctagonAlert } from 'lucide-react';
import CodeBlock from '../CodeBlock';
import CodeCompare from './CodeCompare';
import { Switcher } from './Diagrams';
import { Inline } from './Inline';
import Tabs from './Tabs';
import { FOCUS_RING, TONES } from './theme';

const CALLOUT_ICONS = {
  info: Info,
  tip: Lightbulb,
  warning: AlertTriangle,
  danger: OctagonAlert,
  success: CheckCircle,
};

const BULLET = {
  good: 'text-green-400',
  bad: 'text-red-400',
  default: 'text-violet-400',
};

function List({ items, ordered, tone }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
          <span className={`shrink-0 font-bold ${BULLET[tone] || BULLET.default}`} aria-hidden="true">
            {ordered ? `${i + 1}.` : '•'}
          </span>
          <span><Inline text={item} /></span>
        </li>
      ))}
    </Tag>
  );
}

function Code({ block }) {
  return (
    <figure className="space-y-2 min-w-0">
      {block.title && (
        <figcaption className="text-xs font-mono text-slate-400">{block.title}</figcaption>
      )}
      <CodeBlock
        code={block.code}
        language={block.lang || 'java'}
        showLineNumbers={Boolean(block.lineNumbers)}
        highlightLines={block.highlight}
        highlightTone={block.tone || 'bad'}
      />
      {block.notes && (
        <ul className="space-y-1">
          {block.notes.map((note, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
              <span className={block.tone === 'good' ? 'text-green-400' : 'text-red-400'} aria-hidden="true">
                {block.tone === 'good' ? '✓' : '⚠'}
              </span>
              <span><Inline text={note} /></span>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}

function Callout({ block }) {
  const tone = TONES[block.tone] || TONES.info;
  const Icon = CALLOUT_ICONS[block.tone] || Info;
  return (
    <aside className={`rounded-xl border p-3 sm:p-4 space-y-1.5 ${tone.box}`}>
      <p className={`flex items-center gap-2 text-sm font-bold ${tone.title}`}>
        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
        {block.title}
      </p>
      {block.text && <p className="text-sm text-slate-300 leading-relaxed"><Inline text={block.text} /></p>}
      {block.items && <List items={block.items} tone={block.tone === 'danger' ? 'bad' : undefined} />}
    </aside>
  );
}

function Details({ block, tx }) {
  return (
    <details className="group rounded-xl border border-slate-700/50 bg-slate-800/30">
      <summary className={`flex cursor-pointer list-none items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800/50 [&::-webkit-details-marker]:hidden ${FOCUS_RING}`}>
        <ChevronRight className="w-4 h-4 shrink-0 text-violet-400 transition-transform group-open:rotate-90" aria-hidden="true" />
        {block.title}
      </summary>
      <div className="px-4 pb-4 space-y-3">
        <Blocks blocks={block.blocks} tx={tx} />
      </div>
    </details>
  );
}

function Cards({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map(item => {
        const tone = item.tone ? TONES[item.tone] : null;
        return (
          <div key={item.title} className={`rounded-xl border p-3 space-y-1 ${tone ? tone.box : 'bg-slate-800/30 border-slate-700/50'}`}>
            <p className={`text-sm font-bold ${tone ? tone.title : 'text-slate-100'}`}>{item.title}</p>
            <p className="text-sm text-slate-400 leading-relaxed"><Inline text={item.text} /></p>
          </div>
        );
      })}
    </div>
  );
}

function Table({ block }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700/50">
      <table className="w-full min-w-[480px] text-xs text-left">
        {block.caption && (
          <caption className="caption-top px-3 py-2 text-left text-xs font-semibold text-slate-300">{block.caption}</caption>
        )}
        <thead className="bg-slate-800/50">
          <tr>
            {block.headers.map(h => (
              <th key={h} scope="col" className="px-3 py-2 font-semibold text-slate-300">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {block.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => c === 0 ? (
                <th key={c} scope="row" className="px-3 py-2 align-top font-medium text-slate-200"><Inline text={cell} /></th>
              ) : (
                <td key={c} className="px-3 py-2 align-top text-slate-400"><Inline text={cell} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SubSteps({ items, tx }) {
  return (
    <Tabs
      variant="secondary"
      label={tx('Refactorización paso a paso', 'Step-by-step refactoring')}
      tx={tx}
      items={items.map((item, i) => ({
        id: `sub-${i + 1}`,
        label: <><span className="font-bold text-violet-300">{i + 1}</span>{item.title}</>,
        navLabel: `${i + 1}. ${item.title}`,
        content: (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-100">
              <span className="sr-only">{tx('Paso', 'Step')} </span>{i + 1}/{items.length} — {item.title}
            </h4>
            <Blocks blocks={item.blocks} tx={tx} />
          </div>
        ),
      }))}
    />
  );
}

function Concepts({ items }) {
  return (
    <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map(item => (
        <div key={item.term} className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-3 space-y-1">
          <dt className="text-sm">
            <span className="text-slate-300 italic">{item.plain}</span>
            <span className="text-slate-500" aria-hidden="true"> → </span>
            <span className="font-bold text-violet-300">{item.term}</span>
          </dt>
          <dd className="text-xs text-slate-400 leading-relaxed"><Inline text={item.text} /></dd>
        </div>
      ))}
    </dl>
  );
}

function Rule({ text }) {
  return (
    <blockquote className="rounded-xl border-l-4 border-violet-500 bg-violet-500/10 px-4 py-4 sm:px-6">
      <p className="text-lg sm:text-xl font-bold text-slate-100 leading-snug">“{text}”</p>
    </blockquote>
  );
}

function FiveQuestions({ block, tx }) {
  const rows = [
    { key: 'problem', label: tx('¿Qué problema resuelve?', 'What problem does it solve?') },
    { key: 'identify', label: tx('¿Cómo identifico una violación?', 'How do I spot a violation?') },
    { key: 'fix', label: tx('¿Cómo lo corrijo?', 'How do I fix it?') },
    { key: 'when', label: tx('¿Cuándo lo aplico en un proyecto real?', 'When do I apply it in a real project?') },
    { key: 'mistakes', label: tx('¿Qué errores debo evitar?', 'Which mistakes should I avoid?') },
  ];
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{tx('Ficha de repaso', 'Review card')}</p>
      <dl className="divide-y divide-slate-800">
        {rows.map(r => (
          <div key={r.key} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3 py-2">
            <dt className="text-xs font-semibold text-violet-300">{r.label}</dt>
            <dd className="sm:col-span-2 text-xs text-slate-300 leading-relaxed"><Inline text={block[r.key]} /></dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Analogy({ block }) {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 space-y-3">
      <p className="text-sm font-bold text-slate-100">🏠 {block.title}</p>
      <ul className="space-y-2">
        {block.items.map(item => (
          <li key={item.letter} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
            <span className="shrink-0 w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/40 flex items-center justify-center font-black text-violet-300" aria-hidden="true">
              {item.letter}
            </span>
            <span><span className="sr-only">{item.letter}: </span><Inline text={item.text} /></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Block({ block, tx }) {
  switch (block.type) {
    case 'p': return <p className="text-sm text-slate-300 leading-relaxed"><Inline text={block.text} /></p>;
    case 'list': return <List {...block} />;
    case 'code': return <Code block={block} />;
    case 'callout': return <Callout block={block} />;
    case 'details': return <Details block={block} tx={tx} />;
    case 'cards': return <Cards items={block.items} />;
    case 'table': return <Table block={block} />;
    case 'compare': return <CodeCompare before={block.before} after={block.after} rows={block.rows} tx={tx} />;
    case 'switcher': return <Switcher block={block} tx={tx} />;
    case 'steps': return <SubSteps items={block.items} tx={tx} />;
    case 'concepts': return <Concepts items={block.items} />;
    case 'rule': return <Rule text={block.text} />;
    case 'five': return <FiveQuestions block={block} tx={tx} />;
    case 'analogy': return <Analogy block={block} />;
    default: return null;
  }
}

export function Blocks({ blocks, tx }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => <Block key={i} block={block} tx={tx} />)}
    </div>
  );
}
