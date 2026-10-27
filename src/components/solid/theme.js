// Full class names (not interpolated) so Tailwind can detect them.
export const ACCENTS = {
  violet: { text: 'text-violet-300', border: 'border-violet-500/40', bg: 'bg-violet-500/10', bar: 'bg-violet-500' },
  blue: { text: 'text-blue-300', border: 'border-blue-500/40', bg: 'bg-blue-500/10', bar: 'bg-blue-500' },
  indigo: { text: 'text-indigo-300', border: 'border-indigo-500/40', bg: 'bg-indigo-500/10', bar: 'bg-indigo-500' },
  cyan: { text: 'text-cyan-300', border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', bar: 'bg-cyan-500' },
  emerald: { text: 'text-emerald-300', border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', bar: 'bg-emerald-500' },
};

export const TONES = {
  info: { box: 'bg-blue-500/10 border-blue-500/30', title: 'text-blue-300' },
  tip: { box: 'bg-slate-800/30 border-slate-700/50', title: 'text-slate-200' },
  warning: { box: 'bg-amber-500/10 border-amber-500/30', title: 'text-amber-300' },
  danger: { box: 'bg-red-500/10 border-red-500/30', title: 'text-red-300' },
  success: { box: 'bg-green-500/10 border-green-500/30', title: 'text-green-300' },
  good: { box: 'bg-green-500/10 border-green-500/30', title: 'text-green-300' },
  bad: { box: 'bg-red-500/10 border-red-500/30', title: 'text-red-300' },
};

export const FOCUS_RING = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';
