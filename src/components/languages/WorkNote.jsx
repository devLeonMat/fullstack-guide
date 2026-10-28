import { Briefcase } from 'lucide-react';

// Full class names (not interpolated) so Tailwind can detect them.
const ACCENTS = {
  yellow: 'text-yellow-400',
  blue: 'text-blue-400',
  violet: 'text-violet-400',
  orange: 'text-orange-400',
};

// Short "on the job" callout that ties a fundamentals section to real project work.
function WorkNote({ tx, accent = 'yellow', children }) {
  return (
    <div className="flex items-start gap-2 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
      <Briefcase className={`w-4 h-4 flex-shrink-0 mt-0.5 ${ACCENTS[accent]}`} aria-hidden="true" />
      <p className="text-sm text-slate-300 leading-relaxed">
        <span className="font-semibold text-slate-200">{tx('En mi trabajo: ', 'On the job: ')}</span>
        {children}
      </p>
    </div>
  );
}

export default WorkNote;
