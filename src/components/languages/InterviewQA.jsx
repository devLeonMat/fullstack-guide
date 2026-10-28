import { useState } from 'react';
import { ChevronDown, Briefcase } from 'lucide-react';

// Full class names (not interpolated) so Tailwind can detect them.
const LEVELS = {
  Junior: { border: 'border-green-500/30', badge: 'bg-green-500/20 border-green-500/40 text-green-300' },
  Mid: { border: 'border-yellow-500/30', badge: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300' },
  Senior: { border: 'border-red-400/30', badge: 'bg-red-500/20 border-red-500/40 text-red-300' },
};

const ACCENTS = {
  orange: 'text-orange-400',
  yellow: 'text-yellow-400',
  blue: 'text-blue-400',
  violet: 'text-violet-400',
};

// Interview questions grouped by level. Each item: { q, a, table?, inPractice? }.
// One question open at a time keeps the page short.
function InterviewQA({ groups, tx, accent = 'orange' }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-6">
      {groups.map(group => {
        const level = LEVELS[group.level];
        return (
          <div key={group.level} className={`bg-slate-900/40 border ${level.border} rounded-xl overflow-hidden`}>
            <div className="px-4 py-3 border-b border-slate-800/60 flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${level.badge}`}>{group.level}</span>
              <span className="text-xs text-slate-500">{group.items.length} {tx('preguntas', 'questions')}</span>
            </div>
            <div className="divide-y divide-slate-800/60">
              {group.items.map((item, i) => {
                const key = `${group.level}-${i}`;
                const isOpen = open === key;
                return (
                  <div key={key}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : key)}
                      aria-expanded={isOpen}
                      className="w-full text-left px-4 py-3 flex items-start justify-between gap-3 hover:bg-slate-800/30 transition-colors"
                    >
                      <span className="text-sm text-slate-200 font-medium">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-transform ${ACCENTS[accent]} ${isOpen ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 space-y-3">
                        <p className="text-sm text-slate-300 leading-relaxed">{item.a}</p>
                        {item.table && (
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs border-collapse min-w-[420px]">
                              <thead>
                                <tr>
                                  {item.table.headers.map((h, hi) => (
                                    <th key={hi} className="text-left px-2 py-1.5 border-b border-slate-700 text-slate-400 font-semibold">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {item.table.rows.map((row, ri) => (
                                  <tr key={ri} className="border-b border-slate-800/60">
                                    {row.map((cell, ci) => (
                                      <td key={ci} className={`px-2 py-1.5 ${ci === 0 ? 'text-slate-400 font-medium' : 'text-slate-300 font-mono'}`}>{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {item.inPractice && (
                          <div className="flex items-start gap-2 bg-slate-800/40 border border-slate-700/50 rounded-lg p-3">
                            <Briefcase className={`w-4 h-4 flex-shrink-0 mt-0.5 ${ACCENTS[accent]}`} aria-hidden="true" />
                            <p className="text-xs text-slate-300 leading-relaxed">
                              <span className="font-semibold text-slate-200">{tx('En mi trabajo: ', 'On the job: ')}</span>
                              {item.inPractice}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InterviewQA;
