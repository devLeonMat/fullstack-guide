import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Trophy } from 'lucide-react';
import { Blocks } from './LessonBlocks';
import Exercise from './Exercise';
import { ACCENTS, FOCUS_RING } from './theme';
import { STEP_KEYS } from './lessons/index.js';

function stepMeta(tx) {
  return {
    simple: { title: tx('Explicación sencilla', 'Plain explanation'), short: tx('Idea', 'Idea') },
    scenario: { title: tx('Escenario real', 'Real scenario'), short: tx('Escenario', 'Scenario') },
    bad: { title: tx('Código incorrecto', 'Problematic code'), short: tx('Código ❌', 'Code ❌') },
    why: { title: tx('¿Por qué está mal?', 'Why is it wrong?'), short: tx('Por qué', 'Why') },
    fix: { title: tx('Código corregido, paso a paso', 'Fixed code, step by step'), short: tx('Código ✅', 'Code ✅') },
    compare: { title: tx('Comparación: antes vs. después', 'Comparison: before vs. after'), short: tx('Comparar', 'Compare') },
    professional: { title: tx('Aplicación profesional con Spring Boot', 'Professional use with Spring Boot'), short: 'Spring Boot' },
    rule: { title: tx('Regla para recordarlo', 'Rule to remember'), short: tx('Regla', 'Rule') },
    exercise: { title: tx('Ejercicio interactivo', 'Interactive exercise'), short: tx('Ejercicio', 'Exercise') },
  };
}

function NavButton({ target, direction, onNavigate, tx }) {
  if (!target) return <span />;
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={() => onNavigate(target.id)}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-800/30 text-sm text-slate-300 hover:bg-slate-800/50 ${FOCUS_RING} ${direction === 'next' ? 'ml-auto' : ''}`}
    >
      {direction === 'prev' && <Icon className="w-4 h-4" aria-hidden="true" />}
      <span>
        <span className="block text-[10px] uppercase tracking-wider text-slate-500 text-left">
          {direction === 'prev' ? tx('Anterior', 'Previous') : tx('Siguiente', 'Next')}
        </span>
        {target.label}
      </span>
      {direction === 'next' && <Icon className="w-4 h-4" aria-hidden="true" />}
    </button>
  );
}

function PrincipleLesson({ lesson, tx, headingRef, completed, onComplete, prev, next, onNavigate }) {
  const [solved, setSolved] = useState([]);
  const meta = stepMeta(tx);
  const accent = ACCENTS[lesson.color];
  const keys = [...STEP_KEYS, 'exercise'];
  const sectionId = (n) => `solid-${lesson.id}-paso-${n}`;

  const handleSolved = (questionId) => {
    const nextSolved = solved.includes(questionId) ? solved : [...solved, questionId];
    setSolved(nextSolved);
    if (nextSolved.length === lesson.exercises.length) onComplete(lesson.id);
  };

  const scrollToStep = (n) => {
    const el = document.getElementById(sectionId(n));
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.focus({ preventScroll: true });
  };

  return (
    <article className="space-y-8" aria-labelledby={`solid-${lesson.id}-title`}>
      {/* Header */}
      <header className="relative space-y-3">
        <div className={`absolute top-0 right-0 text-[96px] lg:text-[120px] font-black leading-none select-none pointer-events-none opacity-20 ${accent.text}`} aria-hidden="true">
          {lesson.letter}
        </div>
        <div className="relative z-10 space-y-1">
          <p className={`text-xs font-semibold uppercase tracking-wider ${accent.text}`}>{tx('', 'ES: ')}{lesson.nameEs}</p>
          <h2
            id={`solid-${lesson.id}-title`}
            ref={headingRef}
            tabIndex={-1}
            className="text-xl lg:text-3xl font-bold text-white focus:outline-none"
          >
            {lesson.letter} — {lesson.nameEn}
          </h2>
          <p className="text-slate-300 text-sm lg:text-base max-w-2xl">“{lesson.tagline}”</p>
        </div>
        {completed && (
          <p className="relative z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-xs font-semibold text-green-300">
            <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
            {tx('Principio completado', 'Principle completed')}
          </p>
        )}
      </header>

      {/* Step navigator */}
      <nav aria-label={tx('Pasos de la lección', 'Lesson steps')}>
        <ol className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {keys.map((key, i) => (
            <li key={key} className="shrink-0">
              <button
                type="button"
                onClick={() => scrollToStep(i + 1)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700/50 bg-slate-800/30 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 ${FOCUS_RING}`}
              >
                <span className={`font-bold ${accent.text}`}>{i + 1}</span>
                {meta[key].short}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Steps */}
      {keys.map((key, i) => (
        <section
          key={key}
          id={sectionId(i + 1)}
          tabIndex={-1}
          aria-labelledby={`${sectionId(i + 1)}-title`}
          className="scroll-mt-4 space-y-4 focus:outline-none"
        >
          <h3 id={`${sectionId(i + 1)}-title`} className="flex items-center gap-3 text-base lg:text-lg font-bold text-slate-100">
            <span className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-lg border ${accent.border} ${accent.bg} text-sm ${accent.text}`}>
              {i + 1}
            </span>
            <span>
              <span className="sr-only">{tx('Paso', 'Step')} {i + 1}: </span>
              {meta[key].title}
            </span>
          </h3>

          {key === 'exercise' ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                {tx(
                  'Responde sin volver a mirar el código. Si fallas, lee la explicación e inténtalo otra vez.',
                  'Answer without looking back at the code. If you miss, read the explanation and try again.'
                )}
              </p>
              {lesson.exercises.map((q, n) => (
                <Exercise key={q.id} question={q} number={n + 1} tx={tx} onSolved={handleSolved} />
              ))}
              {completed && (
                <div className="flex items-start gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4" role="status">
                  <Trophy className="w-5 h-5 shrink-0 text-green-300" aria-hidden="true" />
                  <p className="text-sm text-slate-200">
                    {tx(
                      `¡Completaste ${lesson.letter}! Ya sabes identificar y corregir violaciones de ${lesson.nameEn}.`,
                      `You completed ${lesson.letter}! You can now spot and fix ${lesson.nameEn} violations.`
                    )}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <Blocks blocks={lesson.steps[key]} tx={tx} />
          )}
        </section>
      ))}

      <nav aria-label={tx('Navegación entre principios', 'Principle navigation')} className="flex gap-3 pt-4 border-t border-slate-800">
        <NavButton target={prev} direction="prev" onNavigate={onNavigate} tx={tx} />
        <NavButton target={next} direction="next" onNavigate={onNavigate} tx={tx} />
      </nav>
    </article>
  );
}

export default PrincipleLesson;
