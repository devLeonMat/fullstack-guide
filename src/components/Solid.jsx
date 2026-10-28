import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Blocks } from './solid/LessonBlocks';
import { Inline } from './solid/Inline';
import Exercise from './solid/Exercise';
import PrincipleLesson from './solid/PrincipleLesson';
import Tabs from './solid/Tabs';
import { Pictogram, VisualMap } from './solid/Diagrams';
import { useSolidProgress } from './solid/useSolidProgress';
import { ACCENTS, FOCUS_RING } from './solid/theme';
import { buildIntro, buildLessons, buildReview } from './solid/lessons/index.js';

// ─── Progress ──────────────────────────────────────────────────────────────────

const ProgressBar = ({ lessons, completed, onReset, tx }) => {
  const done = lessons.filter(l => completed.includes(l.id)).length;
  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-slate-300" id="solid-progress-label">
          {tx('Tu progreso', 'Your progress')}: {done}/{lessons.length}
        </p>
        {done > 0 && (
          <button
            type="button"
            onClick={onReset}
            className={`inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 rounded ${FOCUS_RING}`}
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" />
            {tx('Reiniciar', 'Reset')}
          </button>
        )}
      </div>
      <div
        role="progressbar"
        aria-labelledby="solid-progress-label"
        aria-valuemin={0}
        aria-valuemax={lessons.length}
        aria-valuenow={done}
        className="h-1.5 rounded-full bg-slate-800 overflow-hidden"
      >
        <div className="h-full bg-violet-500 transition-all" style={{ width: `${(done / lessons.length) * 100}%` }} />
      </div>
      <ul className="flex justify-between" aria-hidden="true">
        {lessons.map(l => {
          const isDone = completed.includes(l.id);
          return (
            <li
              key={l.id}
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black border ${
                isDone ? 'bg-green-500/10 border-green-500/50 text-green-300' : 'border-slate-700 text-slate-500'
              }`}
            >
              {l.letter}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// ─── Intro: ¿Qué es SOLID? ─────────────────────────────────────────────────────

const PrincipleCards = ({ lessons, completed, onStart, tx }) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
    {lessons.map(l => {
      const accent = ACCENTS[l.color];
      const isDone = completed.includes(l.id);
      return (
        <li key={l.id} className={`flex flex-col rounded-xl border ${accent.border} bg-slate-800/30 p-4 space-y-3`}>
          <div className="flex items-start gap-3">
            <span className={`shrink-0 w-11 h-11 rounded-xl ${accent.bg} border ${accent.border} flex items-center justify-center text-2xl font-black ${accent.text}`} aria-hidden="true">
              {l.letter}
            </span>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-slate-100">{l.nameEn}</h4>
              <p className="text-xs text-slate-400">{tx('', 'ES: ')}{l.nameEs}</p>
            </div>
            {isDone && <CheckCircle className="ml-auto w-5 h-5 shrink-0 text-green-400" aria-label={tx('Completado', 'Completed')} />}
          </div>
          <Pictogram letter={l.letter} tx={tx} className={`w-full h-16 ${accent.text}`} />
          <p className="text-sm text-slate-300 leading-relaxed"><Inline text={l.definition} /></p>
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">{tx('Resuelve: ', 'Solves: ')}</span>
            <Inline text={l.solves} />
          </p>
          <button
            type="button"
            onClick={() => onStart(l.id)}
            className={`mt-auto inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border ${accent.border} ${accent.bg} text-sm font-semibold ${accent.text} hover:bg-slate-800/50 ${FOCUS_RING}`}
          >
            {isDone ? tx('Repasar', 'Review') : tx('Comenzar', 'Start')}
            <span className="sr-only"> {l.nameEn}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </li>
      );
    })}
  </ul>
);

const StudyPath = ({ intro, tx }) => (
  <div className="space-y-4">
    <ol className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {intro.path.map((item, i) => (
        <li key={item} className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2 text-xs text-slate-300">
          <span className="shrink-0 font-black text-violet-300">{i + 1}</span>
          {item}
        </li>
      ))}
    </ol>
    <p className="text-sm text-slate-400">
      {tx(
        'Cada principio tiene 10 pestañas: idea, diagrama, escenario, código incorrecto, por qué está mal, código corregido, comparación, Spring Boot, regla y ejercicio. Para repasar antes de una entrevista, ve directo a «Diagrama» y «Regla».',
        'Each principle has 10 tabs: idea, diagram, scenario, problematic code, why it is wrong, fixed code, comparison, Spring Boot, rule and exercise. To review before an interview, jump straight to "Diagram" and "Rule".'
      )}
    </p>
    <Blocks blocks={intro.notSolid} tx={tx} />
  </div>
);

const IntroView = ({ intro, lessons, completed, onStart, headingRef, tx }) => (
  <div className="space-y-6">
    <header className="relative space-y-2">
      <div className="absolute top-0 right-0 text-[56px] lg:text-[72px] font-black text-violet-500/10 select-none pointer-events-none leading-none" aria-hidden="true">
        SOLID
      </div>
      <h2 ref={headingRef} tabIndex={-1} className="relative z-10 text-xl lg:text-3xl font-bold text-white focus:outline-none">
        {tx('¿Qué es SOLID?', 'What is SOLID?')}
      </h2>
      <p className="relative z-10 text-slate-400 text-sm max-w-2xl">
        {tx(
          'Cinco principios explicados con problemas reales de banca, código Java que falla, cómo corregirlo y ejercicios para comprobar que lo entendiste.',
          'Five principles explained with real banking problems, Java code that fails, how to fix it and exercises to check your understanding.'
        )}
      </p>
    </header>

    <Tabs
      label={tx('Introducción a SOLID', 'Introduction to SOLID')}
      tx={tx}
      sticky
      items={[
        { id: 'what', label: tx('¿Qué es?', 'What is it?'), content: <Blocks blocks={intro.what} tx={tx} /> },
        { id: 'principles', label: tx('Los 5 principios', 'The 5 principles'), content: <PrincipleCards lessons={lessons} completed={completed} onStart={onStart} tx={tx} /> },
        { id: 'map', label: tx('Mapa visual', 'Visual map'), content: <VisualMap lessons={lessons} accents={ACCENTS} tx={tx} onOpen={onStart} /> },
        { id: 'analogy', label: tx('Analogía', 'Analogy'), content: <Blocks blocks={intro.analogy} tx={tx} /> },
        { id: 'study', label: tx('Cómo estudiar', 'How to study'), content: <StudyPath intro={intro} tx={tx} /> },
      ]}
    />
  </div>
);

// ─── Review: comparison table + mixed quiz ─────────────────────────────────────

const ComparisonTable = ({ lessons, tx }) => (
  <>
    <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-700/50">
      <table className="w-full min-w-[720px] text-xs text-left">
        <caption className="sr-only">{tx('Tabla comparativa de SOLID', 'SOLID comparison table')}</caption>
        <thead className="bg-slate-800/50">
          <tr>
            <th scope="col" className="px-3 py-2 text-slate-300">{tx('Principio', 'Principle')}</th>
            <th scope="col" className="px-3 py-2 text-slate-300">{tx('Pregunta clave', 'Key question')}</th>
            <th scope="col" className="px-3 py-2 text-slate-300">{tx('Señal de alerta', 'Warning sign')}</th>
            <th scope="col" className="px-3 py-2 text-slate-300">{tx('Solución típica', 'Typical fix')}</th>
            <th scope="col" className="px-3 py-2 text-slate-300">{tx('En esta guía', 'In this guide')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {lessons.map(l => (
            <tr key={l.id}>
              <th scope="row" className="px-3 py-2 align-top">
                <span className={`text-lg font-black ${ACCENTS[l.color].text}`}>{l.letter}</span>
                <span className="block text-slate-300 font-medium">{l.nameEn}</span>
              </th>
              <td className="px-3 py-2 align-top text-slate-200"><Inline text={l.summary.question} /></td>
              <td className="px-3 py-2 align-top text-slate-400"><Inline text={l.summary.signal} /></td>
              <td className="px-3 py-2 align-top text-slate-400"><Inline text={l.summary.solution} /></td>
              <td className="px-3 py-2 align-top text-slate-400 font-mono text-[11px]">{l.summary.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <ul className="md:hidden space-y-2">
      {lessons.map(l => (
        <li key={l.id} className={`rounded-xl border ${ACCENTS[l.color].border} bg-slate-800/30 p-3 space-y-1.5 text-xs`}>
          <p className="text-sm font-bold text-slate-100">
            <span className={`font-black ${ACCENTS[l.color].text}`}>{l.letter}</span> — {l.nameEn}
          </p>
          <p className="text-slate-200"><Inline text={l.summary.question} /></p>
          <p className="text-slate-400"><span className="font-semibold text-slate-300">{tx('Señal: ', 'Sign: ')}</span><Inline text={l.summary.signal} /></p>
          <p className="text-slate-400"><span className="font-semibold text-slate-300">{tx('Solución: ', 'Fix: ')}</span><Inline text={l.summary.solution} /></p>
        </li>
      ))}
    </ul>
  </>
);

const LensCompare = ({ review, lessons, tx }) => (
  <div className="space-y-3">
    <p className="text-sm text-slate-300 leading-relaxed">
      <Inline text={tx(
        'Los tres hablan de interfaces, por eso se confunden. Pero miran cosas diferentes. Tomemos `CuentaRepository`:',
        'All three talk about interfaces, which is why they get mixed up. But they look at different things. Take `CuentaRepository`:'
      )} />
    </p>
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {review.lens.map(item => {
        const accent = ACCENTS[lessons.find(l => l.letter === item.letter).color];
        return (
          <li key={item.letter} className={`rounded-xl border ${accent.border} bg-slate-800/30 p-4 space-y-2`}>
            <p className={`text-2xl font-black ${accent.text}`} aria-hidden="true">{item.letter}</p>
            <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
            <p className="text-sm text-slate-300"><Inline text={item.question} /></p>
            <p className="text-xs text-slate-400 leading-relaxed"><Inline text={item.example} /></p>
          </li>
        );
      })}
    </ul>
    <p className="rounded-xl border-l-4 border-violet-500 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-slate-100">
      {tx('Para recordarlo: LSP = comportamiento · ISP = tamaño · DIP = dirección.', 'To remember: LSP = behavior · ISP = size · DIP = direction.')}
    </p>
  </div>
);

const ReviewView = ({ review, lessons, headingRef, tx }) => {
  const [solved, setSolved] = useState([]);
  const quiz = review.quiz.map(q => ({
    id: q.id,
    prompt: q.prompt,
    options: lessons.map(l => ({
      id: l.letter,
      text: `**${l.letter}** — ${l.nameEn}`,
      correct: l.letter === q.answer,
      explanation: l.letter === q.answer
        ? q.explanation
        : tx(
          `${l.letter} revisa ${l.focus}. No es el problema central de este caso.`,
          `${l.letter} checks ${l.focus}. That is not the core problem here.`
        ),
    })),
  }));
  const onSolved = (id) => setSolved(prev => (prev.includes(id) ? prev : [...prev, id]));

  const quizPanel = (
    <div className="space-y-3">
      <p className="text-sm text-slate-400">
        {tx('Elige la letra que mejor describe el problema principal de cada caso.', 'Pick the letter that best describes each case\'s main problem.')}
        {' '}<span className="font-semibold text-slate-300">{solved.length}/{quiz.length}</span>
      </p>
      <Tabs
        variant="secondary"
        label={tx('Casos del repaso', 'Review cases')}
        tx={tx}
        items={quiz.map((q, i) => ({
          id: q.id,
          label: <>{tx('Caso', 'Case')} {i + 1}{solved.includes(q.id) && <CheckCircle className="w-3.5 h-3.5 text-green-400" aria-label={tx('resuelto', 'solved')} />}</>,
          navLabel: `${tx('Caso', 'Case')} ${i + 1}`,
          content: <Exercise question={q} number={i + 1} tx={tx} onSolved={onSolved} />,
        }))}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 ref={headingRef} tabIndex={-1} className="text-xl lg:text-3xl font-bold text-white focus:outline-none">
          {tx('Resumen y repaso', 'Summary and review')}
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          {tx('Los cinco principios lado a lado, cómo distinguir los que involucran interfaces y un repaso final.', 'The five principles side by side, how to tell apart those that involve interfaces, and a final review.')}
        </p>
      </header>

      <Tabs
        label={tx('Resumen de SOLID', 'SOLID summary')}
        tx={tx}
        sticky
        items={[
          { id: 'map', label: tx('Mapa visual', 'Visual map'), content: <VisualMap lessons={lessons} accents={ACCENTS} tx={tx} /> },
          { id: 'table', label: tx('Tabla comparativa', 'Comparison table'), content: <ComparisonTable lessons={lessons} tx={tx} /> },
          { id: 'lens', label: 'LSP vs ISP vs DIP', content: <LensCompare review={review} lessons={lessons} tx={tx} /> },
          { id: 'quiz', label: tx('Quiz final', 'Final quiz'), content: quizPanel },
          { id: 'tips', label: tx('SOLID con criterio', 'SOLID with judgment'), content: <Blocks blocks={[{ type: 'list', items: review.tips }]} tx={tx} /> },
        ]}
      />
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

function Solid() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('intro');
  const { completed, markCompleted, resetProgress } = useSolidProgress();
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const navigated = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const lessons = useMemo(() => buildLessons(tx), [language]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const intro = useMemo(() => buildIntro(tx), [language]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const review = useMemo(() => buildReview(tx), [language]);

  const sections = [
    { id: 'intro', label: tx('¿Qué es SOLID?', 'What is SOLID?'), subtitle: tx('Introducción y mapa', 'Introduction and map') },
    ...lessons.map(l => ({ id: l.id, letter: l.letter, label: `${l.letter} — ${l.nameEn.replace(' Principle', '')}`, subtitle: l.nameEs })),
    { id: 'review', label: tx('Resumen y repaso', 'Summary and review'), subtitle: tx('Tabla + quiz final', 'Table + final quiz') },
  ];

  // Move focus and scroll to the new content after the learner navigates
  useEffect(() => {
    if (!navigated.current) return;
    contentRef.current?.scrollTo?.({ top: 0 });
    const top = contentRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) contentRef.current.scrollIntoView({ block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [active]);

  const navigate = (id) => {
    navigated.current = true;
    setActive(id);
  };

  const index = sections.findIndex(s => s.id === active);
  const prev = index > 0 ? sections[index - 1] : null;
  const next = index < sections.length - 1 ? sections[index + 1] : null;
  const currentLesson = lessons.find(l => l.id === active);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2 space-y-3">
        <ProgressBar lessons={lessons} completed={completed} onReset={resetProgress} tx={tx} />
        <nav aria-label={tx('Secciones de SOLID', 'SOLID sections')}>
          <ul className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0">
            {sections.map(s => {
              const isActive = active === s.id;
              const isDone = completed.includes(s.id);
              return (
                <li key={s.id} className="flex-shrink-0 lg:w-full">
                  <button
                    type="button"
                    onClick={() => navigate(s.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${FOCUS_RING} ${
                      isActive
                        ? 'bg-violet-500/20 border border-violet-500/40 text-violet-300'
                        : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold text-sm whitespace-nowrap lg:whitespace-normal">
                      {s.label}
                      {isDone && (
                        <CheckCircle className="w-3.5 h-3.5 shrink-0 text-green-400" aria-label={tx('completado', 'completed')} />
                      )}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 hidden lg:block">{s.subtitle}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div ref={contentRef} className="lg:col-span-3 lg:overflow-y-auto lg:pr-2 scroll-mt-4">
        <div key={active}>
          {active === 'intro' && (
            <IntroView intro={intro} lessons={lessons} completed={completed} onStart={navigate} headingRef={headingRef} tx={tx} />
          )}
          {currentLesson && (
            <PrincipleLesson
              key={currentLesson.id}
              lesson={currentLesson}
              tx={tx}
              headingRef={headingRef}
              completed={completed.includes(currentLesson.id)}
              onComplete={markCompleted}
              prev={prev}
              next={next}
              onNavigate={navigate}
            />
          )}
          {active === 'review' && (
            <ReviewView review={review} lessons={lessons} headingRef={headingRef} tx={tx} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Solid;
