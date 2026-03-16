import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Blocks, Layers, Workflow } from 'lucide-react';
import { SiAngular } from 'react-icons/si';
import CodeBlock from './CodeBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';

function AngularPro() {
    const { language } = useLanguage();
    const tx = (es, en) => (language === 'en' ? en : es);
    const [activeSection, setActiveSection] = useState('blocks');

    const sections = {
        blocks: {
            title: 'Building Blocks',
            subtitle: tx('Componentes, módulos, directivas y pipes', 'Components, modules, directives, pipes'),
            content: [
                {
                    topic: 'Components',
                    desc: 'Bloques fundamentales de Angular',
                    code: `// Component básico
@Component({
  selector: 'app-user',
  template: \`
    <div class="user-card">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <button (click)="onEdit()">Edit</button>
    </div>
  \`,
  styles: [\`
    .user-card { padding: 1rem; border: 1px solid #ccc; }
  \`]
})
export class UserComponent {
  @Input() user: User;
  @Output() edit = new EventEmitter<User>();
  
  onEdit() {
    this.edit.emit(this.user);
  }
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
}`,
                    points: [
                        '@Component decorator define metadata',
                        '@Input: Props de padre a hijo',
                        '@Output + EventEmitter: Comunicación hijo-padre',
                        'Standalone: Sin necesidad de NgModule (moderno)'
                    ]
                },
                {
                    topic: 'Modules vs Standalone',
                    desc: 'NgModules tradicionales vs Standalone',
                    code: `// Tradicional: NgModule
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Moderno: Standalone (Recomendado)
// main.ts
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    UserService,
    provideRouter(routes)
  ]
});

// Componente standalone
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, UserComponent],
  template: \`<router-outlet />\`
})
export class AppComponent {}`,
                    points: [
                        'NgModule: Sistema tradicional de organización',
                        'Standalone: Sin módulos, más simple (Angular 15+)',
                        'Tree-shaking mejorado con standalone',
                        'Lazy loading más fácil con standalone'
                    ]
                },
                {
                    topic: 'Directives',
                    desc: 'Modifican comportamiento del DOM',
                    code: `// Structural Directives (*ngIf, *ngFor)
<div *ngIf="isVisible">Visible</div>

<ul>
  <li *ngFor="let item of items; let i = index">
    {{ i }}: {{ item.name }}
  </li>
</ul>

// Attribute Directives
<div [ngClass]="{ 'active': isActive, 'disabled': !isEnabled }">
  Content
</div>

<p [ngStyle]="{ 'color': textColor, 'font-size': fontSize + 'px' }">
  Styled text
</p>

// Custom Directive
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}
  
  @Input() appHighlight: string;
  
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || 'yellow');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }
  
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}`,
                    points: [
                        'Structural: Cambian estructura DOM (*ngIf, *ngFor)',
                        'Attribute: Cambian apariencia/comportamiento',
                        'Custom: Reutiliza lógica de DOM',
                        '@HostListener: Escucha eventos del host'
                    ]
                },
                {
                    topic: 'Pipes',
                    desc: 'Transforman datos en templates',
                    code: `<!-- Built-in Pipes -->
<p>{{ date | date:'medium' }}</p>
<p>{{ price | currency:'USD':'symbol' }}</p>
<p>{{ name | uppercase }}</p>
<p>{{ description | slice:0:100 }}</p>
<p>{{ data | json }}</p>

<!-- Custom Pipe -->
@Pipe({
  name: 'exponential',
  standalone: true
})
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exponent: number = 2): number {
    return Math.pow(value, exponent);
  }
}

<!-- Uso -->
<p>{{ 2 | exponential:10 }}</p> <!-- 1024 -->

<!-- Pure vs Impure Pipe -->
@Pipe({
  name: 'filter',
  pure: false // Re-ejecuta en cada change detection
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    return items.filter(item => 
      item.name.includes(searchText)
    );
  }
}`,
                    points: [
                        'Pure pipes: Solo se ejecutan cuando input cambia',
                        'Impure pipes: Se ejecutan en cada change detection',
                        'Pueden encadenarse: value | pipe1 | pipe2',
                        'Optimal para transformaciones de display'
                    ]
                }
            ]
        },
        reactivity: {
            title: tx('Reactividad', 'Reactivity'),
            subtitle: tx('Signals vs Zone.js y detección de cambios', 'Signals vs Zone.js & Change Detection'),
            content: [
                {
                    topic: 'Signals (Nuevo Estándar)',
                    desc: 'Sistema reactivo moderno de Angular 16+',
                    code: `// Signal básico
import { signal, computed, effect } from '@angular/core';

export class CounterComponent {
  // Writable signal
  count = signal(0);
  
  // Computed signal (derivado)
  doubleCount = computed(() => this.count() * 2);
  
  // Effect (side effect cuando señal cambia)
  constructor() {
    effect(() => {
      console.log(\`Count is now: \${this.count()}\`);
    });
  }
  
  increment() {
    this.count.update(value => value + 1);
    // O: this.count.set(5);
  }
}

// En template
<p>Count: {{ count() }}</p>
<p>Double: {{ doubleCount() }}</p>
<button (click)="increment()">+</button>

// Signal con objeto
interface User {
  name: string;
  age: number;
}

user = signal<User>({ name: 'Juan', age: 30 });

updateName(newName: string) {
  this.user.update(u => ({ ...u, name: newName }));
}`,
                    points: [
                        'Fine-grained reactivity (solo actualiza lo necesario)',
                        'computed(): Cálculos derivados automáticos',
                        'effect(): Side effects cuando signal cambia',
                        'Mejor performance que Zone.js',
                        'Futuro de Angular (Zone.js será opcional)'
                    ]
                },
                {
                    topic: 'Zone.js (Sistema Actual)',
                    desc: 'Monkey-patching para detectar cambios',
                    code: `// Zone.js intercepta operaciones asíncronas
// y dispara change detection automáticamente

export class AppComponent {
  data: string;
  
  // Zone.js detecta el click y ejecuta change detection
  onClick() {
    this.data = 'Updated!'; // UI se actualiza automáticamente
  }
  
  // También detecta timers
  ngOnInit() {
    setTimeout(() => {
      this.data = 'Loaded'; // Change detection automática
    }, 1000);
  }
  
  // Y promises
  async loadData() {
    this.data = await fetch('/api/data');
    // Change detection automática después del await
  }
}

// Opt-out de Zone.js para performance
import { ChangeDetectorRef } from '@angular/core';

export class ManualComponent {
  constructor(private cdr: ChangeDetectorRef) {}
  
  updateManually() {
    this.data = 'New value';
    this.cdr.detectChanges(); // Manual
  }
}`,
                    points: [
                        'Intercepta async operations (clicks, timers, HTTP)',
                        'Change detection automática pero costosa',
                        'Puede causar issues de performance',
                        'Signals lo reemplazarán gradualmente'
                    ]
                },
                {
                    topic: 'Change Detection Strategies',
                    desc: 'Optimiza cuándo se chequean componentes',
                    code: `// Default: Chequea todo el árbol
@Component({
  selector: 'app-user',
  changeDetection: ChangeDetectionStrategy.Default,
  template: \`<p>{{ user.name }}</p>\`
})
export class UserComponent {
  @Input() user: User;
}

// OnPush: Solo chequea si @Input cambia o evento interno
@Component({
  selector: 'app-optimized-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <p>{{ user.name }}</p>
    <button (click)="update()">Update</button>
  \`
})
export class OptimizedUserComponent {
  @Input() user: User; // Debe ser inmutable
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  update() {
    // INCORRECTO con OnPush:
    // this.user.name = 'Changed';
    
    // CORRECTO: Nueva referencia
    this.user = { ...this.user, name: 'Changed' };
  }
  
  // O marcar manualmente
  forceUpdate() {
    this.cdr.markForCheck();
  }
}

// Con Signals, OnPush es transparente
@Component({
  selector: 'app-signal-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`<p>{{ name() }}</p>\`
})
export class SignalUserComponent {
  name = signal('Juan');
  
  update() {
    this.name.set('Pedro'); // Actualiza automáticamente
  }
}`,
                    points: [
                        'Default: Recorre todo el árbol (lento)',
                        'OnPush: Solo chequea si inputs cambian',
                        'OnPush + inmutabilidad = performance',
                        'Signals hacen OnPush trivial'
                    ]
                }
            ]
        },
        rxjs: {
            title: tx('RxJS y Datos', 'RxJS & Data'),
            subtitle: tx('Observables, subjects y servicios', 'Observables, Subjects & Services'),
            content: [
                {
                    topic: 'Observables Basics',
                    desc: 'Streams de datos asíncronos',
                    code: `import { Observable, of, from, interval } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';

// Crear observables
const obs1 = of(1, 2, 3);
const obs2 = from([1, 2, 3]);
const obs3 = interval(1000); // Emite cada segundo

// Subscription
obs1.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.error(err),
  complete: () => console.log('Complete')
});

// Operators (pipe)
const numbers$ = of(1, 2, 3, 4, 5);

numbers$.pipe(
  filter(n => n % 2 === 0), // 2, 4
  map(n => n * 10),         // 20, 40
  take(1)                   // 20
).subscribe(result => console.log(result));

// En componente
export class DataComponent implements OnDestroy {
  data$: Observable<Data>;
  subscription: Subscription;
  
  ngOnInit() {
    this.data$ = this.service.getData();
    this.subscription = this.data$.subscribe(
      data => this.handleData(data)
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe(); // Evita memory leaks
  }
}

// Con async pipe (auto-unsubscribe)
@Component({
  template: \`
    <div *ngIf="data$ | async as data">
      {{ data.name }}
    </div>
  \`
})
export class AsyncComponent {
  data$ = this.service.getData();
}`,
                    points: [
                        'Observable: Stream de valores en el tiempo',
                        'Lazy: No ejecuta hasta subscribe',
                        'pipe(): Encadena operadores',
                        'async pipe: Auto-subscribe y unsubscribe'
                    ]
                },
                {
                    topic: 'Subjects',
                    desc: 'Observable + Observer (multicast)',
                    code: `import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

// Subject: No tiene valor inicial
const subject = new Subject<number>();
subject.next(1);
subject.subscribe(v => console.log('A:', v));
subject.next(2); // A: 2
subject.subscribe(v => console.log('B:', v));
subject.next(3); // A: 3, B: 3

// BehaviorSubject: Requiere valor inicial, emite último valor
const behaviorSubject = new BehaviorSubject<number>(0);
behaviorSubject.subscribe(v => console.log('A:', v)); // A: 0
behaviorSubject.next(1); // A: 1
behaviorSubject.subscribe(v => console.log('B:', v)); // B: 1 (último valor)

// ReplaySubject: Replay de N valores
const replaySubject = new ReplaySubject<number>(2);
replaySubject.next(1);
replaySubject.next(2);
replaySubject.next(3);
replaySubject.subscribe(v => console.log(v)); // 2, 3

// State management con BehaviorSubject
export class StateService {
  private state = new BehaviorSubject<AppState>(initialState);
  state$ = this.state.asObservable();
  
  get currentState(): AppState {
    return this.state.value;
  }
  
  updateState(newState: Partial<AppState>) {
    this.state.next({ ...this.currentState, ...newState });
  }
}`,
                    points: [
                        'Subject: Multicast, no valor inicial',
                        'BehaviorSubject: Valor inicial + último valor',
                        'ReplaySubject: Cachea N valores pasados',
                        'Útiles para state management'
                    ]
                },
                {
                    topic: 'Operadores Clave',
                    desc: 'switchMap, debounceTime, combineLatest',
                    code: `import { switchMap, debounceTime, distinctUntilChanged, 
         combineLatest, mergeMap, catchError } from 'rxjs/operators';

// switchMap: Cancela observable anterior
searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.http.get(\`/api/search?q=\${term}\`))
).subscribe(results => this.results = results);

// mergeMap: No cancela, ejecuta en paralelo
clicks$.pipe(
  mergeMap(click => this.http.post('/api/log', click))
).subscribe();

// combineLatest: Combina últimos valores
combineLatest([
  this.user$,
  this.permissions$
]).pipe(
  map(([user, permissions]) => ({
    ...user,
    canEdit: permissions.includes('edit')
  }))
).subscribe(data => this.userData = data);

// Error handling
this.http.get('/api/data').pipe(
  catchError(error => {
    console.error(error);
    return of([]); // Fallback value
  })
).subscribe();`,
                    points: [
                        'switchMap: Búsquedas (cancela previas)',
                        'mergeMap: Requests paralelos',
                        'debounceTime: Espera N ms sin eventos',
                        'combineLatest: Combina múltiples streams'
                    ]
                },
                {
                    topic: 'Servicios con DI',
                    desc: 'Inyección de dependencias',
                    code: `// Service con HttpClient
@Injectable({
  providedIn: 'root' // Singleton global
})
export class UserService {
  private apiUrl = '/api/users';
  
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  
  getUser(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }
  
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}

// Component usa el servicio
@Component({
  selector: 'app-users',
  template: \`
    <div *ngFor="let user of users$ | async">
      {{ user.name }}
    </div>
  \`
})
export class UsersComponent {
  users$ = this.userService.getUsers();
  
  constructor(private userService: UserService) {}
}

// Scope del servicio
@Injectable({
  providedIn: 'root' // Singleton app-wide
})

@Injectable({
  providedIn: 'any' // Nueva instancia por módulo
})

@Injectable() // Declarar en providers del módulo/componente`,
                    points: [
                        'providedIn: root = singleton global',
                        'Inyección en constructor',
                        'HttpClient retorna observables',
                        'Servicios son la capa de datos'
                    ]
                }
            ]
        },
        versions: {
            title: tx('Últimas Versiones', 'Version History'),
            subtitle: tx('Angular 17 → 20: Principales mejoras', 'Angular 17 → 20: Key improvements'),
            isVersionSection: true,
            content: [
                {
                    version: 'Angular 20',
                    date: 'Mayo 2025',
                    badge: 'Latest',
                    badgeColor: 'bg-red-500',
                    features: [
                        { label: 'Signal APIs Estables', desc: 'toSignal(), toObservable(), input(), output() y viewChild() llegan a estabilidad total.' },
                        { label: 'Zoneless por Defecto (Opt-in)', desc: 'Angular puede funcionar sin Zone.js en proyectos nuevos, reduciendo el bundle ~20KB.' },
                        { label: 'Resource API', desc: 'Nueva API experimental resource() para cargar datos asíncronos integrada con signals.' },
                        { label: 'Hydration Incremental Estable', desc: 'Hidratación selectiva de partes del DOM, mejorando drásticamente el LCP en SSR.' },
                        { label: 'Test Improvements', desc: 'Nuevas utilidades de testing para signals sin necesidad de fakeAsync.' },
                    ]
                },
                {
                    version: 'Angular 19',
                    date: 'Noviembre 2024',
                    badge: 'Stable',
                    badgeColor: 'bg-emerald-600',
                    features: [
                        { label: 'linkedSignal()', desc: 'Signal derivado que puede ser modificado. Permite state local que se resetea cuando una dependencia cambia.' },
                        { label: 'Hydration Incremental (Preview)', desc: 'Hidratación lazy con @defer: partes del HTML se cargan solo cuando son necesarias.' },
                        { label: 'HMR para Templates y Estilos', desc: 'Hot Module Replacement completo: los cambios en HTML y CSS se reflejan sin recarga total.' },
                        { label: 'Strict Standalone por Defecto', desc: 'Todos los componentes nuevos son standalone=true por defecto. NgModules opcionales.' },
                        { label: 'effect() Estable', desc: 'La API de efectos reactivos llega a estabilidad tras múltiples iteraciones de preview.' },
                    ]
                },
                {
                    version: 'Angular 18',
                    date: 'Mayo 2024',
                    badge: 'LTS',
                    badgeColor: 'bg-blue-600',
                    features: [
                        { label: 'Zoneless (Experimental)', desc: 'Primera versión con soporte experimental para correr Angular completamente sin Zone.js.' },
                        { label: 'Material 3 Estable', desc: 'Angular Material con diseño M3 (Material You) como opción estable.' },
                        { label: 'Fallback para ng-content', desc: 'ng-content ahora soporta contenido por defecto cuando no se provee ningún slot.' },
                        { label: 'TypeScript 5.4', desc: 'Soporte completo con mejoras de inferencia de tipos y NoInfer<T>.' },
                        { label: 'Route Redirect como Función', desc: 'redirectTo puede ser una función, permitiendo redirects condicionales según contexto.' },
                    ]
                },
                {
                    version: 'Angular 17',
                    date: 'Noviembre 2023',
                    badge: 'Foundation',
                    badgeColor: 'bg-purple-600',
                    features: [
                        { label: 'Nueva Sintaxis de Control de Flujo', desc: '@if, @for, @switch en templates — más performante y sin *ngIf ni *ngFor.' },
                        { label: 'Bloque @defer', desc: 'Lazy loading declarativo: @defer (on viewport), @loading, @error, @placeholder integrados.' },
                        { label: 'Signals Estables (Core)', desc: 'signal(), computed(), effect() llegan a estabilidad como sistema reactivo principal.' },
                        { label: 'Nuevo angular.dev', desc: 'Sitio de documentación rediseñado con tutoriales interactivos.' },
                        { label: 'SSR Mejorado', desc: 'Hydration no destructiva estable. SSR habilitado por defecto en nuevos proyectos.' },
                    ]
                }
            ]
        }
    };

    const renderVersionContent = (content) => (
        <div className="space-y-5">
            {content.map((v, idx) => (
                <div key={idx} className="bg-slate-900/50 border border-red-500/20 rounded-xl p-5">
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
                                <span className="text-red-400 mt-0.5 text-xs">▸</span>
                                <div>
                                    <span className="font-semibold text-slate-200 text-sm">{f.label}: </span>
                                    <span className="text-slate-400 text-sm">{f.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderSectionContent = (content) => {
        return (
            <div className="space-y-6">
                {content.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6">
                        <div className="flex items-start gap-3 mb-4">
                            <SiAngular className="w-6 h-6 text-red-400 mt-1" />
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-red-400">{item.topic}</h3>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        </div>

                        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 mb-4 overflow-x-auto">
                            <CodeBlock code={item.code} language="typescript" />
                        </div>

                        <ul className="space-y-2">
                            {item.points.map((point, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2 text-slate-300 text-sm">
                                    <span className="text-red-400">•</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    const sectionList = Object.values(sections).map((section, idx) => ({
        ...section,
        id: Object.keys(sections)[idx]
    }));
    const currentSection = sections[activeSection];

    return (
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-2 overflow-y-auto pr-2">
                <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                    <SiAngular className="w-6 h-6" />
                    {t('angular', language).title}
                </h3>
                {sectionList.map((section) => {
          const Icon = section.id === 'blocks' ? Blocks : section.id === 'reactivity' ? Layers : section.id === 'versions' ? SiAngular : Workflow;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${activeSection === section.id
                                ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <div className="flex-1">
                                <div className="font-semibold">{section.title}</div>
                                <div className="text-xs opacity-70 line-clamp-1">{section.subtitle}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Content Panel */}
            <div className="lg:col-span-3 overflow-y-auto pr-2">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-red-400 mb-2">{currentSection.title}</h2>
                    <p className="text-slate-400">{currentSection.subtitle}</p>
                </div>
                <div className="animate-fade-in">
                    {currentSection.isVersionSection
                    ? renderVersionContent(currentSection.content)
                    : renderSectionContent(currentSection.content)
                }
                </div>
            </div>
        </div>
    );
}

export default AngularPro;
