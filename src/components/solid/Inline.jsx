// Renders `code` and **bold** inside plain lesson text.
export function Inline({ text }) {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="px-1 py-0.5 rounded bg-slate-800/70 text-violet-300 font-mono text-[0.85em] [overflow-wrap:anywhere]">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.length > 4 && part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-slate-100"><Inline text={part.slice(2, -2)} /></strong>;
        }
        return part;
      })}
    </>
  );
}
