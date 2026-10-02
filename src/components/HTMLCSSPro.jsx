import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode2, Box, LayoutGrid, Smartphone, Sparkles, Rocket, CheckCircle, XCircle } from 'lucide-react';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';

// ─── Box Model Diagram ───────────────────────────────────────────────────────────

const BoxModelDiagram = ({ tx }) => {
  const [active, setActive] = useState(0);

  const layers = [
    { label: tx('Contenido', 'Content'), color: 'bg-blue-500/30 border-blue-400/60', text: 'text-blue-300' },
    { label: 'Padding', color: 'bg-green-500/20 border-green-400/50', text: 'text-green-300' },
    { label: 'Border', color: 'bg-yellow-500/20 border-yellow-400/50', text: 'text-yellow-300' },
    { label: 'Margin', color: 'bg-orange-500/15 border-orange-400/40', text: 'text-orange-300' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % layers.length), 1500);
    return () => clearInterval(id);
  }, [layers.length]);

  const pad = [0, 14, 28, 42];

  return (
    <div className="bg-slate-950/40 border border-lime-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-lime-400 uppercase tracking-wider">
        {tx('Modelo de Caja — de adentro hacia afuera', 'Box Model — from the inside out')}
      </p>
      <div className="relative flex items-center justify-center" style={{ height: 220 }}>
        {[3, 2, 1, 0].map(i => (
          <motion.div
            key={i}
            animate={{
              boxShadow: active === i ? '0 0 20px rgba(163,230,53,0.4)' : '0 0 0px transparent',
              opacity: active === i ? 1 : 0.55,
            }}
            transition={{ duration: 0.4 }}
            className={`absolute border rounded-lg flex items-start justify-center pt-1 ${layers[i].color}`}
            style={{
              width: 260 - pad[3 - i] * 2,
              height: 170 - pad[3 - i] * 2,
            }}
          >
            <span className={`text-xs font-bold ${layers[i].text}`}>{layers[i].label}</span>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-slate-500">
        {tx('width/height sólo afecta al contenido salvo con box-sizing: border-box', 'width/height only affects content unless box-sizing: border-box is set')}
      </p>
    </div>
  );
};

// ─── Specificity Diagram ─────────────────────────────────────────────────────────

const SpecificityDiagram = ({ tx }) => {
  const [active, setActive] = useState(0);

  const rules = [
    { label: 'p { color: blue; }', specificity: '0,0,0,1', weight: 1, kind: tx('Elemento', 'Element') },
    { label: '.title { color: green; }', specificity: '0,0,1,0', weight: 2, kind: 'Class' },
    { label: '#main .title { color: red; }', specificity: '0,1,1,0', weight: 3, kind: tx('ID + Class', 'ID + Class') },
    { label: 'style="color: purple"', specificity: '1,0,0,0', weight: 4, kind: 'Inline' },
  ];

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % rules.length), 1700);
    return () => clearInterval(id);
  }, [rules.length]);

  return (
    <div className="bg-slate-950/40 border border-lime-500/20 rounded-xl p-4 space-y-3">
      <p className="text-center text-xs font-semibold text-lime-400 uppercase tracking-wider">
        {tx('Especificidad — gana el peso mayor', 'Specificity — highest weight wins')}
      </p>
      <div className="space-y-1.5">
        {rules.map((rule, i) => (
          <motion.div
            key={i}
            animate={{
              boxShadow: active === i ? '0 0 16px rgba(163,230,53,0.35)' : '0 0 0px transparent',
              scale: active === i ? 1.02 : 1,
              opacity: active === i ? 1 : 0.5,
            }}
            transition={{ duration: 0.35 }}
            className="flex items-center justify-between gap-2 border border-slate-700/60 bg-slate-900/50 rounded-lg px-3 py-2"
          >
            <code className="text-xs text-slate-300 font-mono truncate">{rule.label}</code>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-slate-500 hidden sm:inline">{rule.kind}</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-lime-500/10 text-lime-300 border border-lime-500/30">
                {rule.specificity}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center text-xs text-slate-500"
        >
          {active === rules.length - 1
            ? tx('Inline y !important casi siempre ganan — evítalos', 'Inline and !important almost always win — avoid them')
            : tx('A mayor especificidad, más difícil de sobrescribir', 'The higher the specificity, the harder to override')}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

function HTMLCSSPro() {
  const { language } = useLanguage();
  const tx = (es, en) => language === 'en' ? en : es;
  const [active, setActive] = useState('html');

  const sections = [
    { id: 'html', title: tx('Fundamentos HTML', 'HTML Fundamentals'), subtitle: tx('Estructura y semántica', 'Structure & semantics'), icon: FileCode2 },
    { id: 'css', title: tx('Fundamentos CSS', 'CSS Fundamentals'), subtitle: tx('Box model, selectores', 'Box model, selectors'), icon: Box },
    { id: 'layout', title: 'Flexbox & Grid', subtitle: tx('Layouts modernos', 'Modern layouts'), icon: LayoutGrid },
    { id: 'responsive', title: tx('Responsive', 'Responsive'), subtitle: tx('Media queries, BEM', 'Media queries, BEM'), icon: Smartphone },
    { id: 'advanced', title: tx('CSS Avanzado', 'Advanced CSS'), subtitle: tx('Variables, animaciones', 'Variables, animations'), icon: Sparkles },
    { id: 'modern', title: tx('Moderno & Performance', 'Modern & Performance'), subtitle: 'Container queries, :has()', icon: Rocket },
  ];

  // ─── Section: HTML Fundamentals ────────────────────────────────────────────

  const renderHtml = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Fundamentos de HTML', 'HTML Fundamentals')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Las bases que toda entrevista técnica revisa primero: estructura, semántica y accesibilidad.',
            'The basics every technical interview checks first: structure, semantics and accessibility.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: tx('Estructura del documento', 'Document structure'),
            points: [
              '<!DOCTYPE html> → modo estándar (no quirks)',
              tx('html > head > body: jerarquía obligatoria', 'html > head > body: mandatory hierarchy'),
              '<meta charset="UTF-8"> y <meta name="viewport">',
              tx('<head> = metadatos, no se renderiza', '<head> = metadata, not rendered'),
            ],
          },
          {
            title: tx('HTML Semántico', 'Semantic HTML'),
            points: [
              '<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>',
              tx('Un <div> no dice nada; <article> sí', 'A <div> says nothing; <article> does'),
              tx('Mejora SEO y accesibilidad (lectores de pantalla)', 'Improves SEO and accessibility (screen readers)'),
              tx('Solo un <main> por página', 'Only one <main> per page'),
            ],
          },
          {
            title: tx('Block vs Inline vs Inline-block', 'Block vs Inline vs Inline-block'),
            points: [
              tx('Block: ocupa todo el ancho, nueva línea (div, p, h1-h6, ul)', 'Block: full width, new line (div, p, h1-h6, ul)'),
              tx('Inline: sigue el flujo del texto (span, a, strong, em)', 'Inline: flows with text (span, a, strong, em)'),
              tx('Inline-block: fluye como inline pero acepta width/height', 'Inline-block: flows like inline but accepts width/height'),
              tx('No se pueden anidar elementos block dentro de <p>', "Block elements can't nest inside <p>"),
            ],
          },
          {
            title: tx('Formularios & Accesibilidad', 'Forms & Accessibility'),
            points: [
              tx('<label for="id"> vincula etiqueta e input (clic y lector de pantalla)', '<label for="id"> links label and input (click + screen reader)'),
              tx('Tipos de input: email, tel, number, date — validación nativa', 'Input types: email, tel, number, date — native validation'),
              '<fieldset> + <legend> agrupan campos relacionados',
              tx('Atributos ARIA solo cuando HTML semántico no alcanza', 'ARIA attributes only when semantic HTML is not enough'),
            ],
          },
        ].map((card, i) => (
          <div key={i} className="border border-lime-500/20 bg-slate-900/40 rounded-xl p-4">
            <h3 className="font-bold text-lime-300 text-sm mb-2">{card.title}</h3>
            <ul className="space-y-1.5">
              {card.points.map((p, pi) => (
                <li key={pi} className="text-xs text-slate-400 flex gap-2">
                  <span className="text-lime-500 flex-shrink-0">▸</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <CodeBlock language="html" code={`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Página semántica</title>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h1>Título del artículo</h1>
      <section>
        <h2>Sección</h2>
        <p>Contenido...</p>
      </section>
    </article>

    <aside>Contenido relacionado</aside>
  </main>

  <footer>&copy; 2026</footer>
</body>
</html>

<!-- Formulario accesible -->
<form>
  <fieldset>
    <legend>Datos de contacto</legend>
    <label for="email">Email</label>
    <input id="email" type="email" required />
  </fieldset>
</form>`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border border-red-500/30 bg-red-500/5 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-bold text-red-300">{tx('Pregunta trampa', 'Trick question')}</span>
          </div>
          <p className="text-xs text-slate-400">
            {tx('¿<b> y <strong> se ven igual, son lo mismo? No: <strong> tiene significado semántico (importancia), <b> es solo estilo visual.', '<b> and <strong> look alike — same thing? No: <strong> carries semantic meaning (importance), <b> is purely visual.')}
          </p>
        </div>
        <div className="border border-green-500/30 bg-green-500/5 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-xs font-bold text-green-300">{tx('Tip de entrevista', 'Interview tip')}</span>
          </div>
          <p className="text-xs text-slate-400">
            {tx('defer vs async en <script>: defer ejecuta en orden tras parsear el DOM; async ejecuta en cuanto descarga, sin orden garantizado.', 'defer vs async on <script>: defer runs in order after DOM parsing; async runs as soon as it downloads, order not guaranteed.')}
          </p>
        </div>
      </div>
    </div>
  );

  // ─── Section: CSS Fundamentals ──────────────────────────────────────────────

  const renderCss = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Fundamentos de CSS', 'CSS Fundamentals')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Box model, selectores, especificidad y posicionamiento: la base de todo lo demás.',
            'Box model, selectors, specificity and positioning: the foundation for everything else.'
          )}
        </p>
      </div>

      <BoxModelDiagram tx={tx} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: 'box-sizing',
            points: [
              tx('content-box (default): width/height = solo contenido', 'content-box (default): width/height = content only'),
              tx('border-box: width/height incluye padding + border', 'border-box: width/height includes padding + border'),
              tx('* { box-sizing: border-box } es casi un estándar de facto', '* { box-sizing: border-box } is almost a de-facto standard'),
            ],
          },
          {
            title: tx('Selectores', 'Selectors'),
            points: [
              'elemento, .clase, #id, [atributo]',
              tx('Combinadores: A B (descendiente), A > B (hijo directo), A + B (hermano adyacente), A ~ B (hermano general)', 'Combinators: A B (descendant), A > B (direct child), A + B (adjacent sibling), A ~ B (general sibling)'),
              tx('Pseudo-clases: :hover, :focus, :nth-child()', 'Pseudo-classes: :hover, :focus, :nth-child()'),
            ],
          },
          {
            title: tx('Especificidad & Cascada', 'Specificity & Cascade'),
            points: [
              tx('Orden de peso: inline > ID > clase/atributo/pseudo-clase > elemento', 'Weight order: inline > ID > class/attribute/pseudo-class > element'),
              tx('Misma especificidad → gana la regla declarada después', 'Same specificity → the later declared rule wins'),
              tx('!important rompe la cascada — úsalo como último recurso', '!important breaks the cascade — use as a last resort'),
            ],
          },
          {
            title: tx('Display & Position', 'Display & Position'),
            points: [
              tx('display: block | inline | inline-block | none | flex | grid', 'display: block | inline | inline-block | none | flex | grid'),
              tx('position: static (default) | relative | absolute | fixed | sticky', 'position: static (default) | relative | absolute | fixed | sticky'),
              tx('absolute se posiciona respecto al ancestro posicionado más cercano', 'absolute positions relative to the nearest positioned ancestor'),
            ],
          },
        ].map((card, i) => (
          <div key={i} className="border border-lime-500/20 bg-slate-900/40 rounded-xl p-4">
            <h3 className="font-bold text-lime-300 text-sm mb-2">{card.title}</h3>
            <ul className="space-y-1.5">
              {card.points.map((p, pi) => (
                <li key={pi} className="text-xs text-slate-400 flex gap-2">
                  <span className="text-lime-500 flex-shrink-0">▸</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <CodeBlock language="css" code={`/* Box model con border-box */
* {
  box-sizing: border-box; /* width incluye padding + border */
}

.card {
  width: 300px;
  padding: 16px;
  border: 2px solid #333;
  margin: 12px; /* el margin NUNCA se incluye en el width */
}

/* Especificidad: de menor a mayor peso */
p { color: blue; }                 /* 0,0,0,1 */
.title { color: green; }           /* 0,0,1,0 */
#main .title { color: red; }       /* 0,1,1,0 → gana */

/* Position */
.header { position: sticky; top: 0; }   /* se pega al hacer scroll */
.modal  { position: fixed; inset: 0; }  /* fijo al viewport */
.badge  {
  position: absolute;
  top: -8px; right: -8px; /* respecto al ancestro .parent (relative) */
}
.parent { position: relative; }`} />
    </div>
  );

  // ─── Section: Flexbox & Grid ────────────────────────────────────────────────

  const renderLayout = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">Flexbox & Grid</h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Flexbox para layouts en 1 dimensión, Grid para 2 dimensiones. Saber cuándo usar cada uno es clave en entrevistas.',
            '1-dimensional layouts with Flexbox, 2-dimensional with Grid. Knowing when to use each is key in interviews.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-lime-500/20 bg-slate-900/40 rounded-xl p-4">
          <h3 className="font-bold text-lime-300 text-sm mb-2">Flexbox (1D)</h3>
          <ul className="space-y-1.5">
            {[
              tx('flex-direction: row | column — eje principal', 'flex-direction: row | column — main axis'),
              tx('justify-content: alinea en el eje principal', 'justify-content: aligns on the main axis'),
              tx('align-items: alinea en el eje cruzado', 'align-items: aligns on the cross axis'),
              tx('flex-grow/shrink/basis — cómo se reparte el espacio', 'flex-grow/shrink/basis — how space is distributed'),
              'gap: espacio entre items sin necesitar margin',
            ].map((p, i) => (
              <li key={i} className="text-xs text-slate-400 flex gap-2">
                <span className="text-lime-500 flex-shrink-0">▸</span><span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-lime-500/20 bg-slate-900/40 rounded-xl p-4">
          <h3 className="font-bold text-lime-300 text-sm mb-2">Grid (2D)</h3>
          <ul className="space-y-1.5">
            {[
              'grid-template-columns / grid-template-rows',
              tx('fr: fracción del espacio disponible (1fr 2fr = 1/3 y 2/3)', 'fr: fraction of available space (1fr 2fr = 1/3 and 2/3)'),
              'grid-template-areas — layouts nombrados y legibles',
              'repeat(auto-fit, minmax(200px, 1fr)) — grids responsivos sin media queries',
              tx('grid-column / grid-row — posicionar items explícitamente', 'grid-column / grid-row — explicitly place items'),
            ].map((p, i) => (
              <li key={i} className="text-xs text-slate-400 flex gap-2">
                <span className="text-lime-500 flex-shrink-0">▸</span><span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border border-slate-700/50 bg-slate-900/30 rounded-xl p-4">
        <p className="text-xs text-slate-400">
          <span className="font-bold text-lime-300">{tx('Regla práctica: ', 'Rule of thumb: ')}</span>
          {tx(
            'si piensas en filas O columnas, usa Flexbox. Si piensas en filas Y columnas a la vez (una grilla real), usa Grid. Se combinan sin problema (Grid para el layout general, Flexbox dentro de cada celda).',
            'if you think in rows OR columns, use Flexbox. If you think in rows AND columns at once (a real grid), use Grid. They combine fine (Grid for the overall layout, Flexbox inside each cell).'
          )}
        </p>
      </div>

      <CodeBlock language="css" code={`/* Flexbox: centrar perfectamente (el clásico de entrevista) */
.center {
  display: flex;
  justify-content: center; /* eje principal */
  align-items: center;     /* eje cruzado */
  min-height: 100vh;
}

/* Flexbox: navbar con items distribuidos */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* Grid: layout de página clásico */
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}
.sidebar { grid-area: sidebar; }
.header  { grid-area: header; }

/* Grid: cards responsivas sin media queries */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}`} />
    </div>
  );

  // ─── Section: Responsive & Pseudo ───────────────────────────────────────────

  const renderResponsive = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('Responsive & Pseudo-clases', 'Responsive & Pseudo-classes')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Diseño adaptable, unidades correctas y las herramientas que distinguen a un CSS junior de uno senior.',
            'Adaptive design, the right units, and the tools that separate junior from senior CSS.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: tx('Media Queries & Mobile-first', 'Media Queries & Mobile-first'),
            points: [
              '@media (min-width: 768px) { ... }',
              tx('Mobile-first: estilos base para móvil, min-width agrega complejidad hacia arriba', 'Mobile-first: base styles for mobile, min-width adds complexity upward'),
              tx('Evita max-width en cascada: genera conflictos de especificidad', 'Avoid max-width cascades: they create specificity conflicts'),
            ],
          },
          {
            title: tx('Unidades', 'Units'),
            points: [
              tx('px: fijo, no escala con zoom de accesibilidad del usuario', 'px: fixed, does not scale with user accessibility zoom'),
              tx('rem: relativo al font-size del <html> — ideal para tipografía y spacing', 'rem: relative to <html> font-size — ideal for typography and spacing'),
              tx('em: relativo al padre — útil pero se acumula (compounding)', 'em: relative to the parent — useful but compounds'),
              '%, vw, vh: relativos al contenedor o viewport',
            ],
          },
          {
            title: tx('Pseudo-clases & Pseudo-elementos', 'Pseudo-classes & Pseudo-elements'),
            points: [
              ':hover, :focus, :focus-visible, :active',
              ':nth-child(odd), :first-child, :last-child, :not()',
              '::before, ::after — contenido generado (content: "")',
              '::placeholder, ::selection',
            ],
          },
          {
            title: 'BEM',
            points: [
              tx('Block__Element--Modifier: convención de nombres', 'Block__Element--Modifier: naming convention'),
              '.card, .card__title, .card--featured',
              tx('Evita especificidad alta y colisiones de nombres sin usar IDs', 'Avoids high specificity and name collisions without using IDs'),
            ],
          },
        ].map((card, i) => (
          <div key={i} className="border border-lime-500/20 bg-slate-900/40 rounded-xl p-4">
            <h3 className="font-bold text-lime-300 text-sm mb-2">{card.title}</h3>
            <ul className="space-y-1.5">
              {card.points.map((p, pi) => (
                <li key={pi} className="text-xs text-slate-400 flex gap-2">
                  <span className="text-lime-500 flex-shrink-0">▸</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <CodeBlock language="css" code={`/* Mobile-first: base = móvil, min-width agrega desktop */
.container {
  display: flex;
  flex-direction: column; /* móvil: columna */
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row; /* tablet+: fila */
    padding: 2rem;
  }
}

/* Pseudo-elementos: tooltip sin HTML extra */
.tooltip::after {
  content: attr(data-tip);
  position: absolute;
  opacity: 0;
  transition: opacity 0.2s;
}
.tooltip:hover::after { opacity: 1; }

/* BEM */
.card { }
.card__title { font-weight: bold; }
.card__title--highlighted { color: orange; }`} />
    </div>
  );

  // ─── Section: Advanced CSS ──────────────────────────────────────────────────

  const renderAdvanced = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('CSS Avanzado', 'Advanced CSS')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Variables, animaciones, contexto de apilamiento y las capas de cascada que ordenan CSS a gran escala.',
            'Variables, animations, stacking context and the cascade layers that organize CSS at scale.'
          )}
        </p>
      </div>

      <SpecificityDiagram tx={tx} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: tx('Custom Properties (variables)', 'Custom Properties (variables)'),
            points: [
              '--color-primary: #3b82f6; → var(--color-primary)',
              tx('Viven en el DOM: se pueden cambiar en runtime con JS', 'They live in the DOM: can be changed at runtime with JS'),
              tx('var(--x, fallback) — valor por defecto si no está definida', 'var(--x, fallback) — default value when undefined'),
              tx('Ideales para theming (dark mode) sin preprocesadores', 'Ideal for theming (dark mode) without preprocessors'),
            ],
          },
          {
            title: tx('Transiciones & Animaciones', 'Transitions & Animations'),
            points: [
              'transition: property duration easing',
              '@keyframes + animation: name duration iteration-count',
              tx('Anima transform/opacity — corren en el compositor (GPU), no en el main thread', 'Animate transform/opacity — they run on the compositor (GPU), not the main thread'),
              tx('will-change como hint, no como solución mágica', 'will-change as a hint, not a magic fix'),
            ],
          },
          {
            title: tx('Cascade Layers & !important', 'Cascade Layers & !important'),
            points: [
              '@layer reset, base, components, utilities;',
              tx('Capas posteriores ganan sin importar especificidad dentro de ellas', 'Later layers win regardless of specificity inside them'),
              tx('Soluciona guerras de especificidad entre librerías y código propio', 'Solves specificity wars between libraries and your own code'),
            ],
          },
          {
            title: tx('Stacking Context & z-index', 'Stacking Context & z-index'),
            points: [
              tx('z-index solo compara dentro del mismo stacking context', 'z-index only compares within the same stacking context'),
              tx('position + z-index, opacity < 1, transform crean nuevo contexto', 'position + z-index, opacity < 1, transform create a new context'),
              tx('Un z-index: 9999 puede perder contra un 1 si están en contextos distintos', 'A z-index: 9999 can lose to a 1 if they are in different contexts'),
            ],
          },
        ].map((card, i) => (
          <div key={i} className="border border-lime-500/20 bg-slate-900/40 rounded-xl p-4">
            <h3 className="font-bold text-lime-300 text-sm mb-2">{card.title}</h3>
            <ul className="space-y-1.5">
              {card.points.map((p, pi) => (
                <li key={pi} className="text-xs text-slate-400 flex gap-2">
                  <span className="text-lime-500 flex-shrink-0">▸</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <CodeBlock language="css" code={`/* Custom properties para theming */
:root {
  --color-bg: #ffffff;
  --color-text: #111827;
}
[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-text: #f1f5f9;
}
body {
  background: var(--color-bg);
  color: var(--color-text);
  transition: background 0.3s, color 0.3s;
}

/* Animación performante: solo transform + opacity */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.card { animation: fadeInUp 0.4s ease-out; }

/* Cascade layers: resuelve conflictos con librerías */
@layer reset, components, utilities;

@layer components {
  .btn { background: blue; }
}
@layer utilities {
  .bg-red { background: red; } /* gana aunque tenga igual especificidad */
}`} />
    </div>
  );

  // ─── Section: Modern & Performance ─────────────────────────────────────────

  const renderModern = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-white mb-1">
          {tx('CSS Moderno & Performance', 'Modern CSS & Performance')}
        </h2>
        <p className="text-slate-400 text-sm">
          {tx(
            'Lo más nuevo de la spec y el impacto de CSS en el renderizado — temas que distinguen a un senior en entrevista.',
            "What's new in the spec and how CSS affects rendering — topics that set a senior apart in interviews."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: 'Container Queries',
            points: [
              '@container (min-width: 400px) { ... }',
              tx('Responde al tamaño del contenedor padre, no del viewport', 'Responds to the parent container size, not the viewport'),
              tx('Clave para componentes reutilizables en distintos layouts', 'Key for components reused across different layouts'),
            ],
          },
          {
            title: ':has()',
            points: [
              tx('El "selector padre" que CSS no tenía', 'The "parent selector" CSS was missing'),
              'form:has(:invalid) { border: red; }',
              tx('Permite estilizar según descendientes sin JS', 'Lets you style based on descendants without JS'),
            ],
          },
          {
            title: tx('CSS Nesting nativo', 'Native CSS Nesting'),
            points: [
              tx('Anidamiento sin preprocesador (Sass/Less)', 'Nesting without a preprocessor (Sass/Less)'),
              '.card { & .title { ... } }',
              tx('Usa & para referenciar el selector padre, igual que en Sass', 'Uses & to reference the parent selector, same as in Sass'),
            ],
          },
          {
            title: tx('Critical Rendering Path', 'Critical Rendering Path'),
            points: [
              tx('CSS bloquea el render: el navegador espera el CSSOM antes de pintar', 'CSS blocks render: the browser waits for the CSSOM before painting'),
              tx('<link rel="preload"> y critical CSS inline reducen el First Paint', '<link rel="preload"> and inline critical CSS reduce First Paint'),
              tx('Evita @import en CSS: añade round-trips secuenciales', 'Avoid @import in CSS: it adds sequential round-trips'),
            ],
          },
          {
            title: tx('Accesibilidad & Performance', 'Accessibility & Performance'),
            points: [
              ':focus-visible — solo muestra outline con navegación por teclado',
              '@media (prefers-reduced-motion: reduce) { animation: none; }',
              tx('content-visibility: auto — salta el render de contenido fuera de pantalla', 'content-visibility: auto — skips rendering of off-screen content'),
            ],
          },
          {
            title: tx('Arquitectura CSS', 'CSS Architecture'),
            points: [
              tx('BEM/ITCSS: organización por capas (settings → tools → generic → components)', 'BEM/ITCSS: layered organization (settings → tools → generic → components)'),
              tx('Utility-first (Tailwind): composición de clases atómicas, menos CSS custom', 'Utility-first (Tailwind): atomic class composition, less custom CSS'),
              tx('CSS Modules / CSS-in-JS: scope local automático por componente', 'CSS Modules / CSS-in-JS: automatic local scope per component'),
            ],
          },
        ].map((card, i) => (
          <div key={i} className="border border-lime-500/20 bg-slate-900/40 rounded-xl p-4">
            <h3 className="font-bold text-lime-300 text-sm mb-2">{card.title}</h3>
            <ul className="space-y-1.5">
              {card.points.map((p, pi) => (
                <li key={pi} className="text-xs text-slate-400 flex gap-2">
                  <span className="text-lime-500 flex-shrink-0">▸</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <CodeBlock language="css" code={`/* Container queries: el componente responde a SU contenedor */
.card-wrapper { container-type: inline-size; }

@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 120px 1fr; }
}

/* :has() — "selector padre" */
form:has(input:invalid) {
  border-color: red;
}
.card:has(img) { padding-top: 0; } /* sin JS */

/* Nesting nativo */
.card {
  padding: 1rem;

  & .title {
    font-weight: bold;

    &:hover { color: var(--color-primary); }
  }
}

/* Accesibilidad */
.btn:focus-visible { outline: 2px solid blue; }

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`} />
    </div>
  );

  const renderContent = () => {
    switch (active) {
      case 'html': return renderHtml();
      case 'css': return renderCss();
      case 'layout': return renderLayout();
      case 'responsive': return renderResponsive();
      case 'advanced': return renderAdvanced();
      case 'modern': return renderModern();
      default: return renderHtml();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActive(section.id)}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                  active === section.id
                    ? 'bg-lime-500/20 border border-lime-500/40 text-lime-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${active === section.id ? 'text-lime-400' : 'text-slate-500'}`} />
                  <div className="min-w-0">
                    <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{section.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{section.subtitle}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content panel */}
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HTMLCSSPro;
