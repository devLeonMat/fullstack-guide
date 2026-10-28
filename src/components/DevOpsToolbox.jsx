import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Workflow, ShieldCheck, FlaskConical, Container, Zap, Activity, MessagesSquare, DoorOpen, GitBranch, SquareKanban, Briefcase, Compass } from 'lucide-react';
import { buildToolbox } from './toolbox/tools';
import { LOGOS } from './toolbox/logos';
import { useLanguage } from '../contexts/LanguageContext';

// Module-level alias so the linter sees motion as used (it doesn't track JSX member expressions)
const MotionPanel = motion.div;

const ICONS = {
  cicd: Workflow,
  quality: ShieldCheck,
  testing: FlaskConical,
  containers: Container,
  serverless: Zap,
  observability: Activity,
  messaging: MessagesSquare,
  gateway: DoorOpen,
  repos: GitBranch,
  tracking: SquareKanban,
};

// Brand logo on a white tile (readable in both themes); initials if a logo is missing.
const Logo = ({ name, small = false }) => {
  const logo = LOGOS[name];
  const box = small ? 'w-7 h-7 rounded-md' : 'w-11 h-11 rounded-lg';
  const icon = small ? 'w-4 h-4' : 'w-6 h-6';
  return (
    <span className={`${box} shrink-0 flex items-center justify-center bg-white border border-slate-700/50 shadow-sm`} aria-hidden="true">
      {logo
        ? <logo.Icon className={icon} style={{ color: logo.color }} />
        : <span className="text-xs font-bold text-slate-700">{name.slice(0, 2).toUpperCase()}</span>}
    </span>
  );
};

const UsedAt = ({ projects }) => (
  <ul className="flex flex-wrap gap-1.5">
    {projects.map(p => (
      <li key={p.client} className="text-xs px-2 py-0.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300">
        {p.client} · {p.project}
      </li>
    ))}
  </ul>
);

// Tools grouped by the need they cover, each with the client projects where it was used.
function DevOpsToolbox() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [selected, setSelected] = useState('cicd');

  const needs = buildToolbox(tx);
  const current = needs.find(n => n.id === selected);
  const Icon = ICONS[current.icon];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <h3 className="text-base lg:text-lg font-bold text-teal-400 mb-1">
          {tx('Herramientas por necesidad', 'Tools by need')}
        </h3>
        <p className="hidden lg:block text-xs text-slate-400 mb-4">
          {tx('Lo que usé en proyectos reales, ordenado por para qué sirve.', 'What I used on real projects, organized by what it’s for.')}
        </p>
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {needs.map(need => {
            const NeedIcon = ICONS[need.icon];
            return (
              <button
                key={need.id}
                onClick={() => setSelected(need.id)}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all flex items-center gap-2 lg:gap-3 ${selected === need.id
                  ? 'bg-teal-500/20 border border-teal-500/50 text-teal-300'
                  : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
              >
                <NeedIcon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm lg:text-base whitespace-nowrap lg:whitespace-normal">{need.title}</div>
                  <div className="hidden lg:block text-xs opacity-70 line-clamp-1">{need.need}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2">
        <AnimatePresence mode="wait">
          <MotionPanel
            key={selected}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-xl">
                <Icon className="w-10 h-10 text-teal-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl lg:text-3xl font-bold text-teal-400">{current.title}</h3>
                <p className="text-slate-400 text-sm">{current.need}</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed">{current.summary}</p>

            {current.signals && (
              <div className="overflow-x-auto rounded-xl border border-slate-700/50">
                <table className="w-full text-sm text-left min-w-[640px]">
                  <thead className="bg-slate-800/50 text-slate-300">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-semibold">{tx('Señal', 'Signal')}</th>
                      <th scope="col" className="px-3 py-2 font-semibold">{tx('Responde a', 'Answers')}</th>
                      <th scope="col" className="px-3 py-2 font-semibold">{tx('En las herramientas que usé', 'In the tools I used')}</th>
                      <th scope="col" className="px-3 py-2 font-semibold">{tx('Estándar del mercado', 'Industry standard')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {current.signals.map(s => (
                      <tr key={s.standard}>
                        <th scope="row" className="px-3 py-2 font-semibold text-teal-300 align-top">{s.signal}</th>
                        <td className="px-3 py-2 text-slate-300 align-top">{s.question}</td>
                        <td className="px-3 py-2 text-slate-300 align-top">{s.used}</td>
                        <td className="px-3 py-2 text-slate-400 align-top">{s.standard}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {current.tools.map(tool => (
                <div key={tool.name} className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Logo name={tool.name} />
                    <h4 className="font-bold text-slate-100">{tool.name}</h4>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{tool.what}</p>
                  {tool.usedAt.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{tx('Dónde lo usé', 'Where I used it')}</p>
                      <UsedAt projects={tool.usedAt} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {current.practice && (
              <div className="flex items-start gap-2 bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <Briefcase className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-400" aria-hidden="true" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-200">{tx('En mi trabajo: ', 'On the job: ')}</span>
                  {current.practice}
                </p>
              </div>
            )}

            {current.alternatives && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 space-y-2">
                <h4 className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Compass className="w-4 h-4" aria-hidden="true" />
                  {tx('Conviene conocerlas (no las usé en proyectos)', 'Worth knowing (not used on my projects)')}
                </h4>
                <ul className="space-y-1.5">
                  {current.alternatives.map(alt => (
                    <li key={alt.name} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                      <Logo name={alt.name} small />
                      <span>
                        <span className="font-semibold text-slate-200">{alt.name}: </span>
                        {alt.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </MotionPanel>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DevOpsToolbox;
