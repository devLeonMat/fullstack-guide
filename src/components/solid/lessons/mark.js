// Turns a code template into { code, highlight }.
// Lines starting with "!" are highlighted (the marker itself is removed),
// so line numbers never drift when the example changes.
export function mark(source) {
  const highlight = [];
  const lines = source.replace(/^\n/, '').replace(/\s+$/, '').split('\n');
  const code = lines
    .map((line, i) => {
      if (line.startsWith('!')) {
        highlight.push(i + 1);
        return line.slice(1);
      }
      return line;
    })
    .join('\n');
  return { code, highlight };
}

// Shorthand for a Java code block.
export function java(source, extra = {}) {
  return { type: 'code', lang: 'java', ...mark(source), ...extra };
}
