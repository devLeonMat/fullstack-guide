import { useId, useRef, useState } from 'react';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import CodeBlock from '../CodeBlock';
import { Inline } from './Inline';
import { FOCUS_RING } from './theme';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Multiple-choice question. The correct answer is never revealed before the
// learner picks it; wrong picks get their own explanation and can be retried.
function Exercise({ question, number, tx, onSolved }) {
  const [wrong, setWrong] = useState([]);
  const [last, setLast] = useState(null);
  const [solved, setSolved] = useState(false);
  const optionRefs = useRef([]);
  const promptId = useId();

  const lastOption = question.options.find(o => o.id === last);

  const choose = (option) => {
    if (solved || wrong.includes(option.id)) return;
    setLast(option.id);
    if (option.correct) {
      setSolved(true);
      onSolved?.(question.id);
    } else {
      setWrong(prev => [...prev, option.id]);
    }
  };

  const focusFirstAvailable = (exclude = []) => {
    const index = question.options.findIndex(o => !exclude.includes(o.id));
    requestAnimationFrame(() => optionRefs.current[index]?.focus());
  };

  const retry = () => {
    setLast(null);
    focusFirstAvailable(wrong);
  };

  const reset = () => {
    setWrong([]);
    setLast(null);
    setSolved(false);
    focusFirstAvailable();
  };

  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 space-y-3">
      <p id={promptId} className="text-sm text-slate-200 leading-relaxed">
        <span className="font-bold text-violet-300 mr-1">{tx('Pregunta', 'Question')} {number}.</span>
        <Inline text={question.prompt} />
      </p>

      {question.code && (
        <CodeBlock code={question.code} language="java" collapsible={false} />
      )}

      <fieldset className="space-y-2" aria-describedby={promptId}>
        <legend className="sr-only">{tx('Elige una respuesta', 'Choose an answer')}</legend>
        {question.options.map((option, i) => {
          const isWrong = wrong.includes(option.id);
          const isCorrect = solved && option.correct;
          const dimmed = solved && !option.correct;
          let style = 'bg-slate-900/50 border-slate-700/50 text-slate-200 hover:border-violet-500/50 hover:bg-slate-800/50';
          if (isCorrect) style = 'bg-green-500/10 border-green-500/50 text-slate-100';
          else if (isWrong) style = 'bg-red-500/10 border-red-500/40 text-slate-400';
          else if (dimmed) style = 'bg-slate-900/50 border-slate-700/50 text-slate-500';
          return (
            <button
              key={option.id}
              ref={el => { optionRefs.current[i] = el; }}
              type="button"
              onClick={() => choose(option)}
              aria-disabled={solved || isWrong}
              aria-pressed={last === option.id}
              className={`w-full flex items-start gap-3 text-left px-3 py-2.5 rounded-lg border text-sm transition-colors ${solved || isWrong ? 'cursor-default' : ''} ${FOCUS_RING} ${style}`}
            >
              <span className="shrink-0 w-6 h-6 rounded-md bg-slate-800/70 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                {isCorrect ? <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                  : isWrong ? <XCircle className="w-4 h-4 text-red-400" aria-hidden="true" />
                    : LETTERS[i]}
              </span>
              <span className="leading-relaxed">
                <Inline text={option.text} />
                {isWrong && <span className="sr-only"> — {tx('incorrecta', 'incorrect')}</span>}
                {isCorrect && <span className="sr-only"> — {tx('correcta', 'correct')}</span>}
              </span>
            </button>
          );
        })}
      </fieldset>

      <div aria-live="polite" className="space-y-3">
        {lastOption && !lastOption.correct && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 space-y-2">
            <p className="text-sm font-bold text-red-300">{tx('No es la respuesta correcta', 'Not the right answer')}</p>
            <p className="text-sm text-slate-300 leading-relaxed"><Inline text={lastOption.explanation} /></p>
            <button
              type="button"
              onClick={retry}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-600 bg-slate-800/50 text-xs font-semibold text-slate-200 hover:bg-slate-800 ${FOCUS_RING}`}
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              {tx('Intentar de nuevo', 'Try again')}
            </button>
          </div>
        )}

        {solved && lastOption && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 space-y-3">
            <p className="text-sm font-bold text-green-300">{tx('¡Correcto!', 'Correct!')}</p>
            <p className="text-sm text-slate-300 leading-relaxed"><Inline text={lastOption.explanation} /></p>
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {tx('¿Por qué no las otras opciones?', 'Why not the other options?')}
              </p>
              <ul className="space-y-1.5">
                {question.options.filter(o => !o.correct).map(o => (
                  <li key={o.id} className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-300">{LETTERS[question.options.indexOf(o)]}.</span>{' '}
                    <Inline text={o.explanation} />
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={reset}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-600 bg-slate-800/50 text-xs font-semibold text-slate-200 hover:bg-slate-800 ${FOCUS_RING}`}
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              {tx('Reiniciar ejercicio', 'Restart exercise')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Exercise;
