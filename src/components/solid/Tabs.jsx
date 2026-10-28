import { useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FOCUS_RING } from './theme';

const VARIANTS = {
  primary: {
    list: 'gap-1.5',
    tab: 'px-3 py-2 rounded-lg text-sm',
    active: 'bg-violet-500/20 border-violet-500/50 text-violet-300',
    idle: 'bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50',
  },
  secondary: {
    list: 'gap-1',
    tab: 'px-2.5 py-1.5 rounded-md text-xs',
    active: 'bg-slate-800/70 border-slate-500 text-slate-100',
    idle: 'bg-transparent border-slate-700/50 text-slate-400 hover:text-slate-200',
  },
};

// Accessible tabs: one panel visible at a time, arrow-key navigation and
// optional previous/next buttons. Panels stay mounted (hidden) so their
// state (answered exercises, opened code) survives switching tabs.
function Tabs({ items, label, tx, variant = 'primary', footer = true, sticky = false }) {
  const [active, setActive] = useState(items[0].id);
  const baseId = useId();
  const tabRefs = useRef({});
  const listRef = useRef(null);
  const styles = VARIANTS[variant];
  const index = Math.max(0, items.findIndex(i => i.id === active));

  const select = (id, { focus = false, reveal = false } = {}) => {
    setActive(id);
    const tab = tabRefs.current[id];
    if (focus) tab?.focus();
    tab?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    // Bring the tab bar back into view when navigating from the bottom buttons
    if (reveal) listRef.current?.scrollIntoView({ block: 'nearest' });
  };

  const onKeyDown = (e) => {
    const last = items.length - 1;
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: last };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const next = (moves[e.key] + items.length) % items.length;
    select(items[next].id, { focus: true });
  };

  const prev = items[index - 1];
  const next = items[index + 1];

  return (
    <div className="space-y-4">
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        className={`flex overflow-x-auto scrollbar-hide pb-1 scroll-mt-20 lg:scroll-mt-0 ${styles.list} ${
          sticky ? 'lg:sticky lg:top-0 lg:z-10 lg:bg-slate-950 lg:py-2' : ''
        }`}
      >
        {items.map(item => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              ref={el => { tabRefs.current[item.id] = el; }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(item.id)}
              onKeyDown={onKeyDown}
              className={`shrink-0 flex items-center gap-1.5 border whitespace-nowrap transition-colors ${styles.tab} ${FOCUS_RING} ${
                selected ? styles.active : styles.idle
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map(item => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== active}
          tabIndex={0}
          className="focus:outline-none"
        >
          {item.content}
        </div>
      ))}

      {footer && (prev || next) && (
        <div className="flex gap-2 pt-2">
          {prev && (
            <button
              type="button"
              onClick={() => select(prev.id, { reveal: true })}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/50 bg-slate-800/30 text-xs text-slate-300 hover:bg-slate-800/50 ${FOCUS_RING}`}
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              {prev.navLabel || prev.label}
            </button>
          )}
          {next && (
            <button
              type="button"
              onClick={() => select(next.id, { reveal: true })}
              className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-violet-500/40 bg-violet-500/10 text-xs font-semibold text-violet-300 hover:bg-slate-800/50 ${FOCUS_RING}`}
            >
              <span className="sr-only">{tx ? tx('Siguiente: ', 'Next: ') : ''}</span>
              {next.navLabel || next.label}
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Tabs;
