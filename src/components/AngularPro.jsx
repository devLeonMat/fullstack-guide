import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Blocks, GitBranch, Workflow, Zap, HelpCircle } from 'lucide-react';
import { SiAngular } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

// ─── Component Lifecycle Diagram ─────────────────────────────────────────────

const ComponentLifecycleDiagram = ({ tx }) => {
  const [activeHook, setActiveHook] = useState(0);

  const hooks = [
    { name: 'ngOnChanges',          desc: tx('Input cambia', 'Input changes') },
    { name: 'ngOnInit',             desc: tx('Inicialización', 'Initialization') },
    { name: 'ngDoCheck',            desc: tx('Detección custom', 'Custom detection') },
    { name: 'ngAfterContentInit',   desc: tx('Content proyectado', 'Content projected') },
    { name: 'ngAfterContentChecked',desc: tx('Content chequeado', 'Content checked') },
    { name: 'ngAfterViewInit',      desc: tx('Vista lista', 'View ready') },
    { name: 'ngAfterViewChecked',   desc: tx('Vista chequeada', 'View checked') },
    { name: 'ngOnDestroy',          desc: tx('Destrucción', 'Destruction') },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setActiveHook(h => (h + 1) % hooks.length);
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-3">
        {tx('Ciclo de vida del componente', 'Component Lifecycle')}
      </p>
      <div className="flex flex-col gap-1.5">
        {hooks.map((hook, i) => (
          <motion.div
            key={hook.name}
            animate={{
              boxShadow: activeHook === i ? '0 0 16px rgba(239,68,68,0.45)' : '0 0 0px transparent',
              scale: activeHook === i ? 1.03 : 1,
            }}
            transition={{ duration: 0.25 }}
            className={`flex items-center gap-3 border rounded-lg px-3 py-1.5 transition-all ${
              activeHook === i
                ? 'border-red-500/60 bg-red-500/15 text-red-300'
                : i < activeHook
                  ? 'border-slate-700/40 bg-slate-800/20 text-slate-500'
                  : 'border-slate-700/30 bg-slate-900/20 text-slate-600'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              activeHook === i ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-500'
            }`}>{i + 1}</span>
            <span className="font-mono text-xs font-semibold flex-1">{hook.name}</span>
            <span className="text-xs opacity-70 hidden sm:block">{hook.desc}</span>
            {i < hooks.length - 1 && (
              <motion.span
                animate={{ opacity: activeHook === i ? 1 : 0.2 }}
                className="text-red-400 text-xs absolute right-3 bottom-0 translate-y-2"
              />
            )}
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-800">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs text-slate-500">{tx('Se repite en loop', 'Loops continuously')}</span>
      </div>
    </div>
  );
};

// ─── DI Tree Diagram ──────────────────────────────────────────────────────────

const DITreeDiagram = ({ tx }) => {
  const [lookupStep, setLookupStep] = useState(-1);

  const levels = [
    {
      label: tx('Root Injector', 'Root Injector'),
      services: ['AuthService', 'HttpClient', 'Router'],
      color: 'border-red-500/50 text-red-300 bg-red-500/10',
    },
    {
      label: tx('Module Injector', 'Module Injector'),
      services: ['UserService', 'DataService'],
      color: 'border-orange-500/50 text-orange-300 bg-orange-500/10',
    },
    {
      label: tx('Component Injector', 'Component Injector'),
      services: ['LocalService', 'FormService'],
      color: 'border-amber-500/50 text-amber-300 bg-amber-500/10',
    },
  ];

  useEffect(() => {
    let step = levels.length - 1;
    setLookupStep(step);

    const id = setInterval(() => {
      step = step <= 0 ? levels.length - 1 : step - 1;
      setLookupStep(step);
    }, 700);

    const outer = setInterval(() => {
      step = levels.length - 1;
      setLookupStep(step);
    }, 2000);

    return () => {
      clearInterval(id);
      clearInterval(outer);
    };
  }, []);

  return (
    <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4 space-y-3">
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
        {tx('Jerarquía de inyectores — búsqueda sube el árbol', 'Injector hierarchy — lookup travels up')}
      </p>
      {levels.map((level, i) => (
        <motion.div
          key={level.label}
          animate={{
            boxShadow: lookupStep === i ? '0 0 18px rgba(239,68,68,0.4)' : '0 0 0px transparent',
            scale: lookupStep === i ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`border rounded-xl p-3 transition-all ${level.color} ${lookupStep === i ? 'opacity-100' : 'opacity-50'}`}
          style={{ marginLeft: `${i * 20}px` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-xs">{level.label}</span>
            {lookupStep === i && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded font-semibold"
              >
                {tx('buscando…', 'looking…')}
              </motion.span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {level.services.map(svc => (
              <span key={svc} className="text-xs font-mono bg-slate-900/50 border border-slate-700/50 text-slate-300 px-2 py-0.5 rounded">
                {svc}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
      <div className="flex items-center gap-2 pt-1">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
          className="text-red-400 text-sm font-bold"
        >
          ↑
        </motion.div>
        <span className="text-xs text-slate-500">{tx('Si no encuentra, sube al padre', 'If not found, moves up to parent')}</span>
      </div>
    </div>
  );
};

// ─── Marble Diagram ───────────────────────────────────────────────────────────

const MarbleDiagram = ({ tx }) => {
  const [operatorIdx, setOperatorIdx] = useState(0);
  const [tick, setTick] = useState(0);

  const operators = [
    {
      name: 'map',
      desc: tx('Transforma cada valor', 'Transform each value'),
      input:  [{ x: 10, color: 'bg-blue-500',  label: '1' }, { x: 30, color: 'bg-purple-500', label: '2' }, { x: 60, color: 'bg-pink-500',  label: '3' }, { x: 82, color: 'bg-yellow-500',label: '4' }],
      output: [{ x: 10, color: 'bg-blue-400',  label: '2' }, { x: 30, color: 'bg-purple-400', label: '4' }, { x: 60, color: 'bg-pink-400',  label: '6' }, { x: 82, color: 'bg-yellow-400',label: '8' }],
    },
    {
      name: 'filter',
      desc: tx('Filtra valores que no cumplen', 'Filter values that don\'t match'),
      input:  [{ x: 10, color: 'bg-blue-500',  label: '1' }, { x: 30, color: 'bg-purple-500', label: '2' }, { x: 60, color: 'bg-pink-500',  label: '3' }, { x: 82, color: 'bg-yellow-500',label: '4' }],
      output: [{ x: 30, color: 'bg-purple-500', label: '2' }, { x: 82, color: 'bg-yellow-500', label: '4' }],
    },
    {
      name: 'debounceTime',
      desc: tx('Espera silencio antes de emitir', 'Wait for silence before emitting'),
      input:  [{ x: 5, color: 'bg-blue-500', label: 'a' }, { x: 20, color: 'bg-blue-500', label: 'b' }, { x: 35, color: 'bg-blue-500', label: 'c' }, { x: 75, color: 'bg-purple-500', label: 'd' }],
      output: [{ x: 55, color: 'bg-blue-400', label: 'c' }, { x: 90, color: 'bg-purple-400', label: 'd' }],
    },
    {
      name: 'switchMap',
      desc: tx('Cancela el observable anterior', 'Cancels the previous observable'),
      input:  [{ x: 10, color: 'bg-red-500',   label: 'A' }, { x: 40, color: 'bg-green-500', label: 'B' }, { x: 75, color: 'bg-blue-500',  label: 'C' }],
      output: [{ x: 25, color: 'bg-red-400',   label: 'a1' }, { x: 55, color: 'bg-green-400', label: 'b1' }, { x: 85, color: 'bg-blue-400',  label: 'c1' }],
    },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setOperatorIdx(i => (i + 1) % operators.length);
      setTick(t => t + 1);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const op = operators[operatorIdx];

  return (
    <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
          {tx('Marble Diagram', 'Marble Diagram')}
        </p>
        <div className="flex gap-1">
          {operators.map((o, i) => (
            <button
              key={o.name}
              onClick={() => setOperatorIdx(i)}
              className={`text-xs font-mono px-2 py-0.5 rounded border transition-all ${
                i === operatorIdx
                  ? 'border-red-500/60 bg-red-500/20 text-red-300'
                  : 'border-slate-700/50 bg-slate-800/30 text-slate-500 hover:text-slate-300'
              }`}
            >
              {o.name}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={operatorIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          <p className="text-xs text-slate-500">{op.desc}</p>

          {/* Input timeline */}
          <div>
            <span className="text-xs text-slate-400 mb-1 block">{tx('Entrada', 'Input')}</span>
            <div className="relative h-8 bg-slate-900/60 border border-slate-700/40 rounded-lg overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-full flex items-center">
                <div className="w-full h-0.5 bg-slate-700/60 mx-2" />
              </div>
              {op.input.map((marble, i) => (
                <motion.div
                  key={`in-${i}-${operatorIdx}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.12, duration: 0.2 }}
                  className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 ${marble.color} rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg`}
                  style={{ left: `${marble.x}%` }}
                >
                  {marble.label}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Operator label */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-slate-700/40" />
            <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/30 px-2 py-0.5 rounded">
              {op.name}()
            </span>
            <div className="flex-1 h-px bg-slate-700/40" />
          </div>

          {/* Output timeline */}
          <div>
            <span className="text-xs text-slate-400 mb-1 block">{tx('Salida', 'Output')}</span>
            <div className="relative h-8 bg-slate-900/60 border border-slate-700/40 rounded-lg overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-full flex items-center">
                <div className="w-full h-0.5 bg-slate-700/60 mx-2" />
              </div>
              {op.output.map((marble, i) => (
                <motion.div
                  key={`out-${i}-${operatorIdx}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.2 }}
                  className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 ${marble.color} rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg`}
                  style={{ left: `${marble.x}%` }}
                >
                  {marble.label}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── Signals Change Detection Diagram ────────────────────────────────────────

const SignalsDiagram = ({ tx }) => {
  const [mode, setMode] = useState('onpush');
  const [checkedNodes, setCheckedNodes] = useState([]);

  const tree = ['Root', 'A', 'B', 'C', 'D', 'E'];

  useEffect(() => {
    const id = setInterval(() => setMode(m => m === 'onpush' ? 'default' : 'onpush'), 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setCheckedNodes([]);
    const nodesToCheck = mode === 'default' ? tree : ['Root', 'B', 'D'];
    nodesToCheck.forEach((node, i) => {
      const t = setTimeout(() => {
        setCheckedNodes(prev => [...prev, node]);
      }, i * 200);
    });
    return () => nodesToCheck.forEach((_, i) => clearTimeout(i));
  }, [mode]);

  const isDefault = mode === 'default';

  return (
    <div className="bg-slate-950/40 border border-red-500/20 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
          {tx('Detección de cambios', 'Change Detection')}
        </p>
        <AnimatePresence mode="wait">
          <motion.span
            key={mode}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`text-xs font-bold px-2 py-0.5 rounded border ${
              isDefault
                ? 'border-orange-500/50 bg-orange-500/15 text-orange-300'
                : 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
            }`}
          >
            {isDefault ? 'Default' : 'OnPush'}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Tree visual */}
        <div className={`p-3 rounded-xl border ${isDefault ? 'border-orange-500/30 bg-orange-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
          <p className="text-xs font-semibold mb-2 text-center text-slate-400">
            {isDefault ? tx('Todo el árbol', 'Entire tree') : tx('Solo rama sucia', 'Dirty branch only')}
          </p>
          <div className="space-y-1.5 text-xs font-mono">
            {tree.map((node, i) => {
              const checked = checkedNodes.includes(node);
              const isRoot = node === 'Root';
              return (
                <motion.div
                  key={node}
                  animate={{
                    opacity: checked ? 1 : 0.3,
                    x: checked ? 0 : 2,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-1.5 border rounded px-2 py-0.5 ${
                    checked
                      ? isDefault
                        ? 'border-orange-500/50 bg-orange-500/15 text-orange-300'
                        : 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                      : 'border-slate-700/30 text-slate-600'
                  }`}
                  style={{ marginLeft: isRoot ? 0 : i > 2 ? 24 : 12 }}
                >
                  {checked && <span>{isDefault ? '🔍' : '✓'}</span>}
                  <span>{node}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-2">
          <div className={`p-3 rounded-xl border flex-1 ${isDefault ? 'border-orange-500/30 bg-orange-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
            <p className="text-xs text-slate-400 mb-1">{tx('Nodos chequeados', 'Nodes checked')}</p>
            <motion.p
              key={mode}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className={`text-2xl font-bold ${isDefault ? 'text-orange-400' : 'text-emerald-400'}`}
            >
              {isDefault ? tree.length : 3}
              <span className="text-sm font-normal text-slate-500"> / {tree.length}</span>
            </motion.p>
          </div>
          <div className={`p-3 rounded-xl border ${isDefault ? 'border-orange-500/30 bg-orange-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
            <p className="text-xs text-slate-400 mb-1">{tx('Performance', 'Performance')}</p>
            <p className={`text-sm font-bold ${isDefault ? 'text-orange-400' : 'text-emerald-400'}`}>
              {isDefault ? tx('Costoso 🐢', 'Expensive 🐢') : tx('Eficiente ⚡', 'Efficient ⚡')}
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500 text-center">
        {isDefault
          ? tx('Default: chequea cada componente en cada evento', 'Default: checks every component on each event')
          : tx('OnPush + Signals: solo la rama que tiene datos nuevos', 'OnPush + Signals: only the branch with new data')}
      </p>
    </div>
  );
};

// ─── Section renderers ────────────────────────────────────────────────────────

const renderBlocks = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-red-400 mb-1">
        {tx('Building Blocks', 'Building Blocks')}
      </h2>
      <p className="text-slate-400 text-sm">{tx('Componentes, directivas y pipes', 'Components, directives & pipes')}</p>
    </div>

    <ComponentLifecycleDiagram tx={tx} />

    {[
      {
        topic: 'Components',
        desc: tx('Bloques fundamentales de Angular', 'Fundamental building blocks of Angular'),
        code: `// Componente con @Input / @Output
@Component({
  selector: 'app-user',
  template: \`
    <div class="user-card">
      <h2>{{ user.name }}</h2>
      <button (click)="onEdit()">Edit</button>
    </div>
  \`
})
export class UserComponent {
  @Input() user!: User;
  @Output() edit = new EventEmitter<User>();
  onEdit() { this.edit.emit(this.user); }
}

// Standalone Component (Angular 14+)
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`<h1>{{ title }}</h1>\`
})
export class ProfileComponent {
  title = 'Profile Page';
}

// Nuevo control flow (Angular 17+)
@Component({
  template: \`
    @if (user) {
      <p>{{ user.name }}</p>
    } @else {
      <p>Loading…</p>
    }
    @for (item of items; track item.id) {
      <li>{{ item.name }}</li>
    }
  \`
})
export class ModernComponent {}`,
        points: [
          tx('@Component decorator define metadata', '@Component decorator defines metadata'),
          tx('@Input: Props de padre a hijo', '@Input: Props from parent to child'),
          tx('@Output + EventEmitter: Comunicación hijo-padre', '@Output + EventEmitter: Child-to-parent comms'),
          tx('Standalone: Sin necesidad de NgModule (moderno)', 'Standalone: No NgModule needed (modern)'),
          tx('@if / @for sustituyen *ngIf / *ngFor', '@if / @for replace *ngIf / *ngFor'),
        ],
      },
      {
        topic: tx('Directivas', 'Directives'),
        desc: tx('Modifican comportamiento del DOM', 'Modify DOM behaviour'),
        code: `// Structural directives (new syntax Angular 17+)
@Component({
  template: \`
    @if (isVisible) { <div>Visible</div> }
    @for (item of items; track item.id; let i = $index) {
      <li>{{ i }}: {{ item.name }}</li>
    }
    @switch (status) {
      @case ('active')  { <span>Active</span>  }
      @case ('pending') { <span>Pending</span> }
      @default          { <span>Unknown</span> }
    }
  \`
})

// Custom Attribute Directive
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }
  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}`,
        points: [
          tx('Structural: Cambian estructura DOM (@if, @for, @switch)', 'Structural: Change DOM structure (@if, @for, @switch)'),
          tx('Attribute: Cambian apariencia/comportamiento', 'Attribute: Change appearance/behaviour'),
          tx('@HostListener: Escucha eventos del host element', '@HostListener: Listen to host element events'),
          tx('Custom directives reutilizan lógica DOM', 'Custom directives reuse DOM logic'),
        ],
      },
      {
        topic: 'Pipes',
        desc: tx('Transforman datos en templates', 'Transform data in templates'),
        code: `<!-- Built-in Pipes -->
<p>{{ date | date:'medium' }}</p>
<p>{{ price | currency:'USD' }}</p>
<p>{{ name | uppercase }}</p>
<p>{{ description | slice:0:100 }}</p>

<!-- Async pipe (auto subscribe/unsubscribe) -->
<div *ngIf="data$ | async as data">{{ data.name }}</div>

<!-- Custom Pure Pipe -->
@Pipe({ name: 'truncate', standalone: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50): string {
    return value.length > limit
      ? value.slice(0, limit) + '…'
      : value;
  }
}

<!-- Custom Impure Pipe -->
@Pipe({ name: 'filter', pure: false, standalone: true })
export class FilterPipe implements PipeTransform {
  transform(items: any[], search: string): any[] {
    return items.filter(i => i.name.includes(search));
  }
}

<!-- Chained usage -->
<p>{{ text | truncate:30 | uppercase }}</p>`,
        points: [
          tx('Pure pipes: Solo si el input cambia (performante)', 'Pure pipes: Only when input changes (performant)'),
          tx('Impure pipes: En cada change detection cycle', 'Impure pipes: On every change detection cycle'),
          tx('async pipe: Suscribe y cancela automáticamente', 'async pipe: Auto-subscribe and auto-unsubscribe'),
          tx('Encadenables: value | pipe1 | pipe2', 'Chainable: value | pipe1 | pipe2'),
        ],
      },
    ].map((item, idx) => (
      <motion.div
        key={item.topic}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: idx * 0.08 }}
        className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6"
      >
        <div className="flex items-start gap-3 mb-4">
          <SiAngular className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-red-400">{item.topic}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
        </div>
        <div className="mb-4">
          <CodeBlock code={item.code} language="typescript" />
        </div>
        <ul className="space-y-2">
          {item.points.map((point, pIdx) => (
            <li key={pIdx} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-red-400 flex-shrink-0">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

const renderDI = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-red-400 mb-1">
        {tx('Dependency Injection', 'Dependency Injection')}
      </h2>
      <p className="text-slate-400 text-sm">{tx('Inyectores, providers, jerarquía', 'Injectors, providers, hierarchy')}</p>
    </div>

    <DITreeDiagram tx={tx} />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[
        { label: 'providedIn: root',      desc: tx('Singleton global. Instancia compartida en toda la app.', 'Global singleton. Shared instance across the entire app.'), color: 'border-red-500/30 text-red-300' },
        { label: 'providedIn: platform',  desc: tx('Compartido entre micro-frontends en la misma plataforma.', 'Shared between micro-frontends on the same platform.'), color: 'border-orange-500/30 text-orange-300' },
        { label: 'providers: [Service]',  desc: tx('En NgModule o @Component — instancia nueva por ámbito.', 'In NgModule or @Component — new instance per scope.'), color: 'border-amber-500/30 text-amber-300' },
        { label: 'InjectionToken',        desc: tx('Para valores primitivos o interfaces sin clase concreta.', 'For primitive values or interfaces without a concrete class.'), color: 'border-yellow-500/30 text-yellow-300' },
      ].map(({ label, desc, color }) => (
        <div key={label} className={`bg-slate-900/50 border ${color} rounded-xl p-3`}>
          <div className={`font-bold text-sm mb-1 font-mono ${color.split(' ')[1]}`}>{label}</div>
          <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    <CodeBlock language="typescript" code={`// @Injectable con diferentes scopes
@Injectable({ providedIn: 'root' })   // Singleton global
export class AuthService { … }

@Injectable({ providedIn: 'platform' }) // Shared across apps
export class LoggingService { … }

@Injectable()  // Declarado manualmente en providers
export class CartService { … }

// Component-scoped provider (nueva instancia por componente)
@Component({
  selector: 'app-cart',
  providers: [CartService],            // Instancia propia
  template: \`…\`
})
export class CartComponent {
  constructor(private cart: CartService) {}
}

// InjectionToken para valores primitivos
export const API_URL = new InjectionToken<string>('api.url');

// En providers:
{ provide: API_URL, useValue: 'https://api.example.com' }

// Inyectar:
constructor(@Inject(API_URL) private apiUrl: string) {}

// inject() moderno (Angular 14+, sin constructor)
export class ModernService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
}`} />

    <CodeBlock language="typescript" code={`// forwardRef: referencia circular
@Injectable({ providedIn: 'root' })
export class ParentService {
  constructor(
    @Inject(forwardRef(() => ChildService))
    private child: ChildService
  ) {}
}

// Multi providers (acumulan en array)
export const VALIDATORS = new InjectionToken<Validator[]>('validators');

{ provide: VALIDATORS, useClass: EmailValidator, multi: true }
{ provide: VALIDATORS, useClass: PhoneValidator, multi: true }

// Inyecta array con todos:
constructor(@Inject(VALIDATORS) validators: Validator[]) {}

// useFactory: lógica de construcción
{
  provide: HttpClient,
  useFactory: (backend: HttpBackend) => new HttpClient(backend),
  deps: [HttpBackend]
}

// useExisting: alias a otro provider
{ provide: OldService, useExisting: NewService }`} />
  </div>
);

const renderRxjs = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-red-400 mb-1">RxJS</h2>
      <p className="text-slate-400 text-sm">{tx('Observables, operadores y marble diagrams', 'Observables, operators & marble diagrams')}</p>
    </div>

    <MarbleDiagram tx={tx} />

    {[
      {
        topic: tx('Subject vs BehaviorSubject vs ReplaySubject', 'Subject vs BehaviorSubject vs ReplaySubject'),
        desc: tx('Tipos de subjects y cuándo usar cada uno', 'Subject types and when to use each'),
        code: `import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

// Subject: sin valor inicial, solo futuros subscribers lo reciben
const subject = new Subject<number>();
subject.next(1);                        // nadie escucha aún
subject.subscribe(v => console.log('A:', v));
subject.next(2);                        // A: 2
subject.subscribe(v => console.log('B:', v));
subject.next(3);                        // A: 3, B: 3

// BehaviorSubject: valor inicial + emite último valor a subscribers nuevos
const bs = new BehaviorSubject<number>(0);
bs.subscribe(v => console.log('A:', v));// A: 0 (inmediato)
bs.next(1);                             // A: 1
bs.subscribe(v => console.log('B:', v));// B: 1 (último valor)
console.log(bs.value);                  // 1 (acceso síncrono)

// ReplaySubject: reemite N valores pasados
const rs = new ReplaySubject<number>(2);// buffer 2
rs.next(1); rs.next(2); rs.next(3);
rs.subscribe(v => console.log(v));      // 2, 3

// State service con BehaviorSubject
@Injectable({ providedIn: 'root' })
export class StateService {
  private state$ = new BehaviorSubject<AppState>(initialState);
  readonly state = this.state$.asObservable();

  update(patch: Partial<AppState>) {
    this.state$.next({ ...this.state$.value, ...patch });
  }
}`,
        points: [
          tx('Subject: multicast, sin valor inicial ni buffer', 'Subject: multicast, no initial value or buffer'),
          tx('BehaviorSubject: valor inicial, emite último a nuevos subs', 'BehaviorSubject: initial value, emits last to new subs'),
          tx('ReplaySubject: cachea N valores para nuevos subs', 'ReplaySubject: caches N values for new subscribers'),
          tx('.asObservable() oculta el método .next() al exterior', '.asObservable() hides the .next() method externally'),
        ],
      },
      {
        topic: tx('Operadores clave y combos comunes', 'Key operators & common combos'),
        desc: tx('switchMap para búsqueda, takeUntilDestroyed para cleanup', 'switchMap for search, takeUntilDestroyed for cleanup'),
        code: `import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, debounceTime, distinctUntilChanged,
         combineLatest, mergeMap, catchError, retry } from 'rxjs/operators';

// Patrón búsqueda: debounce + cancel prev + error handling
searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term =>
    this.http.get<Result[]>(\`/api/search?q=\${term}\`).pipe(
      catchError(() => of([]))    // no rompe el stream
    )
  ),
  takeUntilDestroyed()            // Angular 16+: auto cleanup
).subscribe(results => this.results.set(results));

// combineLatest: espera que todos emitan
combineLatest([this.user$, this.prefs$]).pipe(
  map(([user, prefs]) => ({ ...user, theme: prefs.theme })),
  takeUntilDestroyed()
).subscribe(data => this.vm.set(data));

// mergeMap: peticiones paralelas (sin cancelar)
ids$.pipe(
  mergeMap(id => this.http.get<Item>(\`/api/item/\${id}\`)),
).subscribe();

// retry con backoff
this.http.get('/api/data').pipe(
  retry({ count: 3, delay: 1000 }),
  catchError(err => { this.error.set(err.message); return EMPTY; })
).subscribe();`,
        points: [
          tx('switchMap cancela la petición anterior (búsquedas)', 'switchMap cancels the previous request (searches)'),
          tx('mergeMap ejecuta requests en paralelo', 'mergeMap runs requests in parallel'),
          tx('takeUntilDestroyed: cleanup automático Angular 16+', 'takeUntilDestroyed: automatic cleanup Angular 16+'),
          tx('catchError dentro del switchMap protege el stream', 'catchError inside switchMap protects the stream'),
        ],
      },
    ].map((item, idx) => (
      <motion.div
        key={item.topic}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: idx * 0.08 }}
        className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6"
      >
        <div className="flex items-start gap-3 mb-4">
          <Workflow className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-red-400">{item.topic}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
        </div>
        <div className="mb-4">
          <CodeBlock code={item.code} language="typescript" />
        </div>
        <ul className="space-y-2">
          {item.points.map((point, pIdx) => (
            <li key={pIdx} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-red-400 flex-shrink-0">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

const renderSignals = (tx) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-xl lg:text-3xl font-bold text-red-400 mb-1">
        {tx('Signals & Change Detection', 'Signals & Change Detection')}
      </h2>
      <p className="text-slate-400 text-sm">{tx('Angular 17+ reactivity', 'Angular 17+ reactivity')}</p>
    </div>

    <SignalsDiagram tx={tx} />

    {[
      {
        topic: tx('signal(), computed(), effect()', 'signal(), computed(), effect()'),
        desc: tx('El nuevo sistema reactivo de Angular', "Angular's new reactive system"),
        code: `import { signal, computed, effect, input, output } from '@angular/core';

// Writable signal
const count = signal(0);

// Computed signal (memo automático)
const doubleCount = computed(() => count() * 2);
const isEven = computed(() => count() % 2 === 0);

// Effect (side effects reactivos)
effect(() => {
  console.log(\`Count es: \${count()}\`);
  // Se ejecuta cuando count() cambia
});

// Mutaciones
count.set(5);                          // asignar
count.update(v => v + 1);             // actualizar
count.mutate(arr => arr.push(item));   // mutar objeto/array

// Input signals (Angular 18+)
@Component({ … })
export class CardComponent {
  // Antes: @Input() title: string
  title = input<string>('Default');         // optional
  userId = input.required<number>();        // required

  // Output signals (Angular 18+)
  selected = output<string>();

  onSelect() { this.selected.emit(this.title()); }
}

// toSignal / toObservable — bridge RxJS ↔ Signals
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

const users = toSignal(this.http.get<User[]>('/api/users'), {
  initialValue: []
});
const users$ = toObservable(users);`,
        points: [
          tx('signal(): writable, .set() / .update() / .mutate()', 'signal(): writable, .set() / .update() / .mutate()'),
          tx('computed(): derivado, recalcula solo cuando deps cambian', 'computed(): derived, recalculates only when deps change'),
          tx('effect(): side effect que se registra y limpia solo', 'effect(): side effect that auto-registers and cleans up'),
          tx('input() / output() sustituyen @Input / @Output (Angular 18+)', 'input() / output() replace @Input / @Output (Angular 18+)'),
          tx('toSignal() integra observables en el mundo signals', 'toSignal() integrates observables into the signals world'),
        ],
      },
      {
        topic: tx('OnPush + Signals + trackBy', 'OnPush + Signals + trackBy'),
        desc: tx('Optimizaciones de rendimiento en listas y componentes', 'Performance optimizations in lists and components'),
        code: `// OnPush + signal: actualización granular
@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <!-- Angular 17+: @for con track obligatorio -->
    @for (item of items(); track item.id) {
      <app-item [data]="item" />
    }

    <!-- Con signal: solo re-render del item cambiado -->
    <p>Total: {{ total() }}</p>
    <p>Selected: {{ selected()?.name }}</p>
  \`
})
export class ListComponent {
  items    = signal<Item[]>([]);
  selected = signal<Item | null>(null);
  total    = computed(() => this.items().reduce((s, i) => s + i.price, 0));

  addItem(item: Item) {
    this.items.update(list => [...list, item]);
  }

  selectItem(item: Item) {
    this.selected.set(item);
    // Solo este componente se marca dirty (OnPush)
  }
}

// Lazy defer block (Angular 17+)
@Component({
  template: \`
    @defer (on viewport) {
      <app-heavy-chart [data]="chartData()" />
    } @placeholder {
      <div class="skeleton h-64" />
    } @loading (minimum 200ms) {
      <app-spinner />
    } @error {
      <p>Error al cargar el gráfico</p>
    }
  \`
})`,
        points: [
          tx('OnPush: solo chequea si @Input cambia o evento interno', 'OnPush: only checks if @Input changes or internal event'),
          tx('@for track: evita recrear DOM innecesariamente', '@for track: avoids recreating DOM unnecessarily'),
          tx('Signals + OnPush: el framework actualiza solo lo necesario', 'Signals + OnPush: framework updates only what is needed'),
          tx('@defer: lazy loading declarativo por viewport/interacción', '@defer: declarative lazy loading by viewport/interaction'),
        ],
      },
    ].map((item, idx) => (
      <motion.div
        key={item.topic}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: idx * 0.08 }}
        className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6"
      >
        <div className="flex items-start gap-3 mb-4">
          <Zap className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-red-400">{item.topic}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
        </div>
        <div className="mb-4">
          <CodeBlock code={item.code} language="typescript" />
        </div>
        <ul className="space-y-2">
          {item.points.map((point, pIdx) => (
            <li key={pIdx} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-red-400 flex-shrink-0">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

// ─── Interview Accordion ──────────────────────────────────────────────────────

const AccordionItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border border-red-500/20 rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3 text-left bg-slate-900/50 hover:bg-slate-800/50 transition-colors"
    >
      <span className="text-slate-200 font-semibold text-sm">{question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-red-400 flex-shrink-0 ml-3"
      >
        ▼
      </motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="px-4 py-3 bg-slate-950/40 border-t border-red-500/10 text-slate-300 text-sm leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const renderInterview = (tx) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => setOpenIdx(o => o === i ? null : i);

  const qaGroups = [
    {
      level: 'Junior',
      color: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
      qa: [
        {
          q: tx('¿Qué es Angular?', 'What is Angular?'),
          a: tx(
            'Angular es un framework de frontend mantenido por Google. Usa TypeScript, arquitectura basada en componentes, e incluye todo: router, forms, HTTP client, DI. Es opinionado (a diferencia de React/Vue) y orientado a aplicaciones empresariales de gran escala.',
            'Angular is a frontend framework maintained by Google. It uses TypeScript, component-based architecture, and ships everything: router, forms, HTTP client, DI. It is opinionated (unlike React/Vue) and oriented toward large-scale enterprise applications.'
          ),
        },
        {
          q: tx('¿Diferencia entre @Component y @Directive?', 'Difference between @Component and @Directive?'),
          a: tx(
            '@Component tiene template (UI visible) + @Directive no. @Directive modifica el comportamiento de un elemento existente. @Component hereda de @Directive internamente. Usa Directive cuando no necesitas markup propio.',
            '@Component has a template (visible UI) + @Directive does not. @Directive modifies the behaviour of an existing element. @Component inherits from @Directive internally. Use Directive when you do not need your own markup.'
          ),
        },
        {
          q: tx('¿Qué son los pipes?', 'What are pipes?'),
          a: tx(
            'Los pipes transforman datos en templates: {{ value | pipe }}. Built-in: date, currency, uppercase, async. Pueden ser pure (solo re-ejecutan si input cambia) o impure (en cada change detection). El async pipe suscribe y cancela automáticamente un observable.',
            'Pipes transform data in templates: {{ value | pipe }}. Built-in: date, currency, uppercase, async. They can be pure (only re-run if input changes) or impure (on every change detection). The async pipe automatically subscribes and unsubscribes an observable.'
          ),
        },
      ],
    },
    {
      level: 'Mid',
      color: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
      qa: [
        {
          q: tx('¿Cómo funciona Change Detection?', 'How does Change Detection work?'),
          a: tx(
            'Default: Zone.js detecta eventos async y recorre todo el árbol. OnPush: solo chequea si un @Input cambia de referencia o si hay un evento dentro del componente. Con Signals no necesitas pensar en esto: el framework actualiza solo los nodos que leen el signal modificado.',
            'Default: Zone.js detects async events and walks the entire tree. OnPush: only checks if an @Input changes reference or if there is an event inside the component. With Signals you do not need to think about this: the framework updates only nodes that read the changed signal.'
          ),
        },
        {
          q: tx('¿Observable vs Promise?', 'Observable vs Promise?'),
          a: tx(
            'Promise: un solo valor, eager (se ejecuta al crearse), no cancelable. Observable: múltiples valores en el tiempo, lazy (ejecuta al suscribirse), cancelable (unsubscribe), composable con operadores (map, filter, switchMap…). RxJS añade potentes operadores de composición.',
            'Promise: single value, eager (executes on creation), not cancellable. Observable: multiple values over time, lazy (executes on subscribe), cancellable (unsubscribe), composable with operators (map, filter, switchMap…). RxJS adds powerful composition operators.'
          ),
        },
        {
          q: tx('¿Qué son los Angular Signals?', 'What are Angular Signals?'),
          a: tx(
            'Sistema reactivo fine-grained introducido en Angular 16 (estable en 17). signal() crea un valor reactivo, computed() deriva valores, effect() ejecuta side effects. A diferencia de Zone.js, solo actualiza los consumidores del signal específico — sin recorrer el árbol entero.',
            'Fine-grained reactive system introduced in Angular 16 (stable in 17). signal() creates a reactive value, computed() derives values, effect() runs side effects. Unlike Zone.js, it only updates the consumers of the specific signal — without walking the entire tree.'
          ),
        },
      ],
    },
    {
      level: 'Senior',
      color: 'border-red-500/40 text-red-300 bg-red-500/10',
      qa: [
        {
          q: tx('¿Cómo funciona la jerarquía DI de Angular?', 'How does Angular DI hierarchy work?'),
          a: tx(
            'Angular tiene una jerarquía de inyectores: Root (app-wide) → Module → Component. Cuando un componente solicita un servicio, Angular busca hacia arriba: Component → Module → Root. providedIn: root crea un singleton. Providers en @Component crean instancias por componente. Esto permite scoped services sin módulos globales.',
            "Angular has an injector hierarchy: Root (app-wide) → Module → Component. When a component requests a service, Angular looks upward: Component → Module → Root. providedIn: root creates a singleton. Providers in @Component create per-component instances. This enables scoped services without global modules."
          ),
        },
        {
          q: tx('¿Qué hace Zone.js y cuándo irá?', "What does Zone.js do and when will it go?"),
          a: tx(
            'Zone.js hace monkey-patching de todas las APIs async (setTimeout, Promise, fetch, addEventListener) para interceptarlas y disparar change detection. Problema: overhead y dificultad para debugging. Angular 18 añadió soporte experimental zoneless (provideExperimentalZonelessChangeDetection). Signals + zoneless es el futuro — Zone.js pasará a ser opcional.',
            'Zone.js monkey-patches all async APIs (setTimeout, Promise, fetch, addEventListener) to intercept them and trigger change detection. Problem: overhead and debugging difficulty. Angular 18 added experimental zoneless support (provideExperimentalZonelessChangeDetection). Signals + zoneless is the future — Zone.js will become optional.'
          ),
        },
        {
          q: tx('¿Cómo optimizarías una lista de 1000 items?', 'How would you optimize a list of 1000 items?'),
          a: tx(
            '1) Virtual scrolling (CDK CdkVirtualScrollViewport) — solo renderiza items visibles. 2) OnPush en los item-components para evitar re-renders innecesarios. 3) @for con track para que Angular reutilice DOM nodes. 4) Signals en el item-component para actualizaciones granulares. 5) @defer para secciones fuera de viewport. 6) Pure pipes en lugar de métodos en template. 7) Web Workers para filtros/ordenación pesada.',
            '1) Virtual scrolling (CDK CdkVirtualScrollViewport) — renders only visible items. 2) OnPush on item-components to avoid unnecessary re-renders. 3) @for with track so Angular reuses DOM nodes. 4) Signals in the item-component for granular updates. 5) @defer for sections outside viewport. 6) Pure pipes instead of template methods. 7) Web Workers for heavy filtering/sorting.'
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-red-400 mb-1">
          {tx('Entrevista', 'Interview Q&A')}
        </h2>
        <p className="text-slate-400 text-sm">{tx('Junior → Senior preguntas', 'Junior → Senior questions')}</p>
      </div>

      {qaGroups.map((group, gIdx) => {
        const baseIdx = qaGroups.slice(0, gIdx).reduce((s, g) => s + g.qa.length, 0);
        return (
          <div key={group.level}>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold mb-3 ${group.color}`}>
              <HelpCircle className="w-4 h-4" />
              {group.level}
            </div>
            <div className="space-y-2">
              {group.qa.map((item, i) => {
                const idx = baseIdx + i;
                return (
                  <AccordionItem
                    key={idx}
                    question={item.q}
                    answer={item.a}
                    isOpen={openIdx === idx}
                    onToggle={() => toggle(idx)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const renderVersions = (tx) => {
  const versions = [
    {
      version: 'Angular 20',
      date: tx('Mayo 2025', 'May 2025'),
      badge: 'Latest',
      badgeColor: 'bg-red-500',
      features: [
        { label: tx('Signal APIs Estables', 'Stable Signal APIs'), desc: tx('toSignal(), toObservable(), input(), output() y viewChild() llegan a estabilidad total.', 'toSignal(), toObservable(), input(), output() and viewChild() reach full stability.') },
        { label: tx('Zoneless por Defecto (Opt-in)', 'Zoneless by Default (Opt-in)'), desc: tx('Angular puede funcionar sin Zone.js en proyectos nuevos, reduciendo el bundle ~20KB.', 'Angular can work without Zone.js in new projects, reducing the bundle by ~20KB.') },
        { label: 'Resource API', desc: tx('Nueva API experimental resource() para cargar datos asíncronos integrada con signals.', 'New experimental resource() API for loading async data integrated with signals.') },
        { label: tx('Hydration Incremental Estable', 'Stable Incremental Hydration'), desc: tx('Hidratación selectiva de partes del DOM, mejorando drásticamente el LCP en SSR.', 'Selective hydration of DOM parts, drastically improving LCP in SSR.') },
        { label: 'Test Improvements', desc: tx('Nuevas utilidades de testing para signals sin necesidad de fakeAsync.', 'New testing utilities for signals without needing fakeAsync.') },
      ],
    },
    {
      version: 'Angular 19',
      date: tx('Noviembre 2024', 'November 2024'),
      badge: 'Stable',
      badgeColor: 'bg-emerald-600',
      features: [
        { label: 'linkedSignal()', desc: tx('Signal derivado que puede ser modificado. Permite state local que se resetea cuando una dependencia cambia.', 'Modifiable derived signal. Allows local state that resets when a dependency changes.') },
        { label: tx('Hydration Incremental (Preview)', 'Incremental Hydration (Preview)'), desc: tx('Hidratación lazy con @defer: partes del HTML se cargan solo cuando son necesarias.', 'Lazy hydration with @defer: parts of HTML load only when necessary.') },
        { label: tx('HMR para Templates y Estilos', 'HMR for Templates and Styles'), desc: tx('Hot Module Replacement completo: los cambios en HTML y CSS se reflejan sin recarga total.', 'Full Hot Module Replacement: HTML and CSS changes reflect without full reload.') },
        { label: tx('Strict Standalone por Defecto', 'Strict Standalone by Default'), desc: tx('Todos los componentes nuevos son standalone=true por defecto. NgModules opcionales.', 'All new components are standalone=true by default. NgModules are optional.') },
        { label: tx('effect() Estable', 'Stable effect()'), desc: tx('La API de efectos reactivos llega a estabilidad tras múltiples iteraciones de preview.', 'Reactive effects API reaches stability after multiple preview iterations.') },
      ],
    },
    {
      version: 'Angular 18',
      date: tx('Mayo 2024', 'May 2024'),
      badge: 'LTS',
      badgeColor: 'bg-blue-600',
      features: [
        { label: tx('Zoneless (Experimental)', 'Zoneless (Experimental)'), desc: tx('Primera versión con soporte experimental para correr Angular completamente sin Zone.js.', 'First version with experimental support to run Angular completely without Zone.js.') },
        { label: tx('Material 3 Estable', 'Stable Material 3'), desc: tx('Angular Material con diseño M3 (Material You) como opción estable.', 'Angular Material with M3 design (Material You) as a stable option.') },
        { label: tx('Fallback para ng-content', 'Fallback for ng-content'), desc: tx('ng-content ahora soporta contenido por defecto cuando no se provee ningún slot.', 'ng-content now supports default content when no slot is provided.') },
        { label: 'TypeScript 5.4', desc: tx('Soporte completo con mejoras de inferencia de tipos y NoInfer<T>.', 'Full support with type inference improvements and NoInfer<T>.') },
        { label: tx('Route Redirect como Función', 'Route Redirect as Function'), desc: tx('redirectTo puede ser una función, permitiendo redirects condicionales según contexto.', 'redirectTo can be a function, allowing conditional redirects based on context.') },
      ],
    },
    {
      version: 'Angular 17',
      date: tx('Noviembre 2023', 'November 2023'),
      badge: 'Foundation',
      badgeColor: 'bg-purple-600',
      features: [
        { label: tx('Nueva Sintaxis de Control de Flujo', 'New Control Flow Syntax'), desc: tx('@if, @for, @switch en templates — más performante y sin *ngIf ni *ngFor.', '@if, @for, @switch in templates — more performant and without *ngIf or *ngFor.') },
        { label: tx('Bloque @defer', '@defer Block'), desc: tx('Lazy loading declarativo: @defer (on viewport), @loading, @error, @placeholder integrados.', 'Declarative lazy loading: integrated @defer (on viewport), @loading, @error, @placeholder.') },
        { label: tx('Signals Estables (Core)', 'Stable Signals (Core)'), desc: tx('signal(), computed(), effect() llegan a estabilidad como sistema reactivo principal.', 'signal(), computed(), effect() reach stability as the primary reactive system.') },
        { label: tx('Nuevo angular.dev', 'New angular.dev'), desc: tx('Sitio de documentación rediseñado con tutoriales interactivos.', 'Redesigned documentation site with interactive tutorials.') },
        { label: tx('SSR Mejorado', 'Improved SSR'), desc: tx('Hydration no destructiva estable. SSR habilitado por defecto en nuevos proyectos.', 'Stable non-destructive hydration. SSR enabled by default in new projects.') },
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl lg:text-3xl font-bold text-red-400 mb-1">
          {tx('Versiones', 'Version History')}
        </h2>
        <p className="text-slate-400 text-sm">{tx('Angular 17 → 20: Principales mejoras', 'Angular 17 → 20: Key improvements')}</p>
      </div>
      {versions.map((v, idx) => (
        <motion.div
          key={v.version}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.07 }}
          className="bg-slate-900/50 border border-red-500/20 rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-red-300">{v.version}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${v.badgeColor}`}>{v.badge}</span>
              </div>
              <p className="text-slate-500 text-sm">{v.date}</p>
            </div>
          </div>
          <ul className="space-y-2">
            {v.features.map((f, fIdx) => (
              <li key={fIdx} className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5 text-xs flex-shrink-0">▸</span>
                <div>
                  <span className="font-semibold text-slate-200 text-sm">{f.label}: </span>
                  <span className="text-slate-400 text-sm">{f.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

function AngularPro() {
  const { language } = useLanguage();
  const tx = (es, en) => (language === 'en' ? en : es);
  const [active, setActive] = useState('blocks');

  const sections = [
    {
      id: 'blocks',
      title: 'Building Blocks',
      subtitle: tx('Componentes, directivas y pipes', 'Components, directives & pipes'),
      icon: Blocks,
    },
    {
      id: 'di',
      title: 'Dependency Injection',
      subtitle: tx('Inyectores, providers, jerarquía', 'Injectors, providers, hierarchy'),
      icon: GitBranch,
    },
    {
      id: 'rxjs',
      title: 'RxJS',
      subtitle: tx('Observables, operadores', 'Observables, operators'),
      icon: Workflow,
    },
    {
      id: 'signals',
      title: tx('Signals & CD', 'Signals & CD'),
      subtitle: tx('Angular 17+ reactividad', 'Angular 17+ reactivity'),
      icon: Zap,
    },
    {
      id: 'interview',
      title: tx('Entrevista', 'Interview'),
      subtitle: tx('Junior → Senior', 'Junior → Senior'),
      icon: HelpCircle,
    },
    {
      id: 'versions',
      title: tx('Versiones', 'Versions'),
      subtitle: tx('Angular 17 → 20', 'Angular 17 → 20'),
      icon: SiAngular,
    },
  ];

  const renderContent = () => {
    switch (active) {
      case 'blocks':    return renderBlocks(tx);
      case 'di':        return renderDI(tx);
      case 'rxjs':      return renderRxjs(tx);
      case 'signals':   return renderSignals(tx);
      case 'interview': return renderInterview(tx);
      case 'versions':  return renderVersions(tx);
      default:          return renderBlocks(tx);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 lg:h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-2">
        <h3 className="text-base lg:text-lg font-bold text-red-400 mb-2 lg:mb-4 flex items-center gap-2">
          <SiAngular className="w-5 h-5 lg:w-6 lg:h-6" />
          {t('angular', language).title}
        </h3>
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-x-hidden lg:pb-0 lg:space-y-2">
          {sections.map(s => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex-shrink-0 lg:w-full text-left px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all ${
                  active === s.id
                    ? 'bg-red-500/20 border border-red-500/40 text-red-300'
                    : 'bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2 lg:gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${active === s.id ? 'text-red-400' : 'text-slate-500'}`} />
                  <div className="min-w-0">
                    <div className="font-semibold text-sm whitespace-nowrap lg:whitespace-normal">{s.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5 hidden lg:block">{s.subtitle}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content panel */}
      <div className="lg:col-span-3 lg:overflow-y-auto lg:pr-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AngularPro;
